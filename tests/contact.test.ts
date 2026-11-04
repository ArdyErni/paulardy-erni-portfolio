import assert from "node:assert/strict";
import test from "node:test";
import { contactSchema, CONTACT_LIMITS } from "../src/lib/contact-validation";
import { handleContact, type ContactDiagnostic } from "../src/lib/server/contact";

const payload = { name: "Visitor", email: "visitor@example.com", message: "A project opportunity.", company: "" };
const fixtureEnv = {
  FORMSPREE_FORM_ID: "testfixtureform",
  UPSTASH_REDIS_REST_URL: "https://test-only.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "test-only-not-a-real-token",
  VERCEL: "1",
};
const id = "0ea59361-d73c-4646-b04b-657b05dc7ee5";

function request(body: unknown = payload, headers: Record<string, string> = {}) {
  return new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://portfolio.example", "Idempotency-Key": id, ...headers },
    body: JSON.stringify(body),
  });
}

function dependencies(responses: (Response | Error)[] = []) {
  const calls: { url: string; options?: RequestInit }[] = [];
  const diagnostics: ContactDiagnostic[] = [];
  const mockFetch: typeof fetch = async (input, options) => {
    calls.push({ url: String(input), options });
    const next = responses.shift();
    if (next instanceof Error) throw next;
    if (!next) throw new Error("Unexpected network call");
    return next;
  };
  return { env: fixtureEnv, fetch: mockFetch, calls, diagnostics, diagnose: (event: ContactDiagnostic) => { diagnostics.push(event); } };
}

test("normalizes whitespace and line endings, preserves plain text", () => {
  const parsed = contactSchema.parse({ ...payload, name: " Visitor ", message: "  Hello\r\n<script>text</script>  " });
  assert.equal(parsed.name, "Visitor");
  assert.equal(parsed.message, "Hello\n<script>text</script>");
});

test("rejects invalid fields and honeypots before any provider calls", async () => {
  const invalid = [
    { ...payload, name: "  " }, { ...payload, email: "invalid" },
    { ...payload, message: " " }, { ...payload, name: "Visitor\nBcc: bad@example.com" },
    { ...payload, message: "bad\u0000content" }, { ...payload, company: "bot" },
    { ...payload, name: "x".repeat(CONTACT_LIMITS.name + 1) },
    { ...payload, email: `${"x".repeat(CONTACT_LIMITS.email)}@example.com` },
    { ...payload, message: "x".repeat(CONTACT_LIMITS.message + 1) },
    { ...payload, unexpected: "field" }, null,
  ];
  for (const input of invalid) {
    const deps = dependencies();
    assert.equal((await handleContact(request(input), deps)).status, 400);
    assert.equal(deps.calls.length, 0);
  }
});

test("rejects cross-site, non-JSON, malformed and oversized requests", async () => {
  const deps = dependencies();
  assert.equal((await handleContact(request(payload, { Origin: "https://another.example" }), deps)).status, 403);
  assert.equal((await handleContact(request(payload, { "Sec-Fetch-Site": "cross-site" }), deps)).status, 403);
  assert.equal((await handleContact(request(payload, { "Content-Type": "text/plain" }), deps)).status, 415);
  assert.equal((await handleContact(request(payload, { "Idempotency-Key": "invalid" }), deps)).status, 400);
  const malformed = new Request("https://portfolio.example/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
  assert.equal((await handleContact(malformed, deps)).status, 400);
  const oversized = request({ ...payload, message: "x".repeat(CONTACT_LIMITS.bodyBytes) });
  assert.equal((await handleContact(oversized, deps)).status, 413);
  assert.equal((await handleContact(request(payload, { "Content-Length": "999999" }), deps)).status, 413);
  assert.equal(deps.calls.length, 0);
});

test("fails closed when Formspree or durable rate-limit configuration is missing", async () => {
  for (const missing of Object.keys(fixtureEnv).filter(key => key !== "VERCEL")) {
    const deps = dependencies();
    const env: Record<string, string | undefined> = { ...fixtureEnv };
    delete env[missing];
    const response = await handleContact(request(), { ...deps, env });
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, code: "unavailable" });
    assert.equal(deps.calls.length, 0);
  }
});

test("invalid service configuration returns a generic error without throwing", async () => {
  for (const change of [
    { UPSTASH_REDIS_REST_URL: "not-a-url" },
    { UPSTASH_REDIS_REST_URL: "http://redis.example" },
    { FORMSPREE_FORM_ID: "https://untrusted.example/form" },
    { FORMSPREE_FORM_ID: "../invalid" },
    { FORMSPREE_FORM_ID: "bad\nheader" },
    { UPSTASH_REDIS_REST_TOKEN: "bad\nheader" },
  ]) {
    const deps = dependencies();
    const response = await handleContact(request(), { ...deps, env: { ...fixtureEnv, ...change } });
    assert.equal(response.status, 503);
    assert.equal(deps.calls.length, 0);
  }
});

test("rate limits persist through Redis EVAL, with hashed identities and no email send on denial", async () => {
  const deps = dependencies([Response.json({ result: 0 })]);
  const response = await handleContact(request(payload, { "x-vercel-forwarded-for": "203.0.113.1" }), deps);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "3600");
  assert.equal(deps.calls.length, 1);
  const command = JSON.parse(String(deps.calls[0].options?.body));
  assert.equal(command[0], "EVAL");
  assert.match(command[1], /redis.call\('EXPIRE'/);
  assert.equal(command[2], 5);
  assert.deepEqual(command.slice(8, 12), [3600, 5, 3, 30]);
  assert.equal(command.at(-1), 86400);
  assert.match(command[1], /:pending/);
  assert.ok(!String(deps.calls[0].options?.body).includes(payload.email));
  assert.ok(!String(deps.calls[0].options?.body).includes("203.0.113.1"));
});

test("fails closed when Redis fails or returns an unexpected result", async () => {
  for (const result of [new Error("private provider detail"), new Response("private", { status: 500 }), Response.json({ error: "private" }), Response.json({ result: 9 })]) {
    const deps = dependencies([result]);
    const response = await handleContact(request(), deps);
    assert.equal(response.status, 503);
    assert.equal(deps.calls.length, 1);
    assert.ok(!(await response.text()).includes("private"));
  }
});

test("ignores spoofed forwarding headers outside Vercel", async () => {
  const keys: string[] = [];
  for (const ip of ["203.0.113.1", "203.0.113.2"]) {
    const deps = dependencies([Response.json({ result: 0 })]);
    await handleContact(request(payload, { "x-forwarded-for": ip, "x-vercel-forwarded-for": ip }), { ...deps, env: { ...fixtureEnv, VERCEL: undefined } });
    keys.push(JSON.parse(String(deps.calls[0].options?.body))[3]);
  }
  assert.equal(keys[0], keys[1]);
});

test("posts documented Formspree JSON fields and requires confirmed acceptance", async () => {
  const deps = dependencies([
    Response.json({ result: 1 }), Response.json({ next: "https://formspree.io/thanks" }), Response.json({ result: 1 }),
  ]);
  const response = await handleContact(request(), deps);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.equal(deps.calls[1].url, `https://formspree.io/f/${fixtureEnv.FORMSPREE_FORM_ID}`);
  const body = JSON.parse(String(deps.calls[1].options?.body));
  assert.equal(body.name, payload.name);
  assert.equal(body.email, payload.email);
  assert.equal(body.message, payload.message);
  assert.equal(body._gotcha, "");
  assert.equal(typeof body.subject, "string");
  assert.ok(!("from" in body) && !("to" in body) && !("reply_to" in body));
  const headers = new Headers(deps.calls[1].options?.headers);
  assert.equal(headers.get("Accept"), "application/json");
  assert.equal(headers.get("Content-Type"), "application/json");
  assert.equal(headers.get("Authorization"), null);
  assert.equal(headers.get("Idempotency-Key"), null);
  assert.equal(deps.calls[1].options?.redirect, "error");
  assert.ok(String(deps.calls[2].options?.body).includes('"accepted"'));
});

test("explicit Formspree rejection returns a generic error and releases only the claim", async () => {
  for (const status of [400, 403, 404, 422, 429]) {
    const deps = dependencies([
      Response.json({ result: 1 }), Response.json({ errors: [{ message: "private detail" }] }, { status }), Response.json({ result: 1 }),
    ]);
    const response = await handleContact(request(), deps);
    assert.equal(response.status, status === 429 ? 429 : 502);
    assert.deepEqual(await response.json(), { ok: false, code: status === 429 ? "rate_limited" : "failed" });
    assert.equal(deps.calls.length, 3);
    assert.ok(String(deps.calls[2].options?.body).includes('"rejected"'));
  }
});

test("ambiguous Formspree outcomes do not release the claim or automatically retry", async () => {
  for (const result of [
    new Response("request timeout", { status: 408 }), new Response("conflict", { status: 409 }),
    new Response("private detail", { status: 500 }), Response.json({}),
    Response.json({ ok: true }), Response.json({ next: "/thanks", errors: [] }),
    Response.json({ next: "/thanks", ok: false }), Response.json({ next: "/thanks", error: "private" }),
    new Response("invalid json"), new Error("timeout: private detail"),
  ]) {
    const deps = dependencies([Response.json({ result: 1 }), result]);
    const response = await handleContact(request(), deps);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false, code: "failed" });
    assert.equal(deps.calls.length, 2);
  }
});

test("accepted repeated submissions return cached success without forwarding again", async () => {
  const deps = dependencies([
    Response.json({ result: 1 }), Response.json({ next: "/thanks" }), Response.json({ result: 1 }),
    Response.json({ result: 2 }), Response.json({ result: 2 }),
  ]);
  assert.equal((await handleContact(request(), deps)).status, 200);
  assert.equal((await handleContact(request(), deps)).status, 200);
  assert.equal((await handleContact(request(payload, { "Idempotency-Key": "19f72a4a-9d8e-41b3-a32d-9361a3e806df" }), deps)).status, 200);
  assert.equal(deps.calls.filter(call => call.url.startsWith("https://formspree.io/")).length, 1);
});

test("pending/uncertain duplicates and changed-content UUID reuse never forward", async () => {
  for (const result of [3, 4]) {
    const deps = dependencies([Response.json({ result })]);
    const response = await handleContact(request(), deps);
    assert.equal(response.status, 409);
    assert.deepEqual(await response.json(), { ok: false, code: "failed" });
    assert.equal(deps.calls.length, 1);
  }
});

test("identical content with a new UUID still has the same duplicate-detection key", async () => {
  const keys: string[][] = [];
  for (const key of [id, "19f72a4a-9d8e-41b3-a32d-9361a3e806df"]) {
    const deps = dependencies([Response.json({ result: 3 })]);
    await handleContact(request(payload, { "Idempotency-Key": key }), deps);
    const command = JSON.parse(String(deps.calls[0].options?.body));
    keys.push([command[6], command[7]]);
  }
  assert.notEqual(keys[0][0], keys[1][0]);
  assert.equal(keys[0][1], keys[1][1]);
});

test("a failure recording acceptance or rejection fails closed", async () => {
  for (const provider of [Response.json({ next: "/thanks" }), new Response("private", { status: 422 })]) {
    const deps = dependencies([Response.json({ result: 1 }), provider, new Error("storage timeout")]);
    const response = await handleContact(request(), deps);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, code: "unavailable" });
    assert.equal(deps.calls.filter(call => call.url.startsWith("https://formspree.io/")).length, 1);
  }
});

test("configuration diagnostics report presence/validity only, before either upstream", async () => {
  const deps = dependencies();
  const response = await handleContact(request(), { ...deps, env: { ...fixtureEnv, FORMSPREE_FORM_ID: "", UPSTASH_REDIS_REST_URL: "invalid-secret-value" } });
  assert.equal(response.status, 503);
  assert.equal(deps.calls.length, 0);
  assert.equal(deps.diagnostics.length, 1);
  const event = deps.diagnostics[0];
  assert.equal(event.stage, "configuration");
  assert.equal(event.category, "invalid_environment");
  assert.deepEqual(event.configuration, { FORMSPREE_FORM_ID: "missing", UPSTASH_REDIS_REST_URL: "invalid", UPSTASH_REDIS_REST_TOKEN: "valid" });
  assert.equal(event.formspreeAttempted, false);
  assert.equal(event.formspreeAcceptanceConfirmed, false);
  assert.equal(event.requestId, response.headers.get("X-Contact-Request-Id"));
  assert.ok(!JSON.stringify(event).includes("invalid-secret-value"));
});

test("Redis diagnostics distinguish auth, permissions, script, and response failures", async () => {
  const scenarios = [
    { response: new Response("private", { status: 401 }), category: "authentication", status: 401 },
    { response: Response.json({ error: "NOPERM private token details" }), category: "permissions", status: 200 },
    { response: Response.json({ error: "WRONGPASS private" }), category: "authentication", status: 200 },
    { response: Response.json({ error: "ERR Error compiling script private" }), category: "redis_script", status: 200 },
    { response: Response.json({ error: "CROSSSLOT private" }), category: "redis_slot", status: 200 },
    { response: Response.json({ error: "WRONGTYPE private" }), category: "redis_wrong_type", status: 200 },
    { response: new Response("private", { status: 404 }), category: "http_error", status: 404 },
    { response: Response.json({ result: "1" }), category: "unexpected_response", status: 200 },
    { response: new Response("private"), category: "invalid_json", status: 200 },
  ];
  for (const scenario of scenarios) {
    const deps = dependencies([scenario.response]);
    const result = await handleContact(request(), deps);
    assert.equal(result.status, 503);
    assert.equal(deps.calls.length, 1);
    assert.equal(deps.diagnostics[0].stage, "redis_claim");
    assert.equal(deps.diagnostics[0].category, scenario.category);
    assert.equal(deps.diagnostics[0].upstreamStatus, scenario.status);
    assert.equal(deps.diagnostics[0].formspreeAttempted, false);
    assert.ok(!JSON.stringify(deps.diagnostics).includes("private"));
  }
});

test("network diagnostics never log raw errors, causes, tokens, or submitted content", async () => {
  const cases = [
    { error: new DOMException("private", "TimeoutError"), expected: "timeout" },
    { error: new TypeError("private", { cause: { code: "ENOTFOUND", message: "private" } }), expected: "dns" },
    { error: new TypeError("private", { cause: { code: "ECONNREFUSED" } }), expected: "network" },
    { error: new TypeError("private", { cause: { code: "CERT_HAS_EXPIRED" } }), expected: "tls" },
  ];
  for (const item of cases) {
    const deps = dependencies([item.error]);
    const result = await handleContact(request(), deps);
    assert.equal(result.status, 503);
    assert.equal(deps.diagnostics[0].category, item.expected);
    const logged = JSON.stringify(deps.diagnostics);
    for (const forbidden of ["private", payload.email, payload.name, payload.message, fixtureEnv.UPSTASH_REDIS_REST_TOKEN, fixtureEnv.FORMSPREE_FORM_ID, id]) {
      assert.ok(!logged.includes(forbidden));
    }
  }
});

test("post-provider 503 diagnostics distinguish accepted and rejected submissions", async () => {
  for (const accepted of [true, false]) {
    const upstream = accepted ? Response.json({ next: "/thanks" }) : new Response("private", { status: 422 });
    const deps = dependencies([Response.json({ result: 1 }), upstream, new Response("private", { status: 403 })]);
    const result = await handleContact(request(), deps);
    assert.equal(result.status, 503);
    const event = deps.diagnostics.at(-1)!;
    assert.equal(event.stage, accepted ? "redis_record_acceptance" : "redis_release_rejection");
    assert.equal(event.formspreeAttempted, true);
    assert.equal(event.formspreeAcceptanceConfirmed, accepted);
    assert.equal(event.formspreeStatus, accepted ? 200 : 422);
    assert.equal(event.upstreamStatus, 403);
    assert.ok(!JSON.stringify(deps.diagnostics).includes("private"));
  }
});

test("a Redis state conflict is not treated as confirmed delivery", async () => {
  const deps = dependencies([Response.json({ result: 1 }), Response.json({ next: "/thanks" }), Response.json({ result: 0 })]);
  const result = await handleContact(request(), deps);
  assert.equal(result.status, 503);
  assert.equal(deps.diagnostics.at(-1)?.stage, "redis_record_acceptance");
  assert.equal(deps.diagnostics.at(-1)?.category, "state_conflict");
  assert.equal(deps.diagnostics.at(-1)?.redisResult, 0);
});

test("Redis error envelopes cannot be mistaken for accepted duplicate results", async () => {
  const deps = dependencies([Response.json({ result: 2, error: "NOPERM private" })]);
  const result = await handleContact(request(), deps);
  assert.equal(result.status, 503);
  assert.equal(deps.calls.length, 1);
  assert.equal(deps.diagnostics[0].category, "permissions");
});

test("a broken diagnostic sink cannot bypass protections or change the response", async () => {
  const deps = dependencies([new Response("private", { status: 401 })]);
  const result = await handleContact(request(), { ...deps, diagnose: () => { throw new Error("private"); } });
  assert.equal(result.status, 503);
  assert.deepEqual(await result.json(), { ok: false, code: "unavailable" });
  assert.equal(deps.calls.length, 1);
});

