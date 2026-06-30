---
title: Protected Layout Example
description: Example of a protected layout with authentication and role check for Next.js 16 App Router. Uses getServerSession and hasRole for route protection.
---

# Protected Layout Example

Complete example of a protected page layout with authentication and role-based access.

## Source

The full example is at `examples/protected-layout.example.tsx`.

## Code

```typescript
// app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import { getServerSession, hasRole } from "@/lib/auth/server-utils";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">My App</h1>
          <nav className="flex items-center gap-4">
            <span>{session.user.email}</span>
            {hasRole(session, "admin") && (
              <a href="/admin" className="text-blue-600">Admin</a>
            )}
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
```

## Key patterns

1. **Authentication check** — `getServerSession()` at the top of the layout
2. **Redirect** — unauthenticated users go to `/login`
3. **Role-based UI** — `hasRole()` conditionally shows admin links
4. **Server Component** — works because `getServerSession()` is async and reads headers from the request context

## Related

- [Server Utilities](../api/server-utils.md) — `getServerSession`, `hasRole`
- [Middleware](../api/middleware.md) — Route-level protection
- [Roles](../auth-features/roles.md) — Role system reference
