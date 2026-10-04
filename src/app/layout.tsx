import type { Metadata } from 'next';
import '../style.css';
export const metadata: Metadata = { title: 'Knowledge workspace', description: 'Sources, notes, and editorial work.' };
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('knowledge-theme')==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`;
export default function Layout({children}: {children: React.ReactNode}) { return <html lang="en" data-theme="light" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body>{children}</body></html> }
