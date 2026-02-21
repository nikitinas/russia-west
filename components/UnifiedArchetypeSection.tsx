"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";
import { usePerspective } from "./PerspectiveContext";
import { getArchetypeDisplayName } from "@/lib/archetype-labels";
import type { Locale } from "@/lib/archetype-labels";

type Card = { slug: string; title: string; body: string; mirrorSlug?: string };

type Selected = { type: "good"; slug: string } | { type: "evil"; slug: string } | null;

/** Remove content in round brackets from the end of the title, e.g. "Голем (...)" → "Голем" */
function simplifyTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

export function UnifiedArchetypeSection({
  sectionTitle,
  locale,
  sideLabel,
  goodLabel,
  evilLabel,
  goodRussia,
  goodWest,
  evilRussia,
  evilWest,
  useGlobalPerspective = false,
  hideSectionTitle = false,
  openMirrorSlug = null,
  onMirrorClick,
  onClearMirror,
  embedded = false,
}: {
  sectionTitle: string;
  locale?: Locale;
  sideLabel: { russia: string; west: string };
  goodLabel: string;
  evilLabel: string;
  goodRussia: Card[];
  goodWest: Card[];
  evilRussia: Card[];
  evilWest: Card[];
  useGlobalPerspective?: boolean;
  hideSectionTitle?: boolean;
  openMirrorSlug?: string | null;
  onMirrorClick?: (mirrorSlug: string, mirrorSide: "russia" | "west") => void;
  onClearMirror?: () => void;
  embedded?: boolean;
}) {
  const { perspective: globalPerspective } = usePerspective();
  const [localSide, setLocalSide] = useState<"russia" | "west">("russia");
  const side = useGlobalPerspective ? globalPerspective : localSide;
  const [selected, setSelected] = useState<Selected>(null);
  const loc: Locale = locale ?? "ru";

  const goodCards = side === "russia" ? goodRussia : goodWest;
  const evilCards = side === "russia" ? evilRussia : evilWest;

  // When switching Russia/West, clear or keep selection if same slug exists on new side
  useEffect(() => {
    if (!selected) return;
    if (selected.type === "good") {
      const exists = goodCards.some((c) => c.slug === selected.slug);
      if (!exists) setSelected(null);
    } else {
      const exists = evilCards.some((c) => c.slug === selected.slug);
      if (!exists) setSelected(null);
    }
  }, [side, selected, goodCards, evilCards]);

  // When parent sets openMirrorSlug (e.g. after mirror link click), select that card
  useEffect(() => {
    if (!openMirrorSlug) return;
    const inGood = goodCards.some((c) => c.slug === openMirrorSlug);
    const inEvil = evilCards.some((c) => c.slug === openMirrorSlug);
    if (inGood) setSelected({ type: "good", slug: openMirrorSlug });
    else if (inEvil) setSelected({ type: "evil", slug: openMirrorSlug });
    onClearMirror?.();
  }, [openMirrorSlug]); // goodCards/evilCards from closure; onClearMirror intentionally omitted to avoid extra runs

  const selectedCard: Card | null =
    selected?.type === "good"
      ? goodCards.find((c) => c.slug === selected.slug) ?? null
      : selected?.type === "evil"
        ? evilCards.find((c) => c.slug === selected.slug) ?? null
        : null;

  return (
    <section
      id="archetypes"
      className={`scroll-mt-24 ${embedded ? "" : "mt-4 rounded-xl border-2 border-stone-200 bg-stone-50/50 p-4 md:p-6"}`}
    >
      {!hideSectionTitle && (
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        {sectionTitle && <h2 className="text-xl font-semibold text-stone-800">{sectionTitle}</h2>}
        {!useGlobalPerspective && (
          <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setLocalSide("russia")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                side === "russia"
                  ? "bg-stone-200 text-stone-900"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {sideLabel.russia}
            </button>
            <button
              type="button"
              onClick={() => setLocalSide("west")}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                side === "west"
                  ? "bg-stone-200 text-stone-900"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {sideLabel.west}
            </button>
          </div>
        )}
      </div>
      )}

      {/* Good archetypes – vertical list */}
      <div className="mb-4">
        <p className="text-sm font-medium text-stone-500 mb-2">{goodLabel}</p>
        <div className="flex flex-col gap-1">
          {goodCards.map((card) => (
            <button
              key={card.slug}
              type="button"
              onClick={() => setSelected(selected?.type === "good" && selected.slug === card.slug ? null : { type: "good", slug: card.slug })}
              className={`w-full text-left rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selected?.type === "good" && selected.slug === card.slug
                  ? "bg-stone-700 text-white"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              {simplifyTitle(card.title)}
            </button>
          ))}
        </div>
      </div>

      {/* Evil archetypes – vertical list */}
      <div className="mb-4">
        <p className="text-sm font-medium text-stone-500 mb-2">{evilLabel}</p>
        <div className="flex flex-col gap-1">
          {evilCards.map((card) => (
            <button
              key={card.slug}
              type="button"
              onClick={() => setSelected(selected?.type === "evil" && selected.slug === card.slug ? null : { type: "evil", slug: card.slug })}
              className={`w-full text-left rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selected?.type === "evil" && selected.slug === card.slug
                  ? "bg-stone-700 text-white"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              {simplifyTitle(card.title)}
            </button>
          ))}
        </div>
      </div>

      {/* Details for the single selected archetype (good or evil) */}
      {selectedCard && (
        <div
          id={`card-${selected?.type}-${side}-${selectedCard.slug}`}
          className="scroll-mt-24"
        >
          <h3 className="text-xl font-semibold text-stone-800 mb-3">{simplifyTitle(selectedCard.title)}</h3>
          <div className="prose-card text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {selectedCard.body}
            </ReactMarkdown>
          </div>
          {selectedCard.mirrorSlug && onMirrorClick && (
            <div className="mt-4 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => onMirrorClick(selectedCard.mirrorSlug!, side === "russia" ? "west" : "russia")}
                className="text-sm font-medium text-stone-600 hover:text-stone-800 underline"
              >
                {loc === "ru" ? "В зеркале " : "In the mirror of "}
                {side === "russia" ? sideLabel.west : sideLabel.russia}
                {": "}
                {getArchetypeDisplayName(selectedCard.mirrorSlug, loc)}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
