import { agentResponseHeaders } from '@/lib/agent-transport';
import { SignJWT } from 'jose';
import { z } from 'zod';
import { and,eq } from 'drizzle-orm';
import { requireUser } from '@/lib/auth/server';
import { getDb } from '@/lib/db';
import { agentSessions } from '@/lib/db/schema';
import { failure,checkOrigin } from '@/lib/http';
export const maxDuration=120;
async function handle(request:Request,{params}:{params:Promise<{path:string[]}>}) {
 try {checkOrigin(request);const user=await requireUser();const {path}=await params;
 if(path[0]!=='eve'||path[1]!=='v1'||path[2]!=='session'||path.length>5)throw new Error('Invalid agent route');
 const sessionId=path[3];if(sessionId){const [record]=await getDb().select().from(agentSessions).where(and(eq(agentSessions.id,sessionId),eq(agentSessions.ownerId,user.id)));if(!record)return Response.json({error:'Session not found'},{status:404});}
 const secret=process.env.AGENT_TOKEN_SECRET;if(!secret)throw new Error('Agent is not configured');
 const contextIds=z.array(z.string().min(1).max(100)).max(20).parse(JSON.parse(request.headers.get('x-knowledge-context')||'[]'));
 const token=await new SignJWT({contextIds,model:request.headers.get('x-knowledge-model')||undefined}).setProtectedHeader({alg:'HS256'}).setSubject(user.id).setIssuer('knowledge-workspace').setAudience('eve').setIssuedAt().setExpirationTime('5m').sign(new TextEncoder().encode(secret));
 const origin=process.env.APP_ORIGIN||(process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:'http://127.0.0.1:5173');
 const url=new URL(`/${path.join('/')}`,origin);url.search=new URL(request.url).search;
 const response=await fetch(url,{method:request.method,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:request.method==='GET'?undefined:await request.text(),signal:request.signal});
 if(!sessionId&&response.ok){const data=await response.json();if(!data.sessionId)throw new Error('Agent returned no session ID');await getDb().insert(agentSessions).values({id:data.sessionId,ownerId:user.id}).onConflictDoNothing();return Response.json(data,{status:response.status,headers:agentResponseHeaders(response)});}
 return new Response(response.body,{status:response.status,headers:agentResponseHeaders(response)});
 }catch(e){console.error("Agent proxy failed", e instanceof Error?e.message:"Unknown error", e instanceof Error&&e.cause&&typeof e.cause==="object"&&"code" in e.cause?e.cause.code:undefined);return failure(e)}
}
export {handle as GET,handle as POST};
