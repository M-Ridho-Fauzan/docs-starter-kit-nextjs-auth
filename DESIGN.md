# Design — NextJS Auth Starter Kit Documentation Site

## Framework Architecture

### Layer Stack

```
┌─────────────────────────────────────────┐
│          shadcn/ui (design system)       │
│  button, card, sheet, command, etc.     │
├─────────────────────────────────────────┤
│      Custom Layout Components           │
│  navbar, sidebar, TOC, footer, mobile   │
├─────────────────────────────────────────┤
│     fumadocs-core (headless utilities)  │
│  search, page tree, source loader      │
├─────────────────────────────────────────┤
│     fumadocs-mdx (content compiler)     │
│  type-safe MDX, build-time validation  │
├─────────────────────────────────────────┤
│         Next.js 16 (App Router)         │
│  server components, routing, SSG       │
└─────────────────────────────────────────┘
```

### Keputusan Framework

| Aspek | Keputusan | Alasan |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | React RSC, Vercel first-class, output export |
| Content | Fumadocs MDX | Type-safe, build-time validation, Turbopack support |
| UI Library | shadcn/ui (preset `b3HawKzkye`) | Semantic oklch tokens, Tailwind v4, Radix primitives |
| Styling | Tailwind CSS v4 | Utility-first, oklch color space, JIT compilation |
| Search | Orama (via fumadocs-core) | Client-side, zero-config, built-in Fumadocs |
| i18n | next-intl | Standar de facto untuk App Router |
| Layout | Custom components | Kontrol penuh, tidak bergantung pada fumadocs-ui |
| Interactive | Config Builder | React component, self-contained |
| Deployment | Vercel | Zero-config Next.js support |

**Mengapa hybrid (Fumadocs MDX + custom layout)?**

| Approach | Kelebihan | Kekurangan |
|----------|-----------|------------|
| Fumadocs full (mdx + ui) | Cepat setup, fitur lengkap | Breaking changes, CSS conflicts, kurang kontrol |
| Custom Next.js + @next/mdx | Kontrol penuh | Harus build search, sidebar, TOC, i18n manual |
| **Hybrid (Fumadocs MDX only)** | Type-safe content, search built-in, full design control | Sedikit lebih setup awal |

---

## Color System

Menggunakan **oklch** color space (CSS Color Level 4) — sama dengan starter kit.

### Global Tokens (CSS Variables)

Definisi di `app/globals.css` via shadcn/ui:

```css
@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.153 0.006 107.1);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.153 0.006 107.1);
    --primary: oklch(0.555 0.163 48.998);
    --primary-foreground: oklch(0.987 0.022 95.277);
    --secondary: oklch(0.967 0.001 286.375);
    --secondary-foreground: oklch(0.21 0.006 285.885);
    --muted: oklch(0.966 0.005 106.5);
    --muted-foreground: oklch(0.58 0.031 107.3);
    --accent: oklch(0.966 0.005 106.5);
    --accent-foreground: oklch(0.228 0.013 107.4);
    --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.93 0.007 106.5);
    --input: oklch(0.93 0.007 106.5);
    --ring: oklch(0.737 0.021 106.9);
    --radius: 0;
  }

  .dark {
    --background: oklch(0.153 0.006 107.1);
    --foreground: oklch(0.988 0.003 106.5);
    --card: oklch(0.228 0.013 107.4);
    --card-foreground: oklch(0.988 0.003 106.5);
    --primary: oklch(0.473 0.137 46.201);
    --primary-foreground: oklch(0.987 0.022 95.277);
    --secondary: oklch(0.274 0.006 286.033);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.286 0.016 107.4);
    --muted-foreground: oklch(0.737 0.021 106.9);
    --accent: oklch(0.286 0.016 107.4);
    --accent-foreground: oklch(0.988 0.003 106.5);
    --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%);
    --input: oklch(1 0 0 / 15%);
    --ring: oklch(0.58 0.031 107.3);
  }
}
```

Tailwind classes yang tersedia:

| Token | Tailwind Usage |
|-------|---------------|
| `--background` | `bg-background` |
| `--foreground` | `text-foreground` |
| `--primary` | `bg-primary text-primary-foreground` |
| `--muted` | `bg-muted text-muted-foreground` |
| `--border` | `border-border` |
| `--ring` | `ring-ring` |

### Dark Mode

Strategy: `.dark` class on `<html>` via `next-themes`. Toggle via button in navbar.

---

## Typography

| Aspek | Value |
|-------|-------|
| Font heading | Inter, system-ui, sans-serif |
| Font body | Inter, system-ui, sans-serif |
| Font monospace | JetBrains Mono, Fira Code, monospace |
| Base size | 16px |
| Content max-width | `max-w-4xl` (768px) atur dengan shadcn/ui prose classes |

Font diatur di `globals.css` via `@theme` atau di `tailwind.config.ts`.

---

## Layout

```
┌─────────────────────────────────────────────────────────┐
│  Navbar (sticky, top-0, z-50)                           │
│  [Logo]  [Docs]  [GitHub]       [🔍] [🌐] [☀️] [≡]    │
├──────────┬──────────────────────────────┬────────────────┤
│          │                              │                │
│ Sidebar  │  Main Content                │  TOC           │
│ (sticky) │  (scrollable)               │  (sticky)      │
│ (w-64)   │  (max-w-4xl)                │  (w-56)        │
│          │                              │                │
│ ▸ Get    │  # Page Title                │  On This Page  │
│   Started│  ## Section 1                │  • Introduction│
│   ├ Inst │  Paragraph text...           │  • Installation│
│   ├ Quick│  ```typescript               │  • Configuration│
│   ├ Conf │  const x = 1;                │                │
│ ▸ Auth   │  ```                         │                │
│   ├ Email│  ## Section 2                │                │
│ ▸ API    │  More content...             │                │
├──────────┴──────────────────────────────┴────────────────┤
│  Footer (minimal)                                       │
│  Copyright © 2026  |  GitHub  |  Powered by Next.js    │
└──────────────────────────────────────────────────────────┘
```

### Layout Specifications

| Element | Style | Behavior |
|---------|-------|----------|
| Navbar | `position: sticky; top: 0; z-index: 50; h-16; border-b` | Fixed on scroll |
| Sidebar | `position: sticky; h-[calc(100vh-4rem)]; w-64; overflow-y-auto` | Sticky, scrollable, collapsible categories |
| TOC | `position: sticky; w-56; hidden lg:block` | Sticky, hidden on mobile |
| Content | `max-w-4xl; mx-auto; px-8; py-12` | Centered, readable width |
| Mobile nav | `<Sheet>` (shadcn/ui) slide-out | Triggered by hamburger in navbar |

### Responsive Breakpoints

| Breakpoint | Sidebar | TOC | Navbar |
|-----------|---------|-----|--------|
| `lg` (1024px+) | Visible | Visible | Full |
| `md` (768px+) | Visible | Hidden | Full |
| `<md` (mobile) | Sheet | Hidden | Compact + hamburger |

---

## Components

### shadcn/ui Primitives

| Component | Digunakan di |
|-----------|-------------|
| Button | Navbar links, CTA buttons |
| Card | Homepage feature grid |
| Sheet | Mobile sidebar navigation |
| Separator | Sidebar category dividers |
| ScrollArea | Sidebar scrollable area |
| Command | Search dialog (Cmd+K) |
| Checkbox | Config builder toggles |
| Input | Config builder form fields |
| Select | Config builder dropdowns |
| Badge | Feature tags di homepage |

### Custom Components

| Component | Lokasi | Deskripsi |
|-----------|--------|-----------|
| `navbar.tsx` | `components/layout/` | Sticky top bar with logo, nav links, search, locale, theme |
| `sidebar.tsx` | `components/layout/` | Collapsible sidebar from Fumadocs page tree |
| `sidebar-mobile.tsx` | `components/layout/` | Mobile sidebar via Sheet component |
| `toc.tsx` | `components/layout/` | Table of contents, scrollspy |
| `footer.tsx` | `components/layout/` | Minimal footer with links |
| `docs-layout.tsx` | `components/layout/` | Composes navbar + sidebar + content + TOC + footer |
| `code-block.tsx` | `components/docs/` | Code block with copy + syntax highlighting |
| `callout.tsx` | `components/docs/` | Admonition (info, warning, danger, tip) |
| `tabs.tsx` | `components/docs/` | Tabbed content (e.g., adapter comparison) |
| `steps.tsx` | `components/docs/` | Numbered step-by-step instructions |
| `config-builder.tsx` | `components/` | Interactive auth.config.ts form → code generator |

---

## Search

- **Provider**: Orama (built-in via fumadocs-core)
- **Index**: Auto-generated dari Fumadocs page tree
- **UI**: `Command` palette (shadcn/ui)
- **Shortcut**: `Cmd+K` / `Ctrl+K`
- **Endpoint**: `GET /api/search`
- **Harga**: Gratis (client-side, zero external service)

---

## i18n

| Locale | Code | Status |
|--------|------|--------|
| English | `en` | Default, primary |
| Bahasa Indonesia | `id` | Secondary |

### Translation Strategy

- **UI strings**: `messages/en.json` dan `messages/id.json`
- **Content**: Copy file `.mdx` ke `.id.mdx` atau subfolder per locale
- **Router**: `app/[locale]/` + next-intl middleware
- **Toggle**: Dropdown di navbar

### Route Structure

```
/en/docs/get-started/installation
/id/docs/get-started/installation
```

---

## Fumadocs MDX Integration

### Content Pipeline

```
source.config.ts        → defineDocs({ dir: 'content/docs' })
       ↓
lib/source.ts           → createMDXSource() + loader()
       ↓
app/[locale]/docs/      → [[...slug]]/page.tsx catch-all
       ↓
generateStaticParams()  → pre-build semua halaman (SSG)
```

### meta.json Format

Fumadocs menggunakan `meta.json` (bukan `_category_.json` Docusaurus) untuk ordering:

```json
{
  "title": "Get Started",
  "pages": ["installation", "quick-start", "configuration", "environment-variables", "project-structure"]
}
```

### MDX Components

Semua custom components didaftarkan via `source.config.ts` atau MDX import:

```mdx
import { Callout } from "@/components/docs/callout";
import { Tabs, Tab } from "@/components/docs/tabs";

<Callout type="info">
  This feature requires Better Auth v1.x.
</Callout>
```

---

## Data Flow

```
auth.config.ts (di source project)
       │
       ▼
┌─────────────────────────────┐
│  Interactive Config Builder  │  ← Toggles → Live preview
│  (components/config-builder) │
└─────────────────────────────┘
       │
       ▼
         Export / Copy to clipboard

       ┌──────────────────────┐
       │  31 MDX Content Files │  ← Type-safe, validated
       │  (content/docs/)      │
       └──────────────────────┘
               │
               ▼
       ┌──────────────────────┐
       │  fumadocs-mdx         │  ← Build-time compilation
       │  (source.config.ts)   │
       └──────────────────────┘
               │
               ▼
       ┌──────────────────────┐
       │  Fumadocs Core        │  ← Page tree, search index
       │  (lib/source.ts)      │
       └──────────────────────┘
               │
               ▼
       ┌──────────────────────┐
       │  Custom Layout        │  ← Navbar, sidebar, TOC, footer
       │  (components/layout/) │
       └──────────────────────┘
               │
               ▼
       ┌──────────────────────┐
       │  Next.js App Router   │  ← SSG pages, i18n, metadata
       │  (app/[locale]/)      │
       └──────────────────────┘
               │
               ▼
       ┌──────────────────────┐
       │  Vercel Deployment    │  ← Auto-deploy from GitHub
       └──────────────────────┘
```

---

## Inspiration & References

- **shadcn/ui** — https://ui.shadcn.com (semantic color tokens, clean typography)
- **Fumadocs** — https://fumadocs.dev (content pipeline, search, page tree)
- **Tailwind CSS docs** — https://tailwindcss.com (documentation layout, search UX)
- **Next.js docs** — https://nextjs.org/docs (sidebar navigation pattern)

---

## Fleksibilitas Desain

| Komponen | Cara Kustomisasi |
|----------|-----------------|
| Navbar | Edit `components/layout/navbar.tsx` — bisa jadi sticky, static, atau floating |
| Sidebar | Edit `components/layout/sidebar.tsx` — collapsible, searchable, icon support |
| TOC | Edit `components/layout/toc.tsx` — posisi kiri/kanan, hide di layar kecil |
| Warna | Ubah CSS variables di `globals.css` — ganti oklch tokens |
| Font | Ubah `tailwind.config.ts` atau `@theme` di globals.css |
| Shadow/radius | Ubah `--radius` variabel — `0` untuk sharp, `0.5rem` untuk rounded |
| Mobile nav | Edit `components/layout/sidebar-mobile.tsx` — sheet, drawer, atau fullscreen |
| Content width | Ubah `max-w-4xl` di layout — lebih lebar atau sempit |
| Sticky elements | Ubah CSS `position` di layout components |
| Search UI | Ganti Command palette dengan SearchDialog dari fumadocs-core |
| Theme toggle | Ubah dari sun/moon icon ke switch atau dropdown |

---

## Non-Goals

- Tidak menggunakan fumadocs-ui — layout 100% custom dengan shadcn/ui
- Tidak ada blog — hanya dokumentasi
- Tidak ada authentication di docs site — ini dokumentasi, bukan app
- Tidak ada database — content dari filesystem via Fumadocs
