import { Search, Bookmark, Menu, Volume2, VolumeX } from "lucide-react";

interface HeaderProps {
  onSearchClick: () => void;
  onBookmarksClick: () => void;
  onMenuClick: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export default function Header({
  onSearchClick,
  onBookmarksClick,
  onMenuClick,
  muted,
  onToggleMute,
}: HeaderProps) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center">
      <div className="pointer-events-auto flex w-full max-w-[min(420px,calc(100vw-2rem))] items-center justify-between px-4 pt-[env(safe-area-inset-top)] sm:px-5 mx-auto">
        <div className="flex items-center gap-2 pt-3">
          <span className="font-display text-[11px] uppercase tracking-[0.3em] text-gold/80">
            Prototype Quest
          </span>
        </div>
        <div className="flex items-center gap-1.5 pt-3">
          <IconButton label="Toggle sound" onClick={onToggleMute}>
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </IconButton>
          <IconButton label="Search" onClick={onSearchClick}>
            <Search size={17} />
          </IconButton>
          <IconButton label="Bookmarks" onClick={onBookmarksClick}>
            <Bookmark size={17} />
          </IconButton>
          <IconButton label="Table of contents" onClick={onMenuClick}>
            <Menu size={17} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-fog backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-gold active:scale-95"
    >
      {children}
    </button>
  );
}
