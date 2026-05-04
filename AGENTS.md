# Império Network — Astro Migration

## Project Overview

Portuguese gaming/tech/anime news portal migrated from Next.js to Astro.

- **Site**: https://imperionetwork.fr
- **Language**: Portuguese (pt-BR)
- **Theme**: Dark mode, red accent (#dd3333), Rubik font
- **CMS**: Prismic (`imperio-network` repo)
- **Framework**: Astro 6 + React 19 (server output with `@astrojs/node` adapter)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`
- **Package Manager**: bun
- **Linter/Formatter**: Biome 2

## Commands

```bash
bun run dev        # Astro dev server
bun run build      # Astro production build (SSR)
bun run preview    # Preview production build
bun run lint       # Biome check
bun run lint:fix   # Biome check --write
bun run format     # Biome format --write
```

## Architecture

### Key Directories

```
src/
  components/       # React components (client-side hydrated)
    posts/          # PostCard, PostsGrid, AuthorBox, Ad
    ui/             # button, dialog, carousel (shadcn-style)
  hooks/            # use-scroll
  layouts/          # BaseLayout.astro (root layout)
  lib/              # utils.ts (cn), igdb.ts (IGDB fetch)
  pages/            # Astro routes
    api/            # generate-ai, revalidate, preview, exit-preview
    categoria/      # [id].astro — category by Prismic tag
    post/           # [slug].astro — dynamic post pages
    search/         # index.astro
  prismicio.ts      # Prismic client (import.meta.env)
  prismicio-types.d.ts  # Generated Prismic types
  styles/           # globals.css (Tailwind v4)
  utils/            # cdn, is-touch-device, reading-time
legacy-source/      # Original Next.js app (reference only, NOT compiled)
```

### Routing

- `/` — Homepage with PostsGrid + Sidebar (IGDB games)
- `/post/[slug]` — Individual post (SSR)
- `/categoria/[id]` — Category page (SSR, filtered by Prismic tag)
- `/search` — Client-side search with Prismic filter
- `/contato`, `/sobre`, `/privacy`, `/review-policy`, `/goty`, `/gamescom` — Static content pages
- `/rss.xml` — RSS feed
- `/api/generate-ai` — OpenAI + Prismic write (POST)
- `/api/revalidate` — Cache revalidation webhook (POST)
- `/api/preview` — Prismic preview redirect (GET)
- `/api/exit-preview` — Exit preview mode (GET)

### Data Flow

1. Astro pages fetch data server-side in frontmatter
2. Data passed as props to React components with `client:idle`
3. TanStack Query available via `TanStackProvider` wrapper
4. IGDB data fetched server-side in `src/lib/igdb.ts`, passed to Sidebar

### Prismic Content Types

- `post` — Articles (fields: titulo, cover, editor, data, author, review, seo_description, resume)
- `author` — Writers (fields: avatar, banner, descricao)
- `anuncio` — Ads (fields: link, imagem)

### Categories (Prismic Tags)

anime, cinema, grátis, notícia, guia, nintendo, pc, playstation, xbox, mobile, review, tech

## Integrations

- **Google AdSense**: Publisher ID `ca-pub-7472145759524820`, raw `<ins>` tags
- **Analytics**: Umami (`fa206071-95a2-43af-b0fe-7b7dd0a99a2c`), GA4 (`G-FWY182VERW`)
- **Cookie Consent**: cookieinfoscript.com
- **Accessibility**: sienna-accessibility CDN
- **IGDB**: Twitch API for game release data (env: `IGDB_ID`, `IGDB_SECRET`)
- **OpenAI**: Via electronhub proxy for AI summaries (env: `OPENAI_API_KEY`)
- **Prismic Write**: For AI-generated content (env: `PRISMIC_WRITE_TOKEN`, `PRISMIC_ACCESS_TOKEN`)

## Environment Variables

```
PRISMIC_ACCESS_TOKEN=
PRISMIC_WRITE_TOKEN=
IGDB_ID=
IGDB_SECRET=
OPENAI_API_KEY=
```

## Conventions

- `import.meta.env` for env vars (NOT `process.env`)
- `<a>` tags instead of `next/link`
- React components use `client:idle` in Astro templates
- Prismic types imported from `@/prismicio-types`
- Prismic client imported from `@/prismicio`
- Tailwind CSS v4 with `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
- Biome excludes `.astro` and `.css` files (false positives for template-used variables and Tailwind directives)

## Known Limitations

- Prismic preview support is simplified (no `@prismicio/next`; uses custom API route redirect)
- `@prismicio/migrate` used for AI write operations (htmlAsRichText)
- Sidebar IGDB data fetched only on homepage (server-side)
- `ts-igdb-client` types are loosely typed (`any` catches used for API responses)
