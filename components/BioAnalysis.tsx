
import React, { useEffect, useState } from 'react';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

interface BioAnalysisProps {
  text: string;
  onComplete: () => void;
}

const BioAnalysis: React.FC<BioAnalysisProps> = ({ text, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center space-y-10 py-6">
      <div className="relative w-48 h-48 border-2 border-[#0070FF]/20 rounded-full flex items-center justify-center overflow-hidden bg-[#0F0F0F]">
        <div className="scanner-line" />
        <div className="absolute inset-0 flex items-center justify-center">
            {progress < 50 ? (
                <Activity size={50} className="text-[#0070FF] animate-pulse" />
            ) : progress < 90 ? (
                <Zap size={50} className="text-[#0070FF] animate-bounce" />
            ) : (
                <ShieldCheck size={50} className="text-[#0070FF]" />
            )}
        </div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#0070FF] rounded-full animate-spin duration-[2000ms]" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-sm font-bold tracking-widest text-white uppercase italic">
          {text}
        </h3>
        <div className="text-5xl font-black text-[#0070FF] tabular-nums tracking-tighter">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default BioAnalysis;
