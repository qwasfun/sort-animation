import { PresetArray } from '@/types/sort';

const generateRandomArray = (length: number, max: number) => 
  Array.from({ length }, () => Math.floor(Math.random() * max));

export const getPresetArrays = (): PresetArray[] => [
  {
    name: '随机数组',
    array: generateRandomArray(20, 100),
    description: '生成一个包含20个随机数的数组，范围在0-99之间。',
  },
  {
    name: '已排序数组',
    array: Array.from({ length: 20 }, (_, i) => i * 5),
    description: '一个已经排序好的数组，元素间隔为5。',
  },
  {
    name: '逆序数组',
    array: Array.from({ length: 20 }, (_, i) => (19 - i) * 5),
    description: '一个完全逆序的数组，元素间隔为5。',
  },
  {
    name: '重复元素数组',
    array: Array.from({ length: 20 }, () => Math.floor(Math.random() * 5) * 20),
    description: '一个包含大量重复元素的数组，范围在0-80之间。',
  },
  {
    name: '小范围数组',
    array: generateRandomArray(20, 10),
    description: '一个元素范围较小的数组，所有元素都在0-9之间。',
  },
  {
    name: '大范围数组',
    array: generateRandomArray(20, 1000),
    description: '一个元素范围较大的数组，所有元素都在0-999之间。',
  },
  {
    name: '几乎有序数组',
    array: Array.from({ length: 20 }, (_, i) => i * 5 + Math.floor(Math.random() * 3) - 1),
    description: '一个基本有序但包含少量随机扰动的数组。',
  },
  {
    name: '单元素数组',
    array: Array(20).fill(42),
    description: '一个所有元素都相同的数组。',
  },
]; 