'use client';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth/client';
import { ThemeControl } from '@/components/ThemeControl';
type Mode = 'sign-in' | 'sign-up' | 'reset-request';
export default function SignIn() {
 const [mode,setMode]=useState<Mode>('sign-in'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[name,setName]=useState(''),[error,setError]=useState(''),[notice,setNotice]=useState(''),[pending,setPending]=useState(false),[insecure,setInsecure]=useState(false),[local,setLocal]=useState(false);
 useEffect(()=>{setInsecure(window.location.protocol!=='https:');setLocal(['localhost','127.0.0.1','[::1]'].includes(window.location.hostname));const params=new URLSearchParams(window.location.search);setEmail(params.get('email')||'');if(params.get('mode')==='sign-up')setMode('sign-up');if(params.get('mode')==='reset-request')setMode('reset-request')},[]);
 function choose(next:Mode){setMode(next);setPassword('');setError('');setNotice('');const url=new URL(window.location.href);url.searchParams.set('mode',next);window.history.replaceState(null,'',url)}
 return <main className="mx-auto flex min-h-dvh max-w-[396px] flex-col justify-center px-5 py-12">
  <div className="mb-5 flex items-center justify-between"><a href="/" className="text-[var(--muted)] hover:text-[var(--primary)]">← Home</a><ThemeControl/></div>
  <section className="auth-card rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-6">
   <h1 className="mb-2 text-[19px] font-medium tracking-[-.4px]">{mode==='sign-in'?'Sign in':mode==='sign-up'?'Create account':'Set your password'}</h1>
   <p className="mb-6 text-[12px] leading-5 text-[var(--muted)]">{mode==='reset-request'?'Get a secure link by email to set or reset your password.':'Keep your saved sources and chats in your workspace.'}</p>
   {insecure&&<p role="alert" className="mb-5 text-[12px] leading-5 text-[var(--error)]">Secure sign-in needs HTTPS in Safari. {local?<a className="underline" href="https://localhost:5174/auth/sign-in">Open secure local preview</a>:<span>Open this site over HTTPS to continue.</span>}</p>}
   <form className="flex flex-col gap-4" onSubmit={async e=>{
    e.preventDefault();setPending(true);setError('');setNotice('');
    try {
     const result=mode==='reset-request'?await authClient.requestPasswordReset({email,redirectTo:`${window.location.origin}/auth/reset-password`}):mode==='sign-in'?await authClient.signIn.email({email,password}):await authClient.signUp.email({email,password,name,callbackURL:`${window.location.origin}/auth/sign-in`});
     if(result.error)throw new Error(result.error.message||'Authentication failed');
     if(mode==='reset-request'){setNotice('If this email has an account, a password link will arrive shortly.');return}
     const session=await authClient.getSession({query:{disableCookieCache:true}});
     if(session.error)throw new Error(session.error.message||'Could not confirm your session.');
     if(!session.data?.user){setPassword('');setMode('sign-in');setNotice(mode==='sign-up'?'Your account was created. Sign in to continue. If you received a verification email, open its link first.':'Your browser did not keep the sign-in session. Open the secure HTTPS preview and sign in again.');return}
     window.location.assign('/app');
    }catch(e){setError(e instanceof Error?e.message:'Authentication failed')}finally{setPending(false)}
   }}>
    {mode==='sign-up'&&<label className="space-y-1.5"><span>Name</span><input className="auth-field" aria-label="Name" required autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>}
    <label className="space-y-1.5"><span>Email</span><input className="auth-field" aria-label="Email" type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
    {mode!=='reset-request'&&<label className="space-y-1.5"><span>Password</span><input className="auth-field" aria-label="Password" type="password" required minLength={8} autoComplete={mode==='sign-up'?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters"/></label>}
    {error&&<p role="alert" className="text-[12px] leading-5 text-[var(--error)]">{error}</p>}
    {notice&&<p role="status" className="text-[12px] leading-5 text-[var(--green)]">{notice}</p>}
    <button disabled={pending} className="auth-action">{pending?'Connecting…':mode==='sign-in'?'Sign in':mode==='sign-up'?'Create account':'Email password link'}</button>
   </form>
   <div className="mt-5 flex flex-col items-start gap-2 text-[12px] text-[var(--secondary)]">
    <button onClick={()=>choose(mode==='sign-in'?'sign-up':'sign-in')}>{mode==='sign-in'?'Create an account':'Back to sign in'}</button>
    {mode==='sign-in'&&<button onClick={()=>choose('reset-request')}>Set or reset password</button>}
   </div>
  </section>
 </main>;
}
