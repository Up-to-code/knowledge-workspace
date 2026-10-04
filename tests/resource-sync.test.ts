import test from 'node:test';
import assert from 'node:assert/strict';
import {mergeCloudResources} from '../src/lib/resource-sync';
import type {Resource} from '../src/data/resources';
const resource={id:'source',title:'Original',sections:[],tags:[]} as unknown as Resource;
test('repeated merges retain agent screenshots and do not mutate the baseline',()=>{
 const baseline=new Map([[resource.id,JSON.stringify(resource)]]);
 const remote={...resource,image:'data:image/jpeg;base64,actual-capture'};
 assert.deepEqual(mergeCloudResources([resource],[remote],baseline),[remote]);
 assert.deepEqual(mergeCloudResources([resource],[remote],baseline),[remote]);
 assert.equal(baseline.get(resource.id),JSON.stringify(resource));
});
test('unsaved local edits survive a cloud refresh',()=>{
 const baseline=new Map([[resource.id,JSON.stringify(resource)]]);
 const edited={...resource,title:'My edit'};
 assert.deepEqual(mergeCloudResources([edited],[resource],baseline),[edited]);
});

test('a stale tab editing notes keeps a newer agent screenshot',()=>{
 const baseline=new Map([[resource.id,JSON.stringify(resource)]]);
 const edited={...resource,title:'My edit'};
 const remote={...resource,image:'new-screenshot',media:{kind:'screenshot' as const,sourceUrl:'https://example.com',caption:'Actual capture',capturedAt:'2026-10-05T00:00:00.000Z'}};
 assert.deepEqual(mergeCloudResources([edited],[remote],baseline),[{...edited,image:remote.image,media:remote.media}]);
});
