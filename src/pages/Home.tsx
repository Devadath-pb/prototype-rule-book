import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import ClosedBook from "../components/Book/ClosedBook";
import Book from "../components/Book/Book";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import ContentsDrawer from "../components/ContentsDrawer/ContentsDrawer";
import SearchDrawer from "../components/Search/SearchDrawer";
import BookmarkDrawer from "../components/Bookmark/BookmarkDrawer";
import { useBookmarks } from "../hooks/useBookmarks";
import { useLastPage } from "../hooks/useLastPage";
import { usePageSound } from "../hooks/usePageSound";
import { pages } from "../data/book";

const TOTAL_LEAVES = pages.length + 2;

function useBookSize() {
  const [size, setSize] = useState({ width: 320, height: 480 });

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = Math.min(420, vw * 0.9);
      const maxHeightByViewport = vh * 0.72;
      const height = Math.min(width * 1.5, maxHeightByViewport);
      setSize({ width: Math.round(width), height: Math.round(height) });
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return size;
}

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "closed" | "open">("loading");
  const [currentLeaf, setCurrentLeaf] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentsOpen, setContentsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapRef = useRef(0);

  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();
  const { lastPage, setLastPage } = useLastPage();
  const { muted, toggleMuted, playFlip } = usePageSound();
  const { width, height } = useBookSize();

  useEffect(() => {
    const t = setTimeout(() => setPhase("closed"), 1600);
    return () => clearTimeout(t);
  }, []);

  const goToLeaf = useCallback((leafIndex: number) => {
    bookRef.current?.pageFlip()?.turnToPage(leafIndex);
  }, []);

  const handleOpen = useCallback(() => {
    setPhase("open");
    // Resume from where the reader left off, if any.
    setTimeout(() => {
      if (lastPage > 0) goToLeaf(lastPage);
    }, 50);
  }, [lastPage, goToLeaf]);

  const handleFlip = useCallback(
    (pageIndex: number) => {
      setCurrentLeaf(pageIndex);
      setLastPage(pageIndex);
      playFlip();
    },
    [setLastPage, playFlip]
  );

  const handleNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);
  const handlePrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const handleJump = useCallback(
    (leafIndex: number, query = "") => {
      setSearchQuery(query);
      goToLeaf(leafIndex);
    },
    [goToLeaf]
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Keyboard support: arrow keys, enter, escape.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (phase === "closed" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        handleOpen();
        return;
      }
      if (phase !== "open") return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") {
        setContentsOpen(false);
        setSearchOpen(false);
        setBookmarksOpen(false);
        if (document.fullscreenElement) document.exitFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, handleOpen, handleNext, handlePrev]);

  // Double tap -> fullscreen, long press -> bookmark current page.
  const onPointerDown = () => {
    longPressTimer.current = setTimeout(() => {
      if (currentLeaf > 0 && currentLeaf <= pages.length) {
        toggleBookmark(currentLeaf);
      }
    }, 600);
  };
  const onPointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      toggleFullscreen();
    }
    lastTapRef.current = now;
  };

  return (
    <div ref={containerRef} className="relative min-h-[100dvh] w-full bg-ink">
      <AnimatePresence mode="wait">
        {phase === "loading" && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {phase === "closed" && <ClosedBook onOpen={handleOpen} />}

      {phase === "open" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />

          <Header
            onSearchClick={() => setSearchOpen(true)}
            onBookmarksClick={() => setBookmarksOpen(true)}
            onMenuClick={() => setContentsOpen(true)}
            muted={muted}
            onToggleMute={toggleMuted}
          />

          <div
            className="relative z-10"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <Book
              ref={bookRef}
              startPage={0}
              width={width}
              height={height}
              searchQuery={searchQuery}
              isBookmarked={isBookmarked}
              onFlip={handleFlip}
            />
          </div>

          <Navigation
            currentLeaf={currentLeaf}
            totalLeaves={TOTAL_LEAVES}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </motion.div>
      )}

      <ContentsDrawer
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        onJump={handleJump}
      />
      <SearchDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onJump={handleJump}
      />
      <BookmarkDrawer
        open={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        onJump={handleJump}
        onRemove={toggleBookmark}
      />
    </div>
  );
}
