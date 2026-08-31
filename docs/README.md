# PrismShot 资料索引

本目录保存实现前的需求依据与 HTML 原型。当前只完成归档，不代表原型已经转写为 Next.js 页面。

## 阅读顺序

1. [`requirements/design.md`](./requirements/design.md)：已确认的设计与实现约定，优先级最高。
2. [`requirements/prismshot.md`](./requirements/prismshot.md)：原始页面需求；与确认稿冲突时，以 `design.md` 为准。
3. [`requirements/index.png`](./requirements/index.png)：仅用于约束视觉语言，不要求逐像素复刻，也不能直接作为正式页面素材。
4. [`requirements/棱镜定格.docx`](./requirements/棱镜定格.docx)：保留的原始需求文档。
5. [`prototype/index.html`](./prototype/index.html)：HTML 原型入口；其他页面、样式和脚本均位于同一目录。

## 原型复核结论

整理前的 `prismshot/` 与 `prismshot-preview/` 中，共有的 HTML、CSS、JavaScript、Logo、`_headers` 和 `robots.txt` 均逐文件一致；`prismshot/` 只额外包含上述需求与参考文件。因此：

- 以原 `prismshot-preview/` 作为唯一原型来源，现归档为 `docs/prototype/`。
- 原 `prismshot/` 中的同内容副本已去重，没有保留第二套原型。
- `prismshot-preview.zip` 未纳入项目。

## 使用提醒

- `prototype/_headers` 和 `prototype/robots.txt` 是原型预览使用的禁止索引配置，不能直接作为正式站点部署配置。
- 原型中的第三方图片、社交链接、账号名和二维码均为占位内容。
- 原型仍可能调整；确认后再将结构、样式和交互迁移到 `app/`、`components/` 与 `content/`。
