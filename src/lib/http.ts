import { ZodError } from 'zod';
export function failure(error:unknown) {
 const message=error instanceof Error?error.message:'Request failed';
 const status=message==='Unauthorized'?401:error instanceof ZodError?400:/not configured|Configure|unavailable/.test(message)?503:400;
 return Response.json({error:message},{status,headers:{'Cache-Control':'no-store'}});
}
export function checkOrigin(request:Request) {
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin) throw new Error('Invalid request origin');
}
