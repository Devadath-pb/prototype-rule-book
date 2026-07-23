import { Bookmark, BookmarkX } from "lucide-react";
import Drawer from "../Drawer";
import { pages } from "../../data/book";

interface BookmarkDrawerProps {
  open: boolean;
  onClose: () => void;
  bookmarks: number[];
  onJump: (leafIndex: number) => void;
  onRemove: (leafIndex: number) => void;
}

export default function BookmarkDrawer({
  open,
  onClose,
  bookmarks,
  onJump,
  onRemove,
}: BookmarkDrawerProps) {
  return (
    <Drawer open={open} title="Bookmarks" onClose={onClose}>
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Bookmark size={22} className="text-fog/30" />
          <p className="font-body text-xs text-fog/50">
            Long-press any page to bookmark it.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-white/5">
          {bookmarks.map((leafIndex) => {
            const page = pages[leafIndex - 1];
            if (!page) return null;
            return (
              <li key={leafIndex} className="flex items-center justify-between py-3">
                <button
                  type="button"
                  onClick={() => {
                    onJump(leafIndex);
                    onClose();
                  }}
                  className="flex items-center gap-3 text-left"
                >
                  <Bookmark size={14} className="fill-gold text-gold" />
                  <span className="font-body text-sm text-fog">{page.kicker}</span>
                </button>
                <button
                  type="button"
                  aria-label="Remove bookmark"
                  onClick={() => onRemove(leafIndex)}
                  className="text-fog/40 transition-colors hover:text-red-400"
                >
                  <BookmarkX size={15} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
