"use client";

import Link from "next/link";
import type { Locale } from "@/lib/content";

type Item = { label: string; href?: string };

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: Item[];
}) {
  const homeHref = `/${locale}`;
  return (
    <nav className="flex items-center gap-1 text-sm text-stone-500 min-w-0">
      <Link href={homeHref} className="hover:text-stone-800 truncate">
        {locale === "ru" ? "Главная" : "Home"}
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1 shrink-0">
          <span className="text-stone-300">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-stone-800 truncate max-w-[120px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-800 font-medium truncate max-w-[140px]" title={item.label}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
