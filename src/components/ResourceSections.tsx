'use client';
import type { Resource } from '../data/resources';
import { AgentText } from './AgentText';
export function ResourceSections({resource}:{resource:Resource}) {
 const raw=resource.sections.filter(s=>/^(original )?source text$/i.test(s.title));
 const sections=resource.sections.filter(s=>!raw.includes(s));
 const links=[...new Set([resource.url,...(resource.sourceLinks||[])])].filter(url=>/^https?:\/\//i.test(url));
 return <>
  {sections.map((s,i)=><section key={s.title} id={`section-${resource.sections.indexOf(s)}`} className="mb-7">
   <h2 className="mb-3 text-[18px] font-medium leading-6">{s.title}</h2>
   <AgentText text={s.paragraphs.join('\n\n')}/>
   {s.bullets&&<AgentText text={s.bullets.map(b=>`- ${b}`).join('\n')}/>}
   {s.code&&<AgentText text={'```\n'+s.code+'\n```'}/>}
  </section>)}
  {links.length>0&&<section className="mb-7 border-t border-[var(--border)] pt-5"><h2 className="mb-3 text-[16px] font-medium">Source links</h2><div className="flex flex-wrap gap-2">{links.map(url=><a key={url} href={url} target="_blank" rel="noopener noreferrer" className="max-w-full break-all rounded-md border border-[var(--border)] px-3 py-2 text-[12px] text-[var(--blue)] hover:underline">{url===resource.url?'Open original source':new URL(url).hostname+new URL(url).pathname} ↗</a>)}</div></section>}
  {raw.map(s=><details key={s.title} id={`section-${resource.sections.indexOf(s)}`} className="mb-7 rounded-lg border border-[var(--border)] p-4"><summary className="cursor-pointer text-[13px] font-medium">Original source text</summary><p className="mb-4 mt-2 text-[12px] text-[var(--muted)]">Captured page text, kept separately from the summary.</p><AgentText text={s.paragraphs.join('\n\n')}/></details>)}
 </>;
}
