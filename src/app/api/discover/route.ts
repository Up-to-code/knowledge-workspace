import { modelUpdates,paperUpdates } from '@/lib/discover';
export async function GET(request:Request){
 const params=new URL(request.url).searchParams;const kind=params.get('kind')||'research';const page=Number(params.get('page')||0);const size=12;
 if(!['models','research'].includes(kind)||!Number.isInteger(page)||page<0||page>100)return Response.json({error:'Invalid feed request'},{status:400});
 try{const endpoint=kind==='models'?'https://openrouter.ai/api/v1/models':`https://huggingface.co/api/daily_papers?sort=publishedAt&p=${page}&limit=${size}`;
 const response=await fetch(endpoint,{next:{revalidate:900},signal:AbortSignal.timeout(12000)});if(!response.ok)throw new Error('Source unavailable');const data=await response.json();
 if(kind==='models'){if(!Array.isArray(data.data))throw new Error('Invalid source response');const rows=modelUpdates(data.data);return Response.json({items:rows.slice(page*size,(page+1)*size),hasMore:rows.length>(page+1)*size});}
 if(!Array.isArray(data))throw new Error('Invalid source response');return Response.json({items:paperUpdates(data),hasMore:data.length===size});
 }catch{return Response.json({error:'Updates could not load. Try again.'},{status:502});}
}
