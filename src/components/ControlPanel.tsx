import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSortStore } from '@/store/sort-store';
import { getPresetArrays } from '@/lib/preset-arrays';
import { PresetArray } from '@/types/sort';
import { 
  PlayIcon, 
  PauseIcon, 
  ArrowPathIcon, 
  SunIcon, 
  MoonIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/solid';

export const ControlPanel = () => {
  const {
    isGlobalRunning,
    
    speed,
    darkMode,
    currentArray,
    customArray,
    selectedPreset,
    setGlobalRunning,
    setSpeed,
    toggleDarkMode,
    setCurrentArray,
    setCustomArray,
    setSelectedPreset,
    resetAll,
    initialize,
  } = useSortStore();

  const [showPresets, setShowPresets] = useState(false);
  const [presetArrays, setPresetArrays] = useState<PresetArray[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    setPresetArrays(getPresetArrays());
    initialize();
  }, [initialize]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 shadow-lg">
          <h1 className="text-2xl font-bold">排序算法可视化</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
            <div className="flex space-x-2">
              <button
                onClick={() => setGlobalRunning(!isGlobalRunning)}
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {isGlobalRunning ? (
                  <PauseIcon className="w-5 h-5" />
                ) : (
                  <PlayIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => resetAll()}
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-2 rounded-full ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 可折叠内容 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">速度控制</label>
                    <input
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm text-center mt-1">{speed}x</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">预设数组</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowPresets(!showPresets)}
                        className={`w-full p-2 text-left rounded-lg ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {selectedPreset}
                      </button>
                      {showPresets && (
                        <div
                          className={`absolute z-20 w-full mt-1 rounded-lg shadow-lg ${
                            darkMode ? 'bg-gray-700' : 'bg-white'
                          }`}
                        >
                          {presetArrays.map((preset) => (
                            <button
                              key={preset.name}
                              onClick={() => {
                                setSelectedPreset(preset.name);
                                setCurrentArray(preset.array);
                                setShowPresets(false);
                              }}
                              className={`w-full p-2 text-left hover:bg-opacity-50 ${
                                darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                              }`}
                            >
                              <div className="font-medium">{preset.name}</div>
                              <div className="text-sm opacity-80">{preset.description}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">自定义数组</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customArray}
                        onChange={(e) => setCustomArray(e.target.value)}
                        placeholder="输入数字，用逗号分隔"
                        className={`flex-1 p-2 rounded-lg ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                      />
                      <button
                        onClick={() => {
                          try {
                            const array = customArray
                              .split(',')
                              .map((num) => parseInt(num.trim()))
                              .filter((num) => !isNaN(num));
                            if (array.length > 0) {
                              setCurrentArray(array);
                            }
                          } catch  {
                            console.error('Invalid array format');
                          }
                        }}
                        className={`px-4 py-2 rounded-lg ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        应用
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex space-x-1">
                    {currentArray.map((value, index) => (
                      <div key={index} className="flex flex-col flex-1 items-center justify-end">
                        <div className="h-16 w-full flex items-end">
                          <div
                            className={`w-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                            style={{
                              height: `${(value / Math.max(...currentArray)) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="text-xs whitespace-nowrap">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};