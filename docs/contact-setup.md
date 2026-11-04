# Contact modal: Formspree setup and verification

The Contact modal posts JSON to `POST /api/contact`. The Next.js route validates fields, checks Redis limits and duplicate records, and submits to `https://formspree.io/f/<FORMSPREE_FORM_ID>`. Formspree notifies the inbox configured in its dashboard. This submission endpoint does not require a custom sending domain or an email-provider API key.

The modal uses Radix focus management, Escape/outside-click closing, scroll locking, and reduced-motion overrides. Its compact success state replaces the form heading/description, intentionally hides the check icon, and offers a secondary reset action that clears the form and focuses Name without sending a request. Closing/reopening retains the mounted submission state. Editable copy and the notification subject come from `contact` in `src/data/portfolio.json`.

## Manual setup in your own accounts

The owner has configured Formspree and Upstash and confirmed a real message reached the inbox in local development. No live form ID or private service configuration is included in the tracked template. The steps below apply to new environments; do not overwrite an existing private `.env.local` configuration.

1. [Create a Formspree account](https://formspree.io/register) and verify your account email.
2. Create a new contact form in its dashboard.
3. Set the form's recipient/Target Email to your inbox. Complete any recipient-verification email, and confirm the form is active and email notifications are enabled. See [Formspree form setup](https://help.formspree.io/articles/building-your-form/building-an-html-form).
4. Open **Integration** and copy the ID after `/f/` in the endpoint. Configure only that ID, not the full URL or an inbox address.
5. Review spam settings for server-to-server submission. This route does not generate browser CAPTCHA tokens or spoof browser session/referrer headers. Use a form without a browser CAPTCHA requirement or browser-referrer restriction for this unchanged UI. If CAPTCHA is required, token/widget support must be implemented before enabling it; the route does not bypass it. See [per-form CAPTCHA settings](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings). The API's honeypot, origin checks, durable rate limits, and duplicate protection remain mandatory regardless of dashboard settings.
6. Create an Upstash Redis database, or reuse the existing one. Obtain its HTTPS REST URL and write-capable REST token. Atomic `EVAL` operations need write permissions. See [Upstash REST setup](https://upstash.com/docs/redis/features/restapi).
7. Copy `.env.example` to `.env.local` locally and configure these values privately. Set the same variables in your deployment dashboard:

   ```dotenv
   FORMSPREE_FORM_ID=
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

   Never use `NEXT_PUBLIC_`, put credentials in JSON, or commit private environment files. Restart local development or redeploy after changing configuration. Separate forms/databases keep development and production quotas and duplicate records isolated.
8. Use the deployed portfolio's Email/contact trigger and submit one real test message with an address you control. Verify it appears in the Formspree submissions dashboard and reaches your inbox. Inspect spam/filtering and notification settings if it is missing.
9. Reply to the notification and confirm the reply targets the visitor's email. Formspree documents that the [`email` field sets Reply-To](https://help.formspree.io/articles/building-your-form/email-reply-to-address).

Local inbox delivery has been confirmed by the owner. Each deployment still requires its own real inbox and Reply-To verification; that deployment validation was not performed during the documentation update. Mocked tests or a successful HTTP response alone are not evidence of inbox delivery or production readiness.

## Submission protocol

The route sends JSON fields `name`, `email`, `message`, `subject`, and an empty `_gotcha`. Headers are `Content-Type: application/json` and `Accept: application/json`. The form ID selects the recipient managed by Formspree. No sender address, recipient address, Authorization credential, or provider idempotency header is supplied.

This follows the [official client request format](https://github.com/formspree/formspree-js/blob/main/packages/formspree-core/src/core.ts), [subject field](https://help.formspree.io/articles/building-your-form/email-subject-line/), and [Reply-To field](https://help.formspree.io/articles/building-your-form/email-reply-to-address). Acceptance requires a successful HTTP status and the `next` success field recognized by the [official client](https://github.com/formspree/formspree-js/blob/main/packages/formspree-core/src/submission.ts), without explicit error fields. The route never follows that redirect or changes the modal flow. Unexpected JSON, HTML, redirects, and provider errors do not produce success.

The Next.js response remains `{ "ok": true }` on confirmed acceptance, or `{ "ok": false, "code": "..." }` on failure. Acceptance is distinct from independently confirmed inbox delivery. There are no automatic provider retries.

## Validation and abuse controls

- Required name (100 characters), valid email (254 characters), and message (5,000 characters), with whitespace/line-ending normalization and control-character rejection.
- JSON-only requests with a streaming 32 KiB limit. Unexpected fields and filled honeypots are rejected before external calls.
- Cross-origin browser submissions are rejected; no cross-origin access headers are added.
- Atomic Redis limits remain 5 allowed new submissions per trusted IP, 3 per visitor email, and 30 across the form, per fixed one-hour window. Denied requests and accepted duplicates do not consume new submission counters.
- Vercel uses its platform `x-vercel-forwarded-for` header. Other hosts ignore user-supplied forwarding headers and share a conservative 5/hour bucket until a trusted proxy adapter is implemented. See [Vercel headers](https://vercel.com/docs/headers/request-headers).
- Redis identifiers/fingerprints use HMAC hashes keyed with the private Redis token. Message contents and raw visitor emails/IPs are not stored in Redis. Rate counters expire after an hour. Application code does not log message contents, credentials, provider bodies, or visitor addresses.
- Missing/invalid configuration or unavailable Redis blocks sending. There is no in-memory or unprotected fallback.

## Duplicate and uncertain submissions

Provider idempotency is not assumed. The browser's existing UUID header identifies an attempt only to this API and is never forwarded to Formspree.

One Redis script atomically checks prior attempt/content records, enforces rate limits, and claims a new attempt before calling the provider. It tracks both the UUID and normalized-content fingerprint, so a page reload or new UUID does not re-forward identical content during the retention window.

- Confirmed acceptance is recorded before success is returned. Accepted repeats return cached success without sending another message.
- In-progress or uncertain attempts return a generic conflict/error and are not forwarded again. Reusing a claimed UUID for different content is rejected.
- Definitive HTTP 4xx provider rejections (validation, authorization, missing forms, and rate limits) release attempt/content claims for deliberate manual retry; rate counters remain consumed. No retry is automatic.
- Timeouts, HTTP 408/409 and 5xx, malformed responses, and uncertain Redis finalization retain claims. This favors duplicate avoidance over automatically attempting delivery again. Failed storage finalization returns unavailable unless a later check can confirm recorded acceptance.

Attempt/content records expire after 24 hours. The unchanged UI retains the draft and uses its existing friendly error copy. Before an operator clears an uncertain claim or manually submits identical content again, verify the Formspree dashboard and recipient inbox. Changing the form ID or Redis token changes the record namespace; configuration rotation must not be used as a retry mechanism.

## Testing and migration inventory

### Diagnosing HTTP 503 without sharing secrets

The API emits server-only lines beginning with `[contact]` for failed configuration, upstream calls, and duplicate/state conflicts. Public responses remain generic. The response header `X-Contact-Request-Id` is an opaque correlation ID matching the server log's `requestId`.

Every application-generated 503 comes from one of these stages:

| Logged stage | What failed | Did this invocation contact Formspree? |
| --- | --- | --- |
| `configuration` | A required variable is missing or syntactically invalid | No; Redis was not contacted either |
| `redis_claim` | Initial atomic rate-limit/duplicate claim could not be completed | No; Redis was attempted |
| `redis_record_acceptance` | Recording an already-confirmed provider acceptance failed or conflicted | Yes; Formspree already confirmed acceptance, so do not blindly resubmit |
| `redis_release_rejection` | Redis could not release the claim after a definitive provider rejection | Yes; Formspree rejected this invocation |

Rate limits return 429, pending/uncertain duplicate attempts return 409, and direct provider/response errors normally return 502. An exception escaping the handler is not one of the application's 503 branches. Request duration alone does not identify the failing stage.

Logs contain only a generated request ID, controlled stage/category names, upstream HTTP status when available, optional Redis numeric result, per-variable `missing`/`invalid`/`valid` flags, and Formspree attempt/acceptance flags. They do not contain configuration values, URLs, tokens, visitor email/IP, message contents, raw provider errors, or exception stacks. `valid` means syntactically valid, not authenticated with the service. `formspreeAttempted` means a fetch was attempted; a network error alone cannot prove the provider received it. `formspreeAcceptanceConfirmed` means the provider response matched acceptance, not that inbox delivery was checked.

To collect diagnostics:

1. Restart/redeploy the updated code in the environment where the failure occurs. If running locally, actual variables must be in the Next server's process or a recognized root `.env.local`/`.env` file. `.env.example` is not loaded, and deployment dashboard variables are not automatically available to localhost. Do not add or share values in chat.
2. Make one intended submission through the normal modal. Do not automatically retry an uncertain submission or clear Redis records to force a send.
3. Share all `[contact] { ... }` server-log lines with that request ID and say whether this is localhost or a deployed site. The request ID is also visible in the failed request's response headers in browser Network tools. Do not share `.env` files, service tokens, full provider responses, or submitted message contents.

For `invalid_environment`, check the named variable's flag. Use only the form ID, an HTTPS Redis REST URL (not `redis://`/`rediss://`), and the REST token. For Redis `authentication` or `permissions`, check the REST credentials and write/EVAL permissions privately. `redis_script`, `redis_wrong_type`, `redis_slot`, `unexpected_response`, `dns`, `timeout`, and `tls` indicate separate categories requiring the matching log rather than guesses. No diagnostic action bypasses validation, rate limits, or duplicate protection.

Run `npm run test:contact`, `npm run validate:content`, and `npm run typecheck`. Mocked tests cover provider success/errors, invalid fields/configuration, honeypots, origins, rate limits, and accepted/pending/uncertain duplicates. Fixtures are nonfunctional and no real messages are sent.

For the complete production-build and local-preview sequence, see [release verification](../README.md#release-verification). Use the explicit scripts above; generic `validate` and `test` aliases are not defined.

Earlier session browser checks covered the modal at 1440, 1024, 390, and 320 px, its states/accessibility, no horizontal overflow, unchanged navbar coordinates, and Reveal animations. They were not repeated during the documentation update. Repeat browser checks after UI changes, and perform a real inbox/Reply-To check after deployment setup.

Files modified for this migration:

- `src/lib/server/contact.ts`: provider replacement and durable duplicate handling; shared validation and protections retained.
- `tests/contact.test.ts`: provider fixtures and duplicate/error coverage.
- `.env.example`: only the three required variable names, with empty values.
- `docs/contact-setup.md`: replaces obsolete domain/email-service setup with this guide.

No files or dependencies needed deletion. The previous integration used direct `fetch`, not an SDK. Existing `server-only`, `tsx`, Zod, modal primitives, shared validation, and Redis utilities remain in use. No portfolio JSON, modal/component source, styling, or copy changed during this migration.
