export const SITE = {
  name: "Kastave",
  domain: "https://kastave.com",
  priceRange: "$600-$800 target product range",
  stripePaymentLink: import.meta.env.VITE_STRIPE_PAYMENT_LINK || "",
  paypalPaymentLink: import.meta.env.VITE_PAYPAL_PAYMENT_LINK || "",
  beehiivFormUrl: import.meta.env.VITE_BEEHIIV_FORM_URL || "",
  surveyUrl: import.meta.env.VITE_SURVEY_URL || "",
};

export const ANNOUNCEMENT =
  "Early reservation is open: pay $1 today and receive $100 launch credit toward your first Kastave.";

export const HERO = {
  eyebrow: "New AI fish finder for exploratory bass bank anglers",
  title: "3D Shoreline Mapping Is Finally Portable.",
  body: "Meet Kastave, a rugged unmanned fish-finding scout built to search unfamiliar bank water, rebuild underwater terrain, read fish and water signals, and recommend the next cast.",
  note: "$1 is a non-refundable early reservation deposit. It unlocks a $100 launch credit.",
};

export const TRUST = {
  rating: "4.3 / 5 target launch benchmark",
  note: "Seed-user reservations, field-test updates, and transparent production progress.",
};

export const CATEGORY_LINKS = [
  "Special Offers",
  "Flagship Product",
  "Pro Series",
  "Starter Product",
  "Accessories",
  "App",
  "Compare",
];

export const PRODUCTS = [
  {
    name: "Kastave Scout",
    label: "Early reservation",
    originalPrice: "$699",
    price: "$1 today",
    sub: "$100 launch credit",
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
  { name: "Waterproof Carry Case", price: "$49" },
  { name: "Battery Pack", price: "$69" },
  { name: "Bank Launch Tether", price: "$19" },
  { name: "Protective Hull Cover", price: "$29" },
  { name: "Phone Mount Kit", price: "$24" },
  { name: "Fast Charger", price: "$39" },
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

export const OFFER_ITEMS = [
  "$100 launch credit toward your first Kastave",
  "Production progress and field-test updates",
  "Priority access when early units become available",
  "Seed-user survey access to shape the product",
];

export const FAQS = [
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
