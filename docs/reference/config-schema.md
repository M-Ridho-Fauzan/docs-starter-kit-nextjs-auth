---
title: Config Schema Reference
description: Complete Zod schema reference for the Next.js 16 Auth Starter Kit auth.config.ts. Every config option, field type, default value, and validation rule.
---

# Config Schema Reference

The complete Zod validation schema for `auth.config.ts`. Every option, type, default, and validation rule.

## Schema Source

The full schema is defined in `src/auth/config/schema.ts`.

## Root Schema

```typescript
AuthConfigSchema = z.object({
  email: EmailConfig.default({}),
  database: DatabaseConfig,
  features: FeaturesConfig.default({}),
  session: SessionConfig.default({}),
  ui: UiConfig.default({}),
});
```

## `EmailConfig`

```typescript
EmailConfig = z.object({
  sendVerificationEmail: z.custom<SendVerificationEmailCallback>().optional(),
  sendPasswordResetEmail: z.custom<SendPasswordResetEmailCallback>().optional(),
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sendVerificationEmail` | `(params) => Promise<void>` | no | Callback for sending verification emails |
| `sendPasswordResetEmail` | `(params) => Promise<void>` | no | Callback for sending password reset emails |

## `DatabaseConfig`

```typescript
DatabaseConfig = z.object({
  adapter: z.enum(["prisma", "drizzle", "kysely", "mongoose"]),
  url: z.string(),
  client: z.unknown().optional(),
}).superRefine((data, ctx) => {
  if (!data.url && !data.client) {
    ctx.addIssue({ /* Either url or client required */ });
  }
});
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `adapter` | `"prisma" \| "drizzle" \| "kysely"` | yes | Database adapter to use |
| `url` | `string` | conditional | Connection string (required if no `client`) |
| `client` | `unknown` | no | Pre-initialized client instance |

## `SessionConfig`

```typescript
SessionConfig = z.object({
  expiresIn: DurationString.default("7d"),
  strategy: z.enum(["jwt", "database"]).default("jwt"),
  cookieName: z.string().default("auth_session"),
  updateAge: DurationString.optional(),
  cookieCache: z.boolean().default(false),
});
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `expiresIn` | `string` | `"7d"` | Session expiration duration |
| `strategy` | `"jwt" \| "database"` | `"jwt"` | Session storage strategy |
| `cookieName` | `string` | `"auth_session"` | Cookie name for session token |
| `updateAge` | `string` | — | Update session expiry threshold |
| `cookieCache` | `boolean` | `false` | Enable cookie caching |

## `FeaturesConfig`

```typescript
FeaturesConfig = z.object({
  emailPassword: EmailPasswordConfig.default({}),
  passwordReset: PasswordResetConfig,
  oauth: OAuthConfig.default({}),
  twoFactor: TwoFactorConfig.default({}),
  roles: RolesConfig.default({}),
});
```

### `EmailPasswordConfig`

```typescript
EmailPasswordConfig = z.object({
  enabled: z.boolean().default(false),
  requireEmailVerification: z.boolean().default(false),
  passwordMinLength: z.number().min(1).default(8),
  passwordMaxLength: z.number().max(256).default(128),
  disableSignUp: z.boolean().default(false),
  autoSignIn: z.boolean().default(true),
});
```

### `PasswordResetConfig`

```typescript
PasswordResetConfig = z.union([
  z.boolean(),
  z.object({ expiresIn: DurationString.optional() }),
]).default(false);
```

### `OAuthConfig`

```typescript
OAuthProviderConfig = z.object({
  enabled: z.boolean().default(false),
  clientId: z.string().optional().default(""),
  clientSecret: z.string().optional().default(""),
});

OAuthConfig = z.object({
  github: OAuthProviderConfig.optional(),
  google: OAuthProviderConfig.optional(),
  custom: z.array(CustomProviderConfig).optional(),
});
```

### `TwoFactorConfig`

```typescript
TwoFactorConfig = z.object({
  enabled: z.boolean().default(false),
  methods: z.array(z.enum(["totp"])).default(["totp"]),
});
```

### `RolesConfig`

```typescript
RolesConfig = z.object({
  enabled: z.boolean().default(false),
  defaultRole: z.string().default("user"),
  roles: z.array(z.string()).default(["user", "admin"]),
});
```

## `UiConfig`

```typescript
UiConfig = z.object({
  theme: z.enum(["shadcn"]).default("shadcn"),
  redirectAfterLogin: z.string().default("/dashboard"),
  redirectAfterLogout: z.string().default("/"),
  twoFactorSettingsPath: z.string().default("/settings/2fa"),
  protectedPaths: z.array(z.string()).default(["/dashboard", "/settings"]),
  roleRestrictions: z.record(z.string(), z.array(z.string())).default({
    "/admin": ["admin"],
  }),
});
```

## Duration String Format

```typescript
DurationString = z.string().regex(/^\d+[smhd]$/, {
  message: "Must be a duration string like '7d', '1h', '30m'",
});
```

| Pattern | Examples |
|---------|----------|
| `\d+s` | `"30s"`, `"120s"` |
| `\d+m` | `"30m"`, `"90m"` |
| `\d+h` | `"1h"`, `"24h"` |
| `\d+d` | `"7d"`, `"30d"` |

## Related

- [Configuration](../get-started/configuration.md) — Practical config examples
- [TypeScript Types](../reference/types.md) — Type exports
- [CLI Tools](./cli-tools.md) — Setup wizard uses this schema
