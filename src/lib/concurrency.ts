let active=0;
const waiters:Array<()=>void>=[];
export async function withModelSlot<T>(fn:()=>Promise<T>):Promise<T>{
 if(active>=3)await new Promise<void>(resolve=>waiters.push(resolve));else active++;
 try{return await fn()}finally{const next=waiters.shift();if(next)next();else active--;}
}
