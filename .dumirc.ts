import { defineConfig } from 'dumi';

export default defineConfig({
  history: {
    type: 'hash',
  },
  mfsu: false,
  outputPath: 'docs-dist',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  runtimePublicPath: {},
  themeConfig: {
    name: 'aenext',
    nav: [
      { title: '首页', link: '/' },
      { title: '快速开始', link: '/quick-start' },
      {
        title: '组件',
        link: '/number-picker',
        children: [
          { title: '数字输入框', link: '/number-picker' },
          { title: '文本密码', link: '/text-password' },
        ],
      },
    ],
  },
  styles: ['https://g.alicdn.com/code/lib/alifd__next/1.25.38/next.min.css'],
  resolve: {
    docDirs: ['docs', 'packages/components'],
  },
});
