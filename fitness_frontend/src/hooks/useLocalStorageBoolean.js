import { useCallback, useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Persisted boolean state stored in localStorage.
 * @param {string} key localStorage key
 * @param {boolean} defaultValue default value if key doesn't exist
 * @returns {[boolean, (next:boolean)=>void]}
 */
export function useLocalStorageBoolean(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return;
      setValue(stored === "true");
    } catch {
      // If localStorage is unavailable, fall back to in-memory state.
    }
  }, [key]);

  const setAndPersist = useCallback(
    (next) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, String(Boolean(next)));
      } catch {
        // ignore persistence errors
      }
    },
    [key]
  );

  return [value, setAndPersist];
}
