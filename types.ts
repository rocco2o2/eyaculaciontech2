
export enum QuestionType {
  BUTTONS = 'BUTTONS',
  SLIDER = 'SLIDER',
  ANIMATION = 'ANIMATION',
  IMPACT = 'IMPACT',
  CHART = 'CHART',
  CTA = 'CTA'
}

export interface Option {
  label: string;
  value: any;
}

export interface Question {
  id: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  animationText?: string;
}

export interface UserData {
  age?: string;
  challenge?: string;
  duration?: string;
  pointNoReturn?: string;
  rigidity?: number;
  pcMuscle?: string;
  sensitivity?: number;
  stressEscapes?: string;
  methodsTried?: string;
}
