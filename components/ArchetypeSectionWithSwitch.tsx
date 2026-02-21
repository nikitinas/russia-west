"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";

type Card = { slug: string; title: string; body: string };

export function ArchetypeSectionWithSwitch({
  sectionId,
  sectionTitle,
  sideLabel,
  cardsRussia,
  cardsWest,
}: {
  sectionId: "archetypes-good" | "archetypes-evil";
  sectionTitle: string;
  sideLabel: { russia: string; west: string };
  cardsRussia: Card[];
  cardsWest: Card[];
}) {
  const [side, setSide] = useState<"russia" | "west">("russia");
  const cards = side === "russia" ? cardsRussia : cardsWest;
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Keep selected in sync with current side (select first card when side changes)
  useEffect(() => {
    if (cards.length > 0) {
      setSelectedSlug((prev) => (cards.some((c) => c.slug === prev) ? prev : cards[0].slug));
    } else {
      setSelectedSlug(null);
    }
  }, [side, cards]);

  const type = sectionId === "archetypes-good" ? "good" : "evil";
  const sideKey = side;
  const selectedCard = selectedSlug ? cards.find((c) => c.slug === selectedSlug) : cards[0] ?? null;

  return (
    <section
      id={sectionId}
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

      {/* Horizontal carousel of archetype titles */}
      <div className="overflow-x-auto -mx-1 px-1 pb-2 mb-4">
        <div className="flex gap-2 min-w-0">
          {cards.map((card) => (
            <button
              key={card.slug}
              type="button"
              onClick={() => setSelectedSlug(card.slug)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                selectedSlug === card.slug
                  ? "bg-stone-700 text-white"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              {card.title}
            </button>
          ))}
        </div>
      </div>

      {/* Details for selected archetype only */}
      {selectedCard && (
        <div
          id={`card-${type}-${sideKey}-${selectedCard.slug}`}
          className="scroll-mt-24"
        >
          <h3 className="text-xl font-semibold text-stone-800 mb-3">{selectedCard.title}</h3>
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
