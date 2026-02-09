# OpenClaw ACP 桥接

本文档描述了 OpenClaw ACP (Agent Client Protocol) 桥接的工作原理，
它如何将 ACP 会话映射到 Gateway 会话，以及 IDE 应该如何调用它。

## 概述

`openclaw acp` 通过 stdio 暴露一个 ACP agent，并通过 WebSocket 将提示转发到运行中的 OpenClaw Gateway。
它保持 ACP 会话 ID 映射到 Gateway 会话密钥，以便 IDE 可以重新连接到同一个 agent 记录或根据请求重置它。

主要目标:

- 最小的 ACP 表面积 (stdio, NDJSON)。
- 跨重连的稳定会话映射。
- 与现有 Gateway 会话存储一起工作 (list/resolve/reset)。
- 安全默认值 (默认隔离 ACP 会话密钥)。

## 我该如何使用这个

当 IDE 或工具使用 Agent Client Protocol 并且你希望它驱动 OpenClaw Gateway 会话时，请使用 ACP。

快速步骤:

1. 运行一个 Gateway (本地或远程)。
2. 配置 Gateway 目标 (`gateway.remote.url` + auth) 或传递标志。
3. 指向 IDE 通过 stdio 运行 `openclaw acp`。

配置示例:

```bash
openclaw config set gateway.remote.url wss://gateway-host:18789
openclaw config set gateway.remote.token <token>
```

运行示例:

```bash
openclaw acp --url wss://gateway-host:18789 --token <token>
```

## 选择 agent

ACP 不直接选择 agent。它通过 Gateway 会话密钥进行路由。

使用 agent 作用域的会话密钥来定位特定 agent:

```bash
openclaw acp --session agent:main:main
openclaw acp --session agent:design:main
openclaw acp --session agent:qa:bug-123
```

每个 ACP 会话映射到一个单一的 Gateway 会话密钥。一个 agent 可以有许多会话；
ACP 默认为隔离的 `acp:<uuid>` 会话，除非你覆盖密钥或标签。

## Zed 编辑器设置

在 `~/.config/zed/settings.json` 中添加自定义 ACP agent:

```json
{
  "agent_servers": {
    "OpenClaw ACP": {
      "type": "custom",
      "command": "openclaw",
      "args": ["acp"],
      "env": {}
    }
  }
}
```

要定位特定 Gateway 或 agent:

```json
{
  "agent_servers": {
    "OpenClaw ACP": {
      "type": "custom",
      "command": "openclaw",
      "args": [
        "acp",
        "--url",
        "wss://gateway-host:18789",
        "--token",
        "<token>",
        "--session",
        "agent:design:main"
      ],
      "env": {}
    }
  }
}
```

在 Zed 中，打开 Agent 面板并选择 “OpenClaw ACP” 以启动线程。

## 执行模型

- ACP 客户端生成 `openclaw acp` 并通过 stdio 发送 ACP 消息。
- 桥接使用现有 auth 配置 (或 CLI 标志) 连接到 Gateway。
- ACP `prompt` 转换为 Gateway `chat.send`。
- Gateway 流式事件被转换回 ACP 流式事件。
- ACP `cancel` 映射为活动运行的 Gateway `chat.abort`。

## 会话映射

默认情况下，每个 ACP 会话映射到一个专用 Gateway 会话密钥:

- `acp:<uuid>` 除非被覆盖。

你可以通过两种方式覆盖或重用会话:

1. CLI 默认值

```bash
openclaw acp --session agent:main:main
openclaw acp --session-label "support inbox"
openclaw acp --reset-session
```

2. 每个会话的 ACP 元数据

```json
{
  "_meta": {
    "sessionKey": "agent:main:main",
    "sessionLabel": "support inbox",
    "resetSession": true,
    "requireExisting": false
  }
}
```

规则:

- `sessionKey`: 直接 Gateway 会话密钥。
- `sessionLabel`: 通过标签解析现有会话。
- `resetSession`: 在首次使用前为密钥创建一个新记录。
- `requireExisting`: 如果密钥/标签不存在则失败。

### 会话列表

ACP `listSessions` 映射到 Gateway `sessions.list` 并返回适合 IDE 会话选择器的过滤摘要。
`_meta.limit` 可以限制返回的会话数量。

## 提示翻译

ACP 提示输入被转换为 Gateway `chat.send`:

- `text` 和 `resource` 块变为提示文本。
- 带有图像 mime 类型的 `resource_link` 变为附件。
- 工作目录可以作为前缀添加到提示中 (默认开启，可以使用 `--no-prefix-cwd` 禁用)。

Gateway 流式事件被翻译为 ACP `message` 和 `tool_call` 更新。
终端 Gateway 状态映射到 ACP `done` 带有停止原因:

- `complete` -> `stop`
- `aborted` -> `cancel`
- `error` -> `error`

## 认证 + 网关发现

`openclaw acp` 从 CLI 标志或配置解析 Gateway URL 和 auth:

- `--url` / `--token` / `--password` 优先。
- 否则使用配置的 `gateway.remote.*` 设置。

## 操作说明

- ACP 会话在桥接进程生命周期内存储在内存中。
- Gateway 会话状态由 Gateway 本身持久化。
- `--verbose` 将 ACP/Gateway 桥接事件记录到 stderr (从不 stdout)。
- ACP 运行可以取消，活动运行 id 按会话跟踪。

## 兼容性

- ACP 桥接使用 `@agentclientprotocol/sdk` (目前 0.13.x).
- 适用于实现 `initialize`, `newSession`, `loadSession`, `prompt`, `cancel`, 和 `listSessions` 的 ACP 客户端。

## 测试

- 单元: `src/acp/session.test.ts` 涵盖运行 id 生命周期。
- 全门控: `pnpm build && pnpm check && pnpm test && pnpm docs:build`.

## 相关文档

- CLI 用法: `docs/cli/acp.md`
- 会话模型: `docs/concepts/session.md`
- 会话管理内部原理: `docs/reference/session-management-compaction.md`
