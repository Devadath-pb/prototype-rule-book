import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import Drawer from "../Drawer";
import { pages, pageToPlainText } from "../../data/book";

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
  onJump: (leafIndex: number, query: string) => void;
}

export default function SearchDrawer({ open, onClose, onJump }: SearchDrawerProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return pages
      .map((page, i) => ({ page, leafIndex: i + 1 }))
      .filter(({ page }) => pageToPlainText(page).toLowerCase().includes(q))
      .map(({ page, leafIndex }) => {
        const text = pageToPlainText(page);
        const idx = text.toLowerCase().indexOf(q);
        const start = Math.max(0, idx - 24);
        const snippet =
          (start > 0 ? "…" : "") + text.slice(start, idx + q.length + 40) + "…";
        return { leafIndex, kicker: page.kicker, snippet };
      });
  }, [query]);

  return (
    <Drawer open={open} title="Search" onClose={onClose}>
      <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2.5">
        <SearchIcon size={15} className="text-fog/60" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the book..."
          className="w-full bg-transparent font-body text-sm text-white placeholder:text-fog/40 focus:outline-none"
        />
      </div>

      {query.trim() && results.length === 0 && (
        <p className="py-6 text-center font-body text-xs text-fog/50">
          No matches found.
        </p>
      )}

      <ul className="space-y-1">
        {results.map((r) => (
          <li key={r.leafIndex}>
            <button
              type="button"
              onClick={() => {
                onJump(r.leafIndex, query.trim());
                onClose();
              }}
              className="block w-full rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-white/5"
            >
              <span className="font-display text-[9px] uppercase tracking-[0.25em] text-gold/70">
                {r.kicker}
              </span>
              <p className="mt-0.5 font-body text-xs leading-relaxed text-fog">
                {r.snippet}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}
