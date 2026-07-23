import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationProps {
  currentLeaf: number;
  totalLeaves: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Navigation({
  currentLeaf,
  totalLeaves,
  onPrev,
  onNext,
}: NavigationProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-[calc(env(safe-area-inset-bottom)+14px)]">
      <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-white/10 bg-black/50 px-5 py-2.5 backdrop-blur-md">
        <button
          type="button"
          aria-label="Previous page"
          onClick={onPrev}
          disabled={currentLeaf <= 0}
          className="flex h-8 w-8 items-center justify-center rounded-full text-fog transition-colors hover:text-gold disabled:opacity-25"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="min-w-[52px] text-center font-display text-[11px] tracking-[0.2em] text-fog">
          {currentLeaf + 1} / {totalLeaves}
        </span>
        <button
          type="button"
          aria-label="Next page"
          onClick={onNext}
          disabled={currentLeaf >= totalLeaves - 1}
          className="flex h-8 w-8 items-center justify-center rounded-full text-fog transition-colors hover:text-gold disabled:opacity-25"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
