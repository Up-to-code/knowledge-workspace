"use client";
import { useEveAgent } from 'eve/react';
import { useEffect,useRef } from 'react';
export type AgentMessage={id:string;role:'user'|'assistant';text:string;tools?:{id:string;name:string;state:string}[]};
export type AgentControls={send:(text:string)=>Promise<void>;cancel:()=>Promise<void>};
export function AgentBridge({model,contextIds,sessionId,onUpdate,onControls}:{model:string;contextIds:string[];sessionId?:string;onUpdate:(data:{messages:AgentMessage[];sessionId?:string;busy:boolean;error?:string})=>void;onControls:(controls:AgentControls|null)=>void}) {
 const lastUpdate=useRef('');
 const currentModel=useRef(model);currentModel.current=model;
 const currentContext=useRef(contextIds);currentContext.current=contextIds;
 const agent=useEveAgent({host:'/api/agent',initialSession:sessionId?{sessionId,streamIndex:0}:undefined,resume:!!sessionId,headers:()=>({'x-knowledge-model':currentModel.current,'x-knowledge-context':JSON.stringify(currentContext.current)})});
 useEffect(()=>{onControls({send:async text=>{await agent.send(text)},cancel:async()=>{await agent.cancel()}});return()=>onControls(null)},[agent.send,agent.cancel,onControls]);
 useEffect(()=>{const update={messages:agent.data.messages.filter(m=>m.role==='user'||m.role==='assistant').map(m=>({id:m.id,role:m.role as 'user'|'assistant',tools:m.parts.filter(p=>p.type==='dynamic-tool').map(p=>({id:p.toolCallId,name:p.toolName,state:p.state})),text:m.parts.filter(p=>p.type==='text').map(p=>p.type==='text'?p.text:'').join('\n')})),sessionId:agent.session?.sessionId,busy:agent.status==='submitted'||agent.status==='streaming'||agent.status==='resuming',error:agent.error?.message||latestFailure(agent.events)};const signature=JSON.stringify(update);if(signature!==lastUpdate.current){lastUpdate.current=signature;onUpdate(update)}},[agent.data.messages,agent.session?.sessionId,agent.status,agent.error,agent.events,onUpdate]);
 return null;
}

function latestFailure(events:ReturnType<typeof useEveAgent>['events']) {
 for(let i=events.length-1;i>=0;i--){const event=events[i];if(event.type==='turn.failed')return event.data.code==='MODEL_CALL_FAILED'?'The free model could not complete this request. Try again or select another free model.':event.data.message;if(['turn.completed','turn.cancelled','message.received'].includes(event.type))return undefined}
}
