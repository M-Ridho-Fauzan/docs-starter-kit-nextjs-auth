---
title: Server Actions Reference
description: All server actions in the Next.js 16 Auth Starter Kit. Email/password, verification, password reset, and 2FA actions with types.
---

# Server Actions Reference

All server actions are form actions that accept `FormData` and return `AuthActionResult`.

## Auth Result Types

```typescript
interface AuthSuccessResult<T = void> {
  success: true;
  message?: string;
  data?: T;
}

interface AuthErrorResult {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

type AuthActionResult<T = void> = AuthSuccessResult<T> | AuthErrorResult;
```

## Email / Password

Source: `src/lib/auth/actions/email-password.ts`

### `signInWithEmailPassword`

Login action. Redirects to `ui.redirectAfterLogin` on success, or to `/2fa/verify` if the user has 2FA enabled.

| Field | Type | Required |
|-------|------|----------|
| `email` | `string` | yes |
| `password` | `string` | yes |

### `signUpWithEmailPassword`

Registration action. Redirects on success.

| Field | Type | Required |
|-------|------|----------|
| `name` | `string` | yes |
| `email` | `string` | yes |
| `password` | `string` | yes |

## Email Verification

Source: `src/lib/auth/actions/email-verification.ts`

### `resendVerificationEmail`

Request a new verification email.

| Field | Type | Required |
|-------|------|----------|
| `email` | `string` | yes |

### `verifyEmail`

Process a verification token.

| Field | Type | Required |
|-------|------|----------|
| `token` | `string` | yes |

## Password Reset

Source: `src/lib/auth/actions/password-reset.ts`

### `requestPasswordResetAction`

Request a password reset email.

| Field | Type | Required |
|-------|------|----------|
| `email` | `string` | yes |

### `resetPasswordAction`

Set a new password using a reset token.

| Field | Type | Required |
|-------|------|----------|
| `token` | `string` | yes |
| `password` | `string` | yes |

## Two-Factor Authentication

Source: `src/lib/auth/actions/two-factor.ts`

### `verifyTotpAction`

Verify a TOTP code during login. Redirects on success.

| Field | Type | Required |
|-------|------|----------|
| `code` | `string` | yes |

### `getTOTPURIAction`

Get TOTP URI for QR code display.

| Field | Type | Required |
|-------|------|----------|
| `password` | `string` | yes |

### `enableTwoFactorAction`

Enable 2FA. Returns TOTP URI and backup codes.

| Field | Type | Required |
|-------|------|----------|
| `password` | `string` | yes |

### `disableTwoFactorAction`

Disable 2FA.

| Field | Type | Required |
|-------|------|----------|
| `password` | `string` | yes |

### `generateBackupCodesAction`

Generate new backup codes.

| Field | Type | Required |
|-------|------|----------|
| `password` | `string` | yes |

## Related

- [React Hooks](./hooks.md) — Client-side hooks wrapping these actions
- [Server Utilities](./server-utils.md) — `getServerSession`, `hasRole`, `getUserRole`
- [Middleware](./middleware.md) — Route protection
