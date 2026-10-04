'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const storageKey = 'knowledge-theme';

export function ThemeControl({ selector = false }: { selector?: boolean }) {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const update = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      document.documentElement.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
      update();
    };
    update();
    window.addEventListener('knowledge-theme-change', update);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('knowledge-theme-change', update);
      window.removeEventListener('storage', sync);
    };
  }, []);

  function choose(next: Theme) {
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(storageKey, next); } catch { /* Keep the theme for this session. */ }
    window.dispatchEvent(new Event('knowledge-theme-change'));
  }

  if (selector) return <div role="group" aria-label="Color theme" className="inline-flex gap-1 rounded-md border border-[var(--border)] p-1">
    {(['light', 'dark'] as const).map(value => <button key={value} aria-pressed={theme === value} onClick={() => choose(value)} className={`rounded px-3 py-1.5 capitalize ${theme === value ? 'bg-[var(--hover)] text-[var(--primary)]' : 'text-[var(--muted)] hover:text-[var(--primary)]'}`}>{value}</button>)}
  </div>;

  return <button onClick={() => choose(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} className="flex h-6 w-6 items-center justify-center rounded text-[var(--muted)] hover:bg-[var(--ink)]/5 hover:text-[var(--primary)]">
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      {theme === 'light' ? <path d="M16.5 12.8A7 7 0 0 1 7.2 3.5a7 7 0 1 0 9.3 9.3Z"/> : <><circle cx="10" cy="10" r="3.3"/><path d="M10 1v2m0 14v2M1 10h2m14 0h2M3.6 3.6 5 5m10 10 1.4 1.4M3.6 16.4 5 15M15 5l1.4-1.4"/></>}
    </svg>
  </button>;
}
