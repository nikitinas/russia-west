# Design Documents: Russia–West Conflict Origins Website

## Purpose of This Set

These documents describe the **conceptual design** for a website that visualizes the findings and conceptual explanation of the origins (and possible solutions) of the conflict between Russia and the West, as developed in the FPF-style discussion in `DeepSeek.md`. The design is intended for implementation with **Next.js** and is **conceptual only**—no code or technical specifications here.

## Design Principles (from the discussion)

- **First-principles exposition**: The site should let users follow the logic “top-down” from a single thesis to detailed blocks, and “expand” any block while keeping the big picture.
- **Rational, inductive thinking**: The site is a testbed for a repeatable way of structuring complex arguments (from first principles to consequences to archetypes to mirror views to solutions).
- **Mobile-first**: The primary interface is designed for the phone; hierarchy and context are preserved through the “Tree Compass” metaphor rather than a single large diagram.
- **Reusability of the method**: The same navigation and content patterns should later support other topics (not only Russia–West), turning the site into a platform for “Logic Trees.”

## Document Map

| Document | Contents |
|----------|----------|
| **01-Vision-Goals-Audience** | Why the site exists, who it is for, success criteria. |
| **02-Content-and-Structure** | The Logic Tree levels, content types, and a concise summary of the Russia–West narrative used as the first instance. |
| **03-Navigation-and-UX** | Mobile-first navigation, “Tree Compass,” breadcrumbs, and how context is kept when drilling down. |
| **04-Features-and-Future** | Thread mode, Mirror mode, path log, future “constructor” and archetype library. |
| **05-Content-Store-and-UI-Integration** | File-based content layout in `content/russia-west/`, how the UI reads structure and Markdown, and when DeepSeek.md can be removed. |

## Relationship to Other Materials

- **DeepSeek.md**: Original source of the Russia–West narrative; content has been extracted to `content/russia-west/` (RU + EN). Can be deleted after verification (see content/README.md and 05-Content-Store-and-UI-Integration).
- **FPF-Spec.md**: Informs the thinking methodology (bounded context, multi-view, evidence, hierarchy) but the design docs are written in plain language, without FPF codes or formal notation.
- **Next.js**: Target stack for implementation; these docs stay at the level of “what to build” and “how the user moves through the product,” not implementation details.
