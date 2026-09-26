import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '520px'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cz-modal-backdrop" onClick={onClose}>
      <div
        className="cz-modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
