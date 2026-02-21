"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname?.replace(/^\/(ru|en)/, "") || "";
  const otherLocale: Locale = locale === "ru" ? "en" : "ru";
  const href = `/${otherLocale}${pathWithoutLocale}`;
  return (
    <Link
      href={href}
      className="text-sm font-medium text-stone-600 hover:text-stone-900 px-2 py-1 rounded border border-stone-200"
      aria-label={locale === "ru" ? "Switch to English" : "Переключить на русский"}
    >
      {locale === "ru" ? "EN" : "RU"}
    </Link>
  );
}
