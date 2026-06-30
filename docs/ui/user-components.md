---
title: User UI Components
description: User-facing UI components for the Next.js 16 Auth Starter Kit. User profile, two-factor authentication setup, TOTP verification, and backup codes display.
---

# User UI Components

Components for authenticated user interactions.

## Component List

| Component | File | Description |
|-----------|------|-------------|
| `UserProfile` | `src/components/user/user-profile.tsx` | User profile card with avatar, name, email, and 2FA link |
| `TwoFactorSetupForm` | `src/components/auth/two-factor-setup-form.tsx` | 2FA setup with QR code |
| `TwoFactorVerifyForm` | `src/components/auth/two-factor-verify-form.tsx` | TOTP code entry during login |
| `BackupCodesDisplay` | `src/components/auth/backup-codes-display.tsx` | Display and regenerate backup codes |

## `UserProfile`

Displays the authenticated user's profile information.

```tsx
import { UserProfile } from "@/components/user/user-profile";

<UserProfile twoFactorSettingsPath="/settings/2fa" />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `twoFactorSettingsPath` | `string` | no | Path to 2FA settings page (default: `/settings/2fa`) |

## `TwoFactorSetupForm`

Setup form for enabling TOTP two-factor authentication.

```tsx
import { TwoFactorSetupForm } from "@/components/auth/two-factor-setup-form";

<TwoFactorSetupForm />
```

1. User enters password for confirmation
2. QR code is generated for scanning with authenticator app
3. Backup codes are displayed for saving

## `TwoFactorVerifyForm`

TOTP verification form during the 2FA login flow.

```tsx
import { TwoFactorVerifyForm } from "@/components/auth/two-factor-verify-form";

<TwoFactorVerifyForm />
```

Renders: TOTP code input, submit button.

## `BackupCodesDisplay`

Displays backup codes with a regenerate option.

```tsx
import { BackupCodesDisplay } from "@/components/auth/backup-codes-display";

<BackupCodesDisplay codes={["ABC123", "DEF456", "GHI789"]} />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `codes` | `string[]` | yes | Array of backup codes to display |

## Related

- [Auth Components](./auth-components.md) — Login, register, and password forms
- [Two-Factor Authentication](../auth-features/two-factor.md) — 2FA flow
- [Theming](./theming.md) — Theme customization
