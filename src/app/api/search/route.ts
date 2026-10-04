import { requireUser } from '@/lib/auth/server';
import { searchResources } from '@/lib/db/workspace';
import { failure } from '@/lib/http';
export async function GET(request:Request){try {const user=await requireUser();const url=new URL(request.url);return Response.json({resources:await searchResources(user.id,url.searchParams.get('q')||'',url.searchParams.get('kind')||undefined)});}catch(e){return failure(e)}}
