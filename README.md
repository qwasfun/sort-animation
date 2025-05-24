# 排序算法可视化

一个交互式的排序算法可视化工具，使用 Next.js 和 Tailwind CSS 构建。该项目展示了多种排序算法的运行过程，并提供了丰富的交互功能。

## 功能特点

- 支持多种排序算法的可视化：
  - 冒泡排序
  - 选择排序
  - 插入排序
  - 归并排序
  - 快速排序
  - 堆排序
  - 希尔排序
  - 计数排序
  - 基数排序
  - 桶排序

- 每个算法卡片包含：
  - 算法名称和描述
  - 时间和空间复杂度说明
  - 实时动画展示
  - 比较次数和交换次数统计
  - 排序耗时统计
  - 单步执行控制

- 全局控制功能：
  - 一键启动/暂停所有算法
  - 速度调节
  - 暗黑模式切换
  - 预设数组选择
  - 自定义数组输入

- 预设数组类型：
  - 随机数组
  - 已排序数组
  - 逆序数组
  - 重复元素数组
  - 小范围数组
  - 大范围数组
  - 几乎有序数组
  - 单元素数组

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Headless UI
- Heroicons

## 开始使用

1. 克隆项目：

```bash
git clone https://github.com/yourusername/sort-animation.git
cd sort-animation
```

2. 安装依赖：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm run dev
```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                 # Next.js 应用目录
├── components/          # React 组件
├── lib/                 # 工具函数和配置
├── store/              # 状态管理
└── types/              # TypeScript 类型定义
```

## 贡献指南

欢迎提交 Issue 和 Pull Request！在提交 PR 之前，请确保：

1. 代码符合项目的代码风格
2. 添加了必要的测试
3. 更新了相关文档

## 许可证

MIT
