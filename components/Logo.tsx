import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M8 8H32L28 12H12V18H26L22 22H12V32H8V8Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M16 12L20 8M16 22L20 18" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 8L36 12L32 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 18L30 22L26 26" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-display font-bold text-2xl tracking-tight text-white">
        Forzeo
      </span>
    </div>
  );
};