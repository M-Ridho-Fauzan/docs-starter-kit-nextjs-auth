# Decision: Phase 2 — Configure Content Pipeline

**Date**: 2026-06-25
**Mode**: Build
**Decision by**: builder + code-reviewer

## Summary

Phase 2 configured the Fumadocs MDX content pipeline. The project can now compile MDX files using Fumadocs' build-time content pipeline.

## Decisions Made

### 1. Fumadocs MDX API version
- **Decision**: Use fumadocs-mdx v15 API pattern
- **Key differences from PLAN.md**:
  - `toFumadocsSource` from `fumadocs-mdx/runtime/server` (not `createMDXSource`)
  - `loader` from `fumadocs-core/source`
  - Auto-generated `.source/` directory at build time
- **Rationale**: The PLAN.md was written against an older version. v15 changed the runtime API.

### 2. `.source/` re-export pattern
- **Decision**: Created `.source/index.ts` that re-exports from `.source/server.ts`
- **Rationale**: Fumadocs v15 generates `server.ts`, `browser.ts`, `dynamic.ts` but NOT `index.ts`. The `lib/source.ts` imports from `@/.source` which resolves to `./.source/index.ts`. This re-export bridge is needed.
- **Alternatives considered**: 
  - Import from `@/.source/server` directly → would require changing all consumer imports
  - Wait for Fumadocs to generate index.ts → might come in future versions, but need it now
  - Current approach: minimal bridge file

### 3. next.config.ts with createMDX
- **Decision**: Wrapped config with `createMDX()` from `fumadocs-mdx/next`
- **Pattern**: `export default withMDX(nextConfig)`
- **Turbopack**: Kept `turbopack.root: process.cwd()` to prevent workspace root detection issues

### 4. content directory structure
- **Decision**: Created empty `content/docs/` directory
- **Rationale**: Fumadocs `defineDocs({ dir: 'content/docs' })` needs the directory to exist. Content files will be migrated in Phase 3.

### 5. `.gitignore` update
- **Decision**: Added `/.source` to `.gitignore`
- **Rationale**: The `.source/` directory is auto-generated at build time. Should not be committed.

## Files Created/Modified

### Created
- `source.config.ts` — Fumadocs MDX config with `defineDocs`
- `lib/source.ts` — Content source loader with `toFumadocsSource`
- `.source/index.ts` — Re-export bridge (auto-generated content from `server.ts`)
- `content/docs/` — Empty directory (ready for Phase 3)

### Modified
- `next.config.ts` — Added `createMDX()` wrapper
- `.gitignore` — Added `/.source`

## Build Verification

- ✅ `pnpm build` passes (3 static routes + Fumadocs MDX compilation)
- ✅ `tsc --noEmit` passes (zero TypeScript errors)
- ✅ `[MDX] generated files in ~25ms` — content pipeline working

## Next Steps

Phase 3: Migrate content (docs/ → content/docs/, .md → .mdx)
