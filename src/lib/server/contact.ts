import "server-only";

import { createHmac, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import { z } from "zod";
import { CONTACT_LIMITS, contactSchema } from "@/lib/contact-validation";
import { portfolio } from "@/lib/portfolio";

interface ContactEnvironment {
  [name: string]: string | undefined;
  FORMSPREE_FORM_ID?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  VERCEL?: string;
}

interface ContactDependencies {
  env: ContactEnvironment;
  fetch: typeof fetch;
  diagnose?: (event: ContactDiagnostic) => void;
}

type DiagnosticStage = "configuration" | "redis_claim" | "redis_record_acceptance" | "redis_release_rejection" | "formspree";
type DiagnosticCategory = "invalid_environment" | "authentication" | "permissions" | "http_error"
  | "invalid_json" | "unexpected_response" | "redis_script" | "redis_wrong_type" | "redis_slot"
  | "upstream_rate_limit" | "timeout" | "dns" | "network" | "tls" | "exception"
  | "state_conflict" | "rate_limited" | "duplicate_uncertain" | "duplicate_conflict";
type ConfigurationName = "FORMSPREE_FORM_ID" | "UPSTASH_REDIS_REST_URL" | "UPSTASH_REDIS_REST_TOKEN";

export interface ContactDiagnostic {
  requestId: string;
  stage: DiagnosticStage;
  category: DiagnosticCategory;
  configuration: Record<ConfigurationName, "missing" | "invalid" | "valid">;
  formspreeAttempted: boolean;
  formspreeAcceptanceConfirmed: boolean;
  formspreeStatus?: number;
  upstreamStatus?: number;
  redisResult?: number;
}

const configuration = z.object({
  FORMSPREE_FORM_ID: z.string().trim().regex(/^[a-zA-Z0-9]{1,64}$/),
  UPSTASH_REDIS_REST_URL: z.string().url().refine(value => value.startsWith("https://")),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().min(1).regex(/^[^\r\n]+$/),
});

function exceptionCategory(error: unknown): DiagnosticCategory {
  const name = error instanceof Error ? error.name : "";
  if (name === "TimeoutError" || name === "AbortError") return "timeout";
  if (name === "SyntaxError") return "invalid_json";
  const cause = error instanceof Error ? error.cause : undefined;
  const code = cause && typeof cause === "object" && "code" in cause ? cause.code : undefined;
  if (code === "ENOTFOUND" || code === "EAI_AGAIN") return "dns";
  if (code === "ETIMEDOUT" || code === "UND_ERR_CONNECT_TIMEOUT" || code === "UND_ERR_HEADERS_TIMEOUT") return "timeout";
  if (code === "ECONNREFUSED" || code === "ECONNRESET") return "network";
  if (code === "CERT_HAS_EXPIRED" || code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" || code === "DEPTH_ZERO_SELF_SIGNED_CERT") return "tls";
  return name === "TypeError" ? "network" : "exception";
}

// Inspect provider messages only to choose a fixed category. Never return or log them.
function redisErrorCategory(message: string): DiagnosticCategory {
  if (/NOAUTH|WRONGPASS|invalid token|unauthoriz/i.test(message)) return "authentication";
  if (/NOPERM|read.?only|not permitted/i.test(message)) return "permissions";
  if (/CROSSSLOT/i.test(message)) return "redis_slot";
  if (/WRONGTYPE/i.test(message)) return "redis_wrong_type";
  if (/script|lua|user_script/i.test(message)) return "redis_script";
  if (/quota|rate.?limit|max.*request|daily.*limit/i.test(message)) return "upstream_rate_limit";
  return "unexpected_response";
}

// Claim the attempt AND identical content before forwarding anything. These records
// also prevent replays with a new client UUID after a timeout or page reload.
// Results: 0 = limited, 1 = claimed, 2 = accepted already, 3 = uncertain/in progress,
// 4 = a UUID reused with different content. Only result 1 may call the provider.
const CLAIM_SCRIPT = `
local attempt = redis.call('GET', KEYS[4])
if attempt then
  if attempt == ARGV[5] .. ':accepted' then return 2 end
  if attempt == ARGV[5] .. ':pending' then return 3 end
  return 4
end
local content = redis.call('GET', KEYS[5])
if content == 'accepted' then return 2 end
if content then return 3 end
for i = 1, 3 do
  local key = KEYS[i]
  if tonumber(redis.call('GET', key) or '0') >= tonumber(ARGV[i + 1]) then
    return 0
  end
end
for i = 1, 3 do
  local key = KEYS[i]
  local count = redis.call('INCR', key)
  if count == 1 then redis.call('EXPIRE', key, ARGV[1]) end
end
redis.call('SET', KEYS[4], ARGV[5] .. ':pending', 'EX', ARGV[6])
redis.call('SET', KEYS[5], 'pending', 'EX', ARGV[6])
return 1`;

const FINISH_SCRIPT = `
if redis.call('GET', KEYS[1]) ~= ARGV[1] .. ':pending'
  or redis.call('GET', KEYS[2]) ~= 'pending' then return 0 end
if ARGV[2] == 'accepted' then
  redis.call('SET', KEYS[1], ARGV[1] .. ':accepted', 'EX', ARGV[3])
  redis.call('SET', KEYS[2], 'accepted', 'EX', ARGV[3])
else
  redis.call('DEL', KEYS[1], KEYS[2])
end
return 1`;

const DEDUP_SECONDS = 86400;
// The official Formspree client identifies successful submissions using `next`.
// We check HTTP status and reject explicit errors as well; no redirect is followed.
const acceptedSubmission = z.object({
  next: z.string(),
  ok: z.boolean().optional(),
  error: z.unknown().optional(),
  errors: z.unknown().optional(),
}).refine(value => value.ok !== false && value.error === undefined && value.errors === undefined);

function contactResponse(status: number, requestId: string, code?: string) {
  return Response.json(code ? { ok: false, code } : { ok: true }, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Contact-Request-Id": requestId,
      ...(status === 429 ? { "Retry-After": "3600" } : {}),
    },
  });
}

class OversizedBody extends Error {}

async function readBody(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length"));
  if (length > CONTACT_LIMITS.bodyBytes) throw new OversizedBody();
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > CONTACT_LIMITS.bodyBytes) {
      await reader.cancel();
      throw new OversizedBody();
    }
    chunks.push(value);
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)));
}

export async function handleContact(
  request: Request,
  dependencies: ContactDependencies = { env: process.env, fetch },
): Promise<Response> {
  const requestId = randomUUID();
  const reply = (status: number, code?: string) => contactResponse(status, requestId, code);
  function configurationStatus(name: ConfigurationName): "missing" | "invalid" | "valid" {
    const value = dependencies.env[name];
    return !value?.trim() ? "missing" : configuration.shape[name].safeParse(value).success ? "valid" : "invalid";
  }
  const environmentStatus = {
    FORMSPREE_FORM_ID: configurationStatus("FORMSPREE_FORM_ID"),
    UPSTASH_REDIS_REST_URL: configurationStatus("UPSTASH_REDIS_REST_URL"),
    UPSTASH_REDIS_REST_TOKEN: configurationStatus("UPSTASH_REDIS_REST_TOKEN"),
  };
  let formspreeAttempted = false;
  let formspreeAcceptanceConfirmed = false;
  let formspreeStatus: number | undefined;
  function diagnose(stage: DiagnosticStage, category: DiagnosticCategory, metadata: { upstreamStatus?: number; redisResult?: number } = {}) {
    const event: ContactDiagnostic = {
      requestId, stage, category, configuration: environmentStatus,
      formspreeAttempted, formspreeAcceptanceConfirmed, formspreeStatus, ...metadata,
    };
    // The event contains only controlled categories, flags, statuses and a random ID.
    // A logging failure must never turn a handled contact failure into an exception.
    try {
      if (dependencies.diagnose) dependencies.diagnose(event);
      else console.warn("[contact]", JSON.stringify(event));
    } catch { /* Logging is best effort; delivery protection is not. */ }
  }
  if (request.method !== "POST") return reply(405, "invalid");
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return reply(403, "invalid");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return reply(415, "invalid");
  }

  let input: unknown;
  try {
    input = await readBody(request);
  } catch (error) {
    return reply(error instanceof OversizedBody ? 413 : 400, "invalid");
  }
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success || parsed.data.company.trim()) return reply(400, "invalid");
  const idempotencyKey = request.headers.get("idempotency-key") ?? randomUUID();
  if (!z.string().uuid().safeParse(idempotencyKey).success) return reply(400, "invalid");

  const config = configuration.safeParse(dependencies.env);
  if (!config.success) {
    diagnose("configuration", "invalid_environment");
    return reply(503, "unavailable");
  }
  const { name, email, message } = parsed.data;
  const env = config.data;
  // Trust only Vercel's platform header. Other deployments share a conservative bucket
  // until their reverse proxy is explicitly integrated; arbitrary X-Forwarded-For is ignored.
  const forwarded = dependencies.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.trim() : undefined;
  const ip = forwarded && isIP(forwarded) ? forwarded : "untrusted-client";
  const hash = (value: string) => createHmac("sha256", env.UPSTASH_REDIS_REST_TOKEN).update(value).digest("hex");
  const prefix = `portfolio-contact:{${hash(env.FORMSPREE_FORM_ID).slice(0, 16)}}`;
  const fingerprint = hash(JSON.stringify([name, email.toLowerCase(), message, portfolio.contact.emailSubject]));
  const attemptKey = `${prefix}:attempt:${hash(idempotencyKey)}`;
  const contentKey = `${prefix}:content:${fingerprint}`;

  async function redis(command: (string | number)[], stage: DiagnosticStage) {
    let upstreamStatus: number | undefined;
    try {
      const response = await dependencies.fetch(env.UPSTASH_REDIS_REST_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(command),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });
      upstreamStatus = response.status;
      if (!response.ok) {
        diagnose(stage, response.status === 401 || response.status === 403 ? "authentication"
          : response.status === 429 ? "upstream_rate_limit" : "http_error", { upstreamStatus });
        return undefined;
      }
      const body: unknown = await response.json();
      const providerError = z.object({ error: z.string() }).safeParse(body);
      if (providerError.success) {
        diagnose(stage, redisErrorCategory(providerError.data.error), { upstreamStatus });
        return undefined;
      }
      const result = z.object({ result: z.number().int().min(0).max(4) }).safeParse(body);
      if (!result.success) {
        diagnose(stage, "unexpected_response", { upstreamStatus });
        return undefined;
      }
      return result.data.result;
    } catch (error) {
      diagnose(stage, exceptionCategory(error), { upstreamStatus });
      return undefined;
    }
  }

  async function finish(state: "accepted" | "rejected") {
    const stage = state === "accepted" ? "redis_record_acceptance" : "redis_release_rejection";
    const result = await redis(["EVAL", FINISH_SCRIPT, 2, attemptKey, contentKey, fingerprint, state, DEDUP_SECONDS], stage);
    if (result !== undefined && result !== 1) diagnose(stage, "state_conflict", { redisResult: result });
    return result === 1;
  }

  const claim = await redis(["EVAL", CLAIM_SCRIPT, 5,
    `${prefix}:ip:${hash(ip)}`, `${prefix}:email:${hash(email.toLowerCase())}`, `${prefix}:global`,
    attemptKey, contentKey, 3600, 5, 3, 30, fingerprint, DEDUP_SECONDS], "redis_claim");
  if (claim === undefined) return reply(503, "unavailable");
  if (claim === 0) {
    diagnose("redis_claim", "rate_limited", { redisResult: claim });
    return reply(429, "rate_limited");
  }
  if (claim === 2) return reply(200);
  if (claim !== 1) {
    diagnose("redis_claim", claim === 3 ? "duplicate_uncertain" : "duplicate_conflict", { redisResult: claim });
    return reply(409, "failed");
  }

  try {
    formspreeAttempted = true;
    const sent = await dependencies.fetch(`https://formspree.io/f/${env.FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name, email, message,
        subject: portfolio.contact.emailSubject,
        _gotcha: "",
      }),
      redirect: "error",
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    formspreeStatus = sent.status;
    if (!sent.ok) {
      diagnose("formspree", "http_error", { upstreamStatus: sent.status });
      // An explicit 4xx rejection can be retried manually. Unknown outcomes stay
      // claimed: retrying them could send another email without provider dedup.
      if ([400, 401, 403, 404, 405, 410, 413, 415, 422, 429].includes(sent.status)) {
        if (!await finish("rejected")) return reply(503, "unavailable");
      }
      return reply(sent.status === 429 ? 429 : 502, sent.status === 429 ? "rate_limited" : "failed");
    }
    const accepted = acceptedSubmission.safeParse(await sent.json());
    if (!accepted.success) {
      diagnose("formspree", "unexpected_response", { upstreamStatus: sent.status });
      return reply(502, "failed");
    }
    formspreeAcceptanceConfirmed = true;
    return await finish("accepted") ? reply(200) : reply(503, "unavailable");
  } catch (error) {
    diagnose("formspree", exceptionCategory(error), { upstreamStatus: formspreeStatus });
    return reply(502, "failed");
  }
}
