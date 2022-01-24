# 前言

Vue3 + vite + ts + Antd + Less + Vuex

***



# 一.开发环境准备

node: 版本>=8

nvm: nodejs版本管理工具

degit: 脚手架工具

yarn: 包管理工具

@vue/cli: 版本4++

***



# 二.代码规范化方案 

## 方案一: eslint + stylelint

### 1.安装 VSCode 插件

```ruby
eslint
stylelint
volar
```

### 2.VSCode 配置文件

```json
"editor.codeActionsOnSave": {
    "source.fixAll": true,
},
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript"
],
"eslint.alwaysShowStatus": true,
"stylelint.validate": [
    "css",
    "less",
    "postcss",
    "scss",
    "vue",
    "sass"
]
```

### 3.安装项目依赖

```ruby
yarn add eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-typescript eslint-plugin-vue husky sass stylelint stylelint-config-standard stylelint-scss typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-eslint-parser -D
```

Package.json版本

```json
"@typescript-eslint/eslint-plugin": "^5.1.0",
"@typescript-eslint/parser": "^5.1.0",
"eslint": "^7.2.0",
"eslint-config-airbnb-base": "^14.2.1",
"eslint-plugin-import": "^2.25.2",
"eslint-plugin-typescript": "^0.14.0",
"eslint-plugin-vue": "^7.20.0",
"husky": "^4.2.3",
"sass": "^1.43.3",
"stylelint": "^13.13.1",
"stylelint-config-standard": "^22.0.0",
"stylelint-scss": "^3.21.0",
"typescript": "^4.4.3",
"vue-eslint-parser": "^7.11.0",
```

### 4.配置`.eslintrc.js` 文件

```javascript
module.exports = {
    root: true,
    globals: {
        defineEmits: 'readonly',
        defineProps: 'readonly',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'airbnb-base',      
    ],
    parser: 'vue-eslint-parser',
    plugins: [
        '@typescript-eslint',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
    },
    rules: {
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-bitwise': 'off',
        'no-tabs': 'off',
        'array-element-newline': ['error', 'consistent'],
        indent: ['error', 4, { MemberExpression: 0, SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
        quotes: ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['error', 'always'],
        'max-len': ['error', 120],
        'no-new': 'off',
        'linebreak-style': 'off',
        'import/extensions': 'off',
        'eol-last': 'off',
        'no-shadow': 'off',
        'no-unused-vars': 'warn',
        'import/no-cycle': 'off',
        'arrow-parens': 'off',
        semi: ['error', 'never'],
        eqeqeq: 'off',
        'no-param-reassign': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-continue': 'off',
        'prefer-destructuring': 'off',
        'no-plusplus': 'off',
        'prefer-const': 'off',
        'global-require': 'off',
        'no-prototype-builtins': 'off',
        'consistent-return': 'off',
        'vue/require-component-is': 'off',
        'prefer-template': 'off',
        'one-var-declaration-per-line': 'off',
        'one-var': 'off',
        'import/named': 'off',
        'object-curly-newline': 'off',
        'default-case': 'off',
        'import/order': 'off',
        'no-trailing-spaces': 'off',
        'func-names': 'off',
        radix: 'off',
        'no-unused-expressions': 'off',
        'no-underscore-dangle': 'off',
        'no-nested-ternary': 'off',
        'no-restricted-syntax': 'off',
        'no-mixed-operators': 'off',
        'no-await-in-loop': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'no-case-declarations': 'off',
        'template-curly-spacing': 'off',
        'vue/valid-v-for': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'no-empty': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'guard-for-in': 'off',
        '@typescript-eslint/ban-types': 'off',
        'class-methods-use-this': 'off',
        'no-return-await': 'off',
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': ['warn', {
            singleline: {
                max: 3,
                allowFirstLine: true,
            },      
            multiline: {
                max: 1,
                allowFirstLine: false,
            },
        }],
        'vue/singleline-html-element-content-newline': 'off',
    },
}
```

### 5.配置`.stylelintrc.js` 文件

```javascript
module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'indentation': 4,
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
        'number-leading-zero': 'never',
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'selector-type-no-unknown': null,
        'at-rule-no-unknown': null,
        'no-duplicate-selectors': null,
        'no-empty-source':null,
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }]
    }
}
```



## 方案二: eslint + prettier

### 1.代码检查工具husky

在git -> hooks -> pre-commit之前执行npm test进行格式检查

```javascript
git版本要求 > 2.9
git --version获取版本

1.终端执行 npm install husky -D
2.package.json 文件中添加脚本 "prepare": "husky install"
3.终端执行 npm run prepare
4.终端执行 npx husky add .husky/pre-commit "npm test" //增加husky配置文件
5.git add .husky/pre-commit // 添加git pre-commit订阅，在每次commit之前执行npm test

// package.json
"test": "vue-tsc --noEmit"
```

### 2.ts别名文件路径设置

vite.config.js文件注意：如果你想在*ts*环境中运行，必须在tsconfig.json中同步前缀配置，否则会报异常。

```js
    //tsconfig.json
    "baseUrl": "./",
    "paths": {
      "@/*":["./src/*"]
    }
    
    // vite.config.ts
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
```

### 3.vscode语法高亮显示，插件移除vetur,使用Volar

### 4.代码语法检查与格式化

eslint：代码检测工具，避免低级错误和统一代码的风格，但prettier对于代码风格统一更专业，我们这里使用prettier进行代码格式化。

prettier: 代码格式美化

```javascript
安装依赖
npm install -D eslint eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier eslint-plugin-prettier

1. prettier // prettier的核心代码
2. eslint-config-prettier // 这将禁用 ESLint 中的格式化规则，而 Prettier 将负责处理这些规则
3. eslint-plugin-prettier  // 把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入，统一代码问题的来源。

1. eslint // ESLint的核心代码
2. @typescript-eslint/parser // ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
3. @typescript-eslint/eslint-plugin // ESLint插件，包含了各类定义好的检测Typescript代码的规范
4. eslint-plugin-vue // 支持对vue文件检验
5. vite-plugin-eslint // 错误将在浏览器中报告，而不止在终端，按需使用

// .eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module', //Allowsfortheuseofimports
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {}
}

// .prettierrc.js
module.exports = {
  printWidth: 160, // 单行输出（不折行）的（最大）长度  
  tabWidth: 2, // 每个缩进级别的空格数  
  tabs: false, // 使用制表符 (tab) 缩进行而不是空格 (space)  
  semi: false, // 是否在语句末尾打印分号  
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号  
  bracketSpacing: true, // 是否在对象属性添加空格  
  htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的  
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号  
  useTabs: false, // 不使用缩进符，而使用空格  
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号  
  // arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号  
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容  
  proseWrap: 'always', // 当超出print width（上面有这个参数）时就折行  
  endOfLine: 'lf', // 换行符使用 lf
  "max-lines-per-function": [ 2, { max: 320, skipComments: true, skipBlankLines: true }, ] // 每个函数最大行数
}
```

最终package.json内容如下

```javascript
// package.json
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview",
    "prepare": "husky install",
    "test": "vue-tsc --noEmit",
    "lint": "eslint --ext .js,.ts,.vue --ignore-path .gitignore --fix src",
    "format": "prettier .  --write"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "vant": "^3.2.1",
    "vue": "^3.2.6",
    "vue-router": "^4.0.11",
    "vuex": "^4.0.2",
    "vuex-persistedstate": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^16.9.6",
    "@types/qs": "^6.9.7",
    "@typescript-eslint/eslint-plugin": "^4.31.2",
    "@typescript-eslint/parser": "^4.31.2",
    "@vitejs/plugin-vue": "^1.6.0",
    "@vue/compiler-sfc": "^3.0.5",
    "autoprefixer": "^10.3.3",
    "core-js": "^3.18.0",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^7.18.0",
    "husky": "^7.0.2",
    "postcss-px-to-viewport": "^1.1.1",
    "prettier": "2.4.1",
    "sass": "^1.38.2",
    "typescript": "^4.3.2",
    "vite": "^2.5.1",
    "vite-plugin-style-import": "^1.2.1",
    "vue-tsc": "^0.2.2"
  }
```

### 5.vscode自动保存格式化

如果使用vscode,可以安装Prettier插件、ESLint插件进行代码检查和格式化.以上依赖包的形式是为了在别的编辑器中及构建过程中保持代码风格一致。

```json
// 在vscode扩展中安装插件，安装完成后对vscode进行设置，code=>首选项=>设置=>搜索 codeActionsOnSave选择 在 settings.json 中编辑
// settings.json
"editor.formatOnSave": true, // 是否开启vscode的保存自动格式化
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
"eslint.format.enable": true //是否开启vscode的eslint
```



## IDE工具代码风格配置

.editorconfig

```javascript
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```

***



# 三.文件类型适配

## 1.全局声明文件

**以(.d.ts)结尾的文件为全局声明文件,只能在TS文件中使用.关键字declare.**

以vue-ts为模版创建的项目默认都会在src目录下生成dev.d.ts文件,也可以创建自定义xxx.d.ts全局声明文件,项目中一般会在src目录下新建types文件,在types文件中存放全局声明文件.

```typescript
declare const NUM = 10;
declare module "qs";
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
```



## 2.node文件声明

Typescript 只能识别.ts文件,无法识别.vue、node等文件所以要进行相应配置才能正常引入.

node类型声明:

```ruby
yarn add @types/node -D
```

***



# 四.css解决方案

## 1. 样式初始化

| 插件                                | 说明                                                                                                                                                                                       | 所需依赖                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| ***normalize.css***                 | 统一了基本的样式.                                                                                                                                                                          | ----                                 |
| ***postcss-loader & Autoprefixer*** | 这是postcss系列插件(Autoprefixer在以前是postcss系列的核心功能),postcss-loader负责处理css解析让webpack能够识别,Autoprefixer负责自动化添加浏览器前缀,两者结合使用解决大多数浏览器的兼容问题. | **postcss-loader**、**Autoprefixer** |

### 

## 2.css预处理器

### Less

#### 1.安装项目依赖

```ruby
yarn add less less-loader -D
```

#### 2.全局less变量,配置vite.config.js文件

```typescript
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('./src/styles/global/index.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  }
})
```



### scss

#### 1.安装项目依赖

```ruby
yarn add sass sass-loader -D
```

#### 2.全局scss变量,配置vite.config.js文件

```typescript
export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      localsConvention: 'camelCase', // 默认只支持驼峰，修改为同时支持横线和驼峰
    },
    preprocessorOptions: {
      scss: {
       	charset: false, // 关闭build时的 @charset 必须在第一行的警告
        additionalData: '@import "./src/styles/index.scss";',
      },
    },
  }
})
```

***



# 五.适配方案



***



# 六.请求处理



***



# 优化

## 1.路径别名

```typescript
import { resolve } from 'path'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
```

***





# 提交规范

**Commitizen(@ziyi2/ui-cz):** git提交工具集,vue3插件

如果对cz工具配置感到繁琐,可以使用基于Vue CLI 3脚手架的@ziyi2/ui-cz插件一键生成,该插件采用了**cz-customizable**定制化**提交说明**的适配器、**@commitlint/config-conventional**校验规则以及**conventional-changelog**日志生成器.

```ruby
vue add @ziyi2/ui-cz
```

***



# 常见问题

***



# 测试工具

Jest



# jsx支持

```ruby
npm install -D @vitejs/plugin-vue-jsx
```

***



# 说明文档

## 公共组件说明文档 vuepress

如果需要开发公共组件提供给各个团队使用的话，我们需要一份公共组件使用说明。vue技术栈的话可以使用**vuepress**,已经支持了vue2与vue3,react技术栈的话可以使用**dumi**。

以vuepress作为示例进行简单说明

```ruby
1.创建并进入一个新目录
 mkdir vuepress-starter && cd vuepress-starter
2.使用你喜欢的包管理器进行初始化
 yarn init 
 或者
 npm init
3.将VuePress 安装为本地依赖
 yarn add -D vuepress 
 或者
 npm install -D vuepress
4.创建你的第一篇文档
 mkdir docs && echo '# Hello VuePress' > docs/README.md
 5.在 `package.json` 中添加一些 scripts
 {
   "scripts": {
     "docs:dev": "vuepress dev docs",
     "docs:build": "vuepress build docs"
   }
 }
 6.在本地启动服务器
 yarn docs:dev
 或者
 npm run docs:dev
```



# 环境配置

Vite 在 import.meta.env 对象上暴露环境变量。下面有一些常用的内建变量：

import.meta.env.MODE: string 应用当前运行的模式。
import.meta.env.BASE_URL: string 应用正被部署在的 base URL。它由 base 配置项决定。
import.meta.env.PROD: boolean 应用是否运行在生产环境。
import.meta.env.DEV: boolean 应用是否运行在开发环境。