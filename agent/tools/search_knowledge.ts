import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { searchResources } from '../../src/lib/db/workspace';
export default defineTool({description:'Search and filter the signed-in user’s saved resources, full notes, source text and uploaded files.',inputSchema:z.object({query:z.string().max(300),kind:z.string().optional()}),async execute(input,ctx){const user=ctx.session.auth.current?.principalId;if(!user)throw new Error('Unauthorized');return (await searchResources(user,input.query,input.kind)).map(r=>({id:r.id,title:r.title,url:r.url,kind:r.kind,tags:r.tags,summary:r.summary.slice(0,1200)}))}});
