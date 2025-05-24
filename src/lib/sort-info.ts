import { SortAlgorithm, SortAlgorithmInfo } from '@/types/sort';

export const sortAlgorithmInfo: Record<SortAlgorithm, SortAlgorithmInfo> = {
  bubble: {
    name: '冒泡排序',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description: '冒泡排序是一种简单的排序算法，它重复地遍历要排序的数组，比较相邻元素并交换它们的位置。',
  },
  selection: {
    name: '选择排序',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description: '选择排序是一种简单直观的排序算法，它的工作原理是每次从未排序部分选择最小元素放到已排序部分的末尾。',
  },
  insertion: {
    name: '插入排序',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description: '插入排序是一种简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
  },
  merge: {
    name: '归并排序',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    description: '归并排序是采用分治法的一个典型应用，它将数组分成两半，分别排序，然后将结果合并。',
  },
  quick: {
    name: '快速排序',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
    description: '快速排序是一种分治的排序算法，它选择一个基准值，将数组分成两部分，小于基准值的元素放在左边，大于基准值的元素放在右边。',
  },
  heap: {
    name: '堆排序',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
    description: '堆排序是一种基于二叉堆的比较排序算法，它首先构建最大堆，然后逐个提取最大元素。',
  },
  shell: {
    name: '希尔排序',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log² n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    description: '希尔排序是插入排序的一种改进版本，它通过比较相距一定间隔的元素来工作，逐步减小间隔直到为1。',
  },
  counting: {
    name: '计数排序',
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n + k)',
    },
    spaceComplexity: 'O(k)',
    description: '计数排序是一种非比较排序算法，它通过统计每个元素出现的次数来确定元素的位置。',
  },
  radix: {
    name: '基数排序',
    timeComplexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)',
    },
    spaceComplexity: 'O(n + k)',
    description: '基数排序是一种非比较排序算法，它按照每个数字的位数进行排序，从最低位到最高位。',
  },
  bucket: {
    name: '桶排序',
    timeComplexity: {
      best: 'O(n + k)',
      average: 'O(n + k)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(n + k)',
    description: '桶排序是一种非比较排序算法，它将数据分到有限数量的桶中，每个桶再分别排序。',
  },
}; 