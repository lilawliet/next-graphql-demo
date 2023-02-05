next (v 13.1) + ant-design-mobile (v 5)

## 依赖

- node`^16.10.0`: node 开发版本
- next`^13.1.6`: 服务器框架
- antd-mobile`^5.28.0`: UI 框架
- eslint:
  - `"plugins": "@typescript-eslint"`: 告诉 ESLint 加载 @typescript-eslint/eslint-plugin 包作为插件
  - `"extends": "plugin:@typescript-eslint/recommended`: ESLint 内置的 "推荐 "配置

## 开始

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 开发流程（指引）

### 创建 app

```
# bash
yarn create next-app
```

### 添加 ant-design-mobile UI 框架

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

### 添加 eslint & prettier & husky 代码规范

#### eslint

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

#### prettier

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

#### husky (提交代码时检查)

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
