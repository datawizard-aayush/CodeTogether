import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Logo from '../ui/Logo';
import AuthScene from './AuthScene';
import AuthPanel from './AuthPanel';
import PageTransition from '../ui/PageTransition';

export default function AuthLayout({ mode = 'login' }) {
  const navigate = useNavigate();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSwitchMode = (newMode) => {
    navigate(`/auth/${newMode}`);
  };

  return (
    <PageTransition>
      <div
        className="bg-tech-grid"
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-base)',
        }}
      >
        {/* Top Header */}
        <header
          style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 20,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Logo size={36} />
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            <ArrowLeft size={16} /> Back to Landing Page
          </button>
        </header>

        {/* 3D WebGL Persistent Environment */}
        <AuthScene mode={mode} isInputFocused={isInputFocused} />

        {/* Spatial Content Body */}
        <main
          style={{
            flex: 1,
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '2rem 5vw',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Right Floating Integrated Auth Panel */}
          <AuthPanel
            mode={mode}
            onSwitchMode={handleSwitchMode}
            onInputFocus={() => setIsInputFocused(true)}
            onInputBlur={() => setIsInputFocused(false)}
          />
        </main>
      </div>
    </PageTransition>
  );
}
