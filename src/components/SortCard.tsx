import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SortAlgorithm } from '@/types/sort';
import { useSortStore } from '@/store/sort-store';
import { sortAlgorithmInfo } from '@/lib/sort-info';
import { PlayIcon, PauseIcon, ArrowPathIcon, ArrowUturnLeftIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

interface SortCardProps {
  algorithm: SortAlgorithm;
}

export const SortCard = ({ algorithm }: SortCardProps) => {
  const {
    algorithmStates,
    speed,
    darkMode,
    startAlgorithm,
    pauseAlgorithm,
    resetAlgorithm,
    nextStep,
    prevStep,
  } = useSortStore();

  const state = algorithmStates[algorithm];
  const info = sortAlgorithmInfo[algorithm];
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (state.isRunning && !state.isPaused) {
      intervalRef.current = setInterval(() => {
        if (state.currentStep < state.steps.length - 1) {
          nextStep(algorithm);
        } else {
          pauseAlgorithm(algorithm);
        }
      }, 1000 / speed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.isPaused, state.currentStep, speed, algorithm, nextStep, pauseAlgorithm]);

  const currentStep = state.steps[state.currentStep] || { array: [], comparingIndices: [], swappedIndices: [], description: '' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 shadow-lg ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">{info.name}</h3>
        <p className="text-sm opacity-80 mb-2">{info.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-semibold">时间复杂度：</p>
            <p>最好：{info.timeComplexity.best}</p>
            <p>平均：{info.timeComplexity.average}</p>
            <p>最坏：{info.timeComplexity.worst}</p>
          </div>
          <div>
            <p className="font-semibold">空间复杂度：</p>
            <p>{info.spaceComplexity}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            <button
              onClick={() => (state.isRunning ? pauseAlgorithm(algorithm) : startAlgorithm(algorithm))}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {state.isRunning ? (
                <PauseIcon className="w-5 h-5" />
              ) : (
                <PlayIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => resetAlgorithm(algorithm)}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => prevStep(algorithm)}
              disabled={state.currentStep === 0}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } ${state.currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <BackwardIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => nextStep(algorithm)}
              disabled={state.currentStep === state.steps.length - 1}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              } ${state.currentStep === state.steps.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ForwardIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm">
            <p>步骤：{state.currentStep + 1} / {state.steps.length}</p>
          </div>
        </div>
        <p className="text-sm mb-2">{currentStep.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-end h-32 space-x-1">
          {currentStep.array.map((value, index) => (
            <motion.div
              key={index}
              className={`flex-1 ${
                currentStep.comparingIndices.includes(index)
                  ? 'bg-yellow-500'
                  : currentStep.swappedIndices.includes(index)
                  ? 'bg-green-500'
                  : darkMode
                  ? 'bg-gray-600'
                  : 'bg-gray-200'
              }`}
              style={{
                height: `${(value / Math.max(...currentStep.array)) * 100}%`,
              }}
              initial={false}
              animate={{
                height: `${(value / Math.max(...currentStep.array)) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <p className="font-semibold">比较次数：</p>
          <p>{state.stats.comparisons}</p>
        </div>
        <div>
          <p className="font-semibold">交换次数：</p>
          <p>{state.stats.swaps}</p>
        </div>
        <div>
          <p className="font-semibold">耗时：</p>
          <p>{state.stats.time.toFixed(2)}ms</p>
        </div>
      </div>
    </motion.div>
  );
}; 