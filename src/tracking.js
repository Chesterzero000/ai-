import { recordAnalyticsEvent } from "./supabaseBackend.js";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
let engagementStartedAt = 0;
let engagementTrackingReady = false;
let engagementSent = false;

export function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const captured = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      captured[key] = value;
    }
  });

  if (Object.keys(captured).length > 0) {
    localStorage.setItem("kastave_utm", JSON.stringify(captured));
  }

  return getStoredUtm();
}

export function getStoredUtm() {
  try {
    return JSON.parse(localStorage.getItem("kastave_utm") || "{}");
  } catch {
    return {};
  }
}

export function withUtm(url) {
  if (!url) {
    return "";
  }

  const utm = getStoredUtm();
  const target = new URL(url, window.location.origin);

  Object.entries(utm).forEach(([key, value]) => {
    if (value && !target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  });

  return target.toString();
}

export function initAnalytics() {
  captureUtmParams();

  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
  const tiktokPixelId = import.meta.env.VITE_TIKTOK_PIXEL_ID;
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;

  if (gaId) {
    appendScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, true);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }

  if (metaPixelId) {
    window.fbq =
      window.fbq ||
      function fbq() {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];
    appendScript("https://connect.facebook.net/en_US/fbevents.js", true);
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
  }

  if (tiktokPixelId) {
    window.TiktokAnalyticsObject = "ttq";
    const ttq = (window.ttq = window.ttq || []);
    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "once",
      "ready",
      "alias",
      "group",
      "enableCookie",
      "disableCookie",
    ];
    ttq.setAndDefer = (target, method) => {
      target[method] = function deferredMethod() {
        target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    ttq.methods.forEach((method) => ttq.setAndDefer(ttq, method));
    appendScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${tiktokPixelId}&lib=ttq`, true);
    ttq.page();
  }

  if (plausibleDomain) {
    const script = appendScript("https://plausible.io/js/script.js", true);
    script.setAttribute("data-domain", plausibleDomain);
    window.plausible =
      window.plausible ||
      function plausible() {
        window.plausible.q = window.plausible.q || [];
        window.plausible.q.push(arguments);
      };
  }

  startEngagementTracking();
  trackEvent("page_view", { path: window.location.pathname, title: document.title });
}

export function trackEvent(name, properties = {}) {
  const payload = {
    ...properties,
    ...getStoredUtm(),
  };

  recordAnalyticsEvent(name, payload);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });

  if (window.gtag) {
    window.gtag("event", name, payload);
  }

  if (window.fbq) {
    window.fbq("trackCustom", name, payload);
  }

  if (window.ttq?.track) {
    window.ttq.track(name, payload);
  }

  if (window.plausible) {
    window.plausible(name, { props: payload });
  }
}

function appendScript(src, async = false) {
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    return existing;
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
  return script;
}

function startEngagementTracking() {
  if (engagementTrackingReady) {
    return;
  }

  engagementTrackingReady = true;
  engagementStartedAt = Date.now();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendEngagementEvent("visibility_hidden");
    }
  });

  window.addEventListener("pagehide", () => sendEngagementEvent("pagehide"));
}

function sendEngagementEvent(reason) {
  if (engagementSent || !engagementStartedAt) {
    return;
  }

  const durationMs = Date.now() - engagementStartedAt;
  if (durationMs < 1000) {
    return;
  }

  engagementSent = true;
  trackEvent("page_engagement", {
    reason,
    duration_ms: durationMs,
    duration_seconds: Number((durationMs / 1000).toFixed(2)),
    path: window.location.pathname,
  });
}
