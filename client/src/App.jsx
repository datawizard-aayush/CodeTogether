import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ChatPanel from './components/ChatPanel';
import MemberPanel from './components/MemberPanel';
import ActivityView from './components/ActivityView';
import { CreateRepoModal, InviteModal } from './components/Modals';
import { STORAGE_KEY, seedState, loadState } from './data/demoData';

export default function App() {
  const [state, setState] = useState(loadState);
  const [selectedRepoId, setSelectedRepoId] = useState('repo-1');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [activeView, setActiveView] = useState('workspace');
  const [notice, setNotice] = useState('');
  const [repoForm, setRepoForm] = useState({ name: '', description: '', isPrivate: true, language: 'JavaScript' });
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);

  const selectedRepo = state.repos.find((repo) => repo.id === selectedRepoId) || state.repos[0];
  const visibleRepos = useMemo(() => state.repos.filter((repo) => `${repo.name} ${repo.description}`.toLowerCase().includes(search.toLowerCase())), [state.repos, search]);
  const flash = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2200); };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selectedRepo) return;
    setState((current) => ({ ...current, repos: current.repos.map((repo) => repo.id === selectedRepo.id ? { ...repo, messages: [...repo.messages, { id: `m-${Date.now()}`, authorId: current.user.id, author: current.user.name, text, createdAt: 'now' }] } : repo) }));
    setDraft('');
  };

  const createRepository = (event) => {
    event.preventDefault();
    if (!repoForm.name.trim()) return;
    const repo = { id: `repo-${Date.now()}`, name: repoForm.name.trim(), description: repoForm.description.trim() || 'A new CodeTogether workspace.', isPrivate: repoForm.isPrivate, language: repoForm.language, color: repoForm.language === 'TypeScript' ? '#3178c6' : '#f7df1e', members: [{ id: state.user.id, name: state.user.name, role: 'Owner', online: true }], messages: [] };
    setState((current) => ({ ...current, repos: [repo, ...current.repos] }));
    setSelectedRepoId(repo.id); setRepoForm({ name: '', description: '', isPrivate: true, language: 'JavaScript' }); setShowCreate(false); flash('Repository created locally');
  };

  const inviteMember = (event) => { event.preventDefault(); if (!inviteEmail.trim()) return; flash(`Invite prepared for ${inviteEmail.trim()}`); setInviteEmail(''); setShowInvite(false); };
  const resetDemo = () => { setState(seedState); setSelectedRepoId('repo-1'); flash('Demo data reset'); };

  return <div className="dashboard-shell">
    <Sidebar state={state} selectedRepo={selectedRepo} visibleRepos={visibleRepos} activeView={activeView} setActiveView={setActiveView} setSelectedRepoId={setSelectedRepoId} setShowCreate={setShowCreate} flash={flash} resetDemo={resetDemo} />
    <main className="content-area"><Topbar search={search} setSearch={setSearch} setShowInvite={setShowInvite} flash={flash} />
      {selectedRepo && <><div className="repo-header"><div><p className="crumb">Repositories / {selectedRepo.name}</p><h2>{selectedRepo.name}</h2><p>{selectedRepo.description}</p></div><div className="repo-badges"><span className={`pill ${selectedRepo.isPrivate ? 'private' : 'public'}`}>{selectedRepo.isPrivate ? 'Private' : 'Public'}</span><span className="pill neutral">{selectedRepo.language}</span></div></div><div className="repo-tabs"><button className={activeView === 'workspace' ? 'active' : ''} onClick={() => setActiveView('workspace')}>Workspace</button><button onClick={() => flash('Code browser will be added next')}>Code</button><button onClick={() => flash('Issue tracking will be added next')}>Issues <span>0</span></button><button onClick={() => flash('Pull requests will be added next')}>Pull requests</button></div>{activeView === 'workspace' ? <div className="workspace-grid"><ChatPanel selectedRepo={selectedRepo} currentUser={state.user} draft={draft} setDraft={setDraft} sendMessage={sendMessage} /><MemberPanel selectedRepo={selectedRepo} setShowInvite={setShowInvite} /></div> : <ActivityView repos={state.repos} />}</>}
    </main>
    {showCreate && <CreateRepoModal repoForm={repoForm} setRepoForm={setRepoForm} onSubmit={createRepository} close={() => setShowCreate(false)} />}
    {showInvite && <InviteModal selectedRepo={selectedRepo} inviteEmail={inviteEmail} setInviteEmail={setInviteEmail} onSubmit={inviteMember} close={() => setShowInvite(false)} />}
    {notice && <div className="toast">✓ {notice}</div>}
  </div>;
}
