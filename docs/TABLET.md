# 平板提修改想法

1. 打开合集：https://chanayy123.github.io/our-game-workshop/games/ 。需要键鼠的游戏在卡片上标明；真实平板性能需要设备验证。
2. 有想法时回到合集，在“我想改一下”选游戏，用平板输入法麦克风输入文字，点“复制修改想法”。不调用我们自己的语音 API。
3. 打开 [Codex 云端](https://chatgpt.com/codex/cloud)，选择工作位置“云端”，选择“我们的游戏工坊”环境，粘贴并发送。平板需登录创建环境的同一账号，并有 Codex 云端权限和可用额度；普通聊天并不自动修改仓库。
4. Codex 完成后可继续在同一个任务里提出调整。查看检查结果，创建修改请求（PR），在 GitHub 合并到 main 后，工坊自动发布。
5. 等待 [Build and publish workshop](https://github.com/chanayy123/our-game-workshop/actions/workflows/pages.yml) 成功，回游戏刷新。失败不会部署失败的构建，旧网站继续可用。

第一次可试：“白鲨海峡的船最高速度提高一点，其他玩法保持原样。先告诉我改了什么，准备修改请求。”

孩子不需要安装 Node.js、Git、Codex 桌面端或付费 API。提想法、云端改代码、合并、自动发布是四个不同步骤；目前保留合并步骤，没有设置无人审批自动改写公开游戏。
