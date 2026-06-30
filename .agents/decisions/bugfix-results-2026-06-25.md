# Bugfix Results — 2026-06-25

## Fix 1: Locale Toggle (Navbar)

- **File**: `components/layout/navbar.tsx`
- **Added**: `LocaleToggle` using Globe icon + `DropdownMenu` (shadcn/ui)
- **Implementation**: 
  - Uses `useLocale()` from `next-intl` to detect current locale
  - Uses `useRouter()` + `usePathname()` from `@/i18n/routing`
  - Dropdown with EN/ID options, current locale is bold
  - Positions after search button, before GitHub link
- **New component**: `components/ui/dropdown-menu.tsx` (wraps `@radix-ui/react-dropdown-menu`)

## Fix 2: Search Error + Loading Spinner

- **File**: `components/search-dialog.tsx`
- **Root cause**: `CommandInput` needs `Command` context wrapper — `CommandDialog` only wraps `Dialog`
- **Fix**: Wrapped content inside `<Command>` inside `<CommandDialog>`
- **Added loading**: `useState<boolean>` + `Loader2` spinner animation

## Fix 3: Duplicate h1

- **File**: `app/[locale]/docs/[[...slug]]/page.tsx`
- **Fix**: Removed explicit `<h1>{title}</h1>` — MDX files already have `# Title`
- **Improved type**: Using `TOCItemType` from `fumadocs-core/toc` instead of ad-hoc interface

## Fix 4: TOC Extraction

- **File**: `lib/page-context.tsx` + same page component
- **Root cause**: Type mismatch — `TOCItemType.title` is `ReactNode`, TOCItem expects `string`
- **Fix**: Map `TOCItemType[]` to `TOCItem[]` with `String(item.title)`
- **Status**: TOC data is extracted by fumadocs-mdx automatically via `remark-headings`
- **Exported**: `TOCItem` interface from `page-context.tsx`

## Fix 5: Mobile Responsive

- **File**: `components/layout/docs-layout.tsx`
- **Fix**: Added `overflow-x-hidden` to main flex container
- **Status**: Sidebar hidden on `md`, TOC hidden on `lg`, mobile sidebar via hamburger — all already correct

## Build & Test Results

| | Status |
|---|--------|
| `pnpm build` | ✅ 85 pages, 0 errors |
| `pnpm test` | ✅ 166/166 passed |
| Sitemap | ✅ Generated |
