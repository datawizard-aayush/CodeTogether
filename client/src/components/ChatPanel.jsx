import React from 'react';
import { initials } from '../data/demoData';

export default function ChatPanel({ selectedRepo, currentUser, draft, setDraft, sendMessage }) {
  return <section className="chat-panel"><div className="chat-header"><div><h3>#{selectedRepo.name.toLowerCase().replace(/\s+/g, '-')}</h3><small>Repository team chat · local mode</small></div><span className="status online">● {selectedRepo.members.filter((member) => member.online).length} online</span></div><div className="message-stream">{selectedRepo.messages.map((message) => <div key={message.id} className={`message-row ${message.authorId === currentUser.id ? 'mine' : ''}`}><div className="avatar-circle small">{initials(message.author)}</div><div className="bubble"><div className="bubble-head"><strong>{message.author}</strong><span>{message.createdAt}</span></div><p>{message.text}</p></div></div>)}</div><form className="message-form" onSubmit={sendMessage}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Message repository members..." /><button type="submit">Send</button></form></section>;
}
