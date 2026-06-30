# Command: translate-to

Translate documentation files from English to a target locale in the NextJS Auth Starter Kit documentation project. Detects all untranslated `.mdx` files in `content/docs/en/` and creates their translated counterparts in the target locale directory.

Steps:

1. **Parse arguments** — Extract the target language code from the user input (e.g., `/run translate-to id` → target is `id`, `/run translate-to ja` → target is `ja`). If no language code is provided, ask the user which language to translate to.

2. **Check language support** — Read `lib/i18n.ts` and `middleware.ts`. Check if the target language code exists in the `languages` array in both files.
   - If the language IS supported: proceed to step 3.
   - If the language is NOT supported:
     a. Report: `"Language '{code}' is not yet configured. To add it, I need to update lib/i18n.ts and middleware.ts."`
     b. Ask the user for confirmation before proceeding
     c. If confirmed:
        - Update `lib/i18n.ts` line 5: add the language code to the `languages` array in `defineI18n()`
        - Update `lib/i18n.ts` line 48: add the language code to the `locales` const array
        - Add a new locale block inside the `.add()` call in `lib/i18n.ts` for the new language, with translated UI strings for all 8 keys (`nav.search`, `nav.searchShortcut`, `footer.copyright`, `toc.title`, `search.placeholder`, `search.noResults`, `prevNext.previous`, `prevNext.next`)
        - Update `middleware.ts` line 5: add the language code to the `languages` array in `createI18nMiddleware()`
        - Create the content directory at `content/docs/<target-lang>/`
        - Report: "Language '{code}' configured successfully. Proceeding with translation."
     d. If not confirmed, abort with: "Translation cancelled."

3. **Scan for untranslated files** — Use glob to recursively find all `.mdx` files under `content/docs/en/`. For each file, derive its relative path from `en/` (e.g., `en/get-started/installation.mdx` → `get-started/installation.mdx`). Check if a corresponding file exists at `content/docs/<target-lang>/<relative-path>`. Collect the list of files that exist in `en/` but NOT in `<target-lang>/`.

4. **Report scope** — Output a summary:
   ```
   Source locale: en (N files)
   Target locale: <code> (M files already exist)
   Files to translate: P
   ```
   List the files to be translated. Ask the user to confirm before proceeding.

5. **For each file to translate**, read the English source file and create the translated version:

   a. **Frontmatter** — Translate `title` and `description` fields to the target language. Keep all other frontmatter fields unchanged.

   b. **Comment block** — Replace any existing comment block (after frontmatter) with a comment in the target language explaining the translation guidelines. If the target language is not one you know the instruction phrasing for, use English as fallback:
   ```mdx
   {/*
     This page is in <target-language-name>.
     To translate other pages:
     1. Copy the .mdx file from content/docs/en/ to content/docs/<code>/ with the same name
     2. Translate frontmatter (title, description)
     3. Translate headings and prose
     4. DO NOT translate: code blocks, URLs, API/feature names, variable names, CLI commands
     5. Ensure all internal links still work (keep the same relative paths)
   */}
   ```

   c. **Headings** — Translate all heading text (h1 through h6). Do NOT translate heading anchors or IDs.

   d. **Prose** — Translate all paragraph text, list items, and inline text.

   e. **DO NOT translate** (keep exactly as-is):
      - Code blocks and inline code
      - URL href/src values (translate link text but keep the path)
      - Feature/API names (e.g., `betterAuth`, `defineAuthConfig`, `getServerSession`)
      - Variable names, function names, type names
      - CLI commands (e.g., `pnpm dev`, `npx prisma db push`)
      - File paths and filenames (e.g., `auth.config.ts`, `.env`)
      - Package/library names (e.g., `fumadocs-mdx`, `shadcn`, `prisma`)
      - Config option names and env variable names

   f. **Internal links** — Keep relative paths unchanged (e.g., `./quick-start`, `../api/server-actions`).

   g. **Tables** — Translate header labels and cell text. Keep backtick-enclosed code values unchanged.

   h. **MDX components** — Translate visible string props (e.g., `title="..."`). Keep component names and code props unchanged.

6. **Write output** — For each translated file, determine the output path `content/docs/<target-lang>/<relative-path>`, create any missing parent directories, and write the translated content.

7. **Verify and report** — Run `pnpm build` to verify no build errors, then report:
   ```
   Translation complete!
   Source: en → Target: <code>
   Files translated: P
   Build: ✅ Passed (or ❌ Failed — see output above)
   ```
   If build fails, list the errors and offer to fix them.

## Language Reference

Common UI terms for supported locales:

| English | id (Indonesian) |
|---------|-----------------|
| Installation | Instalasi |
| Quick Start | Mulai Cepat |
| Configuration | Konfigurasi |
| Getting Started | Memulai |
| Related | Terkait |
| Prerequisites | Prasyarat |
| Step | Langkah |
| Troubleshooting | Pemecahan Masalah |
| Overview | Ikhtisar |
| Reference | Referensi |
| Examples | Contoh |
| Guides | Panduan |
| Verification | Verifikasi |
| Next | Selanjutnya |
| Previous | Sebelumnya |
| Search | Cari |
| Documentation | Dokumentasi |
