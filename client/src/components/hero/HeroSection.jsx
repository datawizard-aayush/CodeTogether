import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Compass } from 'lucide-react';
import MagneticButton from '../buttons/MagneticButton';
import LandingUniverse3D from '../three/LandingUniverse3D';
import Badge from '../ui/Badge';

export default function HeroSection({ onStartBuilding, onExplore }) {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '3.5rem 2rem 4rem', textAlign: 'center' }}>
      {/* Technical Metadata Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'inline-block', marginBottom: '1.25rem' }}
      >
        <Badge variant="primary" icon={Terminal}>
          BUILD IN MOTION // 01
        </Badge>
      </motion.div>

      {/* Main Editorial Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.08,
          color: 'var(--text-primary)',
          maxWidth: '960px',
          margin: '0 auto 1.5rem',
        }}
      >
        BUILD WITH PEOPLE.<br />
        <span style={{ color: 'var(--accent-primary)' }}>SHIP WITH COLABZ.</span>
      </motion.h1>

      {/* Supporting Copy */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '680px',
          margin: '0 auto 2.25rem',
        }}
      >
        A real-time workspace for developers to build projects, manage code, solve issues, 
        and collaborate without leaving the flow.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '3.5rem' }}
      >
        <MagneticButton variant="primary" icon={ArrowRight} onClick={onStartBuilding}>
          START BUILDING
        </MagneticButton>
        <MagneticButton variant="secondary" icon={Compass} onClick={onExplore}>
          EXPLORE COLABZ
        </MagneticButton>
      </motion.div>

      {/* 3D Project Universe Viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <LandingUniverse3D />
      </motion.div>
    </section>
  );
}
