'use client';

import React from 'react';

export default function Logo({ size = 40, className = "" }: { size?: number, className?: string }) {
  return (
    <div className={`bil-brand-container ${className}`} style={{ height: size, display: 'flex', alignItems: 'center', gap: '15px' }}>
      {/* Icon Part */}
      <img 
        src="/images/bil_icon.png" 
        alt="BIL Icon" 
        style={{ 
          height: '100%', 
          width: 'auto', 
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))'
        }} 
      />
      
      {/* Text Part */}
      <img 
        src="/images/bil_text.png" 
        alt="Boni Intelligence Lab" 
        style={{ 
          height: '80%', 
          width: 'auto', 
          objectFit: 'contain'
        }} 
      />
    </div>
  );
}



