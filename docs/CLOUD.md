# Codex Cloud 环境

环境名称：我们的游戏工坊（our-game-workshop）。仓库：chanayy123/our-game-workshop，默认 main。

只需 ChatGPT/Codex 账号的云端权限和额度，不配置 OPENAI_API_KEY。不要将任何本机凭据放入仓库。

创建入口：ChatGPT 的 Codex 输入框 -> 工作位置“云端” -> 选择环境 -> 创建环境。选择本仓库，进行依赖安装和测试，再保存/发布环境。

安装建议（Node.js 22.17+）：
```sh
node scripts/cloud-setup.mjs
npx playwright install --with-deps chromium
npm test
npm run build
npm run test:site
```

网络只需 npm 依赖和 Playwright 浏览器安装来源。若设置阶段下载浏览器成功，游戏运行时不需要远程素材；全部游戏构建采用相对资源路径。使用仓库 AGENTS.md 作为修改与验收说明。

新任务应从最新 main 开始。任务里产生的改动不会自动更新已发布网站或其他任务；必须提交/合并并等待 GitHub Actions。环境缓存若停留在旧版本，更新或重新发布环境再开始新任务。

Cloud 产品说明：https://learn.chatgpt.com/docs/environments/cloud-environments

本文件是可复用设置说明；是否已经在账号里实际创建并发布环境，以云端设置页面和本地验收记录为准。
