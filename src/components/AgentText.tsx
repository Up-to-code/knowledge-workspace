'use client';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
export function AgentText({text}:{text:string}) {
 return <div className="text-[14px] leading-[24px] text-[var(--primary)] [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:my-4 [&_h2]:font-medium [&_h3]:my-3 [&_h3]:font-medium [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-[var(--border)] [&_pre]:bg-[var(--surface)] [&_pre]:p-3 [&_code]:text-[12px] [&_table]:my-3 [&_table]:w-full [&_td]:border [&_td]:border-[var(--border)] [&_td]:p-2 [&_th]:border [&_th]:border-[var(--border)] [&_th]:p-2"><Markdown remarkPlugins={[remarkGfm]} skipHtml components={{a:({href,children})=><a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--blue)] underline underline-offset-2">{children}</a>,img:({alt})=><span className="text-[var(--muted)]">{alt||'Image reference'}</span>}}>{text}</Markdown></div>;
}
