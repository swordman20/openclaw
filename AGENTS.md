# 仓库指南

- 仓库: https://github.com/openclaw/openclaw
- GitHub issues/评论/PR 评论: 使用字面多行字符串或 `-F - <<'EOF'` (或 $'...') 来换行；永远不要嵌入 "\\n"。

## 项目结构与模块组织

- 源代码: `src/` (CLI 连接在 `src/cli`, 命令在 `src/commands`, web 提供程序在 `src/provider-web.ts`, 基础设施在 `src/infra`, 媒体管道在 `src/media`)。
- 测试: 放置在同级目录的 `*.test.ts`.
- 文档: `docs/` (图片, 队列, Pi 配置). 构建输出位于 `dist/`.
- 插件/扩展: 位于 `extensions/*` 下 (工作区包). 仅在扩展的 `package.json` 中保留插件专用的依赖项；除非核心使用它们，否则不要将它们添加到根 `package.json` 中。
- 插件: 安装会在插件目录中运行 `npm install --omit=dev`; 运行时依赖项必须位于 `dependencies` 中。避免在 `dependencies` 中使用 `workspace:*` (npm install 会中断)；可以将 `openclaw` 放在 `devDependencies` 或 `peerDependencies` 中 (运行时通过 jiti 别名解析 `openclaw/plugin-sdk`)。
- 从 `https://openclaw.ai/*` 提供的安装程序: 位于兄弟仓库 `../openclaw.ai` (`public/install.sh`, `public/install-cli.sh`, `public/install.ps1`).
- 消息通道: 在重构共享逻辑 (路由, 允许列表, 配对, 命令限制, 入职, 文档) 时，始终考虑 **所有** 内置 + 扩展通道。
  - 核心通道文档: `docs/channels/`
  - 核心通道代码: `src/telegram`, `src/discord`, `src/slack`, `src/signal`, `src/imessage`, `src/web` (WhatsApp web), `src/channels`, `src/routing`
  - 扩展 (通道插件): `extensions/*` (例如 `extensions/msteams`, `extensions/matrix`, `extensions/zalo`, `extensions/zalouser`, `extensions/voice-call`)
- 当添加通道/扩展/应用/文档时，请查看 `.github/labeler.yml`以了解标签覆盖范围。

## 文档链接 (Mintlify)

- 文档托管在 Mintlify (docs.openclaw.ai).
- `docs/**/*.md` 中的内部文档链接: 根相对路径, 无 `.md`/`.mdx` (例如: `[Config](/configuration)`).
- 章节交叉引用: 在根相对路径上使用锚点 (例如: `[Hooks](/configuration#hooks)`).
- 文档标题和锚点: 避免在标题中使用破折号和撇号，因为它们会破坏 Mintlify 锚点链接。
- 当 Peter 索要链接时，请回复完整的 `https://docs.openclaw.ai/...` URL (而非根相对路径)。
- 当你修改文档时，请在回复结尾附上你引用的 `https://docs.openclaw.ai/...` URL。
- README (GitHub): 保持绝对文档 URL (`https://docs.openclaw.ai/...`) 以便链接在 GitHub 上有效。
- 文档内容必须通用: 没有个人设备名称/主机名/路径；使用占位符，如 `user@gateway-host` 和 “gateway host”。

## 文档国际化 (zh-CN)

- `docs/zh-CN/**` 是生成的；除非用户明确要求，否则不要编辑。
- 管道: 更新英文文档 → 调整术语表 (`docs/.i18n/glossary.zh-CN.json`) → 运行 `scripts/docs-i18n` → 仅在被指示时应用针对性修复。
- 翻译记忆: `docs/.i18n/zh-CN.tm.jsonl` (生成的)。
- 参见 `docs/.i18n/README.md`.
- 管道可能缓慢/效率低下；如果它拖延了，请在 Discord 上 ping @jospalmbier，而不是试图绕过它。

## exe.dev 虚拟机操作 (通用)

- 访问: 稳定路径是 `ssh exe.dev` 然后 `ssh vm-name` (假设 SSH 密钥已设置)。
- SSH 不稳定: 使用 exe.dev web 终端或 Shelley (web agent); 为长时间操作保持 tmux 会话。
- 更新: `sudo npm i -g openclaw@latest` (全局安装需要 root 权限在 `/usr/lib/node_modules`).
- 配置: 使用 `openclaw config set ...`; 确保 `gateway.mode=local` 已设置。
- Discord: 仅存储原始 token (无 `DISCORD_BOT_TOKEN=` 前缀)。
- 重启: 停止旧网关并运行:
  `pkill -9 -f openclaw-gateway || true; nohup openclaw gateway run --bind loopback --port 18789 --force > /tmp/openclaw-gateway.log 2>&1 &`
- 验证: `openclaw channels status --probe`, `ss -ltnp | rg 18789`, `tail -n 120 /tmp/openclaw-gateway.log`.

## 构建、测试和开发命令

- 运行时基线: Node **22+** (保持 Node + Bun 路径工作)。
- 安装依赖: `pnpm install`
- Pre-commit 钩子: `prek install` (运行与 CI 相同的检查)
- 也支持: `bun install` (在接触依赖/补丁时保持 `pnpm-lock.yaml` + Bun patching 同步)。
- TypeScript 执行首选 Bun (脚本, 开发, 测试): `bun <file.ts>` / `bunx <tool>`.
- 在开发中运行 CLI: `pnpm openclaw ...` (bun) 或 `pnpm dev`.
- Node 仍然支持运行构建输出 (`dist/*`) 和生产安装。
- Mac 打包 (开发): `scripts/package-mac-app.sh` 默认为当前架构。发布清单: `docs/platforms/mac/release.md`.
- 类型检查/构建: `pnpm build`
- TypeScript 检查: `pnpm tsgo`
- Lint/格式化: `pnpm check`
- 测试: `pnpm test` (vitest); 覆盖率: `pnpm test:coverage`

## 代码风格与命名规范

- 语言: TypeScript (ESM). 首选严格类型；避免 `any`。
- 格式化/Linting 通过 Oxlint 和 Oxfmt; 提交前运行 `pnpm check`。
- 为棘手或不明显的逻辑添加简短的代码注释。
- 保持文件简洁；提取助手而不是 “V2” 副本。使用现有模式进行 CLI 选项和通过 `createDefaultDeps` 进行依赖注入。
- 目标是将文件保持在 ~700 LOC 以下；仅作为指南 (不是硬性护栏)。在提高清晰度或可测试性时进行拆分/重构。
- 命名: 产品/应用/文档标题使用 **OpenClaw**；CLI 命令、包/二进制文件、路径和配置键使用 `openclaw`。

## 发布渠道 (命名)

- stable: 仅标记发布 (例如 `vYYYY.M.D`), npm dist-tag `latest`.
- beta: 预发布标记 `vYYYY.M.D-beta.N`, npm dist-tag `beta` (可能不包含 macOS 应用)。
- dev: `main` 上的移动头 (无标记; git checkout main).

## 测试指南

- 框架: Vitest 带有 V8 覆盖率阈值 (70% lines/branches/functions/statements).
- 命名: 与源名称匹配 `*.test.ts`; e2e 在 `*.e2e.test.ts`.
- 在接触逻辑后推送前运行 `pnpm test` (或 `pnpm test:coverage`)。
- 不要将测试工作线程设置为 16 以上；已经试过了。
- 实时测试 (真实密钥): `CLAWDBOT_LIVE_TEST=1 pnpm test:live` (仅 OpenClaw) 或 `LIVE=1 pnpm test:live` (包括提供商实时测试)。Docker: `pnpm test:docker:live-models`, `pnpm test:docker:live-gateway`. Onboarding Docker E2E: `pnpm test:docker:onboard`.
- 全套工具 + 涵盖内容: `docs/testing.md`.
- 纯测试添加/修复通常 **不** 需要变更日志条目，除非它们改变了面向用户的行为或用户要求。
- 移动端: 在使用模拟器之前，检查连接的真实设备 (iOS + Android)，并在可用时优先使用它们。

## Commit & Pull Request 指南

- 使用 `scripts/committer "<msg>" <file...>` 创建提交；避免手动 `git add`/`git commit` 以保持暂存区范围。
- 遵循简洁、面向行动的提交消息 (例如, `CLI: add verbose flag to send`).
- 组合相关更改；避免捆绑不相关的重构。
- 变更日志工作流: 将最新发布的版本保持在顶部 (无 `Unreleased`); 发布后，提升版本并开始一个新的顶部部分。
- PR 应总结范围，注明执行的测试，并提及任何面向用户的更改或新标志。
- 提交 PR 时阅读此文: `docs/help/submitting-a-pr.md` ([提交 PR](https://docs.openclaw.ai/help/submitting-a-pr))
- 提交 Issue 时阅读此文: `docs/help/submitting-an-issue.md` ([提交 Issue](https://docs.openclaw.ai/help/submitting-an-issue))
- PR 审查流程: 当给出 PR 链接时，通过 `gh pr view`/`gh pr diff` 审查，**不要** 切换分支。
- PR 审查调用: 首选单个 `gh pr view --json ...` 来批处理元数据/评论；仅在需要时运行 `gh pr diff`。
- 在粘贴 GH Issue/PR 开始审查之前: 运行 `git pull`; 如果有本地更改或未推送的提交，请停止并在审查之前提醒用户。
- 目标: 合并 PR。当提交整洁时首选 **rebase**；当历史混乱时 **squash**。
- PR 合并流程: 从 `main` 创建一个临时分支，将 PR 分支合并到其中 (除非提交历史很重要，否则首选 squash；如果重要则使用 rebase/merge)。始终尝试合并 PR，除非确实困难，否则使用其他方法。如果我们 squash，请将 PR 作者添加为共同贡献者。应用修复，添加变更日志条目 (包括 PR # + 感谢)，在最后提交前运行全门控，提交，合并回 `main`，删除临时分支，并在 `main` 上结束。
- 如果你审查了一个 PR 并随后对其进行了处理，请通过 merge/squash 落地 (无直接 main 提交)，并始终将 PR 作者添加为共同贡献者。
- 处理 PR 时: 添加带有 PR 编号的变更日志条目并感谢贡献者。
- 处理 issue 时: 在变更日志条目中引用该 issue。
- 合并 PR 时: 留下 PR 评论，确切解释我们做了什么并包含 SHA哈希。
- 合并新贡献者的 PR 时: 将他们的头像添加到 README “感谢所有 clawtributors” 缩略图列表中。
- 合并 PR 后: 如果贡献者确实，运行 `bun scripts/update-clawtributors.ts`，然后提交重新生成的 README。

## 简写命令

- `sync`: 如果工作树是脏的，提交所有更改 (选择合理的常规提交消息)，然后 `git pull --rebase`; 如果 rebase 冲突且无法解决，停止；否则 `git push`.

### PR 工作流 (审查 vs 落地)

- **审查模式 (仅 PR 链接):** 阅读 `gh pr view/diff`; **不要** 切换分支；**不要** 更改代码。
- **落地模式:** 从 `main` 创建集成分支，引入 PR 提交 (**首选 rebase** 以获得线性历史；当复杂性/冲突使其更安全时 **允许 merge**)，应用修复，添加变更日志 (+ 感谢 + PR #)，**在提交前在本地** 运行全门控 (`pnpm build && pnpm check && pnpm test`)，提交，合并回 `main`，然后 `git switch main` (落地后永远不要停留在主题分支上)。重要：贡献者在此之后需要在 git 图中！

## 安全与配置提示

- Web 提供程序将凭据存储在 `~/.openclaw/credentials/`; 如果注销，请重新运行 `openclaw login`。
- Pi 会话默认位于 `~/.openclaw/sessions/` 下；基本目录不可配置。
- 环境变量: 参见 `~/.profile`.
- 永远不要提交或发布真实的电话号码、视频或实时配置值。在文档、测试和示例中使用明显虚假的占位符。
- 发布流程: 在进行任何发布工作之前，请务必阅读 `docs/reference/RELEASING.md` 和 `docs/platforms/mac/release.md`; 一旦这些文档回答了问题，就不要再问常规问题了。

## 故障排除

- 品牌重塑/迁移问题或旧配置/服务警告: 运行 `openclaw doctor` (参见 `docs/gateway/doctor.md`).

## Agent 专用说明

- 词汇: "makeup" = "mac app".
- 永远不要编辑 `node_modules` (全局/Homebrew/npm/git 安装也是如此)。更新会覆盖。Skill 说明在 `tools.md` 或 `AGENTS.md` 中。
- Signal: "update fly" => `fly ssh console -a flawd-bot -C "bash -lc 'cd /data/clawd/openclaw && git pull --rebase origin main'"` 然后 `fly machines restart e825232f34d058 -a flawd-bot`.
- 处理 GitHub Issue 或 PR 时，在任务结束时打印完整 URL。
- 回答问题时，仅回复高置信度的答案: 在代码中验证；不要猜测。
- 永远不要更新 Carbon 依赖项。
- 任何带有 `pnpm.patchedDependencies` 的依赖项必须使用确切版本 (无 `^`/`~`)。
- 修补依赖项 (pnpm patches, overrides, 或 vendored changes) 需要明确批准；默认情况下不要这样做。
- CLI 进度: 使用 `src/cli/progress.ts` (`osc-progress` + `@clack/prompts` spinner); 不要手写 spinners/bars。
- 状态输出: 保持表格 + ANSI 安全换行 (`src/terminal/table.ts`); `status --all` = 只读/可粘贴, `status --deep` = probes。
- Gateway 目前仅作为菜单栏应用运行；没有安装单独的 LaunchAgent/helper 标签。通过 OpenClaw Mac 应用或 `scripts/restart-mac.sh` 重启；要验证/kill，请使用 `launchctl print gui/$UID | grep openclaw` 而不是假设固定标签。**在 macOS 上调试时，通过应用启动/停止网关，而不是临时 tmux 会话；在移交前 kill 任何临时隧道。**
- macOS 日志: 使用 `./scripts/clawlog.sh` 查询 OpenClaw 子系统的统一日志；它支持 follow/tail/category 过滤器，并期望 `/usr/bin/log` 无密码 sudo。
- 如果本地有共享护栏，请查看它们；否则遵循此仓库的指南。
- SwiftUI 状态管理 (iOS/macOS): 优先使用 `Observation` 框架 (`@Observable`, `@Bindable`) 而不是 `ObservableObject`/`@StateObject`; 除非兼容性需要，否则不要引入新的 `ObservableObject`，并在接触相关代码时迁移现有用法。
- 连接提供程序: 添加新连接时，更新每个 UI 表面和文档 (macOS 应用, web UI, mobile (如果适用), onboarding/overview 文档) 并添加匹配的状态 + 配置表单，以便提供程序列表和设置保持同步。
- 版本位置: `package.json` (CLI), `apps/android/app/build.gradle.kts` (versionName/versionCode), `apps/ios/Sources/Info.plist` + `apps/ios/Tests/Info.plist` (CFBundleShortVersionString/CFBundleVersion), `apps/macos/Sources/OpenClaw/Resources/Info.plist` (CFBundleShortVersionString/CFBundleVersion), `docs/install/updating.md` (pinned npm version), `docs/platforms/mac/release.md` (APP_VERSION/APP_BUILD examples), Peekaboo Xcode projects/Info.plists (MARKETING_VERSION/CURRENT_PROJECT_VERSION).
- **重启应用:** “restart iOS/Android apps” 意味着重建 (recompile/install) 并重新启动，不仅仅是 kill/launch。
- **设备检查:** 在测试前，验证连接的真实设备 (iOS/Android)，然后再使用 simulators/emulators。
- iOS Team ID 查找: `security find-identity -p codesigning -v` → 使用 Apple Development (…) TEAMID。回退: `defaults read com.apple.dt.Xcode IDEProvisioningTeamIdentifiers`.
- A2UI bundle hash: `src/canvas-host/a2ui/.bundle.hash` 是自动生成的；忽略意外更改，仅在需要时通过 `pnpm canvas:a2ui:bundle` (或 `scripts/bundle-a2ui.sh`) 重新生成。将 hash 作为单独的提交提交。
- 发布签名/公证密钥在仓库外管理；遵循内部发布文档。
- 公证认证环境变量 (`APP_STORE_CONNECT_ISSUER_ID`, `APP_STORE_CONNECT_KEY_ID`, `APP_STORE_CONNECT_API_KEY_P8`) 预期在你的环境中 (根据内部发布文档)。
- **多 Agent 安全:** **不要** 创建/应用/删除 `git stash` 条目，除非明确要求 (包括 `git pull --rebase --autostash`)。假设其他 agent 可能正在工作；保持不相关的 WIP 不受影响，避免跨领域状态更改。
- **多 Agent 安全:** 当用户说 "push" 时，你可以 `git pull --rebase` 以整合最新更改 (永远不要丢弃其他 agent 的工作)。当用户说 "commit" 时，仅限于你的更改。当用户说 "commit all" 时，以分组块提交所有内容。
- **多 Agent 安全:** **不要** 创建/删除/修改 `git worktree` checkouts (或编辑 `.worktrees/*`) 除非明确要求。
- **多 Agent 安全:** **不要** 切换分支 / checkout 不同分支，除非明确要求。
- **多 Agent 安全:** 运行多个 agent 是 OK 的，只要每个 agent 都有自己的会话。
- **多 Agent 安全:** 当你看到无法识别的文件时，继续；专注于你的更改并仅提交这些更改。
- Lint/格式化搅动:
  - 如果 staged+unstaged diffs 仅为格式化，自动解决无需询问。
  - 如果 commit/push 已请求，自动 stage 并在同一提交中包含仅格式化的后续操作 (或如果需要，使用微小的后续提交)，无需额外确认。
  - 仅当更改具有语义 (逻辑/数据/行为) 时询问。
- Lobster seam: 使用 `src/terminal/palette.ts` 中的共享 CLI 调色板 (无硬编码颜色); 根据需要将调色板应用于 onboarding/config 提示和其他 TTY UI 输出。
- **多 Agent 安全:** 将报告重点放在你的编辑上；除非真正被阻止，否则避免 guard-rail 免责声明；当多个 agent 接触同一文件时，如果安全则继续；仅在相关时以简短的 “存在其他文件” 说明结尾。
- Bug 调查: 阅读相关 npm 依赖项的源代码和所有相关的本地代码，然后再下结论；力求高置信度的根本原因。
- 代码风格: 为棘手逻辑添加简短注释；在可行时保持文件低于 ~500 LOC (根据需要拆分/重构)。
- 工具 schema 护栏 (google-antigravity): 避免在工具输入 schema 中使用 `Type.Union`; 无 `anyOf`/`oneOf`/`allOf`. 使用 `stringEnum`/`optionalStringEnum` (Type.Unsafe enum) 用于字符串列表，使用 `Type.Optional(...)` 代替 `... | null`. 保持顶级工具 schema 为带有 `properties` 的 `type: "object"`。
- 工具 schema 护栏: 避免在工具 schema 中使用原始 `format` 属性名称；某些验证器将 `format` 视为保留关键字并拒绝 schema。
- 当被要求打开 “session” 文件时，打开位于 `~/.openclaw/agents/<agentId>/sessions/*.jsonl` 下的 Pi 会话日志 (使用系统提示的 Runtime 行中的 `agent=<id>` 值；除非给出特定 ID，否则为最新)，而不是默认的 `sessions.json`。如果需要另一台机器的日志，通过 Tailscale SSH 并读取那里的相同路径。
- 不要通过 SSH 重建 macOS 应用；重建必须直接在 Mac 上运行。
- 永远不要向外部消息传递界面 (WhatsApp, Telegram) 发送流式/部分回复；只有最终回复应该发送到那里。流式/工具事件仍然可以发送到内部 UI/控制通道。
- 语音唤醒转发提示:
  - 命令模板应保持 `openclaw-mac agent --message "${text}" --thinking low`; `VoiceWakeForwarder` 已经 shell-escapes `${text}`. 不要添加额外的引号。
  - launchd PATH 是最小的；确保应用的 launch agent PATH 包含标准系统路径加上你的 pnpm bin (通常是 `$HOME/Library/pnpm`)，以便通过 `openclaw-mac` 调用时 `pnpm`/`openclaw` 二进制文件可以解析。
- 对于包含 `!` 的手动 `openclaw message send` 消息，使用下面注明的 heredoc 模式以避免 Bash 工具的转义。
- 发布护栏: 没有操作员的明确同意，不要更改版本号；在运行任何 npm publish/release 步骤之前，始终先请求许可。

## NPM + 1Password (发布/验证)

- 使用 1password skill; 所有 `op` 命令必须在新的 tmux 会话中运行。
- 登录: `eval "$(op signin --account my.1password.com)"` (应用解锁 + 集成开启)。
- OTP: `op read 'op://Private/Npmjs/one-time password?attribute=otp'`.
- 发布: `npm publish --access public --otp="<otp>"` (从包目录运行)。
- 验证无本地 npmrc 副作用: `npm view <pkg> version --userconfig "$(mktemp)"`.
- 发布后 kill tmux 会话。
