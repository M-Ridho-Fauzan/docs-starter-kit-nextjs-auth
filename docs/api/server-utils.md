---
title: Server Utilities Reference
description: Server utilities for the Next.js 16 Auth Starter Kit. getServerSession, hasRole, getUserRole functions for server components and server actions.
---

# Server Utilities Reference

Server utilities from `src/lib/auth/server-utils.ts`. Use these in Server Components and Server Actions.

## `getServerSession`

A thin wrapper around `auth.api.getSession()` that automatically injects request headers.

```typescript
import { getServerSession } from "@/lib/auth/server-utils";

// Server Component
export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    return <p>Please sign in to access this page.</p>;
  }

  return <p>Welcome, {session.user.name}!</p>;
}
```

```typescript
import { getServerSession } from "@/lib/auth/server-utils";

// Server Action
export async function deleteAccount() {
  const session = await getServerSession();
  if (!session) throw new Error("Unauthorized");
  // Proceed with deletion
}
```

| Returns | Description |
|---------|-------------|
| `Session \| null` | Session object with `user` and `session` fields, or `null` if not authenticated |

## `getUserRole`

Returns the user's role string from the session.

```typescript
import { getUserRole, getServerSession } from "@/lib/auth/server-utils";

const session = await getServerSession();
const role = getUserRole(session); // "user" | "admin" | undefined
```

| Param | Type | Description |
|-------|------|-------------|
| `session` | `Session \| null \| undefined` | Session from `getServerSession()` or `auth.api.getSession()` |

Returns `string | undefined` — the user's role, or `undefined` if not logged in.

## `hasRole`

Check if the authenticated user has a specific role.

```typescript
import { hasRole, getServerSession } from "@/lib/auth/server-utils";

const session = await getServerSession();

if (hasRole(session, "admin")) {
  // Allow admin-only action
}

if (hasRole(session, ["admin", "editor"])) {
  // Allow admin or editor
}
```

| Param | Type | Description |
|-------|------|-------------|
| `session` | `Session \| null \| undefined` | Server session |
| `role` | `string \| string[]` | Single role or list of accepted roles |

Returns `boolean` — `true` if user has one of the specified roles.

## Usage Patterns

### Protected Server Component

```typescript
import { getServerSession, hasRole } from "@/lib/auth/server-utils";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!hasRole(session, "admin")) {
    return <p>Access denied</p>;
  }

  return <div>Admin content</div>;
}
```

### Protected Server Action

```typescript
import { getServerSession, hasRole } from "@/lib/auth/server-utils";

"use server";
export async function adminAction() {
  const session = await getServerSession();
  if (!hasRole(session, "admin")) {
    throw new Error("Forbidden");
  }
  // Perform admin action
}
```

## Related

- [Server Actions](./server-actions.md) — All form actions
- [Middleware](./middleware.md) — Route-level protection
- [Roles](../auth-features/roles.md) — Role system reference
