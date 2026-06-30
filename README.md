---
title: NextJS Auth Starter Kit Documentation
description: Docs for the Next.js 16 auth starter kit. Guides, API reference, and examples for email/password, OAuth, 2FA, and roles with Better Auth.
---

# NextJS Auth Starter Kit Documentation

Documentation for [starterkit-auth-nextjs](https://github.com/anomalyco/opencode) — a production-grade Next.js 16 authentication starter kit built on [Better Auth](https://www.better-auth.com/). Includes email/password authentication, OAuth social login, two-factor authentication (TOTP), role-based access control, session management, and shadcn/ui components.

## Quick Links

- [Getting Started](./get-started/installation.md) — Install and run in 5 minutes
- [Quick Start](./get-started/quick-start.md) — From zero to running app
- [Configuration Reference](./get-started/configuration.md) — All `auth.config.ts` options

## Documentation Sections

| Section | Pages | Description |
|---------|-------|-------------|
| [Get Started](./get-started/installation.md) | 5 | Installation, configuration, environment variables |
| [Auth Features](./auth-features/email-password.md) | 6 | Email/password, OAuth, 2FA, roles, and more |
| [Database](./database/overview.md) | 5 | Adapter setup for Prisma, Drizzle, Kysely |
| [API Reference](./api/server-actions.md) | 4 | Server actions, hooks, utilities, middleware |
| [UI Components](./ui/auth-components.md) | 3 | Auth forms, user profile, theming |
| [Guides](./guides/deployment.md) | 4 | Deployment, testing, migrations, advanced topics |
| [Reference](./reference/config-schema.md) | 3 | Config schema, TypeScript types, CLI tools |
| [Examples](./examples/protected-layout.md) | 2 | Complete code examples |

## About the Project

- **Framework**: Next.js 16 (App Router)
- **Auth Library**: Better Auth
- **Database**: Prisma, Drizzle, or Kysely (configurable)
- **UI**: shadcn/ui with Tailwind CSS v4
- **Language**: TypeScript strict mode

## Internationalization & Translation

The documentation site supports multiple locales via fumadocs-core i18n with directory-based locale detection:

```
content/docs/
├── en/              ← English (source, primary)
├── id/              ← Indonesian
└── ...              ← Future locales
```

Current locale structure: `https://docs.example.com/en/docs/get-started/installation`

### Adding a New Locale

To add a new language, update these files:

| File | Change |
|------|--------|
| `lib/i18n.ts` | Add language code to `languages` array + inline UI translations in `.add()` block |
| `middleware.ts` | Add language code to `languages` array |

### Translating Content

Use the `/run translate-to` command to auto-translate all untranslated files from English to a target locale:

```bash
/run translate-to id     # Translate all EN→ID files not yet in content/docs/id/
/run translate-to ja     # Translate all EN→JA (prompts to configure ja first if not set up)
```

**What the command does:**

1. Scans `content/docs/en/` for all `.mdx` files
2. Compares against files in the target locale directory
3. Identifies files that need translation
4. For each file: translates frontmatter, headings, and prose while preserving code blocks, URLs, API names, and CLI commands
5. Maintains internal link paths (relative paths stay the same)
6. Verifies the build passes with `pnpm build`

**Translation rules:**

- ✅ Translate: frontmatter (title, description), headings, paragraphs, list items, table text, link display text
- ❌ Keep as-is: code blocks, inline code, URLs/paths, API names, variable names, CLI commands, file paths
- ✅ Add a comment block in each file explaining translation guidelines

### Adding a New Locale — Manual Steps

If you prefer to set up a locale manually:

1. Add the language code to `lib/i18n.ts` line 5 (`languages` array in `defineI18n()`)
2. Add the language code to `lib/i18n.ts` line 48 (`locales` const array)
3. Add a new locale block with UI translations inside `.add()` in `lib/i18n.ts`
4. Add the language code to `middleware.ts` line 5 (`languages` array)
5. Create `content/docs/<code>/` directory
6. Copy `.mdx` files from `content/docs/en/` and translate

Then run `/run translate-to <code>` or manually translate each file.
