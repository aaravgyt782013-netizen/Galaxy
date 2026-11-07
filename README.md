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
| `/admin` | Password protected control panel |
| `/sitemap.xml` | Generated from the full catalogue |

214 real resources are catalogued in `src/data/rawSlugs.ts` (generated from
`src/data/slugs.txt`), with depth-first articles for the newest drops in
`src/data/articles.ts` and a templated fallback for the rest.

## Admin panel

Open **`/admin`** and log in.

| | |
| --- | --- |
| Default username | `admin` |
| Default password | `galaxy123` |

> Set `ADMIN_USER` and `ADMIN_PASSWORD` (and optionally `ADMIN_SECRET`) as environment
> variables on Vercel before going live — the defaults are only for local testing.

What it can do:

- **Resources** — search the whole catalogue, change a resource's category inline, edit
  title / download URL / date / labels, hide a resource from the site, or restore it.
- **Add new** — create brand new resources (title, slug, category, date, download URL,
  excerpt, labels). They appear in the catalogue, category pages, search and the homepage.
- **Site settings** — edit the hero badge, headline, subtitle, Discord invite and both
  accent colours (applied as CSS variables).
- **Publish** — download or copy the generated `content.json`, import a previous one, or
  reset every change.

### How saving works

The site is statically generated, so the admin panel writes your draft to
`localStorage`. Open `/?preview=1` to see the draft applied live to the real site.

To publish for everyone, download `content.json` from the **Publish** tab, drop it over
`src/data/content.json`, commit and push — Vercel redeploys automatically:

```bash
cp ~/Downloads/content.json src/data/content.json
git commit -am "Update site content" && git push
```

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


## Shared admin content (Neon PostgreSQL)

Admin edits are stored centrally in Neon PostgreSQL and are read by the public website. After the first successful admin save, updates are shared with all visitors without replacing a JSON file or rebuilding the site.

1. Create a Neon PostgreSQL project.
2. Copy its **pooled** connection string.
3. In Vercel → Project → Settings → Environment Variables, add `DATABASE_URL` with that connection string for Production and Preview (and Development if needed).
4. Set strong `ADMIN_USER`, `ADMIN_PASSWORD`, and `ADMIN_SECRET` values in the same environments. Do not commit real secrets.
5. Redeploy after adding or changing environment variables.

The app creates the `poke_studio_site_content` table automatically on first API access. The first read uses the bundled `src/data/content.json` as the initial default; the first admin save stores the complete content document in Neon.

The public read endpoint is `/api/content`. Writes use `PUT /api/content` and require the existing admin session cookie. If Neon is not configured or unavailable, the public site falls back to bundled content and the admin panel shows a sync error rather than pretending the save succeeded.
