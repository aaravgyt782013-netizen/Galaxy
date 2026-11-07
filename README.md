# Galaxy Setup Pro

A faithful rebuild of **[galaxysetuppro.online](https://www.galaxysetuppro.online/)** — a free
Minecraft resource library for plugins, server setups, maps, 3D models, configs and
server forks.

Built with Next.js 15 (App Router), React 19 and TypeScript, and deployed on Vercel.

## What's inside

| Route | Purpose |
| --- | --- |
| `/` | Hero, stats, 6-category strip and the latest 12 drops |
| `/category/[category]` | `plugin` · `setup` · `map` · `model` · `config` · `fork`, paginated |
| `/resource/[...slug]` | Full resource article (overview, features, install guide, info table) |
| `/search` | Client-side search with category filters |
| `/pages/[page]` | About, Contact, Privacy Policy, Disclaimer, Support My Work |
| `/sitemap.xml` | Generated from the full catalogue |

214 real resources are catalogued in `src/data/rawSlugs.ts` (generated from
`src/data/slugs.txt`), with depth-first articles for the newest drops in
`src/data/articles.ts` and a templated fallback for the rest.

## Design system

The original theme was extracted from the live site and reproduced in
`src/app/globals.css`:

- Fixed navbar with inset accent bar, isometric cube logo and condense-uppercase links
- Second fixed row for global search
- Hero panel with 40px grid overlay, oversized headline, `210+ / 6 / 100%` stats
  and a 6-column numbered category strip
- Card grid: 2:1 thumbnail, labels overlaid top-left, `GET IT NOW →` footer button,
  hover lift with hard accent shadow
- Dark footer with brand, categories, quick links, socials and tag chips
- Purple accent (`--accent:#7c3aed`) with a `light-mode` class toggle persisted in
  `localStorage`
- Barlow / Barlow Condensed typography

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (230 static pages)
```

## Regenerating the catalogue

```bash
node scripts/gen-slugs.mjs   # rebuilds src/data/rawSlugs.ts from slugs.txt
```

## Notes

This is an independent reimplementation of the site's front end and content model for
demo purposes. Resource names, builds and trademarks belong to their respective
owners; Minecraft is a trademark of Mojang Studios. Download buttons link back to the
original resource pages.
