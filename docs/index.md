---
sidebar_position: 0
title: Documentation Index
description: Complete table of contents for the Next.js 16 Auth Starter Kit documentation. Find guides, API references, and examples for all authentication features.
---

# Documentation Index

## [Get Started](./get-started/installation.md)

Start here if you're new to the project.

- [Installation](./get-started/installation.md) — Prerequisites, clone, install, environment setup
- [Quick Start](./get-started/quick-start.md) — 5-minute guide from zero to running app
- [Configuration](./get-started/configuration.md) — All `auth.config.ts` options explained
- [Environment Variables](./get-started/environment-variables.md) — Complete `.env` reference
- [Project Structure](./get-started/project-structure.md) — File and folder organization

## [Auth Features](./auth-features/email-password.md)

Authentication and authorization features.

- [Email & Password](./auth-features/email-password.md) — Registration and login
- [Email Verification](./auth-features/email-verification.md) — Verification flow
- [Password Reset](./auth-features/password-reset.md) — Forgot and reset password
- [OAuth / Social Login](./auth-features/oauth.md) — GitHub, Google, custom providers
- [Two-Factor Authentication](./auth-features/two-factor.md) — TOTP 2FA
- [Role & Permission System](./auth-features/roles.md) — Role-based access control

## [Database](./database/overview.md)

Database adapters and schema.

- [Database Overview](./database/overview.md) — Adapter concept and selection
- [Prisma Adapter](./database/adapters/prisma.md) — Setup and configuration
- [Drizzle Adapter](./database/adapters/drizzle.md) — Setup and configuration
- [Kysely Adapter](./database/adapters/kysely.md) — Setup and configuration
- [Schema Reference](./database/schema-reference.md) — Database model definitions

## [API Reference](./api/server-actions.md)

Server and client API reference.

- [Server Actions](./api/server-actions.md) — All 11 server actions with types
- [React Hooks](./api/hooks.md) — All 13 client hooks
- [Server Utilities](./api/server-utils.md) — `getServerSession`, `hasRole`, `getUserRole`
- [Middleware](./api/middleware.md) — Route protection and role checks

## [UI Components](./ui/auth-components.md)

User interface components.

- [Auth Components](./ui/auth-components.md) — Login, register, and password forms
- [User Components](./ui/user-components.md) — Profile, 2FA setup, backup codes
- [Theming](./ui/theming.md) — Dark mode, CSS variables, Tailwind

## [Guides](./guides/deployment.md)

Practical how-to guides.

- [Deployment](./guides/deployment.md) — Production deployment on Vercel
- [Testing](./guides/testing.md) — Writing and running tests
- [Prisma Migration](./guides/prisma-migration.md) — Database schema management
- [Advanced Customization](./guides/advanced-customization.md) — Custom adapters and plugins

## [Reference](./reference/config-schema.md)

Complete reference documentation.

- [Config Schema](./reference/config-schema.md) — Every config option, type, and default
- [TypeScript Types](./reference/types.md) — Type exports and their definitions
- [CLI Tools](./reference/cli-tools.md) — Setup wizard and environment generator

## [Examples](./examples/protected-layout.md)

Complete code examples.

- [Protected Layout](./examples/protected-layout.md) — Route protection with auth and roles
- [Custom Adapter](./examples/custom-adapter.md) — Implementing a custom database adapter
