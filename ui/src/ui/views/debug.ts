import { html, nothing } from "lit";
import type { EventLogEntry } from "../app-events.ts";
import { formatEventPayload } from "../presenter.ts";
import { t } from "../i18n.ts";
import type { UiSettings } from "../storage.ts";

export type DebugProps = {
  settings: UiSettings;
  loading: boolean;
  status: Record<string, unknown> | null;
  health: Record<string, unknown> | null;
  models: unknown[];
  heartbeat: unknown;
  eventLog: EventLogEntry[];
  callMethod: string;
  callParams: string;
  callResult: string | null;
  callError: string | null;
  onCallMethodChange: (next: string) => void;
  onCallParamsChange: (next: string) => void;
  onRefresh: () => void;
  onCall: () => void;
};

export function renderDebug(props: DebugProps) {
  const lang = props.settings.language;
  const securityAudit =
    props.status && typeof props.status === "object"
      ? (props.status as { securityAudit?: { summary?: Record<string, number> } }).securityAudit
      : null;
  const securitySummary = securityAudit?.summary ?? null;
  const critical = securitySummary?.critical ?? 0;
  const warn = securitySummary?.warn ?? 0;
  const info = securitySummary?.info ?? 0;
  const securityTone = critical > 0 ? "danger" : warn > 0 ? "warn" : "success";
  
  const securityLabel = critical > 0 
    ? `${critical} critical` 
    : warn > 0 
      ? `${warn} warnings` 
      : "No critical issues";
  // Note: Localizing security audit labels can be complex, keeping English for numbers for now 
  // but using t() where possible.

  return html`
    <div class="agents-layout">
      <section class="agents-sidebar">
        <div class="card">
          <div class="row" style="justify-content: space-between;">
            <div>
              <div class="card-title">${t("snapshotTitle", lang)}</div>
              <div class="card-sub">${t("snapshotSub", lang)}</div>
            </div>
            <button class="btn" ?disabled=${props.loading} @click=${props.onRefresh}>
              ${props.loading ? t("refreshing", lang) : t("refresh", lang)}
            </button>
          </div>
          <div class="stack" style="margin-top: 12px;">
            <div>
              <div class="muted">${t("statStatus", lang)}</div>
              ${
                securitySummary
                  ? html`<div class="callout ${securityTone}" style="margin-top: 8px;">
                    ${t("labelSecurityAudit", lang)}${securityLabel}${info > 0 ? ` · ${info} info` : ""}
                    ${t("msgSecurityAuditHint", lang).replace("${cmd}", "openclaw security audit --deep")}
                  </div>`
                  : nothing
              }
              <pre class="code-block">${JSON.stringify(props.status ?? {}, null, 2)}</pre>
            </div>
            <div>
              <div class="muted">Health</div>
              <pre class="code-block">${JSON.stringify(props.health ?? {}, null, 2)}</pre>
            </div>
            <div>
              <div class="muted">Last heartbeat</div>
              <pre class="code-block">${JSON.stringify(props.heartbeat ?? {}, null, 2)}</pre>
            </div>
          </div>
        </div>

        <div class="card" style="margin-top: 18px;">
          <div class="card-title">${t("labelManualRpc", lang)}</div>
          <div class="card-sub">${t("subManualRpc", lang)}</div>
          <div class="form-grid" style="margin-top: 16px;">
            <label class="field">
              <span>${t("labelMethod", lang)}</span>
              <input
                .value=${props.callMethod}
                @input=${(e: Event) => props.onCallMethodChange((e.target as HTMLInputElement).value)}
                placeholder="system-presence"
              />
            </label>
            <label class="field">
              <span>${t("labelParams", lang)}</span>
              <textarea
                .value=${props.callParams}
                @input=${(e: Event) =>
                  props.onCallParamsChange((e.target as HTMLTextAreaElement).value)}
                rows="6"
              ></textarea>
            </label>
          </div>
          <div class="row" style="margin-top: 12px;">
            <button class="btn primary" @click=${props.onCall}>${t("btnCall", lang)}</button>
          </div>
          ${
            props.callError
              ? html`<div class="callout danger" style="margin-top: 12px;">
                ${props.callError}
              </div>`
              : nothing
          }
          ${
            props.callResult
              ? html`<pre class="code-block" style="margin-top: 12px;">${props.callResult}</pre>`
              : nothing
          }
        </div>
      </section>

      <section class="agents-main">
        <section class="card">
          <div class="card-title">${t("titleModels", lang)}</div>
          <div class="card-sub">${t("subModels", lang)}</div>
          <pre class="code-block" style="margin-top: 12px;">${JSON.stringify(
            props.models ?? [],
            null,
            2,
          )}</pre>
        </section>

        <section class="card" style="margin-top: 18px;">
          <div class="card-title">${t("titleEventLog", lang)}</div>
          <div class="card-sub">${t("subEventLog", lang)}</div>
          ${
            props.eventLog.length === 0
              ? html`
                  <div class="muted" style="margin-top: 12px">${t("msgNoEvents", lang)}</div>
                `
              : html`
                <div class="list" style="margin-top: 12px;">
                  ${props.eventLog.map(
                    (evt) => html`
                      <div class="list-item">
                        <div class="list-main">
                          <div class="list-title">${evt.event}</div>
                          <div class="list-sub">${new Date(evt.ts).toLocaleTimeString()}</div>
                        </div>
                        <div class="list-meta">
                          <pre class="code-block">${formatEventPayload(evt.payload)}</pre>
                        </div>
                      </div>
                    `,
                  )}
                </div>
              `
          }
        </section>
      </section>
    </div>
  `;
}
