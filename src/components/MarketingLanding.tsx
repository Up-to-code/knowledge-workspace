'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './MarketingLanding.module.css';
import AIUpdates from './AIUpdates';
import { MotionConfig, motion } from 'motion/react';
import { Icon } from './Icon';

const primaryButton = 'inline-flex min-h-[43px] items-center justify-center gap-2 rounded-full border border-[#efefef] bg-[#efefef] px-[21.6px] py-[12px] text-[16px] leading-4 text-[#111111] transition-colors hover:border-white hover:bg-white';
const textLink = 'inline-flex items-center gap-2 text-[#efefef] transition-colors hover:text-[#ffffff]';
const sources = [
  { name: 'BoardUI', image: '/previews/boardui.jpg', url: 'https://www.boardui.com/', author: 'BoardUI', kind: 'Website screenshot' },
  { name: 'Whistle', image: '/previews/whistle.jpg', url: 'https://cactuscompute.com/blog/whistle', author: 'Cactus Compute', kind: 'Website screenshot' },
  { name: 'Needle', image: '/previews/needle.jpg', url: 'https://cactuscompute.com/needle', author: 'Cactus Compute', kind: 'Website screenshot' },
  { name: 'Phonon 2', image: '/previews/phonon.jpg', url: 'https://fermionresearch.com/models/phonon-2', author: 'Fermion Research', kind: 'Website screenshot' },
];
const exampleNote = '# Research notes\n\nKeep the original source alongside your ideas.\n\nSource: https://www.boardui.com/\n\nQuestions to investigate:\n- Which parts are useful for this project?\n- What does the original page actually say?\n- What needs another source before publishing?';

function KnowledgeMark() {
  return <svg width="23" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h4v16H3zM10 4h4v16h-4zM17 4l3-1 4 16-3 1z" /></svg>;
}

export default function MarketingLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [note, setNote] = useState(exampleNote);
  const source = sources[sourceIndex];

  return <MotionConfig reducedMotion="user"><div className="min-h-screen bg-[#111111] text-[15px] leading-[22.5px] text-[#efefef] [color-scheme:dark] sm:text-[16px] sm:leading-6">
    <a href="#main" className="fixed left-5 top-3 z-50 -translate-y-24 rounded bg-[#efefef] px-4 py-2 text-[#111111] focus:translate-y-0">Skip to content</a>

    {/* ============================================
        NAVIGATION
        ============================================ */}
    <header className="fixed inset-x-0 top-0 z-40 h-[56px] bg-[#111111]/95 lg:h-[52px]">
      <div className="mx-auto flex h-full max-w-[1340px] items-center justify-between px-5">
        <Link href="/" aria-label="Knowledge home" className="flex items-center gap-[9px] text-[17px] font-semibold tracking-[-.5px]"><KnowledgeMark />KNOWLEDGE</Link>
        <nav aria-label="Main navigation" className="hidden items-center text-[14px] leading-[21px] lg:flex">
          <a href="#updates" className="px-[15px] py-3 hover:text-[#b9b9b9]">AI updates</a>
          <a href="#sources" className="px-[15px] py-3 hover:text-[#b9b9b9]">Sources</a>
          <a href="#knowledge" className="px-[15px] py-3 hover:text-[#b9b9b9]">Knowledge</a>
          <a href="#workflow" className="px-[15px] py-3 hover:text-[#b9b9b9]">Agent workflow</a>
        </nav>
        <div className="flex items-center gap-[7px] text-[14px] leading-[21px]">
          <Link href="/auth/sign-in" className="hidden rounded-full border border-[#efefef]/25 px-[11px] py-[3px] hover:bg-[#262626] sm:inline-flex">Sign in</Link>
          <Link href="/app" className="rounded-full bg-[#efefef] px-[11px] py-[4px] text-[#111111] hover:bg-white">Open app</Link>
          <button className="ml-1 flex h-8 w-8 items-center justify-center lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="landing-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} size={20} /></button>
        </div>
      </div>
      {menuOpen && <nav id="landing-menu" aria-label="Mobile navigation" className="border-b border-[#efefef]/10 bg-[#181818] px-5 pb-5 pt-2 lg:hidden">{[['AI updates', '#updates'], ['Sources', '#sources'], ['Knowledge', '#knowledge'], ['Agent workflow', '#workflow'], ['Sign in', '/auth/sign-in']].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="block py-3">{label}</a>)}</nav>}
    </header>

    <main id="main" className="pt-[56px] lg:pt-[52px]">
      {/* ============================================
          HERO — THE ACTUAL WORKSPACE
          ============================================ */}
      <section id="workspace" className="mx-auto max-w-[1340px] px-5 pb-[67.2px] pt-[105px] lg:pt-[112px]">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: 'easeOut' }}>
          <h1 className="mb-[22.4px] max-w-[658px] text-[24.375px] leading-[1.25] font-normal tracking-[-.325px] lg:text-[26px]">Save sources. Search your knowledge.<br className="hidden sm:block" /> Draft with the original context.</h1>
          <div className="flex flex-wrap items-center gap-[10px]">
            <Link href="/app" className={primaryButton}>Open workspace <span aria-hidden="true">→</span></Link>
            <a href="#workflow" className="inline-flex min-h-[43px] items-center justify-center rounded-full border border-[#efefef]/10 bg-[#262626] px-[21.6px] py-3 leading-4 hover:bg-[#303030]">Explore the workflow</a>
          </div>
        </motion.div>
        <div className={styles.heroGallery} aria-label="Original source previews">
          {sources.slice(0,3).map((item,index)=><a key={item.name} href={item.url} target="_blank" rel="noreferrer" className={styles.preview}>
            <div className={styles.previewImage}><Image src={item.image} alt={`Original ${item.name} website capture`} width={1265} height={709} sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 31vw" loading={index===0?'eager':'lazy'}/></div>
            <div className={styles.previewCaption}><span>{item.name}</span><span>{item.author} <Icon name="external" size={12}/></span></div>
          </a>)}
        </div>
        <div className={styles.galleryNote}><p>Original sources, ready for your own notes.</p><Link href="/app">Build your library <span aria-hidden="true">→</span></Link></div>
      </section>

      <AIUpdates/>

      {/* ============================================
          SOURCES — REAL CAPTURES, WITH PROVENANCE
          ============================================ */}
      <section id="sources" className="mx-auto max-w-[1340px] scroll-mt-14 px-5 py-[67.2px]">
        <div className="grid gap-9 rounded-[4px] bg-[#181818] p-5 lg:min-h-[715px] lg:grid-cols-[.65fr_1.35fr] lg:items-center lg:gap-10 lg:p-5">
          <div className="max-w-[358px] py-5 lg:px-0 lg:py-12">
            <h2 className="text-[22px] leading-[28.6px] font-normal tracking-[-.11px]">Keep the source and its context.</h2>
            <p className="mt-1 text-[22px] leading-[28.6px] tracking-[-.11px] text-[#969696]">Save a URL, capture its text, and bring selected linked pages into the same research.</p>
            <p className="mt-6 text-[15px] leading-[23px] text-[#b9b9b9]">Original images, page screenshots, and video thumbnails stay connected to their source URL, creator, and capture date.</p>
            <Link href="/app" className={`${textLink} mt-6`}>Add your first source <span aria-hidden="true">→</span></Link>
          </div>
          <div className="min-w-0 overflow-hidden rounded-[4px] bg-[#202020] p-4 sm:p-6 lg:py-12">
            <div className="mb-4 text-[12px] leading-[18px] text-[#b9b9b9]">Original source examples · captured October 4, 2026</div>
            <div role="tablist" aria-label="Original source examples" className="mb-5 flex flex-wrap gap-2">{sources.map((item, index) => <button key={item.name} id={`source-tab-${index}`} role="tab" aria-selected={sourceIndex === index} aria-controls="source-example" tabIndex={sourceIndex === index ? 0 : -1} onClick={() => setSourceIndex(index)} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = (sourceIndex + (event.key === 'ArrowRight' ? 1 : -1) + sources.length) % sources.length; setSourceIndex(next); document.getElementById(`source-tab-${next}`)?.focus(); } }} className={`rounded-full border px-3 py-1 text-[12px] leading-[18px] ${sourceIndex === index ? 'border-[#efefef] bg-[#efefef] text-[#111111]' : 'border-[#efefef]/15 text-[#b9b9b9] hover:border-[#efefef]/40'}`}>{item.name}</button>)}</div>
            <figure id="source-example" role="tabpanel" aria-labelledby={`source-tab-${sourceIndex}`}>
              <a href={source.url} target="_blank" rel="noreferrer" aria-label={`Visit the original ${source.name} source`}><img src={source.image} width="1265" height="709" loading="lazy" alt={`Actual screenshot of the original ${source.name} website`} className="aspect-[1265/709] w-full rounded-[3px] object-contain" /></a>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] leading-[18px] text-[#b9b9b9]"><span>{source.author} · {source.kind}</span><a href={source.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#efefef]">Original source <Icon name="external" size={12} /></a></figcaption>
            </figure>
            <p className="mt-3 text-[11px] leading-4 text-[#969696]">Examples are separate from your library.</p>
          </div>
        </div>
      </section>

      {/* ============================================
          KNOWLEDGE — AN ISOLATED, EDITABLE EXAMPLE
          ============================================ */}
      <section id="knowledge" className="mx-auto max-w-[1340px] scroll-mt-14 px-5 py-[67.2px]">
        <div className="grid gap-9 rounded-[4px] bg-[#181818] p-5 lg:min-h-[715px] lg:grid-cols-[1.35fr_.65fr] lg:items-center lg:gap-10">
          <div className="order-2 min-w-0 rounded-[4px] bg-[#202020] p-5 sm:p-8 lg:order-1 lg:py-12">
            <div className="overflow-hidden rounded-[5px] border border-[#efefef]/10 bg-[#151515]">
              <div className="flex items-center justify-between gap-4 border-b border-[#efefef]/10 px-5 py-4 text-[13px] leading-5"><span className="flex items-center gap-2"><Icon name="attachment" size={14} />Research notes.md</span><span className="text-[11px] text-[#969696]">Editable example</span></div>
              <label htmlFor="example-note" className="sr-only">Edit the example research note</label>
              <textarea id="example-note" value={note} onChange={event => setNote(event.target.value)} spellCheck={false} className="block h-[310px] w-full resize-none bg-transparent p-5 font-mono text-[13px] leading-[23px] text-[#cdcdcd] focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#969696] sm:h-[380px]" />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#efefef]/10 px-5 py-3 text-[11px] leading-4 text-[#969696]"><span>Try editing · stays on this page</span><button onClick={() => setNote(exampleNote)} className="text-[#efefef] hover:text-white">Reset example</button></div>
            </div>
          </div>
          <div className="order-1 max-w-[358px] py-5 lg:order-2 lg:py-12">
            <h2 className="text-[22px] leading-[28.6px] font-normal tracking-[-.11px]">Find more than a title.</h2>
            <p className="mt-1 text-[22px] leading-[28.6px] tracking-[-.11px] text-[#969696]">Search the full source text, your notes, and uploaded files in one library.</p>
            <p className="mt-6 text-[15px] leading-[23px] text-[#b9b9b9]">Keep your own observations next to the reference. Open a saved resource to read its source, edit its notes, and prepare a draft.</p>
            <Link href="/app" className={`${textLink} mt-6`}>Open your library <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      {/* ============================================
          AGENT WORKFLOW
          ============================================ */}
      <section id="workflow" className="mx-auto max-w-[1340px] scroll-mt-14 px-5 py-[67.2px]">
        <h2 className="mb-9 max-w-[700px] text-[26px] leading-[32.5px] font-normal tracking-[-.325px]">From a saved source to an editable draft.</h2>
        <div className="grid gap-2 md:grid-cols-3">
          {[
            { step: '01', title: 'Bring your context', text: 'Add links, notes, images, and text or code files. Choose the resources that matter for your question.', link: 'Start your library', href: '/app', icon: 'attachment' as const },
            { step: '02', title: 'Choose a free model', text: 'Sign in, open Settings, and choose an available free model. The agent uses the workspace’s configured OpenRouter connection.', link: 'Open workspace', href: '/app', icon: 'bot' as const },
            { step: '03', title: 'Research, then review', text: 'The Eve agent can search saved knowledge, read sources, and save references. Use that context for an editable draft you can review.', link: 'Open the workspace', href: '/app', icon: 'search' as const },
          ].map(item => <article key={item.step} className="flex min-h-[280px] flex-col rounded-[4px] bg-[#181818] p-5"><div className="mb-10 flex items-center justify-between text-[12px] text-[#969696]"><span>{item.step}</span><Icon name={item.icon} size={18} /></div><h3 className="text-[20px] leading-[26px] font-normal">{item.title}</h3><p className="mt-2 mb-7 max-w-[345px] text-[15px] leading-[23px] text-[#969696]">{item.text}</p><Link href={item.href} className={`${textLink} mt-auto text-[14px]`}>{item.link}<span aria-hidden="true">→</span></Link></article>)}
        </div>
        <p className="mt-5 max-w-[770px] text-[13px] leading-5 text-[#969696]">Free models depend on OpenRouter availability and rate limits. After signing in, saving notes and searching your library are available before you connect a model.</p>
      </section>

      {/* ============================================
          QUESTIONS
          ============================================ */}
      <section className="mx-auto grid max-w-[1340px] gap-9 px-5 py-[67.2px] lg:grid-cols-[.65fr_1.35fr] lg:gap-10">
        <h2 className="text-[22px] leading-[28.6px] font-normal">A few practical details.</h2>
        <div className="border-t border-[#efefef]/15">
          {[
            ['Where does a new library start?', 'A new library starts empty. The source captures and editable note on this page are examples, and are never added to your library automatically.'],
            ['Do I need an account?', 'Yes. Sign in or create an account to access your library, saved sources, files, and agent. Each account has its own private workspace.'],
            ['How are linked pages handled?', 'When you choose to follow links, selected linked pages become separate connected resources. Each keeps its own source URL and source text.'],
            ['Can I change what the agent writes?', 'Yes. Drafts are editable. Keep the source attached, check the original context, and revise the text before you use it.'],
          ].map(([question, answer]) => <details key={question} className="group border-b border-[#efefef]/15 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] [&::-webkit-details-marker]:hidden">{question}<span className="shrink-0 text-[#969696] group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-4 max-w-[660px] text-[15px] leading-[23px] text-[#969696]">{answer}</p></details>)}
        </div>
      </section>

      {/* ============================================
          CLOSING CALL TO ACTION
          ============================================ */}
      <section className="mx-auto max-w-[1340px] px-5 py-[112px] text-center">
        <h2 className="mb-7 text-[44px] leading-[1.1] font-normal tracking-[-1.3px] sm:text-[60px] lg:text-[72px] lg:tracking-[-2.16px]">Start with a source.</h2>
        <Link href="/app" className={primaryButton}>Open workspace <span aria-hidden="true">→</span></Link>
      </section>
    </main>

    {/* ============================================
        FOOTER
        ============================================ */}
    <footer className="bg-[#181818] px-5 pt-[67.2px] pb-[30px] text-[14px] leading-[21px]">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <div><p className="mb-3 text-[#969696]">Workspace</p><div className="flex flex-col items-start gap-2"><Link href="/app" className="hover:text-[#b9b9b9]">Library</Link><Link href="/auth/sign-in" className="hover:text-[#b9b9b9]">Sign in</Link><Link href="/auth/sign-in?mode=sign-up" className="hover:text-[#b9b9b9]">Create account</Link></div></div>
          <div><p className="mb-3 text-[#969696]">Product</p><div className="flex flex-col items-start gap-2"><a href="#sources" className="hover:text-[#b9b9b9]">Sources</a><a href="#knowledge" className="hover:text-[#b9b9b9]">Notes and files</a><a href="#workflow" className="hover:text-[#b9b9b9]">Agent workflow</a></div></div>
          <div><p className="mb-3 text-[#969696]">Original examples</p><div className="flex flex-col items-start gap-2">{sources.map(item => <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="hover:text-[#b9b9b9]">{item.name} ↗</a>)}</div></div>
          <div><p className="mb-3 text-[#969696]">Models</p><div className="flex flex-col items-start gap-2"><a href="https://openrouter.ai/models?max_price=0" target="_blank" rel="noreferrer" className="hover:text-[#b9b9b9]">OpenRouter free models ↗</a><Link href="/app" className="hover:text-[#b9b9b9]">Open workspace</Link></div></div>
          <div><p className="mb-3 text-[#969696]">Your next step</p><p className="max-w-[200px] text-[#b9b9b9]">Add a reference.<br />Keep a note.<br />Make something from it.</p></div>
        </div>
        <div className="mt-[67.2px] flex flex-wrap items-center justify-between gap-5 text-[12px] leading-[18px] text-[#969696]"><span>Knowledge workspace</span><a href="#workspace" className="hover:text-[#efefef]">Back to top ↑</a></div>
      </div>
    </footer>
  </div></MotionConfig>;
}
