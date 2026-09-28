'use client';

import React, { useState } from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, id, value, onChange, onFocus, onBlur, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';

    return (
      <div className="relative w-full pt-5 pb-2">
        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-xs uppercase tracking-wide-mono ${
            isFocused || hasValue
              ? 'top-0 text-champagne text-[10px]'
              : 'top-6 text-sand/60 text-xs'
          }`}
        >
          {label}
        </label>

        {/* Underline-only Input */}
        <input
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className="w-full bg-transparent border-b border-smoke focus:border-transparent outline-none py-2 font-manrope text-base text-ivory placeholder-transparent focus:ring-0 transition-colors"
          {...rest}
        />

        {/* Animated Champagne Focus Underline */}
        <span
          aria-hidden="true"
          className={`absolute bottom-2 left-0 h-[1.5px] bg-champagne transition-all duration-500 ease-out origin-left ${
            isFocused ? 'w-full scale-x-100' : 'w-full scale-x-0'
          }`}
        />

        {/* Error message in sindoor */}
        {error && (
          <span className="block mt-1 font-mono text-[11px] text-sindoor tracking-wide">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';
