// src/hooks/useToast.js

import { useCallback, useRef } from 'react';

/**
 * Prosty toast — bez zewnętrznej biblioteki.
 * Wymaga <div id="toast"> w index.html.
 */
export function useToast() {
  const timerRef = useRef(null);

  const show = useCallback((msg, type = 'info', dur = 2600) => {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.className = `toast show t-${type}`;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => el.classList.remove('show'), dur);
  }, []);

  return show;
}
