# PrismShot

PrismShot 棱镜定格官网的 Next.js 基础脚手架。

当前阶段只完成项目初始化与资料归档，默认的 Create Next App 示例页面尚未替换，需求和 HTML 原型也尚未接入源码。这样可以在原型确认后再开始页面实现，避免过早固化结构与样式。

## 技术基线

- Next.js 16（App Router）
- React 19
- TypeScript
- ESLint
- npm
- 静态导出到 `out/`

## 目录

```text
app/                 Next.js 路由与页面（当前为默认示例）
components/          预留的共享组件目录
content/             预留的类型化内容配置目录
docs/requirements/   原始需求、确认稿与视觉参考
docs/prototype/      唯一保留的 HTML 原型
public/images/       预留的正式素材目录
public/generated/    预留的构建产物目录
```

资料入口见 [`docs/README.md`](./docs/README.md)。实现时以 [`docs/requirements/design.md`](./docs/requirements/design.md) 为最终约定。

## 本地命令

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

`npm run build` 会按 `next.config.ts` 的静态导出配置生成 `out/`。当前默认示例仅用于验证脚手架可运行，并不代表最终页面。
