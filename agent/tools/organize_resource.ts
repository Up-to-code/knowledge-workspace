import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { and,eq } from 'drizzle-orm';
import { getDb } from '../../src/lib/db';
import { resources } from '../../src/lib/db/schema';
import { saveResources } from '../../src/lib/db/workspace';
export default defineTool({description:'Update the tags and optional Markdown research notes of an existing resource after reading its evidence. Use specific source-supported tags; preserve original source and media.',inputSchema:z.object({resourceId:z.string(),tags:z.array(z.string().min(1).max(100)).min(1).max(20),notes:z.string().max(20000).optional()}),async execute({resourceId,tags,notes},ctx){const user=ctx.session.auth.current?.principalId;if(!user)throw new Error('Unauthorized');const [row]=await getDb().select().from(resources).where(and(eq(resources.ownerId,user),eq(resources.id,resourceId)));if(!row||row.data.deleted)throw new Error('Resource not found');const updated={...row.data,tags:[...new Set(tags.map(t=>t.trim()).filter(Boolean))],sections:notes?[...row.data.sections.filter(s=>s.title!=='Research notes'),{title:'Research notes',paragraphs:[notes]}]:row.data.sections};await saveResources(user,[updated]);return {resourceId,title:updated.title,tags:updated.tags,status:updated.status};}});
