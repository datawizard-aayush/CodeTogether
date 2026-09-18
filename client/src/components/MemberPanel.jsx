import React from 'react';
import { initials } from '../data/demoData';

export default function MemberPanel({ selectedRepo, setShowInvite }) {
  return <aside className="side-panel"><div className="panel-block"><div className="panel-heading"><h4>Members</h4><button className="text-btn" onClick={() => setShowInvite(true)}>Manage</button></div>{selectedRepo.members.map((member) => <div className="member-row" key={member.id}><div className="avatar-circle small alt">{initials(member.name)}</div><div><strong>{member.name}</strong><small>{member.role} · {member.online ? 'Online' : 'Away'}</small></div><span className={`member-status ${member.online ? 'online' : ''}`} /></div>)}<button className="invite-button" onClick={() => setShowInvite(true)}>+ Invite member</button></div><div className="panel-block"><h4>Recent activity</h4><ul className="activity-list"><li>✓ Repository workspace created</li><li>💬 Chat is available to members</li><li>📁 MongoDB integration is planned next</li></ul></div></aside>;
}
