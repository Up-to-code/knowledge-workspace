import { requireUser } from '@/lib/auth/server';
import { saveResources } from '@/lib/db/workspace';
import { ingestLinks } from '@/lib/ingest';
import type { Resource } from '@/data/resources';
import { failure,checkOrigin } from '@/lib/http';
export const maxDuration=120;
export async function POST(request:Request){try {checkOrigin(request);const user=await requireUser();const form=await request.formData();const file=form.get('file');if(!(file instanceof File))throw new Error('Choose a file');if(file.size>2*1024*1024)throw new Error('Choose a file under 2 MB');
 if(['image/png','image/jpeg','image/webp','image/gif'].includes(file.type)){
 const resource:Resource={id:crypto.randomUUID(),title:file.name,subtitle:'Uploaded image',summary:'Original image uploaded from your device.',url:'',domain:'Uploaded file',kind:'Image resource',cover:'image',tags:['Uploaded image'],author:user.name,status:'Needs review',saved:new Date().toISOString(),editorial:'',sections:[{title:'File',paragraphs:[file.name]}],related:[],starred:false,image:`data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString('base64')}`};await saveResources(user.id,[resource]);return Response.json({resources:[resource],warnings:[]});}
 if(!/\.(txt|md|mdx|json|csv|html|ts|tsx|js|jsx|py|yaml|yml|log|c|cpp|h|hpp|rs|go|sh|toml|ini|css|sql)$/i.test(file.name))throw new Error('Supported files: images, text, Markdown, JSON, CSV, HTML and source code.');
 const result=await ingestLinks({text:await file.text(),title:file.name,followLinks:form.get('followLinks')==='true',model:String(form.get('model')||'')||undefined});await saveResources(user.id,result.resources);return Response.json(result);
 }catch(e){return failure(e)}}
