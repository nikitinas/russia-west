# Content Store and UI Integration

This document describes how the **file-based content** in `content/russia-west/` is structured and how the UI (e.g. Next.js) should integrate with it. No database is used.

## Content location

- All narrative and archetype content extracted from the DeepSeek discussion lives under **`content/russia-west/`**.
- **`content/README.md`** is the main reference for folder layout, `structure.json` shape, archetype card frontmatter, and how the UI should read files.

## File system layout (summary)

- **`structure.json`**: Trunk links (with `titleRu` / `titleEn`), list of archetype slugs per branch, mirror pairs, and `archetypeMeta` (side, type, mirrorSlug, distortsSlug, relatedSlugs).
- **`ru/`** and **`en/`**: Same structure in each.
  - **Level 0–2 narrative**: `root.md`, `ontologies.md`, `ethics.md`, `mirror.md`, `solutions.md`.
  - **Level 3 (cards)**: `archetypes/good/russia/*.md`, `archetypes/good/west/*.md`, `archetypes/evil/russia/*.md`, `archetypes/evil/west/*.md`.

## How the UI uses the content

1. **Locale**: User selects `ru` or `en`. All Markdown and titles are loaded from `content/russia-west/{locale}/`.
2. **Level 0 (root)**: Read `structure.json` for trunk array; read `{locale}/root.md` for title and thesis. Render root screen with trunk links; each link’s label from `trunk[].titleRu` or `trunk[].titleEn` by locale.
3. **Level 1 → Level 2**: On trunk click, open the branch. For ontologies, ethics, mirror, solutions: load `{locale}/{slug}.md` (e.g. `ontologies.md`) and render. For archetypes-good / archetypes-evil: do not load a single branch file; use `structure.json` → `archetypes.good` / `archetypes.evil` to get lists per side (Russia / West).
4. **Level 2 → Level 3 (card)**: Route e.g. `/{locale}/archetypes/evil/russia/satan`. Load `{locale}/archetypes/evil/russia/satan.md`. Parse YAML frontmatter for `mirrorSlug`, `distortsSlug`, `relatedSlugs`. Render body; “Mirror” button links to the card for `mirrorSlug` (path from structure or convention: `archetypes/evil/west/leviathan`).
5. **Mirror and related**: Resolve slug to file path: `archetypes/{type}/{side}/{slug}.md`. Type and side for any slug are in `structure.json` → `archetypeMeta[slug]`. No backend; path is derived from slug + structure.

## Next.js integration (conceptual)

- **Static generation**: At build time, read `structure.json` and list all Markdown files under `ru/` and `en/`. `getStaticPaths` (or App Router `generateStaticParams`) can enumerate: `[locale]`, `[locale, trunkSlug]`, `[locale, type, side, slug]` for cards.
- **Data loading**: In `getStaticProps` or in Server Components, read the appropriate file with `fs` (or a helper that resolves path from `content/russia-west/{locale}/...`). Parse Markdown (e.g. `gray-matter` for frontmatter + `remark`/`rehype` for body, or a simple split on `---` for frontmatter).
- **Routing**: Suggested URL shape: `/` (root), `/{locale}` (root with locale), `/{locale}/t/{trunkSlug}` (branch), `/{locale}/t/{trunkSlug}/archetypes/{side}/{slug}` or `/{locale}/card/{type}/{side}/{slug}` (card). Exact scheme is up to the app.
- **i18n**: Trunk titles and any other UI strings can come from `structure.json` (titleRu/titleEn) or a separate `locales/ru.json` and `locales/en.json` if the app already uses a translation bundle.

## After extraction: DeepSeek.md

Once the content under `content/russia-west/` has been verified (all important thesis, ontologies, ethics, mirror, solutions, and archetype cards are present in both RU and EN), **`docs/DeepSeek.md`** can be deleted. The content store is the single source of truth for the Russia–West narrative and its integration into the Logic Tree UI.
