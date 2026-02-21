import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "@/lib/markdown-components";
import remarkGfm from "remark-gfm";
import {
  getStructure,
  getArchetypeCard,
  getArchetypeMeta,
  getTrunkTitle,
  type Locale,
} from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const TYPES = ["good", "evil"] as const;
const SIDES = ["russia", "west"] as const;

function slugToDisplayRu(s: string): string {
  const map: Record<string, string> = {
    satan: "Сатана",
    koschei: "Кощей",
    "zmey-gorynych": "Змей Горыныч",
    chernomor: "Черномор",
    leviathan: "Левиафан",
    golem: "Голем",
    dragon: "Дракон",
    "shere-khan": "Шер Хан",
    "svyataya-rus": "Святая Русь",
    bogatyr: "Богатырь",
    sobor: "Собор",
    prometheus: "Прометей",
    knight: "Рыцарь",
    "renaissance-man": "Человек Возрождения",
  };
  return map[s] ?? s;
}

function slugToDisplayEn(s: string): string {
  const map: Record<string, string> = {
    satan: "Satan",
    koschei: "Koschei",
    "zmey-gorynych": "Zmey Gorynych",
    chernomor: "Chernomor",
    leviathan: "Leviathan",
    golem: "Golem",
    dragon: "Dragon",
    "shere-khan": "Shere Khan",
    "svyataya-rus": "Holy Rus'",
    bogatyr: "Bogatyr",
    sobor: "Sobor",
    prometheus: "Prometheus",
    knight: "Knight",
    "renaissance-man": "Renaissance Man",
  };
  return map[s] ?? s;
}

export async function generateStaticParams() {
  const structure = getStructure();
  const locales: Locale[] = ["ru", "en"];
  const params: { locale: string; type: string; side: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const type of TYPES) {
      for (const side of SIDES) {
        const slugs = structure.archetypes[type][side as "russia" | "west"];
        for (const slug of slugs) {
          params.push({ locale, type, side, slug });
        }
      }
    }
  }
  return params;
}

export default async function CardPage({
  params,
}: {
  params: { locale: string; type: string; side: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const type = params.type as "good" | "evil";
  const side = params.side as "russia" | "west";
  if (!TYPES.includes(type) || !SIDES.includes(side)) notFound();

  const card = getArchetypeCard(locale, type, side, params.slug);
  if (!card) notFound();

  const structure = getStructure();
  const trunkSlug = type === "evil" ? "archetypes-evil" : "archetypes-good";
  const link = structure.trunk.find((t) => t.slug === trunkSlug);
  const trunkTitle = link ? getTrunkTitle(link, locale) : "";
  const sideLabel = locale === "ru" ? (side === "russia" ? "Россия" : "Запад") : side === "russia" ? "Russia" : "West";

  const breadcrumbs = [
    { label: trunkTitle, href: `/${locale}/t/${trunkSlug}` },
    { label: sideLabel, href: undefined },
    { label: card.title, href: undefined },
  ];

  const mirrorMeta = card.mirrorSlug ? getArchetypeMeta(card.mirrorSlug) : null;
  const mirrorHref = mirrorMeta
    ? `/${locale}/card/${mirrorMeta.type}/${mirrorMeta.side}/${card.mirrorSlug}`
    : null;

  const relatedSlugs = card.relatedSlugs ?? [];
  const distortsSlug = card.distortsSlug;
  const allRelated = distortsSlug ? [distortsSlug, ...relatedSlugs.filter((s) => s !== distortsSlug)] : relatedSlugs;

  return (
    <div className="py-4">
      <Breadcrumbs locale={locale} items={breadcrumbs} />
      <article className="mt-4">
        <h1 className="text-2xl font-bold text-stone-900 mb-4">{card.title}</h1>
        <div className="prose-card prose prose-stone max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{card.body}</ReactMarkdown>
        </div>

        {mirrorHref && (
          <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-stone-600 mb-2">
              {locale === "ru" ? "Зеркальный архетип другой стороны:" : "Mirror archetype (other side):"}
            </p>
            <Link
              href={mirrorHref}
              className="inline-flex items-center font-semibold text-amber-800 hover:text-amber-900"
            >
              {locale === "ru" ? slugToDisplayRu(card.mirrorSlug!) : slugToDisplayEn(card.mirrorSlug!)}
              <span className="ml-1">→</span>
            </Link>
          </div>
        )}

        {allRelated.length > 0 && (
          <div className="mt-6 pt-4 border-t border-stone-200">
            <p className="text-sm font-medium text-stone-500 mb-2">
              {locale === "ru" ? "Связанные архетипы:" : "Related archetypes:"}
            </p>
            <ul className="flex flex-wrap gap-2">
              {allRelated.slice(0, 6).map((s) => {
                const meta = getArchetypeMeta(s);
                const href = meta ? `/${locale}/card/${meta.type}/${meta.side}/${s}` : "#";
                const label = locale === "ru" ? slugToDisplayRu(s) : slugToDisplayEn(s);
                return (
                  <li key={s}>
                    <Link
                      href={href}
                      className="text-sm px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
