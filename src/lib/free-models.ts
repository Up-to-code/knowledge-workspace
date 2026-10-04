import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
export type FreeModel={id:string;name:string;vision:boolean;tools:boolean;structured?:boolean};
let cached:{expires:number;models:FreeModel[]}|undefined;
export function isZeroPrice(pricing:Record<string,string|number>|undefined) {return !!pricing && pricing.prompt!==undefined && pricing.completion!==undefined && ['prompt','completion','request','image','web_search','internal_reasoning'].every(key=>Number(pricing[key]??0)===0) && Object.values(pricing).every(value=>Number(value)===0);}
export async function freeCatalog():Promise<FreeModel[]> {
 if(cached&&cached.expires>Date.now())return cached.models;
 const response=await fetch('https://openrouter.ai/api/v1/models',{signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new Error('Free model catalog is unavailable');
 const {data}=await response.json();
 const models=(data as Array<{id:string;name:string;pricing:Record<string,string>;architecture?:{input_modalities?:string[];output_modalities?:string[]};supported_parameters?:string[]}>).filter(m=>isZeroPrice(m.pricing)&&(!m.architecture?.output_modalities||m.architecture.output_modalities.includes('text'))).map(m=>({id:m.id,name:m.name,vision:!!m.architecture?.input_modalities?.includes('image'),tools:!!m.supported_parameters?.includes('tools'),structured:!!m.supported_parameters?.includes('structured_outputs')}));
 cached={expires:Date.now()+60000,models};return models;
}
export async function localModels():Promise<FreeModel[]> {
 if(!process.env.OLLAMA_MODEL)return [];
 const base=(process.env.OLLAMA_BASE_URL||'http://127.0.0.1:11434/v1').replace(/\/v1\/?$/,'');
 try {const response=await fetch(`${base}/api/tags`,{signal:AbortSignal.timeout(1500)});const {models}=await response.json();return Promise.all(models.slice(0,12).map(async(m:{name:string})=>{const details=await fetch(`${base}/api/show`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:m.name}),signal:AbortSignal.timeout(2000)}).then(r=>r.json());return {id:`ollama:${m.name}`,name:m.name,vision:details.capabilities?.includes('vision')||false,tools:details.capabilities?.includes('tools')||false}}));}catch{return []}
}
export async function resolveFreeModel(requested?:string,needsTools=false,needsVision=false,needsStructured=false) {
 const selected=requested||(needsTools?process.env.AGENT_MODEL:undefined);
 if(selected?.startsWith('ollama:') || (!selected&&process.env.OLLAMA_MODEL)) {
 const model=selected?.replace('ollama:','')||process.env.OLLAMA_MODEL!;
 const available=await localModels();if(!available.some(m=>m.id===`ollama:${model}`&&(!needsTools||m.tools)&&(!needsVision||m.vision)))throw new Error('Configured Ollama model is unavailable');
 return createOpenAICompatible({name:'ollama',baseURL:process.env.OLLAMA_BASE_URL||'http://127.0.0.1:11434/v1',supportsStructuredOutputs:true}).chatModel(model);
 }
 if(!process.env.OPENROUTER_API_KEY)throw new Error('Configure a free model: set OPENROUTER_API_KEY or run Ollama locally.');
 const models=await freeCatalog();const model=selected?models.find(m=>m.id===selected):models.find(m=>(!needsTools||m.tools)&&(!needsVision||m.vision)&&(!needsStructured||m.structured));
 if(!model || (needsTools&&!model.tools)||(needsVision&&!model.vision)||(needsStructured&&!model.structured))throw new Error('Selected model is not a verified free model with the required capabilities.');
 return createOpenAICompatible({name:'openrouter-free',supportsStructuredOutputs:!!model.structured,baseURL:'https://openrouter.ai/api/v1',headers:{Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`},transformRequestBody:body=>({...body,provider:{allow_fallbacks:false,require_parameters:true,max_price:{prompt:0,completion:0,image:0,request:0}}})}).chatModel(model.id);
}
