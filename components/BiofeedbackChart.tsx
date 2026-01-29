
import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface BiofeedbackChartProps {
  onAnimationComplete?: () => void;
  profile?: {
    control: number;
    rigidity: number;
    stamina: number;
    mental: number;
    strength: number;
  };
}

const BiofeedbackChart: React.FC<BiofeedbackChartProps> = ({ profile, onAnimationComplete }) => {
  const [data, setData] = useState([
    { subject: 'Controle', A: profile?.control || 30, fullMark: 100 },
    { subject: 'Rigidez', A: profile?.rigidity || 25, fullMark: 100 },
    { subject: 'Estamina', A: profile?.stamina || 40, fullMark: 100 },
    { subject: 'Mente', A: profile?.mental || 35, fullMark: 100 },
    { subject: 'Força PC', A: profile?.strength || 45, fullMark: 100 },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([
        { subject: 'Controle', A: 96, fullMark: 100 },
        { subject: 'Rigidez', A: 98, fullMark: 100 },
        { subject: 'Estamina', A: 92, fullMark: 100 },
        { subject: 'Mente', A: 90, fullMark: 100 },
        { subject: 'Força PC', A: 95, fullMark: 100 },
      ]);
      // Espera a animação do Recharts terminar antes de liberar o botão
      if (onAnimationComplete) {
        setTimeout(onAnimationComplete, 2500);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl" />
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#222" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#777', fontSize: 9, fontWeight: 800 }} />
          <Radar
            name="Performance"
            dataKey="A"
            stroke="#0070FF"
            fill="#0070FF"
            fillOpacity={0.6}
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiofeedbackChart;
