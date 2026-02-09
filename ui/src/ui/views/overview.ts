import { html } from "lit";
import type { GatewayHelloOk } from "../gateway.ts";
import type { UiSettings } from "../storage.ts";
import { formatRelativeTimestamp, formatDurationHuman } from "../format.ts";
import { formatNextRun } from "../presenter.ts";
import { t } from "../i18n.ts";

export type OverviewProps = {
  connected: boolean;
  hello: GatewayHelloOk | null;
  settings: UiSettings;
  password: string;
  lastError: string | null;
  presenceCount: number;
  sessionsCount: number | null;
  cronEnabled: boolean | null;
  cronNext: number | null;
  lastChannelsRefresh: number | null;
  onSettingsChange: (next: UiSettings) => void;
  onPasswordChange: (next: string) => void;
  onSessionKeyChange: (next: string) => void;
  onConnect: () => void;
  onRefresh: () => void;
};

export function renderOverview(props: OverviewProps) {
  const snapshot = props.hello?.snapshot as
    | { uptimeMs?: number; policy?: { tickIntervalMs?: number } }
    | undefined;
  const uptime = snapshot?.uptimeMs ? formatDurationHuman(snapshot.uptimeMs) : "n/a";
  const tick = snapshot?.policy?.tickIntervalMs ? `${snapshot.policy.tickIntervalMs}ms` : "n/a";
  const authHint = (() => {
    if (props.connected || !props.lastError) {
      return null;
    }
    const lower = props.lastError.toLowerCase();
    const authFailed = lower.includes("unauthorized") || lower.includes("connect failed");
    if (!authFailed) {
      return null;
    }
    const hasToken = Boolean(props.settings.token.trim());
    const hasPassword = Boolean(props.password.trim());
    if (!hasToken && !hasPassword) {
      return html`
        <div class="muted" style="margin-top: 8px">
          ${t("msgAuthRequired", props.settings.language)}
          <div style="margin-top: 6px">
            <span class="mono">openclaw dashboard --no-open</span> → open the Control UI<br />
            <span class="mono">openclaw doctor --generate-gateway-token</span> → set token
          </div>
          <div style="margin-top: 6px">
            <a
              class="session-link"
              href="https://docs.openclaw.ai/web/dashboard"
              target="_blank"
              rel="noreferrer"
              title="${t("docControlUiAuth", props.settings.language)} (opens in new tab)"
              >${t("docControlUiAuth", props.settings.language)}</a
            >
          </div>
        </div>
      `;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t("msgAuthFailed", props.settings.language)}
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.openclaw.ai/web/dashboard"
            target="_blank"
            rel="noreferrer"
            title="${t("docControlUiAuth", props.settings.language)} (opens in new tab)"
            >${t("docControlUiAuth", props.settings.language)}</a
          >
        </div>
      </div>
    `;
  })();
  const insecureContextHint = (() => {
    if (props.connected || !props.lastError) {
      return null;
    }
    const isSecureContext = typeof window !== "undefined" ? window.isSecureContext : true;
    if (isSecureContext) {
      return null;
    }
    const lower = props.lastError.toLowerCase();
    if (!lower.includes("secure context") && !lower.includes("device identity required")) {
      return null;
    }
    return html`
      <div class="muted" style="margin-top: 8px">
        ${t("msgInsecureHTTP", props.settings.language)}
        <span class="mono">http://127.0.0.1:18789</span> on the gateway host.
        <div style="margin-top: 6px">
          ${t("msgInsecureHint", props.settings.language)}
          <span class="mono">gateway.controlUi.allowInsecureAuth: true</span> (token-only).
        </div>
        <div style="margin-top: 6px">
          <a
            class="session-link"
            href="https://docs.openclaw.ai/gateway/tailscale"
            target="_blank"
            rel="noreferrer"
            title="${t("docTailscale", props.settings.language)} (opens in new tab)"
            >${t("docTailscale", props.settings.language)}</a
          >
          <span class="muted"> · </span>
          <a
            class="session-link"
            href="https://docs.openclaw.ai/web/control-ui#insecure-http"
            target="_blank"
            rel="noreferrer"
            title="${t("docInsecure", props.settings.language)} (opens in new tab)"
            >${t("docInsecure", props.settings.language)}</a
          >
        </div>
      </div>
    `;
  })();

  return html`
    <section class="grid grid-cols-2">
      <div class="card">
        <div class="card-title">${t("gatewayAccess", props.settings.language)}</div>
        <div class="card-sub">${t("gatewayAccessSub", props.settings.language)}</div>
        <div class="form-grid" style="margin-top: 16px;">
          <label class="field">
            <span>${t("labelWsUrl", props.settings.language)}</span>
            <input
              .value=${props.settings.gatewayUrl}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, gatewayUrl: v });
              }}
              placeholder="ws://100.x.y.z:18789"
            />
          </label>
          <label class="field">
            <span>${t("labelToken", props.settings.language)}</span>
            <input
              .value=${props.settings.token}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSettingsChange({ ...props.settings, token: v });
              }}
              placeholder="OPENCLAW_GATEWAY_TOKEN"
            />
          </label>
          <label class="field">
            <span>${t("labelPassword", props.settings.language)}</span>
            <input
              type="password"
              .value=${props.password}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onPasswordChange(v);
              }}
              placeholder="system or shared password"
            />
          </label>
          <label class="field">
            <span>${t("labelSessionKey", props.settings.language)}</span>
            <input
              .value=${props.settings.sessionKey}
              @input=${(e: Event) => {
                const v = (e.target as HTMLInputElement).value;
                props.onSessionKeyChange(v);
              }}
            />
          </label>
        </div>
        <div class="row" style="margin-top: 14px;">
          <button class="btn" @click=${() => props.onConnect()}>${t("btnConnect", props.settings.language)}</button>
          <button class="btn" @click=${() => props.onRefresh()}>${t("refresh", props.settings.language)}</button>
          <span class="muted">${t("msgConnectHint", props.settings.language)}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">${t("snapshotTitle", props.settings.language)}</div>
        <div class="card-sub">${t("snapshotSub", props.settings.language)}</div>
        <div class="stat-grid" style="margin-top: 16px;">
          <div class="stat">
            <div class="stat-label">${t("statStatus", props.settings.language)}</div>
            <div class="stat-value ${props.connected ? "ok" : "warn"}">
              ${props.connected ? t("statConnected", props.settings.language) : t("statDisconnected", props.settings.language)}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("statUptime", props.settings.language)}</div>
            <div class="stat-value">${uptime}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("statTick", props.settings.language)}</div>
            <div class="stat-value">${tick}</div>
          </div>
          <div class="stat">
            <div class="stat-label">${t("statLastRefresh", props.settings.language)}</div>
            <div class="stat-value">
              ${props.lastChannelsRefresh ? formatRelativeTimestamp(props.lastChannelsRefresh) : "n/a"}
            </div>
          </div>
        </div>
        ${
          props.lastError
            ? html`<div class="callout danger" style="margin-top: 14px;">
              <div>${props.lastError}</div>
              ${authHint ?? ""}
              ${insecureContextHint ?? ""}
            </div>`
            : html`
                <div class="callout" style="margin-top: 14px">
                  ${t("msgChannelsHint", props.settings.language)}
                </div>
              `
        }
      </div>
    </section>

    <section class="grid grid-cols-3" style="margin-top: 18px;">
      <div class="card stat-card">
        <div class="stat-label">${t("statInstances", props.settings.language)}</div>
        <div class="stat-value">${props.presenceCount}</div>
        <div class="muted">${t("statInstancesSub", props.settings.language)}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("statSessions", props.settings.language)}</div>
        <div class="stat-value">${props.sessionsCount ?? "n/a"}</div>
        <div class="muted">${t("statSessionsSub", props.settings.language)}</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">${t("statCron", props.settings.language)}</div>
        <div class="stat-value">
          ${props.cronEnabled == null ? "n/a" : props.cronEnabled ? t("statCronEnabled", props.settings.language) : t("statCronDisabled", props.settings.language)}
        </div>
        <div class="muted">${t("statNextWake", props.settings.language)} ${formatNextRun(props.cronNext)}</div>
      </div>
    </section>

    <section class="card" style="margin-top: 18px;">
      <div class="card-title">${t("notesTitle", props.settings.language)}</div>
      <div class="card-sub">${t("notesSub", props.settings.language)}</div>
      <div class="note-grid" style="margin-top: 14px;">
        <div>
          <div class="note-title">${t("noteTailscaleTitle", props.settings.language)}</div>
          <div class="muted">
            ${t("noteTailscaleSub", props.settings.language)}
          </div>
        </div>
        <div>
          <div class="note-title">${t("noteHygieneTitle", props.settings.language)}</div>
          <div class="muted">${t("noteHygieneSub", props.settings.language)}</div>
        </div>
        <div>
          <div class="note-title">${t("noteCronTitle", props.settings.language)}</div>
          <div class="muted">${t("noteCronSub", props.settings.language)}</div>
        </div>
      </div>
    </section>
  `;
}
