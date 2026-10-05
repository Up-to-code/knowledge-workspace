import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPublicAddress,publicTarget,extractSource,readSource } from '../src/lib/sources';
import { isZeroPrice,freeCatalog,resolveFreeModel } from '../src/lib/free-models';
test('source capture rejects private, mapped, reserved, and credential URLs',async()=>{
 for(const ip of ['127.0.0.1','10.0.0.1','192.168.1.2','169.254.169.254','172.16.1.2','::1','fc00::1','fe80::1','::ffff:127.0.0.1','0.0.0.0'])assert.equal(isPublicAddress(ip),false,ip);
 assert.equal(isPublicAddress('1.1.1.1'),true);
 for(const url of ['http://127.0.0.1','http://[::1]','http://[::ffff:127.0.0.1]','file:///etc/passwd','https://example.com:3000','https://name:password@example.com']) await assert.rejects(publicTarget(url));
});
test('source extraction preserves evidence and resolves included links',()=>{
 const result=extractSource('<html><head><title>Research model</title><meta name="description" content="Publisher description"></head><body><nav>Ignore navigation</nav><article>Source says it transcribes speech.<a href="/setup">Setup</a><script>doNotRun()</script></article></body></html>','https://example.com/model');
 assert.equal(result.image,undefined);assert.equal(result.title,'Research model');assert.deepEqual(result.links,['https://example.com/setup']);assert.match(result.text,/transcribes speech/);assert.doesNotMatch(result.text,/doNotRun|Ignore navigation/);
});
test('free price filter rejects hidden fees and missing prices',()=>{
 assert.equal(isZeroPrice({prompt:'0',completion:'0',request:'0'}),true);
 assert.equal(isZeroPrice({prompt:'0',completion:'0',web_search:'0.01'}),false);
 assert.equal(isZeroPrice({prompt:'0.001',completion:'0'}),false);
 assert.equal(isZeroPrice({}),false);assert.equal(isZeroPrice(undefined),false);
});
test('public fetching and current free catalog work',{timeout:30000},async()=>{
 const source=await readSource('https://example.com');assert.match(source.title,/Example Domain/);assert.ok(source.text.length>30);
 const models=await freeCatalog();assert.ok(models.length>0);assert.ok(models.some(m=>m.tools));
 await assert.rejects(resolveFreeModel('paid-model'),/Configure|not a verified free/);
});
test('hosted adapter sends a zero-price policy through the SDK',async t=>{
 const models=await freeCatalog();const selected=models.find(m=>m.tools)!;
 const previousKey=process.env.OPENROUTER_API_KEY;
 process.env.OPENROUTER_API_KEY='test-key-not-a-real-credential';
 let requests=0;
 t.mock.method(globalThis,'fetch',async (url:unknown,init?:RequestInit)=>{
  assert.equal(String(url),'https://openrouter.ai/api/v1/chat/completions');
  const body=JSON.parse(String(init?.body));
  assert.equal(body.model,selected.id);
  assert.equal(body.provider.allow_fallbacks,false);
  assert.equal(body.provider.require_parameters,true);
  assert.deepEqual(body.provider.max_price,{prompt:0,completion:0,image:0,request:0});
  requests++;
  return Response.json({id:'test',object:'chat.completion',created:0,model:selected.id,choices:[{index:0,message:{role:'assistant',content:'ok'},finish_reason:'stop'}],usage:{prompt_tokens:1,completion_tokens:1,total_tokens:2}});
 });
 try {
  const {generateText}=await import('ai');
  const result=await generateText({model:await resolveFreeModel(selected.id,true),prompt:'Test the request policy',maxRetries:0});
  assert.equal(result.text,'ok');assert.equal(requests,1);
 }finally{if(previousKey===undefined)delete process.env.OPENROUTER_API_KEY;else process.env.OPENROUTER_API_KEY=previousKey;}
});

test('article extraction preserves paragraph and code boundaries',()=>{
 const source=extractSource('<main><div>Page chrome</div><article><h1>Setup</h1><p>First paragraph.</p><p>Second paragraph.</p><pre>install tool\nrun tool</pre></article></main>','https://example.com/setup');
 assert.match(source.text,/Setup\n\nFirst paragraph\.\n\nSecond paragraph\./);
 assert.match(source.text,/install tool\nrun tool/);
 assert.doesNotMatch(source.text,/Page chrome/);
});
