import { forwardRef } from "react";
import {
  GraduationCap,
  HeartPulse,
  Leaf,
  Bus,
  ShoppingCart,
  ShieldCheck,
  Building2,
  Bookmark,
} from "lucide-react";
import type { BookPageData } from "../../data/book";

const domainIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  Education: GraduationCap,
  Healthcare: HeartPulse,
  "Environment & Sustainability": Leaf,
  "Transportation & Mobility": Bus,
  "E-Commerce & Local Business": ShoppingCart,
  "Cybersecurity & Digital Safety": ShieldCheck,
  "Smart City & Community Services": Building2,
};

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className="rounded-sm bg-gold/40 px-0.5 text-ink-soft"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface BookPageLeafProps {
  page: BookPageData;
  pageNumber: number;
  totalPages: number;
  searchQuery: string;
  isBookmarked: boolean;
}

const BookPageLeaf = forwardRef<HTMLDivElement, BookPageLeafProps>(
  ({ page, pageNumber, totalPages, searchQuery, isBookmarked }, ref) => {
    return (
      <div ref={ref} className="page-leaf bg-page">
        <div className="absolute inset-0 bg-paper-grain opacity-[0.06]" />

        <div className="relative flex h-full flex-col px-6 pb-10 pt-8 sm:px-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display text-[9px] uppercase tracking-[0.35em] text-ink-soft/50">
              {page.kicker}
            </span>
            {isBookmarked && (
              <Bookmark size={13} className="fill-gold text-gold" />
            )}
          </div>

          <div className="flex-1 space-y-4 overflow-hidden">
            {page.blocks.map((block, i) => {
              if (block.type === "eyebrow") {
                return (
                  <p
                    key={i}
                    className="font-display text-sm uppercase tracking-[0.2em] text-gold-deep"
                  >
                    {highlight(block.text, searchQuery)}
                  </p>
                );
              }
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="font-display text-xl uppercase leading-snug tracking-[0.06em] text-gold-deep sm:text-2xl"
                  >
                    {highlight(block.text, searchQuery)}
                  </h2>
                );
              }
              if (block.type === "paragraph") {
                return (
                  <p
                    key={i}
                    className="font-body text-[13px] leading-relaxed text-ink-soft sm:text-sm"
                  >
                    {highlight(block.text, searchQuery)}
                  </p>
                );
              }
              if (block.type === "divider") {
                return (
                  <div key={i} className="!my-6 h-px w-10 bg-ink-soft/20" />
                );
              }
              if (block.type === "list") {
                const useIcons = page.chapterId === "problem";
                return (
                  <ul key={i} className="space-y-3">
                    {block.items.map((item, j) => {
                      const ItemIcon = useIcons ? domainIcons[item] : null;
                      return (
                        <li
                          key={j}
                          className="flex items-start gap-3 font-body text-[13px] leading-relaxed text-ink-soft sm:text-sm"
                        >
                          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-gold-deep/40 text-gold-deep">
                            {ItemIcon ? (
                              <ItemIcon size={11} />
                            ) : (
                              <span className="h-1 w-1 rounded-full bg-gold-deep" />
                            )}
                          </span>
                          <span>{highlight(item, searchQuery)}</span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              return null;
            })}
          </div>

          <div className="mt-4 flex items-center justify-center">
            <span className="font-body text-[10px] tracking-[0.2em] text-ink-soft/40">
              {pageNumber} / {totalPages}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

BookPageLeaf.displayName = "BookPageLeaf";
export default BookPageLeaf;
