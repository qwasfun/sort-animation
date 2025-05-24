import { create } from 'zustand';
import { SortAlgorithm, SortState } from '@/types/sort';
import { generateSortSteps } from '@/lib/sort-algorithms';

interface SortStore {
  // 全局控制
  isGlobalRunning: boolean;
  isGlobalPaused: boolean;
  speed: number;
  darkMode: boolean;
  currentArray: number[];
  customArray: string;
  selectedPreset: string;

  // 各个算法的状态
  algorithmStates: Record<SortAlgorithm, SortState>;

  // 全局控制方法
  setGlobalRunning: (isRunning: boolean) => void;
  setGlobalPaused: (isPaused: boolean) => void;
  setSpeed: (speed: number) => void;
  toggleDarkMode: () => void;
  setCurrentArray: (array: number[]) => void;
  setCustomArray: (array: string) => void;
  setSelectedPreset: (preset: string) => void;
  resetAll: () => void;

  // 单个算法控制方法
  startAlgorithm: (algorithm: SortAlgorithm) => void;
  pauseAlgorithm: (algorithm: SortAlgorithm) => void;
  resetAlgorithm: (algorithm: SortAlgorithm) => void;
  nextStep: (algorithm: SortAlgorithm) => void;
  prevStep: (algorithm: SortAlgorithm) => void;
}

const initialSortState: SortState = {
  isRunning: false,
  isPaused: false,
  currentStep: 0,
  steps: [],
  stats: {
    comparisons: 0,
    swaps: 0,
    time: 0,
  },
};

const initialAlgorithmStates: Record<SortAlgorithm, SortState> = {
  bubble: { ...initialSortState },
  selection: { ...initialSortState },
  insertion: { ...initialSortState },
  merge: { ...initialSortState },
  quick: { ...initialSortState },
  heap: { ...initialSortState },
  shell: { ...initialSortState },
  counting: { ...initialSortState },
  radix: { ...initialSortState },
  bucket: { ...initialSortState },
};

export const useSortStore = create<SortStore>((set, get) => ({
  // 全局状态
  isGlobalRunning: false,
  isGlobalPaused: false,
  speed: 1,
  darkMode: false,
  currentArray: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)),
  customArray: '',
  selectedPreset: '随机数组',
  algorithmStates: { ...initialAlgorithmStates },

  // 全局控制方法
  setGlobalRunning: (isRunning) => {
    set({ isGlobalRunning: isRunning });
    if (isRunning) {
      Object.keys(get().algorithmStates).forEach((algorithm) => {
        get().startAlgorithm(algorithm as SortAlgorithm);
      });
    } else {
      Object.keys(get().algorithmStates).forEach((algorithm) => {
        get().pauseAlgorithm(algorithm as SortAlgorithm);
      });
    }
  },

  setGlobalPaused: (isPaused) => {
    set({ isGlobalPaused: isPaused });
    Object.keys(get().algorithmStates).forEach((algorithm) => {
      set((state) => ({
        algorithmStates: {
          ...state.algorithmStates,
          [algorithm]: {
            ...state.algorithmStates[algorithm as SortAlgorithm],
            isPaused: isPaused,
          },
        },
      }));
    });
  },

  setSpeed: (speed) => set({ speed }),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  setCurrentArray: (array) => {
    set({ currentArray: array });
    // 重置所有算法的状态
    get().resetAll();
  },

  setCustomArray: (customArray) => {
    set({ customArray });
    try {
      const array = customArray
        .split(',')
        .map((num) => parseInt(num.trim()))
        .filter((num) => !isNaN(num));
      if (array.length > 0) {
        get().setCurrentArray(array);
      }
    } catch (error) {
      console.error('Invalid array format');
    }
  },

  setSelectedPreset: (preset) => set({ selectedPreset: preset }),

  resetAll: () => {
    set((state) => ({
      algorithmStates: Object.keys(state.algorithmStates).reduce(
        (acc, algorithm) => ({
          ...acc,
          [algorithm]: { ...initialSortState },
        }),
        {} as Record<SortAlgorithm, SortState>
      ),
    }));
  },

  // 单个算法控制方法
  startAlgorithm: (algorithm) => {
    const { currentArray } = get();
    const { steps, stats } = generateSortSteps(algorithm, currentArray);

    set((state) => ({
      algorithmStates: {
        ...state.algorithmStates,
        [algorithm]: {
          ...state.algorithmStates[algorithm],
          isRunning: true,
          isPaused: false,
          steps,
          stats,
        },
      },
    }));
  },

  pauseAlgorithm: (algorithm) =>
    set((state) => ({
      algorithmStates: {
        ...state.algorithmStates,
        [algorithm]: {
          ...state.algorithmStates[algorithm],
          isRunning: false,
          isPaused: true,
        },
      },
    })),

  resetAlgorithm: (algorithm) =>
    set((state) => ({
      algorithmStates: {
        ...state.algorithmStates,
        [algorithm]: { ...initialSortState },
      },
    })),

  nextStep: (algorithm) =>
    set((state) => {
      const currentState = state.algorithmStates[algorithm];
      if (currentState.currentStep < currentState.steps.length - 1) {
        return {
          algorithmStates: {
            ...state.algorithmStates,
            [algorithm]: {
              ...currentState,
              currentStep: currentState.currentStep + 1,
            },
          },
        };
      }
      return state;
    }),

  prevStep: (algorithm) =>
    set((state) => {
      const currentState = state.algorithmStates[algorithm];
      if (currentState.currentStep > 0) {
        return {
          algorithmStates: {
            ...state.algorithmStates,
            [algorithm]: {
              ...currentState,
              currentStep: currentState.currentStep - 1,
            },
          },
        };
      }
      return state;
    }),
})); 