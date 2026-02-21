import { LOCALES, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import { StaticHeader } from "@/components/StaticHeader";
import { HeaderSlotProvider } from "@/components/HeaderSlotContext";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!LOCALES.includes(locale)) notFound();
  const homeLabel = locale === "ru" ? "Главная" : "Home";

  return (
    <HeaderSlotProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <StaticHeader locale={locale} homeLabel={homeLabel} />
        <main className="flex-1 pt-24 px-4 md:px-6 lg:px-8 xl:px-10 pb-8 w-full max-w-2xl lg:max-w-6xl xl:max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </HeaderSlotProvider>
  );
}
