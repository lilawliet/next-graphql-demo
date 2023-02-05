next (v 13.1) + ant-design-mobile (v 5)

## 依赖

- node`^16.10.0`: node 开发版本
- next`^13.1.6`: 服务器框架
- antd-mobile`^5.28.0`: UI 框架
- eslint: 代码检查
  - `"plugins": "@typescript-eslint"`: 告诉 ESLint 加载 @typescript-eslint/eslint-plugin 包作为插件
  - `"extends": "plugin:@typescript-eslint/recommended`: ESLint 内置的 "推荐 "配置
- prettier: 代码格式化
- husky: Git Commit Hooks
- Lint staged: 只在需要时检查代码

## 开始运行

```bash
npm install
# or
yarn
# or
pnpm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 开发流程（指引）

### 创建 App

```
# bash
yarn create next-app
```

### 添加 Ant Design Mobile UI 框架

```
# bash
yarn add antd-mobile
```

```
# next.config.js
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],                   +
}
```

### 添加 Eslint & Prettier & Husky & Lint staged 代码规范

#### Eslint (代码检查)

```
// bash 安装 @typescript-eslint/eslint-plugin 包
yarn add --dev @typescript-eslint/eslint-plugin
```

```
// .eslintrc.json
"plugins": ["@typescript-eslint"],                      +
"extends": [
  "next/core-web-vitals",
  "plugin:@typescript-eslint/recommended"               +
],
"rules": {
  // I suggest you add those two rules:
  "@typescript-eslint/no-unused-vars": "error",
  "@typescript-eslint/no-explicit-any": "error"
}
```

```
// .vscode setting.json (开发工具 vscode 配置保存时自动格式化)
{                                                       +
  "editor.codeActionsOnSave": {                         +
    "source.fixAll.eslint": true                        +
  }                                                     +
}                                                       +
```

#### Prettier (代码规范)

```
// bash 安装 prettier 和 eslint-config-prettier 包
yarn add --dev prettier eslint-config-prettier
```

```
// .prettierrc.json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}

```

```
// .eslintrc.json
{
  // ...
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier" // 最后加上 prettier, eslint 与 prettier 的冲突将被覆盖           +
  ],
  // ...
}
```

```
// .vscode setting.json (开发工具 vscode 配置文件)
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true, // Tell VSCode to format files on save                                             +
  "editor.defaultFormatter": "esbenp.prettier-vscode" // Tell VSCode to use Prettier as default file formatter    +

  // OR If want only typescript files to be formatted on save
  // "[typescript]": {                                                                                            +
  //  "editor.formatOnSave": true,                                                                                +
  //  "editor.defaultFormatter": "esbenp.prettier-vscode"                                                         +
  // }                                                                                                            +
}
```

#### Husky (git hook)

```
// bash 安装 Husky 包
yarn add --dev husky
```

```
// enable husky
yarn husky install
```

```
// add the git hook
yarn husky add .husky/pre-commit "yarn tsc --noEmit && yarn eslint . && yarn prettier --write ."
```

#### Lint staged (只检查指定代码)

```
yarn add --dev lint-staged
```

```
// lint-staged.config.js
module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
```

```
// file .husky/pre-commit file

#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

yarn tsc --noEmit && yarn eslint . && yarn prettier --write . // 删除这一行          -
yarn lint-staged                                              // 替换成这一行        +
```
