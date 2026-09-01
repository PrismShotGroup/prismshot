# 内容与素材维护

正式页面不从 CMS 或 Markdown 读取内容。修改 `content/*.ts` 后重新构建即可。

## 内容入口

- `content/site.ts`：导航、首页文案与各页 SEO。
- `content/events.ts`：活动日历、活动介绍与活动照片。
- `content/contests.ts`：当期主题赛、状态边界、规则和历届冠军。
- `content/gallery.ts`：画廊照片与分页文案。
- `content/about.ts`：关于文案、五个平台账号与外链。
- `content/readiness.ts`：正式发布占位门禁。

所有访客可见内容都要同时提供 `zh` 和 `en`。作者或日期确实未知时使用 `unknown`；主动匿名使用 `anonymous`。

## 首页背景

首页背景只能使用社团确认并提供的本地素材。将图片放入 `public/images/home/`，再把 `content/site.ts` 中的 `homeBackgroundSrc` 从 `null` 改为对应的 `/images/home/<文件名>` 路径。没有合适素材时保持 `null`，页面会使用设计好的纯黑背景，不请求外部图片，且不会阻止正式发布。

## 摄影图片

1. 将源图放入 `assets/source/events/`，使用稳定、无空格的文件名。
2. 在内容配置中引用 `/generated/events/<文件名>-1600.webp`。
3. 运行 `npm run images:build`。

脚本会校正 EXIF 方向，但不会复制 EXIF 元数据；每张源图会生成 480、960、1600 像素宽的 WebP 与 AVIF。网页通过 `<picture>` 和 `sizes` 选择合适版本，不直接发布源图。

## Cloudflare Pages 图片构建

Cloudflare 的 `Next.js (Static HTML Export)` 预设默认使用 `npx next build`。该命令不会触发本项目在 npm `prebuild` 生命周期中配置的内容校验和图片生成，因此必须在 Pages 的构建设置中手动覆盖为：

```text
Build command: npm run build
Build output directory: out
```

构建日志必须包含 `[images] ensured ... responsive files`。部署后至少抽查一个 `/generated/events/*.avif` 或 `.webp` 地址返回 `200`；若页面正常但这些地址返回 `404`，优先检查构建命令是否仍为预设的 `npx next build`，然后重新部署。

## 社交链接与二维码

在 `content/about.ts` 中同时修改账号名和 `href`。二维码由同一个 `href` 在静态构建时生成，不需要提交二维码图片，也没有浏览器端二维码依赖。QQ 必须替换为可直接访问的加群链接。

首页的 QQ、VRChat、Discord 链接在 `content/site.ts` 中单独配置，两处应保持一致。

## 发布门禁

普通开发允许占位内容。准备正式发布时：

1. 替换摄影作品、介绍文案、比赛数据和全部社交账号；首页背景若不提供则保留纯黑默认背景。
2. 逐项人工检查二维码、外链、中英文与图片替代文本。
3. 将 `content/readiness.ts` 中对应项目改为 `true`。
4. 运行 `PRISMSHOT_RELEASE=1 npm run build`。

内容 ID 重复、日期格式错误、活动图片数量超出 1–6、画廊不足 48 张或仍有占位项时，校验会阻止发布构建。
