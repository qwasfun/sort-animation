export type SortAlgorithm = 
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap'
  | 'shell'
  | 'counting'
  | 'radix'
  | 'bucket';

export interface SortStep {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  description: string;
}

export interface SortStats {
  comparisons: number;
  swaps: number;
  time: number;
}

export interface SortAlgorithmInfo {
  name: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  description: string;
}

export interface SortState {
  isRunning: boolean;
  isPaused: boolean;
  currentStep: number;
  steps: SortStep[];
  stats: SortStats;
}

export interface PresetArray {
  name: string;
  array: number[];
  description: string;
} 