import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Check,
  ChevronRight,
  CircleDollarSign,
  Copy,
  Heart,
  Home,
  MessageCircle,
  Send,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chain Gang — Five seconds to win" },
      { name: "description", content: "Enter the live Chain Gang draw, follow the queue, and chase the rolling pot." },
      { property: "og:title", content: "Chain Gang — Five seconds to win" },
      { property: "og:description", content: "Enter the live Chain Gang draw, follow the queue, and chase the rolling pot." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
const activity = [
  { user: "ava.base", text: "matched the missing smirk", amount: "+$412.80", kind: "WIN" },
  { user: "agent_07", text: "joined with 7 tickets", amount: "", kind: "AI" },
  { user: "tinker", text: "completed the eyebrow arc", amount: "+$96.30", kind: "WIN" },
];

function Panel({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`border-b border-border bg-card px-4 py-5 sm:rounded-lg sm:border ${className}`}>{children}</section>;
}

function Index() {
  const [count, setCount] = useState(5);
  const [selectedPlayer, setSelectedPlayer] = useState("ava.base");
  const [queued, setQueued] = useState(false);
  const [watching, setWatching] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(2841);
  const [payment, setPayment] = useState("Crypto");
  const [winnerOption, setWinnerOption] = useState("Cash out");
  const [notice, setNotice] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState(["ava.base: Five seconds. Make it count.", "solmonk: That pot is moving!"]);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2600);
  };

  useEffect(() => {
    const timer = setInterval(() => setCount((value) => (value === 1 ? 5 : value - 1)), 1000);
    return () => {
      clearInterval(timer);
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const sendChat = () => {
    const clean = chat.trim();
    if (!clean) return;
    setMessages((current) => [...current, `you: ${clean}`]);
    setChat("");
    notify("Message sent");
  };
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "Chain Gang", text: "Five seconds to win.", url: window.location.href });
      else await navigator.clipboard.writeText(window.location.href);
      notify("Share link ready");
    } catch {
      notify("Share cancelled");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground sm:pb-8">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
          <button onClick={() => scrollTo("live")} className="flex min-w-0 items-center gap-3 text-left" aria-label="Go to live draw">
            <span className="relative grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-vault">CG</span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground"><span className="size-1.5 animate-pulse rounded-full bg-live" /> Live draw</span>
              <span className="block truncate font-display text-lg font-bold">CHAIN GANG</span>
            </span>
          </button>
          <Button variant="vaultOutline" size="sm" onClick={() => notify("Wallet connection is ready for setup")}><Wallet /> Connect</Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl sm:px-4 sm:pt-4">
        <section aria-label="Active players" className="scrollbar-hide flex gap-4 overflow-x-auto border-b border-border px-4 py-4 sm:rounded-lg sm:border sm:bg-card">
          {players.map((player, index) => (
            <button key={player} onClick={() => { setSelectedPlayer(player); notify(`Watching ${player}`); }} className="group flex w-14 shrink-0 flex-col items-center gap-1.5" aria-pressed={selectedPlayer === player}>
              <span className={`grid size-12 place-items-center rounded-full border-2 text-xs font-bold transition-transform group-active:scale-95 ${selectedPlayer === player ? "border-primary bg-primary text-primary-foreground" : index < 3 ? "border-live bg-secondary" : "border-border bg-secondary"}`}>{player.slice(0, 2).toUpperCase()}</span>
              <span className="w-full truncate text-[10px] text-muted-foreground">{player}</span>
            </button>
          ))}
        </section>

        <div className="grid gap-4 sm:mt-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
          <div className="min-w-0 space-y-4">
            <section id="live" className="relative min-h-[560px] overflow-hidden border-b border-border bg-card sm:min-h-[680px] sm:rounded-lg sm:border">
              <div className="vault-radial absolute inset-0" />
              <div className="relative flex min-h-[560px] flex-col p-4 sm:min-h-[680px] sm:p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0"><p className="text-xs font-bold uppercase text-primary">On camera now</p><h1 className="truncate font-display text-2xl font-bold">{selectedPlayer}</h1></div>
                  <button onClick={() => notify("12,432 people are watching")} className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-xs font-semibold"><Users className="size-4 text-accent" />12.4K</button>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Rolling pot</p>
                  <p className="mt-1 font-display text-5xl font-bold tabular-nums sm:text-7xl">$1,284<span className="text-primary">.57</span></p>
                  <button onClick={() => { setLiked((value) => !value); setLikes((value) => value + (liked ? -1 : 1)); }} aria-label="Like live draw" aria-pressed={liked} className="relative mt-10 grid size-44 place-items-center rounded-full border-4 border-primary/30 bg-background/30 shadow-glow transition-transform active:scale-95 sm:size-56">
                    <span className="absolute inset-0 animate-spin rounded-full border-t-4 border-primary motion-reduce:animate-none" />
                    <span className="font-display text-8xl font-bold sm:text-9xl">{count}</span>
                  </button>
                  <div className="mt-7 flex gap-2">
                    {[5, 4, 3, 2, 1].map((n) => <span key={n} className={`grid size-10 place-items-center rounded-md border text-sm font-bold ${n === count ? "border-primary bg-primary text-primary-foreground shadow-glow" : n > count ? "border-border bg-secondary text-muted-foreground" : "border-border/50 text-muted-foreground/40"}`}>{n}</span>)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs"><button onClick={() => { setLiked((v) => !v); setLikes((v) => v + (liked ? -1 : 1)); }} className={`flex items-center gap-1.5 ${liked ? "text-primary" : "text-muted-foreground"}`}><Heart className={`size-4 ${liked ? "fill-current" : ""}`} />{likes.toLocaleString()}</button><span className="text-muted-foreground">Ticket 4 of 10</span></div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <Button variant="vault" size="touch" onClick={() => { setQueued((v) => !v); notify(queued ? "You left the queue" : "You joined with 10 tickets"); }}>{queued ? <><Check /> In queue</> : "PLAY NOW · $1"}</Button>
                    <Button variant="vaultOutline" size="touchIcon" aria-label="Open chat" onClick={() => setChatOpen(true)}><MessageCircle /></Button>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-muted-foreground"><span>Next draw in 00:0{count}</span><span className="text-primary">Base · Auto</span></div>
                </div>
              </div>
            </section>

            <Panel id="feed">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-primary">Live activity</p><h2 className="font-display text-xl font-bold">The feed</h2></div><Sparkles className="size-5 text-accent" /></div>
              <div className="mt-4 space-y-2">
                {activity.map((item) => <button key={item.user} onClick={() => { setSelectedPlayer(item.user); scrollTo("live"); }} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent bg-secondary p-3 text-left transition-colors hover:border-primary/40">
                  <span className={`grid size-10 place-items-center rounded-md text-[10px] font-bold ${item.kind === "WIN" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>{item.kind}</span>
                  <span className="min-w-0"><strong className="block truncate text-sm">{item.user}</strong><span className="block truncate text-xs text-muted-foreground">{item.text}</span></span>
                  <strong className="text-sm text-accent">{item.amount}</strong>
                </button>)}
              </div>
            </Panel>
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-20">
            <Panel id="queue">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-primary">Hash order</p><h2 className="font-display text-xl font-bold">Up next</h2></div><span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">4 waiting</span></div>
              <div className="mt-4 space-y-2">{queue.map((item, index) => <button key={item.hash} onClick={() => notify(`${item.user} is #${index + 1} in line`)} className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3 text-left hover:border-primary/50"><span className="font-display text-lg font-bold text-muted-foreground">0{index + 1}</span><span className="min-w-0"><span className="flex items-center gap-1 truncate text-sm font-semibold">{item.user}{item.agent && <Bot className="size-3.5 text-primary" />}</span><span className="block truncate font-mono text-[10px] text-muted-foreground">{item.hash} · {item.chain}</span></span><span className="text-xs text-muted-foreground">{item.tickets} left</span></button>)}</div>
            </Panel>

            <Panel id="wallet">
              <p className="text-xs font-bold uppercase text-primary">Winner setup</p><h2 className="font-display text-xl font-bold">Choose your move</h2>
              <div className="mt-4 grid gap-2">{["Cash out", "PvP bet · from $0.20", "Keep playing AI bets"].map((option) => <button key={option} aria-pressed={winnerOption === option} onClick={() => { setWinnerOption(option); notify(`${option} selected`); }} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border p-3 text-left text-sm font-semibold ${winnerOption === option ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}><span>{option}</span>{winnerOption === option ? <Check className="size-4" /> : <ChevronRight className="size-4 text-muted-foreground" />}</button>)}</div>
              <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">Pay with</p>
              <div className="mt-2 flex flex-wrap gap-2">{["Crypto", "Card", "x402", "Apple Pay", "Google Pay"].map((method) => <button key={method} aria-pressed={payment === method} onClick={() => setPayment(method)} className={`rounded-full border px-3 py-2 text-xs font-semibold ${payment === method ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{method}</button>)}</div>
            </Panel>

            <Panel id="target">
              <div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><p className="text-xs font-bold uppercase">AI target · #419</p></div><h2 className="mt-1 font-display text-xl font-bold">Build the missing face</h2><p className="mt-2 text-sm text-muted-foreground">The model is watching for these details.</p>
              <div className="mt-3 flex flex-wrap gap-2">{["half-smile", "raised brow", "side light", "green jacket", "wide eyes"].map((tag) => <button key={tag} onClick={() => notify(`${tag} highlighted`)} className="rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary hover:bg-primary hover:text-primary-foreground">{tag}</button>)}</div>
            </Panel>
          </aside>
        </div>
      </main>

      <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
        {[{ icon: Home, label: "Live", id: "live" }, { icon: Trophy, label: "Wins", id: "feed" }, { icon: Users, label: "Queue", id: "queue" }, { icon: CircleDollarSign, label: "Play", id: "wallet" }].map((item) => <button key={item.id} onClick={() => scrollTo(item.id)} className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-[10px] text-muted-foreground active:text-primary"><item.icon className="size-5" />{item.label}</button>)}
        <button onClick={share} className="flex min-h-11 flex-col items-center justify-center gap-0.5 text-[10px] text-muted-foreground active:text-primary"><Share2 className="size-5" />Share</button>
      </nav>

      <div className="fixed bottom-5 right-5 z-30 hidden gap-2 sm:flex"><Button variant="vaultOutline" size="touchIcon" aria-label="Copy game link" onClick={async () => { await navigator.clipboard.writeText(window.location.href); notify("Link copied"); }}><Copy /></Button><Button variant="vault" size="touch" onClick={share}><Share2 /> Share draw</Button></div>

      {chatOpen && <div className="fixed inset-0 z-50 flex items-end bg-background/70 backdrop-blur-sm sm:items-center sm:justify-center" onMouseDown={(event) => { if (event.target === event.currentTarget) setChatOpen(false); }}><div className="float-up w-full border-t border-border bg-card p-4 sm:max-w-md sm:rounded-lg sm:border"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center"><div><p className="text-xs font-bold uppercase text-primary">Live room</p><h2 className="font-display text-xl font-bold">Gang chat</h2></div><Button variant="ghost" size="icon" aria-label="Close chat" onClick={() => setChatOpen(false)}><X /></Button></div><div className="mt-4 max-h-56 space-y-2 overflow-y-auto">{messages.map((message, i) => <p key={`${message}-${i}`} className="rounded-lg bg-secondary p-3 text-sm">{message}</p>)}</div><div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2"><input value={chat} onChange={(e) => setChat(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }} placeholder="Say something…" aria-label="Chat message" className="min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary" /><Button variant="vault" size="touchIcon" aria-label="Send message" onClick={sendChat}><Send /></Button></div></div></div>}

      {notice && <div role="status" className="float-up fixed left-1/2 top-20 z-[60] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-semibold shadow-xl"><Check className="size-4 text-accent" />{notice}</div>}
    </div>
  );
}