import { html, nothing } from "lit";
import type { ChannelUiMetaEntry, CronJob, CronRunLogEntry, CronStatus } from "../types.ts";
import type { CronFormState } from "../ui-types.ts";
import { formatRelativeTimestamp, formatMs } from "../format.ts";
import { pathForTab } from "../navigation.ts";
import { formatCronSchedule, formatNextRun } from "../presenter.ts";
import { t } from "../i18n.ts";
import { UiSettings } from "../storage.ts";

export type CronProps = {
  settings: UiSettings;
  basePath: string;
  loading: boolean;
  status: CronStatus | null;
  jobs: CronJob[];
  error: string | null;
  busy: boolean;
  form: CronFormState;
  channels: string[];
  channelLabels?: Record<string, string>;
  channelMeta?: ChannelUiMetaEntry[];
  runsJobId: string | null;
  runs: CronRunLogEntry[];
  onFormChange: (patch: Partial<CronFormState>) => void;
  onRefresh: () => void;
  onAdd: () => void;
  onToggle: (job: CronJob, enabled: boolean) => void;
  onRun: (job: CronJob) => void;
  onRemove: (job: CronJob) => void;
  onLoadRuns: (jobId: string) => void;
};

function buildChannelOptions(props: CronProps): string[] {
  const options = ["last", ...props.channels.filter(Boolean)];
  const current = props.form.deliveryChannel?.trim();
  if (current && !options.includes(current)) {
    options.push(current);
  }
  const seen = new Set<string>();
  return options.filter((value) => {
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

function resolveChannelLabel(props: CronProps, channel: string): string {
  if (channel === "last") {
    return "last";
  }
  const meta = props.channelMeta?.find((entry) => entry.id === channel);
  if (meta?.label) {
    return meta.label;
  }
  return props.channelLabels?.[channel] ?? channel;
}

export function renderCron(props: CronProps) {
  const lang = props.settings.language;
  const channelOptions = buildChannelOptions(props);
  const selectedJob =
    props.runsJobId == null ? undefined : props.jobs.find((job) => job.id === props.runsJobId);
  const selectedRunTitle = selectedJob?.name ?? props.runsJobId ?? t("none", lang);
  const orderedRuns = props.runs.toSorted((a, b) => b.ts - a.ts);
  return html`
    <div class="agents-layout">
      <section class="agents-sidebar">
        <div class="card">
          <div class="card-title">${t("schedulerTitle", lang)}</div>
          <div class="card-sub">${t("schedulerSub", lang)}</div>
          <div class="stat-grid" style="margin-top: 16px;">
            <div class="stat">
              <div class="stat-label">${t("statEnabled", lang)}</div>
              <div class="stat-value">
                ${props.status ? (props.status.enabled ? t("yes", lang) : t("no", lang)) : "n/a"}
              </div>
            </div>
            <div class="stat">
              <div class="stat-label">${t("statJobs", lang)}</div>
              <div class="stat-value">${props.status?.jobs ?? "n/a"}</div>
            </div>
            <div class="stat">
              <div class="stat-label">${t("statNextWake", lang)}</div>
              <div class="stat-value">${formatNextRun(props.status?.nextWakeAtMs ?? null)}</div>
            </div>
          </div>
          <div class="row" style="margin-top: 12px;">
            <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
              ${props.loading ? t("refreshing", lang) : t("refresh", lang)}
            </button>
            ${props.error ? html`<span class="muted">${props.error}</span>` : nothing}
          </div>
        </div>

        <div class="card" style="margin-top: 16px;">
          <div class="card-title">${t("btnAddJob", lang)}</div>
          <div class="card-sub">${t("contextSubCron", lang)}</div>
          <div class="form-grid" style="margin-top: 16px;">
            <label class="field">
              <span>${t("labelName", lang)}</span>
              <input
                .value=${props.form.name}
                @input=${(e: Event) =>
                  props.onFormChange({ name: (e.target as HTMLInputElement).value })}
              />
            </label>
            <label class="field">
              <span>${t("labelDescription", lang)}</span>
              <input
                .value=${props.form.description}
                @input=${(e: Event) =>
                  props.onFormChange({ description: (e.target as HTMLInputElement).value })}
              />
            </label>
            <label class="field">
              <span>${t("labelAgentId", lang)}</span>
              <input
                .value=${props.form.agentId}
                @input=${(e: Event) =>
                  props.onFormChange({ agentId: (e.target as HTMLInputElement).value })}
                placeholder="default"
              />
            </label>
            <label class="field checkbox">
              <span>${t("statEnabled", lang)}</span>
              <input
                type="checkbox"
                .checked=${props.form.enabled}
                @change=${(e: Event) =>
                  props.onFormChange({ enabled: (e.target as HTMLInputElement).checked })}
              />
            </label>
            <label class="field">
              <span>${t("labelSchedule", lang)}</span>
              <select
                .value=${props.form.scheduleKind}
                @change=${(e: Event) =>
                  props.onFormChange({
                    scheduleKind: (e.target as HTMLSelectElement)
                      .value as CronFormState["scheduleKind"],
                  })}
              >
                <option value="every">Every</option>
                <option value="at">At</option>
                <option value="cron">Cron</option>
              </select>
            </label>
          </div>
          ${renderScheduleFields(props)}
          <div class="form-grid" style="margin-top: 12px;">
            <label class="field">
              <span>${t("labelSession", lang)}</span>
              <select
                .value=${props.form.sessionTarget}
                @change=${(e: Event) =>
                  props.onFormChange({
                    sessionTarget: (e.target as HTMLSelectElement)
                      .value as CronFormState["sessionTarget"],
                  })}
              >
                <option value="main">Main</option>
                <option value="isolated">Isolated</option>
              </select>
            </label>
            <label class="field">
              <span>${t("labelWakeMode", lang)}</span>
              <select
                .value=${props.form.wakeMode}
                @change=${(e: Event) =>
                  props.onFormChange({
                    wakeMode: (e.target as HTMLSelectElement).value as CronFormState["wakeMode"],
                  })}
              >
                <option value="now">Now</option>
                <option value="next-heartbeat">Next heartbeat</option>
              </select>
            </label>
            <label class="field">
              <span>${t("labelPayload", lang)}</span>
              <select
                .value=${props.form.payloadKind}
                @change=${(e: Event) =>
                  props.onFormChange({
                    payloadKind: (e.target as HTMLSelectElement)
                      .value as CronFormState["payloadKind"],
                  })}
              >
                <option value="systemEvent">System event</option>
                <option value="agentTurn">Agent turn</option>
              </select>
            </label>
          </div>
          <label class="field" style="margin-top: 12px;">
            <span>${props.form.payloadKind === "systemEvent" ? t("labelSystemText", lang) : t("labelAgentMessage", lang)}</span>
            <textarea
              .value=${props.form.payloadText}
              @input=${(e: Event) =>
                props.onFormChange({
                  payloadText: (e.target as HTMLTextAreaElement).value,
                })}
              rows="4"
            ></textarea>
          </label>
          ${
            props.form.payloadKind === "agentTurn"
              ? html`
                  <div class="form-grid" style="margin-top: 12px;">
                    <label class="field">
                      <span>${t("labelDelivery", lang)}</span>
                      <select
                        .value=${props.form.deliveryMode}
                        @change=${(e: Event) =>
                          props.onFormChange({
                            deliveryMode: (e.target as HTMLSelectElement)
                              .value as CronFormState["deliveryMode"],
                          })}
                      >
                        <option value="announce">Announce summary (default)</option>
                        <option value="none">None (internal)</option>
                      </select>
                    </label>
                    <label class="field">
                      <span>${t("labelTimeoutSeconds", lang)}</span>
                      <input
                        .value=${props.form.timeoutSeconds}
                        @input=${(e: Event) =>
                          props.onFormChange({
                            timeoutSeconds: (e.target as HTMLInputElement).value,
                          })}
                      />
                    </label>
                    ${
                      props.form.deliveryMode === "announce"
                        ? html`
                            <label class="field">
                              <span>${t("tabChannels", lang)}</span>
                              <select
                                .value=${props.form.deliveryChannel || "last"}
                                @change=${(e: Event) =>
                                  props.onFormChange({
                                    deliveryChannel: (e.target as HTMLSelectElement).value,
                                  })}
                              >
                                ${channelOptions.map(
                                  (channel) =>
                                    html`<option value=${channel}>
                                      ${resolveChannelLabel(props, channel)}
                                    </option>`,
                                )}
                              </select>
                            </label>
                            <label class="field">
                              <span>${t("labelTo", lang)}</span>
                              <input
                                .value=${props.form.deliveryTo}
                                @input=${(e: Event) =>
                                  props.onFormChange({
                                    deliveryTo: (e.target as HTMLInputElement).value,
                                  })}
                                placeholder="+1555… or chat id"
                              />
                            </label>
                          `
                        : nothing
                    }
                  </div>
                `
              : nothing
          }
          <div class="row" style="margin-top: 14px;">
            <button class="btn primary" ?disabled=${props.busy} @click=${props.onAdd}>
              ${props.busy ? t("btnSaving", lang) : t("btnAddJob", lang)}
            </button>
          </div>
        </div>
      </section>

      <section class="agents-main">
        <div class="card">
          <div class="card-title">${t("statJobs", lang)}</div>
          <div class="card-sub">${t("schedulerSub", lang)}</div>
          ${
            props.jobs.length === 0
              ? html`
                  <div class="muted" style="margin-top: 12px">${t("msgNoJobs", lang)}</div>
                `
              : html`
                <div class="list" style="margin-top: 12px;">
                  ${props.jobs.map((job) => renderJob(job, props))}
                </div>
              `
          }
        </div>

        <div class="card">
          <div class="card-title">${t("btnRunHistory", lang)}</div>
          <div class="card-sub">${t("subSessions", lang)} (${selectedRunTitle}).</div>
          ${
            props.runsJobId == null
              ? html`
                  <div class="muted" style="margin-top: 12px">${t("msgSelectJobHistory", lang)}</div>
                `
              : orderedRuns.length === 0
                ? html`
                    <div class="muted" style="margin-top: 12px">${t("msgNoRecentRuns", lang)}</div>
                  `
                : html`
                  <div class="list" style="margin-top: 12px;">
                    ${orderedRuns.map((entry) => renderRun(entry, props.basePath))}
                  </div>
                `
          }
        </div>
      </section>
    </div>
  `;
}

function renderScheduleFields(props: CronProps) {
  const lang = props.settings.language;
  const form = props.form;
  if (form.scheduleKind === "at") {
    return html`
      <label class="field" style="margin-top: 12px;">
        <span>Run at</span>
        <input
          type="datetime-local"
          .value=${form.scheduleAt}
          @input=${(e: Event) =>
            props.onFormChange({
              scheduleAt: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
    `;
  }
  if (form.scheduleKind === "every") {
    return html`
      <div class="form-grid" style="margin-top: 12px;">
        <label class="field">
          <span>Every</span>
          <input
            .value=${form.everyAmount}
            @input=${(e: Event) =>
              props.onFormChange({
                everyAmount: (e.target as HTMLInputElement).value,
              })}
          />
        </label>
        <label class="field">
          <span>Unit</span>
          <select
            .value=${form.everyUnit}
            @change=${(e: Event) =>
              props.onFormChange({
                everyUnit: (e.target as HTMLSelectElement).value as CronFormState["everyUnit"],
              })}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </label>
      </div>
    `;
  }
  return html`
    <div class="form-grid" style="margin-top: 12px;">
      <label class="field">
        <span>Expression</span>
        <input
          .value=${form.cronExpr}
          @input=${(e: Event) =>
            props.onFormChange({ cronExpr: (e.target as HTMLInputElement).value })}
        />
      </label>
      <label class="field">
        <span>Timezone (optional)</span>
        <input
          .value=${form.cronTz}
          @input=${(e: Event) =>
            props.onFormChange({ cronTz: (e.target as HTMLInputElement).value })}
        />
      </label>
    </div>
  `;
}

function renderJob(job: CronJob, props: CronProps) {
  const lang = props.settings.language;
  const isSelected = props.runsJobId === job.id;
  const itemClass = `list-item list-item-clickable cron-job${isSelected ? " list-item-selected" : ""}`;
  return html`
    <div class=${itemClass} @click=${() => props.onLoadRuns(job.id)}>
      <div class="list-main">
        <div class="list-title">${job.name}</div>
        <div class="list-sub">${formatCronSchedule(job)}</div>
        ${renderJobPayload(job, lang)}
        ${job.agentId ? html`<div class="muted cron-job-agent">${t("filterAgent", lang)}: ${job.agentId}</div>` : nothing}
      </div>
      <div class="list-meta">
        ${renderJobState(job, lang)}
      </div>
      <div class="cron-job-footer">
        <div class="chip-row cron-job-chips">
          <span class=${`chip ${job.enabled ? "chip-ok" : "chip-danger"}`}>
            ${job.enabled ? t("skillEligible", lang) : t("skillDisabled", lang)}
          </span>
          <span class="chip">${job.sessionTarget}</span>
          <span class="chip">${job.wakeMode}</span>
        </div>
        <div class="row cron-job-actions">
          <button
            class="btn"
            ?disabled=${props.busy}
            @click=${(event: Event) => {
              event.stopPropagation();
              props.onToggle(job, !job.enabled);
            }}
          >
            ${job.enabled ? t("btnDisable", lang) : t("btnEnable", lang)}
          </button>
          <button
            class="btn"
            ?disabled=${props.busy}
            @click=${(event: Event) => {
              event.stopPropagation();
              props.onRun(job);
            }}
          >
            ${t("btnRun", lang)}
          </button>
          <button
            class="btn"
            ?disabled=${props.busy}
            @click=${(event: Event) => {
              event.stopPropagation();
              props.onLoadRuns(job.id);
            }}
          >
            ${t("btnHistory", lang)}
          </button>
          <button
            class="btn danger"
            ?disabled=${props.busy}
            @click=${(event: Event) => {
              event.stopPropagation();
              props.onRemove(job);
            }}
          >
            ${t("btnRemove", lang)}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderJobPayload(job: CronJob, lang: any) {
  if (job.payload.kind === "systemEvent") {
    return html`<div class="cron-job-detail">
      <span class="cron-job-detail-label">${t("groupSystem", lang)}</span>
      <span class="muted cron-job-detail-value">${job.payload.text}</span>
    </div>`;
  }

  const delivery = job.delivery;
  const deliveryTarget =
    delivery?.channel || delivery?.to
      ? ` (${delivery.channel ?? "last"}${delivery.to ? ` -> ${delivery.to}` : ""})`
      : "";

  return html`
    <div class="cron-job-detail">
      <span class="cron-job-detail-label">Prompt</span>
      <span class="muted cron-job-detail-value">${job.payload.message}</span>
    </div>
    ${
      delivery
        ? html`<div class="cron-job-detail">
            <span class="cron-job-detail-label">${t("labelDelivery", lang)}</span>
            <span class="muted cron-job-detail-value">${delivery.mode}${deliveryTarget}</span>
          </div>`
        : nothing
    }
  `;
}

function formatStateRelative(ms?: number) {
  if (typeof ms !== "number" || !Number.isFinite(ms)) {
    return "n/a";
  }
  return formatRelativeTimestamp(ms);
}

function renderJobState(job: CronJob, lang: any) {
  const status = job.state?.lastStatus ?? "n/a";
  const statusClass =
    status === "ok"
      ? "cron-job-status-ok"
      : status === "error"
        ? "cron-job-status-error"
        : status === "skipped"
          ? "cron-job-status-skipped"
          : "cron-job-status-na";
  const nextRunAtMs = job.state?.nextRunAtMs;
  const lastRunAtMs = job.state?.lastRunAtMs;

  return html`
    <div class="cron-job-state">
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">${t("lastStatus", lang)}</span>
        <span class=${`cron-job-status-pill ${statusClass}`}>${status}</span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">${t("nextRun", lang)}</span>
        <span class="cron-job-state-value" title=${formatMs(nextRunAtMs)}>
          ${formatStateRelative(nextRunAtMs)}
        </span>
      </div>
      <div class="cron-job-state-row">
        <span class="cron-job-state-key">${t("lastRun", lang)}</span>
        <span class="cron-job-state-value" title=${formatMs(lastRunAtMs)}>
          ${formatStateRelative(lastRunAtMs)}
        </span>
      </div>
    </div>
  `;
}

function renderRun(entry: CronRunLogEntry, basePath: string) {
  const chatUrl =
    typeof entry.sessionKey === "string" && entry.sessionKey.trim().length > 0
      ? `${pathForTab("chat", basePath)}?session=${encodeURIComponent(entry.sessionKey)}`
      : null;
  return html`
    <div class="list-item">
      <div class="list-main">
        <div class="list-title">${entry.status}</div>
        <div class="list-sub">${entry.summary ?? ""}</div>
      </div>
      <div class="list-meta">
        <div>${formatMs(entry.ts)}</div>
        <div class="muted">${entry.durationMs ?? 0}ms</div>
        ${
          chatUrl
            ? html`<div><a class="session-link" href=${chatUrl}>Open run chat</a></div>`
            : nothing
        }
        ${entry.error ? html`<div class="muted">${entry.error}</div>` : nothing}
      </div>
    </div>
  `;
}
