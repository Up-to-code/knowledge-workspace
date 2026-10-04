import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth/server';
import WorkspaceClient from '../workspace-client';

export const metadata: Metadata = {
  title: 'Library — Knowledge workspace',
  description: 'Your saved sources, notes, files, and editorial drafts.',
};

export default async function AppPage() {
  const {data:session,error}=await getAuth().getSession();
  if(error || !session?.user) redirect('/auth/sign-in');
  const {id,name,email,emailVerified}=session.user;
  return <WorkspaceClient user={{id,name,email,emailVerified}} />;
}
