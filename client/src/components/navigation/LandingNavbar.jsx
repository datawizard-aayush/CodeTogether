import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '../ui/Logo';
import MagneticButton from '../buttons/MagneticButton';

export default function LandingNavbar({ onStartBuilding, onSignIn }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        backgroundColor: scrolled ? 'rgba(7, 8, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-default)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      {/* Brand Logo */}
      <div style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Logo size={36} />
      </div>

      {/* Center Links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <button
          onClick={() => scrollToSection('how-it-works')}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          How it Works
        </button>
        <button
          onClick={() => scrollToSection('product-preview')}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          Product
        </button>
        <button
          onClick={() => scrollToSection('features')}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          Features
        </button>
      </nav>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onSignIn}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '0.5rem 0.85rem'
          }}
        >
          Sign in
        </button>
        <MagneticButton variant="primary" icon={ArrowRight} onClick={onStartBuilding}>
          Start Building
        </MagneticButton>
      </div>
    </motion.header>
  );
}
