import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { eq,and } from 'drizzle-orm';
import { captureScreenshot } from '../../src/lib/capture';
import { getDb } from '../../src/lib/db';
import { resources } from '../../src/lib/db/schema';
import { saveResources } from '../../src/lib/db/workspace';
export default defineTool({description:'Capture an actual public source page screenshot and attach it to an existing resource owned by the user. Requires local Chromium capture to be enabled. Never creates an invented preview.',inputSchema:z.object({resourceId:z.string()}),async execute({resourceId},ctx){const ownerId=ctx.session.auth.current?.principalId;if(!ownerId)throw new Error('Unauthorized');const [row]=await getDb().select().from(resources).where(and(eq(resources.ownerId,ownerId),eq(resources.id,resourceId)));if(!row?.data.url)throw new Error('Source resource not found');const shot=await captureScreenshot(row.data.url);await saveResources(ownerId,[{...row.data,image:shot.image,media:{kind:'screenshot',sourceUrl:shot.sourceUrl,capturedAt:shot.capturedAt,caption:'Actual source page screenshot'}}]);return {resourceId,sourceUrl:shot.sourceUrl,capturedAt:shot.capturedAt};}});
