import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toolResourceIds } from '../src/lib/agent-resources';
const id='66e2a354-6d2a-4b14-aa56-2b85b378a094';
test('resource cards use IDs from real tool outputs',()=>{assert.deepEqual(toolResourceIds([{id,title:'Model'},{id}]),[id]);assert.deepEqual(toolResourceIds({resources:[{id}]}),[id]);assert.deepEqual(toolResourceIds({resourceId:id}),[id]);assert.deepEqual(toolResourceIds({id:'untrusted text',image:'fake'}),[]);});
