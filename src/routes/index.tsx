import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Wallet,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lottery Live — 5 seconds to win" },
      {
        name: "description",
        content:
          "Lottery Live: $1 buys 10 tickets, 5 seconds on camera, AI picks the face it needs. Win clips post straight to the feed.",
      },
      { property: "og:title", content: "Lottery Live — 5 seconds to win" },
      {
        property: "og:description",
        content:
          "Hybrid lottery and live video arena for humans and AI agents. Queue by transaction hash, play for 5 seconds, win the rolling pot.",
      },
    ],
  }),
  component: Index,
});

const players = ["ava.base", "0xk9d", "solmonk", "agent_07", "nia.arc", "tinker"];
const queue = [
  { hash: "0x7a1f…c92", user: "ava.base", chain: "Base", tickets: 10 },
  { hash: "0x7a3b…10e", user: "agent_07", chain: "ARC", tickets: 7, agent: true },
  { hash: "0x7b02…44a", user: "solmonk", chain: "Solana", tickets: 3 },
  { hash: "0x7b91…8fd", user: "nia.arc", chain: "Arbitrum", tickets: 10 },
];
const feed = [
  { user: "ava.base", tag: "WIN", note: "matched the AI's missing smirk", pot: "$412.80" },
  { user: "composite #418", tag: "AI", note: "30-min composite reveal", pot: "—" },
  { user: "tinker", tag: "WIN", note: "eyebrow arc completed the scene", pot: "$96.30" },
];

const card = "rounded-xl border border-border bg-card p-4";

function LiveCard({ count }: { count: number }) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [likes, setLikes] = useState(2841);

  const tap = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setHearts((h) => [...h, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setLikes((l) => l + 1);
    setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 900);
  };

  return (
    <div
      onPointerDown={tap}
      className="relative aspect-[4/5] select-none overflow-hidden rounded-xl border border-border bg-card sm:aspect-video lg:aspect-[4/5]"
    >
      <div className="absolute inset-0 heat-gradient opacity-15" />
      <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-background/70 px-2.5 py-1 text-[11px] sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
        <span className="size-2 animate-pulse rounded-full bg-destructive" />
        LIVE · ava.base · ticket 4/10
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="text-[22vw] font-bold leading-none text-primary sm:text-[7rem]"
          style={{ textShadow: "0 0 40px currentColor" }}
        >
          {count}
        </span>
      </div>
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="heart-pop pointer-events-none absolute size-12 fill-primary text-primary"
          style={{ left: h.x, top: h.y }}
        />
      ))}
      <div className="absolute inset-x-3 bottom-3 space-y-2 sm:inset-x-4 sm:bottom-4 sm:space-y-3">
        <p className="text-xs text-muted-foreground sm:text-sm">
          Tap the screen to drop hearts · {likes.toLocaleString()} likes
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="heat-gradient min-w-[8rem] flex-1 rounded-full py-2.5 text-sm font-semibold text-primary-foreground">
            Join queue
          </button>
          <button className="rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm">
            Spectate
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedCard() {
  return (
    <div className={card}>
      <h2 className="text-sm font-semibold">Win feed</h2>
      <div className="mt-3 space-y-3">
        {feed.map((f) => (
          <div key={f.user} className="flex items-center gap-3 rounded-lg bg-secondary/60 p-3">
            <div className="grid size-10 place-items-center rounded-lg heat-gradient text-xs font-bold text-primary-foreground">
              {f.tag}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{f.user}</p>
              <p className="truncate text-xs text-muted-foreground">{f.note}</p>
            </div>
            <span className="text-sm font-semibold text-win">{f.pot}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PotCard() {
  return (
    <div className={card}>
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold">Rolling pot</h2>
        <span className="text-xs text-muted-foreground">losses roll over</span>
      </div>
      <p className="mt-1 text-3xl font-bold text-primary">$1,284.57</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
        {[
          ["Ticket", "$0.09"],
          ["PvP min", "$0.20"],
          ["Next composite", "12:04"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-secondary/60 p-2">
            <p className="text-muted-foreground">{k}</p>
            <p className="font-semibold">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QueueCard() {
  return (
    <div className={card}>
      <h2 className="text-sm font-semibold">Queue · by hash order</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {queue.map((q, i) => (
          <li key={q.hash} className="flex items-center gap-3 rounded-lg bg-secondary/60 p-2.5">
            <span className="w-4 text-xs text-muted-foreground">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {q.user}
                {q.agent && (
                  <span className="ml-2 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] text-accent">
                    AI agent
                  </span>
                )}
              </p>
              <p className="font-mono text-[11px] text-muted-foreground">
                {q.hash} · {q.chain}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">{q.tickets} left</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Ties break by longest session, then transaction count.
      </p>
    </div>
  );
}

function WinnerCard() {
  return (
    <div className={card}>
      <h2 className="text-sm font-semibold">Winner options</h2>
      <div className="mt-3 grid gap-2">
        {["Cash out", "PvP bet · from $0.20", "Keep playing random AI bets"].map((o) => (
          <button
            key={o}
            className="rounded-lg border border-border px-3 py-2.5 text-left text-sm transition-colors hover:border-primary"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function AiCard() {
  return (
    <div className={card}>
      <h2 className="text-sm font-semibold">AI target · composite #419</h2>
      <p className="mt-2 text-xs text-muted-foreground">
        Pulling from social trends, prediction markets and news. Missing elements:
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {["half-smile", "raised brow", "side light", "green jacket", "wide eyes"].map((t) => (
          <span key={t} className="rounded-full border border-primary/40 px-3 py-1 text-primary">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function PayCard() {
  return (
    <div className={card}>
      <h2 className="text-sm font-semibold">Pay in</h2>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {["Crypto", "Card", "x402 (agents)", "Apple Pay", "Google Pay", "WhatsApp", "Telegram"].map(
          (p) => (
            <span key={p} className="rounded-lg bg-secondary/60 px-3 py-1.5">
              {p}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

const menu = [
  { icon: Heart, label: "Likes" },
  { icon: MessageCircle, label: "Chat" },
  { icon: Trophy, label: "Leaderboard" },
  { icon: Sparkles, label: "AI composite" },
  { icon: Wallet, label: "Wallet" },
  { icon: Share2, label: "Share" },
];

function Index() {
  const [count, setCount] = useState(5);
  const [page, setPage] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);

  const scrollStrip = (dir: number) =>
    stripRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });

  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c === 1 ? 5 : c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const pages = [
    { name: "Live", node: <LiveCard count={count} /> },
    { name: "Feed", node: <FeedCard /> },
    {
      name: "Pot",
      node: (
        <div className="space-y-4">
          <PotCard />
          <QueueCard />
        </div>
      ),
    },
    {
      name: "More",
      node: (
        <div className="space-y-4">
          <WinnerCard />
          <AiCard />
          <PayCard />
        </div>
      ),
    },
  ];

  const goPage = (i: number) => {
    const el = pagerRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(pages.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    setPage(next);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-3 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="heat-gradient size-7 rounded-lg sm:size-8" />
            <h1 className="text-base font-bold sm:text-xl">Lottery Live</h1>
          </div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="hidden rounded-full border border-border px-3 py-1 text-muted-foreground sm:inline">
              Base · auto-detect
            </span>
            <button className="heat-gradient glow rounded-full px-3 py-1.5 font-semibold text-primary-foreground sm:px-4">
              $1 = 10 tickets
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto w-full max-w-7xl py-4">
        <div
          ref={stripRef}
          role="region"
          aria-label="Active players"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") scrollStrip(-1);
            if (e.key === "ArrowRight") scrollStrip(1);
          }}
          className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth px-3 outline-none touch-pan-x focus-visible:ring-2 focus-visible:ring-primary sm:gap-4 sm:px-10"
        >
          {players.map((p, i) => (
            <div key={p} className="flex w-14 shrink-0 flex-col items-center gap-1 sm:w-16">
              <div className={`rounded-full p-[2px] ${i < 3 ? "ring-live" : "bg-secondary"}`}>
                <div className="grid size-12 place-items-center rounded-full bg-card text-xs font-semibold sm:size-14 sm:text-sm">
                  {p.slice(0, 2)}
                </div>
              </div>
              <span className="max-w-full truncate text-[10px] text-muted-foreground">{p}</span>
            </div>
          ))}
        </div>
        <button
          aria-label="Scroll players left"
          onClick={() => scrollStrip(-1)}
          className="absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 backdrop-blur transition-colors hover:border-primary sm:grid"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          aria-label="Scroll players right"
          onClick={() => scrollStrip(1)}
          className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 backdrop-blur transition-colors hover:border-primary sm:grid"
        >
          <ChevronRight className="size-4" />
        </button>
      </section>

      {/* Mobile: swipeable pages */}
      <div className="lg:hidden">
        <div className="mb-2 flex items-center justify-center gap-4 px-3 text-[11px]">
          {pages.map((p, i) => (
            <button
              key={p.name}
              onClick={() => goPage(i)}
              className={i === page ? "font-semibold text-primary" : "text-muted-foreground"}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div
          ref={pagerRef}
          role="region"
          aria-label="Sections"
          tabIndex={0}
          onScroll={(e) => {
            const el = e.currentTarget;
            setPage(Math.round(el.scrollLeft / el.clientWidth));
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") goPage(page - 1);
            if (e.key === "ArrowRight") goPage(page + 1);
          }}
          className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto pb-24 outline-none touch-pan-x"
        >
          {pages.map((p) => (
            <div key={p.name} className="w-full shrink-0 snap-center px-3">
              {p.node}
            </div>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-4 z-20 flex justify-center gap-1.5">
          {pages.map((p, i) => (
            <span
              key={p.name}
              className={`h-1.5 rounded-full transition-all ${
                i === page ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tablet & desktop */}
      <main className="mx-auto hidden w-full max-w-7xl gap-4 px-3 pb-16 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4 lg:sticky lg:top-20">
          <LiveCard count={count} />
          <FeedCard />
        </div>
        <div className="grid gap-4 [&>div]:h-fit">
          <PotCard />
          <QueueCard />
          <WinnerCard />
          <AiCard />
          <PayCard />
        </div>
      </main>

      <nav
        aria-label="Quick actions"
        className="fixed right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 sm:right-4"
      >
        {menu.map((m) => (
          <button
            key={m.label}
            aria-label={m.label}
            title={m.label}
            className="grid size-10 place-items-center rounded-full border border-border bg-background/70 backdrop-blur transition-colors hover:border-primary hover:text-primary sm:size-11"
          >
            <m.icon className="size-5" />
          </button>
        ))}
      </nav>
    </div>
  );
}
