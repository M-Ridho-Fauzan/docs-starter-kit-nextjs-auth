# Bugfix Plan — 2026-06-25

## Issues

| # | Issue | Severity | File(s) to change |
|---|-------|----------|-------------------|
| 1 | i18n: No locale toggle button | HIGH | `components/layout/navbar.tsx` |
| 2 | Search: Command context crash (`subscribe` undefined) | HIGH | `components/search-dialog.tsx` |
| 3 | Duplicate h1 on every doc page | MEDIUM | `app/[locale]/docs/[[...slug]]/page.tsx` |
| 4 | TOC / "On this page" not rendering | MEDIUM | `source.config.ts`, `lib/source.ts` |
| 5 | Mobile-first responsive gaps | LOW | `components/layout/docs-layout.tsx`, `components/layout/toc.tsx` |

---

## Fix Details

### Fix 1: Locale Toggle

- Add `LocaleToggle` component in navbar
- Globe icon button → popover with EN/ID options
- Use `useLocale()` from `next-intl` to detect current locale
- Use `useRouter()` + `usePathname()` from `@/i18n/routing` to navigate
- Position: between search button and GitHub link
- Use shadcn/ui `DropdownMenu` (need to install it)

### Fix 2: Search Command Context + Loading

- `CommandDialog` wraps Dialog but not Command → need `<Command>` wrapper
- Add `LoadingSpinner` via `Loader2` icon from lucide-react
- Add `searchLoading` state, set before fetch, clear after

### Fix 3: Duplicate h1

- Remove `<h1>{title}</h1>` from docs catch-all page
- MDX files already have their own `# Title` heading

### Fix 4: TOC Extraction

- Fumadocs MDX v15 extracts headings automatically via `remark-headings`
- But `page.data.toc` might be empty because `DocData` type is empty `{}`
- Need to verify at runtime: if empty, could use `loader` with `toc` option or manually extract
- Alternative: use `fumadocs-core` `findNeighbour` or custom TOC extraction from MDX body
- If TOC is truly not available from fumadocs-mdx, use a custom `remark-plugin` to extract headings from the MDX content

### Fix 5: Mobile Responsive

- TOC: already `hidden lg:block` — correct
- Sidebar: already `hidden md:block` — correct  
- Mobile sidebar: works via hamburger
- Content: add `overflow-x-hidden` to prevent horizontal scroll
- Ensure no fixed widths that overflow on small screens

---

## Dependencies to install

- `@radix-ui/react-dropdown-menu` (for locale toggle dropdown)

## Build & Test

After all fixes:
1. `pnpm build` — verify production build
2. `pnpm test` — verify all tests pass (parent project)
3. Check dev server for search, i18n, TOC, mobile
