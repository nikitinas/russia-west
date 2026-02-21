"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/lib/markdown-components";
import { usePerspective } from "./PerspectiveContext";
import { getArchetypeDisplayName } from "@/lib/archetype-labels";
import type { Locale } from "@/lib/content";
import type { OntologyItem } from "@/lib/content";
import type { EthicsItem } from "@/lib/content";
import type { ReactionItem } from "@/lib/content";

type Card = { slug: string; title: string; body: string; mirrorSlug?: string };

/** Strip markdown and return first sentence or first maxChars for teaser. */
function bodyTeaser(body: string, maxChars = 120): string {
  const stripped = body.replace(/#{1,6}\s*/g, "").replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
  const match = stripped.match(/^[^.!?]+[.!?]?/);
  const sentence = match ? match[0].trim() : stripped.slice(0, maxChars);
  return sentence.length > maxChars ? sentence.slice(0, maxChars).trim() + "…" : sentence;
}

function simplifyTitle(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

function BlockCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24 pt-2 pb-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-stone-800">{title}</h2>
        {subtitle && <p className="text-sm text-stone-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function ExpandableItem({ item }: { item: { title: string; keywords: string; long: string } }) {
  return (
    <details className="group rounded-lg bg-stone-50/80 overflow-hidden [&[open]]:border [&[open]]:border-stone-200">
      <summary className="list-none cursor-pointer px-4 py-3 hover:bg-stone-100/80 text-left">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-stone-800">{item.title}</span>
          <span className="text-stone-400 group-open:rotate-90 transition-transform shrink-0">›</span>
        </div>
        <p className="text-stone-500 text-sm mt-1 group-open:hidden">{item.keywords}</p>
      </summary>
      <div className="px-4 pb-4 pt-0 text-sm text-stone-600 border-t border-stone-200/60">
        <p className="mt-3 leading-relaxed">{item.long}</p>
      </div>
    </details>
  );
}

function ArchetypeExpandableCard({
  card,
  locale,
  isExpanded,
  onToggle,
  onMirrorClick,
  otherSideLabel,
}: {
  card: Card;
  locale: Locale;
  isExpanded: boolean;
  onToggle: () => void;
  onMirrorClick: (mirrorSlug: string) => void;
  otherSideLabel: string;
}) {
  const loc = locale as "ru" | "en";
  const teaser = bodyTeaser(card.body);
  return (
    <details className={`group rounded-lg bg-stone-50/80 overflow-hidden ${isExpanded ? "border border-stone-200" : ""}`} open={isExpanded}>
      <summary
        className="list-none cursor-pointer px-4 py-3 hover:bg-stone-100/80 text-left [&::-webkit-details-marker]:hidden"
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-stone-800">{simplifyTitle(card.title)}</span>
          <span className={`text-stone-400 transition-transform shrink-0 ${isExpanded ? "rotate-90" : ""}`}>›</span>
        </div>
        <p className="text-stone-500 text-sm mt-1 group-open:hidden">{teaser}</p>
      </summary>
      <div className="px-4 pb-4 pt-0 text-sm text-stone-600 border-t border-stone-200/60">
        <div className="mt-3 prose-card">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {card.body}
          </ReactMarkdown>
        </div>
        {card.mirrorSlug && (
          <div className="mt-4 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => onMirrorClick(card.mirrorSlug!)}
              className="text-sm font-medium text-stone-600 hover:text-stone-800 underline"
            >
              {loc === "ru" ? "В зеркале " : "In the mirror of "}
              {otherSideLabel}
              {": "}
              {getArchetypeDisplayName(card.mirrorSlug, loc)}
            </button>
          </div>
        )}
      </div>
    </details>
  );
}

export function SinglePageSections({
  locale,
  ontologyTitle,
  ontologyItems,
  ethicsTitle,
  ethicsItems,
  archetypesTitle,
  goodLabel,
  evilLabel,
  goodRussia,
  goodWest,
  evilRussia,
  evilWest,
  reactionsTitle,
  reactions,
}: {
  locale: Locale;
  ontologyTitle: string;
  ontologyItems: { russia: OntologyItem[]; west: OntologyItem[] };
  ethicsTitle: string;
  ethicsItems: { russia: EthicsItem[]; west: EthicsItem[] };
  archetypesTitle: string;
  goodLabel: string;
  evilLabel: string;
  goodRussia: Card[];
  goodWest: Card[];
  evilRussia: Card[];
  evilWest: Card[];
  reactionsTitle: string;
  reactions: ReactionItem[];
}) {
  const { perspective, setPerspective } = usePerspective();
  const [expandedArchetypeSlug, setExpandedArchetypeSlug] = useState<string | null>(null);
  const [selectedReactionId, setSelectedReactionId] = useState<string | null>(null);

  const ru = locale === "ru";
  const sectionTitles = {
    ontology: perspective === "russia" ? (ru ? "Русская онтология" : "Russian ontology") : (ru ? "Западная онтология" : "Western ontology"),
    ethics: perspective === "russia" ? (ru ? "Русская этика" : "Russian ethics") : (ru ? "Западная этика" : "Western ethics"),
    archetypes: perspective === "russia" ? (ru ? "Русские архетипы" : "Russian archetypes") : (ru ? "Западные архетипы" : "Western archetypes"),
    reactions: perspective === "russia" ? (ru ? "Русские реакции" : "Russian reactions") : (ru ? "Западные реакции" : "Western reactions"),
  };
  const ontologyList = perspective === "russia" ? ontologyItems.russia : ontologyItems.west;
  const ethicsList = perspective === "russia" ? ethicsItems.russia : ethicsItems.west;

  const selectedReaction = selectedReactionId ? reactions.find((r) => r.id === selectedReactionId) : null;

  const goodCards = perspective === "russia" ? goodRussia : goodWest;
  const evilCards = perspective === "russia" ? evilRussia : evilWest;
  const otherSideLabel = perspective === "russia" ? (ru ? "Запад" : "West") : (ru ? "Россия" : "Russia");

  const handleArchetypeMirrorClick = (mirrorSlug: string) => {
    setPerspective(perspective === "russia" ? "west" : "russia");
    setExpandedArchetypeSlug(mirrorSlug);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 pt-14 pb-12 flex flex-col gap-8">
      {/* 1. Ontology */}
      <BlockCard title={`1. ${sectionTitles.ontology}`} subtitle={ru ? "Как устроен мир" : "How the world is structured"}>
        <div className="flex flex-col gap-2">
          {ontologyList.map((item, i) => (
            <ExpandableItem key={i} item={item} />
          ))}
        </div>
      </BlockCard>

      {/* 2. Ethics */}
      <BlockCard title={`2. ${sectionTitles.ethics}`} subtitle={ru ? "Что есть добро и зло?" : "What is good and evil?"}>
        <div className="flex flex-col gap-2">
          {ethicsList.map((item, i) => (
            <ExpandableItem key={i} item={item} />
          ))}
        </div>
      </BlockCard>

      {/* 3. Archetypes */}
      <section id="archetypes" className="scroll-mt-24">
        <BlockCard title={`3. ${sectionTitles.archetypes}`} subtitle={ru ? "Герои и Чудовища" : "Heroes and Monsters"}>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-stone-500 mb-1">{goodLabel}</p>
            {goodCards.map((card) => (
              <ArchetypeExpandableCard
                key={card.slug}
                card={card}
                locale={locale}
                isExpanded={expandedArchetypeSlug === card.slug}
                onToggle={() => setExpandedArchetypeSlug((s) => (s === card.slug ? null : card.slug))}
                onMirrorClick={handleArchetypeMirrorClick}
                otherSideLabel={otherSideLabel}
              />
            ))}
            <p className="text-sm font-medium text-stone-500 mb-1 mt-4">{evilLabel}</p>
            {evilCards.map((card) => (
              <ArchetypeExpandableCard
                key={card.slug}
                card={card}
                locale={locale}
                isExpanded={expandedArchetypeSlug === card.slug}
                onToggle={() => setExpandedArchetypeSlug((s) => (s === card.slug ? null : card.slug))}
                onMirrorClick={handleArchetypeMirrorClick}
                otherSideLabel={otherSideLabel}
              />
            ))}
          </div>
        </BlockCard>
      </section>

      {/* 4. Reactions */}
      <BlockCard title={`4. ${sectionTitles.reactions}`} subtitle={ru ? "Замкнутый круг страха" : "The closed loop of fear"}>
        <div className="flex flex-col gap-3">
          {!selectedReaction ? (
            <>
              <p className="text-xs text-stone-500">{ru ? "Выберите действие:" : "Select an action:"}</p>
              {reactions.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedReactionId(r.id)}
                  className="w-full text-left rounded-lg px-4 py-3 border border-stone-200 bg-white hover:bg-stone-50 text-sm font-medium text-stone-800"
                >
                  {r.actionShort}
                </button>
              ))}
            </>
          ) : (
            <div className="space-y-4">
              {perspective === "russia" && (
                <>
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">{ru ? "Архетипическая интерпретация" : "Archetypal interpretation"}</p>
                    <div className="prose-card text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {selectedReaction.russiaInterpretation}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">{ru ? "Реакция" : "Reaction"}</p>
                    <p className="text-sm text-stone-700">{selectedReaction.russiaReaction}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPerspective("west");
                    }}
                    className="rounded-lg px-4 py-2 bg-stone-200 text-stone-800 text-sm font-medium hover:bg-stone-300"
                  >
                    {ru ? "Как это увидит Запад?" : "How will the West see this?"}
                  </button>
                </>
              )}
              {perspective === "west" && (
                <>
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">{ru ? "Восприятие Западом" : "How the West sees it"}</p>
                    <div className="prose-card text-sm">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {selectedReaction.westPerception}
                      </ReactMarkdown>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-500 mb-1">{ru ? "Ответ Запада" : "West's response"}</p>
                    <p className="text-sm text-stone-700">{selectedReaction.westReaction}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPerspective("russia")}
                    className="rounded-lg px-4 py-2 bg-stone-200 text-stone-800 text-sm font-medium hover:bg-stone-300"
                  >
                    {ru ? "Как это увидит Россия?" : "How will Russia see this?"}
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  setSelectedReactionId(null);
                }}
                className="text-sm text-stone-500 underline hover:text-stone-700"
              >
                {ru ? "Выбрать другое действие" : "Choose another action"}
              </button>
            </div>
          )}
        </div>
      </BlockCard>
    </div>
  );
}
