import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import ipaddr from 'ipaddr.js';
import { Agent, fetch as fetchPublic } from 'undici';
import { load } from 'cheerio';
export function isPublicAddress(address:string) {
 try { return ipaddr.process(address).range()==='unicast'; } catch {return false;}
}
export async function publicTarget(input:string) {
 const url=new URL(input);
 if(!['http:','https:'].includes(url.protocol)||url.username||url.password||!['','80','443'].includes(url.port)) throw new Error('Only public HTTP/HTTPS source URLs are supported.');
 const host=url.hostname.replace(/^\[|\]$/g,'');
 const addresses=isIP(host)?[{address:host,family:isIP(host)}]:await lookup(host,{all:true});
 if(!addresses.length || addresses.some(a=>!isPublicAddress(a.address)))throw new Error('Private and local network URLs are blocked.');
 return {url,addresses};
}
export async function safeFetch(input:string,maxBytes=1500000) {
 let current=input;
 for(let redirects=0;redirects<5;redirects++) {
 const {url,addresses}=await publicTarget(current);
 const pinned=addresses[0];
 const agent=new Agent({connect:{lookup(_host,options,callback){
 if(typeof options==='object' && options.all) callback(null,addresses as never);
 else callback(null,pinned.address,pinned.family);
 }}});
 try {
 const response=await fetchPublic(url,{dispatcher:agent,redirect:'manual',signal:AbortSignal.timeout(12000),headers:{'User-Agent':'KnowledgeWorkspace/1.0 (source capture)','Accept':'text/html,text/plain,application/json'}});
 if([301,302,303,307,308].includes(response.status)){const location=response.headers.get('location');if(!location)throw new Error('Redirect without destination');await response.body?.cancel();current=new URL(location,url).href;continue;}
 if(!response.ok)throw new Error(`Source returned HTTP ${response.status}. Paste its text or upload a screenshot.`);
 const reader=response.body?.getReader();if(!reader)throw new Error('Empty source response');
 const chunks:Uint8Array[]=[];let length=0;
 for(;;){const part=await reader.read();if(part.done)break;length+=part.value.byteLength;if(length>maxBytes){await reader.cancel();throw new Error('Source exceeds the 1.5 MB limit');}chunks.push(part.value);}
 return {url:url.href,text:Buffer.concat(chunks).toString('utf8'),contentType:response.headers.get('content-type')||''};
 } finally {await agent.close();}
 }
 throw new Error('Too many redirects');
}
export function extractSource(html:string,url:string) {
 const $=load(html); $('script,style,nav,footer,noscript,svg').remove();
 const absolute=(value:string|undefined)=>{if(!value)return undefined;try { const u=new URL(value||'',url);return ['http:','https:'].includes(u.protocol)?u.href:undefined;}catch{return undefined}};
 const links=[...new Set($('a[href]').map((_,el)=>absolute($(el).attr('href'))).get().filter(Boolean))].filter(link=>link!==url).slice(0,40);
 $('br').replaceWith('\n');
 $('p,h1,h2,h3,h4,li,pre,blockquote,section,div').each((_,el)=>{$(el).prepend('\n\n').append('\n\n');});
 const text=($('article').first().text()||$('main').first().text()||$('body').text()).replace(/[ \t]+/g,' ').replace(/ *\n */g,'\n').replace(/\n{3,}/g,'\n\n').trim().slice(0,60000);
 return {url,title:($('meta[property="og:title"]').attr('content')||$('title').text()||new URL(url).hostname).trim().slice(0,500),description:($('meta[name="description"]').attr('content')||$('meta[property="og:description"]').attr('content')||'').slice(0,2000),image:absolute($('meta[property="og:image"]').attr('content')),author:$('meta[name="author"]').attr('content')||new URL(url).hostname,text,links};
}
export async function readSource(url:string) {
 const result=await safeFetch(url);
 if(!/html|text|json/.test(result.contentType))throw new Error('Use file upload for this source type.');
 const source=/html/.test(result.contentType)?extractSource(result.text,result.url):{url:result.url,title:new URL(result.url).hostname,description:'',image:undefined as string|undefined,author:new URL(result.url).hostname,text:result.text.slice(0,60000),links:[...new Set(result.text.match(/https?:\/\/[^\s<>"']+/g)||[])].slice(0,40)};
 if(source.image){try{await publicTarget(source.image)}catch{source.image=undefined}}
 return source;
}
