import { eveChannel } from 'eve/channels/eve';
import { type AuthFn } from 'eve/channels/auth';
import { jwtVerify } from 'jose';
import { eq,and } from 'drizzle-orm';
import { getDb } from '../../src/lib/db';
import { agentSessions } from '../../src/lib/db/schema';
const authenticate:AuthFn<Request>=async request=>{
 const secret=process.env.AGENT_TOKEN_SECRET;if(!secret)return null;
 const token=request.headers.get('authorization')?.replace(/^Bearer /,'');if(!token)return null;
 try {const {payload}=await jwtVerify(token,new TextEncoder().encode(secret),{issuer:'knowledge-workspace',audience:'eve',algorithms:['HS256']});
 if(!payload.sub)return null;
 const sessionId=new URL(request.url).pathname.match(/\/session\/([^/]+)/)?.[1];
 if(sessionId){const [record]=await getDb().select().from(agentSessions).where(and(eq(agentSessions.id,sessionId),eq(agentSessions.ownerId,payload.sub)));if(!record)return null;}
 return {principalId:payload.sub,principalType:'user',authenticator:'neon-app',attributes:{contextIds:Array.isArray(payload.contextIds)?payload.contextIds.filter((id):id is string=>typeof id==='string').slice(0,20):[],model:typeof payload.model==='string'?payload.model:''}};
 }catch{return null}
};
export default eveChannel({auth:authenticate});
