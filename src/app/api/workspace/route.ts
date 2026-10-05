import { requireUser } from '@/lib/auth/server';
import { readWorkspace,saveResources,saveThreads } from '@/lib/db/workspace';
import { getDb } from '@/lib/db';
import { workspaces } from '@/lib/db/schema';
import { failure,checkOrigin } from '@/lib/http';
import { resourceSchema } from '@/lib/resource-schema';
import { z } from 'zod';
export async function GET() {try {const u=await requireUser();return Response.json(await readWorkspace(u.id));}catch(e){return failure(e)}}
export async function PUT(request:Request) {try {checkOrigin(request);const u=await requireUser();const data=z.object({resources:z.array(resourceSchema).max(1000),threads:z.array(z.unknown()).max(1000),drafts:z.record(z.string(),z.string().max(100000))}).parse(await request.json());
 await getDb().transaction(async tx=>{await tx.insert(workspaces).values({ownerId:u.id,threads:[],drafts:data.drafts}).onConflictDoUpdate({target:workspaces.ownerId,set:{drafts:data.drafts,updatedAt:new Date()}});await saveResources(u.id,data.resources,tx);await saveThreads(u.id,data.threads,tx)});
return Response.json({saved:true});}catch(e){return failure(e)}}
