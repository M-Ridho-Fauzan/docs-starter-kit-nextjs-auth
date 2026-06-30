# Plan — Next.js Documentation Site Implementation

## Overview

Migrate `docs/nextbeterauth-starterkit/` from plain markdown files into a Next.js-based documentation site using Fumadocs MDX for content and shadcn/ui for design.

**Approach**: Hybrid — use `fumadocs-mdx` for type-safe content compilation, build all UI components with `shadcn/ui`, and handle layout (sidebar, navbar, TOC) as custom components.

**Duration**: ~75 menit (9 phases)

---

## Phase 1: Scaffold Next.js Project

### Step 1.1 — Backup existing content

```bash
# Backup content + config to temp
mkdir -p /tmp/docs-backup
mv docs .agents AGENTS.md README.md index.md DESIGN.md PLAN.md FLOW.md /tmp/docs-backup/
mv .vscode /tmp/docs-backup/ 2>/dev/null; mkdir -p .vscode; mv /tmp/docs-backup/.vscode/ . 2>/dev/null
# Hapus sisa file yang tidak dibutuhkan
```

### Step 1.2 — Init Next.js via shadcn

```bash
# Create Next.js project with shadcn/ui preset
npx shadcn@latest init --preset b3HawKzkye --template next --pointer

# Hasil: package.json, next.config.mjs, tailwind.config.ts, postcss.config.mjs,
#         components.json, app/ layout, globals.css, lib/utils.ts
```

### Step 1.3 — Install Fumadocs packages

```bash
pnpm add fumadocs-mdx fumadocs-core
pnpm add -D @types/mdx
```

### Step 1.4 — Install extra dependencies

```bash
pnpm add next-intl           # i18n
pnpm add next-themes         # dark mode (bawaan shadcn)
pnpm add next-sitemap        # SEO sitemap
pnpm add rehype-pretty-code  # syntax highlighting (Fumadocs)
```

### Step 1.5 — Restore config files

```bash
mv /tmp/docs-backup/AGENTS.md .
mv /tmp/docs-backup/README.md .
mv /tmp/docs-backup/DESIGN.md .
mv /tmp/docs-backup/PLAN.md .
mv /tmp/docs-backup/FLOW.md .
mv /tmp/docs-backup/.agents .
```

---

## Phase 2: Configure Content Pipeline

### Step 2.1 — `source.config.ts`

```ts
import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig();
```

### Step 2.2 — `lib/source.ts`

```ts
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { docs, meta } from '../../source.config';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});
```

### Step 2.3 — `next.config.mjs`

```mjs
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(config);
```

### Step 2.4 — Test content pipeline

```bash
pnpm fumadocs dev  # Fumadocs CLI — validate content
pnpm build         # Verify production build
```

---

## Phase 3: Migrate Content

### Step 3.1 — Create content directory

```bash
mkdir content
mv /tmp/docs-backup/docs content/
mv content/docs/index.md content/docs/index.mdx
```

### Step 3.2 — Rename .md → .mdx

Konversi manual atau rename semua file `.md` menjadi `.mdx`:

```bash
Get-ChildItem -Recurse -Filter "*.md" -Path content/docs | Rename-Item -NewName { $_.Name -replace '\.md$', '.mdx' }
```

### Step 3.3 — Create Fumadocs meta.json

Ganti `_category_.json` dengan format Fumadocs `meta.json`:

```json
// content/docs/meta.json
{
  "pages": [
    "get-started",
    "auth-features",
    "database",
    "api",
    "ui",
    "guides",
    "reference",
    "examples"
  ]
}
```

Buat `meta.json` untuk setiap subfolder dengan format array `pages` untuk urutan.

### Step 3.4 — Create docs catch-all route

`app/docs/[[...slug]]/page.tsx`:

```tsx
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string[] } }) {
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <article className="prose">
      <h1>{page.data.title}</h1>
      <MDXContent />
    </article>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
```

### Step 3.5 — Verify content renders

```bash
pnpm dev  # Buka http://localhost:3000/docs/get-started/installation
```

Update checklist di `AGENTS.md` untuk setiap file yang selesai.

---

## Phase 4: Build Custom Layout

### Step 4.1 — Add shadcn/ui layout components

```bash
pnpm dlx shadcn@latest add sheet       # Mobile sidebar
pnpm dlx shadcn@latest add separator   # Sidebar dividers
pnpm dlx shadcn@latest add button      # Navbar buttons
pnpm dlx shadcn@latest add card        # Homepage features
pnpm dlx shadcn@latest add scroll-area # Sidebar scroll
```

### Step 4.2 — Create layout components

```
components/layout/
├── navbar.tsx        ← Sticky top bar (logo, nav links, search, locale, theme toggle)
├── sidebar.tsx       ← Collapsible sidebar (sticky, scrollable)
├── sidebar-mobile.tsx← Sheet-based mobile navigation
├── toc.tsx           ← Table of contents (sticky, right side)
├── footer.tsx        ← Minimal footer (copyright, GitHub link)
└── docs-layout.tsx   ← Composes all layout components
```

### Step 4.3 — Docs layout structure

```
┌─────────────────────────────────────────────────────────┐
│  Navbar (sticky top, z-50)                              │
│  [Logo]  [Docs]  [GitHub]       [🔍] [🌐] [☀️] [≡]    │
├──────────┬──────────────────────────────┬────────────────┤
│          │                              │                │
│ Sidebar  │  Content                     │  TOC           │
│ (sticky) │  (main)                      │  (sticky)      │
│ (w-64)   │  (max-w-4xl)                 │  (w-56)        │
│          │                              │                │
│ ▸ Get    │  # Page Title                │  On this page  │
│   Started│  ## Section 1                │  • Section 1   │
│   ├ Inst │  Paragraph...                │  • Section 2   │
│   ├ Quick│  ```typescript               │  • Section 3   │
│ ▸ Auth   │  const x = 1;                │                │
│   ├ Email│  ```                         │                │
│   ├ OAuth│  ## Section 2                │                │
│ ▸ API    │  Content...                  │                │
├──────────┴──────────────────────────────┴────────────────┤
│  Footer (minimal)                                        │
└──────────────────────────────────────────────────────────┘
```

### Step 4.4 — Create docs layout

`app/[locale]/docs/layout.tsx`:

```tsx
import { DocsLayout } from '@/components/layout/docs-layout';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout sidebar={source.getPages()}>
      {children}
    </DocsLayout>
  );
}
```

### Step 4.5 — Homepage

`app/[locale]/page.tsx` — Hero section + feature grid cards (shadcn/ui Card).

---

## Phase 5: Theme System

### Step 5.1 — CSS variables (oklch)

`app/globals.css` — shadcn/ui sudah generate CSS variables dari preset `b3HawKzkye`. Override dengan oklch tokens dari `DESIGN.md` untuk konsistensi dengan starter kit.

```css
@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.153 0.006 107.1);
    --primary: oklch(0.555 0.163 48.998);
    --primary-foreground: oklch(0.987 0.022 95.277);
    --radius: 0;
    /* ... semua token oklch dari DESIGN.md */
  }

  .dark {
    --background: oklch(0.153 0.006 107.1);
    --foreground: oklch(0.988 0.003 106.5);
    --primary: oklch(0.473 0.137 46.201);
    /* ... semua token dark mode */
  }
}
```

### Step 5.2 — Theme provider

`app/[locale]/layout.tsx`:

```tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 5.3 — Dark mode toggle

Button in navbar that toggles `.dark` class via `useTheme()` from `next-themes`.

---

## Phase 6: Search

### Step 6.1 — Create search API route

`app/api/search/route.ts`:

```ts
import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';

export const { GET } = createSearchAPI('advanced', {
  indexes: source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    content: page.data.body,
    url: page.url,
    id: page.url,
  })),
});
```

### Step 6.2 — Add search dialog to navbar

Gunakan `SearchDialog` dari `fumadocs-core/search/client` atau custom dengan shadcn/ui Command palette.

```bash
pnpm dlx shadcn@latest add command    # Command palette untuk search UI
```

### Step 6.3 — Test search

```bash
pnpm dev  # Buka http://localhost:3000 → tekan Cmd+K / Ctrl+K
```

---

## Phase 7: i18n

### Step 7.1 — Configure next-intl

`lib/i18n.ts`:

```ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => ({
  locale: await requestLocale,
  messages: (await import(`../messages/${await requestLocale}.json`)).default,
}));
```

### Step 7.2 — i18n middleware

`middleware.ts`:

```ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### Step 7.3 — Locale routing

Move `app/` → `app/[locale]/`:

```
app/[locale]/
├── layout.tsx
├── page.tsx
└── docs/
    └── [[...slug]]/page.tsx
```

### Step 7.4 — Create translation files

`messages/en.json`:
```json
{
  "nav": {
    "docs": "Docs",
    "github": "GitHub"
  },
  "footer": {
    "copyright": "Built with Next.js + Fumadocs"
  },
  "search": {
    "placeholder": "Search docs..."
  },
  "toc": {
    "title": "On this page"
  }
}
```

`messages/id.json` — translated copy.

Add locale toggle button in navbar (dropdown with `en` / `id`).

### Step 7.5 — Content translation

Untuk translate konten dokumentasi:

```
content/
└── docs/
    ├── get-started/
    │   ├── installation.mdx       ← English
    │   └── installation.id.mdx    ← Indonesian (future)
    └── ...
```

---

## Phase 8: Interactive Config Builder

### Step 8.1 — Create config builder component

`components/config-builder.tsx` — React component with:

- Toggle switches untuk: email/password, email verification, password reset, 2FA, roles
- OAuth provider cards: GitHub, Google, custom (dengan input client ID/secret)
- Database adapter selector: Prisma, Drizzle, Kysely
- Session strategy selector: JWT, Database
- Live preview: generates formatted `auth.config.ts` code
- Copy to clipboard button

### Step 8.2 — Integrate with docs

Masukkan ke halaman `configuration.mdx`:

```mdx
import { ConfigBuilder } from "@/components/config-builder";

## Interactive Builder

<ConfigBuilder />
```

### Step 8.3 — Test component

```bash
pnpm dev  # Buka halaman configuration, test form toggle → lihat output
```

---

## Phase 9: SEO & Deploy

### Step 9.1 — Sitemap

`next-sitemap.config.js`:

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://starterkit-auth-nextjs.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
};
```

### Step 9.2 — Public files

```
public/
├── robots.txt
├── favicon.ico
└── og-image.png     ← OpenGraph image
```

### Step 9.3 — Metadata per page

Tambahkan metadata di catch-all route menggunakan `generateMetadata`:

```ts
import type { Metadata } from 'next';

export function generateMetadata({ params }: Props): Metadata {
  const page = source.getPage(params.slug);
  return {
    title: page?.data.title,
    description: page?.data.description,
    openGraph: {
      title: page?.data.title,
      description: page?.data.description,
    },
  };
}
```

### Step 9.4 — Build & deploy

```bash
pnpm build                    # Production build
pnpm start                    # Test locally

# Deploy
npx vercel --prod
```

Hubungkan GitHub repository di Vercel dashboard → auto-deploy on push.

### Step 9.5 — Custom domain (optional)

Vercel → Project → Settings → Domains → add custom domain.

---

## Rollback Plan

Jika salah satu phase gagal:

```bash
# Restore all content from backup
mv /tmp/docs-backup/* .
rm -rf node_modules .next content app lib components messages public
git checkout -- .
```

## Fleksibilitas

Project ini dirancang modular sehingga mudah diubah:

| Ingin... | Yang perlu diubah |
|----------|------------------|
| Ganti framework | Hanya ubah template di `npx shadcn@latest init -t [framework]` |
| Tambah halaman | Tambah file `.mdx` di `content/docs/` |
| Custom sidebar | Edit `components/layout/sidebar.tsx` |
| Ganti search | Hapus Orama route, tambah Algolia/Meilisearch |
| Ganti i18n library | Ganti `next-intl` dengan `next-international` dll |
| Tambah fitur | Buat komponen baru di `components/` |
| Buat tema baru | Ubah CSS variables di `globals.css` |
| Hapus config builder | Hapus `components/config-builder.tsx` dan import-nya |
