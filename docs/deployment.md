# Cloudflare Pages 部署

项目输出标准静态文件，不依赖 Cloudflare 运行时。

## 构建设置

- Framework preset：Next.js (Static HTML Export)
- Build command：`npm run build`
- Build output directory：`out`
- Node.js：22（仓库含 `.node-version`）

> Cloudflare 的该框架预设默认填入 `npx next build`，必须手动改成 `npm run build`。直接运行 Next CLI 会绕过 npm `prebuild`，导致 `public/generated/` 中的响应式图片没有生成，页面引用的 `/generated/photos/*` 在线上返回 404。

正式生产环境设置：

```text
NEXT_PUBLIC_SITE_URL=https://prismshot.top
PRISMSHOT_RELEASE=1
```

预览环境设置 `PRISMSHOT_PREVIEW=1`，生成的页面与 `robots.txt` 会禁止索引。正式分支不要设置该变量。

## 域名

在 Pages 项目中绑定 `prismshot.top`。若需要将 `*.pages.dev` 永久跳转到规范域名，应在 Cloudflare 控制台使用 Bulk Redirect 配置；不要在静态站点中写死会影响预览环境的全局重定向。

`public/_headers` 为静态资源设置长期缓存，并添加基础安全响应头。部署后抽查 `/`、`/en`、四个内容页、`/robots.txt` 和 `/sitemap.xml`，并直接访问至少一个 `/generated/photos/*.webp` 或 `.avif` 地址确认返回 200。
