# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
## 功能说明
传统布局：display position float
flex布局：2009 W3C，主流的浏览器都支持
Grid布局：需要验证浏览器支持情况
一般大厂弹性布局不使用开源布局组件，使用百分比+flex设置较多
## Content.tsx
AntDesign Layout需要指定高、宽度，实际上还是使用的 flex布局
```
<div style={{ display: 'flex' }}>
```

## Content2.tsx
CSS Grid布局，表格样式布局，不需要指定高、宽度，适用于提前规划各部分展示位置的场景，不适用于弹性布局
```
  display: 'grid',
  gridTemplateAreas: `
    "left image"
    "left bottom"
  `,
  gridTemplateColumns: '30% 70%',
  gridTemplateRows: 'minmax(200px, auto) 1fr',
  gap: '10px',

  gridArea: 'left',

  gridArea: 'image',

  gridArea: 'bottom',
```

## Content3.tsx
AntDesign Grid（Row Col）布局 不需要指定高、宽度，根据设备宽度设置对应的显示比例xs/md/lg 等等，实际上还是使用的 flex布局，更适用于兼容不同屏幕的场景

```
动态计算flex CSS
<div style={{ flex: 0 0 33.33333333333333%,max-width: 33.33333333333333%}}>
flex 参考 Content4.tsx
```

## Content4.tsx
AntDesign Flex布局 不需要指定高、宽度，根据子元素高或者宽度进行布局
```
<div style={{ display: 'flex' }}>
核心CSS样式

flex: 1 1 0% 缩放规则，必须父元素display: flex
以上一条样式相当于以下三条样式
flex-grow: 1 默认是1，设置放大比例
flex-shrink: 1 默认值是1，设置缩放比例
flex-basis: 0% 默认值是auto，设置宽度

justifyContent: center 主轴内容居中
alignItems: center 交叉轴内容居中
flexDirection: column 主轴方向
```

## Content5.tsx
基于百分比和媒体查询实现响应式布局
```
100vh/100%
@media screen and (max-width: 600px) {}
```