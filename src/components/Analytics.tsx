"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { CONSENT_EVENT, GA_ID, readConsent, writeConsent, type Consent } from "@/lib/analytics";

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** GA4 loads only after the visitor accepts. Renders nothing when no GA id is configured. */
export function Analytics() {
  const consent = useSyncExternalStore<Consent | null | "pending">(subscribe, readConsent, () => "pending");

  if (!GA_ID || consent === "pending") return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {consent === null && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="rise fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-3xl border border-line bg-surface p-5 shadow-lift md:bottom-4 md:left-4 md:right-auto"
        >
          <p className="text-sm text-muted">
            We use analytics cookies to see which pages help visitors, so we can improve the site. Nothing is loaded
            unless you accept. See our <Link href="/privacy" className="font-semibold text-brand underline underline-offset-2">privacy policy</Link>.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => writeConsent("granted")}
              className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink transition-transform duration-150 ease-out-strong active:scale-[0.97]"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => writeConsent("denied")}
              className="rounded-full border border-line px-5 py-2 text-sm font-semibold transition-[background-color,transform] duration-150 ease-out-strong hover:bg-line/40 active:scale-[0.97]"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that lets visitors change their mind. */
export function CookieSettingsButton() {
  if (!GA_ID) return null;
  return (
    <button type="button" onClick={() => writeConsent(null)} className="inline-block py-1.5 transition-colors duration-150 hover:text-deep-foreground">
      Cookie settings
    </button>
  );
}
