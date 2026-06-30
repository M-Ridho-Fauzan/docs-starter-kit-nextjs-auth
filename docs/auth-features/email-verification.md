---
title: Email Verification
description: Email verification flow for Next.js 16 with Better Auth. Enable email verification, configure email sending, and handle verification tokens.
---

# Email Verification

Email verification flow for Better Auth. Automatically triggered when `requireEmailVerification` is enabled.

## Config

### Enable email verification

In `features.emailPassword`:

```typescript
import { defineAuthConfig } from "@/auth/config";

export default defineAuthConfig({
  features: {
    emailPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
  },
});
```

### Provide email sending callback

In the top-level `email` section:

```typescript
export default defineAuthConfig({
  email: {
    sendVerificationEmail: async ({ email, url, token }) => {
      // Send the email using your preferred provider
      console.log(`Verification URL for ${email}: ${url}`);
    },
  },
  features: {
    emailPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
  },
});
```

If no `sendVerificationEmail` callback is provided, the starter kit logs a warning in development and an error in production.

## Email Config Options

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `sendVerificationEmail` | `(params: { email, url, token }) => Promise<void>` | no | Callback to send verification emails |
| `sendPasswordResetEmail` | `(params: { email, url, token }) => Promise<void>` | no | Callback to send password reset emails |

## Server Actions

### `resendVerificationEmail`

Form action to request a new verification email.

```typescript
import { resendVerificationEmail } from "@/lib/auth/actions/email-verification";

<form action={resendVerificationEmail}>
  <input name="email" type="email" required />
  <button type="submit">Resend verification</button>
</form>
```

### `verifyEmail`

Form action that processes a verification token.

```typescript
import { verifyEmail } from "@/lib/auth/actions/email-verification";

<form action={verifyEmail}>
  <input name="token" type="hidden" value={token} />
  <button type="submit">Verify email</button>
</form>
```

## Hook

### `useResendVerificationForm`

```tsx
import { useResendVerificationForm } from "@/hooks/use-resend-verification";

function ResendPage() {
  const [state, formAction, pending] = useResendVerificationForm();
}
```

## Related

- [Email & Password](./email-password.md) — Registration and login
- [Password Reset](./password-reset.md) — Forgot/reset password
- [Environment Variables](../get-started/environment-variables.md) — Email provider setup
