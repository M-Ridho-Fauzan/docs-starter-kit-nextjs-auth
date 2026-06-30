---
title: Middleware / Route Protection
description: Route protection middleware for Next.js 16 using the proxy convention. Configure protected routes and role-based access restrictions from auth.config.ts.
---

# Middleware / Route Protection

Route protection using Next.js 16's proxy convention (`src/proxy.ts`). The proxy checks authentication and role-based access before serving protected pages.

## How it works

The proxy runs on every request. It:

1. Checks if the requested path matches a protected route
2. If protected, calls `auth.api.getSession()` to verify authentication
3. If unauthenticated, redirects to `/login`
4. If role-restricted, checks the user's role against allowed roles
5. If access is denied, redirects to the dashboard

## Configuration

Protected routes and role restrictions are configured in `auth.config.ts`:

```typescript
export default defineAuthConfig({
  ui: {
    redirectAfterLogin: "/dashboard",
    redirectAfterLogout: "/login",
    protectedPaths: ["/dashboard", "/settings", "/admin"],
    roleRestrictions: {
      "/admin": ["admin"],
    },
  },
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `protectedPaths` | `string[]` | `["/dashboard", "/settings"]` | Routes requiring authentication |
| `roleRestrictions` | `Record<string, string[]>` | `{"/admin": ["admin"]}` | Routes restricted by role |

## Behavior

| Scenario | Result |
|----------|--------|
| Unauthenticated, accessing protected route | Redirect to `/login` |
| Authenticated, accessing protected route | Pass through |
| Authenticated, insufficient role | Redirect to `/dashboard` |
| Authenticated, accessing public route | Pass through |
| Unauthenticated, accessing public route | Pass through |

## Adding a protected route

Add the path to `protectedPaths` in `auth.config.ts`:

```typescript
ui: {
  protectedPaths: ["/dashboard", "/settings", "/admin", "/profile"],
}
```

## Adding role-restricted routes

```typescript
ui: {
  roleRestrictions: {
    "/admin": ["admin"],
    "/moderator": ["admin", "moderator"],
  },
}
```

## Edge Cases

- **API routes** — The proxy passes through API routes (`/api/*`) without checking
- **Static files** — Static assets and `_next/*` are excluded by the matcher
- **Auth pages** — Login, register, and other auth pages are always public

## Related

- [Roles](../auth-features/roles.md) — Role system reference
- [Server Utilities](./server-utils.md) — `hasRole()` check
- [Config Schema](../reference/config-schema.md) — Full config reference
