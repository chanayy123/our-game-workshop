# 资源与许可

本项目没有下载第三方动物、船体或环境模型，没有付费素材，没有调用生成图像服务。

以下内容均在本项目内原创程序化生成：大白鲨连续曲面与鳍、皮肤配色、鳃与口部，船体与潜笼，装备，木材和旧漆纹理，海面、天空、岛屿、海床、石块、鱼群、海草、沉船骨架、泡沫、水花、粒子，Web Audio 环境和事件音效，以及图标。

第三方依赖：

| 依赖 | 用途 | 许可 / 来源 |
| --- | --- | --- |
| Three.js 0.180.0 | 3D 渲染、数学与 BufferGeometryUtils 几何合并 | MIT，https://github.com/mrdoob/three |
| Vite | 本地开发和构建 | MIT，https://github.com/vitejs/vite |
| TypeScript | 类型检查 | Apache-2.0，https://github.com/microsoft/TypeScript |
| Playwright | 浏览器验证 | Apache-2.0，https://github.com/microsoft/playwright |
| Barlow / Barlow Condensed | 界面西文字体，中文使用系统字体 | SIL Open Font License 1.1，通过 @fontsource/barlow 和 @fontsource/barlow-condensed 5.2.8 本地打包；https://github.com/jpt/barlow |

精确依赖版本记录于 `package-lock.json`，字体许可原文随 npm 包提供并复制到 `public/licenses/`。图形与声音无运行时外链，生产构建可在本机离线使用。

## 解剖形态参考

升级时参考了 NOAA 的大白鲨资料与鲨鱼识别指南，及 Monterey Bay Aquarium 的白鲨资料，用于校正纺锤体型、吻部、背腹配色和三角形牙齿。仅作为文字与解剖参考，没有复制或下载其照片、模型或纹理。

- https://www.fisheries.noaa.gov/species/white-shark
- https://www.fisheries.noaa.gov/new-england-mid-atlantic/atlantic-highly-migratory-species/shark-identification-cooperative-shark-0
- https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/white-shark

海松枝叶、树皮和地面细节由确定性 Canvas 纹理生成，斧头、码头和修补结构由本项目建模。未引入额外远程资源。
