export type SearchItem = { title: string; href: string; group?: string };
export const SEARCH_INDEX: SearchItem[] = [
  { title: "Home", href: "/" },
  { title: "Product", href: "/product", group: "Core" },
  { title: "Product — Ask", href: "/product#ask", group: "Modules" },
  { title: "Product — Search", href: "/product#search", group: "Modules" },
  { title: "Product — Bill tracker", href: "/product#bills", group: "Modules" },
  { title: "Product — MP profiles", href: "/product#mps", group: "Modules" },
  { title: "Product — Alerts & briefings", href: "/product#alerts", group: "Modules" },

  { title: "Pricing", href: "/pricing", group: "Core" },
  { title: "Join waitlist", href: "/join-waitlist", group: "Core" },
  { title: "Contact", href: "/contact", group: "Core" },

  { title: "Trust", href: "/trust", group: "Company" },
  { title: "Integrity", href: "/integrity", group: "Company" },
  { title: "Status", href: "/status", group: "Company" },
  { title: "Roadmap", href: "/roadmap", group: "Company" },

  { title: "Blog", href: "/blog", group: "Resources" },
  { title: "Blog — RSS", href: "/blog/rss.xml", group: "Resources" },
  { title: "Blog — JSON Feed", href: "/feed.json", group: "Resources" },
  { title: "Case studies", href: "/case-studies", group: "Resources" },
  { title: "Compare — TheyVoteForYou", href: "/compare/theyvoteforme", group: "Resources" },
  { title: "Developers", href: "/developers", group: "Resources" },
  { title: "Developers — API Keys", href: "/developers/api-keys", group: "Resources" },

  { title: "MP profiles", href: "/mps", group: "Data" },
  { title: "Explainer — Privacy Amendment 2025", href: "/explainer/privacy-amendment-2025", group: "Data" },
  { title: "Your MP (postcode)", href: "/your-mp", group: "Data" },
  { title: "Watchlist", href: "/watchlist", group: "Data" },
  { title: "Change & Diff", href: "/diff", group: "Data" },
  { title: "Media monitor", href: "/media", group: "Data" },

  { title: "Legal — Terms", href: "/legal/terms", group: "Legal" },
  { title: "Legal — Privacy", href: "/legal/privacy", group: "Legal" },
  { title: "Legal — Cookies", href: "/legal/cookies", group: "Legal" },

  { title: "Changelog", href: "/changelog", group: "Meta" },
  { title: "Changelog — RSS", href: "/changelog/rss.xml", group: "Meta" },

  { title: "Embeds — Bill", href: "/embed/bill/privacy-amendment-2025", group: "Embeds" },
  { title: "Embeds — MP", href: "/embed/mp/doe-anne", group: "Embeds" }
];
