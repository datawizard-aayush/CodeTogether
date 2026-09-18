import React from 'react';

export default function ActivityView({ repos }) {
  return <div className="activity-page"><p className="crumb">Workspace / activity</p><h2>Recent activity</h2><p className="activity-intro">A quick view of what is happening across your local repositories.</p><div className="activity-cards">{repos.map((repo) => <article key={repo.id}><span className="dot" style={{ background: repo.color }} /><div><strong>{repo.name}</strong><p>{repo.messages.length ? `${repo.messages.length} conversation message${repo.messages.length === 1 ? '' : 's'} in this workspace.` : 'No messages yet. Start the conversation.'}</p></div><small>{repo.isPrivate ? 'Private' : 'Public'}</small></article>)}</div></div>;
}
