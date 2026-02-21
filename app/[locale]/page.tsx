import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getStructure,
  getRoot,
  getBranchMarkdown,
  getTrunkTitle,
  getAllArchetypeCards,
  type Locale,
} from "@/lib/content";
import { markdownComponents } from "@/lib/markdown-components";
import { ReadingLayout } from "@/components/ReadingLayout";
import { UnifiedArchetypeSection } from "@/components/UnifiedArchetypeSection";

const SECTION_ORDER = [
  "thesis",
  "ontologies",
  "ethics",
  "archetypes",
  "mirror",
  "solutions",
] as const;

/** Sections that get a number in the heading (starting from 1 at ontologies) */
const NUMBERED_SECTION_IDS = SECTION_ORDER.filter((id) => id !== "thesis");

function getSectionNumber(sectionId: string): number | null {
  const i = NUMBERED_SECTION_IDS.indexOf(sectionId);
  return i >= 0 ? i + 1 : null;
}

function numberedSectionTitle(title: string, sectionId: string): string {
  const n = getSectionNumber(sectionId);
  return n !== null ? `${n}. ${title}` : title;
}

export default async function RootPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const structure = getStructure();
  const { title, thesis } = getRoot(locale);
  const ontologies = getBranchMarkdown(locale, "ontologies");
  const ethics = getBranchMarkdown(locale, "ethics");
  const mirror = getBranchMarkdown(locale, "mirror");
  const solutions = getBranchMarkdown(locale, "solutions");
  const allCards = getAllArchetypeCards(locale);

  const thesisLabel = locale === "ru" ? "Главная мысль" : "Main idea";
  const archetypesLabel = locale === "ru" ? "Архетипы" : "Archetypes";
  const trunkBySlug = Object.fromEntries(structure.trunk.map((t) => [t.slug, t]));
  const sectionItems = SECTION_ORDER.map((id) =>
    id === "thesis"
      ? { id: "thesis" as const, label: thesisLabel }
      : id === "archetypes"
        ? { id: "archetypes" as const, label: numberedSectionTitle(archetypesLabel, id) }
        : { id, label: numberedSectionTitle(getTrunkTitle(trunkBySlug[id]!, locale), id) }
  );

  const sideLabel = locale === "ru" ? { russia: "Россия", west: "Запад" } : { russia: "Russia", west: "West" };

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">{title}</h1>
      <ReadingLayout sectionItems={sectionItems} locale={locale}>
        <section id="thesis" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-stone-800 mb-3">{thesisLabel}</h2>
          <div className="prose-card text-stone-600 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{thesis}</ReactMarkdown>
          </div>
        </section>

        {ontologies && (
          <section id="ontologies" className="scroll-mt-24 mt-10">
            <h2 className="text-xl font-semibold text-stone-800 mb-3">
              {numberedSectionTitle(getTrunkTitle(structure.trunk.find((t) => t.slug === "ontologies")!, locale), "ontologies")}
            </h2>
            <div className="prose-card">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{matter(ontologies).content}</ReactMarkdown>
            </div>
          </section>
        )}

        {ethics && (
          <section id="ethics" className="scroll-mt-24 mt-10">
            <h2 className="text-xl font-semibold text-stone-800 mb-3">
              {numberedSectionTitle(getTrunkTitle(structure.trunk.find((t) => t.slug === "ethics")!, locale), "ethics")}
            </h2>
            <div className="prose-card">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{matter(ethics).content}</ReactMarkdown>
            </div>
          </section>
        )}

        <UnifiedArchetypeSection
          sectionTitle={numberedSectionTitle(archetypesLabel, "archetypes")}
          sideLabel={sideLabel}
          goodLabel={getTrunkTitle(structure.trunk.find((t) => t.slug === "archetypes-good")!, locale)}
          evilLabel={getTrunkTitle(structure.trunk.find((t) => t.slug === "archetypes-evil")!, locale)}
          goodRussia={allCards.good.russia}
          goodWest={allCards.good.west}
          evilRussia={allCards.evil.russia}
          evilWest={allCards.evil.west}
        />

        {mirror && (
          <section id="mirror" className="scroll-mt-24 mt-10">
            <h2 className="text-xl font-semibold text-stone-800 mb-3">
              {numberedSectionTitle(getTrunkTitle(structure.trunk.find((t) => t.slug === "mirror")!, locale), "mirror")}
            </h2>
            <div className="prose-card">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{matter(mirror).content}</ReactMarkdown>
            </div>
          </section>
        )}

        {solutions && (
          <section id="solutions" className="scroll-mt-24 mt-10">
            <h2 className="text-xl font-semibold text-stone-800 mb-3">
              {numberedSectionTitle(getTrunkTitle(structure.trunk.find((t) => t.slug === "solutions")!, locale), "solutions")}
            </h2>
            <div className="prose-card">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{matter(solutions).content}</ReactMarkdown>
            </div>
          </section>
        )}
      </ReadingLayout>
    </div>
  );
}
