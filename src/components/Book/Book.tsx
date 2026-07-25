import { forwardRef, memo } from "react";
import HTMLFlipBook from "react-pageflip";
import CoverLeaf from "./CoverLeaf";
import BackCoverLeaf from "./BackCoverLeaf";
import BookPageLeaf from "./BookPageLeaf";
import { pages } from "../../data/book";

interface BookProps {
  startPage: number;
  searchQuery: string;
  isBookmarked: (index: number) => boolean;
  onFlip: (pageIndex: number) => void;
  width: number;
  height: number;
}

// Leaf index 0 = front cover, 1..N = content pages, N+1 = back cover.
const Book = memo(forwardRef<any, BookProps>(
  ({ startPage, searchQuery, isBookmarked, onFlip, width, height }, ref) => {
    return (
      <HTMLFlipBook
        ref={ref}
        className="pq-flipbook"
        style={{}}
        width={width}
        height={height}
        size="fixed"
        minWidth={240}
        maxWidth={420}
        minHeight={360}
        maxHeight={640}
        startPage={startPage}
        drawShadow
        flippingTime={520}
        usePortrait
        startZIndex={10}
        autoSize={false}
        maxShadowOpacity={0.35}
        showCover
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={12}
        showPageCorners
        disableFlipByClick={false}
        onFlip={(e: { data: number }) => onFlip(e.data)}
      >
        <CoverLeaf />
        {pages.map((page, i) => (
          <BookPageLeaf
            key={page.id}
            page={page}
            pageNumber={i + 1}
            totalPages={pages.length}
            searchQuery={searchQuery}
            isBookmarked={isBookmarked(i + 1)}
          />
        ))}
        <BackCoverLeaf />
      </HTMLFlipBook>
    );
  }
));

Book.displayName = "Book";
export default Book;
export const TOTAL_LEAVES = pages.length + 2;
