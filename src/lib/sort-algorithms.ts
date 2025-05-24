import { SortAlgorithm, SortStep, SortStats } from '@/types/sort';

export const generateSortSteps = (
  algorithm: SortAlgorithm,
  array: number[]
): { steps: SortStep[]; stats: SortStats } => {
  const steps: SortStep[] = [];
  const stats: SortStats = {
    comparisons: 0,
    swaps: 0,
    time: 0,
  };

  const startTime = performance.now();

  switch (algorithm) {
    case 'bubble':
      return bubbleSort([...array], steps, stats);
    case 'selection':
      return selectionSort([...array], steps, stats);
    case 'insertion':
      return insertionSort([...array], steps, stats);
    case 'merge':
      return mergeSort([...array], steps, stats);
    case 'quick':
      return quickSort([...array], steps, stats);
    case 'heap':
      return heapSort([...array], steps, stats);
    case 'shell':
      return shellSort([...array], steps, stats);
    case 'counting':
      return countingSort([...array], steps, stats);
    case 'radix':
      return radixSort([...array], steps, stats);
    case 'bucket':
      return bucketSort([...array], steps, stats);
    default:
      throw new Error(`Unsupported algorithm: ${algorithm}`);
  }
};

const addStep = (
  array: number[],
  steps: SortStep[],
  comparingIndices: number[] = [],
  swappedIndices: number[] = [],
  description: string
) => {
  steps.push({
    array: [...array],
    comparingIndices,
    swappedIndices,
    description,
  });
};

// 冒泡排序
const bubbleSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const n = array.length;
  addStep(array, steps, [], [], '开始冒泡排序');

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;
      addStep(array, steps, [j, j + 1], [], `比较 ${array[j]} 和 ${array[j + 1]}`);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        stats.swaps++;
        addStep(array, steps, [], [j, j + 1], `交换 ${array[j]} 和 ${array[j + 1]}`);
      }
    }
  }

  addStep(array, steps, [], [], '冒泡排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 选择排序
const selectionSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const n = array.length;
  addStep(array, steps, [], [], '开始选择排序');

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    addStep(array, steps, [i], [], `选择第 ${i + 1} 个位置`);

    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      addStep(array, steps, [minIndex, j], [], `比较 ${array[minIndex]} 和 ${array[j]}`);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      stats.swaps++;
      addStep(array, steps, [], [i, minIndex], `将最小值 ${array[i]} 放到位置 ${i + 1}`);
    }
  }

  addStep(array, steps, [], [], '选择排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 插入排序
const insertionSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const n = array.length;
  addStep(array, steps, [], [], '开始插入排序');

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;
    addStep(array, steps, [i], [], `准备插入 ${key}`);

    while (j >= 0) {
      stats.comparisons++;
      addStep(array, steps, [j, j + 1], [], `比较 ${array[j]} 和 ${key}`);

      if (array[j] > key) {
        array[j + 1] = array[j];
        stats.swaps++;
        addStep(array, steps, [], [j, j + 1], `移动 ${array[j]} 到右侧`);
        j--;
      } else {
        break;
      }
    }

    array[j + 1] = key;
    addStep(array, steps, [], [j + 1], `插入 ${key} 到位置 ${j + 2}`);
  }

  addStep(array, steps, [], [], '插入排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 归并排序
const mergeSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const merge = (left: number[], right: number[], startIndex: number): number[] => {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      stats.comparisons++;
      addStep(
        array,
        steps,
        [startIndex + i, startIndex + left.length + j],
        [],
        `比较 ${left[i]} 和 ${right[j]}`
      );

      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    while (i < left.length) {
      result.push(left[i]);
      i++;
    }

    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    // 更新原数组
    for (let k = 0; k < result.length; k++) {
      array[startIndex + k] = result[k];
      stats.swaps++;
    }

    addStep(
      array,
      steps,
      [],
      Array.from({ length: result.length }, (_, i) => startIndex + i),
      '合并完成'
    );

    return result;
  };

  const sort = (arr: number[], startIndex: number): number[] => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = sort(arr.slice(0, mid), startIndex);
    const right = sort(arr.slice(mid), startIndex + mid);

    return merge(left, right, startIndex);
  };

  addStep(array, steps, [], [], '开始归并排序');
  sort(array, 0);
  addStep(array, steps, [], [], '归并排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 快速排序
const quickSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const partition = (low: number, high: number): number => {
    const pivot = array[high];
    let i = low - 1;

    addStep(array, steps, [high], [], `选择基准值 ${pivot}`);

    for (let j = low; j < high; j++) {
      stats.comparisons++;
      addStep(array, steps, [j, high], [], `比较 ${array[j]} 和基准值 ${pivot}`);

      if (array[j] <= pivot) {
        i++;
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          stats.swaps++;
          addStep(array, steps, [], [i, j], `交换 ${array[i]} 和 ${array[j]}`);
        }
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    stats.swaps++;
    addStep(array, steps, [], [i + 1, high], `将基准值放到正确位置`);

    return i + 1;
  };

  const sort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };

  addStep(array, steps, [], [], '开始快速排序');
  sort(0, array.length - 1);
  addStep(array, steps, [], [], '快速排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 堆排序
const heapSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const heapify = (n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      stats.comparisons++;
      addStep(array, steps, [largest, left], [], `比较 ${array[largest]} 和 ${array[left]}`);
      if (array[left] > array[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      stats.comparisons++;
      addStep(array, steps, [largest, right], [], `比较 ${array[largest]} 和 ${array[right]}`);
      if (array[right] > array[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      stats.swaps++;
      addStep(array, steps, [], [i, largest], `交换 ${array[i]} 和 ${array[largest]}`);
      heapify(n, largest);
    }
  };

  addStep(array, steps, [], [], '开始堆排序');

  // 构建最大堆
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array.length, i);
  }

  // 逐个提取元素
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    stats.swaps++;
    addStep(array, steps, [], [0, i], `将最大值 ${array[i]} 放到末尾`);
    heapify(i, 0);
  }

  addStep(array, steps, [], [], '堆排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 希尔排序
const shellSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const n = array.length;
  addStep(array, steps, [], [], '开始希尔排序');

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    addStep(array, steps, [], [], `使用间隔 ${gap} 进行插入排序`);

    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j;

      for (j = i; j >= gap; j -= gap) {
        stats.comparisons++;
        addStep(array, steps, [j - gap, j], [], `比较 ${array[j - gap]} 和 ${temp}`);

        if (array[j - gap] > temp) {
          array[j] = array[j - gap];
          stats.swaps++;
          addStep(array, steps, [], [j, j - gap], `移动 ${array[j - gap]} 到位置 ${j + 1}`);
        } else {
          break;
        }
      }

      array[j] = temp;
      if (j !== i) {
        addStep(array, steps, [], [j], `插入 ${temp} 到位置 ${j + 1}`);
      }
    }
  }

  addStep(array, steps, [], [], '希尔排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 计数排序
const countingSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(array.length);

  addStep(array, steps, [], [], '开始计数排序');

  // 统计每个元素出现的次数
  for (let i = 0; i < array.length; i++) {
    count[array[i] - min]++;
    addStep(array, steps, [i], [], `统计元素 ${array[i]} 的出现次数`);
  }

  // 计算每个元素的位置
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 构建输出数组
  for (let i = array.length - 1; i >= 0; i--) {
    const value = array[i];
    const index = count[value - min] - 1;
    output[index] = value;
    count[value - min]--;
    stats.swaps++;
    addStep(
      array,
      steps,
      [],
      [i],
      `将元素 ${value} 放到输出数组的位置 ${index + 1}`
    );
  }

  // 复制回原数组
  for (let i = 0; i < array.length; i++) {
    array[i] = output[i];
    addStep(array, steps, [], [i], `更新原数组位置 ${i + 1} 为 ${output[i]}`);
  }

  addStep(array, steps, [], [], '计数排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 基数排序
const radixSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const max = Math.max(...array);
  const maxDigits = Math.floor(Math.log10(max)) + 1;

  addStep(array, steps, [], [], '开始基数排序');

  for (let digit = 0; digit < maxDigits; digit++) {
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    addStep(array, steps, [], [], `处理第 ${digit + 1} 位数字`);

    // 将数字分配到桶中
    for (let i = 0; i < array.length; i++) {
      const num = array[i];
      const digitValue = Math.floor(num / Math.pow(10, digit)) % 10;
      buckets[digitValue].push(num);
      addStep(array, steps, [i], [], `将 ${num} 放入桶 ${digitValue}`);
    }

    // 从桶中收集数字
    let index = 0;
    for (let i = 0; i < 10; i++) {
      for (const num of buckets[i]) {
        array[index] = num;
        stats.swaps++;
        addStep(array, steps, [], [index], `从桶 ${i} 中取出 ${num}`);
        index++;
      }
    }
  }

  addStep(array, steps, [], [], '基数排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
};

// 桶排序
const bucketSort = (
  array: number[],
  steps: SortStep[],
  stats: SortStats
): { steps: SortStep[]; stats: SortStats } => {
  const min = Math.min(...array);
  const max = Math.max(...array);
  const bucketCount = Math.floor(Math.sqrt(array.length));
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  addStep(array, steps, [], [], '开始桶排序');

  // 将数字分配到桶中
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    const bucketIndex = Math.floor(((num - min) / (max - min)) * (bucketCount - 1));
    buckets[bucketIndex].push(num);
    addStep(array, steps, [i], [], `将 ${num} 放入桶 ${bucketIndex + 1}`);
  }

  // 对每个桶进行排序
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      addStep(array, steps, [], [], `对桶 ${i + 1} 进行排序`);
      buckets[i].sort((a, b) => {
        stats.comparisons++;
        return a - b;
      });

      // 将排序后的数字放回原数组
      for (const num of buckets[i]) {
        array[index] = num;
        stats.swaps++;
        addStep(array, steps, [], [index], `从桶 ${i + 1} 中取出 ${num}`);
        index++;
      }
    }
  }

  addStep(array, steps, [], [], '桶排序完成');
  stats.time = performance.now() - stats.time;
  return { steps, stats };
}; 