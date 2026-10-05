'use client';
import { useEffect,type ReactNode } from 'react';
import { AssistantRuntimeProvider,useExternalStoreRuntime,type ThreadMessageLike } from '@assistant-ui/react';
import type { AgentMessage } from './AgentBridge';
const convertMessage=(message:AgentMessage):ThreadMessageLike=>({id:message.id,role:message.role,content:[{type:'text',text:message.text}]});
export function EveUIRuntime({messages,busy,text,onSend,onCancel,children}:{messages:AgentMessage[];busy:boolean;text?:string;onSend:(text:string)=>Promise<void>;onCancel:()=>Promise<void>;children:ReactNode}) {
 const runtime=useExternalStoreRuntime({messages,isRunning:busy,convertMessage,onNew:async message=>{const input=message.content.filter(p=>p.type==='text').map(p=>p.type==='text'?p.text:'').join('\n');if(input.trim())await onSend(input)},onCancel});
 useEffect(()=>{if(text!==undefined&&runtime.thread.composer.getState().text!==text)runtime.thread.composer.setText(text)},[runtime,text]);
 return <AssistantRuntimeProvider runtime={runtime}>{children}</AssistantRuntimeProvider>;
}
