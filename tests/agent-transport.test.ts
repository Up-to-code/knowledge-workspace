import test from 'node:test';
import assert from 'node:assert/strict';
import {agentResponseHeaders} from '../src/lib/agent-transport';

test('agent proxy preserves the Eve streaming contract without forwarding cookies',()=>{
 const source=new Response(null,{headers:{'content-type':'application/x-ndjson; charset=utf-8','x-eve-stream-version':'26','x-eve-stream-format':'ndjson','x-eve-session-id':'test-session','x-eve-stream-tail-index':'17','set-cookie':'private=value','cache-control':'public'}});
 const headers=agentResponseHeaders(source);
 for(const name of ['content-type','x-eve-stream-version','x-eve-stream-format','x-eve-session-id','x-eve-stream-tail-index'])assert.equal(headers.get(name),source.headers.get(name));
 assert.equal(headers.get('set-cookie'),null);
 assert.equal(headers.get('cache-control'),'no-store');
});
