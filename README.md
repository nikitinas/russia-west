# Russia–West Conflict: Logic Tree Website

A first-principles visualization of the origins and solutions of the Russia–West conflict. Built with **Next.js 14** (App Router), content from the file-based store in `content/russia-west/`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/ru`). Use the **EN/RU** switcher in the header to change language.

## Structure

- **`/`** → redirects to `/ru`
- **`/[locale]`** (ru | en) — root: thesis + 6 trunk links
- **`/[locale]/t/[slug]`** — branch: ontologies, ethics, mirror, solutions, or list of archetypes (good/evil by Russia/West)
- **`/[locale]/card/[type]/[side]/[slug]`** — archetype card with mirror and related links

Content is read at build time from `content/russia-west/structure.json` and `content/russia-west/{ru|en}/*.md`. No database.

## Build

```bash
npm run build
npm start
```

## Design

See `docs/design/` for conceptual design (Logic Tree, Tree Compass, mobile-first). Content store and UI integration: `content/README.md` and `docs/design/05-Content-Store-and-UI-Integration.md`.
