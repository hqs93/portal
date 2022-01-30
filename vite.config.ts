// https://vitejs.dev/config/
import { ConfigEnv, loadEnv, UserConfig } from 'vite' // 使用环境变量
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // JSX
import { VitePWA } from 'vite-plugin-pwa' // PWA 配置
import styleImport from 'vite-plugin-style-import' // ui组件按需加载
import viteCompression from 'vite-plugin-compression' // gzip压缩
// import autoprefixer from 'autoprefixer' // 浏览器前缀

const CWD = process.cwd() // 当前目录
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD) // node解析环境变量文件
  return {
    build: {
      // 移除console
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      host: 'localhost',
      port: 8089, // 端口号
      open: true, // 自动打开
      cors: true, // 允许跨域
      // 代理
      proxy: {
        '/api': {
          target: VITE_BASE_URL,
          changeOrigin: true, // 是否暴露请求target地址
          secure: false, // 图片资源是否采用ES6或Commonjs模块化导入
          rewrite: (path) => path.replace(/^\/api/, '/') // 代理路径替换
        }
      }
    },
    resolve: {
      // 路径别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      // JSX
      vueJsx(),
      // PWA
      VitePWA({
        manifest: {},
        workbox: {
          skipWaiting: true,
          clientsClaim: true
        }
      }),
      // UI组件按需导入
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`
          }
        ]
      }),
      // gzip压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
      // autoprefixer // postcss 浏览器前缀,也可以在css中导入
    ],
    css: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            viewportWidth: 750, // (Number) 视口宽度.
            viewportHeight: 1334, // (Number) 视口高度.
            unitPrecision: 3, // (Number) 保留几位小数，指定`px`转换为视窗单位值的小数位数（很多时候无法整除）.
            viewportUnit: 'vw', // (String) 视口单位.
            selectorBlackList: ['.ignore', '.hairlines'], // (Array) 要忽略的选择器,忽略后保留px.
            minPixelValue: 1, // (Number) 设置要替换的最小像素值.
            mediaQuery: false // (Boolean) 允许在媒体查询中转换px.
          }), // vw适配
          require('autoprefixer'), // postcss 浏览器前缀
          require('postcss-url'), // 文件、字体、图片路径处理
          require('postcss-aspect-ratio-mini'), // 元素容器宽高比
          require('postcss-write-svg')({ utf8: false }), // 移动端1px解决方案
          require('postcss-cssnext'), // CSS未来的特性,兼容
          require('postcss-viewport-units') // vw布局必要插件
        ]
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/styles/index.less')}";` // less全局变量
          },
          javascriptEnabled: true // less-loader脚本配置,默认false关闭,需开启配置为true,less才会生效
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router'],
      exclude: ['vue-demi']
    }
  }
}
