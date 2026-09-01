# PrismShot 资料索引

本目录保存需求依据、HTML 原型以及正式站点的维护与部署说明。原型已转写为 Next.js 页面，但继续作为视觉和交互基线保留。

## 阅读顺序

1. [`requirements/design.md`](./requirements/design.md)：已确认的设计与实现约定，优先级最高。
2. [`requirements/prismshot.md`](./requirements/prismshot.md)：原始页面需求；与确认稿冲突时，以 `design.md` 为准。
3. [`requirements/index.png`](./requirements/index.png)：仅用于约束视觉语言，不要求逐像素复刻，也不能直接作为正式页面素材。
4. [`requirements/棱镜定格.docx`](./requirements/棱镜定格.docx)：保留的原始需求文档。
5. [`prototype/index.html`](./prototype/index.html)：HTML 原型入口；其他页面、样式和脚本均位于同一目录。
6. [`maintenance.md`](./maintenance.md)：内容、图片、二维码和发布占位门禁的维护流程。
7. [`deployment.md`](./deployment.md)：Cloudflare Pages 构建、环境变量与域名配置。

## 原型复核结论

整理前的 `prismshot/` 与 `prismshot-preview/` 中，共有的 HTML、CSS、JavaScript、Logo、`_headers` 和 `robots.txt` 均逐文件一致；`prismshot/` 只额外包含上述需求与参考文件。因此：

- 以原 `prismshot-preview/` 作为唯一原型来源，现归档为 `docs/prototype/`。
- 原 `prismshot/` 中的同内容副本已去重，没有保留第二套原型。
- `prismshot-preview.zip` 未纳入项目。

## 使用提醒

- `prototype/_headers` 和 `prototype/robots.txt` 是原型预览使用的禁止索引配置，不能直接作为正式站点部署配置。
- 原型中的第三方图片、社交链接、账号名和二维码均为占位内容。
- 原型评审已于 2026-09-01 结束；居中首页及现有内页的视觉与交互方向已冻结为 V1 实现基线。
- 实现以 `requirements/design.md` 为最高依据；可为双语、无障碍、性能和内容配置做必要调整，不重新等待视觉评审。
- 占位图片、文案、活动数据和社交资料可在开发阶段继续使用，正式上线前替换并完成人工核验。
