import { and, eq, sql } from 'drizzle-orm';
import { getDb } from './index';
import { resources,workspaces } from './schema';
import { resourceText, type Resource } from '../../data/resources';
export async function readWorkspace(ownerId:string) {
 const db=getDb();
 const [rows,[workspace]]=await Promise.all([db.select().from(resources).where(eq(resources.ownerId,ownerId)),db.select().from(workspaces).where(eq(workspaces.ownerId,ownerId))]);
 return {resources:rows.map(r=>r.data),threads:workspace?.threads||[],drafts:workspace?.drafts||{}};
}
export async function saveResources(ownerId:string,items:Resource[],executor:Pick<ReturnType<typeof getDb>,'insert'>=getDb()) {
 if(!items.length)return;
 await executor.insert(resources).values(items.map(r=>({ownerId,id:r.id,title:r.title,searchText:resourceText(r),data:r}))).onConflictDoUpdate({target:[resources.ownerId,resources.id],set:{title:sql`excluded.title`,searchText:sql`excluded.search_text`,data:sql`case
 when ${resources.data} ? 'image' and (
   not (excluded.data ? 'image') or
   coalesce(${resources.data}->'media'->>'capturedAt','') > coalesce(excluded.data->'media'->>'capturedAt','')
 ) then excluded.data || jsonb_build_object('image',${resources.data}->'image','media',${resources.data}->'media')
 else excluded.data end`,updatedAt:new Date()}});
}
export async function searchResources(ownerId:string,query:string,kind?:string) {
 const terms=query.trim().slice(0,300);
 const conditions=[eq(resources.ownerId,ownerId)];
 if(terms) conditions.push(sql`to_tsvector('simple', ${resources.searchText}) @@ plainto_tsquery('simple', ${terms})`);
 if(kind) conditions.push(sql`${resources.data}->>'kind' = ${kind}`);
 return (await getDb().select().from(resources).where(and(...conditions)).limit(20)).map(r=>r.data);
}
