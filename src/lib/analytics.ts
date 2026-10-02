export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const CONSENT_KEY = "soura-consent";
export const CONSENT_EVENT = "soura-consent-change";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent | null) {
  try {
    if (value) localStorage.setItem(CONSENT_KEY, value);
    else localStorage.removeItem(CONSENT_KEY);
  } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

type Params = Record<string, string | number | boolean | undefined>;

/** Sends a GA4 event. A no-op until the visitor has accepted analytics. */
export function track(event: string, params?: Params) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (gtag) gtag("event", event, params);
}
