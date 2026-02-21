import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content", "russia-west");
const LOCALES = ["ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type TrunkLink = {
  id: string;
  slug: string;
  order: number;
  titleRu: string;
  titleEn: string;
};

export type Structure = {
  topicId: string;
  trunk: TrunkLink[];
  archetypes: {
    good: { russia: string[]; west: string[] };
    evil: { russia: string[]; west: string[] };
  };
  mirrorPairs: [string, string][];
  archetypeMeta: Record<
    string,
    {
      side: "russia" | "west";
      type: "good" | "evil";
      mirrorSlug?: string;
      distortsSlug?: string;
      relatedSlugs?: string[];
    }
  >;
};

export type ArchetypeCard = {
  slug: string;
  side: "russia" | "west";
  type: "good" | "evil";
  mirrorSlug?: string;
  distortsSlug?: string;
  relatedSlugs?: string[];
  title: string;
  body: string;
};

function loadJson<T>(filePath: string): T {
  const full = path.join(CONTENT_ROOT, filePath);
  const raw = fs.readFileSync(full, "utf-8");
  return JSON.parse(raw) as T;
}

function loadMarkdown(locale: Locale, filePath: string): string {
  const full = path.join(CONTENT_ROOT, locale, filePath);
  return fs.readFileSync(full, "utf-8");
}

export function getStructure(): Structure {
  return loadJson<Structure>("structure.json");
}

export type OntologyItem = { title: string; keywords: string; long: string };
export type OntologyItemsBySide = { russia: OntologyItem[]; west: OntologyItem[] };
const ontologyItemsCache: Record<Locale, OntologyItemsBySide> = {} as Record<Locale, OntologyItemsBySide>;

export function getOntologyItems(locale: Locale): OntologyItemsBySide {
  if (!ontologyItemsCache[locale]) {
    const data = loadJson<Record<Locale, OntologyItemsBySide>>("ontology-items.json");
    ontologyItemsCache[locale] = data[locale];
  }
  return ontologyItemsCache[locale];
}

export type EthicsItem = { title: string; keywords: string; long: string };
export type EthicsItemsBySide = { russia: EthicsItem[]; west: EthicsItem[] };
const ethicsItemsCache: Record<Locale, EthicsItemsBySide> = {} as Record<Locale, EthicsItemsBySide>;

export function getEthicsItems(locale: Locale): EthicsItemsBySide {
  if (!ethicsItemsCache[locale]) {
    const data = loadJson<Record<Locale, EthicsItemsBySide>>("ethics-items.json");
    ethicsItemsCache[locale] = data[locale];
  }
  return ethicsItemsCache[locale];
}

export type ReactionItem = {
  id: string;
  actionShort: string;
  russiaArchetypeSlug: string;
  russiaInterpretation: string;
  russiaReaction: string;
  westArchetypeSlug: string;
  westPerception: string;
  westReaction: string;
};

export function getReactions(locale: Locale): ReactionItem[] {
  const data = loadJson<Record<Locale, ReactionItem[]>>("reactions.json");
  return data[locale] ?? [];
}

export function getRoot(locale: Locale): { title: string; thesis: string } {
  const raw = loadMarkdown(locale, "root.md");
  const { content } = matter(raw);
  const parts = content.split(/^## /m);
  let title = "";
  let thesis = "";
  for (const p of parts) {
    const [head, ...rest] = p.split("\n");
    const body = rest.join("\n").trim();
    if (head?.startsWith("Главный тезис") || head?.startsWith("Main thesis"))
      thesis = body;
    if (head?.includes("#") || (title === "" && head && !head.includes("тезис") && !head.includes("thesis")))
      if (!title && head && head.length < 120) title = head.replace(/^#\s*/, "").trim();
  }
  const firstH1 = content.match(/^# (.+)$/m);
  if (firstH1) title = firstH1[1];
  const thesisBlock = content.match(/## (?:Главный тезис|Main thesis)\s*\n+([\s\S]*?)(?=\n## |$)/m);
  if (thesisBlock) thesis = thesisBlock[1].trim();
  return { title, thesis };
}

const BRANCH_SLUGS = ["ontologies", "ethics", "mirror", "solutions", "archetypes-good", "archetypes-evil"] as const;
export type BranchSlug = (typeof BRANCH_SLUGS)[number];

export function getBranchMarkdown(locale: Locale, slug: BranchSlug): string | null {
  if (slug === "archetypes-good" || slug === "archetypes-evil") return null;
  try {
    return loadMarkdown(locale, `${slug}.md`);
  } catch {
    return null;
  }
}

export function getArchetypeCard(
  locale: Locale,
  type: "good" | "evil",
  side: "russia" | "west",
  slug: string
): ArchetypeCard | null {
  try {
    const raw = loadMarkdown(locale, `archetypes/${type}/${side}/${slug}.md`);
    const { data, content } = matter(raw);
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : slug;
    return {
      slug: (data.slug as string) ?? slug,
      side: (data.side as "russia" | "west") ?? side,
      type: (data.type as "good" | "evil") ?? type,
      mirrorSlug: data.mirrorSlug as string | undefined,
      distortsSlug: data.distortsSlug as string | undefined,
      relatedSlugs: data.relatedSlugs as string[] | undefined,
      title,
      body: content.replace(/^# .+$/m, "").trim(),
    };
  } catch {
    return null;
  }
}

export function getArchetypeMeta(slug: string): Structure["archetypeMeta"][string] | null {
  const s = getStructure();
  return s.archetypeMeta[slug] ?? null;
}

export function getTrunkTitle(link: TrunkLink, locale: Locale): string {
  return locale === "ru" ? link.titleRu : link.titleEn;
}

export type AllArchetypeCards = {
  good: { russia: ArchetypeCard[]; west: ArchetypeCard[] };
  evil: { russia: ArchetypeCard[]; west: ArchetypeCard[] };
};

export function getAllArchetypeCards(locale: Locale): AllArchetypeCards {
  const structure = getStructure();
  const load = (type: "good" | "evil", side: "russia" | "west") =>
    structure.archetypes[type][side]
      .map((slug) => getArchetypeCard(locale, type, side, slug))
      .filter((c): c is ArchetypeCard => c !== null);
  return {
    good: { russia: load("good", "russia"), west: load("good", "west") },
    evil: { russia: load("evil", "russia"), west: load("evil", "west") },
  };
}

export const SECTION_IDS = [
  "thesis",
  "ontologies",
  "ethics",
  "archetypes-good",
  "archetypes-evil",
  "mirror",
  "solutions",
] as const;

export { getArchetypeDisplayName } from "./archetype-labels";
export { LOCALES };
