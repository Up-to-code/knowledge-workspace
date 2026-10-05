'use client';
import {useState} from 'react';
import type {FreeModel} from '../lib/free-models';
export function ModelPicker({models,value,onSelect,onSettings}:{models?:FreeModel[];value:string;onSelect:(id:string)=>void;onSettings:()=>void}){
 const [query,setQuery]=useState(''),[provider,setProvider]=useState('All');
 const available=(models||[]).filter(m=>m.tools);const providers=['All',...new Set(available.map(m=>m.name.split(':')[0]).filter(p=>p.length<24))];
 return <div className="model-picker" onClick={e=>e.stopPropagation()}><input autoFocus aria-label="Search models" placeholder="Find a model" value={query} onChange={e=>setQuery(e.target.value)} className="model-search"/><div className="model-picker-body"><nav aria-label="Model providers">{providers.map(p=><button type="button" key={p} aria-pressed={provider===p} onClick={()=>setProvider(p)}>{p}</button>)}</nav><div className="model-results">{!models&&<p role="status">Loading models…</p>}{available.filter(m=>(provider==='All'||m.name.split(':')[0]===provider)&&m.name.toLowerCase().includes(query.toLowerCase())).map(m=><button type="button" key={m.id} aria-pressed={value===m.id} onClick={()=>onSelect(m.id)}><span>{m.name.replace(/\s*\(free\)/gi,'').split(':').slice(-1)[0].trim()}</span><small>{m.name.includes(':')?m.name.split(':')[0]:'Router'}{m.vision?' · Vision':''}</small></button>)}</div></div><button type="button" className="model-settings" onClick={onSettings}>Model settings</button></div>
}
