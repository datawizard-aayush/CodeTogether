import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ChatPanel from './components/ChatPanel';
import MemberPanel from './components/MemberPanel';
import ActivityView from './components/ActivityView';
import { CreateRepoModal, InviteModal } from './components/Modals';
import AiAssistant from './components/AiAssistant';
import { STORAGE_KEY, seedState } from './data/demoData';

const readState = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || seedState; } catch { return seedState; }
};

export default function App() {
  const [state, setState] = useState(readState);
  const [repoId, setRepoId] = useState('repo-1');
  const [view, setView] = useState('workspace');
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [repoForm, setRepoForm] = useState({ name: '', description: '', language: 'JavaScript', isPrivate: true });

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state]);
  const repo = state.repos.find((item) => item.id === repoId) || state.repos[0];
  const repos = useMemo(() => state.repos.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [state.repos, query]);
  const flash = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2200); };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !repo) return;
    setState((current) => ({ ...current, repos: current.repos.map((item) => item.id === repo.id ? { ...item, messages: [...item.messages, { id: `m-${Date.now()}`, authorId: current.user.id, author: current.user.name, text, createdAt: 'now' }] } : item) }));
    setDraft('');
  };

  const createRepository = (event) => {
    event.preventDefault();
    if (!repoForm.name.trim()) return;
    const created = { id: `repo-${Date.now()}`, name: repoForm.name.trim(), description: repoForm.description.trim() || 'A new CodeTogether workspace.', language: repoForm.language, isPrivate: repoForm.isPrivate, color: '#f7df1e', members: [{ id: state.user.id, name: state.user.name, role: 'Owner', online: true }], messages: [] };
    setState((current) => ({ ...current, repos: [created, ...current.repos] }));
    setRepoId(created.id); setCreateOpen(false); setRepoForm({ name: '', description: '', language: 'JavaScript', isPrivate: true }); flash('Repository created');
  };

  const prepareInvite = (event) => { event.preventDefault(); if (!inviteEmail.trim()) return; flash(`Invite prepared for ${inviteEmail}`); setInviteEmail(''); setInviteOpen(false); };
  const reset = () => { setState(seedState); setRepoId('repo-1'); flash('Demo data reset'); };

  return <div className="app-shell">
    <Sidebar state={state} repo={repo} repos={repos} view={view} setView={setView} setRepoId={setRepoId} openCreate={() => setCreateOpen(true)} reset={reset} flash={flash} />
    <main className="main"><Topbar query={query} setQuery={setQuery} openInvite={() => setInviteOpen(true)} openAi={() => setAiOpen(true)} flash={flash} />
      {repo && <><header className="repo-header"><div><p className="eyebrow">Repositories / {repo.name}</p><h1>{repo.name}</h1><p>{repo.description}</p></div><div className="badges"><span className={`badge ${repo.isPrivate ? 'private' : 'public'}`}>{repo.isPrivate ? 'Private' : 'Public'}</span><span className="badge language">{repo.language}</span></div></header><nav className="tabs"><button className={view === 'workspace' ? 'active' : ''} onClick={() => setView('workspace')}>Workspace</button><button onClick={() => flash('Code browser is next')}>Code</button><button onClick={() => flash('Issues are next')}>Issues</button><button onClick={() => flash('Pull requests are next')}>Pull requests</button></nav>{view === 'workspace' ? <div className="workspace"><ChatPanel repo={repo} user={state.user} draft={draft} setDraft={setDraft} sendMessage={sendMessage} /><MemberPanel repo={repo} openInvite={() => setInviteOpen(true)} /></div> : <ActivityView repos={state.repos} />}</>}
    </main>
    {createOpen && <CreateRepoModal form={repoForm} setForm={setRepoForm} submit={createRepository} close={() => setCreateOpen(false)} />}
    {inviteOpen && <InviteModal repo={repo} email={inviteEmail} setEmail={setInviteEmail} submit={prepareInvite} close={() => setInviteOpen(false)} />}
    <AiAssistant repo={repo} isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    {notice && <div className="toast">✓ {notice}</div>}
  </div>;
}
