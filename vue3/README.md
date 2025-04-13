# Vue 3 核心知识点示例

## Vue 3 主要新特性
- setup **Composition API**: 替代Options API，提供更好的代码组织和复用
- **性能优化**: 
  - 更快的虚拟DOM
  - 更小的打包体积
  - 更高效的反应式系统
- **TypeScript支持**: 更好的TS集成和类型推断
- **新组件**: Fragment, Teleport, Suspense
- **响应式API**: 独立的ref和reactive函数
- **生命周期钩子重命名**: beforeDestroy → beforeUnmount, destroyed → unmounted


## 测试说明
测试用例覆盖以下功能：

0. Teleport
1. 初始消息渲染
2. 消息反转功能
3. 计数增加功能
4. 异步Suspense组件渲染

## 运行测试
```bash
npm install
npm test

npm run dev
npm run build
```
