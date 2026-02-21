"use client";

import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { useHeaderSlotContent } from "./HeaderSlotContext";
import type { Locale } from "@/lib/content";

export function StaticHeader({
  locale,
  homeLabel,
}: {
  locale: Locale;
  homeLabel: string;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const slot = useHeaderSlotContent();

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
      <div className="w-full box-border mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-2 flex flex-col gap-2 min-w-0 overflow-hidden max-w-full">
        {slot ? (
          slot
        ) : (
          <div className="flex items-center justify-between gap-2 min-w-0">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 shrink-0"
            >
              {homeLabel}
            </Link>
            <LocaleSwitcher locale={locale} />
          </div>
        )}
      </div>
    </header>
  );
}
