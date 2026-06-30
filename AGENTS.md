# AGENTS.md — NextJS Auth Starter Kit Documentation Project

> **Project**: Standalone documentation site for [starterkit-auth-nextjs](https://github.com/M-Ridho-Fauzan/docs-starter-kit-nextjs-auth) — a Next.js 16 auth starter kit built on Better Auth.
>
> **Source project**: `../..` (the parent directory is the starter kit itself)
>
> **Stack**: Next.js 16 (App Router) + Fumadocs MDX (content pipeline) + shadcn/ui (design system) + Tailwind CSS v4, deployed to Vercel

---

## Directory Structure

```
├── AGENTS.md              ← You are here
├── README.md              ← Project overview (user-facing)
├── DESIGN.md              ← Design decisions and architecture
├── PLAN.md                ← Implementation plan (9 phases)
├── FLOW.md                ← Development workflow and commands
├── .agents/
│   ├── commands/          ← Custom commands
│   ├── decisions/         ← Design decisions
│   ├── reviews/           ← Review output
│   └── skills/
│       └── docs-writing/  ← Documentation skill
├── content/
│   └── docs/              ← MDX content source
│       ├── index.mdx      ← Master table of contents
│       ├── get-started/
│       ├── auth-features/
│       ├── database/
│       ├── api/
│       ├── ui/
│       ├── guides/
│       ├── reference/
│       └── examples/
├── app/                   ← Next.js App Router pages
│   ├── layout.tsx         ← Root layout (ThemeProvider, fonts)
│   ├── page.tsx           ← Homepage (hero + feature grid)
│   └── docs/
│       └── [[...slug]]/page.tsx  ← Docs catch-all (i18n comes in Phase 7)
│   ├── globals.css        ← Tailwind + oklch tokens
│   └── api/search/route.ts ← Orama search API
├── lib/
│   ├── utils.ts           ← cn() utility
│   ├── source.ts          ← Fumadocs content source
│   └── i18n.ts            ← next-intl config
├── components/
│   ├── ui/                ← shadcn/ui primitives (button, card, sheet, separator, scroll-area)
│   ├── layout/            ← Navbar, sidebar, TOC, footer, mobile-nav, docs-layout
│   ├── docs/              ← MDX components (callout, code-block, tabs, steps)
│   └── config-builder.tsx ← Interactive auth.config.ts builder
├── messages/
│   ├── en.json            ← English UI strings
│   └── id.json            ← Indonesian UI strings
├── source.config.ts       ← Fumadocs MDX configuration
├── next.config.mjs        ← Next.js + MDX plugin config
├── tailwind.config.ts     ← shadcn/ui + oklch theme
├── postcss.config.mjs     ← PostCSS with Tailwind
├── components.json        ← shadcn/ui configuration
└── package.json
```

---

## Agent Roles

### architect (Plan mode)

Activated when: designing new doc pages, resolving structure ambiguity, or choosing between documentation patterns.

Responsibilities:

- Design doc outline BEFORE writing content
- Evaluate Diataxis framework compliance (tutorial, how-to, reference, explanation)
- Evaluate whether changes affect the content pipeline (fumadocs-mdx) or the custom layout components
- Output every decision to `.agents/decisions/`
- Never write content — only outlines and specifications

### builder (Build mode)

Activated when: a design doc exists in `.agents/decisions/`.

Responsibilities:

- Read the design doc FIRST, then write exactly what is specified
- One section at a time — do not start next until current passes review
- Follow the docs-writing skill rules
- Verify all source links resolve to actual files
- Add SEO metadata to every page (description, heading hierarchy, cross-links)
- Update the checklist in this file after each completed item
- Run `pnpm build` to verify production build after each content change

### reviewer

Activated by: `review` command or manually before completing a section.

Responsibilities:

- Check all source file links resolve (relative paths to `../../src/...`)
- Check code examples are accurate and match the actual API
- Verify every doc has: title, description, proper heading hierarchy, related links
- Check Diataxis classification (tutorial vs how-to vs reference vs explanation)
- Validate no broken internal cross-references
- Output review to `.agents/reviews/`

---

## SEO Standards (applied to every page)

Every `.md` or `.mdx` file MUST start with a metadata block:

```markdown
---
title: Feature Name
description: One-sentence description of what this page covers, including keywords like "Next.js 16", "Better Auth", "authentication".
---
```

Additional SEO rules:

- **h1** (`# Title`) — must match `title` frontmatter, include primary keyword
- **h2** (`## Section`) — descriptive, use natural language questions/phrases
- **Never skip heading levels** — h1 → h2 → h3, no h1 → h3
- **Internal links** — every page links to at least 2 related pages
- **Code blocks** — always specify language (` ```typescript `, ` ```bash `)
- **Tables** — use markdown tables for config options and API references
- **Lists** — use bullet lists for pros/cons, numbered lists for step-by-step

---

## Writing Standards

1. **Diataxis Framework** — classify each page as one of:
   - **Tutorial** — step-by-step, learning-oriented ("Installation", "Quick Start")
   - **How-to guide** — goal-oriented, practical steps ("Deploy to production", "Add a custom provider")
   - **Reference** — information-oriented, descriptive ("Config Schema", "TypeScript Types")
   - **Explanation** — understanding-oriented, background ("Session strategies", "How the mapper works")

2. **Voice** — Active voice, direct, technical. "Configure this option in `auth.config.ts`." NOT "This option can be configured in the auth.config.ts file."

3. **Code examples** — Every server action, hook, and component MUST have a working TypeScript example.

4. **Cross-references** — Every doc ends with a "Related" section linking to at least 2 related docs.

5. **Source links** — Reference actual source files: `[source](../src/lib/auth/actions/email-password.ts)`. All relative paths are relative to the doc file itself, targeting `../../src/...`.

---

## Commands Reference

Commands are user-invoked workflows defined in `.agents/commands/`. Use them from OpenCode with `/run [command]`.

| Command         | When to use              | What it does                                                                                                      |
| --------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `next-task`     | Start of each session    | Reads AGENTS.md checklist, identifies the next unchecked item, reports target file                                |
| `write-section` | When writing content     | Writes or updates a section following the docs-writing skill rules                                                |
| `seo-audit`     | After content is written | Audits all files for SEO compliance (frontmatter, headings, links, descriptions)                                  |
| `review`        | Before finalizing        | Runs content review for accuracy, completeness, and consistency                                                   |
| `check-links`   | Anytime                  | Verifies all internal markdown links resolve to actual files                                                      |
| `translate-to`  | When translating docs    | Translates all untranslated `.mdx` files from English to a target locale; auto-configures new languages if needed |

### Workflow

Typical documentation session:

```bash
# 1. Start session
/run next-task

# 2. Write the identified section
/run write-section

# 3. Check links
/run check-links

# 4. Review
/run review

# 5. Before finalizing
/run seo-audit
```

### Translation workflow

```bash
# Translate all untranslated files from English to a target locale
/run translate-to id    # Translate EN → Indonesian
/run translate-to ja    # Translate EN → Japanese (prompts to configure ja first)
```

---

## Next.js Workflow

Commands for the Next.js-based build process:

```bash
# Development
pnpm dev                  # Dev server (hot reload) → http://localhost:3000
pnpm dev --port 3001      # Dev server on alternate port

# Build & test
pnpm build                # Production build
pnpm start                # Preview production build

# i18n
pnpm dev                  # Dev server with locale routing
                          # → http://localhost:3000/en/docs/...
                          # → http://localhost:3000/id/docs/...

# Content
pnpm fumadocs              # Fumadocs CLI utilities

# Deployment
vercel --prod             # Deploy to Vercel
```

### OpenCode session pattern for Next.js

```
1. Read DESIGN.md, PLAN.md, FLOW.md at session start
2. Execute current Phase from PLAN.md checklist below
3. Run pnpm dev for live preview
4. Run pnpm build to verify production build
5. /run check-links and /run seo-audit after content changes
6. Update checklist below after each phase
```

---

## Framework Migration Checklist

Builder updates this as phases are completed. Before starting a phase, read `PLAN.md` for detailed steps.

- [x] Phase 1: Scaffold Next.js project via shadcn + install Fumadocs
- [x] Phase 2: Configure content pipeline (fumadocs-mdx, source.config.ts)
- [x] Phase 3: Migrate content (docs/ → content/docs/, .md → .mdx)
- [x] Phase 4: Build custom layout (navbar, sidebar, TOC, footer)
- [x] Phase 5: Theme system (oklch tokens, dark/light mode, shadcn/ui)
- [x] Phase 6: Search (Orama via fumadocs-core)
- [x] Phase 7: i18n (next-intl, locale routing, UI translations)
- [x] Phase 8: Interactive Config Builder
- [x] Phase 9: SEO & Deploy (sitemap, metadata, Vercel)

Reference docs: `DESIGN.md` for design decisions, `PLAN.md` for implementation steps, `FLOW.md` for commands.

---

## Content Checklist (33 pages + 8 section indexes — migrated in Phase 3)

Builder updates this as content migration is completed.

### Get Started (5 pages)

- [x] `get-started/installation.md` → `content/docs/get-started/installation.mdx`
- [x] `get-started/quick-start.md` → `content/docs/get-started/quick-start.mdx`
- [x] `get-started/configuration.md` → `content/docs/get-started/configuration.mdx`
- [x] `get-started/environment-variables.md` → `content/docs/get-started/environment-variables.mdx`
- [x] `get-started/project-structure.md` → `content/docs/get-started/project-structure.mdx`

### Auth Features (6 pages)

- [x] `auth-features/email-password.md` → `content/docs/auth-features/email-password.mdx`
- [x] `auth-features/email-verification.md` → `content/docs/auth-features/email-verification.mdx`
- [x] `auth-features/password-reset.md` → `content/docs/auth-features/password-reset.mdx`
- [x] `auth-features/oauth.md` → `content/docs/auth-features/oauth.mdx`
- [x] `auth-features/two-factor.md` → `content/docs/auth-features/two-factor.mdx`
- [x] `auth-features/roles.md` → `content/docs/auth-features/roles.mdx`

### Database (5 pages)

- [x] `database/overview.md` → `content/docs/database/overview.mdx`
- [x] `database/adapters/prisma.md` → `content/docs/database/adapters/prisma.mdx`
- [x] `database/adapters/drizzle.md` → `content/docs/database/adapters/drizzle.mdx`
- [x] `database/adapters/kysely.md` → `content/docs/database/adapters/kysely.mdx`
- [x] `database/schema-reference.md` → `content/docs/database/schema-reference.mdx`

### API (4 pages)

- [x] `api/server-actions.md` → `content/docs/api/server-actions.mdx`
- [x] `api/hooks.md` → `content/docs/api/hooks.mdx`
- [x] `api/server-utils.md` → `content/docs/api/server-utils.mdx`
- [x] `api/middleware.md` → `content/docs/api/middleware.mdx`

### UI (3 pages)

- [x] `ui/auth-components.md` → `content/docs/ui/auth-components.mdx`
- [x] `ui/user-components.md` → `content/docs/ui/user-components.mdx`
- [x] `ui/theming.md` → `content/docs/ui/theming.mdx`

### Guides (4 pages)

- [x] `guides/deployment.md` → `content/docs/guides/deployment.mdx`
- [x] `guides/testing.md` → `content/docs/guides/testing.mdx`
- [x] `guides/prisma-migration.md` → `content/docs/guides/prisma-migration.mdx`
- [x] `guides/advanced-customization.md` → `content/docs/guides/advanced-customization.mdx`

### Reference (3 pages)

- [x] `reference/config-schema.md` → `content/docs/reference/config-schema.mdx`
- [x] `reference/types.md` → `content/docs/reference/types.mdx`
- [x] `reference/cli-tools.md` → `content/docs/reference/cli-tools.mdx`

### Examples (2 pages)

- [x] `examples/protected-layout.md` → `content/docs/examples/protected-layout.mdx`
- [x] `examples/custom-adapter.md` → `content/docs/examples/custom-adapter.mdx`
