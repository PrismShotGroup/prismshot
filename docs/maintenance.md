# 内容与素材维护

正式页面不从 CMS 或 Markdown 读取内容。修改 `content/*.ts` 后重新构建即可。

## 内容入口

- `content/site.ts`：导航、首页文案与各页 SEO。
- `content/events.ts`：活动日历、活动介绍与活动照片。
- `content/contests.ts`：当期主题赛、状态边界、规则和历届冠军。
- `content/gallery.ts`：画廊照片与分页文案。
- `content/photo-assets.ts`：摄影源图登记、真实尺寸、中英文替代文本和可选焦点。
- `content/about.ts`：关于文案、五个平台账号与外链、赞助说明和团队成员。
- `content/readiness.ts`：正式发布占位门禁。

所有访客可见内容都要同时提供 `zh` 和 `en`。作者或日期确实未知时使用 `unknown`；主动匿名使用 `anonymous`。

## 首页背景

首页背景只能使用社团确认并提供的本地素材。将图片放入 `public/images/home/`，再把 `content/site.ts` 中的 `homeBackgroundSrc` 从 `null` 改为对应的 `/images/home/<文件名>` 路径。没有合适素材时保持 `null`，页面会使用设计好的纯黑背景，不请求外部图片，且不会阻止正式发布。

## 摄影图片

横图和竖图使用同一套流程，不需要把原图预先裁成统一比例。建议保留社团提供的最大可用版本；源图经 EXIF 方向纠正后的宽度不得低于 1600 像素。常见的 3840×2160 横图可直接使用；相机方向信息纠正后为竖图时，应登记为 2160×3840。

1. 将 JPG、JPEG 或 PNG 原图放入 `assets/source/photos/`，使用稳定、无空格的文件名，例如 `summer-meetup-01.jpg`。
2. 在 `content/photo-assets.ts` 登记同名 `key`、EXIF 方向纠正后的原图 `width` / `height`，以及中英文 `alt`。需要控制封面式裁切位置时，可选填百分比焦点 `focalPoint: { x, y }`。
3. 在 `content/events.ts`、`content/gallery.ts` 或 `content/contests.ts` 中通过 `asset: photoAssets.<记录名>` 引用。不要手写 `/generated/` 路径，也不要把 `-1600.webp` 当作内容配置。
4. 运行 `npm run images:build`；准备提交时运行 `npm run build`。

脚本会校正 EXIF 方向，但不会复制 EXIF 元数据；每张源图会生成 480、960、1600 像素宽的 WebP 与 AVIF。网页通过 `<picture>` 和 `sizes` 选择合适版本，不直接发布源图。构建会拒绝未登记或重复的源图、错误的真实尺寸、宽度不足的原图，以及缺失或尺寸错误的生成变体。

### 各页面图片配置

- 活动：在对应活动的 `photos` 中逐张填写稳定 ID、资产、标题、说明、作者和日期；每项活动允许 1–6 张。
- 画廊：`galleryPhotos` 的每一项都是独立记录。即使暂时复用同一张占位素材，也要分别填写资产、作者和日期；替换时只修改目标记录。已知日期按新到旧排列，`unknown` 日期统一放在最后。
- 主题赛：`currentContest.visual` 配置当期主视觉；`contestChampions` 逐项配置冠军作品。冠军列表统一使用 4:5 裁切预览，可通过资产的 `focalPoint` 调整主体位置；点击后会在共用大图查看器中按原始比例完整显示。

图片作者确实未知时填写 `unknown`，主动匿名时填写 `anonymous`。照片的真实宽高只在 `content/photo-assets.ts` 维护一次，活动、画廊和主题赛不要重复填写。

## Cloudflare Pages 图片构建

Cloudflare 的 `Next.js (Static HTML Export)` 预设默认使用 `npx next build`。该命令不会触发本项目在 npm `prebuild` 生命周期中配置的内容校验和图片生成，因此必须在 Pages 的构建设置中手动覆盖为：

```text
Build command: npm run build
Build output directory: out
```

构建日志必须包含 `[images] ensured ... responsive files`。部署后至少抽查一个 `/generated/photos/*.avif` 或 `.webp` 地址返回 `200`；若页面正常但这些地址返回 `404`，优先检查构建命令是否仍为预设的 `npx next build`，然后重新部署。

## 社交链接与二维码

在 `content/about.ts` 中同时修改账号名和 `href`。二维码由同一个 `href` 在静态构建时生成，不需要提交二维码图片，也没有浏览器端二维码依赖。QQ 必须替换为可直接访问的加群链接。

首页的 QQ、VRChat、Discord 链接在 `content/site.ts` 中单独配置，两处应保持一致。

## 团队成员

团队成员的姓名、双语职务和照片都在 `content/about.ts` 的 `teamMembers` 中维护。正式照片提供前，`portraitSrc` 保持 `null`，页面显示品牌化占位；替换时将照片放入 `public/images/about/`，把 `portraitSrc` 改为对应的 `/images/about/<文件名>`，并同时确认中英文 `portraitAlt`。四张照片使用统一的 4:5 卡片裁切，页面组件不需要改动。

全部人物照片替换并检查授权后，将 `content/readiness.ts` 中的 `teamPortraits` 改为 `true`。

## 一周年摄影赛

一周年摄影赛是独立顶级页面，默认关闭。运行 `PRISMSHOT_ANNIVERSARY=1 npm run build` 会同时生成 `/anniversary` 与 `/en/anniversary`，并在两种语言的导航和 sitemap 中加入入口；不设置该变量重新构建会同时移除这些内容。

页面名称和中英文“敬请期待”文案在 `content/site.ts` 中维护。导航顺序与路由段集中在 `lib/i18n.ts`，开关规则在 `lib/site-features.ts`。不要只改路由文件夹或单独添加一种语言的入口。

## 发布门禁

普通开发允许占位内容。准备正式发布时：

1. 替换摄影作品、介绍文案、比赛数据和全部社交账号；首页背景若不提供则保留纯黑默认背景。
2. 逐项人工检查二维码、外链、中英文与图片替代文本。
3. 将 `content/readiness.ts` 中对应项目改为 `true`。
4. 运行 `PRISMSHOT_RELEASE=1 npm run build`。

内容 ID 重复、日期格式错误、图片资产或变体不完整、活动图片数量超出 1–6、画廊不足 48 张或仍有占位项时，校验会阻止发布构建。
