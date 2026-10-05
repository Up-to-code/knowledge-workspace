import { and, eq, sql } from 'drizzle-orm';
import { getDb } from './index';
import { resources,workspaces,threadRows } from './schema';
import { resourceText, type Resource } from '../../data/resources';
export async function readWorkspace(ownerId:string) {
 const db=getDb();
 const [rows,[workspace]]=await Promise.all([db.select().from(resources).where(eq(resources.ownerId,ownerId)),db.select({drafts:workspaces.drafts}).from(workspaces).where(eq(workspaces.ownerId,ownerId))]);
 const titles=await db.select({id:threadRows.id,title:threadRows.title,metadata:threadRows.metadata}).from(threadRows).where(and(eq(threadRows.ownerId,ownerId),sql`coalesce(${threadRows.metadata}->>'purged','false') <> 'true'`)).orderBy(sql`${threadRows.updatedAt} desc`).limit(101);
 return {resources:rows.map(r=>r.data).filter(r=>!r.deleted),threads:titles.slice(0,100).map(r=>({...r.metadata,id:r.id,title:r.title,messages:[],_loaded:false})),hasMoreThreads:titles.length>100,drafts:workspace?.drafts||{}};
}
export async function saveResources(ownerId:string,items:Resource[],executor:Pick<ReturnType<typeof getDb>,'insert'>=getDb()) {
 if(!items.length)return;
 await executor.insert(resources).values(items.map(r=>({ownerId,id:r.id,title:r.title,searchText:resourceText(r),data:r}))).onConflictDoUpdate({target:[resources.ownerId,resources.id],set:{title:sql`excluded.title`,searchText:sql`excluded.search_text`,data:sql`case
 when ${resources.data} ? 'image' and (
   not (excluded.data ? 'image') or
   coalesce(${resources.data}->'media'->>'capturedAt','') > coalesce(excluded.data->'media'->>'capturedAt','')
 ) then excluded.data || jsonb_build_object('image',${resources.data}->'image','media',${resources.data}->'media')
 else excluded.data end || case when ${resources.data}->>'deleted' = 'true' then '{"deleted":true}'::jsonb else '{}'::jsonb end`,updatedAt:new Date()}});
}
export async function searchResources(ownerId:string,query:string,kind?:string) {
 const terms=query.trim().slice(0,300);
 const conditions=[eq(resources.ownerId,ownerId),sql`coalesce(${resources.data}->>'deleted','false') <> 'true'`];
 if(terms) conditions.push(sql`to_tsvector('simple', ${resources.searchText}) @@ plainto_tsquery('simple', ${terms})`);
 if(kind) conditions.push(sql`${resources.data}->>'kind' = ${kind}`);
 return (await getDb().select().from(resources).where(and(...conditions)).limit(20)).map(r=>r.data);
}

export async function saveThreads(ownerId:string,items:unknown[],executor:Pick<ReturnType<typeof getDb>,'insert'>=getDb()){
 const valid=items.filter((item):item is Record<string,unknown>=>!!item&&typeof item==='object'&&typeof (item as Record<string,unknown>).id==='string'&&typeof (item as Record<string,unknown>).title==='string');
 for(const loaded of [false,true]){
  const batch=valid.filter(t=>(t._loaded!==false)===loaded);if(!batch.length)continue;
  await executor.insert(threadRows).values(batch.map(t=>{const {messages,_loaded,...metadata}=t;return {ownerId,id:t.id as string,title:t.title as string,metadata,messages:Array.isArray(messages)?messages:[]}})).onConflictDoUpdate({target:[threadRows.ownerId,threadRows.id],set:{title:sql`excluded.title`,metadata:sql`excluded.metadata`,...(loaded?{messages:sql`excluded.messages`}:{}),updatedAt:new Date()},setWhere:loaded?sql`coalesce(${threadRows.metadata}->>'purged','false') <> 'true' AND (${threadRows.metadata} is distinct from excluded.metadata OR ${threadRows.messages} is distinct from excluded.messages OR ${threadRows.title} is distinct from excluded.title)`:sql`coalesce(${threadRows.metadata}->>'purged','false') <> 'true' AND (${threadRows.metadata} is distinct from excluded.metadata OR ${threadRows.title} is distinct from excluded.title)`});
 }
}
