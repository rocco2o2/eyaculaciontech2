
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  
  return (
    <div className="w-full px-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[7px] uppercase tracking-[0.2em] text-[#0070FF] font-black">
          Análise Neural
        </span>
        <span className="text-[7px] text-white/40 font-mono">
          {percentage}%
        </span>
      </div>
      <div className="relative h-1 w-full bg-[#111] rounded-full overflow-hidden border border-white/5">
        <div 
          className="absolute h-full bg-[#0070FF] transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="pulse-wave" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
