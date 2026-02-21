/**
 * Client-safe archetype display names. Do not import from content.ts here.
 */
export type Locale = "ru" | "en";

const ARCHETYPE_LABELS_RU: Record<string, string> = {
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

const ARCHETYPE_LABELS_EN: Record<string, string> = {
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

export function getArchetypeDisplayName(slug: string, locale: Locale): string {
  return (locale === "ru" ? ARCHETYPE_LABELS_RU : ARCHETYPE_LABELS_EN)[slug] ?? slug;
}
