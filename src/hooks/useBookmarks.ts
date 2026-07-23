import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pq-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (pageIndex: number) => bookmarks.includes(pageIndex),
    [bookmarks]
  );

  const toggleBookmark = useCallback((pageIndex: number) => {
    setBookmarks((prev) =>
      prev.includes(pageIndex)
        ? prev.filter((p) => p !== pageIndex)
        : [...prev, pageIndex].sort((a, b) => a - b)
    );
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark };
}
