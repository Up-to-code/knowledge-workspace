import { freeCatalog,localModels } from '@/lib/free-models';
export async function GET() {
 const [remote,local]=await Promise.allSettled([freeCatalog(),localModels()]);
 const models=[...(local.status==='fulfilled'?local.value:[]),...(remote.status==='fulfilled'?remote.value:[])];
 const verified=(id:string|undefined,tools=false,vision=false,structured=false)=>models.find(m=>m.id===id&&(!tools||m.tools)&&(!vision||m.vision)&&(!structured||m.structured))?.id;
 const modelRoles={agent:verified(process.env.AGENT_MODEL,true),extractor:verified(process.env.EXTRACTOR_MODEL,false,false,true),writer:verified(process.env.WRITER_MODEL),vision:verified(process.env.VISION_MODEL,false,true,true)};
 return Response.json({models,modelRoles,hostedConfigured:!!process.env.OPENROUTER_API_KEY,localConfigured:!!process.env.OLLAMA_MODEL,authConfigured:!!process.env.NEON_AUTH_BASE_URL,databaseConfigured:!!process.env.DATABASE_URL,agentConfigured:!!process.env.AGENT_TOKEN_SECRET,notice:remote.status==='rejected'?'Free model catalog unavailable':undefined},{headers:{'Cache-Control':'no-store'}});
}
