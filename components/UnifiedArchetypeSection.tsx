"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";

type Card = { slug: string; title: string; body: string };

type Selected = { type: "good"; slug: string } | { type: "evil"; slug: string } | null;

/** Remove content in round brackets from the end of the title, e.g. "Голем (...)" → "Голем" */
function simplifyTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

export function UnifiedArchetypeSection({
  sectionTitle,
  sideLabel,
  goodLabel,
  evilLabel,
  goodRussia,
  goodWest,
  evilRussia,
  evilWest,
}: {
  sectionTitle: string;
  sideLabel: { russia: string; west: string };
  goodLabel: string;
  evilLabel: string;
  goodRussia: Card[];
  goodWest: Card[];
  evilRussia: Card[];
  evilWest: Card[];
}) {
  const [side, setSide] = useState<"russia" | "west">("russia");
  const [selected, setSelected] = useState<Selected>(null);

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

  const selectedCard: Card | null =
    selected?.type === "good"
      ? goodCards.find((c) => c.slug === selected.slug) ?? null
      : selected?.type === "evil"
        ? evilCards.find((c) => c.slug === selected.slug) ?? null
        : null;

  return (
    <section
      id="archetypes"
      className="scroll-mt-24 mt-10 rounded-xl border-2 border-stone-200 bg-stone-50/50 p-4 md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold text-stone-800">{sectionTitle}</h2>
        <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setSide("russia")}
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
            onClick={() => setSide("west")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              side === "west"
                ? "bg-stone-200 text-stone-900"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            {sideLabel.west}
          </button>
        </div>
      </div>

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
        </div>
      )}
    </section>
  );
}
