Nextjs (v 13.1) + Ant-Design-Mobile (v 5) + Redux Toolkit + Prisma + SWR + GraphQL Yoga 完整基础示例 + 搭建流程指引

## 技术栈

- nodejs`^16.10.0`：node 开发版本
- nextjs`^13.1.6`：服务器框架
- antd-mobile`^5.28.0`：UI 框架
- @reduxjs/toolkit`^1.9.2`：运行时数据全局状态管理
- redux-persist`^6.0.0`：数据持久化（客户端缓存）
- prisma`^4.10.1`：数据库 ORM 管理工具包（代替 mongodb 库进行数据库连接，并对数据进行对象-关系映射管理）
- swr`^2.0.3`： 用于数据请求的 React Hooks 库 （数据请求全局管理，便于切换数据请求句柄 Fetch / Axios / GraphQL）
  > stale-while-revalidate（简称 SWR）：一种由 HTTP RFC 5861 提出的 HTTP 缓存策略.<br>
  > 客户端将接受过期的（stale）响应，同时在后台异步检查是否有新的响应:<br>
  >
  > - 1. 如果缓存未过期，则发起请求时将直接从本地拿取数据
  > - 2. 如果缓存过期，但过期时长未超出 stale-while-revalidate 设定的值，发起请求时浏览器仍然会从本地拿取数据，但是同时它会异步发出重新校验（revalidate)请求。重新校验请求所返回的响应值将为替代之前的响应缓存存于本地，并刷新缓存计时器。
  > - 3. 如果缓存过期，且过期时长超出 stale-while-revalidate 设定的值，浏览器发起请求时会直接请求服务端拿取最新响应数据并刷新本地缓存。
- graphql-request`^5.1.0`：GraphQL client 工具, 发送 GraphQL 请求
- graphql-yoga`^3.6.0`：GraphQL server 工具, 创建 GraphQL 服务器
- eslint：代码检查
  > - `"plugins": "@typescript-eslint"`：告诉 ESLint 加载 @typescript-eslint/eslint-plugin 包作为插件
  > - `"extends": "plugin:@typescript-eslint/recommended`：ESLint 内置的 "推荐 "配置
- prettier：代码格式化
- husky：Git Commit Hooks
- lint-staged：只在需要时检查代码
- cross-env：跨平台设置环境变量
- i18next：国际化

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

## 架构搭建流程（指引）

### 创建 App

```
# bash
yarn create next-app
# | TypeScript: Yes
# | Eslint: Yes
# | `src/`: No
# | `app/`: No
# | import alias: @/*
```

### 添加 [Ant Design Mobile](https://mobile.ant.design/zh) UI 框架

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

### 添加 [Tailwindcss](https://tailwindcss.com/docs/guides/nextjs) (CSS 框架)

> // bash<br>
> // 直接创建 next + tailwindcss demo 可用以下命令行<br>
> yarn create next-app --example with-tailwindcss with-tailwindcss-app

```
# bash
yarn add --dev tailwindcss postcss autoprefixer
```

```
# init
npx tailwindcss init -p
```

```
# tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [                                          +
    "./app/**/*.{js,ts,jsx,tsx}",                     +
    "./pages/**/*.{js,ts,jsx,tsx}",                   +
    "./components/**/*.{js,ts,jsx,tsx}",              +
                                                      +
    // Or if using `src` directory:                   +
    "./src/**/*.{js,ts,jsx,tsx}",                     +
  ],                                                  +
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```
# styles/globals.css

@tailwind base;
@tailwind components;
@tailwind utilities;

# 删除多余样式
```

### 添加 [Eslint & Prettier & Husky & Lint staged](https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js) 代码规范

#### Eslint (代码检查)

```
# bash 安装 @typescript-eslint/eslint-plugin 包
yarn add --dev @typescript-eslint/eslint-plugin
```

```
# .eslintrc.json
"plugins": ["@typescript-eslint"],                      +
"extends": [
  "next/core-web-vitals",
  "plugin:@typescript-eslint/recommended"               +
],
"rules": {
  # I suggest you add those two rules:
  "@typescript-eslint/no-unused-vars": "error",
  "@typescript-eslint/no-explicit-any": "error"
}
```

```
# .vscode setting.json (开发工具 vscode 配置保存时自动格式化)
{                                                       +
  "editor.codeActionsOnSave": {                         +
    "source.fixAll.eslint": true                        +
  }                                                     +
}                                                       +
```

#### Prettier (代码规范)

```
# bash 安装 prettier 和 eslint-config-prettier 包
yarn add --dev prettier eslint-config-prettier
```

```
# .prettierrc.json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}

```

```
# .eslintrc.json
{
  # ...
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier" # 最后加上 prettier, eslint 与 prettier 的冲突将被覆盖           +
  ],
  # ...
}
```

```
# .vscode setting.json (开发工具 vscode 配置文件)
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true, # Tell VSCode to format files on save                                             +
  "editor.defaultFormatter": "esbenp.prettier-vscode" # Tell VSCode to use Prettier as default file formatter    +

  # OR If want only typescript files to be formatted on save
  # "[typescript]": {                                                                                            +
  #  "editor.formatOnSave": true,                                                                                +
  #  "editor.defaultFormatter": "esbenp.prettier-vscode"                                                         +
  # }                                                                                                            +
}
```

#### Husky (git hook)

```
# bash 安装 Husky 包
yarn add --dev husky
```

```
# enable husky
yarn husky install
```

```
# add the git hook
yarn husky add .husky/pre-commit "yarn tsc --noEmit && yarn eslint . && yarn prettier --write ."
```

#### Lint staged (只检查指定代码)

```
yarn add --dev lint-staged
```

```
# lint-staged.config.js
module.exports = {
  # Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  # Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  # Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
```

```
# file .husky/pre-commit file

#!/bin/sh
. "$(dirname -- "$0")/_/husky.sh"

yarn tsc --noEmit && yarn eslint . && yarn prettier --write . # 删除这一行          -
yarn lint-staged                                              # 替换成这一行        +
```

### 全局配置 .env

- 新建文件
  - .env 基础环境配置文件
  - .env.local 本地环境配置文件
  - .env.development 开发环境配置文件
  - .env.production 生产环境配置文件
  - environment.d.ts 环境配置变量声明文件

```
# tsconfig.json
"include": [
  "next-env.d.ts",
  "environment.d.ts",       +
  "**/*.ts",
  "**/*.tsx"],
```

```
# environment.d.ts
declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: string     // 环境变量声明
    readonly NEXT_PUBLIC_LOCALE: string  // 暴露环境变量要用 NEXT_PUBLIC_ 前缀或者写在 .env.local 文件中
  }
}
```

```
# .env.development
NODE_ENV = development
```

```
# .env.production
NODE_ENV = production
```

```
# bash cross-env: 跨平台环境变量设置，Windows 平台下需要 cross-env 传递环境变量
yarn add cross-env
```

```
# package.json
...
  "scripts": {
    "dev": "cross-env NODE_ENV=development next dev",           +
    "prod": "cross-env NODE_ENV=production next dev",           +
    "build": "next build",
    "build:prod": "cross-env NODE_ENV=production next build",   +
    ...
  }
...
```

### 添加 [I18Next](https://react.i18next.com) 语言国际化

```
# bash
yarn add react-i18next i18next
```

### 全局数据管理 Redux

> [React Redux](https://react-redux.js.org/) &nbsp;React 全局数据 <br>[Redux Toolkit](https://redux-toolkit.js.org/) &nbsp;简化配置存储 <br> [Redux Persist](https://github.com/rt2zz/redux-persist#readme) &nbsp;持久化存储 <br>

```
# bash
yarn add react-redux @types/react-redux @reduxjs/toolkit redux-persist
```

修改目录结构:

- 创建 `src/store`

```
# demo 详见 src/store
```

### [Prisma](https://www.prisma.io/) 连接 mongoDB

```
# bash
yarn add prisma
```

```
# bash
# creating your Prisma schema file
npx prisma init
```

```
# .env 中添加 db 链接
# 如配置有问题查看[官方文档](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
DATABASE_URL = mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
```

```
# prisma/schema.prisma 修改 db 链接
datasource db {
  provider = "postgresql"                             -
  provider = "mongodb"                                +
  url      = env("DATABASE_URL")
}
```

```
# prisma/schema.prisma 中定义模型
model Link {
  id          String @id @default(auto()) @map("_id") @db.ObjectId
  description String
  url         String
  ts_created  Int?
}
```

```
# bash 安装 Prisma 客户端
yarn add @prisma/client
```

```
# bash
# 查看 prisma 命令
# npx prisma
# 1. （执行下面这行）依赖库 prisma 中 注入 ORM 模型
npx prisma generate
# 2. （执行下面这行） 更新模型到数据库中
npx prisma db push
# 同步数据库已有模型
# npx prisma db pull
```

```
# (新建初始化db脚本：Seeding your database) prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const linkData: Prisma.LinkCreateInput[] = [
  {
    url: 'google.com',
    description: 'google',
  },
  {
    url: 'baidu.com',
    description: 'baidu',
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const l of linkData) {
      const link = await prisma.link.create({
        data: l,
      })
      console.log(`Created link with id: ${link.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
```

```
# package.json
# 需要用到 ts-node : npm install -g ts-node
"dependencies": {
    ...
}
"prisma": {                                             +
  "seed": "ts-node --transpile-only prisma/seed.ts"     +
},                                                      +
```

```
# bash
# 脚本初始化数据
npx prisma db seed

# 如遇到 error: 'ts-node' 不是内部或外部命令，也不是可运行的程序。
# 检查全局安装路径是否已添加到环境变量中，
# 如用 yarn global add ts-node 命令需要另外在系统中添加环境变量路径。
```

### [SWR](https://swr.vercel.app/zh-CN) + [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/docs) + [graphql-request](https://github.com/jasonkuhrt/graphql-request)

> swr：用于数据请求的 React Hooks 库<br>
> 可以用 [React Query](https://react-query-v3.tanstack.com/) 代替 SWR
> yoga: 搭建 GraphQL 服务器
> graphql-request: 发送 GraphQL 请求

```
# bash
yarn add swr graphql graphql-yoga graphql-request
```

```
# (新建db上下文：关联数据库) src/server/context.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type GraphQLContext = {
  prisma: PrismaClient
}

export function createContext(): GraphQLContext {
  return { prisma }
}
```

```
# (新建db议程：数据-请求映射图谱) src/server/schema.ts
import { makeExecutableSchema } from '@graphql-tools/schema'
import type { GraphQLContext } from './context'
import type { Link } from '@prisma/client'

const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent: unknown, args: {}, context: GraphQLContext) => context.prisma.link.findMany(),
  },
  Link: {
    id: (parent: Link) => parent.id,
    description: (parent: Link) => parent.description,
    url: (parent: Link) => parent.url,
  },
}

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})
```

```
# (新建 graphql 服务器实例，监听接口为 /api/graphql) pages/api/graphql.ts
import { createContext } from '@/src/server/context'
import { schema } from '@/src/server/schema'
import { createYoga } from 'graphql-yoga'
import { NextApiRequest, NextApiResponse } from 'next'

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  context: createContext,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})
```

```
# (新建 demo 页面) pages/demo.ts
import request from 'graphql-request'
import { NextPage } from 'next'
import useSWR from 'swr'

const DemoPage: NextPage = () => {
  const { data, error, isLoading } = useSWR(
    `query {
      feed {
        id
        url
        description
      }
    }
      `,
    (query) => request('api/graphql', query)
  )
  console.log(data, error, isLoading)

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <div>
      {data.feed.map((link, index: number) => (
        <div key={index}>{link.url}</div>
      ))}
    </div>
  )
}

export default DemoPage
```
