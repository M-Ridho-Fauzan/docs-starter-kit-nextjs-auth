# Phase 5 Decision Record: Theme System

## Decision 1: Use shadcn-generated oklch tokens as-is
- **Context**: DESIGN.md specified specific oklch color values.
- **Decision**: No changes needed — shadcn preset `b3HawKzkye` already generates matching tokens.
- **Rationale**: Same preset ensures visual consistency across projects.

## Decision 2: Stick with Geist font (not Inter)
- **Context**: DESIGN.md originally specified Inter font.
- **Decision**: Keep Geist (create-next-app default).
- **Rationale**: Geist is Vercel's typeface, visually similar to Inter, already configured.

## Decision 3: Use `@plugin "@tailwindcss/typography"` (Tailwind v4 style)
- **Context**: Need prose classes for MDX content styling.
- **Decision**: Installed `@tailwindcss/typography` via npm and added `@plugin` directive.
- **Rationale**: Tailwind v4 uses `@plugin` in CSS, not `require()` in config.
