export function toolResourceIds(value:unknown):string[] {
 const ids=new Set<string>();
 function visit(v:unknown,depth:number){if(depth>6||!v||typeof v!=='object')return;if(Array.isArray(v)){v.forEach(x=>visit(x,depth+1));return;}const o=v as Record<string,unknown>;for(const key of ['resourceId','id'])if(typeof o[key]==='string'&&/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(o[key]))ids.add(o[key] as string);for(const key of ['resources','resource','results'])visit(o[key],depth+1);}
 visit(value,0);return [...ids];
}
