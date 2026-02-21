# Content Store: Russia–West Conflict (Sources & Solutions)

All important narrative content extracted from the DeepSeek discussion is stored here **without a database**: file system only. The UI (e.g. Next.js) reads these files at build or request time.

## Principles

- **No database**: Content is files (Markdown + JSON). Edits are done by changing files; no CMS required for the first version.
- **Bilingual**: Each piece of content exists in **Russian** (`ru/`) and **English** (`en/`) with the same directory structure. The UI chooses language by locale (e.g. `?locale=ru` or path prefix `/ru/`).
- **Structure separate from text**: The tree (trunk links, branches, slugs, mirror pairs) is in `structure.json`. Narrative text is in Markdown. The UI uses the structure to navigate and the Markdown to render.

---

## Folder Layout

```
content/
  README.md                    ← this file
  russia-west/
    structure.json             ← trunk, branches, archetype slugs, mirror pairs, related links
    ru/
      root.md                  ← title + main thesis (Level 0)
      ontologies.md            ← Level 2: different ontologies (Russia | West)
      ethics.md                ← Level 2: different ethics
      mirror.md                ← Level 2: mirror fears + closed loop
      solutions.md             ← Level 2: paths to resolution
      archetypes/
        good/
          russia/              ← svyataya-rus.md, bogatyr.md, sobor.md
          west/                ← prometheus.md, knight.md, renaissance-man.md
        evil/
          russia/              ← satan.md, koschei.md, zmey-gorynych.md, chernomor.md
          west/                ← leviathan.md, golem.md, dragon.md, shere-khan.md
    en/
      (same structure as ru/)
```

- **Trunk labels** for Level 1 (and short descriptions) can live in `structure.json` under `trunk[].title` and `trunk[].description`, with optional per-locale overrides in small `ru/trunk.json` and `en/trunk.json` if needed. For simplicity, the first version can keep trunk titles in `structure.json` with `titleRu` and `titleEn` (or a single `title` and translate in code).
- **Level 2 narrative** (ontologies, ethics, mirror, solutions): one Markdown file per topic per language, e.g. `ru/ontologies.md`, `en/ontologies.md`.
- **Level 3 (archetype cards)**: one Markdown file per archetype. Path encodes side and type: `ru/archetypes/evil/russia/satan.md`. Frontmatter holds `slug`, `mirrorSlug`, `distortsSlug` (good archetype this evil distorts), and `relatedSlugs[]` for cross-links.

---

## structure.json

Describes the Logic Tree and relations. Example shape:

- **trunk**: Array of trunk links (id, slug, titleRu, titleEn, optional description).
- **branches**: For each trunk slug, list of branch keys (e.g. `russia`, `west`) and for “archetypes” branches the list of **archetype slugs** per side.
- **archetypes**: Full list of archetype slugs with `side` (russia | west), `type` (good | evil), `mirrorSlug`, `distortsSlug` (for evil: which good archetype it distorts), `relatedSlugs`.
- **mirrorPairs**: Array of `[russiaSlug, westSlug]` for evil archetypes (Satan–Leviathan, Koschei–Dragon, etc.).

The UI uses this to:

- Render Level 1 (trunk) and Level 2 (branch) and to know which slugs exist.
- Resolve mirror link: from `satan` load `structure.archetypes[satan].mirrorSlug` → `leviathan`, then open `en/archetypes/evil/west/leviathan.md`.
- Build breadcrumbs and “related” links from `relatedSlugs` and `distortsSlug`.

---

## Archetype Card Markdown

Each card is one `.md` file with YAML frontmatter and sections in the body.

**Frontmatter** (required for UI):

- `slug`: same as filename without .md (e.g. `satan`).
- `side`: `russia` | `west`.
- `type`: `good` | `evil`.
- `mirrorSlug`: (evil only) slug of mirror archetype on the other side.
- `distortsSlug`: (evil only) slug of good archetype this evil distorts (e.g. Satan → Svyataya Rus).
- `relatedSlugs`: optional array of slugs for “See also”.

**Body**: Markdown sections. Suggested headings (can be localized): Origin, Key traits, Ideal distorted / What it stands for, Logic of behavior, Core sin / virtue, Projection on the other side. The UI can render these as-is or map headings to a card layout.

---

## How the UI Integrates

1. **Locale**: User chooses language (e.g. `ru` or `en`). All Markdown and titles are loaded from `ru/` or `en/`.
2. **Level 0**: Read `structure.json` for trunk; read `{locale}/root.md` for title and thesis. Render root screen with “Start” and trunk links.
3. **Level 1 → Level 2**: On trunk click, go to branch. For “ontologies” / “ethics” / “mirror” / “solutions”, load `{locale}/ontologies.md`, etc., and render (optionally with tabs for Russia | West where applicable).
4. **Level 2 → Level 3**: For archetypes branch, list comes from `structure.json` (archetypes per side). Each item links to card route, e.g. `/{locale}/archetypes/evil/russia/satan`.
5. **Level 3 (card)**: Route includes `locale`, `type`, `side`, `slug`. Load `{locale}/archetypes/{type}/{side}/{slug}.md`. Parse frontmatter for mirror and related; render body; show “Mirror: …” button using `mirrorSlug` and link to that card’s route.
6. **Mirror / related**: From frontmatter or `structure.json`, resolve slug to path `archetypes/{type}/{side}/{slug}.md` (side/type come from structure). No back-end; just file paths derived from slug and structure.

**Next.js**: Use `getStaticPaths` / `getStaticProps` or App Router `generateStaticParams` + `params` to list trunk/branch/cards and read the corresponding file. Content can live under `content/` in the repo and be read via `fs` (or `import`) at build time; for dynamic locale, pass `locale` and read the correct file.

---

## Adding or Changing Content

- **New narrative block**: Add or edit `ru/*.md` and `en/*.md` (e.g. `solutions.md`).
- **New archetype**: Add `ru/archetypes/{good|evil}/{russia|west}/{slug}.md` and `en/...`, then add an entry and mirror/related data in `structure.json`.
- **New language**: Duplicate `ru/` to e.g. `de/` and translate; extend UI to support `locale=de` and read from `de/`.

After edits, rebuild (or refresh) the app so the UI picks up the new files. No migration or DB step.

---

## Deleting the source chat (DeepSeek.md)

All important narrative content from `docs/DeepSeek.md` related to **sources and solutions** of the Russia–West conflict has been extracted into this content store (root, ontologies, ethics, mirror, solutions, and all archetype cards in RU and EN). After you have verified that nothing essential is missing, you can safely **delete `docs/DeepSeek.md`**; this folder becomes the single source of truth for the website content.
