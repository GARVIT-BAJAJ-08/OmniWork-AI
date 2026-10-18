import { useState } from 'react';

const STORAGE_KEY = 'businessos-dark-mode';

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const toggleDarkMode = () => {
    setDarkMode((current) => {
      const next = !current;
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Keep the theme usable when browser storage is unavailable.
      }
      return next;
    });
  };

  return { darkMode, toggleDarkMode };
};
