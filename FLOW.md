# Flow — Development Workflow

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server (hot reload)
pnpm dev
# → http://localhost:3000 (auto-redirect ke /en/docs/...)

# Dev on alternate port
pnpm dev --port 3001

# Build production
pnpm build

# Preview production build
pnpm start
# → http://localhost:3000
```

## Dev Server Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with hot reload |
| `pnpm dev --port 3001` | Dev server on alternate port |
| `pnpm build` | Build static site to `.next/` |
| `pnpm start` | Preview production build |
| `pnpm fumadocs` | Fumadocs CLI utilities (validate content, generate types) |

## Translation Workflow

### Setup locale

next-intl handles locale routing automatically. Create translation files:

```
messages/
├── en.json              ← English UI strings
└── id.json              ← Indonesian UI strings
```

### Translate UI strings

`messages/en.json`:
```json
{
  "nav": {
    "docs": "Docs",
    "github": "GitHub"
  },
  "footer": {
    "copyright": "Built with Next.js + Fumadocs"
  }
}
```

`messages/id.json`:
```json
{
  "nav": {
    "docs": "Dokumentasi",
    "github": "GitHub"
  },
  "footer": {
    "copyright": "Dibangun dengan Next.js + Fumadocs"
  }
}
```

### Preview translation

```bash
# Buka locale-specific URL langsung
# http://localhost:3000/en/docs/get-started/installation
# http://localhost:3000/id/docs/get-started/installation
```

### Translate content pages

Untuk konten dokumentasi dalam bahasa Indonesia:

```bash
# Copy English content
cp content/docs/get-started/installation.mdx content/docs/get-started/installation.id.mdx
# Translate the copied file manually
```

## Content Workflow

### Add new documentation page

1. Create `.mdx` file in `content/docs/<section>/`
2. Add to `content/docs/<section>/meta.json` `pages` array for ordering
3. Run `pnpm dev` to verify
4. Run `pnpm build` to check production build

### Update Fumadocs content pipeline

```bash
# Validate content structure
pnpm fumadocs validate

# Generate source type definitions
pnpm fumadocs generate
```

## Deployment

### Via Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod

# Or preview deployment
vercel
```

### Via GitHub (automatic)

Vercel auto-deploys when you push to the connected GitHub repository:

```bash
git push origin main  # triggers auto-deploy
```

### Environment variables (if needed)

Set di Vercel dashboard → Project → Settings → Environment Variables.

---

## OpenCode Workflow

### Session pattern

```bash
# 1. Start — identify what to do
/run next-task

# 2. Write content
/run write-section

# 3. Verify
/run check-links
/run seo-audit
/run review

# 4. Build & test
pnpm build
```

### Common OpenCode commands

| Command | Description |
|---------|-------------|
| `/run next-task` | Find next unchecked task in AGENTS.md |
| `/run write-section` | Write next documentation section |
| `/run seo-audit` | Audit SEO compliance |
| `/run review` | Review content accuracy |
| `/run check-links` | Verify internal links |

---

## Troubleshooting

### Dev server not starting

```bash
# 1. Port conflict
pnpm dev --port 3001

# 2. Clear Next.js cache
rm -rf .next
pnpm dev

# 3. Check Node.js version
node --version  # harus >= 18.18
```

### Build errors

```bash
# 1. Check for TypeScript errors
pnpm build 2>&1 | Select-String "Error"

# 2. Check Fumadocs content validation
pnpm fumadocs validate

# 3. Check for broken internal links
# (manual check via /run check-links)
```

### Content not rendering

```bash
# 1. Verify file is in content/docs/ (not docs/)
# 2. Verify file extension is .mdx (not .md)
# 3. Check page has proper frontmatter (title, description)
# 4. Check meta.json includes the page
# 5. Restart dev server
pnpm dev
```

### Tailwind classes not working

```bash
# 1. Check globals.css has @tailwind directives (shadcn init handles this)
# 2. Check tailwind.config.ts content paths include components/ and app/
# 3. Restart dev server (Tailwind v4 uses Vite-like JIT)
pnpm dev
```

### i18n not working

```bash
# 1. Check middleware.ts has locales: ['en', 'id']
# 2. Check messages/ files exist and have correct JSON structure
# 3. Check URL includes locale: http://localhost:3000/en/docs/...
# 4. Check next.config.mjs has i18n config if using next-intl
```

### Search not working

```bash
# 1. Check /api/search route exists
# 2. Check Orama index is being generated from source.getPages()
# 3. Open browser console for errors
# 4. Verify Cmd+K / Ctrl+K opens the search dialog
```

---

## Git Workflow

```bash
# After each phase
git add .
git commit -m "feat(docs): phase N - description"

# Before merge
/run check-links
/run seo-audit
/run review
pnpm build
```

## Architecture & Troubleshooting Guide

### Folder Purpose

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js App Router pages, layouts, API routes |
| `content/docs/` | All documentation in MDX format |
| `components/layout/` | Navbar, sidebar, TOC, footer, mobile nav |
| `components/ui/` | shadcn/ui primitives (button, card, etc.) |
| `components/docs/` | MDX custom components (callout, tabs, code-block) |
| `lib/` | Utilities (cn, source, i18n config) |
| `messages/` | i18n JSON files |
| `public/` | Static assets (favicon, robots.txt, OG image) |

### Quick Fixes

| Problem | Fix |
|---------|-----|
| Page not found | Check `meta.json` includes the page |
| Wrong sidebar order | Reorder `pages` array in `meta.json` |
| Dark mode not working | Check `ThemeProvider` is wrapping layout |
| Search returns nothing | Check `GET /api/search` route |
| Translation not showing | Check `messages/{locale}.json` exists |
| Config builder broken | Check component imports are correct |
