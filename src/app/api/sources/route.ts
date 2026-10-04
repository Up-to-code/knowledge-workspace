import { z } from 'zod';
import { requireUser } from '@/lib/auth/server';
import { ingestLinks } from '@/lib/ingest';
import { saveResources } from '@/lib/db/workspace';
import { failure,checkOrigin } from '@/lib/http';
export const maxDuration=120;
export async function POST(request:Request) {try {checkOrigin(request);const u=await requireUser();const input=z.object({url:z.string().url().optional(),text:z.string().max(200000).optional(),title:z.string().max(500).optional(),model:z.string().max(200).optional(),followLinks:z.boolean().default(false)}).refine(v=>v.url||v.text,'Add a URL or source text').parse(await request.json());const result=await ingestLinks(input);await saveResources(u.id,result.resources);return Response.json(result);}catch(e){return failure(e)}}
