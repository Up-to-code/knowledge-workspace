import { defineTool } from 'eve/tools';
import { z } from 'zod';
import { readSource } from '../../src/lib/sources';
export default defineTool({description:'Read up to three public source URLs concurrently, extracting actual text, metadata, original image URL and linked pages. Local/private network URLs are blocked.',inputSchema:z.object({urls:z.array(z.string().url()).min(1).max(3)}),async execute({urls}){const results=await Promise.allSettled(urls.map(readSource));return results.map((r,i)=>({url:urls[i],...(r.status==='fulfilled'?{source:{...r.value,text:r.value.text.slice(0,8000)}}:{error:String(r.reason)})}));}});
