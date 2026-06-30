# Docs Writing Skill — NextJS Auth Starter Kit Documentation

Extends the base docs-writing skill with project-specific rules.

## Project Context

All documentation targets the NextJS Auth Starter Kit project at `../../` (the parent directory). Code examples must use the project's `@/` path aliases (e.g., `@/auth/server`, `@/lib/auth/actions/email-password`).

## Required Structure

Every doc page MUST have this structure:

```markdown
---
title: Page Title
description: SEO-optimized one-sentence description with keywords: "Next.js 16", "Better Auth", "authentication", plus specific feature name.
---

# Page Title

Brief (1-2 sentence) overview of what this page covers.

## Config / Prerequisites

How to enable or configure this feature in `auth.config.ts`, if applicable.

## [Main content sections]

...

## Related

- [Related Page 1](../path/to/page.md)
- [Related Page 2](../path/to/page.md)
```

## SEO Rules

- Every doc must have a `description` frontmatter field (max 160 chars)
- Primary keyword must appear in the h1
- Secondary keywords in h2s
- Internal links to at least 2 other docs
- Code blocks must specify language tag
- Use tables for config options and API parameters

## Source File References

All relative paths from a doc at e.g. `docs/nextbeterauth-starterkit/auth-features/email-password.md` to source code go through:

```
../../src/auth/...        # Auth source
../../src/lib/auth/...    # Server actions, utils
../../src/hooks/...       # React hooks
../../src/components/...  # UI components
../../src/app/...         # Pages
../../auth.config.ts      # Config file
```

## Writing Patterns

### Config tables
```markdown
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `string` | `"value"` | What it does |
```

### Server actions
```markdown
### `actionName`

Form action for [purpose]. Validates input, calls `auth.api.methodName()`, and returns `AuthActionResult`.

\`\`\`typescript
import { actionName } from "@/lib/auth/actions/file-name";

<form action={actionName}>
  <input name="field" type="text" required />
  <button type="submit">Submit</button>
</form>
\`\`\`
```

### Hooks
```markdown
### `useHookName`

\`\`\`tsx
import { useHookName } from "@/hooks/use-hook-name";

function Component() {
  const [state, formAction, pending] = useHookName();
}
\`\`\`
```

## File Naming

- `kebab-case.md` for all files
- Directory names match section names (e.g., `get-started/`, `auth-features/`)
- Adapter files: `database/adapters/[name].md`
