# Features and Future: Modes, Platform, Next Steps

## Core Features (First Version)

These are the features the first implementation should support conceptually; they are already reflected in the content and navigation docs.

### 1. Hierarchical drill-down (Root → Trunk → Branch → Leaf)

- User can always move “down” from root to a trunk link, then to a branch (e.g. “Russia” or “West”), then to a single card (archetype).
- At every step, **breadcrumbs** and **back** let the user go up or jump to a higher level.
- No “dead ends”: from any leaf the user can return to branch, trunk, or root.

### 2. Thread mode (path highlighting)

- **Idea**: From any node (e.g. an archetype card), the user can see “the path that leads here” in the logic chain.
- **Example**: On “Chernomor,” show: Different ontologies → Different ethics → Archetypes of evil (Russia) → Chernomor.
- **Implementation concept**: Either (a) a small “Path” block on the card (“You are here: …”), or (b) a control that temporarily highlights this path in a simplified trunk diagram or in the breadcrumb. Purpose: reinforce that the detail fits into the big argument.
- **Priority**: High for “understanding the method”; can be a simple text line or a small expandable section on the card.

### 3. Mirror mode (cross-tree jump)

- **Idea**: From one side’s archetype, one tap to the other side’s “mirror” archetype (e.g. Satan ↔ Leviathan), with clear indication that we are now on the other side of the mirror.
- **Implementation concept**: A dedicated “Mirror: [name]” button or panel on each (evil) archetype card; tap opens the mirror card. Breadcrumb updates to the new branch (e.g. now under “West”). Optionally, a short line of text on the mirror card: “Mirror of [previous card].”
- **Priority**: Core to the Russia–West narrative; must be obvious and easy.

### 4. Related links (same or other level)

- **Idea**: From a card, links to “related” nodes: e.g. the good archetype it distorts (Satan ↔ Holy Rus’), or other archetypes in the same group (Satan ↔ Koschei).
- **Implementation concept**: In-card links; tap navigates to that card (or that section). Breadcrumb reflects the new location.
- **Priority**: High; makes the content a network, not just a tree.

### 5. Footnotes / tooltips (Level 4)

- **Idea**: Optional deeper explanation or source for a term or claim, without cluttering the main text.
- **Implementation concept**: Marked words or phrases; on tap (or hover on desktop) show a small overlay or inline expansion. Dismiss by tapping outside or a close control.
- **Priority**: Medium; improves depth without complicating the main flow.

### 6. Mobile-first layout and touch targets

- Single-column layout, large tap targets, readable type, sticky breadcrumb/header so context is always visible.
- No dependency on hover; all actions available via tap.
- Optional enhancements: path log, mini-map, color by trunk link (see 03-Navigation-and-UX).

---

## Future: From Single Site to Platform

The discussion in DeepSeek envisioned the site as a **pattern** for other topics. Below is a conceptual sketch of how the product could grow **without changing the core navigation model**.

### 1. Multiple “Logic Trees” (themes)

- **Idea**: Same structure (root → trunk → branch → leaf) for different topics, e.g. “Roots of Russia–West conflict,” “Crisis in education,” “Origins of inequality.”
- **Implications**:  
  - Each tree has its own root (title + thesis) and its own trunk (4–6 links).  
  - Branch and leaf structure can vary by topic (e.g. some trees have “two sides,” others “timeline” or “actors”).  
  - The **navigation metaphor** (Tree Compass, breadcrumbs, depth) stays the same.  
- **Entry**: From a “home” or “library” screen the user picks a tree, then lands on that tree’s root (Level 0).

### 2. Constructor (create your own tree)

- **Idea**: User defines a thesis and 4–6 trunk links, then adds branches and leaves (e.g. “Cause 1,” “Cause 2,” “Consequences,” “Solutions”). Templates could mirror the Russia–West structure (first principle → ethics → archetypes → mirror → solutions).
- **Implications**:  
  - Content model becomes generic: “node” (with type: root / trunk / branch / leaf) and “relation” (e.g. part-of, mirror-of, distorts).  
  - Editor UI is out of scope for current design docs; only the **output** is assumed to follow the same navigation and level rules.  
- **Priority**: Later phase; the Russia–West site can be hand-authored first.

### 3. Archetype (and concept) library

- **Idea**: Reusable “concept cards” (e.g. Satan, Leviathan, Prometheus) that can be referenced from multiple trees. A new tree could “reuse” Satan in a different narrative (e.g. “Satan as archetype in media discourse”).
- **Implications**:  
  - Cards become first-class entities with stable IDs; trees reference them.  
  - “Mirror” and “related” are then relations between library items, not only within one tree.  
- **Priority**: After multiple trees exist; the first version can keep archetypes local to the Russia–West tree.

### 4. Argument visualization and branching

- **Idea**: Users add “pro” and “con” branches or alternative readings; the system shows how they attach to the main chain (support vs contradiction).
- **Implications**:  
  - Content model allows alternate branches and maybe simple “argument type” (supports / contradicts).  
  - UI shows visually where an argument sits relative to the trunk.  
- **Priority**: Post–MVP; not required for the first Russia–West release.

---

## Suggested Implementation Order (Conceptual)

1. **Phase 1 — Single tree, read-only**  
   - Russia–West content only.  
   - Full hierarchy (root → trunk → branch → leaf) and breadcrumbs + back.  
   - Mirror and related links between cards.  
   - Mobile-first layout; optional thread-style “path” on cards.  
   - No login, no editing, no second tree.

2. **Phase 2 — Polish and clarity**  
   - Thread mode (path from root to current node).  
   - Footnotes/tooltips.  
   - Optional path log or mini-map.  
   - Desktop layout (e.g. sidebar trunk, optional second column for mirror).

3. **Phase 3 — Second tree**  
   - Same navigation and level structure for another topic (content and URLs differ).  
   - Shared “library” or “home” to choose the tree.  
   - Proves the pattern is reusable.

4. **Phase 4 — Platform**  
   - Constructor (create new trees).  
   - Archetype/concept library.  
   - Optional argument branching and user contributions.

---

## Non-Features (Out of Scope for This Design)

- **Comments, likes, sharing**: Not specified; can be added later without changing the Logic Tree structure.
- **Search**: Not specified; navigation is primarily by structure. Search could be added over titles and card text.
- **Multilingual**: Content could be translated; navigation and structure stay the same. No design choice here.
- **Auth and permissions**: Only relevant for constructor and user content; not needed for the read-only Russia–West site.

This document closes the set of conceptual design docs. Together with 00–03, it gives a full picture of **what** the product is and **how** the user moves through it, ready for a technical (Next.js) design and implementation.
