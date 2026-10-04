import { getAuth } from '@/lib/auth/server';
import { failure } from '@/lib/http';
async function handle(request:Request,context:{params:Promise<{path:string[]}>}) {
 try { const handler=getAuth().handler(); const method=request.method as keyof typeof handler; return await handler[method](request,context); } catch(e) {return failure(e)}
}
export {handle as GET,handle as POST,handle as PUT,handle as PATCH,handle as DELETE};
