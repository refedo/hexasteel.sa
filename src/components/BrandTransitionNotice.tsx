"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import styles from "./BrandTransitionNotice.module.css";

const LEGACY_SESSION_KEY = "hexa_hexametals_arrival";
const LEGACY_DISMISSED_KEY = "hexa_hexametals_welcome_dismissed";
const BETA_DISMISSED_KEY = "hexa_beta_notice_dismissed";

export function isHexaMetalsArrival(search: string, referrer: string): boolean {
  const params = new URLSearchParams(search);
  // Internal attribution markers identify traffic from the previous website domain. Do not show this domain to visitors.
  const marker = (params.get("from") || params.get("utm_source") || "").toLowerCase();
  if (marker === "previous-site" || marker === "oldsite" || marker === "hexametals" || marker === "hexa-metals") return true;

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    return host === "hexametals.com" || host === "www.hexametals.com";
  } catch {
    return false;
  }
}

export function BrandTransitionNotice() {
  const pathname = usePathname();
  const [showLegacyWelcome, setShowLegacyWelcome] = useState(false);
  const [showBetaNotice, setShowBetaNotice] = useState(true);

  useEffect(() => {
    try {
      const arrived = isHexaMetalsArrival(window.location.search, document.referrer);
      if (arrived) window.sessionStorage.setItem(LEGACY_SESSION_KEY, "1");
      const previouslyArrived = window.sessionStorage.getItem(LEGACY_SESSION_KEY) === "1";
      setShowLegacyWelcome(previouslyArrived && window.sessionStorage.getItem(LEGACY_DISMISSED_KEY) !== "1");
      setShowBetaNotice(window.sessionStorage.getItem(BETA_DISMISSED_KEY) !== "1");
    } catch {
      // Storage can be blocked. The marker still works for this page without persistence.
      setShowLegacyWelcome(isHexaMetalsArrival(window.location.search, document.referrer));
    }
  }, [pathname]);

  function dismissLegacy() {
    setShowLegacyWelcome(false);
    try { window.sessionStorage.setItem(LEGACY_DISMISSED_KEY, "1"); } catch {}
  }

  function dismissBeta() {
    setShowBetaNotice(false);
    try { window.sessionStorage.setItem(BETA_DISMISSED_KEY, "1"); } catch {}
  }

  return <>
    {showLegacyWelcome && (
      <aside aria-label="Welcome to the new HEXA Steel website" className={styles.legacy}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>HEXA STEEL® / NEW WEBSITE</p>
            <h2>Welcome to HEXA Steel®.</h2>
            <p className={styles.lead}>Welcome to our new digital home.</p>
            <p>Our website has evolved, while our commitment to engineering excellence, premium quality and reliable steel manufacturing remains unchanged.</p>
            <p className={styles.betaContext}>We are refining our new website. Some digital features are still in beta.</p>
          </div>
          <div className={styles.actions}>
            <Link href="/products-services" className={styles.explore} onClick={dismissLegacy}>Explore our capabilities <span aria-hidden="true">↗</span></Link>
            <button type="button" className={styles.dismiss} onClick={dismissLegacy} aria-label="Dismiss new website welcome">Dismiss</button>
          </div>
        </div>
      </aside>
    )}
    {showBetaNotice && (
      <aside className={styles.beta} aria-label="Website beta status">
        <div className={styles.betaInner}>
          <p><strong>WEBSITE BETA</strong><span className={styles.separator} aria-hidden="true"> — </span>We're continually improving our new digital experience. HEXA Steel® business operations remain fully active.</p>
          <button type="button" onClick={dismissBeta} className={styles.betaDismiss} aria-label="Dismiss beta status notice">Dismiss</button>
        </div>
      </aside>
    )}
  </>;
}
