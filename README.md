## Dependentis

- "node": "^16.10.0"
- "Nextjs": "^13.1.6"
- "antd-mobile": "^5.28.0"

## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Development Process (Guidance)

### 1.create app

```bash
yarn create next-app
```

### 2.andt mobile

```bash
yarn add antd-mobile
```

```next.config.js
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],                   +
}
```
