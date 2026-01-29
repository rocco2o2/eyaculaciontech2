
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Shield, ChevronRight, Activity, Clock, Target, BrainCircuit, Zap, Fingerprint, Lock } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import BioAnalysis from './components/BioAnalysis';
import BiofeedbackChart from './components/BiofeedbackChart';
import { QUESTIONS, HEALTH_TIPS } from './constants';
import { QuestionType, UserData } from './types';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [isFlashing, setIsFlashing] = useState(false);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(2);
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState("");
  const [isChartReady, setIsChartReady] = useState(false);

  const currentQuestion = QUESTIONS[currentStepIndex];
  const totalSteps = QUESTIONS.length;

  const userProfile = useMemo(() => {
    const base = { control: 30, rigidity: 35, stamina: 40, mental: 30, strength: 40 };
    if (userData.challenge === 'control') base.control = 15;
    if (userData.challenge === 'rigidity') base.rigidity = 12;
    if (userData.duration === '<2') base.stamina = 10;
    if (userData.pcMuscle === 'no') base.strength = 15;
    return base;
  }, [userData]);

  // Gestão de Insights: Apenas 1 por etapa, após 3.5s
  useEffect(() => {
    setShowTip(false);
    setIsChartReady(false);
    const timer = setTimeout(() => {
      if (currentQuestion.type !== QuestionType.ANIMATION && currentStepIndex < totalSteps - 1) {
        setCurrentTip(HEALTH_TIPS[currentStepIndex % HEALTH_TIPS.length]);
        setShowTip(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentStepIndex, currentQuestion.type, totalSteps]);

  const handleNext = useCallback((key?: keyof UserData, value?: any, idx?: number) => {
    setIsFlashing(true);
    if (idx !== undefined) setClickedId(idx);
    
    if (key) {
      setUserData(prev => ({ ...prev, [key]: value }));
    }

    // Delay de dopamina para o usuário ver o brilho no botão selecionado
    setTimeout(() => {
      setIsFlashing(false);
      setClickedId(null);
      setCurrentStepIndex(prev => Math.min(prev + 1, totalSteps - 1));
    }, 400);
  }, [totalSteps]);

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case QuestionType.BUTTONS:
        return (
          <div className="grid grid-cols-1 gap-2.5 w-full max-w-sm mx-auto px-1">
            {currentQuestion.options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleNext(currentQuestion.id === 2 ? 'challenge' : undefined, opt.value, idx)}
                className={`group relative flex items-center justify-between p-4 bg-[#0F0F0F] border ${clickedId === idx ? 'btn-active-glow' : 'border-white/5'} rounded-xl transition-all duration-200 text-left`}
              >
                <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded bg-blue-500/10 flex items-center justify-center border ${clickedId === idx ? 'border-white/40' : 'border-blue-500/20'}`}>
                        <Zap size={12} className={clickedId === idx ? 'text-white' : 'text-[#0070FF]'} />
                    </div>
                    <span className={`text-sm font-semibold tracking-tight ${clickedId === idx ? 'text-white' : 'text-white/90'}`}>
                    {opt.label}
                    </span>
                </div>
                <ChevronRight size={16} className={`${clickedId === idx ? 'text-white' : 'text-[#0070FF] opacity-30'}`} />
              </button>
            ))}
          </div>
        );

      case QuestionType.SLIDER:
        return (
          <div className="w-full max-w-sm mx-auto space-y-5 pt-1">
            <div className="text-center">
                <span className="text-5xl font-black text-[#0070FF] tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(0,112,255,0.3)]">
                    {sliderValue}
                </span>
            </div>
            <div className="relative px-4">
                <input
                    type="range"
                    min={currentQuestion.min}
                    max={currentQuestion.max}
                    step={currentQuestion.step}
                    value={sliderValue}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                />
                {/* Barra neon que preenche conforme arrasta */}
                <div 
                  className="absolute left-4 h-1.5 bg-[#0070FF] rounded-full pointer-events-none transition-all duration-150"
                  style={{ width: `calc(${((sliderValue - currentQuestion.min!) / (currentQuestion.max! - currentQuestion.min!)) * 100}% - 32px)` }}
                />
            </div>
            <div className="flex justify-between px-4">
              {currentQuestion.labels?.map((l, i) => (
                <div key={i} className={`flex flex-col items-center gap-1 transition-opacity ${sliderValue === (i+1) ? 'opacity-100' : 'opacity-20'}`}>
                    <span className="text-[7px] uppercase font-black text-white text-center max-w-[50px] leading-tight tracking-tighter">{l}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleNext('rigidity', sliderValue, 99)}
              className={`w-full py-4 ${clickedId === 99 ? 'btn-active-glow' : 'bg-[#0070FF]'} text-white font-black rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 transition-all`}
            >
              CONFIRMAR NÍVEL
            </button>
          </div>
        );

      case QuestionType.ANIMATION:
        return (
          <div className="scale-75 -my-12">
            <BioAnalysis 
              text={currentQuestion.animationText || ""} 
              onComplete={() => setCurrentStepIndex(prev => prev + 1)} 
            />
          </div>
        );

      case QuestionType.IMPACT:
        return (
          <div className="text-center space-y-4 py-1 animate-in fade-in zoom-in duration-500">
            <div className="relative inline-block scale-75">
                <div className="p-4 bg-gradient-to-br from-[#111] to-[#050505] border border-blue-500/30 rounded-2xl">
                    <Fingerprint size={40} className="text-[#0070FF] animate-pulse" />
                </div>
            </div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-tight">
              PERFIL DE <span className="text-[#0070FF]">ALTA PERFORMANCE</span>
            </h2>
            <p className="text-white/60 text-[11px] max-w-[280px] mx-auto leading-relaxed">
              Detectamos uma janela de resposta maleável. Você está no topo 5% com maior potencial de reversão imediata.
            </p>
            <button
              onClick={() => handleNext(undefined, undefined, 88)}
              className={`w-full py-4 ${clickedId === 88 ? 'btn-active-glow' : 'bg-[#0070FF]'} text-white font-black rounded-xl text-xs uppercase tracking-[0.2em] transition-all`}
            >
              VER MAPA DE EVOLUÇÃO
            </button>
          </div>
        );

      case QuestionType.CHART:
        return (
          <div className="space-y-4 w-full max-w-sm">
            <div className="h-64 -mt-6">
              <BiofeedbackChart 
                profile={userProfile} 
                onAnimationComplete={() => setIsChartReady(true)} 
              />
            </div>
            
            {isChartReady ? (
              <div className="reveal-btn space-y-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#0F0F0F] p-3 rounded-xl border border-white/5 text-center">
                        <span className="text-[7px] uppercase text-white/30 tracking-widest block mb-1">Status Atual</span>
                        <span className="text-red-500 font-bold text-[10px]">DESREGULADO</span>
                    </div>
                    <div className="bg-[#0F0F0F] p-3 rounded-xl border border-blue-500/20 text-center relative overflow-hidden">
                        <span className="text-[7px] uppercase text-white/30 tracking-widest block mb-1">Pós-Protocolo</span>
                        <span className="text-green-500 font-bold text-[10px]">DOMÍNIO TOTAL</span>
                    </div>
                </div>
                <button
                  onClick={() => handleNext(undefined, undefined, 77)}
                  className={`w-full py-4 ${clickedId === 77 ? 'btn-active-glow' : 'bg-white text-black'} font-black rounded-xl text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl transition-all`}
                >
                  ACESSAR AGORA <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                 <div className="flex items-center justify-center gap-2 text-[#0070FF] animate-pulse">
                    <Activity size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Calculando Projeção Neural...</span>
                 </div>
              </div>
            )}
          </div>
        );

      case QuestionType.CTA:
        return (
          <div className="text-center space-y-6 py-1 animate-in slide-in-from-bottom duration-700">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[8px] font-black uppercase tracking-widest">
                 <Lock size={10} /> Criptografia Ativa
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-tight">
                ASSUMA O <span className="text-[#0070FF]">CONTROLE</span>
              </h2>
              <p className="text-white/50 text-[10px] max-w-[260px] mx-auto leading-normal">
                Protocolo gerado. O tempo de resposta do músculo PC será recalibrado para suportar alta intensidade sem escapes involuntários.
              </p>
            </div>
            
            <button
              className="w-full py-5 bg-[#0070FF] text-white font-black rounded-xl text-sm uppercase tracking-[0.1em] flex flex-col items-center justify-center shadow-xl shadow-blue-500/30 active:scale-95 transition-transform"
              onClick={() => alert('Redirecionando para checkout seguro...')}
            >
              <div className="flex items-center gap-2">
                <Shield size={18} /> QUERO MEU PROTOCOLO
              </div>
              <span className="text-[8px] opacity-70 font-normal italic lowercase">garantia de satisfação inclusa</span>
            </button>

            <div className="flex items-center justify-center gap-6 pt-2 opacity-40">
                <div className="flex flex-col items-center gap-1">
                    <Clock size={14} />
                    <span className="text-[7px] uppercase font-bold tracking-tighter">28 Dias</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Target size={14} />
                    <span className="text-[7px] uppercase font-bold tracking-tighter">98% Sucesso</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <BrainCircuit size={14} />
                    <span className="text-[7px] uppercase font-bold tracking-tighter">Bio-Ajuste</span>
                </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-[100dvh] bg-[#050505] text-[#F2F2F2] flex flex-col items-center px-5 relative overflow-hidden">
      {isFlashing && <div className="reward-flash" />}

      <header className="w-full pt-4 flex flex-col items-center z-40 shrink-0">
        <div className="flex items-center gap-1.5 mb-2 opacity-80">
            <Shield className="text-[#0070FF]" size={14} />
            <h1 className="text-[9px] font-black tracking-tighter italic uppercase text-white">
            Bio<span className="text-[#0070FF]">Performance</span>
            </h1>
        </div>
        
        {currentStepIndex < totalSteps - 2 && (
          <div className="w-full max-w-sm">
            <ProgressBar current={currentStepIndex} total={totalSteps - 4} />
          </div>
        )}

        <div className="h-10 w-full max-w-sm mt-1">
          {showTip && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-700">
                <div className="bg-[#111] border-l-2 border-[#0070FF] p-2 rounded-lg shadow-xl flex items-center gap-2.5">
                    <Activity size={12} className="text-[#0070FF] shrink-0" />
                    <p className="text-[8.5px] font-bold text-white/90 leading-tight">
                      <span className="text-[#0070FF] uppercase text-[6.5px] block tracking-widest">IA Insight:</span>
                      {currentTip}
                    </p>
                </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col justify-center items-center py-2 z-10 min-h-0">
        <div className={`space-y-1 mb-5 text-center transition-all ${isFlashing ? 'scale-105' : 'scale-100'}`}>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight italic uppercase">
            {currentQuestion.title}
          </h2>
          {currentQuestion.subtitle && (
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest max-w-[240px] mx-auto">
              {currentQuestion.subtitle}
            </p>
          )}
        </div>

        <div className="w-full flex justify-center">
          {renderQuestion()}
        </div>
      </main>

      <footer className="w-full pb-4 flex flex-col items-center gap-1 opacity-20 pointer-events-none shrink-0">
        <div className="flex items-center gap-3 text-[7px] uppercase tracking-widest text-white font-black">
            <span>Privacidade Militar</span>
            <div className="h-1 w-1 bg-[#0070FF] rounded-full"></div>
            <span>Seguro</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
