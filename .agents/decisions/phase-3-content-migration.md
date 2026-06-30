# Phase 3 Decision Record: Content Migration

## Decision 1: Rename .md → .mdx at copy time
- **Context**: Fumadocs pipelines require `.mdx` for MDX processing.
- **Decision**: Copy with rename rather than in-place rename on original files.
- **Rationale**: Original files in `docs/` remain usable for the starter kit's own doc build.

## Decision 2: Section index pages as `folder/index.mdx`
- **Context**: Docusaurus used `_category_.json` with `generated-index` links. Fumadocs treats folders as collapsible groups in sidebar.
- **Decision**: Created `index.mdx` inside each folder to serve as landing page when clicking the section title.
- **Rationale**: Naturally maps to `/docs/get-started` URL, follows Fumadocs conventions.

## Decision 3: Fumadocs `meta.json` replaces `_category_.json`
- **Context**: Docusaurus used `_category_.json` for sidebar ordering and labeling.
- **Decision**: Created Fumadocs `meta.json` per folder with `pages` array for ordering.
- **Rationale**: Fumadocs requires `meta.json` for sidebar page ordering. Skipped `title` field in favor of `meta.json` `title`.

## Decision 4: Strip `.md`/`.mdx` from internal links
- **Context**: Original docs used `](../section/file.md)` links. Fumadocs uses URL routing without extensions.
- **Decision**: Stripped `.md` and `.mdx` from all markdown link references.
- **Rationale**: Ensures links work with Fumadocs catch-all route routing.

## Decision 5: Replace ```env with ```bash in code blocks
- **Context**: Shiki 4.3.0 (bundled with fumadocs-core) doesn't include `env` language.
- **Decision**: Changed to ``bash` for `.env` file examples.
- **Rationale**: `bash` provides basic highlighting for KEY=value pairs and is universally available.
