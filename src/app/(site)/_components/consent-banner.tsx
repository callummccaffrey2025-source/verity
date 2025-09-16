"use client";
import { useEffect, useState } from "react";
import { analyticsConsent, setAnalyticsConsent, track } from "@/lib/analytics";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const current = analyticsConsent();
    if (current === "denied") setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <p className="text-sm text-neutral-300">
          We use <span className="text-neutral-100">first-party, cookie-free analytics</span> to improve Verity. No ad tech. You can opt out anytime.
        </p>
        <div className="flex gap-2">
          <button
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm"
            onClick={() => { setAnalyticsConsent("denied"); setShow(false); }}
          >
            Decline
          </button>
          <button
            className="btn-primary text-sm"
            onClick={() => {
              setAnalyticsConsent("granted");
              setShow(false);
              track("consent_granted");
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
