# V0.3 新物种来源与加工记录

核验日期：2026-09-27。以下为实际随项目提供的模型，运行时从本地加载。

| 目录 / 物种 | 原作者与来源 | 采用许可 |
|---|---|---|
| `raptor` / 迅猛龙 | [PBR Velociraptor (Animated)](https://sketchfab.com/3d-models/pbr-velociraptor-animated-8f1744af7b0847a2aabe3df90be802f0) — Ferocious Industries | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `rhino` / 犀牛 | [Rhino Animation Walk](https://sketchfab.com/3d-models/rhino-animation-walk-a915d9179fe6422b9d669a3a0d726b8e) — GremorySaiyan | CC BY 4.0 |
| `crow` / 乌鸦 | [Crow](https://sketchfab.com/3d-models/crow-d5a9b0df4da3493688b63ce42c8a83e2) — Alexei Ostapenko | CC BY 4.0 |
| `diplodocus` / 梁龙 | [Diplodocus](https://opengameart.org/content/diplodocus) — Skorpio | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |

前三项来自 [QtMeshEditor motion corpus 的公开再分发文件](https://huggingface.co/datasets/fernandotonon/QtMeshEditor-motion-corpus/tree/main/raw/sketchfab)。逐项作者、来源及原始 `license.txt` 随对应模型目录保留，未使用 Sketchfab 查看器提取或绕过下载登录。
镜像目录分别为 `PBR_Velociraptor_Animated__8f1744af`、`Rhino_Animation_Walk_a915d917`、`Crow_d5a9b0df`。镜像不等于原作者；许可依据模型元数据与各自署名文件。

梁龙直接下载作者在 OpenGameArt 发布的 [Diplodocus.zip](https://opengameart.org/sites/default/files/Diplodocus.zip)。该资源提供 CC BY-SA 3.0 / GPL 3.0 选项，本项目选择 CC BY-SA 3.0。**衍生模型及新增动画继续按 CC BY-SA 3.0 提供**；分享衍生模型时保留作者、来源、修改说明和相同许可。这不将独立的应用代码声明为同一素材许可。

## 加工

- 迅猛龙：glTF Transform 4.2.1 将旧 specular-glossiness 材质转换为现代 PBR，resample 删除冗余关键帧；保留原作者动画。运行时校正折射率、缩放、朝向并混合待机/行走/奔跑。
- 犀牛：保留原作者行走骨骼动画；停步时停在当前动画姿态，没有冒称另有原生待机动作。
- 乌鸦：从原作者 10.52 秒起飞动作的 7.20–7.72 秒段重采样飞行循环，首尾姿态闭合；独立的空中路线由游戏驱动。没有将地面站立段当作飞行动作循环。
- 梁龙：Blender 4.2.9 读取原始 `.blend`，复用 35 根骨骼和作者贴图，细分两级改善轮廓，重新连接 PBR 材质，添加本项目编制的简易呼吸/颈尾摆动/四足步行循环。原版没有动画，不能将新增动画归于原作者。最终 21,600 三角形，仍有免费素材与简单步态的限制。
- 所有新增模型用 `tools/pack-animal.py` 重打包，保留需要的透明度，将贴图限制为 1K（梁龙 2K）；非透明图使用 JPEG 93。骨骼索引、权重、动画和几何缓冲保持对应。
- 运行时使用独立骨架副本，共享模型几何和纹理；体型、光泽及颜色可能与原始展示不同。

可复现梁龙转换脚本为 `tools/build-diplodocus.py`，纹理打包脚本为 `tools/pack-animal.py`。原始文件放在忽略的 `.asset-work/`；交付的 GLB、贴图、动画已完整嵌入，不需要 Blender 才能玩。
本次下载及最终 GLB 的 SHA-256 见同目录 `manifest.json`。

V0.4（2026-09-28）将同一迅猛龙模型接入玩家控制：映射原始 Idle_01 / Walk / Sprint / Roar_01 / Bite_01 / Eat Prey 动画，调整动作时长、体型和相机；未改变 GLB 文件、作者或许可。霸王龙和迅猛龙可切换，不包含翼龙或棘龙素材。
