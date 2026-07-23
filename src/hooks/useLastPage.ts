import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pq-last-page";

export function useLastPage() {
  const [lastPage, setLastPageState] = useState<number>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? parseInt(raw, 10) : 0;
    return Number.isNaN(parsed) ? 0 : parsed;
  });

  const setLastPage = useCallback((pageIndex: number) => {
    setLastPageState(pageIndex);
    localStorage.setItem(STORAGE_KEY, String(pageIndex));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(lastPage));
  }, [lastPage]);

  return { lastPage, setLastPage };
}
