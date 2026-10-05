export type ResourceKind = 'AI model' | 'Image resource' | 'Knowledge note' | 'X post' | 'Website'
export type Section = { title: string; paragraphs: string[]; bullets?: string[]; code?: string }
export type Resource = {
  id: string; title: string; subtitle: string; summary: string; url: string; domain: string;
  kind: ResourceKind; tags: string[]; cover: 'wave' | 'network' | 'phonon' | 'image' | 'post' | 'notes';
  media?: { kind: 'screenshot' | 'video' | 'image'; sourceUrl: string; caption: string; stream?: string; capturedAt?: string };
  author: string; status: 'Reviewed' | 'Draft' | 'Needs review'; saved: string;
  sourceLinks?: string[]; editorial: string; sections: Section[]; related: string[]; starred: boolean; image?: string;
}
export const starterResourceIds = new Set(['whistle', 'needle', 'phonon', 'image-workflow', 'link-workflow', 'voice-note', 'boardui', 'nero-boardui'])

export const resourceText = (r: Resource) => `${r.title} ${r.subtitle} ${r.summary} ${r.tags.join(' ')} ${r.domain} ${r.kind} ${r.editorial} ${r.sections.map(s => `${s.title} ${s.paragraphs.join(' ')} ${(s.bullets || []).join(' ')} ${s.code || ''}`).join(' ')}`.toLowerCase()
export const resourceMarkdown = (r: Resource) => `# ${r.title}\n\n${r.subtitle}\n\n${r.url ? `Source: ${r.url}\n` : ''}Status: ${r.status}\nTags: ${r.tags.join(', ')}\n\n## Summary\n${r.summary}\n\n${r.sections.map(s => `## ${s.title}\n\n${s.paragraphs.join('\n\n')}${s.bullets ? '\n\n'+s.bullets.map(b => '- '+b).join('\n') : ''}${s.code ? '\n\n```\n'+s.code+'\n```' : ''}`).join('\n\n')}\n\n## Editorial note\n${r.editorial}\n`
