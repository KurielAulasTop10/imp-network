# Agent Instructions

## Commands
- **Build**: `pnpm build` (Next.js production build)
- **Dev**: `pnpm dev` (development server with Turbo)
- **Lint/Format**: Use Biome with `npx biome check --apply .` or `npx biome format --write .`
- **Type Check**: `npx tsc --noEmit`
- **Slice Machine**: `pnpm slicemachine` (Prismic CMS slice development)

## Architecture
- **Framework**: Next.js 15 with App Router, React 19, TypeScript
- **CMS**: Prismic (main content source) - config in `src/prismicio.ts`
- **APIs**: IGDB gaming database, OpenAI via ElectronHub proxy
- **Monitoring**: Sentry error tracking and performance monitoring
- **Styling**: TailwindCSS with custom components in `src/components/`

## Code Style (Biome)
- **Formatting**: Tab indentation, double quotes, organize imports enabled
- **Imports**: Use `@/` alias for `src/` directory
- **Components**: Store in `src/components/` with PascalCase naming
- **API Routes**: Place in `src/app/api/` following App Router conventions
- **Types**: Define in TypeScript with strict mode enabled

## Environment Variables
- `IGDB_ID` and `IGDB_SECRET` for gaming database
- Prismic access token (currently hardcoded, should be env var)
