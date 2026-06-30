---
title: Project Structure
description: File and folder structure of the Next.js 16 Auth Starter Kit. Understand how the project is organized to quickly find and modify code.
---

# Project Structure

```
my-app/
├── auth.config.ts                    # Single entry point for all auth config
├── prisma.config.ts                  # Prisma 7 config (datasource, schema path)
├── package.json                      # Dependencies and scripts
├── tsconfig.json                     # TypeScript strict mode config
├── vitest.config.ts                  # Test runner config
├── next.config.ts                    # Next.js configuration
├── .env.example                      # Environment variable template
├── .gitignore                        # Git ignore rules
│
├── prisma/
│   └── schema.prisma                 # Database schema (user, session, account, verification)
│
├── src/
│   ├── proxy.ts                      # Route protection middleware (Next.js 16 proxy convention)
│   ├── app/
│   │   ├── layout.tsx                # Root layout with AuthProvider
│   │   ├── page.tsx                  # Home page (redirects to dashboard or login)
│   │   ├── api/auth/[...all]/
│   │   │   └── route.ts              # Better Auth API route handler
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Protected dashboard page
│   │   └── (auth)/
│   │       ├── layout.tsx            # Auth layout with AuthLayout component
│   │       ├── login/page.tsx        # Login page
│   │       ├── register/page.tsx     # Registration page
│   │       ├── forgot-password/page.tsx   # Forgot password page
│   │       ├── reset-password/page.tsx    # Reset password page
│   │       ├── verify-email/page.tsx      # Email verification page
│   │       └── 2fa/
│   │           ├── verify/page.tsx   # TOTP verification during login
│   │           └── settings/2fa/page.tsx  # 2FA settings page
│   │
│   ├── auth/
│   │   ├── server.ts                 # Better Auth server instance (singleton)
│   │   ├── auth-client.ts            # Better Auth client (browser-side)
│   │   ├── config/
│   │   │   ├── index.ts              # defineAuthConfig() function
│   │   │   ├── schema.ts             # Zod validation schemas
│   │   │   ├── types.ts              # TypeScript types
│   │   │   └── oauth.ts              # OAuth provider helper
│   │   ├── mapper.ts                 # Config → Better Auth internal format
│   │   └── adapters/
│   │       ├── index.ts              # Adapter registry (registerAdapter, resolveAdapter)
│   │       ├── types.ts              # CreateAdapter type
│   │       ├── prisma.adapter.ts     # Prisma adapter factory
│   │       ├── drizzle.adapter.ts    # Drizzle adapter factory
│   │       └── kysely.adapter.ts     # Kysely adapter factory
│   │
│   ├── lib/auth/
│   │   ├── server-utils.ts           # getServerSession(), hasRole(), getUserRole()
│   │   └── actions/
│   │       ├── types.ts              # AuthActionResult type
│   │       ├── email-password.ts     # signInWithEmailPassword, signUpWithEmailPassword
│   │       ├── email-verification.ts # resendVerificationEmail, verifyEmail
│   │       ├── password-reset.ts     # requestPasswordResetAction, resetPasswordAction
│   │       └── two-factor.ts         # TOTP actions (verify, enable, disable, backup codes)
│   │
│   ├── hooks/
│   │   ├── use-auth.ts               # Auth context hook
│   │   ├── use-session.ts            # Session refresh hook
│   │   ├── use-login.ts              # Login form hook
│   │   ├── use-register.ts           # Registration form hook
│   │   ├── use-forgot-password.ts    # Forgot password form hook
│   │   ├── use-reset-password.ts     # Reset password form hook
│   │   ├── use-resend-verification.ts # Resend verification form hook
│   │   ├── use-social-login.ts       # Social login hook
│   │   ├── use-has-role.ts           # Role check hook
│   │   ├── use-role.ts               # Current user role hook
│   │   ├── use-backup-codes.ts       # Backup codes hook
│   │   ├── use-two-factor-setup-form.ts  # 2FA setup form hook
│   │   └── use-verify-totp-form.ts   # TOTP verify form hook
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── auth-layout.tsx       # Auth page layout wrapper
│   │   │   ├── login-form.tsx        # Login form component
│   │   │   ├── register-form.tsx     # Registration form component
│   │   │   ├── forgot-password-form.tsx   # Forgot password form
│   │   │   ├── reset-password-form.tsx    # Reset password form
│   │   │   ├── resend-verification-form.tsx # Resend verification form
│   │   │   ├── social-login-buttons.tsx   # OAuth provider buttons
│   │   │   ├── two-factor-setup-form.tsx  # 2FA setup with QR code
│   │   │   ├── two-factor-verify-form.tsx # TOTP code entry form
│   │   │   └── backup-codes-display.tsx   # Backup codes display
│   │   ├── user/
│   │   │   └── user-profile.tsx      # User profile component
│   │   └── ui/                       # shadcn/ui base components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── label.tsx
│   │       ├── badge.tsx
│   │       └── separator.tsx
│   │
│   ├── lib/
│   │   └── utils.ts                  # cn() utility for class merging
│   │
│   └── hooks/                        # (hooks directory)
│
├── scripts/
│   ├── setup.ts                      # Interactive setup wizard
│   ├── generate-env.example.ts       # .env.example generator
│   └── lib/
│       ├── write-config.ts           # Auth config file generator
│       └── generate-env.ts           # Env var collector and formatter
│
├── examples/
│   └── protected-layout.example.tsx  # Example protected page layout
│
└── docs/                             # Documentation
    ├── nextbeterauth-starterkit/     # ← You are here
    └── ...                           # (individual feature docs)
```

## Related

- [Configuration](./configuration.md) — Config file reference
- [CLI Tools](../reference/cli-tools.md) — Setup wizard and generator
