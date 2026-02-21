import type { Locale } from "./content";

const SECTION_HEADINGS: Record<Locale, { russia: string; west: string; summary: string }> = {
  ru: { russia: "Русское мировосприятие", west: "Западное мировосприятие", summary: "Сводка" },
  en: { russia: "Russian worldview", west: "Western worldview", summary: "Summary" },
};

function findSectionStart(content: string, heading: string): number {
  const re = new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "m");
  const m = content.match(re);
  return m?.index ?? -1;
}

export type EthicsByPerspective = {
  intro: string;
  russiaBlock: string;
  westBlock: string;
  summary: string;
};

/**
 * Splits ethics markdown into intro, Russian block, Western block, and summary
 * so the UI can show one perspective at a time.
 */
export function splitEthicsByPerspective(content: string, locale: Locale): EthicsByPerspective {
  const normalized = content.replace(/\r\n/g, "\n");
  const headings = SECTION_HEADINGS[locale];
  const iRussia = findSectionStart(normalized, headings.russia);
  const iWest = findSectionStart(normalized, headings.west);
  const iSummary = findSectionStart(normalized, headings.summary);

  if (iRussia === -1 || iWest === -1) {
    return { intro: normalized, russiaBlock: "", westBlock: "", summary: "" };
  }

  const intro = normalized.slice(0, iRussia).trim();
  const russiaBlock = normalized.slice(iRussia, iWest).trim();
  const westBlock = (iSummary === -1 ? normalized.slice(iWest) : normalized.slice(iWest, iSummary)).trim();
  const summary = iSummary >= 0 ? normalized.slice(iSummary).trim() : "";

  return { intro, russiaBlock, westBlock, summary };
}
