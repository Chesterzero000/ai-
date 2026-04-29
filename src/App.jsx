import React, { useEffect, useState } from "react";
import {
  ACCESSORIES,
  ANNOUNCEMENT,
  CAPABILITIES,
  CATEGORY_LINKS,
  FAQS,
  HERO,
  HOTSPOTS,
  OFFER_ITEMS,
  PROCESS_STEPS,
  PRODUCTS,
  SITE,
  TRUST,
} from "./content.js";
import { initAnalytics, trackEvent, withUtm } from "./tracking.js";
import heroImage from "../assets/kastave-new-hero.png";
import processImage from "../assets/kastave-new-process.png";
import productImage from "../assets/kastave-product-real.jpg";
import recognitionImage from "../assets/kastave-new-recognition.png";
import valueImage from "../assets/kastave-new-value.png";

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");
  const isThanksPage = window.location.pathname === "/thanks";

  useEffect(() => {
    initAnalytics();
  }, []);

  const reserveWithStripe = (source = "unknown") => {
    trackEvent("stripe_reserve_click", { source });

    if (SITE.stripePaymentLink) {
      window.location.href = withUtm(SITE.stripePaymentLink);
      return;
    }

    setDialogOpen(true);
  };

  const reserveWithPaypal = (source = "unknown") => {
    trackEvent("paypal_reserve_click", { source });

    if (SITE.paypalPaymentLink) {
      window.location.href = withUtm(SITE.paypalPaymentLink);
      return;
    }

    setDialogOpen(true);
  };

  const subscribe = (email, source = "inline_form") => {
    trackEvent("email_signup_submit", { source });

    if (SITE.beehiivFormUrl) {
      window.location.href = withUtm(SITE.beehiivFormUrl);
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem("kastave_subscribers") || "[]");
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem("kastave_subscribers", JSON.stringify(subscribers));
    }

    setSignupMessage("You're on the Kastave early list.");
  };

  const openSurvey = (source = "unknown") => {
    trackEvent("survey_click", { source });

    if (SITE.surveyUrl) {
      window.open(withUtm(SITE.surveyUrl), "_blank", "noopener,noreferrer");
      return;
    }

    setDialogOpen(true);
  };

  if (isThanksPage) {
    return <ThanksPage onSurvey={() => openSurvey("thanks_page")} />;
  }

  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main>
        <Hero onStripe={() => reserveWithStripe("hero")} />
        <TrustBar />
        <CategoryNav />
        <ProductGrid onStripe={() => reserveWithStripe("product_grid")} />
        <InteractiveProductVisual />
        <ProcessVisual />
        <CapabilityCards />
        <Accessories onAdd={() => setDialogOpen(true)} />
        <Compare onCompare={() => openSurvey("compare")} />
        <Offer
          onStripe={() => reserveWithStripe("offer")}
          onPaypal={() => reserveWithPaypal("offer")}
          onSurvey={() => openSurvey("offer")}
          message={signupMessage}
        />
        <FAQ />
      </main>
      <Footer onSubscribe={subscribe} />
      <CheckoutDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}

function AnnouncementBar() {
  return <div className="announcement">{ANNOUNCEMENT}</div>;
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  const navItems = ["Products", "Accessories", "How It Works", "Support", "Compare"];

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
          <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <div className="nav-actions" aria-label="Store actions">
        <button type="button" aria-label="Search">
          Search
        </button>
        <button type="button" aria-label="Account">
          Account
        </button>
        <button type="button" aria-label="Shopping bag">
          Bag
        </button>
      </div>
    </header>
  );
}

function Hero({ onStripe }) {
  return (
    <section className="hero commerce-hero" aria-labelledby="hero-title">
      <img className="hero-image" src={heroImage} alt="Kastave fish finder boat scanning a shoreline" />
      <div className="hero-scrim" />
      <div className="hero-content hero-centered">
        <p className="eyebrow">{HERO.eyebrow}</p>
        <h1 id="hero-title">{HERO.title}</h1>
        <p className="hero-copy">{HERO.body}</p>
        <div className="hero-actions" id="reserve">
          <button className="primary-button buy-button" type="button" onClick={onStripe}>
            Buy Now
            <span>Reserve for $1</span>
          </button>
          <a className="secondary-link" href="#compare">
            Compare Products
          </a>
        </div>
        <p className="microcopy">{HERO.note}</p>
      </div>
    </section>
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

function CategoryNav() {
  return (
    <section className="category-strip" aria-label="Product categories">
      {CATEGORY_LINKS.map((item) => (
        <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
          <span className="category-icon">⌁</span>
          <span>{item}</span>
        </a>
      ))}
    </section>
  );
}

function ProductGrid({ onStripe }) {
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
            <img src={productImage} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.sub}</p>
            <div className="price-line">
              <s>{product.originalPrice}</s>
              <strong>{product.price}</strong>
            </div>
            <button type="button" onClick={onStripe}>
              Buy Now
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

function EmailForm({ id = "email", onSubscribe }) {
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
      <button type="submit">Join updates</button>
    </form>
  );
}

function ProcessVisual() {
  const [active, setActive] = useState(PROCESS_STEPS[0].label);

  return (
    <section className="process-section" id="how-it-works">
      <div className="section-heading">
        <p className="section-kicker">How it works?</p>
        <h2>Search. Understand. Cast.</h2>
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

function CapabilityCards() {
  const [active, setActive] = useState(CAPABILITIES[0].title);

  return (
    <section className="capabilities" id="features">
      <div className="section-inner two-column">
        <div className="capability-image">
          <img src={recognitionImage} alt="Kastave recognition visual" />
        </div>
        <div>
          <p className="section-kicker">Uncover the details</p>
          <h2>Find what matters under your favorite waters.</h2>
          <div className="capability-list">
            {CAPABILITIES.map((capability) => (
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
    </section>
  );
}

function Accessories({ onAdd }) {
  return (
    <section className="accessories" id="accessories">
      <div className="section-heading">
        <p className="section-kicker">Accessories</p>
        <h2>Build the bank-ready kit.</h2>
      </div>
      <div className="accessory-grid">
        {ACCESSORIES.map((item) => (
          <article className="accessory-card" key={item.name}>
            <img src={productImage} alt={item.name} />
            <h3>{item.name}</h3>
            <strong>{item.price}</strong>
            <button type="button" onClick={onAdd}>
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Compare({ onCompare }) {
  return (
    <section className="compare-band" id="compare">
      <div>
        <p className="section-kicker">Product guide</p>
        <h2>Wondering which product is best for you?</h2>
        <p>
          Compare the launch reservation, planned starter package, and Pro direction before you
          commit.
        </p>
      </div>
      <button className="primary-button" type="button" onClick={onCompare}>
        Compare Products
      </button>
    </section>
  );
}

function Offer({ onStripe, onPaypal, onSurvey, message }) {
  return (
    <section className="offer" id="special-offers">
      <div className="offer-copy">
        <p className="section-kicker">Special offer</p>
        <h2>Pay $1 now. Get $100 off your first Kastave.</h2>
        <p>
          This is a real non-refundable early reservation deposit for anglers who want Kastave to
          exist. It helps prioritize production decisions and builds the first seed-user group.
        </p>
        <button className="text-link" type="button" onClick={onSurvey}>
          Answer the seed-user survey
        </button>
      </div>

      <div className="checkout-panel" aria-live="polite">
        <div className="price-row">
          <span>$1</span>
          <small>non-refundable reservation</small>
        </div>
        <ul>
          {OFFER_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button className="checkout-button" type="button" onClick={onStripe}>
          Reserve with Stripe
        </button>
        <button className="paypal-button" type="button" onClick={onPaypal}>
          PayPal backup
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

function Footer({ onSubscribe }) {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand" href="/">
          <span className="brand-mark">K</span>
          <span>{SITE.name}</span>
        </a>
        <p>AI fish-finding hardware for exploratory bass bank anglers.</p>
      </div>
      <div className="footer-links">
        <a href="#support">Support</a>
        <a href="#compare">Compare</a>
        <a href="#accessories">Accessories</a>
      </div>
      <div>
        <strong>Get product updates</strong>
        <EmailForm id="footer-email" onSubscribe={(email) => onSubscribe(email, "footer")} />
        <small>US · USD · Instagram · TikTok · YouTube</small>
      </div>
    </footer>
  );
}

function ThanksPage({ onSurvey }) {
  return (
    <main className="thanks-page">
      <section className="thanks-card">
        <a className="brand thanks-brand" href="/">
          <span className="brand-mark">K</span>
          <span>{SITE.name}</span>
        </a>
        <p className="section-kicker">Reservation received</p>
        <h1>You're on the early Kastave list.</h1>
        <p>
          Thanks for backing the production-in-progress launch. The next useful step is a short
          seed-user survey so we know the water, gear, and fishing style you care about most.
        </p>
        <button className="primary-button" type="button" onClick={onSurvey}>
          Open seed-user survey
          <span>2-3 minutes</span>
        </button>
        <a className="text-link" href="/">
          Back to Kastave
        </a>
      </section>
    </main>
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
          Set the Vite environment variables for Stripe, PayPal, Beehiiv, and the survey URL. The
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
