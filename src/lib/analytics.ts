export type AnalyticsEvent = {
  name: string;
  props?: Record<string, unknown>;
  ts?: number;
};

export function analyticsConsent(): "granted" | "denied" {
  if (typeof window === "undefined") return "denied";
  return (localStorage.getItem("analytics_consent") as any) || "denied";
}

export function setAnalyticsConsent(state: "granted" | "denied") {
  if (typeof window === "undefined") return;
  localStorage.setItem("analytics_consent", state);
}

export function track(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (analyticsConsent() !== "granted") return;
  const payload: AnalyticsEvent = { name, props, ts: Date.now() };
  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  const url = "/api/analytics";
  if (navigator.sendBeacon) { navigator.sendBeacon(url, blob); return; }
  fetch(url, { method: "POST", body: JSON.stringify(payload), headers: { "content-type": "application/json" } }).catch(()=>{});
}
