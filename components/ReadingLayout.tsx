"use client";

import { useEffect, useState, useCallback } from "react";
import { TableOfContents } from "./TableOfContents";
import { useHeaderSlot } from "./HeaderSlotContext";

type SectionItem = { id: string; label: string };

const FIRST_SECTION_ID = "thesis";

function SectionNavSlot({
  currentLabel,
  prevItem,
  nextItem,
  scrollTo,
}: {
  currentLabel: string;
  prevItem: SectionItem | null;
  nextItem: SectionItem | null;
  scrollTo: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0 overflow-hidden w-full">
      <div className="text-sm font-medium text-stone-600 truncate text-center">
        {currentLabel}
      </div>
      <div className="flex items-center justify-between gap-2 min-w-0 text-sm">
        <span className="min-w-0 flex-1 overflow-hidden">
          {prevItem ? (
            <button
              type="button"
              onClick={() => scrollTo(prevItem.id)}
              className="text-stone-500 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 rounded text-left truncate block w-full"
              title={prevItem.label}
            >
              ← {prevItem.label}
            </button>
          ) : <span />}
        </span>
        <span className="min-w-0 flex-1 flex justify-end overflow-hidden">
          {nextItem ? (
            <button
              type="button"
              onClick={() => scrollTo(nextItem.id)}
              className="text-stone-500 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 rounded text-right truncate block w-full"
              title={nextItem.label}
            >
              {nextItem.label} →
            </button>
          ) : <span />}
        </span>
      </div>
    </div>
  );
}

export function ReadingLayout({
  sectionItems,
  locale,
  children,
}: {
  sectionItems: SectionItem[];
  locale: "ru" | "en";
  children: React.ReactNode;
}) {
  const [currentId, setCurrentId] = useState<string | null>(FIRST_SECTION_ID);
  const [pastFirstSection, setPastFirstSection] = useState(false);
  const setHeaderSlot = useHeaderSlot();
  const tocLabel = locale === "ru" ? "Содержание" : "Contents";

  // Track when user has scrolled to/past the first section title
  useEffect(() => {
    const first = document.getElementById(FIRST_SECTION_ID);
    if (!first) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const top = e.boundingClientRect.top;
        setPastFirstSection(!e.isIntersecting && top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(first);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ids = sectionItems.map((i) => i.id);
    const visibility: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (!ids.includes(id)) continue;
          visibility[id] = e.isIntersecting ? e.intersectionRatio : 0;
        }
        const best = Object.entries(visibility).reduce((a, [id, ratio]) =>
          ratio > (a[1] ?? 0) ? [id, ratio] : a
        );
        if (best[0]) setCurrentId(best[0]);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        visibility[id] = 0;
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [sectionItems]);

  const currentIndex = sectionItems.findIndex((i) => i.id === currentId);
  const currentLabel = currentIndex >= 0 ? sectionItems[currentIndex].label : "";
  const prevItem = currentIndex > 0 ? sectionItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex >= 0 && currentIndex < sectionItems.length - 1
      ? sectionItems[currentIndex + 1]
      : null;

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Replace top bar with section title + prev/next when past first section; clear when at top
  useEffect(() => {
    if (pastFirstSection) {
      setHeaderSlot(
        <SectionNavSlot
          currentLabel={currentLabel}
          prevItem={prevItem}
          nextItem={nextItem}
          scrollTo={scrollTo}
        />
      );
    } else {
      setHeaderSlot(null);
    }
    return () => setHeaderSlot(null);
  }, [pastFirstSection, currentLabel, prevItem, nextItem, scrollTo, setHeaderSlot]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Go to top: bottom-right when scrolled down */}
      {pastFirstSection && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-30 p-2 rounded-full bg-stone-200/95 hover:bg-stone-300 text-stone-700 shadow-md focus:outline-none focus:ring-2 focus:ring-stone-400"
          aria-label={locale === "ru" ? "Наверх" : "Back to top"}
          title={locale === "ru" ? "Наверх" : "Back to top"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
        </button>
      )}
      <aside className="lg:w-56 shrink-0 space-y-4">
        <div className="sticky top-4 space-y-6">
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
              {tocLabel}
            </p>
            <TableOfContents items={sectionItems} currentId={currentId} />
          </div>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
