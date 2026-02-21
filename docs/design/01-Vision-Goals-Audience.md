# Vision, Goals, and Audience

## Vision

A website that makes a complex first-principles argument (origins of the Russia–West conflict) **navigable and understandable** by turning it into an interactive “Logic Tree”: one central thesis, a small number of main links in the chain, and the ability to open any link into finer detail without losing where you are in the overall argument.

The site is both:

- **A concrete deliverable**: One fully worked example (Russia–West) that shows the full chain from ontology → ethics → archetypes of good and evil → mirror fears → solutions.
- **A reusable pattern**: A structure and navigation model that can later be applied to other topics (other conflicts, other “first-principles” analyses), so the site becomes a **tool for thinking**, not just a single essay.

## Goals

1. **Explain the argument clearly**  
   Any visitor can see the main thesis and the 4–6 main “links” of the chain, then drill into any link and see how it breaks down (e.g. into Russian vs Western archetypes, or into individual archetype cards).

2. **Preserve context**  
   At every step the user knows: (a) which high-level “link” they are in, and (b) how they got there (path from root to current node). On mobile, this is achieved by the “Tree Compass” (breadcrumbs, optional path log, optional mini-map).

3. **Show mirror structure**  
   The “mirror” idea (each side sees the other as the embodiment of its own archetypal evil) is a core finding. The site should make it easy to jump from one side’s archetype to the other side’s “mirror” archetype and to see the “shield vs sword” dynamic.

4. **Demonstrate the method**  
   The way the content is structured (thesis → causes → ethics → archetypes → projections → solutions) should be obvious and reusable, so that “Logic Tree” + “Tree Compass” can later be applied to other analyses.

5. **Work best on mobile**  
   Primary design target is the phone: one main idea per screen, step-by-step deepening, no reliance on a single big diagram. Desktop can show more of the tree at once but should not assume a huge viewport.

## Audience

- **Primary**: Curious readers (any background) who want to understand *why* the conflict is often described in terms of “incompatible worldviews” and “mirror fears,” and who are willing to follow a structured argument.
- **Secondary**: People interested in method—how to break down a big question (e.g. conflict origins) from first principles and present it in a navigable form. For them, the site is both content and a pattern to copy.
- **Not target**: Experts who need formal citations or academic apparatus; the site is conceptual and narrative, not a substitute for scholarly work.

## Success Criteria (Conceptual)

- A first-time visitor can, in a few minutes, state the main thesis and name the main links of the chain.
- A visitor can answer “Why does the West see Russia as X?” and “Why does Russia see the West as Y?” by following the site’s structure (archetypes → mirror projection).
- A visitor on a phone can go from “Root” to “Archetype card” to “Mirror archetype” and back without losing orientation.
- The same navigation and level structure could be described for another topic (e.g. “Crisis in education”) without changing the design language—only the content.

## Non-Goals (for This Design Phase)

- No implementation details (no routes, components, or APIs).
- No content authoring or CMS design; we assume content is prepared (e.g. from the DeepSeek discussion) and structured according to the Logic Tree.
- No community features, comments, or user-generated Logic Trees in the first version—those belong to the “future platform” (see 04-Features-and-Future).
