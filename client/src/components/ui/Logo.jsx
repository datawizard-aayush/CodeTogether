import React from 'react';
import logoImg from '../../assets/ColabzLogo.png';

export default function Logo({ size = 32, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
      <img
        src={logoImg}
        alt="Colabz Logo"
        style={{
          height: `${size}px`,
          width: 'auto',
          objectFit: 'contain',
          borderRadius: '4px'
        }}
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1 }}>
            COLABZ
          </span>
          <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', letterSpacing: '0.1em', marginTop: '2px' }}>
            BUILD IN MOTION
          </span>
        </div>
      )}
    </div>
  );
}
