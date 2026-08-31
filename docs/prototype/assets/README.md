# 首页水晶素材说明

这组素材用于 `index.html` 的左右边缘合成。`index-centered.jpg` 提供水晶轮廓、体量与位置基准，页面背景、品牌文字和交互元素保持为独立图层。

| 文件 | 尺寸 | 用途 |
|---|---:|---|
| `crystal-left.png` | 940 × 1672 | 左侧放射状水晶与聚光点 |
| `crystal-right.png` | 941 × 1672 | 右侧上下玻璃切片与 V 形开口 |

两张图由内置 imagegen 生成，并已验证为带真实 alpha 通道的 RGBA PNG。

## 最终生成提示词

### 左侧

```text
Use case: stylized-concept
Asset type: transparent LEFT-edge foreground crystal for the approved PrismShot homepage
Input images: Image 1 is the sole reference for the new crystal's silhouette, material, scale, and restrained refraction. Image 2 is supplied only as an example of a file with a real RGBA alpha channel; ignore Image 2's geometry and visual design completely.
Primary request: Generate only the left crystal seen in Image 1: a small number of enormous dark optical-glass planes fan inward from the left edge and converge on one white refraction point around mid-height, with one extremely thin diagonal needle rising from the convergence point to the top and broad lower planes descending toward the bottom-left.
Composition/framing: tall canvas; flush to left edge; nearly full height; broad open fan; right half clear for centered UI.
Style/medium: photorealistic dark smoked prism glass, large planar faces, crisp bevels, subtle spectral color along selected edges.
Output requirement: encode empty space as actual PNG alpha transparency (alpha 0). Transparency is a file property; never draw, imitate, or include a checkerboard pattern. Return RGBA, not RGB. Only the glass and its tightly localized flare may have nonzero alpha.
Constraints: clean anti-aliased silhouette; no webpage background, white/gray/black matte, foggy canvas, text, logo, people, scenery, or watermark.
Avoid: ordinary diamond, dense spikes, bulky crystal tower, many small facets, large soft halo.
```

### 右侧

```text
Use case: stylized-concept
Asset type: transparent RIGHT-edge foreground crystal for the approved PrismShot homepage
Input images: Image 1 is the sole reference for the new crystal's silhouette, material, scale, and restrained refraction. Image 2 is supplied only as an example of a file with a real RGBA alpha channel; ignore Image 2's geometry and visual design completely.
Primary request: Generate only the right crystal seen in Image 1: two or three enormous elongated dark optical-glass slabs anchored at the right edge, one descending from upper-right and one rising from lower-right, creating a large open V-shaped gap and nearly meeting at a small inner vertex around mid-to-lower height.
Composition/framing: tall canvas; flush to right edge; nearly full height; sparse elegant blades; left 55–65% clear for centered UI.
Style/medium: photorealistic dark smoked prism glass, very long planar faces, crisp bevels, subtle spectral color along selected edges.
Output requirement: encode empty space as actual PNG alpha transparency (alpha 0). Transparency is a file property; never draw, imitate, or include a checkerboard pattern. Return RGBA, not RGB. Only the glass and its tightly localized edge highlights may have nonzero alpha.
Constraints: clean anti-aliased silhouette; no webpage background, white/gray/black matte, foggy canvas, text, logo, people, scenery, or watermark.
Avoid: ordinary diamond, mountain or tower, dense spikes, bulky cluster, many small facets, large soft halo.
```
