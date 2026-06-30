---
title: Database Overview
description: Database adapter system for the Next.js 16 Auth Starter Kit. Choose between Prisma, Drizzle, or Kysely adapters for PostgreSQL.
---

# Database Overview

The starter kit supports three database adapters. All use PostgreSQL.

## Adapter Concept

The adapter system uses a registry pattern:

1. **Register** — adapter factories are registered by name (`"prisma"`, `"drizzle"`, `"kysely"`)
2. **Resolve** — the active adapter is resolved from `config.database.adapter`
3. **Create** — the factory creates a Better Auth-compatible adapter instance

The registry is lazy-loaded — only the configured adapter's module is imported at runtime. If you use Prisma, the Drizzle and Kysely packages are never loaded.

## Choosing an Adapter

| Adapter | Best for | Package |
|---------|----------|---------|
| **Prisma** | Standard PostgreSQL, serverless (Neon, Supabase), team projects | `@prisma/client`, `prisma` |
| **Drizzle** | TypeScript-first, lightweight, SQL-like syntax | `drizzle-orm` |
| **Kysely** | Full type safety, SQL-like query builder | `kysely` |

## Configuration

Set your chosen adapter in `auth.config.ts`:

```typescript
export default defineAuthConfig({
  database: {
    adapter: "prisma", // "prisma" | "drizzle" | "kysely"
    url: process.env.DATABASE_URL!,
  },
});
```

All adapters require a PostgreSQL connection string in `DATABASE_URL`.

## Switching Adapters

To switch from one adapter to another:

1. Change `config.database.adapter` in `auth.config.ts`
2. Install the new adapter's packages (if not already installed)
3. Migrate your database schema to the new ORM's format
4. Remove the old adapter's packages (optional)

## Related

- [Prisma Adapter](./adapters/prisma.md) — Setup and configuration
- [Drizzle Adapter](./adapters/drizzle.md) — Setup and configuration
- [Kysely Adapter](./adapters/kysely.md) — Setup and configuration
- [Schema Reference](./schema-reference.md) — Database model definitions
