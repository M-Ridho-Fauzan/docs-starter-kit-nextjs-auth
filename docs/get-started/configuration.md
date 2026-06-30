---
title: Configuration
description: Complete guide to auth.config.ts in the Next.js 16 Auth Starter Kit. All config sections explained with types, defaults, and examples for Better Auth.
---

# Configuration

The starter kit uses a single entry point for all authentication configuration: `auth.config.ts`.

## Basic Structure

```typescript
import { defineAuthConfig } from "@/auth/config";

export default defineAuthConfig({
  database: {
    adapter: "prisma", // "prisma" | "drizzle" | "kysely"
    url: process.env.DATABASE_URL!,
  },
  features: {
    emailPassword: {
      enabled: true,
      requireEmailVerification: false,
      passwordMinLength: 8,
    },
    passwordReset: true,
    oauth: {
      github: {
        enabled: false,
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      },
    },
    twoFactor: {
      enabled: false,
    },
    roles: {
      enabled: false,
    },
  },
  session: {
    expiresIn: "7d",
    strategy: "jwt",
    cookieName: "auth_session",
  },
  ui: {
    theme: "shadcn",
    redirectAfterLogin: "/dashboard",
    redirectAfterLogout: "/",
  },
});
```

## Section: `database`

```typescript
interface DatabaseConfig {
  adapter: "prisma" | "drizzle" | "kysely";
  url: string;
  client?: unknown;
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `adapter` | `enum` | yes | Database adapter to use |
| `url` | `string` | yes | Database connection string |
| `client` | `unknown` | no | Pre-initialized client instance (skips URL-based client creation) |

## Section: `features`

### `emailPassword`

```typescript
interface EmailPasswordConfig {
  enabled: boolean;         // default: false
  requireEmailVerification: boolean;  // default: false
  passwordMinLength: number;  // default: 8
  passwordMaxLength: number;  // default: 128
  disableSignUp: boolean;   // default: false
  autoSignIn: boolean;       // default: true
}
```

### `passwordReset`

```typescript
type PasswordResetConfig = boolean | {
  expiresIn?: string;  // duration format: "30m", "1h", "2h", "1d"
};
```

### `oauth`

```typescript
interface OAuthConfig {
  github?: { enabled: boolean; clientId: string; clientSecret: string };
  google?: { enabled: boolean; clientId: string; clientSecret: string };
  custom?: Array<{
    id: string;
    enabled: boolean;
    clientId: string;
    clientSecret: string;
  }>;
}
```

### `twoFactor`

```typescript
interface TwoFactorConfig {
  enabled: boolean;          // default: false
  methods: "totp"[];         // default: ["totp"]
}
```

### `roles`

```typescript
interface RolesConfig {
  enabled: boolean;          // default: false
  defaultRole: string;       // default: "user"
  roles: string[];           // default: ["user", "admin"]
}
```

## Section: `session`

```typescript
interface SessionConfig {
  expiresIn: string;         // default: "7d"
  strategy: "jwt" | "database";  // default: "jwt"
  cookieName: string;        // default: "auth_session"
  updateAge?: string;        // optional, duration format
  cookieCache?: boolean;     // default: false
}
```

## Section: `ui`

```typescript
interface UiConfig {
  theme: "shadcn";           // default: "shadcn"
  redirectAfterLogin: string; // default: "/dashboard"
  redirectAfterLogout: string; // default: "/"
  twoFactorSettingsPath: string;  // default: "/settings/2fa"
  protectedPaths: string[];   // default: ["/dashboard", "/settings"]
  roleRestrictions: Record<string, string[]>;  // default: {"/admin": ["admin"]}
}
```

## Duration Format

Config options that accept a duration use this format:

| Format | Example | Value |
|--------|---------|-------|
| `Number + "s"` | `"30s"` | 30 seconds |
| `Number + "m"` | `"30m"` | 30 minutes |
| `Number + "h"` | `"1h"` | 1 hour |
| `Number + "d"` | `"7d"` | 7 days |

## Related

- [Installation](./installation.md) — Setup guide
- [Environment Variables](./environment-variables.md) — `.env` reference
- [Config Schema](../reference/config-schema.md) — Full schema definition
