import React from 'react';
import { motion } from 'framer-motion';
import Badge from '../ui/Badge';

export default function BuiltForDevelopersSection() {
  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
      <Badge variant="primary" style={{ marginBottom: '1.25rem' }}>
        BUILT FOR STUDENT DEVELOPERS & HACKATHONS
      </Badge>

      <h2
        style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          color: 'var(--text-primary)',
          maxWidth: '900px',
          margin: '0 auto 1.5rem',
        }}
      >
        YOUR PROJECT SHOULDN'T LIVE IN <span style={{ color: 'var(--accent-primary)' }}>12 DIFFERENT TABS.</span>
      </h2>

      <p
        style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '680px',
          margin: '0 auto 2.5rem',
        }}
      >
        Colabz brings code, tasks, discussions, and people into one collaborative workspace. 
        No context switching, no lost links, no friction.
      </p>

      {/* Target audience tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.85rem' }}>
        <Badge variant="neutral">COLLEGE PROJECTS</Badge>
        <Badge variant="neutral">HACKATHON TEAMS</Badge>
        <Badge variant="neutral">CODING CLUBS</Badge>
        <Badge variant="neutral">OPEN-SOURCE TEAMS</Badge>
        <Badge variant="neutral">STUDENT STARTUPS</Badge>
      </div>
    </section>
  );
}
