'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Magnetic } from '@/components/motion/Magnetic';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const baseStyles =
    'relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-wide-mono transition-all duration-300 overflow-hidden group select-none disabled:opacity-50 disabled:pointer-events-none';

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'border border-champagne text-ivory hover:text-ink';
  } else if (variant === 'secondary') {
    variantStyles =
      'border border-smoke text-sand hover:border-champagne hover:text-ivory bg-ink/40 backdrop-blur-sm';
  } else {
    variantStyles = 'text-sand hover:text-champagne';
  }

  const content = (
    <>
      {/* Background sweep fill on hover */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-silk pointer-events-none"
        />
      )}

      {/* Button text */}
      <span className="relative z-10 flex items-center space-x-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Magnetic strength={8}>
        <Link
          href={href}
          className={`${baseStyles} ${variantStyles} ${className}`}
        >
          {content}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={8}>
      <button
        ref={btnRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {content}
      </button>
    </Magnetic>
  );
}
