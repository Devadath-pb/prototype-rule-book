import { ChevronRight } from "lucide-react";
import Drawer from "../Drawer";
import { chapters, pages } from "../../data/book";

interface ContentsDrawerProps {
  open: boolean;
  onClose: () => void;
  onJump: (leafIndex: number) => void;
}

export default function ContentsDrawer({ open, onClose, onJump }: ContentsDrawerProps) {
  const jumpTo = (chapterId: string, firstPageId: string) => {
    if (chapterId === "cover") {
      onJump(0);
    } else {
      const pageIndex = pages.findIndex((p) => p.id === firstPageId);
      onJump(pageIndex + 1);
    }
    onClose();
  };

  return (
    <Drawer open={open} title="Contents" onClose={onClose}>
      <ul className="divide-y divide-white/5">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <button
              type="button"
              onClick={() => jumpTo(chapter.id, chapter.firstPageId)}
              className="flex w-full items-center justify-between py-3.5 text-left font-body text-sm text-fog transition-colors hover:text-gold"
            >
              {chapter.label}
              <ChevronRight size={15} className="text-fog/40" />
            </button>
          </li>
        ))}
      </ul>
    </Drawer>
  );
}
