'use client';

import React, { useState, useRef } from 'react';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`divide-y divide-smoke border-y border-smoke ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <AccordionRow
            key={item.id}
            item={item}
            isOpen={isOpen}
            onToggle={() => toggle(item.id)}
          />
        );
      })}
    </div>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="py-6 transition-colors">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="font-cormorant text-xl sm:text-2xl md:text-3xl text-ivory group-hover:text-champagne transition-colors">
          {item.question}
        </span>

        {/* Plus / Cross Icon */}
        <span
          className={`shrink-0 ml-6 w-8 h-8 rounded-full border border-champagne/30 flex items-center justify-center text-champagne transition-transform duration-500 ease-silk ${
            isOpen ? 'rotate-45 border-champagne bg-champagne/10' : 'group-hover:border-champagne'
          }`}
        >
          <span className="text-lg leading-none">+</span>
        </span>
      </button>

      {/* Smooth Expandable Content */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-silk ${
          isOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'
        }`}
      >
        <p className="font-manrope text-sm sm:text-base text-sand/80 leading-relaxed max-w-3xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
