# Documentation Site Review — 2026-06-25

Status: **PASS WITH NOTES**

## 1. Build Verification

**Result: PASS**

- `pnpm build` completes successfully with 0 errors, 0 warnings
- 85 static pages generated
- TypeScript compilation clean
- Sitemap generated via `next-sitemap` postbuild

### Build Deprecation Notice

```
⚠ The "middleware" file convention is deprecated. Please use "proxy" instead.
```

This is a **Next.js 16.2.9 deprecation** — the `middleware.ts` file naming convention is being replaced with `proxy.ts`. The current middleware (`middleware.ts`) is used by `next-intl` for locale routing, which still uses the old convention. This will need to be updated when `next-intl` supports the proxy convention.

**Severity**: LOW (no functional impact today; `next-intl` hasn't migrated yet)

---

## 2. Content Review

### Frontmatter Consistency

**Result: PASS** — All 33 MDX content pages + 8 section indexes have proper `title` and `description` frontmatter.

### Heading Hierarchy

**Result: PASS** — No heading level skips detected. All files follow h1 → h2 → h3 progression correctly.

### Internal Links

**Result: PASS** — All relative links between `.mdx` files resolve correctly. Cross-section links (e.g., `../auth-features` from `get-started/`) properly resolve to section index pages.

### Content Checklist vs Actual Files

**Result: PASS** — All 33 content pages from the AGENTS.md checklist exist in `content/docs/`. All 8 section indexes (`get-started/`, `auth-features/`, `database/`, `api/`, `ui/`, `guides/`, `reference/`, `examples/`) are present.

---

## 3. Code Review

### `middleware.ts` — i18n Locale Routing

**Severity**: LOW

- Uses `next-intl/middleware` correctly
- Matcher pattern properly excludes API routes and static files
- **Note**: This file will need renaming to `proxy.ts` when `next-intl` supports the Next.js 16 proxy convention

### `components/search-dialog.tsx` — Search Dialog

**Severity**: MEDIUM

**Issue**: No debounce on search input. Every keystroke in the search field triggers an API call to `/api/search`. With fast typists, this can fire 10+ requests in under a second.

**Recommended Fix**: Add debounce (300ms) to the `handleSearch` callback:

```tsx
import { debounce } from "lodash"; // or a custom debounce hook

const handleSearch = useCallback(
  debounce(async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }
    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data ?? []);
    } catch {
      setResults([]);
    }
  }, 300),
  []
);
```

### `components/config-builder.tsx` — Interactive Config Builder

**Severity**: MEDIUM

**Issue**: The `generateAuthConfig()` function produces incomplete output. It generates the `ui` section with only `theme`, `redirectAfterLogin`, and `redirectAfterLogout`, but omits:
- `twoFactorSettingsPath` (default: `"/settings/2fa"`)
- `protectedPaths` (default: `["/dashboard", "/settings"]`)
- `roleRestrictions` (default: `{"/admin": ["admin"]}`)

This is inconsistent with the actual `UiConfig` schema documented in `reference/config-schema.mdx`.

**Recommended Fix**: Add these fields to the generated output in `generateAuthConfig()`:

```typescript
lines.push("  ui: {");
lines.push('    theme: "shadcn",');
lines.push('    redirectAfterLogin: "/dashboard",');
lines.push('    redirectAfterLogout: "/",');
lines.push('    twoFactorSettingsPath: "/settings/2fa",');
lines.push('    protectedPaths: ["/dashboard", "/settings"],');
lines.push('    roleRestrictions: { "/admin": ["admin"] },');
lines.push("  },");
```

### `app/[locale]/layout.tsx` — Locale Layout

**Severity**: LOW

**Note**: Line 56 uses `routing.locales.includes(locale as "en" | "id")` — a type assertion before the `includes` check. This works but is slightly unidiomatic. Could use:
```typescript
if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
```

### `components/layout/navbar.tsx` — Navbar

**Result: PASS** — i18n integration is correct. Theme toggle uses mounted state to avoid hydration mismatch. Search dialog integration works properly.

### `app/api/search/route.ts` — Search API

**Severity**: LOW

**Note**: Line 8-12 casts `page.data` to a specific shape without a type guard or imported interface. This is necessary because fumadocs types are dynamic, but adding an explicit interface would improve maintainability.

---

## 4. SEO Audit

**Result: PASS**

| Check | Status |
|-------|--------|
| All MDX files have `title` + `description` frontmatter | PASS |
| `metadataBase` set in `app/[locale]/layout.tsx` | PASS (`https://starterkit-auth-nextjs.vercel.app`) |
| `robots.txt` exists in `public/` | PASS |
| Sitemap generated at build time | PASS (via `next-sitemap` postbuild) |
| OpenGraph metadata configured | PASS |
| Twitter card metadata configured | PASS |
| `alternateRefs` for i18n sitemaps | PASS (`en`, `id`) |

### Minor Note

The `public/sitemap.xml` file in the repository is an empty `<sitemapindex>` placeholder. It gets overwritten by `next-sitemap` during the `postbuild` step. This is fine for production but could confuse developers who inspect the file in development.

---

## 5. Missing Files Check

**Result: PASS**

All 33 content pages and 8 section indexes from the AGENTS.md Content Checklist are present. No missing files.

### One Note

The `.agents/reviews/` directory exists but is empty. This review will be the first entry.

---

## Issues Summary

| # | Severity | File | Issue |
|---|----------|------|-------|
| 1 | MEDIUM | `components/search-dialog.tsx` | No debounce on search input — fires API call on every keystroke |
| 2 | MEDIUM | `components/config-builder.tsx` | Generated `auth.config.ts` omits `twoFactorSettingsPath`, `protectedPaths`, `roleRestrictions` |
| 3 | LOW | `middleware.ts` | Next.js 16 deprecation: "middleware" → "proxy" convention (blocked on `next-intl` support) |
| 4 | LOW | `app/[locale]/layout.tsx` | Type assertion on locale check (`locale as "en" | "id"`) could be more idiomatic |
| 5 | LOW | `app/api/search/route.ts` | Type assertion on `page.data` without imported interface |
| 6 | LOW | `public/sitemap.xml` | Empty placeholder file — gets overwritten at build time |

---

## Required Changes Before Merge

1. **Add debounce to search** in `components/search-dialog.tsx` — prevents excessive API calls
2. **Complete config builder output** in `components/config-builder.tsx` — add missing `ui` fields to match the documented schema

## Suggestions (non-blocking)

1. When `next-intl` supports the proxy convention, rename `middleware.ts` → `proxy.ts`
2. Extract the search result type in `app/api/search/route.ts` into a named interface
3. Consider removing `public/sitemap.xml` from version control (it's a build artifact)

---

Review complete: docs-site — **PASS WITH NOTES**
