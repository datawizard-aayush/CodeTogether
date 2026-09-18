import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'codetogether_demo_state';

const seedState = {
  user: { id: 'u-1', name: 'Ronak Kumar', email: 'ronak@example.com' },
  repos: [
    {
      id: 'repo-1',
      name: 'CodeTogether',
      description: 'Build together, ship together.',
      isPrivate: false,
      language: 'JavaScript',
      color: '#f7df1e',
      members: [
        { id: 'u-1', name: 'Ronak Kumar', role: 'Owner', online: true },
        { id: 'u-2', name: 'Priya Sharma', role: 'Maintainer', online: true },
        { id: 'u-3', name: 'Marcus Chen', role: 'Developer', online: false },
        { id: 'u-4', name: 'Elena Rossi', role: 'Designer', online: true },
      ],
      messages: [
        { id: 'm-1', authorId: 'u-2', author: 'Priya Sharma', text: 'The new repository screen is looking great. I pushed the auth flow to feature/auth.', createdAt: '10:18 AM' },
        { id: 'm-2', authorId: 'u-3', author: 'Marcus Chen', text: 'Nice! I will review it after wiring the socket events. Chat should stay scoped to repository members.', createdAt: '10:21 AM' },
        { id: 'm-3', authorId: 'u-1', author: 'Ronak Kumar', text: 'Agreed. Let us ship the first pass today.', createdAt: '10:24 AM' },
      ],
    },
    {
      id: 'repo-2',
      name: 'design-system',
      description: 'Shared UI primitives for the team.',
      isPrivate: true,
      language: 'TypeScript',
      color: '#3178c6',
      members: [
        { id: 'u-1', name: 'Ronak Kumar', role: 'Owner', online: true },
        { id: 'u-4', name: 'Elena Rossi', role: 'Designer', online: true },
      ],
      messages: [{ id: 'm-4', authorId: 'u-4', author: 'Elena Rossi', text: 'The button states are ready for review.', createdAt: 'Yesterday' }],
    },
    {
      id: 'repo-3',
      name: 'api-gateway',
      description: 'The collaboration API service.',
      isPrivate: true,
      language: 'Node.js',
      color: '#68a063',
      members: [
        { id: 'u-1', name: 'Ronak Kumar', role: 'Owner', online: true },
        { id: 'u-3', name: 'Marcus Chen', role: 'Developer', online: false },
      ],
      messages: [],
    },
  ],
};

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || seedState;
  } catch {
    return seedState;
  }
}

function initials(name = '') {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'U';
}

function App() {
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const selectedRepo = state.repos.find((repo) => repo.id === selectedRepoId) || state.repos[0];
  const visibleRepos = useMemo(
    () => state.repos.filter((repo) => `${repo.name} ${repo.description}`.toLowerCase().includes(search.toLowerCase())),
    [state.repos, search]
  );

  const flash = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2200);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selectedRepo) return;

    setState((current) => ({
      ...current,
      repos: current.repos.map((repo) =>
        repo.id === selectedRepo.id
          ? { ...repo, messages: [...repo.messages, { id: `m-${Date.now()}`, authorId: current.user.id, author: current.user.name, text, createdAt: 'now' }] }
          : repo
      ),
    }));
    setDraft('');
  };

  const createRepository = (event) => {
    event.preventDefault();
    if (!repoForm.name.trim()) return;

    const repo = {
      id: `repo-${Date.now()}`,
      name: repoForm.name.trim(),
      description: repoForm.description.trim() || 'A new CodeTogether workspace.',
      isPrivate: repoForm.isPrivate,
      language: repoForm.language,
      color: repoForm.language === 'TypeScript' ? '#3178c6' : '#f7df1e',
      members: [{ id: state.user.id, name: state.user.name, role: 'Owner', online: true }],
      messages: [],
    };

    setState((current) => ({ ...current, repos: [repo, ...current.repos] }));
    setSelectedRepoId(repo.id);
    setRepoForm({ name: '', description: '', isPrivate: true, language: 'JavaScript' });
    setShowCreate(false);
    flash('Repository created locally');
  };

  const inviteMember = (event) => {
    event.preventDefault();
    if (!inviteEmail.trim() || !selectedRepo) return;
    flash(`Invite prepared for ${inviteEmail.trim()}`);
    setInviteEmail('');
    setShowInvite(false);
  };

  const resetDemo = () => {
    setState(seedState);
    setSelectedRepoId('repo-1');
    flash('Demo data reset');
  };

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-logo">&lt;/&gt;</div>
          <div>
            <strong>CodeTogether</strong>
            <small>Local prototype</small>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="label">Repositories</p>
          <button className="new-repo-btn" onClick={() => setShowCreate(true)}>+ New repository</button>
        </div>

        <div className="repo-list">
          {visibleRepos.map((repo) => (
            <button
              key={repo.id}
              className={`repo-item ${repo.id === selectedRepo?.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedRepoId(repo.id);
                setActiveView('workspace');
              }}
            >
              <span className="dot" style={{ background: repo.color }} />
              <span>{repo.name}</span>
              <small>{repo.messages.length || ''}</small>
            </button>
          ))}
        </div>

        <nav className="sidebar-nav">
          <button className={activeView === 'workspace' ? 'active' : ''} onClick={() => setActiveView('workspace')}>💬 Workspace</button>
          <button className={activeView === 'activity' ? 'active' : ''} onClick={() => setActiveView('activity')}>▣ Activity</button>
          <button onClick={() => flash('Settings will be connected later')}>⚙ Settings</button>
        </nav>

        <div className="user-box">
          <div className="avatar-circle">{initials(state.user.name)}</div>
          <div>
            <strong>{state.user.name}</strong>
            <small>{state.user.email}</small>
          </div>
          <button className="logout-btn" onClick={resetDemo}>Reset</button>
        </div>
      </aside>

      <main className="content-area">
        <header className="topbar">
          <div className="searchbox">
            <span>⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search repositories, chats or members" />
          </div>
          <div className="topbar-actions">
            <button className="top-btn" onClick={() => flash('No new notifications')}>Bell</button>
            <button className="top-btn" onClick={() => setShowInvite(true)}>Invite</button>
          </div>
        </header>

        {selectedRepo && (
          <>
            <div className="repo-header">
              <div>
                <p className="crumb">Repositories / {selectedRepo.name}</p>
                <h2>{selectedRepo.name}</h2>
                <p>{selectedRepo.description}</p>
              </div>
              <div className="repo-badges">
                <span className={`pill ${selectedRepo.isPrivate ? 'private' : 'public'}`}>{selectedRepo.isPrivate ? 'Private' : 'Public'}</span>
                <span className="pill neutral">{selectedRepo.language}</span>
              </div>
            </div>

            <div className="repo-tabs">
              <button className={activeView === 'workspace' ? 'active' : ''} onClick={() => setActiveView('workspace')}>Workspace</button>
              <button onClick={() => flash('Code browser will be added next')}>Code</button>
              <button onClick={() => flash('Issue tracking will be added next')}>Issues <span>0</span></button>
              <button onClick={() => flash('Pull requests will be added next')}>Pull requests</button>
            </div>

            {activeView === 'workspace' ? (
              <div className="workspace-grid">
                <section className="chat-panel">
                  <div className="chat-header">
                    <div>
                      <h3>#{selectedRepo.name.toLowerCase().replace(/\s+/g, '-')}</h3>
                      <small>Repository team chat · local mode</small>
                    </div>
                    <span className="status online">● {selectedRepo.members.filter((member) => member.online).length} online</span>
                  </div>

                  <div className="message-stream">
                    {selectedRepo.messages.map((message) => (
                      <div key={message.id} className={`message-row ${message.authorId === state.user.id ? 'mine' : ''}`}>
                        <div className="avatar-circle small">{initials(message.author)}</div>
                        <div className="bubble">
                          <div className="bubble-head">
                            <strong>{message.author}</strong>
                            <span>{message.createdAt}</span>
                          </div>
                          <p>{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form className="message-form" onSubmit={sendMessage}>
                    <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Message repository members..." />
                    <button type="submit">Send</button>
                  </form>
                </section>

                <aside className="side-panel">
                  <div className="panel-block">
                    <div className="panel-heading">
                      <h4>Members</h4>
                      <button className="text-btn" onClick={() => setShowInvite(true)}>Manage</button>
                    </div>

                    {selectedRepo.members.map((member) => (
                      <div className="member-row" key={member.id}>
                        <div className="avatar-circle small alt">{initials(member.name)}</div>
                        <div>
                          <strong>{member.name}</strong>
                          <small>{member.role} · {member.online ? 'Online' : 'Away'}</small>
                        </div>
                        <span className={`member-status ${member.online ? 'online' : ''}`} />
                      </div>
                    ))}

                    <button className="invite-button" onClick={() => setShowInvite(true)}>+ Invite member</button>
                  </div>

                  <div className="panel-block">
                    <h4>Recent activity</h4>
                    <ul className="activity-list">
                      <li>✓ Repository workspace created</li>
                      <li>💬 Chat is available to members</li>
                      <li>📁 MongoDB integration is planned next</li>
                    </ul>
                  </div>
                </aside>
              </div>
            ) : (
              <ActivityView repos={state.repos} />
            )}
          </>
        )}
      </main>

      {showCreate && (
        <Modal title="Create repository" close={() => setShowCreate(false)}>
          <form className="repo-form" onSubmit={createRepository}>
            <label>
              Repository name
              <input autoFocus value={repoForm.name} onChange={(event) => setRepoForm({ ...repoForm, name: event.target.value })} placeholder="e.g. mobile-app" />
            </label>
            <label>
              Description
              <textarea value={repoForm.description} onChange={(event) => setRepoForm({ ...repoForm, description: event.target.value })} placeholder="What are you building?" />
            </label>
            <label>
              Language
              <select value={repoForm.language} onChange={(event) => setRepoForm({ ...repoForm, language: event.target.value })}>
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Node.js</option>
                <option>Python</option>
              </select>
            </label>
            <label className="checkbox-row">
              <input type="checkbox" checked={repoForm.isPrivate} onChange={(event) => setRepoForm({ ...repoForm, isPrivate: event.target.checked })} />
              Make it private
            </label>
            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowCreate(false)}>Cancel</button>
              <button className="primary-btn">Create repo</button>
            </div>
          </form>
        </Modal>
      )}

      {showInvite && (
        <Modal title={`Invite to ${selectedRepo?.name || 'repository'}`} close={() => setShowInvite(false)}>
          <form className="repo-form" onSubmit={inviteMember}>
            <p className="modal-copy">This is a local prototype for now. The invite API will be connected after MongoDB is added.</p>
            <label>
              Member email
              <input autoFocus type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="teammate@example.com" />
            </label>
            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowInvite(false)}>Cancel</button>
              <button className="primary-btn">Prepare invite</button>
            </div>
          </form>
        </Modal>
      )}

      {notice && <div className="toast">✓ {notice}</div>}
    </div>
  );
}

function ActivityView({ repos }) {
  return (
    <div className="activity-page">
      <p className="crumb">Workspace / activity</p>
      <h2>Recent activity</h2>
      <p className="activity-intro">A quick view of what is happening across your local repositories.</p>
      <div className="activity-cards">
        {repos.map((repo) => (
          <article key={repo.id}>
            <span className="dot" style={{ background: repo.color }} />
            <div>
              <strong>{repo.name}</strong>
              <p>{repo.messages.length ? `${repo.messages.length} conversation message${repo.messages.length === 1 ? '' : 's'} in this workspace.` : 'No messages yet. Start the conversation.'}</p>
            </div>
            <small>{repo.isPrivate ? 'Private' : 'Public'}</small>
          </article>
        ))}
      </div>
    </div>
  );
}

function Modal({ title, close, children }) {
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button onClick={close}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default App;
