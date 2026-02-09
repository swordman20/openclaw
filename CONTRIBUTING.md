# 为 OpenClaw 做贡献

欢迎来到龙虾缸！🦞

## 快速链接

- **GitHub:** https://github.com/openclaw/openclaw
- **Discord:** https://discord.gg/qkhbAGHRBT
- **X/Twitter:** [@steipete](https://x.com/steipete) / [@openclaw](https://x.com/openclaw)

## 维护者

- **Peter Steinberger** - 仁慈的独裁者
  - GitHub: [@steipete](https://github.com/steipete) · X: [@steipete](https://x.com/steipete)

- **Shadow** - Discord + Slack 子系统
  - GitHub: [@thewilloftheshadow](https://github.com/thewilloftheshadow) · X: [@4shad0wed](https://x.com/4shad0wed)

- **Jos** - Telegram, API, Nix 模式
  - GitHub: [@joshp123](https://github.com/joshp123) · X: [@jjpcodes](https://x.com/jjpcodes)

- **Christoph Nakazawa** - JS 基础设施
  - GitHub: [@cpojer](https://github.com/cpojer) · X: [@cnakazawa](https://x.com/cnakazawa)

- **Gustavo Madeira Santana** - 多 Agents, CLI, web UI
  - GitHub: [@gumadeiras](https://github.com/gumadeiras) · X: [@gumadeiras](https://x.com/gumadeiras)

## 如何贡献

1. **Bug 和小修复** → 提交 PR！
2. **新功能 / 架构** → 先开始一个 [GitHub Discussion](https://github.com/openclaw/openclaw/discussions) 或在 Discord 中询问
3. **问题** → Discord #setup-help

## 提交 PR 之前

- 使用你的 OpenClaw 实例在本地测试
- 运行测试: `pnpm build && pnpm check && pnpm test`
- 保持 PR 专注 (每个 PR 做一件事)
- 描述是什么 & 为什么

## 控制 UI 装饰器

控制 UI 使用 Lit 和 **遗留** 装饰器 (当前的 Rollup 解析不支持标准装饰器所需的 `accessor` 字段)。添加响应式字段时，请保持遗留风格:

```ts
@state() foo = "bar";
@property({ type: Number }) count = 0;
```

根 `tsconfig.json` 配置为遗留装饰器 (`experimentalDecorators: true`) 并且 `useDefineForClassFields: false`. 避免更改这些设置，除非你也更新 UI 构建工具以支持标准装饰器。

## 欢迎 AI/Vibe 编码的 PR! 🤖

是用 Codex, Claude, 或其他 AI 工具构建的？**太棒了 - 只需要标记一下！**

请在你的 PR 中包含:

- [ ] 在 PR 标题或描述中标记为 AI 辅助
- [ ] 注明测试程度 (未测试 / 轻微测试 / 完全测试)
- [ ] 如果可能，包括提示或会话日志 (非常有帮助！)
- [ ] 确认你理解代码的作用

AI PR 在这里是一等公民。我们只想要透明度，以便审阅者知道要看什么。

## 当前重点与路线图 🗺

我们目前优先考虑:

- **稳定性**: 修复通道连接中的边缘情况 (WhatsApp/Telegram)。
- **UX**: 改进新手引导向导和错误消息。
- **Skills**: 扩展捆绑技能库并改善技能创建开发人员体验。
- **性能**: 优化 token 使用和压缩逻辑。

查看 [GitHub Issues](https://github.com/openclaw/openclaw/issues) 寻找 "good first issue" 标签！
