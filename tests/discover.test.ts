import {test} from 'node:test';
import assert from 'node:assert/strict';
import {modelUpdates,paperUpdates} from '../src/lib/discover';
test('model updates sort source dates and preserve original model links',()=>{const result=modelUpdates([{id:'org/old',created:100,name:'Old'},{id:'org/new',created:200,name:'New'},{id:'broken'}]);assert.equal(result.length,2);assert.equal(result[0].title,'New');assert.equal(result[0].url,'https://openrouter.ai/org/new');assert.equal(result[0].date,new Date(200000).toISOString())});
test('research updates exclude malformed papers and untrusted thumbnail hosts',()=>{const result=paperUpdates([{paper:{id:'2610.00001',title:'Paper',publishedAt:'2026-10-05'},thumbnail:'https://evil.example/cover.jpg'},{title:'Invalid'}]);assert.equal(result.length,1);assert.equal(result[0].image,undefined);assert.equal(result[0].url,'https://huggingface.co/papers/2610.00001')});
