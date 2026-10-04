import type {Resource} from '../data/resources';
/** Keep new source media when an older browser copy edits other fields. */
export function preserveLatestMedia(local:Resource,cloud:Resource) {
 if(cloud.image&&(!local.image||(cloud.media?.capturedAt||'')>(local.media?.capturedAt||'')))return {...local,image:cloud.image,media:cloud.media};
 return local;
}
/** Pure merge: React may evaluate updates more than once during development. */
export function mergeCloudResources(current:Resource[],cloud:Resource[],baseline:ReadonlyMap<string,string>) {
 const cloudById=new Map(cloud.map(resource=>[resource.id,resource]));
 const edited=current.filter(resource=>baseline.get(resource.id)!==JSON.stringify(resource)).map(resource=>{const remote=cloudById.get(resource.id);return remote?preserveLatestMedia(resource,remote):resource});
 const editedIds=new Set(edited.map(resource=>resource.id));
 return [...edited,...cloud.filter(resource=>!editedIds.has(resource.id))];
}
