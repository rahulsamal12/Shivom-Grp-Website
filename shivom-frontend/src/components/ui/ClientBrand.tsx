import React from 'react';
import { Building2 } from 'lucide-react';

export function ClientBrand({ name, className = '', theme = 'light' }: { name?: string, className?: string, theme?: 'light' | 'dark' }) {
  const normalized = (name || '').trim().toLowerCase();
  
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-500';
  const fallbackTextColor = theme === 'dark' ? 'text-white' : 'text-gray-700';

  if (normalized === 'olic') {
    return (
      <div className={`flex flex-col items-start gap-1 ${className}`}>
        <div className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-sm px-2 py-0.5 rounded shadow-sm tracking-wider">
          OLIC
        </div>
        <span className={`text-[10px] ${textColor} uppercase tracking-widest font-semibold`}>Odisha Lift Irrigation</span>
      </div>
    );
  }

  if (normalized === 'tata' || normalized === 'tata power' || normalized.includes('tata')) {
    return (
      <div className={`flex flex-col items-start gap-1 ${className}`}>
        <div className={`${theme === 'dark' ? 'text-white' : 'text-[#003874]'} font-black text-xl tracking-tighter uppercase leading-none`}>
          TATA
        </div>
        <span className={`text-[10px] ${textColor} uppercase tracking-widest font-semibold`}>Tata Group</span>
      </div>
    );
  }

  if (normalized.includes('government') || normalized === 'gov' || normalized.includes('govt')) {
    return (
      <div className={`flex flex-col items-start gap-1 ${className}`}>
        <div className="w-6 h-6 rounded-full border border-[#FFB703] flex items-center justify-center bg-white shadow-sm">
          <Building2 className="w-3 h-3 text-brand-navy" />
        </div>
        <span className={`text-[10px] ${textColor} uppercase tracking-widest font-semibold`}>Govt. Agency</span>
      </div>
    );
  }

  // Fallback to text
  return (
    <div className={`flex flex-col items-start gap-0.5 ${className}`}>
      <span className={`text-xs ${fallbackTextColor} font-bold uppercase tracking-wider`}>{name || 'Client Project'}</span>
    </div>
  );
}
