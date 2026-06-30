---
title: Advanced Customization
description: Advanced customization for the Next.js 16 Starter Kit. Custom adapters, OAuth providers, Better Auth plugins, and server actions.
---

# Advanced Customization

Extend the starter kit with custom adapters, providers, and plugins.

## Custom Database Adapter

Implement a custom adapter by creating an adapter factory and registering it.

### 1. Create the adapter factory

```typescript
// src/auth/adapters/custom.adapter.ts
import type { DatabaseConfig } from "../config/types";

export function createCustomAdapter(config: DatabaseConfig): unknown {
  const client = config.client as YourClientType ?? createClient(config.url);
  return adapterFunction(client, {
    provider: "postgresql",
  });
}

function createClient(url?: string): YourClientType {
  // Initialize your database client
}
```

### 2. Register the adapter

The adapter is registered in `src/auth/server.ts`:

```typescript
case "custom": {
  const { createCustomAdapter } = require("./adapters/custom.adapter");
  registerAdapter("custom", createCustomAdapter);
  break;
}
```

### 3. Configure it

```typescript
export default defineAuthConfig({
  database: {
    adapter: "custom",
    url: process.env.DATABASE_URL!,
  },
});
```

## Custom OAuth Provider

Add any OAuth provider supported by Better Auth via the `custom` array:

```typescript
export default defineAuthConfig({
  features: {
    oauth: {
      custom: [
        {
          id: "discord",
          enabled: true,
          clientId: process.env.DISCORD_CLIENT_ID!,
          clientSecret: process.env.DISCORD_CLIENT_SECRET!,
        },
      ],
    },
  },
});
```

The `id` must match a provider ID supported by Better Auth.

## Custom Server Action

Add a new server action following the existing patterns:

```typescript
// src/lib/auth/actions/my-action.ts
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth/server";
import type { AuthActionResult } from "./types";

export async function myAction(
  _prevState: AuthActionResult | null,
  formData: FormData,
): Promise<AuthActionResult> {
  const value = formData.get("myField") as string;

  if (!value) {
    return {
      success: false,
      error: { code: "VALIDATION_ERROR", message: "Field is required." },
    };
  }

  try {
    await auth.api.someMethod({
      body: { value },
      headers: await headers(),
    });
    // return success or redirect
  } catch (err) {
    return {
      success: false,
      error: { code: "500", message: "Something went wrong." },
    };
  }
}
```

## Custom Hook

```typescript
// src/hooks/use-my-action.ts
import { useActionState } from "react";
import { myAction } from "@/lib/auth/actions/my-action";

export function useMyAction() {
  return useActionState(myAction, null);
}
```

## Related

- [Database Overview](../database/overview.md) — Adapter system
- [OAuth](../auth-features/oauth.md) — OAuth providers
- [Server Actions](../api/server-actions.md) — Action patterns
