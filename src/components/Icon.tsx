import type { ReactNode } from 'react'
export type IconName = 'trash' | 'cube' | 'panel' | 'search' | 'send' | 'bot' | 'code' | 'filter' | 'branch' | 'cloud' | 'chevron' | 'plus' | 'arrow' | 'mic' | 'external' | 'globe' | 'more' | 'close' | 'check' | 'folder' | 'clock' | 'menu' | 'attachment'
export function Icon({ name, size = 16, className = '' }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/></>,
    cube: <><path fill="currentColor" stroke="none" d="m12 1.2 9.8 5.6v10.5L12 23l-9.8-5.7V6.8L12 1.2Zm0 2.4L4.4 8 12 12.4 19.6 8 12 3.6ZM4.3 10v6.1l6.6 3.8v-6.1L4.3 10Z"/><path stroke="none" fill="var(--sidebar)" d="m12 12.4 7.6-4.4-7.6-4.4-7.6 4.4z"/></>,
    panel: <><rect x="3" y="4" width="18" height="16" rx="1"/><path d="M9 4v16"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    send: <path d="m3 3 18 1-8 17-2-9L3 3Zm8 9 10-8"/>,
    bot: <><rect x="4" y="7" width="16" height="13" rx="2"/><path d="M12 7V3m-4 9v3m8-3v3"/><circle cx="12" cy="2" r=".6"/></>,
    code: <path d="m7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18"/>,
    filter: <path d="M3 5h18M6 10h12m-9 5h6m-4 5h2"/>,
    branch: <><path d="M6 6v11a3 3 0 0 0 3 3h1m8-13v4a5 5 0 0 1-5 5H6"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="20" r="2"/></>,
    cloud: <path d="M7.5 18H6a4 4 0 0 1-1-7.9A6 6 0 0 1 16.7 9a4.5 4.5 0 0 1 1.8 9H7.5Z"/>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    plus: <path d="M12 4v16M4 12h16"/>,
    arrow: <path d="M12 20V4m-6 6 6-6 6 6"/>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" stroke="none"/><path d="M6 10v2a6 6 0 0 0 12 0v-2m-6 8v4m-3 0h6"/></>,
    external: <path d="M6 18 18 6M8 6h10v10"/>,
    globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
    more: <><circle cx="4" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="20" cy="12" r="1"/></>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    check: <path d="m4 12 5 5L20 6"/>,
    folder: <path d="M3 7V5h7l2 2h9v13H3V7Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
    attachment: <path d="m8 13 7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2"/>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">{paths[name]}</svg>
}

