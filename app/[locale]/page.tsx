import {
  getStructure,
  getTrunkTitle,
  getAllArchetypeCards,
  getOntologyItems,
  getEthicsItems,
  getReactions,
  type Locale,
} from "@/lib/content";
import { SinglePageSections } from "@/components/SinglePageSections";

export default async function RootPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const structure = getStructure();
  const allCards = getAllArchetypeCards(locale);
  const ontologyItems = getOntologyItems(locale);
  const ethicsItems = getEthicsItems(locale);
  const reactions = getReactions(locale);

  const ontologyTitle = getTrunkTitle(structure.trunk.find((t) => t.slug === "ontologies")!, locale);
  const ethicsTitle = getTrunkTitle(structure.trunk.find((t) => t.slug === "ethics")!, locale);
  const archetypesTitle = locale === "ru" ? "Архетипы" : "Archetypes";
  const goodLabel = getTrunkTitle(structure.trunk.find((t) => t.slug === "archetypes-good")!, locale);
  const evilLabel = getTrunkTitle(structure.trunk.find((t) => t.slug === "archetypes-evil")!, locale);
  const reactionsTitle = locale === "ru" ? "Реакции" : "Reactions";

  return (
    <SinglePageSections
      locale={locale}
      ontologyTitle={ontologyTitle}
      ontologyItems={ontologyItems}
      ethicsTitle={ethicsTitle}
      ethicsItems={ethicsItems}
      archetypesTitle={archetypesTitle}
      goodLabel={goodLabel}
      evilLabel={evilLabel}
      goodRussia={allCards.good.russia}
      goodWest={allCards.good.west}
      evilRussia={allCards.evil.russia}
      evilWest={allCards.evil.west}
      reactionsTitle={reactionsTitle}
      reactions={reactions}
    />
  );
}
