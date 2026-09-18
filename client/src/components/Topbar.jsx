import React from 'react';

export default function Topbar({ search, setSearch, setShowInvite, flash }) {
  return <header className="topbar"><div className="searchbox"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search repositories, chats or members" /></div><div className="topbar-actions"><button className="top-btn" onClick={() => flash('No new notifications')}>Bell</button><button className="top-btn" onClick={() => setShowInvite(true)}>Invite</button></div></header>;
}
