# 第三方来源与许可

核验日期：2026-09-27。本文件汇总运行代码和素材来源；具体下载文件、校验值和加工过程保留在各资源目录。项目中的代码、模型、纹理和字体分别遵循各自许可。

## Three.js 与水面纹理 — MIT

- Three.js 0.180.0，以及项目使用的 GLTFLoader、Water、Sky、BufferGeometryUtils 等官方 addon。
- [固定版本代码](https://github.com/mrdoob/three.js/tree/r180)；[r180 MIT 许可](https://github.com/mrdoob/three.js/blob/r180/LICENSE)。
- `public/assets/environment/waternormals.jpg` 来自 [r180 示例文件](https://github.com/mrdoob/three.js/blob/r180/examples/textures/waternormals.jpg)，[固定原始下载地址](https://raw.githubusercontent.com/mrdoob/three.js/r180/examples/textures/waternormals.jpg)。未修改，248,813 字节；本地文件与该 URL 的 SHA-256 一致：`add9912b158a4fe9c12421745babe68c44c8af75631ac4837236cb2a03bc373f`。

```text
The MIT License

Copyright © 2010-2025 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

## 恐龙 — CC BY 4.0

This work is based on **“Animated Tyrannosaurus Rex Dinosaur Running Loop”** by **LasquetiSpice**, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). [Original source](https://sketchfab.com/3d-models/animated-tyrannosaurus-rex-dinosaur-running-loop-38007d947ae74dea83988cb0b08ee053). Converted to modern PBR, resampled and packaged as GLB for this prototype; walking reuses the running cycle at a reduced rate. A muted earthy color grade is applied at runtime.

原始 `license.txt`、镜像下载说明、作者信息、转换过程及哈希见 [恐龙来源记录](public/assets/dinosaur/SOURCE.md) 和 [清单](public/assets/dinosaur/source-manifest.json)。分享包含此模型的版本时保留作者、来源、许可和修改说明；镜像站点不是原创作者。

## V0.3 迅猛龙、梁龙、犀牛与乌鸦

- 迅猛龙：Ferocious Industries，PBR Velociraptor (Animated)，CC BY 4.0。
- 犀牛：GremorySaiyan，Rhino Animation Walk，CC BY 4.0。
- 乌鸦：Alexei Ostapenko，Crow，CC BY 4.0。
- 梁龙：Skorpio，Diplodocus，选择 CC BY-SA 3.0；细分/PBR/新待机与行走动画后的衍生 GLB 继续使用 CC BY-SA 3.0。

逐项原作者链接、许可、公开下载镜像、修改说明及哈希见 [新增动物来源](public/assets/animals/SOURCE.md)。不将其他物种称为霸王龙模型的换色或缩放版本。
V0.3 霸王龙额外修正旧 PBR 转换的异常折射率，调整漫反射配色、法线和光泽，增加呼吸、坡面俯仰及涉水湿润材质；原模型作者及 CC BY 4.0 许可保持不变。

V0.4 复用 Ferocious Industries 的迅猛龙模型及其原始吼叫、咬击、进食等动画作为可选玩家角色。树木实例增加倒下 / 再生变换；新增霸王龙战斗与尸体姿态为运行时逻辑。没有新增付费或来源不明素材，所有原作者署名与许可继续保留。

## Fox 小型猎物 — CC0 / CC BY 4.0

来自 [KhronosGroup/glTF-Sample-Assets 的 Fox](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/Fox)。Model © 2014 PixelMannen, CC0; Rigging & Animation © 2014 tomkranis, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); Conversion to glTF © 2017 AsoboStudio and scurest, CC BY 4.0。

GLB 原样保留；运行时调整尺度、朝向、法线和颜色，添加倒地姿态。原始声明和下载校验见 [来源记录](public/assets/wildlife/SOURCE.md) 与 [上游说明](public/assets/wildlife/UPSTREAM.md)。含骨骼动画的整体素材并非纯 CC0。

V0.2 的岛上恐龙复用同一 LasquetiSpice 模型，变化为体型与行为；吼叫和进食额外叠加头颈、下颌骨骼姿态。

## Poly Haven 环境 — CC0

下列素材采用 [Poly Haven CC0 许可](https://polyhaven.com/license)，保留自愿署名。模型简化、透明通道处理和原始文件校验见 [环境资源说明](ASSET_ENVIRONMENT.md)；逐文件来源见 [sources.json](public/assets/environment/sources.json)。

| 资源 | 作者 |
|---|---|
| [Fern 02](https://polyhaven.com/a/fern_02) | Rob Tuytel / Rico Cilliers |
| [Rock Moss Set 01](https://polyhaven.com/a/rock_moss_set_01) | Kless Gyzen |
| [Anthurium Botany 01](https://polyhaven.com/a/anthurium_botany_01) | Rob Tuytel / Rico Cilliers |
| [Island Tree 02](https://polyhaven.com/a/island_tree_02) | Rob Tuytel / Rico Cilliers |
| [Coast Sand 01](https://polyhaven.com/a/coast_sand_01) | Rob Tuytel |
| [Forest Ground 04](https://polyhaven.com/a/forest_ground_04) | Rob Tuytel / Rico Cilliers |
| [Kloofendal 38d Partly Cloudy Pure Sky](https://polyhaven.com/a/kloofendal_38d_partly_cloudy_puresky) | Greg Zaal / Jarod Guest |

程序生成的棕榈、地形与场景布置，以及 Web Audio 合成环境音和吼声由本原型实现；没有包含购买资源、游戏提取模型或影视音频。

## 字体和开发工具

- 页面使用本机系统字体；没有打包字体文件或请求外部字体服务。
- 开发工具包括 Vite（MIT）、TypeScript（Apache-2.0）、Playwright（Apache-2.0）；素材加工用 glTF Transform（MIT）及 [Pillow（MIT-CMU）](https://github.com/python-pillow/Pillow/blob/main/LICENSE)。安装版本和依赖树以 lockfile、工具说明及各包随附的许可证为准。
- README 中比较的 React Three Fiber、ecctrl、Sketchbook、Rapier 没有打包进本版，也未使用其示例模型。
