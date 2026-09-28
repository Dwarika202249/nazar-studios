'use client';

import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ children, active = false, onClick, className = '' }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wide-mono border transition-all duration-300 select-none ${
        active
          ? 'bg-champagne text-ink border-champagne font-medium shadow-sm'
          : 'bg-transparent text-sand border-smoke hover:border-champagne/60 hover:text-ivory'
      } ${className}`}
    >
      {children}
    </button>
  );
}
