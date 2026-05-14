export const SITE = {
  name: "Kastave",
  programName: "Kastave Bank Angler Scout Program",
  domain: "https://kastave.com",
  contactEmail: "Kastave@proton.me",
  priceRange: "$600-$800 target product range",
  paypalPaymentLink: import.meta.env.VITE_PAYPAL_PAYMENT_LINK || "",
  beehiivFormUrl: import.meta.env.VITE_BEEHIIV_FORM_URL || "",
  surveyUrl: import.meta.env.VITE_SURVEY_URL || "",
};

export const ANNOUNCEMENT =
  "Join the Kastave Bank Angler Scout Program for early updates, seed-user access, and launch-credit details.";

export const HERO = {
  eyebrow: "Kastave Bank Angler Scout Program",
  title: "Scout First. Cast Smarter.",
  body: "A smart RC scout boat for bank anglers: go manual or autonomous, map the underwater terrain, and mark likely fish-holding spots before your first cast.",
  note: "Join the waitlist for field-test updates, or reserve an early scout spot for $1.",
};

export const BANK_PAIN_POINTS = [
  "I cannot see underwater terrain from the bank",
  "I do not know where fish are holding",
  "Bank access limits the water I can scout",
  "My first cast is mostly guessing",
  "Carrying extra gear is a pain",
];

export const TRUST = {
  rating: "4.3 / 5 target launch benchmark",
  note: "Seed-user reservations, field-test updates, and transparent production progress.",
};

export const SCENARIOS = [
  {
    label: "Ponds",
    detail: "Scout shallow shelves, soft bottom, and small cover before you commit your first cast.",
  },
  {
    label: "Reservoir Banks",
    detail: "Find contour changes, hard transitions, and high-probability stretches from shore.",
  },
  {
    label: "Riprap",
    detail: "Read depth breaks and rock edges instead of guessing where bait and bass are holding.",
  },
  {
    label: "Grass Edges",
    detail: "Map the outside edge, openings, and pockets before working a long bank blind.",
  },
  {
    label: "Docks & Laydowns",
    detail: "Inspect shade, limbs, posts, and nearby depth so your first cast has a reason.",
  },
  {
    label: "Unknown Public Access",
    detail: "Scout unfamiliar water quickly and decide whether the spot deserves more time.",
  },
];

export const COMPARISON_ROWS = [
  {
    factor: "Depth",
    blind: "Guess from bank slope and visible clues",
    scout: "Build a shoreline scan plan before casting",
  },
  {
    factor: "Cover",
    blind: "Fish what you can see above the surface",
    scout: "Map structure targets below the surface",
  },
  {
    factor: "Fish Activity",
    blind: "Rely on timing, luck, and second-hand reports",
    scout: "Watch for activity signals that shape the route",
  },
  {
    factor: "First Cast",
    blind: "Start with instinct and adjust after misses",
    scout: "Choose a higher-confidence target first",
  },
];

export const PRODUCTS = [
  {
    name: "Kastave Scout",
    label: "Waitlist open",
    originalPrice: "$699",
    price: "Early access",
    sub: "$1 reservation available below",
  },
  {
    name: "Kastave Scout Pro",
    label: "Planned",
    originalPrice: "$799",
    price: "$749 est.",
    sub: "Longer range package",
  },
  {
    name: "Kastave Starter",
    label: "Planned",
    originalPrice: "$599",
    price: "$599 est.",
    sub: "Core sonar scout",
  },
  {
    name: "Kastave App Premium",
    label: "Software",
    originalPrice: "$9.99",
    price: "$0.99 trial",
    sub: "Maps and AI strategy",
  },
];

export const ACCESSORIES = [
  { name: "Waterproof Carry Case", price: "Planned add-on" },
  { name: "Battery Pack", price: "Planned add-on" },
  { name: "Bank Launch Tether", price: "Planned add-on" },
  { name: "Protective Hull Cover", price: "Planned add-on" },
  { name: "Phone Mount Kit", price: "Planned add-on" },
  { name: "Fast Charger", price: "Planned add-on" },
];

export const HOTSPOTS = [
  {
    label: "Carry handle",
    detail: "Integrated grip for bank missions and quick shoreline moves.",
    x: 54,
    y: 21,
  },
  {
    label: "Status light bar",
    detail: "Clear signal feedback for power, GPS, sonar, and connection state.",
    x: 36,
    y: 44,
  },
  {
    label: "Power button",
    detail: "One-touch startup designed for wet hands or gloves.",
    x: 50,
    y: 35,
  },
  {
    label: "Sonar module",
    detail: "High-clarity imaging for depth, terrain, fish activity, and cover.",
    x: 50,
    y: 73,
  },
  {
    label: "Protected propulsion",
    detail: "Guarded thrust hardware for weeds, shallow banks, and rough retrievals.",
    x: 83,
    y: 59,
  },
];

export const PROCESS_STEPS = [
  {
    label: "Search",
    title: "Scout the shoreline route.",
    body: "Run a smart search path around grass edges, riprap, docks, and laydowns before you commit to a pattern.",
  },
  {
    label: "Understand",
    title: "Read the water below.",
    body: "Build a usable picture of depth changes, hard cover, bait, fish activity, and water-condition clues.",
  },
  {
    label: "Cast",
    title: "Choose the highest-probability target.",
    body: "Turn the scan into a practical cast zone, presentation direction, and next move.",
  },
];

export const CAPABILITIES = [
  {
    title: "3D Terrain Maps",
    body: "Rebuild drops, humps, grass edges, brush, rocks, and bank transitions.",
  },
  {
    title: "Fish Activity",
    body: "Spot bait movement, fish position, and activity clues that shape the first cast.",
  },
  {
    title: "Water Conditions",
    body: "Combine temperature, clarity, oxygen, pressure, and local water clues.",
  },
  {
    title: "AI Strategy",
    body: "Translate structure and conditions into target zones and cast recommendations.",
  },
];

export const PRODUCT_HIGHLIGHTS = [
  {
    title: "Portable",
    body: "Fits inside a fishing tackle box so bank anglers can carry it with normal shore gear.",
  },
  {
    title: "Bank-side control",
    body: "Deploy and control the unmanned scout boat from the shoreline instead of needing a full-size boat.",
  },
  {
    title: "3D underwater reconstruction",
    body: "Scan terrain in about 5 seconds and rebuild the underwater shape into a usable 3D view.",
  },
  {
    title: "AI spot marking",
    body: "Identify 3D terrain features and mark likely fish-holding spots before you commit the first cast.",
  },
];

export const HIGHLIGHT_CAROUSEL = [
  {
    step: "01",
    image: "recognition",
    title: "Pack it in your tackle box",
    body: "Carry the scout with the gear you already bring to the bank, without adding a full boat setup.",
  },
  {
    step: "02",
    image: "hero",
    title: "Launch from the bank",
    body: "Control the unmanned scout boat from shore and inspect water you cannot read by sight.",
  },
  {
    step: "03",
    image: "process",
    title: "Scan 3D terrain in seconds",
    body: "Run a quick scan and turn the underwater shape into a 3D view before choosing a cast lane.",
  },
  {
    step: "04",
    image: "recognition",
    title: "AI marks likely holding spots",
    body: "Use terrain recognition to flag likely cover, breaks, and fish-holding points before your first cast.",
  },
];

export const OFFER_ITEMS = [
  "$100 launch credit toward your first Kastave",
  "Production progress and field-test updates",
  "Priority access when early units become available",
  "Production-in-progress: not a finished-unit shipping claim",
];

export const FAQS = [
  {
    question: "Is this a finished product?",
    answer:
      "No. Kastave is production-in-progress. This program collects seed-user demand, fishing scenarios, and early reservations before any finished-unit shipping claim.",
  },
  {
    question: "Is the $1 refundable?",
    answer:
      "No. The $1 is a non-refundable early reservation deposit. It signals real interest and unlocks a $100 launch credit for your first Kastave purchase.",
  },
  {
    question: "Is Kastave already shipping?",
    answer:
      "Not yet. Kastave is production-in-progress. The page is for early reservations, seed-user learning, and product updates before launch.",
  },
  {
    question: "Who is Kastave for?",
    answer:
      "Exploratory bass bank anglers who fish unfamiliar lakes, reservoirs, ponds, riprap, grass edges, docks, laydowns, and public shore access.",
  },
  {
    question: "What will the final product cost?",
    answer:
      "The current target range is $600-$800. Early reservation holders receive a $100 launch credit toward their first unit.",
  },
  {
    question: "What happens after I reserve?",
    answer:
      "You will be directed to a short seed-user survey and added to the early update flow once the email tool is connected.",
  },
];
