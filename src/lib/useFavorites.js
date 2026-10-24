"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "parcel:favorites";
const CHANGE_EVENT = "parcel:favorites-changed";

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((n) => typeof n === "number")
      : [];
  } catch {
    return [];
  }
}

/**
 * Favorites kept in localStorage. Every component that calls this hook stays
 * in sync through a window event, so the header count updates instantly.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setFavorites(readStorage());
    sync();
    setReady(true);
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((id) => {
    const current = readStorage();
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage can be blocked (private mode); the UI simply won't persist.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { favorites, toggle, ready };
}
