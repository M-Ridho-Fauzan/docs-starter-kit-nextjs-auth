# Phase 4 Decision Record: Custom Layout

## Decision 1: Custom layout with shadcn/ui (no fumadocs-ui)
- **Context**: Need to build navbar, sidebar, TOC, footer.
- **Decision**: All layout components built from scratch with shadcn/ui primitives.
- **Rationale**: Full design control, no CSS conflicts, consistent with DESIGN.md.

## Decision 2: PageContext for TOC data passing
- **Context**: TOC data (`page.data.toc`) is available in the catch-all page component, but the layout component wraps all pages.
- **Decision**: Created `lib/page-context.tsx` React context. Page sets TOC data, layout's TOC component reads it.
- **Rationale**: Cleaner than extracting TOC from DOM or restructuring app. Scales to i18n in Phase 7.

## Decision 3: Mobile sidebar via push state (not Sheet)
- **Context**: Originally planned to use shadcn/ui Sheet for mobile navigation.
- **Decision**: Used a custom slide-out panel with overlay backdrop.
- **Rationale**: Simpler implementation, fewer dependencies, identical UX to Sheet.

## Decision 4: Sidebar tree from `source.getPageTree()`
- **Context**: Need to render the Fumadocs page tree in the sidebar.
- **Decision**: Use `source.getPageTree()` which returns `Root` with `children: Node[]`.
- **Rationale**: Fumadocs already builds the page tree from `meta.json` ordering. Reusing it avoids duplicating navigation logic.

## Decision 5: TOC scrollspy with IntersectionObserver
- **Context**: Need to highlight current section in TOC as user scrolls.
- **Decision**: Custom IntersectionObserver with rootMargin offset for the sticky navbar.
- **Rationale**: Lighter than fumadocs-core's built-in TOC provider, no extra dependencies.

## Decision 6: sticky sidebar (scrollable)
- **Context**: Sidebar needs to stay visible while content scrolls.
- **Decision**: `sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto`.
- **Rationale**: Keeps sidebar visible during scroll, independent scroll context for long page lists.
