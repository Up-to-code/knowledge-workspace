import type { Resource } from '../data/resources'

export function ResourceCover({ resource, large = false }: { resource: Resource; large?: boolean }) {
  if (!resource.image) return null
  const image = <img src={resource.image} alt={resource.media?.caption || resource.title} loading="lazy" onError={event => { if (resource.id === 'nero-boardui' && !event.currentTarget.src.endsWith('/previews/neropursue-boardui-video.jpg')) event.currentTarget.src = '/previews/neropursue-boardui-video.jpg' }} className={`h-full w-full ${large ? 'object-contain' : 'object-cover object-top'}`}/>
  if (large && resource.media?.kind === 'video') return <a href={resource.media.sourceUrl} target="_blank" rel="noreferrer" aria-label={`Watch ${resource.title} original video on X`} className="group relative block h-full w-full bg-[#111]">{image}<span className="absolute bottom-[12px] left-[12px] flex items-center gap-[7px] rounded-[5px] border border-white/15 bg-black/80 px-[11px] py-[7px] text-[12px] text-white transition-colors group-hover:bg-black">▶ Watch original video on X ↗</span></a>
  return <div className="relative h-full w-full overflow-hidden bg-[#111]">{image}{resource.media?.kind === 'video' && !large && <span className="absolute bottom-[8px] left-[9px] rounded-[4px] bg-black/75 px-[7px] py-[3px] text-[10px] text-white">▶ Original video</span>}</div>
}
