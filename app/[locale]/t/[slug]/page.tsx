import Link from "next/link";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "@/lib/markdown-components";
import remarkGfm from "remark-gfm";
import {
  getStructure,
  getBranchMarkdown,
  getTrunkTitle,
  getArchetypeMeta,
  type Locale,
  type BranchSlug,
} from "@/lib/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const BRANCH_SLUGS = [
  "ontologies",
  "ethics",
  "mirror",
  "solutions",
  "archetypes-good",
  "archetypes-evil",
] as const;

function slugToBranchSlug(s: string): BranchSlug | null {
  if (BRANCH_SLUGS.includes(s as BranchSlug)) return s as BranchSlug;
  return null;
}

export async function generateStaticParams() {
  const locales: Locale[] = ["ru", "en"];
  return locales.flatMap((locale) =>
    BRANCH_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export default async function BranchPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as Locale;
  const slug = slugToBranchSlug(params.slug);
  if (!slug) notFound();

  const structure = getStructure();
  const link = structure.trunk.find((t) => t.slug === slug);
  if (!link) notFound();

  const title = getTrunkTitle(link, locale);
  const breadcrumbs = [
    { label: title, href: undefined },
  ];

  const isArchetypes = slug === "archetypes-good" || slug === "archetypes-evil";
  const type = slug === "archetypes-good" ? "good" : slug === "archetypes-evil" ? "evil" : null;

  if (isArchetypes && type) {
    const russiaSlugs = structure.archetypes[type].russia;
    const westSlugs = structure.archetypes[type].west;
    const sideLabel = locale === "ru" ? { russia: "Россия", west: "Запад" } : { russia: "Russia", west: "West" };
    return (
      <div className="py-4">
        <Breadcrumbs locale={locale} items={breadcrumbs} />
        <h1 className="text-2xl font-bold text-stone-900 mt-4 mb-4">{title}</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-stone-600 mb-2">{sideLabel.russia}</h2>
            <ul className="space-y-2">
              {russiaSlugs.map((s) => {
                const meta = getArchetypeMeta(s);
                const displayName = meta ? (locale === "ru" ? slugToDisplayRu(s) : slugToDisplayEn(s)) : s;
                return (
                  <li key={s}>
                    <Link
                      href={`/${locale}/card/${type}/russia/${s}`}
                      className="block rounded-lg border border-stone-200 bg-white px-4 py-3 hover:bg-stone-50"
                    >
                      {displayName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-stone-600 mb-2">{sideLabel.west}</h2>
            <ul className="space-y-2">
              {westSlugs.map((s) => {
                const displayName = locale === "ru" ? slugToDisplayRu(s) : slugToDisplayEn(s);
                return (
                  <li key={s}>
                    <Link
                      href={`/${locale}/card/${type}/west/${s}`}
                      className="block rounded-lg border border-stone-200 bg-white px-4 py-3 hover:bg-stone-50"
                    >
                      {displayName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    );
  }

  const md = getBranchMarkdown(locale, slug);
  if (md === null) notFound();

  const { content } = matter(md);
  return (
    <div className="py-4">
      <Breadcrumbs locale={locale} items={breadcrumbs} />
      <div className="prose-card mt-4 prose prose-stone max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

function slugToDisplayRu(s: string): string {
  const map: Record<string, string> = {
    satan: "Сатана",
    koschei: "Кощей Бессмертный",
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
    knight: "Рыцарь Круглого стола",
    "renaissance-man": "Человек эпохи Возрождения",
  };
  return map[s] ?? s;
}

function slugToDisplayEn(s: string): string {
  const map: Record<string, string> = {
    satan: "Satan",
    koschei: "Koschei the Deathless",
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
    knight: "Knight of the Round Table",
    "renaissance-man": "Renaissance Man",
  };
  return map[s] ?? s;
}
