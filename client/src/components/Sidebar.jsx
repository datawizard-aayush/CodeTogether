import React from 'react';
import { initials } from '../data/demoData';

export default function Sidebar({ state, selectedRepo, visibleRepos, activeView, setActiveView, setSelectedRepoId, setShowCreate, flash, resetDemo }) {
  return <aside className="sidebar">
    <div className="brand-row"><div className="brand-logo">&lt;/&gt;</div><div><strong>CodeTogether</strong><small>Local prototype</small></div></div>
    <div className="sidebar-section"><p className="label">Repositories</p><button className="new-repo-btn" onClick={() => setShowCreate(true)}>+ New repository</button></div>
    <div className="repo-list">{visibleRepos.map((repo) => <button key={repo.id} className={`repo-item ${repo.id === selectedRepo?.id ? 'active' : ''}`} onClick={() => { setSelectedRepoId(repo.id); setActiveView('workspace'); }}><span className="dot" style={{ background: repo.color }} /><span>{repo.name}</span><small>{repo.messages.length || ''}</small></button>)}</div>
    <nav className="sidebar-nav"><button className={activeView === 'workspace' ? 'active' : ''} onClick={() => setActiveView('workspace')}>💬 Workspace</button><button className={activeView === 'activity' ? 'active' : ''} onClick={() => setActiveView('activity')}>▣ Activity</button><button onClick={() => flash('Settings will be connected later')}>⚙ Settings</button></nav>
    <div className="user-box"><div className="avatar-circle">{initials(state.user.name)}</div><div><strong>{state.user.name}</strong><small>{state.user.email}</small></div><button className="logout-btn" onClick={resetDemo}>Reset</button></div>
  </aside>;
}
