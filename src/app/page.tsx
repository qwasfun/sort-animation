'use client';

import { useEffect } from 'react';
import { ControlPanel } from '@/components/ControlPanel';
import { SortCard } from '@/components/SortCard';
import { useSortStore } from '@/store/sort-store';
import { SortAlgorithm } from '@/types/sort';

const algorithms: SortAlgorithm[] = [
  'bubble',
  'selection',
  'insertion',
  'merge',
  'quick',
  'heap',
  'shell',
  'counting',
  'radix',
  'bucket',
];

export default function Home() {
  const { darkMode } = useSortStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ControlPanel />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.map((algorithm) => (
            <SortCard key={algorithm} algorithm={algorithm} />
          ))}
        </div>
      </div>
    </main>
  );
}