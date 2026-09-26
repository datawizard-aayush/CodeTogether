import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, GitBranch, CheckSquare, AlertCircle, MessageSquare, Video } from 'lucide-react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

export default function FeatureStorySection() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'projects',
      title: 'PROJECTS',
      icon: FolderGit2,
      subtitle: 'Build and organize projects with your team.',
      desc: 'Create public or private repositories with custom tech tags, member roles, and centralized project dashboards.',
      badge: 'WORKSPACE CORE',
      previewComponent: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ padding: '0.85rem', background: 'var(--bg-base)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>campus-connect</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>MERN Stack • 4 Collaborators</p>
            </div>
            <Badge variant="primary">ACTIVE</Badge>
          </div>
          <div style={{ padding: '0.85rem', background: 'var(--bg-base)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>algoview-visualizer</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>JavaScript • 3 Collaborators</p>
            </div>
            <Badge variant="neutral">PRIVATE</Badge>
          </div>
        </div>
      )
    },
    {
      id: 'repositories',
      title: 'REPOSITORIES',
      icon: GitBranch,
      subtitle: 'Keep project files and development activity together.',
      desc: 'Browse virtual file trees, preview rendered Markdown README files, and track commit histories without external context switching.',
      badge: 'FILE EXPLORER',
      previewComponent: (
        <div className="font-mono" style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)', fontSize: '0.8rem' }}>
          <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>📁 src/</div>
          <div style={{ paddingLeft: '1rem', color: 'var(--text-secondary)' }}>📁 components/</div>
          <div style={{ paddingLeft: '2rem', color: 'var(--text-primary)' }}>📄 App.jsx</div>
          <div style={{ paddingLeft: '1rem', color: 'var(--text-secondary)' }}>📄 README.md</div>
          <div style={{ paddingLeft: '1rem', color: 'var(--text-muted)' }}>📄 package.json</div>
        </div>
      )
    },
    {
      id: 'tasks',
      title: 'TASKS',
      icon: CheckSquare,
      subtitle: 'Turn ideas into trackable work.',
      desc: '4-column Kanban boards with task priority levels, assignee avatars, and automated status movement from TODO to COMPLETED.',
      badge: 'KANBAN ENGINE',
      previewComponent: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: 'var(--bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--warning)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--warning)', fontWeight: 600 }}>IN PROGRESS</span>
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>Implement JWT Middleware</h5>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Assigned to @Praveen</span>
          </div>
          <div style={{ background: 'var(--bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 600 }}>COMPLETED</span>
            <h5 style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>Database Schema Setup</h5>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Completed by @Rahul</span>
          </div>
        </div>
      )
    },
    {
      id: 'issues',
      title: 'ISSUES',
      icon: AlertCircle,
      subtitle: 'Find problems and solve them collaboratively.',
      desc: 'GitHub-inspired issue tracking with tag labels (#bug, #feature, #urgent), assignees, and nested comment threads.',
      badge: 'ISSUE TRACKER',
      previewComponent: (
        <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--danger)' }}>#24 API returns 500 on auth</span>
            <Badge variant="danger">BUG</Badge>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Opened by @Rahul • 2 comments
          </p>
        </div>
      )
    },
    {
      id: 'chat',
      title: 'CHAT',
      icon: MessageSquare,
      subtitle: 'Discuss work without leaving the workspace.',
      desc: 'Socket.IO-powered real-time project room chat, 1-on-1 private messaging, typing indicators, and presence tracking.',
      badge: 'REAL-TIME SOCKETS',
      previewComponent: (
        <div style={{ background: 'var(--bg-base)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            <strong style={{ color: 'var(--accent-primary)' }}>Rahul:</strong> Is the `/api/health` endpoint live on port 5000?
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
            <strong style={{ color: 'var(--success)' }}>Praveen:</strong> Yes! Just verified MongoDB status.
          </div>
        </div>
      )
    },
    {
      id: 'calls',
      title: 'VOICE + VIDEO',
      icon: Video,
      subtitle: 'Jump into real-time calls when text is not enough.',
      desc: 'Low-latency peer-to-peer WebRTC voice and video calling with microphone mute/unmute and camera toggles.',
      badge: 'WEBRTC MEDIA',
      previewComponent: (
        <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-purple)', textAlign: 'center' }}>
          <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>ACTIVE WEBRTC CALL</Badge>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>1-on-1 Session with @Rahul</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>P2P Direct Stream • Audio/Video Connected</div>
        </div>
      )
    },
  ];

  return (
    <section id="features" style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <Badge variant="primary" style={{ marginBottom: '1rem' }}>
          PRODUCT CAPABILITIES
        </Badge>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          BUILT FOR DEVELOPER FLOW
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
          Explore the integrated capabilities designed for engineering teams.
        </p>
      </div>

      {/* Feature Story Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center' }}>
        {/* Left Feature Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isActive = activeFeature === idx;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveFeature(idx)}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <Icon size={22} color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {feat.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {feat.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Dynamic Interactive Preview */}
        <Card style={{ padding: '2rem', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={features[activeFeature].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Badge variant="primary" style={{ marginBottom: '0.75rem' }}>
                {features[activeFeature].badge}
              </Badge>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {features[activeFeature].title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {features[activeFeature].desc}
              </p>
              {features[activeFeature].previewComponent}
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
