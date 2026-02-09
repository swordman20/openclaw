# 🦞 OpenClaw — 个人 AI 助手

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="OpenClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>蜕壳！蜕壳！(EXFOLIATE! EXFOLIATE!)</strong>
</p>

<p align="center">
  <a href="https://github.com/openclaw/openclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/openclaw/openclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/openclaw/openclaw/releases"><img src="https://img.shields.io/github/v/release/openclaw/openclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**OpenClaw** 是一个你在自己的设备上运行的 _个人 AI 助手_。
它在你已经使用的渠道 (WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage, Microsoft Teams, WebChat) 上回答你，加上扩展渠道如 BlueBubbles, Matrix, Zalo, 和 Zalo Personal。它可以在 macOS/iOS/Android 上说话和倾听，并且可以渲染你控制的实时 Canvas。Gateway 只是控制平面 — 产品是助手。

如果你想要一个感觉本地、快速且始终在线的个人、单用户助手，这就是了。

[网站](https://openclaw.ai) · [文档](https://docs.openclaw.ai) · [DeepWiki](https://deepwiki.com/openclaw/openclaw) · [入门](https://docs.openclaw.ai/start/getting-started) · [更新](https://docs.openclaw.ai/install/updating) · [展示](https://docs.openclaw.ai/start/showcase) · [FAQ](https://docs.openclaw.ai/start/faq) · [向导](https://docs.openclaw.ai/start/wizard) · [Nix](https://github.com/openclaw/nix-openclaw) · [Docker](https://docs.openclaw.ai/install/docker) · [Discord](https://discord.gg/clawd)

首选设置: 在终端运行入职向导 (`openclaw onboard`)。
向导会一步步引导你设置 gateway, workspace, channels, 和 skills。CLI 向导是推荐路径，适用于 **macOS, Linux, 和 Windows (via WSL2; 强烈推荐)**。
适用于 npm, pnpm, 或 bun。
新安装？从这里开始: [入门](https://docs.openclaw.ai/start/getting-started)

**订阅 (OAuth):**

- **[Anthropic](https://www.anthropic.com/)** (Claude Pro/Max)
- **[OpenAI](https://openai.com/)** (ChatGPT/Codex)

模型说明: 虽然支持任何模型，但我强烈建议使用 **Anthropic Pro/Max (100/200) + Opus 4.6** 以获得长上下文强度和更好的提示注入抵抗力。参见 [Onboarding](https://docs.openclaw.ai/start/onboarding)。

## 模型 (选择 + 认证)

- 模型配置 + CLI: [Models](https://docs.openclaw.ai/concepts/models)
- 认证配置文件轮换 (OAuth vs API keys) + 回退: [Model failover](https://docs.openclaw.ai/concepts/model-failover)

## 安装 (推荐)

运行时: **Node ≥22**。

```bash
npm install -g openclaw@latest
# 或: pnpm add -g openclaw@latest

openclaw onboard --install-daemon
```

向导会安装 Gateway 守护进程 (launchd/systemd 用户服务) 以使其保持运行。

## 快速开始 (简述)

运行时: **Node ≥22**。

完整的初学者指南 (auth, pairing, channels): [入门](https://docs.openclaw.ai/start/getting-started)

```bash
openclaw onboard --install-daemon

openclaw gateway --port 18789 --verbose

# 发送消息
openclaw message send --to +1234567890 --message "Hello from OpenClaw"

# 与助手交谈 (可选传回任何连接的渠道: WhatsApp/Telegram/Slack/Discord/Google Chat/Signal/iMessage/BlueBubbles/Microsoft Teams/Matrix/Zalo/Zalo Personal/WebChat)
openclaw agent --message "Ship checklist" --thinking high
```

升级？[更新指南](https://docs.openclaw.ai/install/updating) (并运行 `openclaw doctor`).

## 开发渠道

- **stable**: 标记发布 (`vYYYY.M.D` 或 `vYYYY.M.D-<patch>`), npm dist-tag `latest`.
- **beta**: 预发布标记 (`vYYYY.M.D-beta.N`), npm dist-tag `beta` (可能缺少 macOS 应用).
- **dev**: `main` 的移动头, npm dist-tag `dev` (如果已发布).

切换渠道 (git + npm): `openclaw update --channel stable|beta|dev`.
详情: [开发渠道](https://docs.openclaw.ai/install/development-channels).

## 从源码构建 (开发)

首选 `pnpm` 进行源码构建。Bun 对于直接运行 TypeScript 是可选的。

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw

pnpm install
pnpm ui:build # 首次运行时自动安装 UI 依赖
pnpm build

pnpm openclaw onboard --install-daemon

# 开发循环 (TS 更改自动重载)
pnpm gateway:watch
```

注意: `pnpm openclaw ...` 直接运行 TypeScript (通过 `tsx`)。`pnpm build`生成 `dist/` 用于通过 Node / 打包的 `openclaw` 二进制文件运行。

## 安全默认值 (DM 访问)

OpenClaw 连接到真实的消息传递表面。将入站 DM 视为 **不受信任的输入**。

完整安全指南: [Security](https://docs.openclaw.ai/gateway/security)

Telegram/WhatsApp/Signal/iMessage/Microsoft Teams/Discord/Google Chat/Slack 上的默认行为:

- **DM 配对** (`dmPolicy="pairing"` / `channels.discord.dm.policy="pairing"` / `channels.slack.dm.policy="pairing"`): 未知发送者收到简短的配对码，机器人不处理他们的消息。
- 批准: `openclaw pairing approve <channel> <code>` (然后发送者被添加到本地允许列表存储)。
- 公共入站 DM 需要显式选择加入: 设置 `dmPolicy="open"` 并在渠道允许列表中包含 `"*"` (`allowFrom` / `channels.discord.dm.allowFrom` / `channels.slack.dm.allowFrom`).

运行 `openclaw doctor` 以显示有风险/配置错误的 DM 策略。

## 亮点

- **[Local-first Gateway](https://docs.openclaw.ai/gateway)** — 用于会话、渠道、工具和事件的单一控制平面。
- **[多渠道收件箱](https://docs.openclaw.ai/channels)** — WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, BlueBubbles (iMessage), iMessage (旧版), Microsoft Teams, Matrix, Zalo, Zalo Personal, WebChat, macOS, iOS/Android.
- **[多 Agent 路由](https://docs.openclaw.ai/gateway/configuration)** — 将入站渠道/账户/对等体路由到隔离的 agent (工作区 + 每个 agent 会话)。
- **[语音唤醒](https://docs.openclaw.ai/nodes/voicewake) + [通话模式](https://docs.openclaw.ai/nodes/talk)** — 使用 ElevenLabs 在 macOS/iOS/Android 上始终开启语音。
- **[实时 Canvas](https://docs.openclaw.ai/platforms/mac/canvas)** — 带有 [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui) 的 agent 驱动的可视化工作区。
- **[一等工具](https://docs.openclaw.ai/tools)** — 浏览器, canvas, nodes, cron, sessions, 以及 Discord/Slack 动作。
- **[配套应用](https://docs.openclaw.ai/platforms/macos)** — macOS 菜单栏应用 + iOS/Android [nodes](https://docs.openclaw.ai/nodes).
- **[Onboarding](https://docs.openclaw.ai/start/wizard) + [skills](https://docs.openclaw.ai/tools/skills)** — 带有捆绑/托管/工作区技能的向导驱动设置。

## 星标历史

[![Star History Chart](https://api.star-history.com/svg?repos=openclaw/openclaw&type=date&legend=top-left)](https://www.star-history.com/#openclaw/openclaw&type=date&legend=top-left)

## 我们目前构建的所有内容

### 核心平台

- [Gateway WS 控制平面](https://docs.openclaw.ai/gateway) 带有会话, 存在, 配置, cron, webhooks, [Control UI](https://docs.openclaw.ai/web), 和 [Canvas host](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui)。
- [CLI 表面](https://docs.openclaw.ai/tools/agent-send): gateway, agent, send, [wizard](https://docs.openclaw.ai/start/wizard), 和 [doctor](https://docs.openclaw.ai/gateway/doctor)。
- [Pi agent 运行时](https://docs.openclaw.ai/concepts/agent) 在 RPC 模式下，带有工具流式传输和块流式传输。
- [会话模型](https://docs.openclaw.ai/concepts/session): `main` 用于直接聊天, 组隔离, 激活模式, 队列模式, 回复返回。组规则: [Groups](https://docs.openclaw.ai/concepts/groups)。
- [媒体管道](https://docs.openclaw.ai/nodes/images): 图像/音频/视频, 转录钩子, 大小上限, 临时文件生命周期。音频详情: [Audio](https://docs.openclaw.ai/nodes/audio)。

### 渠道

- [渠道](https://docs.openclaw.ai/channels): [WhatsApp](https://docs.openclaw.ai/channels/whatsapp) (Baileys), [Telegram](https://docs.openclaw.ai/channels/telegram) (grammY), [Slack](https://docs.openclaw.ai/channels/slack) (Bolt), [Discord](https://docs.openclaw.ai/channels/discord) (discord.js), [Google Chat](https://docs.openclaw.ai/channels/googlechat) (Chat API), [Signal](https://docs.openclaw.ai/channels/signal) (signal-cli), [BlueBubbles](https://docs.openclaw.ai/channels/bluebubbles) (iMessage, 推荐), [iMessage](https://docs.openclaw.ai/channels/imessage) (旧版 imsg), [Microsoft Teams](https://docs.openclaw.ai/channels/msteams) (扩展), [Matrix](https://docs.openclaw.ai/channels/matrix) (扩展), [Zalo](https://docs.openclaw.ai/channels/zalo) (扩展), [Zalo Personal](https://docs.openclaw.ai/channels/zalouser) (扩展), [WebChat](https://docs.openclaw.ai/web/webchat)。
- [组路由](https://docs.openclaw.ai/concepts/group-messages): 提及门控, 回复标签, 每渠道分块和路由。渠道规则: [Channels](https://docs.openclaw.ai/channels)。

### 应用 + nodes

- [macOS 应用](https://docs.openclaw.ai/platforms/macos): 菜单栏控制平面, [语音唤醒](https://docs.openclaw.ai/nodes/voicewake)/PTT, [通话模式](https://docs.openclaw.ai/nodes/talk) 覆盖, [WebChat](https://docs.openclaw.ai/web/webchat), 调试工具, [远程 gateway](https://docs.openclaw.ai/gateway/remote) 控制。
- [iOS node](https://docs.openclaw.ai/platforms/ios): [Canvas](https://docs.openclaw.ai/platforms/mac/canvas), [语音唤醒](https://docs.openclaw.ai/nodes/voicewake), [通话模式](https://docs.openclaw.ai/nodes/talk), 相机, 屏幕录制, Bonjour 配对。
- [Android node](https://docs.openclaw.ai/platforms/android): [Canvas](https://docs.openclaw.ai/platforms/mac/canvas), [通话模式](https://docs.openclaw.ai/nodes/talk), 相机, 屏幕录制, 可选 SMS。
- [macOS node 模式](https://docs.openclaw.ai/nodes): system.run/notify + canvas/camera 暴露。

### 工具 + 自动化

- [浏览器控制](https://docs.openclaw.ai/tools/browser): 专用 openclaw Chrome/Chromium, 快照, 动作, 上传, 配置文件。
- [Canvas](https://docs.openclaw.ai/platforms/mac/canvas): [A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui) 推送/重置, eval, 快照。
- [Nodes](https://docs.openclaw.ai/nodes): 相机快照/剪辑, 屏幕录制, [location.get](https://docs.openclaw.ai/nodes/location-command), 通知。
- [Cron + 唤醒](https://docs.openclaw.ai/automation/cron-jobs); [webhooks](https://docs.openclaw.ai/automation/webhook); [Gmail Pub/Sub](https://docs.openclaw.ai/automation/gmail-pubsub)。
- [技能平台](https://docs.openclaw.ai/tools/skills): 捆绑, 托管, 和工作区技能，带有安装门控 + UI。

### 运行时 + 安全

- [渠道路由](https://docs.openclaw.ai/concepts/channel-routing), [重试策略](https://docs.openclaw.ai/concepts/retry), 和 [流式/分块](https://docs.openclaw.ai/concepts/streaming)。
- [存在](https://docs.openclaw.ai/concepts/presence), [输入指示器](https://docs.openclaw.ai/concepts/typing-indicators), 和 [使用跟踪](https://docs.openclaw.ai/concepts/usage-tracking)。
- [模型](https://docs.openclaw.ai/concepts/models), [模型故障转移](https://docs.openclaw.ai/concepts/model-failover), 和 [会话修剪](https://docs.openclaw.ai/concepts/session-pruning)。
- [安全](https://docs.openclaw.ai/gateway/security) 和 [故障排除](https://docs.openclaw.ai/channels/troubleshooting)。

### 运维 + 打包

- [Control UI](https://docs.openclaw.ai/web) + [WebChat](https://docs.openclaw.ai/web/webchat) 直接从 Gateway 提供服务。
- [Tailscale Serve/Funnel](https://docs.openclaw.ai/gateway/tailscale) 或 [SSH tunnels](https://docs.openclaw.ai/gateway/remote) 带有令牌/密码认证。
- [Nix 模式](https://docs.openclaw.ai/install/nix) 用于声明式配置; [Docker](https://docs.openclaw.ai/install/docker) 基于安装。
- [Doctor](https://docs.openclaw.ai/gateway/doctor) 迁移, [日志](https://docs.openclaw.ai/logging)。

## 工作原理 (简述)

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / BlueBubbles / Microsoft Teams / Matrix / Zalo / Zalo Personal / WebChat
               │
               ▼
┌───────────────────────────────┐
│            Gateway            │
│       (控制平面)                │
│     ws://127.0.0.1:18789      │
└──────────────┬────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (openclaw …)
               ├─ WebChat UI
               ├─ macOS 应用
               └─ iOS / Android nodes
```

## 关键子系统

- **[Gateway WebSocket 网络](https://docs.openclaw.ai/concepts/architecture)** — 用于客户端、工具和事件的单一 WS 控制平面 (加运维: [Gateway runbook](https://docs.openclaw.ai/gateway))。
- **[Tailscale 暴露](https://docs.openclaw.ai/gateway/tailscale)** — Serve/Funnel 用于 Gateway 仪表板 + WS (远程访问: [Remote](https://docs.openclaw.ai/gateway/remote))。
- **[浏览器控制](https://docs.openclaw.ai/tools/browser)** — openclaw 管理的 Chrome/Chromium 带有 CDP 控制。
- **[Canvas + A2UI](https://docs.openclaw.ai/platforms/mac/canvas)** — agent 驱动的可视化工作区 (A2UI host: [Canvas/A2UI](https://docs.openclaw.ai/platforms/mac/canvas#canvas-a2ui))。
- **[语音唤醒](https://docs.openclaw.ai/nodes/voicewake) + [通话模式](https://docs.openclaw.ai/nodes/talk)** — 始终开启的语音和连续对话。
- **[Nodes](https://docs.openclaw.ai/nodes)** — Canvas, 相机快照/剪辑, 屏幕录制, `location.get`, 通知, 加上仅 macOS 的 `system.run`/`system.notify`。

## Tailscale 访问 (Gateway 仪表板)

OpenClaw 可以自动配置 Tailscale **Serve** (仅 tailnet) 或 **Funnel** (公共)，同时 Gateway 保持绑定到 loopback。配置 `gateway.tailscale.mode`:

- `off`: 无 Tailscale 自动化 (默认)。
- `serve`: 仅 tailnet HTTPS 通过 `tailscale serve` (默认使用 Tailscale 身份标头)。
- `funnel`: 公共 HTTPS 通过 `tailscale funnel` (需要共享密码认证)。

注意:

- 当启用 Serve/Funnel 时，`gateway.bind` 必须保持 `loopback` (OpenClaw 强制执行此操作)。
- 可以通过设置 `gateway.auth.mode: "password"` 或 `gateway.auth.allowTailscale: false` 强制 Serve 需要密码。
- 除非设置了 `gateway.auth.mode: "password"`，否则 Funnel 拒绝启动。
- 可选: `gateway.tailscale.resetOnExit` 在关闭时撤消 Serve/Funnel。

详情: [Tailscale 指南](https://docs.openclaw.ai/gateway/tailscale) · [Web 表面](https://docs.openclaw.ai/web)

## 远程 Gateway (Linux 很棒)

在小型 Linux 实例上运行 Gateway 完全没问题。客户端 (macOS 应用, CLI, WebChat) 可以通过 **Tailscale Serve/Funnel** 或 **SSH tunnels** 连接，并且你仍然可以配对设备节点 (macOS/iOS/Android) 以在需要时执行设备本地操作。

- **Gateway 主机** 默认运行 exec 工具和渠道连接。
- **设备节点** 通过 `node.invoke` 运行设备本地操作 (`system.run`, 相机, 屏幕录制, 通知)。
  简而言之: exec 在 Gateway 所在的位置运行；设备操作在设备所在的位置运行。

详情: [远程访问](https://docs.openclaw.ai/gateway/remote) · [Nodes](https://docs.openclaw.ai/nodes) · [安全](https://docs.openclaw.ai/gateway/security)

## 通过 Gateway 协议的 macOS 权限

macOS 应用可以在 **node 模式** 下运行，并通过 Gateway WebSocket (`node.list` / `node.describe`) 通告其功能 + 权限映射。客户端随后可以通过 `node.invoke` 执行本地操作:

- `system.run` 运行本地命令并返回 stdout/stderr/exit code; 设置 `needsScreenRecording: true` 以要求屏幕录制权限 (否则你会得到 `PERMISSION_MISSING`)。
- `system.notify` 发布用户通知，如果通知被拒绝则失败。
- `canvas.*`, `camera.*`, `screen.record`, 和 `location.get` 也通过 `node.invoke` 路由并遵循 TCC 权限状态。

提升的 bash (主机权限) 与 macOS TCC 分开:

- 使用 `/elevated on|off` 切换每个会话的提升访问权限 (当启用 + 允许列表时)。
- Gateway 通过 `sessions.patch` (WS 方法) 持久化每个会话的切换，连同 `thinkingLevel`, `verboseLevel`, `model`, `sendPolicy`, 和 `groupActivation`。

详情: [Nodes](https://docs.openclaw.ai/nodes) · [macOS 应用](https://docs.openclaw.ai/platforms/macos) · [Gateway 协议](https://docs.openclaw.ai/concepts/architecture)

## Agent 到 Agent (sessions_* 工具)

- 使用这些跨会话协调工作，而无需在聊天表面之间跳转。
- `sessions_list` — 发现活动会话 (agents) 及其元数据。
- `sessions_history` — 获取会话的记录日志。
- `sessions_send` — 给另一个会话发消息；可选回复返回 ping-pong + 公告步骤 (`REPLY_SKIP`, `ANNOUNCE_SKIP`)。

详情: [会话工具](https://docs.openclaw.ai/concepts/session-tool)

## 技能注册表 (ClawHub)

ClawHub 是一个最小的技能注册表。启用 ClawHub 后，agent 可以自动搜索技能并根据需要拉入新技能。

[ClawHub](https://clawhub.com)

## 聊天命令

在 WhatsApp/Telegram/Slack/Google Chat/Microsoft Teams/WebChat 中发送这些 (组命令仅限所有者):

- `/status` — 紧凑会话状态 (模型 + tokens, 可用时成本)
- `/new` 或 `/reset` — 重置会话
- `/compact` — 紧凑会话上下文 (摘要)
- `/think <level>` — off|minimal|low|medium|high|xhigh (仅限 GPT-5.2 + Codex 模型)
- `/verbose on|off`
- `/usage off|tokens|full` — 每个响应的使用页脚
- `/restart` — 重启 gateway (在组中仅限所有者)
- `/activation mention|always` — 组激活切换 (仅限组)

## 应用 (可选)

仅 Gateway 就能提供出色的体验。所有应用都是可选的，并添加额外功能。

如果你计划构建/运行配套应用，请遵循下面的平台运行手册。

### macOS (OpenClaw.app) (可选)

- Gateway 和健康的菜单栏控制。
- 语音唤醒 + 一键通覆盖。
- WebChat + 调试工具。
- 通过 SSH 的远程 gateway 控制。

注意: 跨重建保持 macOS 权限需要签名构建 (参见 `docs/mac/permissions.md`)。

### iOS node (可选)

- 通过 Bridge 作为节点配对。
- 语音触发转发 + Canvas 表面。
- 通过 `openclaw nodes …` 控制。

运行手册: [iOS 连接](https://docs.openclaw.ai/platforms/ios).

### Android node (可选)

- 通过与 iOS 相同的 Bridge + 配对流程配对。
- 暴露 Canvas, Camera, 和 Screen 捕获命令。
- 运行手册: [Android 连接](https://docs.openclaw.ai/platforms/android).

## Agent 工作区 + 技能

- 工作区根目录: `~/.openclaw/workspace` (可通过 `agents.defaults.workspace` 配置)。
- 注入的提示文件: `AGENTS.md`, `SOUL.md`, `TOOLS.md`.
- 技能: `~/.openclaw/workspace/skills/<skill>/SKILL.md`.

## 配置

最小 `~/.openclaw/openclaw.json` (模型 + 默认值):

```json5
{
  agent: {
    model: "anthropic/claude-opus-4-6",
  },
}
```

[完整配置参考 (所有键 + 示例).](https://docs.openclaw.ai/gateway/configuration)

## 安全模型 (重要)

- **默认:** 工具在 **main** 会话的主机上运行，所以当只有你时，agent 拥有完全访问权限。
- **组/渠道安全:** 设置 `agents.defaults.sandbox.mode: "non-main"` 以在每个会话的 Docker 沙箱中运行 **非 main 会话** (组/渠道)；bash 随后在这些会话的 Docker 中运行。
- **沙箱默认值:** 允许列表 `bash`, `process`, `read`, `write`, `edit`, `sessions_list`, `sessions_history`, `sessions_send`, `sessions_spawn`; 拒绝列表 `browser`, `canvas`, `nodes`, `cron`, `discord`, `gateway`.

详情: [安全指南](https://docs.openclaw.ai/gateway/security) · [Docker + 沙箱](https://docs.openclaw.ai/install/docker) · [Sandbox 配置](https://docs.openclaw.ai/gateway/configuration)

### [WhatsApp](https://docs.openclaw.ai/channels/whatsapp)

- 链接设备: `pnpm openclaw channels login` (将凭据存储在 `~/.openclaw/credentials`).
- 通过 `channels.whatsapp.allowFrom` 允许谁与助手交谈。
- 如果设置了 `channels.whatsapp.groups`，它将成为组允许列表；包含 `"*"` 以允许所有。

### [Telegram](https://docs.openclaw.ai/channels/telegram)

- 设置 `TELEGRAM_BOT_TOKEN` 或 `channels.telegram.botToken` (环境变量优先)。
- 可选: 设置 `channels.telegram.groups` (带有 `channels.telegram.groups."*".requireMention`); 当设置时，它是组允许列表 (包含 `"*"` 以允许所有)。根据需要还有 `channels.telegram.allowFrom` 或 `channels.telegram.webhookUrl` + `channels.telegram.webhookSecret`。

```json5
{
  channels: {
    telegram: {
      botToken: "123456:ABCDEF",
    },
  },
}
```

### [Slack](https://docs.openclaw.ai/channels/slack)

- 设置 `SLACK_BOT_TOKEN` + `SLACK_APP_TOKEN` (或 `channels.slack.botToken` + `channels.slack.appToken`).

### [Discord](https://docs.openclaw.ai/channels/discord)

- 设置 `DISCORD_BOT_TOKEN` or `channels.discord.token` (环境变量优先)。
- 可选: 根据需要设置 `commands.native`, `commands.text`, 或 `commands.useAccessGroups`, 加上 `channels.discord.dm.allowFrom`, `channels.discord.guilds`, 或 `channels.discord.mediaMaxMb`。

```json5
{
  channels: {
    discord: {
      token: "1234abcd",
    },
  },
}
```

### [Signal](https://docs.openclaw.ai/channels/signal)

- 需要 `signal-cli` 和 `channels.signal` 配置部分。

### [BlueBubbles (iMessage)](https://docs.openclaw.ai/channels/bluebubbles)

- **推荐** iMessage 集成。
- 配置 `channels.bluebubbles.serverUrl` + `channels.bluebubbles.password` 和 webhoook (`channels.bluebubbles.webhookPath`)。
- BlueBubbles 服务器在 macOS 上运行；Gateway 可以运行在 macOS 或其他地方。

### [iMessage (legacy)](https://docs.openclaw.ai/channels/imessage)

- 通过 `imsg` 的旧版 macOS 专用集成 (Messages 必须登录)。
- 如果设置了 `channels.imessage.groups`，它将成为组允许列表；包含 `"*"` 以允许所有。

### [Microsoft Teams](https://docs.openclaw.ai/channels/msteams)

- 配置 Teams app + Bot Framework, 然后添加 `msteams` 配置部分。
- 通过 `msteams.allowFrom` 允许谁交谈；通过 `msteams.groupAllowFrom` 或 `msteams.groupPolicy: "open"` 进行组访问。

### [WebChat](https://docs.openclaw.ai/web/webchat)

- 使用 Gateway WebSocket; 没有单独的 WebChat 端口/配置。

浏览器控制 (可选):

```json5
{
  browser: {
    enabled: true,
    color: "#FF4500",
  },
}
```

## 文档

当你通过入职流程并想要更深入的参考时，请使用这些。

- [从文档索引开始导航和 “什么在哪里”。](https://docs.openclaw.ai)
- [阅读 gateway + protocol 模型的架构概述。](https://docs.openclaw.ai/concepts/architecture)
- [当你需要每个键和示例时，请使用完整的配置参考。](https://docs.openclaw.ai/gateway/configuration)
- [使用操作运行手册按书运行 Gateway。](https://docs.openclaw.ai/gateway)
- [了解 Control UI/Web 表面如何工作以及如何安全地暴露它们。](https://docs.openclaw.ai/web)
- [了解通过 SSH tunnels 或 tailnets 的远程访问。](https://docs.openclaw.ai/gateway/remote)
- [按照入职向导流程进行引导式设置。](https://docs.openclaw.ai/start/wizard)
- [通过 webhook 表面连接外部触发器。](https://docs.openclaw.ai/automation/webhook)
- [设置 Gmail Pub/Sub 触发器。](https://docs.openclaw.ai/automation/gmail-pubsub)
- [了解 macOS 菜单栏配套详情。](https://docs.openclaw.ai/platforms/mac/menu-bar)
- [平台指南: Windows (WSL2)](https://docs.openclaw.ai/platforms/windows), [Linux](https://docs.openclaw.ai/platforms/linux), [macOS](https://docs.openclaw.ai/platforms/macos), [iOS](https://docs.openclaw.ai/platforms/ios), [Android](https://docs.openclaw.ai/platforms/android)
- [使用故障排除指南调试常见故障。](https://docs.openclaw.ai/channels/troubleshooting)
- [在暴露任何内容之前查看安全指南。](https://docs.openclaw.ai/gateway/security)

## 高级文档 (发现 + 控制)

- [发现 + 传输](https://docs.openclaw.ai/gateway/discovery)
- [Bonjour/mDNS](https://docs.openclaw.ai/gateway/bonjour)
- [Gateway 配对](https://docs.openclaw.ai/gateway/pairing)
- [远程 gateway README](https://docs.openclaw.ai/gateway/remote-gateway-readme)
- [Control UI](https://docs.openclaw.ai/web/control-ui)
- [Dashboard](https://docs.openclaw.ai/web/dashboard)

## 运维与故障排除

- [健康检查](https://docs.openclaw.ai/gateway/health)
- [Gateway 锁](https://docs.openclaw.ai/gateway/gateway-lock)
- [后台进程](https://docs.openclaw.ai/gateway/background-process)
- [浏览器故障排除 (Linux)](https://docs.openclaw.ai/tools/browser-linux-troubleshooting)
- [日志](https://docs.openclaw.ai/logging)

## 深入探究

- [Agent 循环](https://docs.openclaw.ai/concepts/agent-loop)
- [存在](https://docs.openclaw.ai/concepts/presence)
- [TypeBox schemas](https://docs.openclaw.ai/concepts/typebox)
- [RPC 适配器](https://docs.openclaw.ai/reference/rpc)
- [队列](https://docs.openclaw.ai/concepts/queue)

## 工作区与技能

- [技能配置](https://docs.openclaw.ai/tools/skills-config)
- [默认 AGENTS](https://docs.openclaw.ai/reference/AGENTS.default)
- [模板: AGENTS](https://docs.openclaw.ai/reference/templates/AGENTS)
- [模板: BOOTSTRAP](https://docs.openclaw.ai/reference/templates/BOOTSTRAP)
- [模板: IDENTITY](https://docs.openclaw.ai/reference/templates/IDENTITY)
- [模板: SOUL](https://docs.openclaw.ai/reference/templates/SOUL)
- [模板: TOOLS](https://docs.openclaw.ai/reference/templates/TOOLS)
- [模板: USER](https://docs.openclaw.ai/reference/templates/USER)

## 平台内部

- [macOS 开发设置](https://docs.openclaw.ai/platforms/mac/dev-setup)
- [macOS 菜单栏](https://docs.openclaw.ai/platforms/mac/menu-bar)
- [macOS 语音唤醒](https://docs.openclaw.ai/platforms/mac/voicewake)
- [iOS node](https://docs.openclaw.ai/platforms/ios)
- [Android node](https://docs.openclaw.ai/platforms/android)
- [Windows (WSL2)](https://docs.openclaw.ai/platforms/windows)
- [Linux 应用](https://docs.openclaw.ai/platforms/linux)

## 邮件钩子 (Gmail)

- [docs.openclaw.ai/gmail-pubsub](https://docs.openclaw.ai/automation/gmail-pubsub)

## Molty

OpenClaw 是为 **Molty**, 一个太空龙虾 AI 助手而构建的。🦞
由 Peter Steinberger 和社区支持。

- [openclaw.ai](https://openclaw.ai)
- [soul.md](https://soul.md)
- [steipete.me](https://steipete.me)
- [@openclaw](https://x.com/openclaw)

## 社区

查看 [CONTRIBUTING.md](CONTRIBUTING.md) 以获取指南、维护者以及如何提交 PR。
欢迎 AI/vibe-coded PRs! 🤖

特别感谢 [Mario Zechner](https://mariozechner.at/) 的支持以及 [pi-mono](https://github.com/badlogic/pi-mono)。
特别感谢 Adam Doppelt 的 lobster.bot。

感谢所有 clawtributors:

(贡献者列表保持原样)
