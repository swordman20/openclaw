import type { Language } from "./storage.ts";

const translations = {
  // Navigation & Shell
  expandSidebar: { zh: "展开侧边栏", en: "Expand sidebar" },
  collapseSidebar: { zh: "收起侧边栏", en: "Collapse sidebar" },
  gatewayDashboard: { zh: "网关仪表板", en: "Gateway Dashboard" },
  health: { zh: "健康状态", en: "Health" },
  ok: { zh: "正常", en: "OK" },
  offline: { zh: "离线", en: "Offline" },
  theme: { zh: "主题", en: "Theme" },
  systemTheme: { zh: "系统主题", en: "System theme" },
  lightTheme: { zh: "作为浅色主题", en: "Light theme" },
  darkTheme: { zh: "作为深色主题", en: "Dark theme" },
  light: { zh: "浅色", en: "Light" },
  dark: { zh: "深色", en: "Dark" },
  system: { zh: "系统", en: "System" },
  resources: { zh: "资源", en: "Resources" },
  docs: { zh: "文档", en: "Docs" },
  
  // Tab Groups
  groupOverview: { zh: "概览", en: "Overview" },
  groupAgent: { zh: "Agent", en: "Agent" },
  groupObserve: { zh: "观察", en: "Observe" },
  groupSystem: { zh: "系统", en: "System" },

  // Tabs
  tabOverview: { zh: "概览", en: "Overview" },
  tabChat: { zh: "聊天", en: "Chat" },
  tabAgents: { zh: "Agents", en: "Agents" },
  tabSessions: { zh: "会话", en: "Sessions" },
  tabUsage: { zh: "用量", en: "Usage" },
  tabChannels: { zh: "渠道", en: "Channels" },
  tabCron: { zh: "定时任务", en: "Cron" },
  tabInstances: { zh: "实例", en: "Instances" },
  
  // Tab Titles/Subtitles
  titleOverview: { zh: "概览", en: "Overview" },
  subOverview: { zh: "系统状态", en: "System Status" },
  titleChat: { zh: "聊天", en: "Chat" },
  subChat: { zh: "与 Agents 对话", en: "Talk to Agents" },
  titleAgents: { zh: "Agents", en: "Agents" },
  subAgents: { zh: "配置 & 文件", en: "Configuration & Files" },
  titleSessions: { zh: "会话", en: "Sessions" },
  subSessions: { zh: "历史记录 & 状态", en: "History & Status" },
  titleUsage: { zh: "用量", en: "Usage" },
  subUsage: { zh: "令牌 & 成本", en: "Tokens & Costs" },
  titleChannels: { zh: "渠道", en: "Channels" },
  subChannels: { zh: "消息集成", en: "Messaging Integrations" },
  titleCron: { zh: "定时任务", en: "Cron Jobs" },
  subCron: { zh: "调度任务", en: "Scheduled Tasks" },
  titleInstances: { zh: "实例", en: "Instances" },
  subInstances: { zh: "在线节点", en: "Online Nodes" },

  // Chat Controls
  refreshChat: { zh: "刷新聊天数据", en: "Refresh chat data" },
  toggleThinking: { zh: "切换思考过程显示", en: "Toggle assistant thinking/working output" },
  toggleFocus: { zh: "切换专注模式 (隐藏侧边栏 + 顶栏)", en: "Toggle focus mode (hide sidebar + page header)" },
  disabledOnboarding: { zh: "向导模式下禁用", en: "Disabled during onboarding" },
  
  // Language
  language: { zh: "语言", en: "Language" },
  langZh: { zh: "中文", en: "Chinese" },
  langEn: { zh: "英文", en: "English" },

  // Agents View - General
  panelOverview: { zh: "概览", en: "Overview" },
  panelFiles: { zh: "文件", en: "Files" },
  panelTools: { zh: "工具", en: "Tools" },
  panelSkills: { zh: "技能", en: "Skills" },
  panelChannels: { zh: "渠道", en: "Channels" },
  panelCron: { zh: "定时任务", en: "Cron Jobs" },
  agentsTitle: { zh: "Agents", en: "Agents" },
  configuredCount: { zh: "个已配置", en: "configured" },
  loading: { zh: "加载中…", en: "Loading…" },
  refresh: { zh: "刷新", en: "Refresh" },
  refreshing: { zh: "刷新中…", en: "Refreshing…" },
  noAgentsFound: { zh: "未找到 Agents", en: "No agents found." },
  selectAgentTitle: { zh: "选择一个 Agent", en: "Select an agent" },
  selectAgentSub: { zh: "查看其工作区和工具配置。", en: "Pick an agent to inspect its workspace and tools." },
  agentSubtitleDefault: { zh: "Agent 工作区和路由。", en: "Agent workspace and routing." },
  
  // Agents View - Overview
  overviewTitle: { zh: "概览", en: "Overview" },
  overviewSub: { zh: "工作区路径和身份元数据。", en: "Workspace paths and identity metadata." },
  labelWorkspace: { zh: "工作区", en: "Workspace" },
  labelPrimaryModel: { zh: "主模型", en: "Primary Model" },
  labelIdentityName: { zh: "身份名称", en: "Identity Name" },
  labelDefault: { zh: "默认", en: "Default" },
  labelIdentityEmoji: { zh: "身份表情", en: "Identity Emoji" },
  labelSkillsFilter: { zh: "技能过滤", en: "Skills Filter" },
  labelModelSelection: { zh: "模型选择", en: "Model Selection" },
  labelPrimaryModelSelect: { zh: "主模型", en: "Primary model" },
  suffixDefault: { zh: " (默认)", en: " (default)" },
  optInheritDefault: { zh: "继承默认", en: "Inherit default" },
  labelFallbacks: { zh: "后备模型 (逗号分隔)", en: "Fallbacks (comma-separated)" },
  btnReloadConfig: { zh: "重载配置", en: "Reload Config" },
  btnSave: { zh: "保存", en: "Save" },
  btnSaving: { zh: "保存中…", en: "Saving…" },
  yes: { zh: "是", en: "yes" },
  no: { zh: "否", en: "no" },
  skillsSelected: { zh: "个已选", en: "selected" },
  allSkills: { zh: "所有技能", en: "all skills" },
  
  // Agents View - Context
  contextTitle: { zh: "Agent 上下文", en: "Agent Context" },

  // Agents View - Channels
  contextSubChannels: { zh: "工作区、身份和模型配置。", en: "Workspace, identity, and model configuration." },
  channelsTitle: { zh: "渠道", en: "Channels" },
  channelsSub: { zh: "网关全局渠道状态快照。", en: "Gateway-wide channel status snapshot." },
  lastRefresh: { zh: "上次刷新：", en: "Last refresh: " },
  never: { zh: "从未", en: "never" },
  msgLoadChannels: { zh: "加载渠道以查看实时状态。", en: "Load channels to see live status." },
  msgNoChannels: { zh: "未找到渠道。", en: "No channels found." },
  statusConnected: { zh: "已连接", en: "connected" },
  statusNoAccounts: { zh: "无账户", en: "no accounts" },
  statusConfigured: { zh: "已配置", en: "configured" },
  statusNotConfigured: { zh: "未配置", en: "not configured" },
  statusEnabled: { zh: "已启用", en: "enabled" },
  statusDisabled: { zh: "已禁用", en: "disabled" },

  // Agents View - Cron
  contextSubCron: { zh: "工作区和调度目标。", en: "Workspace and scheduling targets." },
  schedulerTitle: { zh: "调度器", en: "Scheduler" },
  schedulerSub: { zh: "网关定时任务状态。", en: "Gateway cron status." },
  statEnabled: { zh: "启用", en: "Enabled" },
  statJobs: { zh: "任务", en: "Jobs" },
  statNextWake: { zh: "下次唤醒", en: "Next wake" },
  agentCronTitle: { zh: "Agent 定时任务", en: "Agent Cron Jobs" },
  agentCronSub: { zh: "针对此 Agent 的计划任务。", en: "Scheduled jobs targeting this agent." },
  msgNoJobs: { zh: "无任务。", en: "No jobs assigned." },

  // Agents View - Files
  filesTitle: { zh: "核心文件", en: "Core Files" },
  filesSub: { zh: "引导角色、身份和工具指南。", en: "Bootstrap persona, identity, and tool guidance." },
  msgLoadFiles: { zh: "加载 Agent 工作区文件以编辑核心指令。", en: "Load the agent workspace files to edit core instructions." },
  msgNoFiles: { zh: "未找到文件。", en: "No files found." },
  msgSelectFile: { zh: "选择一个文件进行编辑。", en: "Select a file to edit." },
  btnReset: { zh: "重置", en: "Reset" },
  msgMissingFile: { zh: "文件丢失。保存将在 Agent 工作区中创建它。", en: "This file is missing. Saving will create it in the agent workspace." },
  labelContent: { zh: "内容", en: "Content" },
  statusMissing: { zh: "缺失", en: "Missing" },

  // Agents View - Tools
  toolsTitle: { zh: "工具访问", en: "Tool Access" },
  toolsSub: { zh: "此 Agent 的配置文件 + 逐工具覆盖。", en: "Profile + per-tool overrides for this agent." },
  btnEnableAll: { zh: "全部启用", en: "Enable All" },
  btnDisableAll: { zh: "全部禁用", en: "Disable All" },
  msgLoadConfig: { zh: "加载网关配置以调整工具配置文件。", en: "Load the gateway config to adjust tool profiles." },
  msgExplicitAllow: { zh: "此 Agent 在配置中使用了显式允许列表。工具覆盖在配置选项卡中管理。", en: "This agent is using an explicit allowlist in config. Tool overrides are managed in the Config tab." },
  msgGlobalAllow: { zh: "已设置全局 tools.allow。Agent 覆盖无法启用全局阻止的工具。", en: "Global tools.allow is set. Agent overrides cannot enable tools that are globally blocked." },
  labelProfile: { zh: "配置文件", en: "Profile" },
  labelSource: { zh: "来源", en: "Source" },
  labelStatus: { zh: "状态", en: "Status" },
  statusUnsaved: { zh: "未保存", en: "unsaved" },
  presetsTitle: { zh: "快速预设", en: "Quick Presets" },
  btnInherit: { zh: "继承", en: "Inherit" },

  // Agents View - Skills
  skillsTitle: { zh: "技能", en: "Skills" },
  skillsSub: { zh: "单 Agent 技能允许列表和工作区技能。", en: "Per-agent skill allowlist and workspace skills." },
  btnUseAll: { zh: "使用全部", en: "Use All" },
  msgSkillAllowlist: { zh: "此 Agent 使用自定义技能允许列表。", en: "This agent uses a custom skill allowlist." },
  msgSkillAllEnabled: { zh: "所有技能已启用。禁用任何技能将创建单 Agent 允许列表。", en: "All skills are enabled. Disabling any skill will create a per-agent allowlist." },
  msgLoadSkills: { zh: "加载此 Agent 的技能以查看工作区特定条目。", en: "Load skills for this agent to view workspace-specific entries." },
  labelFilter: { zh: "过滤", en: "Filter" },
  placeholderSearchSkills: { zh: "搜索技能", en: "Search skills" },
  suffixShown: { zh: "个已显示", en: "shown" },
  msgNoSkills: { zh: "未找到技能。", en: "No skills found." },
  groupWorkspaceSkills: { zh: "工作区技能", en: "Workspace Skills" },
  groupBuiltInSkills: { zh: "内置技能", en: "Built-in Skills" },
  groupInstalledSkills: { zh: "已安装技能", en: "Installed Skills" },
  groupExtraSkills: { zh: "额外技能", en: "Extra Skills" },
  groupOtherSkills: { zh: "其他技能", en: "Other Skills" },
  
  // Skill statuses
  skillBlocked: { zh: "已阻止", en: "blocked" },
  skillEligible: { zh: "可用", en: "eligible" },
  skillDisabled: { zh: "已禁用", en: "disabled" },
  skillReasonBlocked: { zh: "被允许列表阻止", en: "blocked by allowlist" },
  skillMissing: { zh: "缺失：", en: "Missing: " },
  skillReason: { zh: "原因：", en: "Reason: " },

  // Overview View
  gatewayAccess: { zh: "网关访问", en: "Gateway Access" },
  gatewayAccessSub: { zh: "仪表板连接位置及认证方式。", en: "Where the dashboard connects and how it authenticates." },
  labelWsUrl: { zh: "WebSocket URL", en: "WebSocket URL" },
  labelToken: { zh: "网关令牌", en: "Gateway Token" },
  labelPassword: { zh: "密码 (不存储)", en: "Password (not stored)" },
  labelSessionKey: { zh: "默认会话密钥", en: "Default Session Key" },
  btnConnect: { zh: "连接", en: "Connect" },
  msgConnectHint: { zh: "点击连接以应用更改。", en: "Click Connect to apply connection changes." },
  
  snapshotTitle: { zh: "快照", en: "Snapshot" },
  snapshotSub: { zh: "最新网关握手信息。", en: "Latest gateway handshake information." },
  statStatus: { zh: "状态", en: "Status" },
  statConnected: { zh: "已连接", en: "Connected" },
  statDisconnected: { zh: "未连接", en: "Disconnected" },
  statUptime: { zh: "运行时间", en: "Uptime" },
  statTick: { zh: "Tick 间隔", en: "Tick Interval" },
  statLastRefresh: { zh: "上次渠道刷新", en: "Last Channels Refresh" },
  
  statInstances: { zh: "实例", en: "Instances" },
  statInstancesSub: { zh: "过去 5 分钟内的存在信标。", en: "Presence beacons in the last 5 minutes." },
  statSessions: { zh: "会话", en: "Sessions" },
  statSessionsSub: { zh: "网关跟踪的最近会话密钥。", en: "Recent session keys tracked by the gateway." },
  statCron: { zh: "定时任务", en: "Cron" },
  statCronEnabled: { zh: "已启用", en: "Enabled" },
  statCronDisabled: { zh: "已禁用", en: "Disabled" },
  // statNextWake removed (duplicate)
  
  notesTitle: { zh: "备注", en: "Notes" },
  notesSub: { zh: "远程控制设置的快速提醒。", en: "Quick reminders for remote control setups." },
  noteTailscaleTitle: { zh: "Tailscale serve", en: "Tailscale serve" },
  noteTailscaleSub: { zh: "建议使用 serve 模式，保持网关在 loopback 并使用 tailnet 认证。", en: "Prefer serve mode to keep the gateway on loopback with tailnet auth." },
  noteHygieneTitle: { zh: "会话卫生", en: "Session hygiene" },
  noteHygieneSub: { zh: "使用 /new 或 sessions.patch 重置上下文。", en: "Use /new or sessions.patch to reset context." },
  noteCronTitle: { zh: "Cron 提醒", en: "Cron reminders" },
  noteCronSub: { zh: "为重复运行使用隔离会话。", en: "Use isolated sessions for recurring runs." },
  
  msgAuthRequired: { zh: "此网关需要认证。添加令牌或密码，然后点击连接。", en: "This gateway requires auth. Add a token or password, then click Connect." },
  msgAuthFailed: { zh: "认证失败。在控制 UI 设置中更新令牌或密码，然后点击连接。", en: "Auth failed. Update the token or password in Control UI settings, then click Connect." },
  msgInsecureHTTP: { zh: "此页面为 HTTP，浏览器阻止设备身份。请使用 HTTPS (Tailscale Serve) 或在网关主机上打开", en: "This page is HTTP, so the browser blocks device identity. Use HTTPS (Tailscale Serve) or open" },
  msgInsecureHint: { zh: "如果必须保留在 HTTP，请设置", en: "If you must stay on HTTP, set" },
  msgChannelsHint: { zh: "使用渠道连接 WhatsApp, Telegram, Discord, Signal 或 iMessage。", en: "Use Channels to link WhatsApp, Telegram, Discord, Signal, or iMessage." },
  docControlUiAuth: { zh: "文档：控制 UI 认证", en: "Docs: Control UI auth" },
  docTailscale: { zh: "文档：Tailscale Serve", en: "Docs: Tailscale Serve" },
  docInsecure: { zh: "文档：不安全 HTTP", en: "Docs: Insecure HTTP" },

  // Chat View
  chatPlaceholder: { zh: "发送消息 (Enter 发送，Shift+Enter 换行，粘贴图片)", en: "Message (Enter to send, Shift+Enter for line breaks, paste images)" },
  chatPlaceholderConnect: { zh: "连接到网关以开始聊天…", en: "Connect to the gateway to start chatting…" },
  chatPlaceholderFiles: { zh: "添加消息或粘贴更多图片...", en: "Add a message or paste more images..." },
  chatLoading: { zh: "加载聊天中…", en: "Loading chat…" },
  chatQueued: { zh: "已排队", en: "Queued" },
  chatNewMessages: { zh: "新消息", en: "New messages" },
  btnStop: { zh: "停止", en: "Stop" },
  btnNewSession: { zh: "新会话", en: "New session" },
  btnQueue: { zh: "排队", en: "Queue" },
  btnSend: { zh: "发送", en: "Send" },
  labelMessage: { zh: "消息", en: "Message" },
  image: { zh: "图片", en: "Image" },
  compactionActive: { zh: "正在压缩上下文...", en: "Compacting context..." },
  compactionDone: { zh: "上下文已压缩", en: "Context compacted" },
  attachmentPreview: { zh: "附件预览", en: "Attachment preview" },
  removeAttachment: { zh: "移除附件", en: "Remove attachment" },
  removeQueued: { zh: "移除排队消息", en: "Remove queued message" },
  exitFocus: { zh: "退出专注模式", en: "Exit focus mode" },
  historyNotice: { zh: "显示最近 ${limit} 条消息 (隐藏了 ${hidden} 条)。", en: "Showing last ${limit} messages (${hidden} hidden)." },
  compactionDivider: { zh: "压缩", en: "Compaction" },

  // Usage View - General
  usageTitle: { zh: "用量", en: "Usage" },
  usageSubtitle: { zh: "查看令牌去向、会话峰值及成本驱动因素。", en: "See where tokens go, when sessions spike, and what drives cost." },
  
  // Usage - Filters
  videoFilters: { zh: "筛选", en: "Filters" },
  filterAgent: { zh: "Agent", en: "Agent" },
  filterChannel: { zh: "渠道", en: "Channel" },
  filterProvider: { zh: "提供商", en: "Provider" },
  filterModel: { zh: "模型", en: "Model" },
  filterTool: { zh: "工具", en: "Tool" },
  hintSelectDate: { zh: "选择日期范围并点击刷新以加载用量数据。", en: "Select a date range and click Refresh to load usage." },
  hintFilterSessions: { zh: "筛选会话 (例如 key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)", en: "Filter sessions (e.g. key:agent:main:cron* model:gpt-4o has:errors minTokens:2000)" },
  btnFilterClient: { zh: "筛选 (客户端)", en: "Filter (client-side)" },
  hintMatch: { zh: "${match} / ${total} 个会话匹配", en: "${match} of ${total} sessions match" },
  hintRange: { zh: "${total} 个会话在范围内", en: "${total} sessions in range" },
  hintFilterTip: { zh: "提示：使用筛选器或点击柱状图筛选日期。", en: "Tip: use filters or click bars to filter days." },
  
  // Usage - Metrics
  metricTokens: { zh: "令牌", en: "tokens" },
  metricCost: { zh: "成本", en: "cost" },
  metricSessions: { zh: "会话", en: "session(s)" },
  
  // Usage - Actions
  btnPin: { zh: "固定", en: "Pin" },
  btnPinned: { zh: "已固定", en: "Pinned" },
  btnExport: { zh: "导出", en: "Export" },
  btnRefresh: { zh: "刷新", en: "Refresh" },
  presetToday: { zh: "今天", en: "Today" },
  
  // Usage - Chart Toggles
  toggleTokens: { zh: "令牌", en: "Tokens" },
  toggleCost: { zh: "成本", en: "Cost" },
  toggleTotal: { zh: "总计", en: "Total" },
  toggleByType: { zh: "按类型", en: "By Type" },
  
  // Usage - Daily Chart
  dailyTitle: { zh: "每日用量", en: "Daily Usage" },
  dailyTokenTitle: { zh: "每日令牌用量", en: "Daily Token Usage" },
  dailyCostTitle: { zh: "每日成本用量", en: "Daily Cost Usage" },
  itemOutput: { zh: "输出", en: "Output" },
  itemInput: { zh: "输入", en: "Input" },
  itemCacheWrite: { zh: "缓存写入", en: "Cache write" },
  itemCacheRead: { zh: "缓存读取", en: "Cache read" },
  
  // Usage - Breakdown
  breakdownTokenTitle: { zh: "令牌 (按类型)", en: "Tokens by Type" },
  breakdownCostTitle: { zh: "成本 (按类型)", en: "Cost by Type" },
  labelTotal: { zh: "总计：", en: "Total: " },
  
  // Usage - Insights
  insightTitle: { zh: "用量概览", en: "Usage Overview" },
  insightMessages: { zh: "消息", en: "Messages" },
  insightToolCalls: { zh: "工具调用", en: "Tool Calls" },
  insightErrors: { zh: "错误", en: "Errors" },
  insightAvgTokens: { zh: "平均令牌 / 消息", en: "Avg Tokens / Msg" },
  insightAvgCost: { zh: "平均成本 / 消息", en: "Avg Cost / Msg" },
  insightSessions: { zh: "会话", en: "Sessions" },
  insightThroughput: { zh: "吞吐量", en: "Throughput" },
  insightErrorRate: { zh: "错误率", en: "Error Rate" },
  insightCacheHit: { zh: "缓存命中率", en: "Cache Hit Rate" },
  
  insightTopModels: { zh: "热门模型", en: "Top Models" },
  insightTopProviders: { zh: "热门提供商", en: "Top Providers" },
  insightTopTools: { zh: "热门工具", en: "Top Tools" },
  insightTopAgents: { zh: "热门 Agents", en: "Top Agents" },
  insightTopChannels: { zh: "热门渠道", en: "Top Channels" },
  insightPeakErrorDays: { zh: "错误峰值日期", en: "Peak Error Days" },
  insightPeakErrorHours: { zh: "错误峰值时段", en: "Peak Error Hours" },

  // Usage - Insights Hints
  hintMessages: { zh: "范围内用户 + 助手消息总数。", en: "Total user + assistant messages in range." },
  hintToolCalls: { zh: "跨会话的总工具调用计数。", en: "Total tool call count across sessions." },
  hintErrors: { zh: "范围内的消息/工具错误总数。", en: "Total message/tool errors in range." },
  hintAvgTokens: { zh: "此范围内每条消息的平均令牌数。", en: "Average tokens per message in this range." },
  hintAvgCost: { zh: "当提供商报告成本时的每条消息平均成本。", en: "Average cost per message when providers report costs." },
  hintAvgCostMissing: { zh: "当提供商报告成本时的每条消息平均成本。此范围内某些或所有会话缺少成本数据。", en: "Average cost per message when providers report costs. Cost data is missing for some or all sessions in this range." },
  hintSessions: { zh: "范围内的不同会话。", en: "Distinct sessions in the range." },
  hintThroughput: { zh: "吞吐量显示活动时间的每分钟令牌数。越高越好。", en: "Throughput shows tokens per minute over active time. Higher is better." },
  hintErrorRate: { zh: "错误率 = 错误数 / 总消息数。越低越好。", en: "Error rate = errors / total messages. Lower is better." },
  hintCacheHit: { zh: "缓存命中率 = 缓存读取 / (输入 + 缓存读取)。越高越好。", en: "Cache hit rate = cache read / (input + cache read). Higher is better." },
  
  noDataModel: { zh: "无模型数据", en: "No model data" },
  noDataProvider: { zh: "无提供商数据", en: "No provider data" },
  noDataTool: { zh: "无工具调用", en: "No tool calls" },
  noDataAgent: { zh: "无 Agent 数据", en: "No agent data" },
  noDataChannel: { zh: "无渠道数据", en: "No channel data" },
  noDataError: { zh: "无错误数据", en: "No error data" },
  
  // Usage - Sessions List
  sessionsTitle: { zh: "会话", en: "Sessions" },
  sessionsShown: { zh: "已显示", en: "shown" },
  sessionsTotal: { zh: "总计", en: "total" },
  sessionsAvg: { zh: "平均", en: "avg" },
  sortSort: { zh: "排序", en: "Sort" },
  sortRecent: { zh: "最近", en: "Recent" },
  sortMessages: { zh: "消息", en: "Messages" },
  sortErrors: { zh: "错误", en: "Errors" },
  sortCost: { zh: "成本", en: "Cost" },
  sortTokens: { zh: "令牌", en: "Tokens" },
  
  tabAll: { zh: "全部", en: "All" },
  tabRecent: { zh: "最近查看", en: "Recently viewed" },
  btnClearSelection: { zh: "清除选择", en: "Clear Selection" },
  noRecentSessions: { zh: "无最近会话", en: "No recent sessions" },
  btnCopy: { zh: "复制", en: "Copy" },

  // Session Details
  btnCloseSession: { zh: "关闭会话详情", en: "Close session details" },
  usageOverTime: { zh: "用量随时间变化", en: "Usage Over Time" },
  togglePerTurn: { zh: "每轮", en: "Per Turn" },
  toggleCumulative: { zh: "累计", en: "Cumulative" },
  msgNoTimeline: { zh: "无时间线数据", en: "No timeline data" },
  msgNoDataInRange: { zh: "范围内无数据", en: "No data in range" },
  
  // Context Panel
  msgNoContext: { zh: "无上下文数据", en: "No context data" },
  labelBaseContext: { zh: "每条消息的基础上下文", en: "Base context per message" },
  titleSystemPrompt: { zh: "系统提示细分", en: "System Prompt Breakdown" },
  btnExpandAll: { zh: "展开全部", en: "Expand all" },
  btnCollapse: { zh: "折叠", en: "Collapse" },
  labelSkills: { zh: "技能", en: "Skills" },
  labelTools: { zh: "工具", en: "Tools" },
  labelFiles: { zh: "文件", en: "Files" },
  labelMore: { zh: "+${count} 更多", en: "+${count} more" },
  
  // Session Logs
  titleConversation: { zh: "对话", en: "Conversation" },
  msgNoMessages: { zh: "无消息", en: "No messages" },
  btnCollapseAll: { zh: "折叠全部", en: "Collapse All" },
  
  roleUser: { zh: "用户", en: "User" },
  roleAssistant: { zh: "助手", en: "Assistant" },
  roleTool: { zh: "工具", en: "Tool" },
  roleToolResult: { zh: "工具结果", en: "Tool result" },
  
  labelHasTools: { zh: "包含工具", en: "Has tools" },
  placeholderSearch: { zh: "搜索对话", en: "Search conversation" },
  btnClear: { zh: "清除", en: "Clear" },
  labelYou: { zh: "你", en: "You" },
  
  // Filters Chips
  filterDays: { zh: "天数", en: "Days" },
  filterHours: { zh: "小时", en: "Hours" },
  filterSession: { zh: "会话", en: "Session" },
  btnRemoveFilter: { zh: "移除筛选", en: "Remove filter" },
  
  // Mosaic
  mosaicTitle: { zh: "按时间活动", en: "Activity by Time" },
  mosaicSub: { zh: "根据会话跨度估算 (首次/最后活动)。时区：${zone}。", en: "Estimated from session spans (first/last activity). Time zone: ${zone}." },
  mosaicNoData: { zh: "暂无时间线数据。", en: "No timeline data yet." },
  mosaicDayOfWeek: { zh: "星期", en: "Day of Week" },
  mosaicHours: { zh: "小时", en: "Hours" },
  mosaicMidnight: { zh: "午夜", en: "Midnight" },
  mosaicNoon: { zh: "中午", en: "Noon" },
  mosaicDensity: { zh: "低 → 高 令牌密度", en: "Low → High token density" },

  // Session Summary
  msgNoUsageData: { zh: "此会话无用量数据。", en: "No usage data for this session." },
  subCalls: { zh: "调用", en: "calls" },
  labelFirst: { zh: "首次", en: "First" },
  labelLast: { zh: "最后", en: "Last" },
  metricDuration: { zh: "持续时间", en: "Duration" },
  labelTotalCost: { zh: "总成本", en: "Total Cost" },
  unknown: { zh: "未知", en: "unknown" },
};

export function t(key: keyof typeof translations, lang: Language = "zh"): string {
  const entry = translations[key];
  if (!entry) {
    return key;
  }
  return entry[lang] || entry["zh"]; // Fallback to Chinese
}
