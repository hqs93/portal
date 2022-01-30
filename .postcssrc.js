module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': { utf8: false },
    'postcss-cssnext': {},
    'postcss-px-to-viewport': {
      viewportWidth: 750, // (Number) 视口宽度.
      viewportHeight: 1334, // (Number) 视口高度.
      unitPrecision: 3, // (Number) 允许rem单位有多少位小数.
      viewportUnit: 'vw', // (String) 视口单位.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) 要忽略的选择器,忽略后保留px.
      minPixelValue: 1, // (Number) 设置要替换的最小像素值.
      mediaQuery: false // (Boolean) 允许在媒体查询中转换px.
    },
    'postcss-viewport-units': {},
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false
    }
    // to edit target browsers: use "browserslist" field in package.json
  }
}
