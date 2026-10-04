export function agentResponseHeaders(response:Response) {
 const headers=new Headers({'Content-Type':response.headers.get('content-type')||'application/json','Cache-Control':'no-store'});
 for(const name of ['x-eve-session-id','x-eve-stream-format','x-eve-stream-tail-index','x-eve-stream-version']){const value=response.headers.get(name);if(value)headers.set(name,value)}
 return headers;
}
