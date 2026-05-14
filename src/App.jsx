import React, { useEffect, useState } from "react";
import {
  ANNOUNCEMENT,
  BANK_PAIN_POINTS,
  HERO,
  HIGHLIGHT_CAROUSEL,
  OFFER_ITEMS,
  PROCESS_STEPS,
  PRODUCT_HIGHLIGHTS,
  SITE,
} from "./content.js";
import { initAnalytics, trackEvent, withUtm } from "./tracking.js";
import { recordPainPointAnswer, recordReservationIntent, recordWaitlistSignup } from "./supabaseBackend.js";
import heroImage from "../assets/kastave-new-hero.png";
import processImage from "../assets/kastave-new-process.png";
import recognitionImage from "../assets/kastave-new-recognition.png";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [painCtaOpen, setPainCtaOpen] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const isThanksPage = window.location.pathname === "/thanks";

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("kastave_pain_cta_seen") === "true") {
      return undefined;
    }

    const timer = setTimeout(() => {
      setPainCtaOpen(true);
      sessionStorage.setItem("kastave_pain_cta_seen", "true");
      trackEvent("pain_point_cta_view");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const reserveWithPaypal = (source = "unknown") => {
    trackEvent("paypal_reserve_click", { source });
    recordReservationIntent({
      amountCents: 100,
      refundable: false,
      provider: "paypal",
      source,
      paymentLink: SITE.paypalPaymentLink,
    });

    if (SITE.paypalPaymentLink) {
      window.location.href = withUtm(SITE.paypalPaymentLink);
      return;
    }

    setDialogOpen(true);
  };

  const subscribe = (email, source = "inline_form") => {
    trackEvent("email_signup_submit", { source });
    recordWaitlistSignup(email, { source });

    if (SITE.beehiivFormUrl) {
      window.location.href = withUtm(SITE.beehiivFormUrl);
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem("kastave_subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("kastave_subscribers", JSON.stringify(subscribers));
    }

    setSignupMessage("You're on the Kastave Bank Angler Scout Program list.");
  };

  const focusWaitlist = (source = "unknown") => {
    trackEvent("waitlist_click", { source });
    const input = document.getElementById("hero-email");
    if (input) {
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      input.focus({ preventScroll: true });
    }
  };

  const submitPainPoint = ({ painPoint, customAnswer }) => {
    trackEvent("pain_point_submit", { painPoint, hasCustomAnswer: Boolean(customAnswer) });
    recordPainPointAnswer({ painPoint, customAnswer });
    const answers = JSON.parse(localStorage.getItem("kastave_pain_points") || "[]");
    answers.push({
      painPoint,
      customAnswer,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("kastave_pain_points", JSON.stringify(answers));
    setPainCtaOpen(false);
    focusWaitlist("pain_point_cta");
  };

  const closePainCta = () => {
    trackEvent("pain_point_cta_close");
    setPainCtaOpen(false);
  };

  if (isThanksPage) {
    return <ThanksPage />;
  }

  return (
    <>
      <AnnouncementBar />
      <SiteNav onWaitlist={() => focusWaitlist("nav")} onReserve={() => reserveWithPaypal("nav")} />
      <main>
        <Hero
          onSubscribe={(email) => subscribe(email, "hero")}
          onReserve={() => reserveWithPaypal("hero")}
          message={signupMessage}
        />
        <ProductHighlights onReserve={() => reserveWithPaypal("highlight_carousel")} />
        <ProcessVisual />
        <Offer onPaypal={() => reserveWithPaypal("offer")} message={signupMessage} />
      </main>
      <Footer />
      <CheckoutDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <PainPointCta open={painCtaOpen} onClose={closePainCta} onSubmit={submitPainPoint} />
    </>
  );
}

function AnnouncementBar() {
  return <div className="announcement">{ANNOUNCEMENT}</div>;
}

function SiteNav({ onWaitlist, onReserve }) {
  const [open, setOpen] = useState(false);
  const navItems = ["Highlights", "Demo", "$1 Reserve"];

  return (
    <header className="site-nav">
      <a className="brand dark-brand" href={SITE.domain} aria-label="Kastave home">
        <span className="brand-mark">K</span>
        <span>{SITE.name}</span>
      </a>
      <button className="hamburger" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
        <span />
        <span />
      </button>
      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={navHref(item)} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="nav-waitlist-button" type="button" onClick={onWaitlist}>
          Join waitlist
        </button>
        <button className="nav-reserve-button" type="button" onClick={onReserve}>
          Reserve $1
        </button>
      </div>
    </header>
  );
}

function navHref(item) {
  const hrefs = {
    Highlights: "#highlights",
    Demo: "#how-it-works",
    "$1 Reserve": "#special-offers",
  };

  return hrefs[item] || `#${item.toLowerCase().replaceAll(" ", "-")}`;
}

function Hero({ onSubscribe, onReserve, message }) {
  return (
    <section className="hero commerce-hero" aria-labelledby="hero-title">
      <img className="hero-image" src={heroImage} alt="Kastave fish finder boat scanning a shoreline" />
      <div className="hero-scrim" />
      <div className="hero-content hero-centered">
        <p className="eyebrow">{HERO.eyebrow}</p>
        <h1 id="hero-title">{HERO.title}</h1>
        <p className="hero-copy">{HERO.body}</p>
        <div className="hero-actions" id="reserve">
          <EmailForm id="hero-email" onSubscribe={onSubscribe} buttonLabel="Join the waitlist" />
          <button className="secondary-link hero-reserve-button" type="button" onClick={onReserve}>
            Reserve for $1
          </button>
        </div>
        <p className="form-message hero-form-message">{message}</p>
        <p className="microcopy">{HERO.note}</p>
      </div>
    </section>
  );
}

const carouselImages = {
  hero: heroImage,
  process: processImage,
  recognition: recognitionImage,
};

function HighlightCarousel({ onReserve }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = HIGHLIGHT_CAROUSEL[activeIndex];
  const activeImage = carouselImages[activeItem.image] || recognitionImage;

  const move = (direction) => {
    setActiveIndex((current) => {
      const next = current + direction;
      if (next < 0) {
        return HIGHLIGHT_CAROUSEL.length - 1;
      }
      if (next >= HIGHLIGHT_CAROUSEL.length) {
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="highlight-carousel" aria-label="Product highlight carousel">
      <div className="carousel-image-panel">
        <img src={activeImage} alt={activeItem.title} />
      </div>
      <div className="carousel-content-panel">
        <div className="carousel-copy" aria-live="polite">
          <span>{activeItem.step}</span>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.body}</p>
          <button className="checkout-button carousel-buy-button" type="button" onClick={onReserve}>
            Reserve for $1
          </button>
        </div>
        <div className="carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous highlight">
            &lt;
          </button>
          <div className="carousel-dots" aria-label="Highlight position">
            {HIGHLIGHT_CAROUSEL.map((item, index) => (
              <button
                className={index === activeIndex ? "is-active" : ""}
                key={item.step}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show highlight ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={() => move(1)} aria-label="Next highlight">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Trust signal">
      <strong>Excellent</strong>
      <span aria-label="Five star rating">★★★★☆</span>
      <p>{TRUST.rating}</p>
      <small>{TRUST.note}</small>
    </section>
  );
}

function ScenarioSelector({ selected, onSelect }) {
  const activeScenario = SCENARIOS.find((scenario) => scenario.label === selected) || SCENARIOS[0];

  return (
    <section className="scenario-section" id="scout-program" aria-labelledby="scenario-title">
      <div className="section-inner">
        <div className="scenario-heading">
          <p className="section-kicker">Scout program fit</p>
          <h2 id="scenario-title">Where do you fish from the bank?</h2>
          <p>
            Pick the water you care about most. The program is built around real shoreline
            scouting problems, not generic boat electronics.
          </p>
        </div>
        <div className="scenario-grid" role="list" aria-label="Fishing scenarios">
          {SCENARIOS.map((scenario) => (
            <button
              className={selected === scenario.label ? "scenario-button is-active" : "scenario-button"}
              key={scenario.label}
              type="button"
              onClick={() => onSelect(scenario.label)}
            >
              {scenario.label}
            </button>
          ))}
        </div>
        <div className="scenario-readout" aria-live="polite">
          <strong>{activeScenario.label}</strong>
          <span>{activeScenario.detail}</span>
        </div>
      </div>
    </section>
  );
}

function ProductGrid({ onWaitlist }) {
  return (
    <section className="shop-section" id="products">
      <div className="section-heading">
        <p className="section-kicker">Flagship product</p>
        <h2>Best AI fish finders for bank water.</h2>
      </div>
      <div className="product-card-grid">
        {PRODUCTS.map((product, index) => (
          <article className="product-card" key={product.name}>
            <span className="sale-pill">{product.label}</span>
            <img src={index === 3 ? appImage : productImage} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.sub}</p>
            <div className="price-line">
              <s>{product.originalPrice}</s>
              <strong>{product.price}</strong>
            </div>
            <button type="button" onClick={onWaitlist}>
              Join waitlist
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function InteractiveProductVisual() {
  const [active, setActive] = useState(HOTSPOTS[0].label);
  const activeHotspot = HOTSPOTS.find((item) => item.label === active) || HOTSPOTS[0];

  return (
    <section className="interactive-product" id="flagship-product">
      <div className="section-inner two-column">
        <div>
          <p className="section-kicker">Explore the hardware</p>
          <h2>Built like outdoor gear, not a desk gadget.</h2>
          <p>
            Hover the product on desktop or tap a point on mobile to inspect the physical details
            that matter when you fish from the bank.
          </p>
          <div className="hotspot-readout">
            <strong>{activeHotspot.label}</strong>
            <span>{activeHotspot.detail}</span>
          </div>
        </div>
        <div className="hotspot-stage">
          <img src={valueImage} alt="Kastave product value visual" />
          {HOTSPOTS.map((spot) => (
            <button
              className={active === spot.label ? "hotspot is-active" : "hotspot"}
              key={spot.label}
              style={{ "--x": `${spot.x}%`, "--y": `${spot.y}%` }}
              type="button"
              onClick={() => setActive(spot.label)}
              onMouseEnter={() => setActive(spot.label)}
              aria-label={spot.label}
            >
              <span>{spot.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PremiumApp({ onWaitlist, onSubscribe, message }) {
  return (
    <section className="premium-app" id="app">
      <img src={emailImage} alt="Kastave boat and app early access" />
      <div className="premium-copy">
        <p className="section-kicker">Premium Maps</p>
        <h2>Analyze 3D terrain and fish activity for prime spots.</h2>
        <p>
          Hardware and software work together: scan water, save routes, revisit productive zones,
          and build a smarter bank-fishing map over time.
        </p>
        <button className="primary-button buy-button" type="button" onClick={onWaitlist}>
          Join the premium waitlist
          <span>Early software updates</span>
        </button>
        <EmailForm id="premium-email" onSubscribe={(email) => onSubscribe(email, "premium_app")} />
        <p className="form-message">{message}</p>
      </div>
    </section>
  );
}

function ScoutComparison() {
  return (
    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-kicker">Scout first</p>
          <h2 id="comparison-title">Scout first. Stop guessing.</h2>
        </div>
        <div className="comparison-table" role="table" aria-label="Fishing blind compared with Kastave Scout Program">
          <div className="comparison-row comparison-header" role="row">
            <span role="columnheader">Factor</span>
            <span role="columnheader">Fishing Blind</span>
            <span role="columnheader">Kastave Scout Program</span>
          </div>
          {COMPARISON_ROWS.map((row) => (
            <div className="comparison-row" role="row" key={row.factor}>
              <strong role="cell">{row.factor}</strong>
              <span role="cell">{row.blind}</span>
              <span role="cell">{row.scout}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmailForm({ id = "email", onSubscribe, buttonLabel = "Join updates" }) {
  const [email, setEmail] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return;
    }

    onSubscribe(trimmedEmail);
    setEmail("");
  };

  return (
    <form className="email-form light-form" onSubmit={submit}>
      <label className="sr-only" htmlFor={id}>
        Email address
      </label>
      <input
        id={id}
        name="email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

function ProcessVisual() {
  const [active, setActive] = useState(PROCESS_STEPS[0].label);

  return (
    <section className="process-section" id="how-it-works">
      <div className="section-heading">
        <p className="section-kicker">Video demo</p>
        <h2>See the scout workflow.</h2>
      </div>
      <div className="process-media">
        <img src={processImage} alt="Kastave Search Understand Cast process" />
        <button className="play-button" type="button" aria-label="Play product video">
          ▶
        </button>
      </div>
      <div className="process-grid">
        {PROCESS_STEPS.map((step) => (
          <article
            className={active === step.label ? "process-card is-active" : "process-card"}
            key={step.label}
            onMouseEnter={() => setActive(step.label)}
            onClick={() => setActive(step.label)}
          >
            <span>{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductHighlights({ onReserve }) {
  const [active, setActive] = useState(PRODUCT_HIGHLIGHTS[0].title);

  return (
    <section className="capabilities" id="highlights">
      <div className="section-inner two-column">
        <div className="capability-image">
          <img src={recognitionImage} alt="Kastave 3D underwater terrain recognition visual" />
        </div>
        <div>
          <p className="section-kicker">Product highlights</p>
          <h2>Portable scouting for bank anglers.</h2>
          <div className="capability-list">
            {PRODUCT_HIGHLIGHTS.map((capability) => (
              <button
                className={active === capability.title ? "capability-card is-active" : "capability-card"}
                key={capability.title}
                type="button"
                onMouseEnter={() => setActive(capability.title)}
                onClick={() => setActive(capability.title)}
              >
                <strong>{capability.title}</strong>
                <span>{capability.body}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <HighlightCarousel onReserve={onReserve} />
    </section>
  );
}

function Accessories() {
  return (
    <section className="accessories" id="accessories">
      <div className="section-heading">
        <p className="section-kicker">Planned kit add-ons</p>
        <h2>Gear concepts for the bank-ready kit.</h2>
      </div>
      <div className="accessory-grid">
        {ACCESSORIES.map((item) => (
          <article className="accessory-card" key={item.name}>
            <img src={productImage} alt={item.name} />
            <h3>{item.name}</h3>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Offer({ onPaypal, message }) {
  return (
    <section className="offer" id="special-offers">
      <div className="offer-copy">
        <p className="section-kicker">Special offer</p>
        <h2>Reserve your scout program spot for $1.</h2>
        <p>
          This is a real non-refundable early reservation deposit for bank anglers who want
          Kastave to exist. It helps prioritize production decisions and includes a $100
          launch credit when early units become available.
        </p>
      </div>

      <div className="checkout-panel" aria-live="polite">
        <div className="paypal-logo-row" aria-label="PayPal payment">
          <span className="paypal-wordmark">PayPal</span>
        </div>
        <div className="price-row">
          <span>$1</span>
          <small>non-refundable reservation</small>
        </div>
        <ul>
          {OFFER_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="checkout-button" type="button" onClick={onPaypal}>
          Reserve with PayPal
        </button>
        <p className="form-message">{message}</p>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq" id="support" aria-label="Kastave questions">
      <div className="section-inner">
        <p className="section-kicker">Support</p>
        <h2>Clear terms before anyone pays.</h2>
        <div className="faq-list">
          {FAQS.map((item) => (
            <details
              key={item.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  trackEvent("faq_expand", { question: item.question });
                }
              }}
            >
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand" href="/">
          <span className="brand-mark">K</span>
          <span>{SITE.name}</span>
        </a>
        <p>
          {SITE.programName}: your $1 reservation unlocks a $100 launch credit and marks you as an
          early user.
        </p>
      </div>
      <div className="footer-links">
        <a href="#highlights">Highlights</a>
        <a href="#how-it-works">Demo</a>
        <a href="#special-offers">$1 Reserve</a>
      </div>
      <div>
        <strong>Transparent pretest</strong>
        <small>Production-in-progress. No finished-unit shipping claim yet.</small>
        <a className="footer-contact" href={`mailto:${SITE.contactEmail}`}>
          Contact: {SITE.contactEmail}
        </a>
      </div>
    </footer>
  );
}

function ThanksPage() {
  return (
    <main className="thanks-page">
      <section className="thanks-card">
        <a className="brand thanks-brand" href="/">
          <span className="brand-mark">K</span>
          <span>{SITE.name}</span>
        </a>
        <p className="section-kicker">Reservation received</p>
        <h1>You're in the Kastave Bank Angler Scout Program.</h1>
        <p>
          Thanks for backing the production-in-progress launch. We will use the early signal to
          prioritize field testing, launch timing, and reservation updates.
        </p>
        <a className="text-link" href="/">
          Back to Kastave
        </a>
      </section>
    </main>
  );
}

function PainPointCta({ open, onClose, onSubmit }) {
  const [selected, setSelected] = useState(BANK_PAIN_POINTS[0]);
  const [customAnswer, setCustomAnswer] = useState("");

  if (!open) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit({
      painPoint: formData.get("pain-point") || selected,
      customAnswer: String(formData.get("custom-answer") || customAnswer).trim(),
    });
  };

  return (
    <div className="pain-cta-backdrop" role="presentation">
      <section className="pain-cta-card" role="dialog" aria-modal="true" aria-labelledby="pain-cta-title">
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close pain point question">
          x
        </button>
        <p className="section-kicker">Quick question</p>
        <h2 id="pain-cta-title">What is your biggest pain point when fishing from the bank?</h2>
        <form onSubmit={submit}>
          <div className="pain-options">
            {BANK_PAIN_POINTS.map((point) => (
              <label className={selected === point ? "is-selected" : ""} key={point}>
                <input
                  type="radio"
                  name="pain-point"
                  value={point}
                  checked={selected === point}
                  onChange={() => setSelected(point)}
                />
                <span>{point}</span>
              </label>
            ))}
          </div>
          <label className="custom-answer">
            <span>Other / custom answer</span>
            <textarea
              name="custom-answer"
              value={customAnswer}
              onChange={(event) => setCustomAnswer(event.target.value)}
              placeholder="Tell us what slows you down on the bank..."
              rows="3"
            />
          </label>
          <div className="pain-cta-actions">
            <button className="checkout-button" type="submit">
              Submit and join waitlist
            </button>
            <button className="text-link" type="button" onClick={onClose}>
              Skip for now
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function CheckoutDialog({ open, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="dialog-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close dialog">
          x
        </button>
        <p className="section-kicker">Link needed</p>
        <h2 id="checkout-title">Add your live tools when accounts are ready.</h2>
        <p>
          Set the Vite environment variables for PayPal, Beehiiv, and the survey URL. The
          page already has the correct buttons and event tracking hooks.
        </p>
        <button className="primary-button dialog-action" type="button" onClick={onClose}>
          Got it
        </button>
      </section>
    </div>
  );
}

export default App;
