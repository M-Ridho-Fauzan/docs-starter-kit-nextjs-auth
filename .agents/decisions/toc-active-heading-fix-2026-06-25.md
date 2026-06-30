# TOC Active Heading Highlight Fix — 2026-06-25

## Problem
`IntersectionObserver` in `toc.tsx` used `rootMargin: "-80px 0px -80% 0px"` (top 20% of viewport). When a heading scrolled past this narrow zone, it immediately lost highlight, causing the active indicator to "jump around" rather than smoothly follow the scroll.

## Solution

Changed to **"last visible heading"** pattern (used by Stripe, Tailwind, Fumadocs docs):

1. **Wider detection zone**: `rootMargin: "-80px 0px -60% 0px"` (top 40% of viewport minus navbar)
2. **Track all intersecting headings** via a `Set<string>` (using `useRef` for performance)
3. **Select the last visible heading** in document order by iterating `items` array — this gives the heading lowest on the page that's still in the zone, which is the correct "current section"

### Key changes vs previous code:
- Old: Set `activeId` on first `isIntersecting` entry → only top entry wins, loses highlight immediately below
- New: Maintain `visibleIds` Set, pick last entry in document order → smooth scrolling highlight

## Files changed
- `components/layout/toc.tsx` (single file)

## Rollback
To undo: replace entire file with the old version (see `.agents/reviews/toc-old-backup.txt` if needed) or revert via git.
