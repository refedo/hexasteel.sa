"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import styles from "./ConsentAnalytics.module.css";

type Consent = "unknown" | "accepted" | "rejected";
type TrackingWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};
const STORAGE_KEY = "hexa_analytics_consent_v1";
const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
const enabled = Boolean(measurementId && /^G-[A-Z0-9]+$/.test(measurementId));

// Preserve standard ad attribution identifiers, but never send arbitrary URL parameters.
function analyticsPageLocation(pathname: string): string {
  const source = new URLSearchParams(window.location.search);
  const filtered = new URLSearchParams();
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_id", "utm_term", "utm_content", "gclid", "gbraid", "wbraid", "msclkid"]) {
    const value = source.get(key);
    if (value && value.length <= 150) filtered.set(key, value);
  }
  const qs = filtered.toString();
  return window.location.origin + pathname + (qs ? "?" + qs : "");
}

export function ConsentAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("unknown");
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      setConsent(saved === "accepted" || saved === "rejected" ? saved : "unknown");
    } catch {
      // No storage permission means no non-essential analytics.
      setConsent("rejected");
    }
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || !loaded) return;
    (window as TrackingWindow).gtag?.("event", "page_view", {
      page_location: analyticsPageLocation(pathname),
      page_path: pathname,
      page_title: document.title,
    });
  }, [consent, loaded, pathname]);

  useEffect(() => {
    if (consent !== "accepted" || !loaded) return;
    function trackContactClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      let name: string | undefined;
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) name = "whatsapp_click";
      else if (href.startsWith("tel:")) name = "call_click";
      else if (href.startsWith("mailto:")) name = "email_click";
      else if (href.startsWith("/request-quotation")) name = "rfq_cta_click";
      if (name) {
        (window as TrackingWindow).gtag?.("event", name, {
          page_path: window.location.pathname,
          // Never transmit link URLs, phone numbers, email addresses or form data.
        });
      }
    }
    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, [consent, loaded]);

  function choose(value: Exclude<Consent, "unknown">) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      if (value === "accepted") return; // fail closed
    }
    setConsent(value);
    setChoiceOpen(false);
  }

  if (!enabled) return null;

  return <>
    {consent === "accepted" && <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as TrackingWindow;
        w.dataLayer = w.dataLayer || [];
        w.gtag = (...args: unknown[]) => { w.dataLayer?.push(args); };
        w.gtag("js", new Date());
        w.gtag("config", measurementId, { send_page_view: false });
        setLoaded(true);
      }}
    />}
    {(consent === "unknown" || choiceOpen) ? (
      <section className={styles.banner} aria-label="Analytics privacy preferences">
        <div className={styles.copy}>
          <strong>Website analytics</strong>
          <p>May we use optional Google Analytics cookies to understand traffic and improve this website? Declining does not affect site access.</p>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={() => choose("rejected")} className={styles.secondary}>Decline</button>
          <button type="button" onClick={() => choose("accepted")} className={styles.primary}>Accept</button>
        </div>
      </section>
    ) : <button type="button" className={styles.preferences} onClick={() => setChoiceOpen(true)}>Analytics preferences</button>}
  </>;
}
