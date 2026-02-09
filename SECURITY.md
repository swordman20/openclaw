# 安全策略

如果你认为你在 OpenClaw 中发现了安全问题，请私下报告。

## 报告

有关完整的报告说明 - 包括向哪个仓库报告以及如何报告 - 请参阅我们的 [信任页面](https://trust.openclaw.ai)。

包括: 重现步骤，影响评估，以及 (如果可能) 一个最小的 PoC。

## 安全与信任

**Jamieson O'Reilly** ([@theonejvo](https://twitter.com/theonejvo)) 是 OpenClaw 的安全与信任负责人。Jamieson 是 [Dvuln](https://dvuln.com) 的创始人，在进攻性安全、渗透测试和安全项目开发方面拥有丰富的经验。

## Bug 赏金

OpenClaw 是一个用爱发电的项目。没有 bug 赏金计划，也没有付费报告的预算。请仍然负责任地披露，以便我们可以快速修复问题。
目前帮助该项目最好的方式是发送 PR。

## 超出范围

- 公共互联网暴露
- 以文档建议不要使用的方式使用 OpenClaw
- 提示注入攻击

## 操作指南

有关威胁模型 + 加固指南 (包括 `openclaw security audit --deep` 和 `--fix`)，请参阅:

- `https://docs.openclaw.ai/gateway/security`

### Web 界面安全

OpenClaw 的 Web 界面仅供本地使用。**不要** 将其绑定到公共互联网；它没有针对公共暴露进行加固。

## 运行时要求

### Node.js 版本

OpenClaw 需要 **Node.js 22.12.0 或更高版本** (LTS)。此版本包含重要的安全补丁:

- CVE-2025-59466: async_hooks DoS 漏洞
- CVE-2026-21636: 权限模型绕过漏洞

验证你的 Node.js 版本:

```bash
node --version  # 应该是 v22.12.0 或更高版本
```

### Docker 安全

在 Docker 中运行 OpenClaw 时:

1. 官方镜像以非 root 用户 (`node`) 运行，以减少攻击面
2. 尽可能使用 `--read-only` 标志以获得额外的文件系统保护
3. 使用 `--cap-drop=ALL` 限制容器能力

安全 Docker 运行示例:

```bash
docker run --read-only --cap-drop=ALL \
  -v openclaw-data:/app/data \
  openclaw/openclaw:latest
```

## 安全扫描

该项目使用 `detect-secrets` 在 CI/CD 中进行自动秘密检测。
有关配置，请参阅 `.detect-secrets.cfg`，基线请参阅 `.secrets.baseline`。

本地运行:

```bash
pip install detect-secrets==1.5.0
detect-secrets scan --baseline .secrets.baseline
```
