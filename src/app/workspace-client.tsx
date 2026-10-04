"use client";
import type { WorkspaceUser } from '@/lib/auth/profile';
import dynamic from 'next/dynamic';
const Workspace = dynamic(()=>import('../components/KnowledgeWorkspace'), {ssr:false, loading:()=> <div className="p-5 text-[#888]">Loading library…</div>});
export default function WorkspaceClient({user}:{user:WorkspaceUser}) { return <Workspace user={user}/>; }
