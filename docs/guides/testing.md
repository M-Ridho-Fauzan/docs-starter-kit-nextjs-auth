---
title: Testing Guide
description: Testing setup for the Next.js 16 Auth Starter Kit. Run tests, write new tests, vitest configuration, and testing patterns for auth features.
---

# Testing Guide

How to run and write tests for the starter kit.

## Running Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Run specific test file
pnpm test -- src/auth/mapper.test.ts
```

## Test Structure

Tests are colocated with their source files:

```
src/auth/
├── mapper.test.ts            # Config mapping tests
├── config/
│   ├── index.test.ts         # defineAuthConfig validation
│   └── oauth.test.ts         # OAuth provider helper
├── adapters/
│   └── index.test.ts         # Adapter registry tests

src/lib/auth/
├── server-utils.test.ts      # getServerSession, hasRole, getUserRole
└── actions/
    ├── email-password.test.ts        # Login/register actions
    ├── email-verification.test.ts    # Email verification actions
    ├── password-reset.test.ts        # Password reset actions
    └── two-factor.test.ts            # TOTP actions

src/hooks/
├── use-auth.test.ts
├── use-session.test.ts
├── use-role.test.ts
└── use-has-role.test.ts

src/components/
├── auth/auth-layout.test.tsx
├── auth/social-login-buttons.test.tsx
└── user/user-profile.test.tsx

src/proxy.test.ts             # Middleware tests

scripts/
├── setup.test.ts             # Setup wizard tests
├── lib/
├── write-config.test.ts      # Config generation tests
└── generate-env.test.ts      # Env generation tests
```

## Mocking Pattern

Server actions mock `@/auth/server` and provide mock API functions:

```typescript
vi.mock("@/auth/server", () => ({
  auth: {
    api: {
      signInEmail: vi.fn(),
      signUpEmail: vi.fn(),
    },
  },
}));
```

Auth config is mocked with only the fields the tested module reads:

```typescript
vi.mock("../../auth.config", () => ({
  default: {
    ui: {
      redirectAfterLogin: "/dashboard",
      redirectAfterLogout: "/login",
    },
  },
}));
```

## Writing Tests

### Testing a server action

```typescript
import { describe, it, expect, vi } from "vitest";

vi.mock("@/auth/server", () => ({
  auth: { api: { myAction: vi.fn() } },
}));

const { myServerAction } = await import("./my-action");

it("returns validation error when email is missing", async () => {
  const form = new FormData();
  const result = await myServerAction(null, form);
  expect(result.success).toBe(false);
});
```

### Testing a component

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./my-component";

it("renders the submit button", () => {
  render(<MyComponent />);
  expect(screen.getByRole("button")).toHaveTextContent("Submit");
});
```

## Test Configuration

Tests use Vitest with jsdom for component tests. See `vitest.config.ts` for the full configuration.

## Related

- [Deployment Guide](./deployment.md) — Production setup
- [Installation](../get-started/installation.md) — Local setup
