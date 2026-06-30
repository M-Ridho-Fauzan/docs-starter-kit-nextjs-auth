# TOC + Code Copy Fix — 2026-06-25

## Fix 1: TOC tidak muncul

**Root cause**: `page.data.toc` empty/undefined. `rehypeToc` plugin exports `toc` as ESM named export, but `page.data.toc` doesn't pick it up. `_exports.toc` does contain the data.

**Fix**: Prioritaskan `page.data._exports.toc` daripada `page.data.toc`:
```ts
const raw = pageData._exports?.toc ?? pageData.toc ?? [];
```
Juga handle `title` bisa berupa HAST `Element` (object with `.value`) atau string.

**File**: `app/[locale]/docs/[[...slug]]/page.tsx`

## Fix 2: Copy button pada code blocks

**Approach**: DOM-based. `useEffect` di `CodeCopy` component scan semua `<pre>` elements di `article.prose`, inject copy button di pojok kanan atas, hanya muncul saat hover (via `group-hover:opacity-100`).

**File**: `components/docs/code-copy.tsx` (new)
**Integrated**: `app/[locale]/docs/[[...slug]]/page.tsx` (added `<CodeCopy />` inside article)

## Results

| | Status |
|---|--------|
| `pnpm build` | ✅ 85 pages |
| `pnpm test` | ✅ 166/166 |
