# Codex handoff

Updated 2026-11-04 from the working tree. Current source and portfolio JSON take precedence over historical plans. This document does not authorize deployment or changes to unrelated sections.

## Project architecture

- **Stack:** Next.js 15.5.9 App Router, React 19, TypeScript 5, Tailwind 3, Radix UI, Lucide, Zod. Contact uses server-side `fetch`, not a provider SDK. Firebase/Genkit and Framer Motion remain installed; shared entrances use CSS/IntersectionObserver.
- **Entry points:** `src/app/layout.tsx` loads DM Sans, metadata, the initial `LoadingScreen`, and `ContactProvider`. `src/app/page.tsx` renders Navbar and the active view. `src/hooks/useView.ts` switches local state and scrolls to top. The four tabs live within `/`, not separate routes. Legacy `services` remains a type value but Home does not render it.
- **Views/components:** `src/views/` holds Profile, Background, Projects, Gear, and retained Services. Feature components live under `src/components/profile/`, `projects/`, `gear/`, and `contact/`; reusable primitives live under `ui/`. Profile mounts only `HeroSection`. Projects search/filter logic exists, but its controls are commented out. Older sections remain unmounted.
- **Content:** `src/data/portfolio.json` → `src/types/portfolio.ts` → `src/lib/portfolio.ts` provides typed content without casts. `ContentText` supports escaped text, named tokens, and limited `**bold**` emphasis; no arbitrary HTML/Markdown. See [editing guide](portfolio-content.md).
- **Styling/assets:** `globals.css`, `tailwind.config.ts`, and component classes own styling. `.page-container` is `mx-auto w-full max-w-7xl px-5 md:px-6` (1280px maximum, 20/24px padding). Navbar shares it; stable scrollbar gutters prevent tab shifts. Local asset paths resolve under `public/`.
- **Animation:** `Reveal.tsx` uses IntersectionObserver (threshold 0.08), 24px upward movement, opacity 0→1, 500ms `ease`, and optional delay. It replays on view mounts and shows content immediately for reduced motion.
- **Modals:** Contact/Gear use Radix dialogs. Projects and About Me have custom implementations; inspect their accessibility independently.
- **Checks:** `scripts/validate-portfolio.cjs` checks the typed content boundary and references/assets. `tests/contact.test.ts` uses Node's runner with `tsx`.

## Content conventions and completed work

Editable copy, facts, links, assets, arrays, and labels belong in JSON; behavior, icons, containers, and animation timing belong in React/CSS.

| Area | Current state |
| --- | --- |
| Navbar | Shared alignment across all four views, stable scrollbar gutters, right-aligned desktop links, mobile bottom navigation. |
| Splash | Green logo navigation transition removed. A separate black initial name/typewriter loader remains. |
| Entrances | Shared `Reveal` across Profile, Background, Projects, and Gear. |
| Profile | Latest short introduction retained with bold location/job title and shared JSON tokens. |
| Background | Two AgentGenius.ai roles with general NDA-safe bullets; SDO experience retained; BPSU 2022–2026 degree, Cum Laude, Dean's Lister, and Athlon thesis leadership/design contribution. |
| Technology stacks | Separate AgentGenius role stacks, updated SDO stack, and education stack. Nonempty role `stack` overrides organization `stack`; fallback is retained without an extra duplicate row. |
| Removed links/project | Experience Related Projects links/data removed. `provident-fund` removed from Projects; `expertise.featuredProject` is empty. Assets/source and SDO experience retained. Five projects remain. |
| Contact | Required fields, client/server validation, loading/errors, contact triggers, accessible Radix behavior. Resend migrated to Formspree; Upstash protections retained. |
| Success state | Compact confirmation replaces form heading/description; reset clears the form and focuses Name without sending. Check icon intentionally hidden at owner's request. Closing/reopening retains mounted state. |
| Gear | Seven original items, updated JSON introduction, contained 4:3 images, compact clickable cards, hover/focus feedback, 2/3/4-column grid, detail dialogs. See close-control issue below. |

Rendered Profile introduction:

> Based in Bataan, Philippines, I'm a Lead AI Automation Engineer at AgentGenius.ai, working with an international team to develop and lead project modules across time zones.

`profile.currentExperienceId` selects the employer; its first role supplies the current title. Keep roles newest first. Education supports optional `description` and `stack` with achievements. Project cards/modals share the same records.

Exact success copy in `contact`: “Message delivered. No bugs found.” / “Your message made it through the pipeline. I'll get back to you soon.” / “Send another message”.

Gear's optional `description` appears only when nonempty; all seven are currently empty. Optional `specifications` remain in the type but are not rendered. Do not invent descriptions/specifications. Personal About Me uses `profile.about`, facts, interests, and photos; the separate professional `about` block and services/process data serve older unmounted components.

## Contact implementation and operations

`ContactProvider`/`ContactModal` → `POST /api/contact` → `src/lib/server/contact.ts` → Upstash claim/limits → Formspree → Redis acceptance record. The route uses Node.js with `maxDuration = 30`. Zod validation lives in `src/lib/contact-validation.ts`.

Private variable names (no `NEXT_PUBLIC_` prefixes):

```dotenv
FORMSPREE_FORM_ID=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Use root `.env.local` locally and hosting settings remotely. `.env.example` is an empty template, not loaded by Next.js. Restart after changes. Do not print, commit, or request private values. The recipient lives in Formspree; no Resend key or custom sending domain is used.

- Required name/email/message limits: 100/254/5000 characters; normalized plain text, strict fields, 32KiB streaming body limit, honeypot, and origin checks.
- Atomic Redis counters allow 5/trusted IP, 3/email, 30/form per one-hour window. Vercel's platform IP header is supported; localhost/other hosts share the conservative 5/hour client bucket until a trusted proxy adapter exists.
- Claim both attempt UUID and normalized-content fingerprint before forwarding. Record confirmed acceptance before returning success; accepted duplicates return cached success. Pending/uncertain duplicates are not resent. Claims expire after 24 hours. Specific definitive rejections release claims; counters remain consumed.
- Fail closed on missing configuration/Redis failures. Never bypass protections, automatically retry ambiguous sends, clear claims, or rotate configuration to force a retry. Check the provider dashboard and inbox first.
- `[contact]` logs contain controlled stage/category, request ID, configuration validity flags, HTTP status, and state flags; never raw messages, identities, or credentials. See [setup/503 diagnostics](contact-setup.md).

The owner confirmed a real Formspree inbox delivery in local development after configuration was corrected. No new live message was sent for this documentation task. Recheck delivery and Reply-To on the intended deployment; mocked tests/provider acceptance alone do not prove inbox delivery.

## Important constraints

- Preserve JSON as the editable content source, white-and-green design, navbar alignment, Reveal behavior, accessibility, responsiveness, and reduced-motion support.
- Never expose NDA-protected AgentGenius.ai projects, client systems, internal architecture, or certificate-distribution details.
- Do not restore experience Related Projects links or the removed SDO showcase. Retain SDO work experience and existing assets.
- Keep About Me personal and casual. Keep focused tasks scoped; do not rewrite unrelated sections, change contact protections, or introduce unnecessary dependencies.
- Do not generate case studies or invent project facts. Projects content refinement and About Me photo updates are on hold.

## Current validation and known issues

Documentation-pass checks, 2026-11-04, Node.js 24.13.0:

| Check | Result |
| --- | --- |
| `npm run validate:content` | Passed; typed structure/references/IDs/placeholders/contact links and 35 local assets. |
| `npm run test:contact` | Passed, 22 mocked tests; no live email. |
| `npm run validate` | Failed: no script named `validate`. Package scripts intentionally unchanged. |
| `npm run typecheck` | Only the three existing calendar errors below. |
| `git diff --check` | Passed on the final working tree. |
| Relative Markdown links | Checked in README/docs; historical inline filename issues noted below. |
| Build/browser regression | Not run during this documentation-only task. |

Existing errors in `src/components/ui/calendar.tsx`: 57:9 TS2353 (`IconLeft` is not in `Partial<CustomComponents>` with installed `react-day-picker` v9); 57:22 and 60:23 TS7031 (`className` implicitly `any`). Leave these for a separate task.

`next.config.ts` skips build-time TypeScript/ESLint checks. `npm run lint` exists but ESLint configuration is absent; only CLI help was checked here. `npm run build` has a POSIX `NODE_ENV=production` prefix incompatible with Windows' default npm shell. Windows equivalent: `npm run validate:content`, then `npx --no-install next build`; use `npm start` after building.

Earlier session checks reported Contact at 1440/1024/390/320px and Gear at 1440/1024/768/390/320px, including images, keyboard interactions, overflow, and reduced motion. These are prior results, not fresh verification of every current edit. Current Gear has an empty `DialogClose` without icon or accessible label; review separately. The initial `LoadingScreen` has no reduced-motion branch. Neither was changed in this documentation task.

The tree already contained Contact/Gear/data/type edits and untracked `src/components/gear/` when this task began. Preserve them; inspect `git status` rather than assuming a clean tree or completed commit.

## Remaining tasks

1. Review certifications and skills with the owner; do not infer credentials, dates, or technologies.
2. Review project documentation and add verified notes only where useful. Optional future structure: `docs/projects/<project-id>.md` with purpose, personal role, implementation notes, validation, and verified links. JSON remains authoritative display content; no writeups were generated here.
3. Projects content refinement — **on hold**.
4. About Me photo updates — **on hold**.
5. Review remaining modal responsiveness/accessibility, starting with Gear's empty close control; inspect custom About Me/Project behavior independently.
6. Review current engineering focus: `profile.currentFocus` lists AI Automation, Backend Systems, Workflow Automation, API Development, but its older section is not mounted. Confirm intended content/display before changes.
7. Final visual/mobile polish: modal scroll-lock alignment, card proportions, short-height screens, focus behavior, reduced motion, and 320px overflow checks.
8. Fix existing calendar TypeScript errors separately; consider validation/lint script cleanup as another scoped task.
9. Verify production build, host-specific trusted IP handling, and deployed inbox/Reply-To delivery. No deployment is established by this handoff.

## Documentation audit

Current guides: [README](../README.md), this handoff, [content editing](portfolio-content.md), and [contact setup](contact-setup.md). Essential corrections now document Gear descriptions/specifications, current contact success behavior, and owner-confirmed local delivery versus outstanding deployment checks.

Historical documents preserved for a separate cleanup:

| Document | Outdated material |
| --- | --- |
| [01_PROJECT_BRIEF.md](01_PROJECT_BRIEF.md), [blueprint.md](blueprint.md) | Work/Services navigation and planned composition differ from Background/Gear. |
| [02_DESIGN_SYSTEM.md](02_DESIGN_SYSTEM.md) | Inter, old palette, and Framer Motion/page-transition prescriptions differ from active DM Sans, CSS tokens, and Reveal. The initial loader separately retains an inline Inter fallback. |
| [03_SITE_STRUCTURE.md](03_SITE_STRUCTURE.md) | Expertise/Services views, mounted sections, search controls, and transition plans differ from current composition. |
| [04_CONTENT.md](04_CONTENT.md) | Editorial specifications and featured-project/focus/services plans are not authoritative displayed content. |
| [05_WIREFRAMES.md](05_WIREFRAMES.md), [06_IMPLEMENTATION.md](06_IMPLEMENTATION.md) | Byte-identical old wireframes, obsolete tabs and mobile menu; the implementation filename is misleading. |
| [CLAUDE_TASK.md](CLAUDE_TASK.md) | Old instructions claim plans override source, prescribe obsolete navigation/transitions, and reference nonexistent `01_PROJECT BRIEF.md`/`03_SITE STRUCTURE.md` filenames. A top notice marks it historical; body retained. |

No historical documents were deleted or comprehensively rewritten. Do not execute their old task instructions as a new request.

## Continuation instructions

1. Read README/handoff, inspect `git status --short` and applicable `AGENTS.md`, and preserve existing work.
2. Inspect current source/JSON/types for the owner's next explicit task; verify this snapshot against changed files. Consult operational guides before historical plans.
3. Establish the baseline with `npm run validate:content`, `npm run test:contact`, and `npm run typecheck`; investigate any errors beyond the known calendar failures.
4. Keep on-hold work paused, changes scoped, and private configuration private. Use browser checks for UI tasks, appropriate validation, and `git diff --check`.
5. Report changed files, evidence, existing failures, and factual/configuration input still needed. Do not infer live delivery or production readiness from mocked tests.
