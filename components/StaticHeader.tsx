"use client";

import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { usePerspective } from "./PerspectiveContext";
import type { Locale } from "@/lib/content";

export function StaticHeader({
  locale,
  homeLabel,
  projectTitle,
}: {
  locale: Locale;
  homeLabel: string;
  projectTitle?: string;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const { perspective, setPerspective } = usePerspective();
  const russiaLabel = locale === "ru" ? "Россия" : "Russia";
  const westLabel = locale === "ru" ? "Запад" : "West";
  const title = projectTitle ?? homeLabel;

  useLayoutEffect(() => {
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!vv || !headerRef.current) return;
    const updateTop = () => {
      if (headerRef.current) headerRef.current.style.top = `${vv.offsetTop}px`;
    };
    updateTop();
    vv.addEventListener("resize", updateTop);
    vv.addEventListener("scroll", updateTop);
    return () => {
      vv.removeEventListener("resize", updateTop);
      vv.removeEventListener("scroll", updateTop);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur w-full min-w-0 overflow-hidden transition-[top] duration-0"
      style={{ top: 0 }}
    >
      <div className="w-full box-border mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-2 flex items-center justify-between gap-2 min-w-0 overflow-hidden max-w-full">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-stone-600 hover:text-stone-900 shrink-0 truncate max-w-[50vw]"
          title={homeLabel}
        >
          {title}
        </Link>
        <div className="flex items-center gap-2 shrink-0">
          <div className="inline-flex rounded-lg border border-stone-300 bg-white p-0.5">
            <button
              type="button"
              onClick={() => setPerspective("russia")}
              className={`rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${
                perspective === "russia"
                  ? "bg-stone-200 text-stone-900"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {russiaLabel}
            </button>
            <button
              type="button"
              onClick={() => setPerspective("west")}
              className={`rounded-md px-2.5 py-1 text-sm font-medium transition-colors ${
                perspective === "west"
                  ? "bg-stone-200 text-stone-900"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {westLabel}
            </button>
          </div>
          <LocaleSwitcher locale={locale} />
        </div>
      </div>
    </header>
  );
}
