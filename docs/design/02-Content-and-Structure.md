# Content and Structure: The Logic Tree

## Metaphor: Tree with a Trunk and Branches

The site is organized as a **Logic Tree**:

- **Trunk**: One main thesis and 4–6 “links” (steps) of the argument. Each link is a single concept that answers “why?” relative to the level above.
- **Branches**: Under each link, finer structure (e.g. two sides: Russia / West; or sub-themes).
- **Leaves**: The smallest units of content—e.g. one card per archetype (name, origin, traits, logic, projection, links to other cards).
- **Footnotes / tooltips**: Optional deeper explanations, sources, or definitions attached to specific phrases or bullets.

The user always moves **from general to particular** (root → trunk link → branch → leaf) but can jump **across** the tree via “mirror” and “related” links (e.g. from one archetype to its mirror or to the ideal it distorts).

---

## Levels of the Tree (Russia–West Instance)

### Level 0: Root / Title Screen

- **Content**: Title of the analysis (e.g. “Roots of the conflict: Russia and the West. A first-principles view.”) and a one- or two-sentence **main thesis**.
- **Role**: Single entry point. No navigation yet—only “Start” or direct tap on the trunk.

**Example thesis (conceptual):**  
“The conflict between Russia and the West is not primarily about interests or politics but about **clashing ontologies**: different answers to how the human relates to nature and society. From that follow different ideas of good and evil, fixed in each culture’s archetypes. Each side sees the other as the embodiment of its own archetypal evil—a mirror of fears that reinforces the conflict.”

---

### Level 1: Trunk (Main Links of the Chain)

Exactly 4–6 clickable “links.” Each is a short label + optional one-line description. For Russia–West, the trunk is:

1. **Different ontologies** (Human and world)  
   Russia: Human → part of Nature → then Society (harmony). West: Human → individual in Society → Nature as resource (success).
2. **Different ethics** (Good and evil)  
   Different definitions of good/evil and of “right” behavior.
3. **Archetypes of good** (Ideals)  
   How each culture crystallizes its ideal (e.g. Holy Rus’ / Bogatyr / Sobor vs Prometheus / Knight / Renaissance Man).
4. **Archetypes of evil** (Fears)  
   How each culture crystallizes its nightmare (e.g. Satan / Koschei / Zmey / Chernomor vs Leviathan / Golem / Dragon / Shere Khan).
5. **Mirror fears and the closed loop**  
   Each side’s “shield” is seen as the other’s “sword”; actions that one intends as defense confirm the other’s worst fears.
6. **Paths to resolution**  
   Options discussed: stepping out of archetypal projection, common existential threat, meta-rules of the game, etc.

**Content type at this level:** Short title, optional subtitle, optional icon or color. No long text—just enough to choose “where to go next.”

---

### Level 2: Branch (Detail of One Link)

One trunk link is expanded. Structure depends on the link:

- **Ontologies / Ethics**: Can be two columns (Russia | West) or two tabs, with short paragraphs per side.
- **Archetypes of good / Archetypes of evil**: Two sides again (Russia | West). Under each side, a **list of named archetypes** (each is a clickable card leading to Level 3).
- **Mirror fears**: Can be a matrix or paired list (Russian fear ↔ Western action that confirms it; Western fear ↔ Russian action that confirms it), plus short explanatory text.
- **Solutions**: A short list of “paths” (e.g. de-archetyping, common cause, meta-game) with one paragraph each; optional links to “further reading” or sources.

**Content type:** Structured text and lists; each list item that leads deeper (e.g. an archetype name) is a node to Level 3.

---

### Level 3: Leaf (Archetype Card or Equivalent)

The smallest self-contained unit. For an **archetype** (good or evil), the card contains:

- **Name** and optional subtitle (e.g. “Satan — the spiritual corruptor”).
- **Origin** (where the image comes from: tradition, text, author).
- **Visual** (optional): a simple icon or silhouette, not literal illustration.
- **Key traits** (short bullets).
- **Which ideal it distorts** (for evil archetypes) or **what it stands for** (for good ones).
- **Logic of behavior** (how it “acts” in stories or in the narrative).
- **Core sin or virtue** (one line).
- **Projection on the other side** (e.g. “The West sees Russia as Leviathan when…”).
- **Links**:  
  - **Mirror**: the archetype on the other side that corresponds (e.g. Satan ↔ Leviathan in the mirror narrative).  
  - **Related**: e.g. the good archetype it distorts (Satan distorts Holy Rus’), or other evil archetypes in the same culture.

**Content type:** One card per archetype; some fields optional. Cards are the main “content objects” that get linked by mirror and related relations.

---

### Level 4: Footnotes and Deeper Explanation

- **Attached to**: Any phrase, bullet, or section on Levels 1–3.
- **Content**: Short clarification, historical note, or source. Shown on tap/hover (e.g. tooltip or inline expand).
- **Role**: Keep the main path concise; detail on demand.

---

## Content Inventory (Russia–West): Summary

To implement the first version, content is needed for:

- **Trunk**: 6 link labels + short descriptions.
- **Ontologies**: One short block per side (Russia, West).
- **Ethics**: One short block per side (what counts as good/evil).
- **Archetypes of good**:  
  - Russia: Holy Rus’ / Plowman, Bogatyr (e.g. Ilya Muromets), Sobor.  
  - West: Prometheus, Knight of the Round Table, Renaissance Man.  
  Each as a Level 3 card.
- **Archetypes of evil**:  
  - Russia: Satan, Koschei, Zmey Gorynych, Chernomor.  
  - West: Leviathan, Golem, Dragon, Shere Khan.  
  Each as a Level 3 card.
- **Mirror**: Pairs (Russian archetype ↔ Western archetype) and short “shield vs sword” explanations; optional matrix view.
- **Solutions**: 3–5 short “paths” with one paragraph each.
- **Footnotes**: As needed on any of the above.

All of this can be extracted and lightly edited from the DeepSeek discussion; the design does not dictate wording, only the structure (levels, links, mirror and related relations).

---

## Reusability for Other Topics

The same level scheme applies to any other “Logic Tree”:

- **Level 0**: New title and thesis.
- **Level 1**: 4–6 main links (causes, consequences, actors, solutions, etc.).
- **Level 2**: Branch content (lists, comparisons, matrices as appropriate).
- **Level 3**: “Cards” or “leaf” nodes (e.g. actors, factors, events).
- **Level 4**: Footnotes.

For a future “constructor,” the system would treat these as generic **node types** and **relation types** (e.g. “mirror,” “distorts,” “part-of”), with the Russia–West site being one instance.
