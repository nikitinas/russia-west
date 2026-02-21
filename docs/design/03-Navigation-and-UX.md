# Navigation and UX: Mobile-First “Tree Compass”

## Design Constraint: Mobile First

The main interface is designed for **phone screens**. Reasons:

- A single small screen encourages **one focus at a time** (one thesis, one link, one branch, one card), which matches the Logic Tree’s stepwise “why?” structure.
- On desktop, a single huge diagram of the whole tree is tempting but hard to read and to keep in working memory. On mobile, the tree is explored **sequentially**, which fits how the argument is built (step by step).
- The main UX challenge on mobile is **not losing context** when going deeper. The “Tree Compass” addresses exactly that: the user always sees where they are and how they got there, and can jump back or sideways (e.g. to the mirror archetype) without getting lost.

---

## Metaphor: “Compass in the Tree”

- **Vertical movement**: “In and out” of the tree—from root to trunk to branch to leaf. This is the main “depth” axis.
- **Horizontal / cross-links**: Moving “across” the tree—e.g. Russia ↔ West, or from one archetype to its mirror. The user stays at the same “depth” (e.g. still at “archetype card”) but changes branch.
- **Compass**: The set of UI elements that keep **position** and **path** visible: breadcrumbs, optional path log, optional mini-map. They answer “Where am I?” and “How did I get here?”

---

## Level-by-Level Navigation Behavior

### Root (Level 0)

- **Shown**: Title, one main thesis (1–2 sentences), and a small set of large targets (the trunk links).
- **Interaction**: Scroll if needed; tap a trunk link to go to Level 1 for that link. No breadcrumbs yet.
- **Exit**: None (this is the entry).

### Trunk (Level 1)

- **Shown**: One trunk link expanded (e.g. “Archetypes of evil”). Content depends on the link: for archetypes, typically a **side switcher** (Russia | West) and then a **list of archetypes** for the selected side.
- **Breadcrumb**: e.g. `Home / Archetypes of evil`. “Home” returns to Level 0. The current link name is visible so the user knows which part of the trunk they are in.
- **Interaction**: Tap an archetype → Level 2 (archetype card). Switch side (Russia ↔ West) → same level, different list. Back (or “Home”) → one level up or to root.

### Branch / List (Level 2 as list)

- For “Archetypes of evil” this is the list of 4 names (e.g. Satan, Koschei, Zmey, Chernomor) under “Russia” or “Archetypes of evil / West” (Leviathan, Golem, Dragon, Shere Khan). So the “branch” is “this side of this link.”
- **Breadcrumb**: e.g. `Home / Archetypes of evil / Russia`. User can tap “Archetypes of evil” to return to the branch (and change side) or “Home” to return to the trunk overview.

### Leaf (Level 3 — Archetype card)

- **Shown**: Full card for one archetype (name, origin, traits, logic, projection, mirror link, related links).
- **Breadcrumb**: e.g. `Home / Archetypes of evil / Russia / Satan`. Each segment tappable to go back to that level.
- **Interaction**:  
  - Scroll to read the card.  
  - Tap “Mirror: Leviathan” (or similar) → go to the **mirror card** (same level, different branch). Breadcrumb can update to show the new path (e.g. now under “West”) or show that the user arrived via “mirror” (design choice: e.g. “via mirror” badge or a different breadcrumb trail).  
  - Tap a “Related” link (e.g. “Holy Rus’”) → go to that card (good archetype).  
  - Back / breadcrumb → return along the path or to branch/trunk.

### Footnotes (Level 4)

- **Shown**: On tap/hover of a marked term or phrase—tooltip or small expandable block.
- **Interaction**: Dismiss by tapping outside or a close control. No change to breadcrumb; user remains on the same page.

---

## Core UX Elements

### 1. Breadcrumbs (mandatory from Level 1 onward)

- **Placement**: Top of content (or in a sticky header), always visible on Level 1–3.
- **Content**: `Home / [Trunk link] / [Branch if applicable] / [Leaf if applicable]`.
- **Behavior**: Each segment is tappable and returns to that level. Current node can be visually distinct (e.g. not a link, or bold).
- **Cross-tree moves**: When user goes to a “mirror” card, breadcrumb can either (a) show the new path from root (e.g. `Home / Archetypes of evil / West / Leviathan`) or (b) show something like “via mirror from Satan” and then the new path. Design should make it clear that they are now in the “West” branch.

### 2. Back button

- **Behavior**: One step back in the **navigation history** (last screen). Complements breadcrumbs: breadcrumbs = “jump to level,” back = “previous screen.”
- **Placement**: Standard (e.g. top-left) so it’s easy to find on mobile.

### 3. “To overview” / “To trunk”

- Optional shortcut from any Level 2–3: one tap returns to Level 0 (root) or to Level 1 (trunk) so the user can choose another link without stepping back through every level.
- Can be a single button in the header or a dedicated item in the breadcrumb (e.g. “Home” or “Overview”).

### 4. Mirror panel / button on cards

- On each archetype card (evil, and possibly good), a **clearly visible** block or button: “Mirror: [Other side’s archetype name]”.
- **Action**: Tap → navigate to that archetype’s card. Optionally open in same tab with updated breadcrumb, or in a “mirror view” (e.g. split or before/after) in a later phase.
- **Placement**: E.g. bottom of card or sticky so it’s visible while scrolling.

### 5. Related links inside the card

- Short inline or list links: “Ideal distorted: Holy Rus’”, “See also: Koschei, Zmey…”.
- **Action**: Tap → go to that card. Breadcrumb updates to the new path.

---

## Optional “Compass” Enhancements

- **Path log (session history)**: A drawer or side panel listing “last visited” cards (e.g. Satan → Leviathan → Koschei). Lets the user return to a recent thought without re-following the tree. Useful for “I was just reading X.”
- **Mini-map (radial or compact tree)**: On long-press or a dedicated button, show a simplified view of the trunk (and maybe current branch) with current node highlighted. Tapping a node in the mini-map jumps there. Helps when the user is “deep” and wants to see the whole tree at once.
- **Color / icon by trunk link**: Each trunk link has a consistent color (or icon). That color appears in breadcrumbs and headers when the user is under that link, so context is visible at a glance (e.g. “red = archetypes of evil”).

---

## Reading and Scrolling

- **Cards**: Single column, clear headings, short paragraphs. “Sticky” section headers while scrolling (e.g. “Key traits,” “Projection on the other side”) help orientation within a long card.
- **Lists**: Large tap targets; each archetype as a row or card with name + optional icon. No hover on mobile; tap only.
- **Trunk on Level 0**: Prefer a vertical list of 4–6 big cards/buttons rather than a diagram. Each card = one link. Optional: a very simple diagram (e.g. numbered circles and arrows) as a secondary view for desktop.

---

## Desktop Behavior (Conceptual)

- Same hierarchy and same breadcrumbs. Possible additions:
  - Show the **full trunk** in a sidebar or top bar (all 6 links), with the current one highlighted, so the user can switch links without going back to root.
  - On branch or card, optional **second column** or panel for “mirror” or “related” so the user can open a second card without leaving the first (e.g. Satan left, Leviathan right).
- No requirement for a single “full tree” diagram; the tree can still be explored step by step, with more space for side-by-side content.

---

## Accessibility and Performance (Conceptual)

- **Focus and order**: Keyboard and screen-reader users should be able to move through: root → trunk → branch → card → mirror/related, in a logical order. Breadcrumbs and back button must be focusable and announced.
- **Loading**: Prefer fast first paint of the current level; load adjacent or child content as needed so that going “deeper” feels instant (e.g. preload trunk and first branch, or preload mirror card when opening an archetype card).
- **Offline**: Optional later—cache root + trunk + last visited branch/cards so the core path works without network.

This document stays conceptual: no component names, no routes, no state machines—only where the user is, what they see, and how they move. Implementation in Next.js (routes, layouts, client vs server, prefetching) can map to this structure in a later technical design.
