import { LOCALES, type Locale } from "@/lib/content";
import { notFound } from "next/navigation";
import { StaticHeader } from "@/components/StaticHeader";
import { PerspectiveProvider } from "@/components/PerspectiveContext";

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
  const projectTitle = locale === "ru" ? "Выберите оптику:" : "Choose your lens:";

  return (
    <PerspectiveProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <StaticHeader locale={locale} homeLabel={homeLabel} projectTitle={projectTitle} />
        <main className="flex-1 flex flex-col min-h-0">
          {children}
        </main>
      </div>
    </PerspectiveProvider>
  );
}
