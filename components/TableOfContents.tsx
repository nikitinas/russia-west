"use client";

type SectionItem = { id: string; label: string };

export function TableOfContents({
  items,
  currentId,
}: {
  items: SectionItem[];
  currentId: string | null;
}) {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="space-y-0.5" aria-label="Table of contents">
      {items.map((item) => {
        const isActive = currentId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={scrollTo(item.id)}
            className={`block rounded px-3 py-2 text-sm transition-colors ${
              isActive
                ? "bg-stone-200 font-medium text-stone-900"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
