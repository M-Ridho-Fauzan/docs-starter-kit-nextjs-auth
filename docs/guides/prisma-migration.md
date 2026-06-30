---
title: Prisma Migration Guide
description: Database schema management for the Next.js 16 Auth Starter Kit. Run Prisma migrations, push schema changes, and handle production database updates.
---

# Prisma Migration Guide

Manage database schema changes for the Prisma adapter.

## Development

For rapid prototyping, use `db push` to sync schema changes directly:

```bash
npx prisma db push
```

This is safe for local development. It creates or updates tables to match `prisma/schema.prisma`.

## Production

For production, use Prisma Migrate to create version-controlled migrations:

```bash
# Create a migration from schema changes
npx prisma migrate dev --name describe-the-change

# Apply migrations in production
npx prisma migrate deploy
```

## Workflow

### Adding a field

1. Edit `prisma/schema.prisma` to add the field
2. Create a migration: `npx prisma migrate dev --name add-field-name`
3. Review the generated SQL in `prisma/migrations/`
4. Deploy: `npx prisma migrate deploy`

### Adding a model

1. Add the model definition to `prisma/schema.prisma`
2. Create a migration: `npx prisma migrate dev --name add-model-name`
3. Review and deploy

## Schema Location

The Prisma schema is at `prisma/schema.prisma`. It defines four models:

- `user` — User accounts
- `session` — Authentication sessions
- `account` — OAuth accounts and credentials
- `verification` — Email verification and password reset tokens

## Prisma 7 Notes

This project uses Prisma 7, which has a different configuration model:

- `datasource.url` is NOT in `schema.prisma` — it's in `prisma.config.ts`
- Database URL comes from `DATABASE_URL` environment variable
- Connection pooling uses `@prisma/adapter-pg` instead of the deprecated `datasourceUrl` option

## Related

- [Prisma Adapter](../database/adapters/prisma.md) — Prisma setup
- [Schema Reference](../database/schema-reference.md) — Model field reference
- [Database Overview](../database/overview.md) — Adapter comparison
