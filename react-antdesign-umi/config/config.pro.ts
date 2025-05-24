import { defineConfig } from '@umijs/max';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/antd', '@umijs/plugins/dist/locale'],
  antd: {
    import: false,
    style: 'css'
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  routes: [
    { path: '/', component: '@/pages/Home' },
  ],
  npmClient: 'npm',
});
