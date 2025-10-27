"use client";

import React from "react";

/**
 * VERITY — CITIZEN EDITION (Dark • High-Trust • Conversion-Grade)
 * v2.1 — fixed JSX escaping + cleaned Hero, added non-disruptive polish
 */

// ----------------------------------------------------------------
// Demo content (swap with CMS/Supabase later)
// ----------------------------------------------------------------
const PROBLEMS = [
  {
    icon: "🧭",
    title: "Media bias",
    body: "Most outlets push a side. Verity shows them all together.",
  },
  {
    icon: "🌀",
    title: "Information overload",
    body: "You shouldn’t need 10 tabs. We summarise what matters.",
  },
  {
    icon: "🎭",
    title: "Political spin",
    body: "We expose the language tricks so you can see reality.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Scan",
    body: "We read major news and Parliament records around the clock.",
  },
  {
    n: 2,
    title: "Compare",
    body: "We line up left, centre, and right on the same topic.",
  },
  {
    n: 3,
    title: "Reveal",
    body: "We show you the balanced picture — with sources & timestamps.",
  },
];

const TESTIMONIALS = [
  {
    name: "Jack — Sydney",
    quote:
      "The only news app that actually calms me down. I feel informed, not angry.",
  },
  {
    name: "Sarah — Perth",
    quote: "I stopped doomscrolling. The balance bar is a game-changer.",
  },
  {
    name: "Anita — Brisbane",
    quote:
      "I finally understand what’s going on without picking a side.",
  },
];

const ROTATING_TOPICS = ["Housing Crisis", "Cost of Living", "Energy Debate"];

// ----------------------------------------------------------------
// Hooks & helpers
// ----------------------------------------------------------------
const useToday = () => {
  const [txt, setTxt] = React.useState("");
  React.useEffect(() => {
    const d = new Date();
    setTxt(
      d.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    );
  }, []);
  return txt;
};

const useReveal = () => {
  React.useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            (e.target as HTMLElement).classList.add("reveal-in");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

// ----------------------------------------------------------------
// Primitives
// ----------------------------------------------------------------
const Glass: React.FC<{ className?: string }> = ({
  className = "",
  children,
}) => (
  <section
    data-reveal
    className={`reveal rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_50px_-12px_rgba(0,0,0,0.55)] ${className}`}
  >
    {children}
  </section>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px]">
    {children}
  </span>
);

const Stat: React.FC<{ n: string; label: string }> = ({ n, label }) => (
  <div className="text-center">
    <div className="text-3xl font-semibold tracking-tight">{n}</div>
    <div className="mt-1 text-xs text-white/70">{label}</div>
  </div>
);

const Aurora = () => (
  <div
    className="pointer-events-none absolute inset-0 -z-10"
    aria-hidden="true"
  >
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="f-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006"
            numOctaves="3"
            seed="9"
          >
            <animate
              attributeName="baseFrequency"
              dur="45s"
              values="0.004;0.006;0.005;0.004"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <linearGradient id="g-aur" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect
        x="-10"
        y="-10"
        width="120"
        height="120"
        fill="url(#g-aur)"
        filter="url(#f-noise)"
      />
    </svg>
    <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]">
      <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
    </div>
  </div>
);

// ----------------------------------------------------------------
// UI Bits
// ----------------------------------------------------------------
function ScrollProgress() {
  const [w, setW] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const t = document.documentElement;
      const max = t.scrollHeight - t.clientHeight;
      setW(max > 0 ? (t.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      style={{ width: `${w}%` }}
      className="fixed left-0 top-0 z-50 h-[2px] bg-emerald-400/80"
      aria-hidden="true"
    />
  );
}

const BiasChip: React.FC<{ value: number }> = ({ value }) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-2 py-1 text-[12px] text-emerald-200">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,.7)]" />
    Today’s bias: Centre {value}%
  </span>
);

const Avatar: React.FC<{ name: string }> = ({ name }) => (
  <div className="mr-2 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[12px] text-white/80">
    {name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)}
  </div>
);

/* --- Preview Cards for “See the whole picture” --- */
function SourceDot({ c }: { c: "left" | "centre" | "right" }) {
  const color =
    c === "left"
      ? "bg-rose-400"
      : c === "centre"
      ? "bg-emerald-400"
      : "bg-amber-400";
  return <span className={`h-2 w-2 rounded-full ${color}`} />;
}

function MiniBars() {
  return (
    <div className="mt-2 space-y-2">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 w-[34%] origin-left rounded-full bg-rose-400 animate-grow" />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 w-[46%] origin-left rounded-full bg-emerald-400 animate-grow" />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-2 w-[20%] origin-left rounded-full bg-amber-400 animate-grow" />
      </div>
    </div>
  );
}

function PreviewCard({
  title,
  desc,
  cta,
}: {
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_12px_40px_-16px_rgba(16,185,129,0.35)]">
      <div className="h-24 rounded-xl bg-[radial-gradient(120%_120%_at_0%_0%,rgba(16,185,129,.25),transparent_60%),radial-gradient(120%_120%_at_100%_0%,rgba(56,189,248,.25),transparent_60%)]" />
      <div className="mt-3 font-medium">{title}</div>
      <div className="mt-1 text-xs text-white/70">{desc}</div>
      <MiniBars />
      <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
        <SourceDot c="left" />
        <span>Left</span>
        <SourceDot c="centre" />
        <span>Centre</span>
        <SourceDot c="right" />
        <span>Right</span>
      </div>
      <button className="mt-3 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
        {cta}
      </button>
    </div>
  );
}

// ----------------------------------------------------------------
// Sections
// ----------------------------------------------------------------
function Header({
  active,
  onChange,
}: {
  active: string;
  onChange: (s: string) => void;
}) {
  const TABS = ["Home", "Stories", "Issues", "MPs", "Sources"];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f12]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-emerald-400 via-cyan-400 to-fuchsia-400 shadow-[0_0_16px_rgba(16,185,129,0.45)] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="text-lg font-semibold">Verity</div>
        </div>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
            How it works
          </button>
          <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-2 text-sm text-white">
            Start free
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-3">
        <div className="flex w-full items-center gap-2 overflow-auto rounded-xl border border-white/10 bg-white/5 p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                active === tab
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab}
              {active === tab && (
                <span className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const today = useToday();
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-16">
      <Aurora />
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-[46px] font-semibold leading-[1.1] tracking-tight md:text-[56px]">
          Finally — the news you can actually{" "}
          <span className="text-gradient">trust</span>.
          <span className="mx-auto mt-3 block h-[2px] w-48 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 opacity-70 animate-[pulse_3s_ease-in-out_infinite]" />
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[16px] text-white/95">
          We show how every side of politics covers the same issue — so you can
          see truth, not spin. Balanced. Verified. Calm.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-[15px] text-white shadow-[0_8px_30px_-10px_rgba(16,185,129,.6)]">
            See today’s stories — {today}
          </button>
          <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[15px] hover:bg-white/10">
            Join the waitlist
          </button>
        </div>
        <div className="mt-2 text-xs text-white/70">
          Balanced view from verified sources.
        </div>
        <div className="mt-4 flex items-center justify-center">
          <BiasChip value={42} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-white/80">
          <Pill>No outrage design</Pill>
          <Pill>Verified sources</Pill>
          <Pill>Bias transparency</Pill>
          <Pill>Privacy-respecting</Pill>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6 text-white/80">
          <Stat n="1.2k" label="topics monitored" />
          <Stat n="88%" label="AI validation rate" />
          <Stat n="24h" label="momentum tracking" />
        </div>
      </div>

      <Glass className="mx-auto mt-10 max-w-5xl p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <PreviewCard
            title="Compare sources"
            desc="Left, centre, right — lined up side by side."
            cta="Open demo"
          />
          <PreviewCard
            title="Track momentum"
            desc="See how narratives rise and fall through the day."
            cta="View chart"
          />
          <PreviewCard
            title="Verify claims"
            desc="Summaries with citations and timestamps."
            cta="See sources"
          />
        </div>
      </Glass>
    </section>
  );
}

function Problem() {
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-[13px] uppercase tracking-widest text-white/60">
          What’s broken
        </div>
        <h2 className="mt-1 text-[30px] font-semibold tracking-tight">
          News shouldn’t make you angry or confused.
        </h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {PROBLEMS.map((p) => (
          <Glass
            key={p.title}
            className="p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="text-2xl">{p.icon}</div>
            <div className="mt-2 text-lg font-semibold">{p.title}</div>
            <p className="mt-1 text-sm text-white/80">{p.body}</p>
          </Glass>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-[13px] uppercase tracking-widest text-white/60">
          How Verity works
        </div>
        <h2 className="mt-1 text-[30px] font-semibold tracking-tight">
          Simple steps. Clear results.
        </h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => (
          <Glass key={s.n} className="p-5">
            <div className="text-sm text-white/70">Step {s.n}</div>
            <div className="mt-1 text-lg font-semibold">{s.title}</div>
            <p className="mt-1 text-sm text-white/80">{s.body}</p>
          </Glass>
        ))}
      </div>
    </section>
  );
}

function LiveExample() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % ROTATING_TOPICS.length),
      6000
    );
    return () => clearInterval(id);
  }, []);
  const title = ROTATING_TOPICS[idx];
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4">
      <Glass className="p-6">
        <div className="mb-2 text-sm text-white/80">Today’s example</div>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <p className="mt-1 text-sm text-white/80">
              See how different sides talk about the same problem. We pull
              quotes and headlines, then show the balance clearly.
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Left</span>
                <span>34%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-2 w-[34%] origin-left rounded-full bg-rose-400 animate-grow" />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span>Centre</span>
                <span>46%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-2 w-[46%] origin-left rounded-full bg-emerald-400 animate-grow" />
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span>Right</span>
                <span>20%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-2 w-[20%] origin-left rounded-full bg-amber-400 animate-grow" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/70">Balanced snapshot</div>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-white/85">
              <li>Rents rose faster than wages in 8/10 regions.</li>
              <li>Builders warn supply bottlenecks; approvals down 12%.</li>
              <li>Targeted incentives gain crossbench interest.</li>
            </ul>
          </div>
        </div>
      </Glass>
    </section>
  );
}

function Voices() {
  return (
    <section className="mx-auto mt-14 max-w-7xl px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-[13px] uppercase tracking-widest text-white/60">
          What people say
        </div>
        <h2 className="mt-1 text-[30px] font-semibold tracking-tight">
          It feels calm, honest, and useful.
        </h2>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <Glass key={t.name} className="flex items-start p-5">
            <Avatar name={t.name.split("—")[0]} />
            <div>
              <div className="text-sm text-white/80">{t.name}</div>
              <p className="mt-1 text-[14px] leading-relaxed">
                “{t.quote}”
              </p>
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="mx-auto mt-12 max-w-7xl px-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/80">
        Supported by Australians — not advertisers. Verity never personalises
        or tracks your reading.
      </div>
    </section>
  );
}

function StickyCTA() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button className="rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-sm text-white shadow-[0_20px_50px_-12px_rgba(16,185,129,.6)]">
        See today’s stories
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-16 max-w-7xl px-4 pb-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
        <div className="text-2xl font-semibold">
          Join Australians who want to see clearly.
        </div>
        <p className="mt-1 text-sm text-white/80">
          Start free in under a minute. No credit card.
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3 text-[15px] text-white">
            Start free
          </button>
          <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[15px] hover:bg-white/10">
            Contact us
          </button>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-white/60">
        © Verity — See truth, not spin.
      </div>
    </footer>
  );
}

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------
export default function VerityCitizenEdition() {
  const [activeTab, setActiveTab] = React.useState("Home");
  useReveal();
  return (
    <div className="relative min-h-screen w-full bg-[#0b0f12] text-white">
      <ScrollProgress />
      <style>{`
        @keyframes shimmer {0%{transform:translateX(-100%)}100%{transform:translateX(100%)} }
        @keyframes grow {from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes gradientShift {0%{background-position:0% 50%} 100%{background-position:100% 50%} }
        .animate-grow{animation: grow 1.1s ease-in-out forwards}
        .reveal{opacity:0; transform: translateY(24px); transition:opacity .6s ease, transform .6s ease}
        .reveal-in{opacity:1; transform: translateY(0)}
        .text-gradient{background: linear-gradient(90deg, #10b981, #38bdf8, #a855f7); background-size:200% 100%; -webkit-background-clip:text; background-clip:text; color:transparent; animation: gradientShift 8s ease-in-out infinite alternate}
      `}</style>
      <Header active={activeTab} onChange={setActiveTab} />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <LiveExample />
        <Voices />
        <Privacy />
        <Footer />
      </main>
      <StickyCTA />
    </div>
  );
}
