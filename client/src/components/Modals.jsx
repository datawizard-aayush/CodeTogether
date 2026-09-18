import React from 'react';

export function Modal({ title, close, children }) {
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

export function CreateRepoModal({ repoForm, setRepoForm, onSubmit, close }) {
  return (
    <Modal title="Create repository" close={close}>
      <form className="repo-form" onSubmit={onSubmit}>
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
          <button type="button" className="secondary-btn" onClick={close}>Cancel</button>
          <button className="primary-btn">Create repo</button>
        </div>
      </form>
    </Modal>
  );
}

export function InviteModal({ selectedRepo, inviteEmail, setInviteEmail, onSubmit, close }) {
  return (
    <Modal title={`Invite to ${selectedRepo?.name || 'repository'}`} close={close}>
      <form className="repo-form" onSubmit={onSubmit}>
        <p className="modal-copy">This is a local prototype for now. The invite API will be connected after MongoDB is added.</p>
        <label>
          Member email
          <input autoFocus type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="teammate@example.com" />
        </label>
        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={close}>Cancel</button>
          <button className="primary-btn">Prepare invite</button>
        </div>
      </form>
    </Modal>
  );
}
