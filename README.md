# Our Game Workshop · 我们的游戏工坊

把孩子的奇思妙想，变成可以亲手玩的游戏。一个仓库保存六个小游戏的完整源码、美术资源、测试和统一发布流程。

**[打开游戏合集](https://chanayy123.github.io/our-game-workshop/games/)** · [平板提修改想法](docs/TABLET.md) · [Codex 云端设置](docs/CLOUD.md)

| 游戏 | 源码 | 在线试玩 | 操作 |
| --- | --- | --- | --- |
| 鹈鹕骑行 | [pelican-pedal](games/pelican-pedal) | [开始骑行](https://chanayy123.github.io/our-game-workshop/pelican-pedal/) | 键鼠 / 触屏 |
| 逃离恐龙岛 | [dinosaur-island](games/dinosaur-island) | [进入岛屿](https://chanayy123.github.io/our-game-workshop/) | 键鼠 / 平板触控 |
| 溪流手记 | [riverkeeper](games/riverkeeper) | [踏入溪流](https://chanayy123.github.io/our-game-workshop/riverkeeper/) | 键鼠 / 触屏 |
| 不许动，盆栽！ | [midnight-masquerade](games/midnight-masquerade) | [开始躲猫猫](https://chanayy123.github.io/our-game-workshop/midnight-masquerade/) | 电脑键鼠 |
| 白鲨海峡 | [shark-sea-survival](games/shark-sea-survival) | [启航](https://chanayy123.github.io/our-game-workshop/shark-sea-survival/) | 电脑键鼠 |
| 伏沙猎手 | [sandjaw](games/sandjaw) | [潜入海岸](https://chanayy123.github.io/our-game-workshop/sandjaw/) | 键鼠 / 触屏 |

触屏标签表示已有触屏操作代码，不表示所有真实平板性能都已通过测试。需要电脑键鼠的两款游戏保留原操作方式。

## 开发

Node.js 22.17+。每个游戏保留自己的依赖、锁文件和测试，不必将它们合成一个大程序。

```sh
npm ci
npm run setup
npm run dev -- shark-sea-survival
npm test -- shark-sea-survival
npm run build
npx playwright install --with-deps chromium
npm run test:site
npm run preview
```

预览：http://127.0.0.1:4170/our-game-workshop/games/ 。用 games.json 中的 slug 替换上述游戏名。Windows 如有 PowerShell 执行策略限制，可使用 npm.cmd。本机已安装 Chrome 时，浏览器检查可设置 PLAYWRIGHT_CHANNEL=chrome。

## 自动发布

向 main 推送或合并修改后，GitHub Actions 自动安装依赖、运行所有规则测试、构建六个游戏、执行浏览器检查，再发布 .site。PR 只检查，不上线。只有通过检查的构建会进入部署；修改完成后请确认 [发布状态](https://github.com/chanayy123/our-game-workshop/actions/workflows/pages.yml)。

恐龙岛原根地址和合集 /games/ 保留。其他游戏采用独立子路径。线上只发布构建、合集和素材许可，不发布 node_modules、测试工具或工作记录。源码在 GitHub 中公开。

## Codex 修改

仓库 [AGENTS.md](AGENTS.md) 提供中文游戏名、目录、修改范围、验证和发布说明。在平板用系统输入法听写，直接给 Codex 云端的工坊环境发修改指令。合并后自动更新试玩。没有配置付费 AI/语音 API，也没有设置自动合并。

## 素材与许可

恐龙岛保留 [第三方素材记录](games/dinosaur-island/THIRD_PARTY_NOTICES.md) 和 public/assets 中的 SOURCE/license 文件；白鲨海峡保留 [素材说明](games/shark-sea-survival/ASSETS.md) 和 public/licenses；运行时依赖和字体许可在构建时从已安装的依赖包复制到各试玩的 licenses 目录。其他游戏的程序化素材见各自 README。第三方素材按各自许可使用。源码公开不改变第三方许可，也不自动授予本仓库未明确声明的开源许可。

## 本地迁移

本仓库从六个本地 G01～G06 项目复制源码整理而来；原目录继续保留。历史验收文档是原项目记录，当前工坊验证以 [迁移与发布记录](docs/VALIDATION.md) 和 GitHub Actions 为准。