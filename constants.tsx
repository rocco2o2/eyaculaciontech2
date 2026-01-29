
import { Question, QuestionType } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: QuestionType.BUTTONS,
    title: "Qual seu intervalo etário?",
    subtitle: "Ajuste de biomarcadores pélvicos.",
    options: [
      { label: "18 - 25 anos", value: "18-25" },
      { label: "26 - 35 anos", value: "26-35" },
      { label: "36 - 45 anos", value: "36-45" },
      { label: "46+ anos", value: "46+" }
    ]
  },
  {
    id: 2,
    type: QuestionType.BUTTONS,
    title: "Seu Sintoma Crítico:",
    subtitle: "Barreira fisiológica prioritária.",
    options: [
      { label: "Controle Ejaculatório", value: "control" },
      { label: "Manutenção da Rigidez", value: "rigidity" },
      { label: "Atonia Muscular (PC fraco)", value: "desire" }
    ]
  },
  {
    id: 3,
    type: QuestionType.BUTTONS,
    title: "Tempo de Resposta Médio:",
    subtitle: "Janela de retenção atual.",
    options: [
      { label: "Fase Crítica (< 2 min)", value: "<2" },
      { label: "Fase Instável (2 a 5 min)", value: "2-5" },
      { label: "Elite Controlada (10 min+)", value: "10+" }
    ]
  },
  {
    id: 4,
    type: QuestionType.SLIDER,
    title: "Nível de Rigidez (EHS)",
    subtitle: "Defina a firmeza média atual.",
    min: 1,
    max: 4,
    step: 1,
    labels: ["Flácido", "Intermediário", "Firme", "Rigidez Elite"]
  },
  {
    id: 5,
    type: QuestionType.BUTTONS,
    title: "Conexão Mente-Músculo PC?",
    subtitle: "Você consegue isolar o músculo?",
    options: [
      { label: "Domínio Completo", value: "yes" },
      { label: "Consciência Parcial", value: "maybe" },
      { label: "Sem Conexão Neural", value: "no" }
    ]
  },
  {
    id: 6,
    type: QuestionType.ANIMATION,
    title: "[PROCESSANDO GENÉTICA]",
    animationText: "Cruzando dados com biotipos de alta performance..."
  },
  {
    id: 7,
    type: QuestionType.IMPACT,
    title: "PERFIL IDENTIFICADO",
    subtitle: "Relatório de bio-compatibilidade concluído."
  },
  {
    id: 8,
    type: QuestionType.CHART,
    title: "MAPA DE EVOLUÇÃO",
    subtitle: "Comparativo: Estado Atual vs Potencial Máximo."
  },
  {
    id: 9,
    type: QuestionType.CTA,
    title: "SISTEMA DESBLOQUEADO",
    subtitle: "O protocolo definitivo de 28 dias aguarda você."
  }
];

export const HEALTH_TIPS = [
  "A respiração diafragmática ativa o parassimpático, 'desligando' a pressa.",
  "Contrações do músculo PC por 3s aumentam a rigidez em até 42%.",
  "O zinco e magnésio são os tijolos da sua estabilidade nervosa.",
  "O ponto de não retorno pode ser empurrado em até 15 min via neuromodulação.",
  "Performance é 80% calibração neural e 20% força física."
];
