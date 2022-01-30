# 前言

Vue3 + vite + ts + Antd + Less + Vuex 搭建记录

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

```shell
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

```shell
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

```shell
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
```

- .eslintrc.js文件

```javascript
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
```

- .eslintignore文件

```tsx
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
/public
/docs
.husky
.local
/bin
Dockerfile
```

- .prettierrc.js文件

```javascript
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

- package.json内容如下

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

- .editorconfig文件

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

```shell
yarn add @types/node -D
```

***



# 四.css解决方案

## 1. 样式初始化

| 插件                                | 说明                                                         | 所需依赖                             |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| ***normalize.css***                 | 统一了基本的样式.                                            | ----                                 |
| ***postcss-loader & Autoprefixer*** | 这是postcss系列插件(Autoprefixer在以前是postcss系列的核心功能),postcss-loader负责处理css解析让webpack能够识别,Autoprefixer负责自动化添加浏览器前缀,两者结合使用解决大多数浏览器的兼容问题. | **postcss-loader**、**Autoprefixer** |

### 

## 2.css预处理器

- 建议三选一,不建议组合使用,因为这三种预处理器百分之七八十的功能是类似的.

| 插件         | 说明                                                         | 所需依赖                                             |
| ------------ | ------------------------------------------------------------ | ---------------------------------------------------- |
| ***sass***   | 使用最多的css预处理器,大而全.                                | **sass-loader**、**node-sass**、**vue-style-loader** |
| ***stylus*** | 语法非常灵活,可以写出非常简洁的代码,但对使用团队的开发素养要求也更高,更需要有良好的开发规范或约定. | **less-loader**、**less**                            |
| ***less***   | 比Stylus语义更清晰,比Sass更接近CSS语法,比较容易上手.但开发类库复杂,实现的代码会比较脏,能实现的功能也会受到DSL(领域特定语言)的制约. | **stylus-loader**、**stylus**                        |

### Less

#### 1.安装项目依赖

```shell
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

```shell
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

## 3.postcss样式转换工具

- PostCSS是一款使用JavaScript插件对CSS实现转换的工具
- PostCSS拥有非常强大的插件，典型的比如`autoprefixer`、`cssnext`、`css modules`等。
- PostCSS插件的处理方式类似CSS预处理器，而非预处理器和后处理器。
- PostCSS并非优化CSS的工具，语法也并非CSS的新式语法。

**Vite自身已经集成PostCSS，无需再次安装。另外也无需单独创建PostCSS配置文件，已集成到`vite.config.js`的`css`选项中。可直接配置`css.postcss`选项即可。Vite将自动在`*.vue`文件中所有的`style`标签以及所有导入的`.css`文件中应用PostCSS.**

```javascript
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import postcssImport from "postcss-import"
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

export default ({mode})=>{
  //生成自定义用户配置
  return defineConfig({
    //样式表插件
    css:{
      postcss:{
        plugins:[
          postcssImport,
          autoprefixer,
          tailwindcss
        ]
      }
    }
  })
}
```

PostCSS插件：嵌套CSS样式写法解决方案

| 插件                       | 描述                                                     |
| -------------------------- | -------------------------------------------------------- |
| postcss-import             | 支持`@import`写法                                        |
| postcss-url                | 支持`@url`写法                                           |
| postcss-bem                | 支持BEM元素规则命名                                      |
| postcss-nested             | 支持类选择器嵌套写法，模拟SASS嵌套选择器写法。           |
| postcss-nesting            | 支持符合W3C规范的嵌套类选择器写法                        |
| postcss-simple-vars        | 支持变量                                                 |
| postcss-advanced-variables | 支持类似SASS自定义变量并引用，实现编写变量、条件、循环。 |
| postcss-preset-env         | 支持变量运算                                             |

PostCSS插件：H5移动端屏幕适用性解决方案

| 插件                      | 描述                                    |
| ------------------------- | --------------------------------------- |
| cssnano                   | 优化和压缩CSS，已包含autoprefixer插件。 |
| postcss-aspect-ratio-mini | 容器比匹配                              |
| postcss-cssnext           | 实现嵌套编程                            |
| postcss-px-to-viewport    | 将px转换为vw以适应各种屏幕              |
| postcss-write-svg         | 1px细线的绘制                           |

#### Import

PostCSS通过`@import`将样式表合并到一起，当需要通过`@import`将第三方类库导入到主样式表时，首先需要运行的是`@import`插件。

| 插件                   | 描述                                                        |
| ---------------------- | ----------------------------------------------------------- |
| postcss-import         | 支持通过内联内容来转换`@import`规则                         |
| postcss-partial-import | 让CSS文件支持`@import`语法，支持W3C的写法，也支持SASS写法。 |

```shell
npm ls postcss-import
npm info postcss-import
npm i -D postcss-import@latest
```

postcss-partial-import

- NPM包 [https://www.npmjs.com/package/postcss-partial-import](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpostcss-partial-import)
- 源代码 [http://www.github.com/jonathantneal/postcss-partial-import](https://links.jianshu.com/go?to=http%3A%2F%2Fwww.github.com%2Fjonathantneal%2Fpostcss-partial-import)
- 支持在CSS文件中使用Sugary `@import`语法，包括`glob-like`和`Sass-like`行为。
- 允许将导入作为脚手架工作来生成

#### Autoprefixer

- Autoprefixer是一个根据`Can I Use`解析CSS并为其添加浏览器厂商前缀的PostCSS插件
- Autoprefixer会使用基于当前浏览器支持的特性和属性为CSS添加前缀

查看项目下是否已经安装过Autoprefixer

```shell
npm ls autoprefixer version
```

使用NPM为Vue项目安装Autoprefixer

```shell
npm info autoprefixer versions
npm i -D autoprefixer@latest
```

在PostCSS配置文件`post.config.js`配置文件的插件属性中添加Autoprefixer

```js
import autoprefixer from "autoprefixer"

export default {
  plugins:[
    autoprefixer
  ]
}
```

#### TaildwindCSS

- Tailwind CSS是一款实用为主效用优先的CSS框架
- TailwindCSS作为PostCSS插件存在，将基础的CSS拆分为原子级别。
- PostCSS提供Autoprefixer插件用于补全各种浏览器前缀，兼容性更好。

查看项目是否已经安装TailwindCSS

```shell
npm ls tailwindcss version
```

使用NPM安装TailwindCSS

```shell
npm info tailwindcss versions
npm i -D tailwindcss@latest
```

为PostCSS配置TailwindCSS插件

```js
import postcssImport from "postcss-import"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"

export default {
  plugins:[
    postcssImport,
    autoprefixer,
    tailwindcss
  ]
}
```

配置TailwindCSS独立配置文件

```js
export default {
  
}
```

安装VSCode插件

- Tailwind CSS IntelliSense
- Tailwind Docs

创建全局应用的样式表，注意必须引入`postcss-import`插件以支持`@import`写法。

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

项目主入口文件中引入全局样式表

```js
import "@/assets/css/main.css"
```

安装TailwindCSS插件

TailwindCSS提供了可复用的第三方插件用于扩展Tailwind，插件会注册新的样式，让Tailwind使用JavaScript代替CSS注入用户的样式表。

```shell
npm i -D @tailwindcss/forms
npm i -D @tailwindcss/typography
npm i -D tailwindcss/aspect-ratio
```

***



# 五.适配方案

### 1.rem适配方案

| 插件                    | 说明                                                         |
| ----------------------- | ------------------------------------------------------------ |
| ***amfe/lib-flexible*** | 可伸缩布局方案,自动设置根节点字体大小,较早的lib-flexible已经停止更新,故而采用amfe-flexible.**关于1px转化问题： 1px转化rem后有些手机上显示模糊或不显示,解决办法：将px大写,即1px写为1PX** |
| ***px2rem-loader***     | 将px转换成rem,配合flexible插件使用.                          |
| ***PostCss***           | **postcss-px2rem-exclude(推荐)**、**postcss-pxtorem**、**postcss-px2rem**,PostCSS系列是使用JS插件来转换CSS的工具,支持变量,混入,未来CSS语法,内联图像等等.内置的重要插件Autoprefixer自动前缀解决各大浏览器兼容问题.这些插件与webpack集成能解决大多数兼容和适配问题,提高开发效率. |

 - 此类插件一般放在开发依赖中(devDependencies),下载指令中需添加 --save-dev 指令

```ruby
npm install amfe-flexible --save-dev
npm install px2rem-loader --save-dev
npm install postcss-px2rem-exclude --save-dev
```

 - 配置项可查阅文档或自行百度.
 - 适配大屏、pc端、移动端,较为方便.

### 2. vw适配方案

| 插件                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| ***postcss-import***            | 主要功有是解决@import引入路径问题.使用这个插件,可以很轻易的使用本地文件、node_modules或者web_modules的文件.这个插件配合postcss-url使引入文件变得更轻松. |
| ***postcss-url***               | 主要用来处理文件,比如图片文件、字体文件等引用路径的处理.     |
| ***postcss-px-to-viewport***    | 主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位,也是vw适配方案的核心插件之一. |
| ***postcss-viewport-units***    | 主要是给CSS的属性添加content的属性,给vw、vh、vmin和vmax做适配的操作,这是实现vw布局必不可少的一个插件. |
| ***postcss-cssnext***           | 该插件可以让我们使用CSS未来的特性,其会对这些特性做相关的兼容性处理. |
| ***cssnano***                   | 主要用来压缩和清理CSS代码.在Webpack中,cssnano和css-loader捆绑在一起,所以不需要自己加载它. |
| ***postcss-write-svg***         | 主要用来处理移动端1px的解决方案.                             |
| ***postcss-aspect-ratio-mini*** | 主要用来处理元素容器宽高比.                                  |
| **cssnano-preset-advanced**     | 预设配置                                                     |

#### ⑴ 安装相关依赖

```shell
npm i postcss-import postcss-url postcss-px-to-viewport postcss-viewport-units postcss-cssnext cssnano postcss-write-svg postcss-aspect-ratio-mini cssnano-preset-advanced --save-dev
```

#### ⑵ 配置.postcssrc.js

```javascript
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {}, 
    "postcss-write-svg": { utf8: false }, "postcss-cssnext": {}, "postcss-px-to-viewport": { 
      viewportWidth: 750, // (Number) 视口宽度. 
      viewportHeight: 1334, // (Number) 视口高度. 
      unitPrecision: 3, // (Number) 允许rem单位有多少位小数. 
      viewportUnit: 'vw', // (String) 视口单位.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) 要忽略的选择器,忽略后保留px. 
      minPixelValue: 1, // (Number) 设置要替换的最小像素值.
      mediaQuery: false // (Boolean) 允许在媒体查询中转换px. 
     },
    "postcss-viewport-units":{}
    // to edit target browsers: use "browserslist" field in package.json
  },
  cssnano: {
    "cssnano-preset-advanced": {
      zindex: false,
      autoprefixer: false
    }
  }
}
```

#### **需要注意的点：**

1.全局添加img的content，避免部分浏览器，图片不显示！

```css
img{
   content:'normal'!important;
}
```

2.对于伪元素(:before,:after)的影响，要么添加新元素来设置，或者，在content后添加！important；

3.针对1px的解决方案，安装 npm i postcss-write-svg -S

```css
第一种：border-image
@svg 1px-border { 
     height: 2px;
    @rect { fill: var(--color, black); width: 100%; height: 50%; }
 } 
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch; 
}
第二种：background-image
@svg square {
   @rect { fill: var(--color, black);
      width: 100%;
      height: 100%; 
  } 
 } 
.example { background: white svg(square param(--color #00b1ff)); }
```

4.记得添加头部meta标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
```

   与flexible适配方案相比，VW是浏览器客户端原生支持的特性，不需要依赖js来做任何的判断和计算。而flexible也是来源于Viewport单位的思路。通过JS来判断，动态修改meta的值。

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