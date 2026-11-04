# Editing portfolio content

Edit `src/data/portfolio.json` for portfolio information, visible copy, links, and asset paths. React owns layout, icons, responsive styles, navigation, animation timing, and modal behavior. No HTML belongs in the JSON.

| JSON field | Content |
| --- | --- |
| `profile` | Name, professional subtitle, introduction, location, portrait, resume, social/contact links, availability, personal About Me text, facts, and photo stack |
| `experience` | Organizations, roles (newest first), periods, responsibility bullets, shared technologies, and optional role-specific technology stacks |
| `education` | Institution, degree, duration, achievements, optional thesis/contribution description, optional technology stack, and school seal |
| `certifications` | Names, logos, optional issuers, dates, and credential URLs |
| `projects` | Shared card/modal records: IDs, titles, summaries, descriptions, case studies, categories, technologies, status, thumbnail, gallery paths, and links |
| `gear` | Categories, names, images, optional descriptions, and optional `specifications` arrays of `{ "label": "...", "value": "..." }` |
| `expertise` | Skill categories, featured project ID, and development philosophy |
| `profile.techStack`, `profile.currentFocus`, `profile.quickFacts` | Existing repeatable profile content |
| `about` | Professional About section copy and principles retained for the older AboutSection component |
| `services`, `process` | Existing service descriptions, deliverables, technologies, and development steps |
| `labels` | Editable section headings, action labels, accessibility labels, and supporting copy |
| `site` | Search metadata, logo, favicon, brand, initial loader name, and footer credit |
| `contact` | Contact modal title, description, field labels/errors, submission states, and notification subject |

The current four tabs retain their existing composition. Older sections/components are data-driven but are not newly added to the page. Existing project galleries remain data-only. All 13 certification rows link to their supplied Credly credential URLs in a new tab.

## Introduction and shared facts

The introduction uses plain text with `**bold emphasis**` and named placeholders:

```json
"introduction": "Based in **{location}**, I'm a **{currentRole}** at {currentOrganization}, working with an international team to develop and lead project modules across time zones."
```

Change the wording directly in this string. `{location}` reads `profile.location`. `profile.currentExperienceId` selects the current employer from `experience`; its first role supplies `{currentRole}` and its organization supplies `{currentOrganization}`. The same values are used in the About Me facts. Keep roles newest first.

Other supported profile placeholders are `{name}`, `{title}`, `{interests}`, and `{educationInstitution}` (the first education record). About Me facts use `profile.facts`, an array of label/value pairs. Their values can include these placeholders. The professional About paragraphs also support emphasis and profile placeholders.

Project accessibility labels use `{title}`. Search-result labels use `{query}` and `{category}`. Placeholders are text substitutions; content is escaped by React. Arbitrary HTML or Markdown is not executed.

## Assets and collections

Paths beginning with `/` refer to files in `public`, such as `/user_profile/Formal Picture.jpg`. Keep collection IDs stable and unique. Use `profile.avatar` for the shared portrait and `profile.socials.website` for the website/canonical URL. Contact links are sourced from `profile.socials`.

Project IDs also form shareable `?project=<id>` links. Valid IDs open Projects and the matching dialog on direct visits and refresh; invalid/missing IDs default to Profile. Closing removes the parameter. Opening/closing replaces the current history entry without adding duplicates.

About Me's five current photos are informative. `HeroSection.tsx` supplies verified descriptions for their legacy `Photo 1`–`Photo 5` labels without changing JSON. Custom JSON alternatives, including deliberate empty alternatives for decorative images, take precedence. When updating a photo, provide an accurate `alt` in its JSON record rather than another numbered placeholder; no photo assets were changed for this semantic cleanup.

Add or remove array entries to update collections. The About Me photo stack displays up to five photos at once and cycles through the collection. Gear cards open a detail modal with the item's image, category, and model name. An optional nonempty `description` appears below the name; current descriptions are empty. The optional `specifications` arrays remain supported by the data type but are not rendered by the current Gear cards or modal. Do not invent personal descriptions or specifications.

Each role displays badges from its own `stack` array, falling back to the organization's `stack` when the role stack is omitted or empty. The organization stack is not repeated separately. Education uses `achievements` for academic distinctions, an optional `description` for thesis responsibilities, and an optional `stack` array for badges below the description. Experience cards do not include related-project links. Set `expertise.featuredProject` to an existing project ID, or `""` when no featured project is selected.

Navigation IDs, icon choices, card layout, date formatting behavior, and animation parameters remain presentation/behavior code. Search-console verification is deployment configuration and remains in `layout.tsx`.

## Validation and deployment

Run `npm run validate:content` after editing. It checks the JSON against the TypeScript interfaces, cross-record references, unique IDs, placeholders, contact URLs, and local assets. It also runs before the production build. `npm run typecheck` checks the whole app separately.

Use the [release verification sequence](../README.md#release-verification) for the supported checks and portable production build. There are no generic `validate` or `test` scripts.

Next.js statically imports this content: development updates through hot reload, and production changes require a rebuild/redeployment. Portfolio content remains in JSON rather than a database or CMS.

Contact email delivery and durable abuse counters use server-only service configuration, separate from editable content. See [contact setup](contact-setup.md) for the private environment variables and live-delivery verification steps.

## Migration audit

The four views previously imported JSON independently and cast it through `unknown`. Experience, education, certifications, project cards/modals, and Gear lists already used JSON. Hero copy, portrait, availability, About Me facts/photos, navigation labels, section copy, and metadata still lived in React. Older components duplicated credentials, biographies, identity, resume paths, and process steps.

The rendered site was the migration baseline. The latest introduction and its two bold spans are preserved. The unused `/profile.png` avatar value was replaced with the portrait actually displayed. The current role/employer and location now resolve consistently in the introduction and About Me facts. The older hero now reads the current profile rather than retaining a conflicting introduction. The duplicate credential list and fallback process records were removed.

The About Me recognition text (`Dean's Lister, 2022–2025`) and education duration (`2022–2026`) remain as previously displayed; neither was editorially rewritten. Unmounted sections remain unmounted. Generic accessibility suffixes such as “badge” and “seal,” the resume download filename, icon mappings, dates generated at runtime, and deployment verification remain code because they describe presentation/behavior rather than editable biography.

Files touched by the migration:

- `src/data/portfolio.json`
- `src/types/portfolio.ts`
- `src/lib/portfolio.ts` (new typed content boundary and text substitution)
- `src/components/ContentText.tsx` (new safe emphasis renderer)
- `src/views/ProfileView.tsx`, `BackgroundView.tsx`, `ProjectsView.tsx`, `GearView.tsx`, `ServicesView.tsx`
- `src/components/Navbar.tsx`, `LoadingScreen.tsx`, `Footer.tsx`, `Hero.tsx`, `AboutSection.tsx`, `CertificationsSection.tsx`, `ResumeSection.tsx`
- `src/components/profile/HeroSection.tsx`, `SocialLinks.tsx`, `TechStackStrip.tsx`, `CurrentFocusSection.tsx`, `EducationSection.tsx`, `CertificationsSection.tsx`, `GithubActivity.tsx`
- `src/components/projects/ProjectCard.tsx`, `ProjectModal.tsx`, `SearchInput.tsx`, `FilterChips.tsx`, `EmptyState.tsx`
- `src/components/expertise/FeaturedProjectSection.tsx`
- `src/components/services/ServicesGrid.tsx`, `ServiceCard.tsx`, `DevelopmentProcess.tsx`, `CallToAction.tsx`
- `src/hooks/useView.ts`
- `src/app/layout.tsx`, `robots.ts`, `sitemap.ts`
- `scripts/validate-portfolio.cjs` (new validator), `package.json`, and this guide
