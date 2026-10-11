# Codex Cloud 环境

环境名称：我们的游戏工坊（our-game-workshop）。仓库：chanayy123/our-game-workshop，默认 main。

只需 ChatGPT/Codex 账号的云端权限和额度，不配置 OPENAI_API_KEY。不要将任何本机凭据放入仓库。

创建入口：[Codex 云端](https://chatgpt.com/codex/cloud) -> 工作位置“云端” -> 选择环境 -> 创建环境。选择本仓库，进行依赖安装和测试，再保存/发布环境。

安装建议（Node.js 22.17+，本次云实例为 Node 24）：
```sh
node scripts/cloud-setup.mjs
npx playwright install --with-deps chromium
npm test
npm run build
npm run test:site
```

本次云环境的 Playwright CDN 下载受网络策略限制，已使用环境自带的 `/usr/bin/chromium` 完成 27 项浏览器检查。保存的安装脚本会生成 `.cache/site-smoke-system.mjs`，以 Playwright 的 `executablePath` 指定该浏览器；云端执行 `node .cache/site-smoke-system.mjs`。常规本地和 GitHub Actions 仍执行 `npm run test:site`。无需为此放宽网络范围。

安装脚本使用仓库内 npm 缓存，避免云端默认缓存目录不可写。游戏运行时不需要远程素材；全部游戏构建采用相对资源路径。使用仓库 AGENTS.md 作为修改与验收说明。

新任务应从最新 main 开始。任务里产生的改动不会自动更新已发布网站或其他任务；必须提交/合并并等待 GitHub Actions。环境缓存若停留在旧版本，更新或重新发布环境再开始新任务。

Cloud 产品说明：https://learn.chatgpt.com/docs/environments/cloud-environments

环境默认仅限当前账号使用。平板登录同一账号后，在新聊天的 Codex 输入框选择“云端”和“我们的游戏工坊”。其他账号不能仅凭公开仓库自动使用这个环境，需要自行创建环境。
