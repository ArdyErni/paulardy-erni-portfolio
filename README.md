# Paul Ardy Erni — Developer Portfolio

A personal portfolio presenting Paul Ardy Erni's development work, AI automation experience, academic background, and everyday setup. Its minimal white-and-green interface has four navigation views:

- **Profile:** introduction, professional links, resume, and a personal About Me modal.
- **Background:** experience, education, role-specific technologies, and certifications.
- **Projects:** cards and detail modals backed by the same project records.
- **Gear:** a responsive equipment grid with interactive item details.

## Technology and features

- Next.js **15.5.9** App Router, React **19**, and TypeScript **5**.
- Tailwind CSS **3**, CSS custom properties, DM Sans through `next/font`, and Lucide icons.
- Radix UI for Contact/Gear dialogs; shared `Reveal` entrances using IntersectionObserver and CSS transitions with reduced-motion support.
- Zod validation and server-side `fetch` integrations with Formspree and Upstash Redis.
- Node's test runner with `tsx` for contact tests.

Navigation switches views within `/` without a page reload. Shared containers align the navbar and content; mobile uses a bottom navigation bar. Copy, collections, links, and asset references come from one typed JSON source.

Firebase, Genkit, and other starter dependencies remain installed; the active portfolio/contact flow does not require a Firebase database or AI service.

## Local development

Use a Node.js version compatible with Next.js 15 and the test runner's `--import` option. Validation was run with Node.js 24.13.0.

```sh
npm ci
npm run dev
```

Open [localhost:9002](http://localhost:9002). Portfolio views run without contact credentials, but sending requires private configuration.

For a new setup, copy [`.env.example`](.env.example) to root `.env.local` without overwriting an existing private file. Configure these **server-only** variables locally and in your host:

```dotenv
FORMSPREE_FORM_ID=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Use only the Formspree form ID; configure the recipient inbox in Formspree. Never use `NEXT_PUBLIC_` prefixes, put secrets in JSON, or commit private environment files. Next.js does not load `.env.example`; restart development after environment changes.

## Contact architecture

```text
Contact modal → POST /api/contact → Upstash checks/claim
                                  → Formspree → recipient inbox
                                  → Upstash acceptance record
```

The Node.js route validates and normalizes input, checks origins and a honeypot, and uses atomic Redis operations for rate limits and duplicate protection. Formspree uses the visitor's email for Reply-To. Redis failure blocks sending; uncertain submissions are retained without automatic retries. Application diagnostics exclude credentials and submitted messages.

The owner confirmed a real inbox delivery with this integration. Verify delivery again for each deployment. See [contact setup and diagnostics](docs/contact-setup.md).

## Editing content

Edit [`src/data/portfolio.json`](src/data/portfolio.json) for introductions, About Me, experience, education, skills, certifications, projects, Gear, contact copy, labels, and metadata. Repeatable content uses arrays. Paths starting with `/` reference [`public/`](public/).

[`src/types/portfolio.ts`](src/types/portfolio.ts) defines the schema; [`src/lib/portfolio.ts`](src/lib/portfolio.ts) exports typed data and substitutions. React retains layout and behavior. Some legacy fields are not displayed in the four current views. Production content changes require a rebuild. See the [editing guide](docs/portfolio-content.md).

## Build and validation

| Command | Purpose |
| --- | --- |
| `npm run dev` | Turbopack development server on port 9002 |
| `npm run validate:content` | Check typed content, references, IDs, placeholders, contact links, and assets |
| `npm run test:contact` | Mocked API/protection tests; sends no real email |
| `npm run typecheck` | Whole-application TypeScript check |
| `npm run build` | Content validation via `prebuild`, then production build |
| `npm start` | Serve an existing production build |
| `git diff --check` | Check patch whitespace |

The build script uses a POSIX-style environment assignment. On Windows, run:

```sh
npm run validate:content
npx --no-install next build
npm start
```

There is no `npm run validate` script. `npm run lint` exists but ESLint configuration is absent. Type checking reports three existing `calendar.tsx` errors. Next.js currently skips build-time TypeScript and ESLint checks, so a build alone does not establish that those checks pass.

## Documentation and deployment

- [Codex handoff and backlog](docs/CODEX_HANDOFF.md)
- [JSON content editing](docs/portfolio-content.md)
- [Contact setup, abuse controls, and diagnostics](docs/contact-setup.md)

Use a host supporting Next.js Node.js API routes; static export cannot serve `/api/contact`. Configure private variables and outbound HTTPS to both services. Vercel's platform IP header is supported; other hosts share a conservative rate-limit bucket until a trusted proxy adapter is implemented. Review this before public deployment.

Confirm `profile.socials.website`, metadata, assets, and service settings for the intended deployment. Firebase App Hosting configuration is present but does not establish a deployed host or URL. Earlier planning documents are historical; consult the handoff's audit before following them.
