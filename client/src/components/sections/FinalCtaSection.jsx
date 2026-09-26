import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Rocket } from 'lucide-react';
import MagneticButton from '../buttons/MagneticButton';
import Badge from '../ui/Badge';

export default function FinalCtaSection({ onStartBuilding, onExplore }) {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '6rem 2rem 5rem', textAlign: 'center' }}>
      <div
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 124, 255, 0.12) 0%, rgba(11, 13, 16, 0.95) 75%)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '4.5rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Badge variant="primary" icon={Rocket} style={{ marginBottom: '1.25rem' }}>
          BUILD • COLLABORATE • SHIP
        </Badge>

        <h2
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            maxWidth: '850px',
            margin: '0 auto 1.25rem',
          }}
        >
          BUILD SOMETHING <span style={{ color: 'var(--accent-primary)' }}>WORTH SHIPPING.</span>
        </h2>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 2.5rem' }}>
          Your next project starts with a team. Jump into Colabz and ship together.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
          <MagneticButton variant="primary" icon={ArrowRight} onClick={onStartBuilding}>
            START BUILDING
          </MagneticButton>
          <MagneticButton variant="secondary" icon={Compass} onClick={onExplore}>
            EXPLORE THE WORKSPACE
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
