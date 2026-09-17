import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Copy,
  Heart,
  ListOrdered,
  MessageCircle,
  Radio,
  Send,
  Settings,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Volume2,
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
  { user: "ava.base", text: "matched the missing smirk", amount: "+$412.80", kind: "WIN", time: "now" },
  { user: "agent_07", text: "joined with 7 tickets", amount: "", kind: "AI", time: "4s" },
  { user: "tinker", text: "completed the eyebrow arc", amount: "+$96.30", kind: "WIN", time: "9s" },
  { user: "nia.arc", text: "moved to position four", amount: "", kind: "LIVE", time: "14s" },
  { user: "solmonk", text: "placed a fresh entry", amount: "-$1.00", kind: "PLAY", time: "22s" },
];
const pageNames = ["Timeline", "Live activity", "Hash order", "Settings"];

function Panel({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return <section id={id} className={`border-b border-border bg-card px-4 py-5 sm:rounded-lg sm:border ${className}`}>{children}</section>;
}

function Toggle({ active, label, onChange }: { active: boolean; label: string; onChange: () => void }) {
  return <Button type="button" variant="ghost" size="icon" role="switch" aria-label={label} aria-checked={active} onClick={onChange} className={`h-7 w-12 rounded-full border p-1 ${active ? "justify-end border-accent bg-accent" : "justify-start border-border bg-secondary"}`}><span className={`block size-4 rounded-full ${active ? "bg-accent-foreground" : "bg-muted-foreground"}`} /></Button>;
}

function Index() {
  const [count, setCount] = useState(5);
  const [selectedPlayer, setSelectedPlayer] = useState("ava.base");
  const [queued, setQueued] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(2841);
  const [payment, setPayment] = useState("Crypto");
  const [winnerOption, setWinnerOption] = useState("Cash out");
  const [notice, setNotice] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState(["ava.base: Five seconds. Make it count.", "solmonk: That pot is moving!"]);
  const [mobilePage, setMobilePage] = useState(0);
  const [alerts, setAlerts] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [sound, setSound] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
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

  const selectPage = (page: number) => setMobilePage(Math.max(0, Math.min(pageNames.length - 1, page)));
  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    selectPage(mobilePage + (dx < 0 ? 1 : -1));
  };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const toggleLike = () => { setLiked((value) => !value); setLikes((value) => value + (liked ? -1 : 1)); };
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
    } catch { notify("Share cancelled"); }
  };

  const PlayerStrip = () => <section aria-label="Active players" className="scrollbar-hide flex gap-4 overflow-x-auto border-b border-border bg-background px-4 py-4 sm:rounded-lg sm:border sm:bg-card">
    {players.map((player, index) => <Button key={player} variant="ghost" onClick={() => { setSelectedPlayer(player); notify(`Watching ${player}`); }} className="group flex h-auto w-14 shrink-0 flex-col items-center gap-1.5 p-0" aria-pressed={selectedPlayer === player}>
      <span className={`grid size-12 place-items-center rounded-full border-2 text-xs font-bold transition-transform group-active:scale-95 ${selectedPlayer === player ? "border-primary bg-primary text-primary-foreground" : index < 3 ? "border-live bg-secondary" : "border-border bg-secondary"}`}>{player.slice(0, 2).toUpperCase()}</span>
      <span className="w-full truncate text-[10px] text-muted-foreground">{player}</span>
    </Button>)}
  </section>;

  const LivePanel = ({ mobile = false }: { mobile?: boolean }) => <section id={mobile ? undefined : "live"} className={`relative overflow-hidden bg-card ${mobile ? "min-h-full" : "min-h-[680px] rounded-lg border border-border"}`}>
    <div className="vault-radial absolute inset-0" />
    <div className={`relative flex flex-col p-4 sm:p-6 ${mobile ? "min-h-[calc(100dvh-9.5rem)]" : "min-h-[680px]"}`}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0"><p className="text-xs font-bold uppercase text-primary">On camera now</p><h1 className="truncate font-display text-2xl font-bold">{selectedPlayer}</h1></div>
        <Button variant="vaultOutline" size="sm" onClick={() => notify("12,432 people are watching")}><Users className="size-4 text-accent" />12.4K</Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
        <p className="text-xs font-bold uppercase text-muted-foreground">Rolling pot</p>
        <p className="mt-1 font-display text-5xl font-bold tabular-nums sm:text-7xl">$1,284<span className="text-primary">.57</span></p>
        <Button variant="ghost" onClick={toggleLike} aria-label="Like live draw" aria-pressed={liked} className="relative mt-8 size-44 rounded-full border-4 border-primary/30 bg-background/30 p-0 shadow-glow transition-transform active:scale-95 sm:size-56">
          <span className="absolute inset-0 animate-spin rounded-full border-t-4 border-primary motion-reduce:animate-none" />
          <span className="font-display text-8xl font-bold sm:text-9xl">{count}</span>
        </Button>
        <div className="mt-6 flex gap-2">{[5, 4, 3, 2, 1].map((n) => <span key={n} className={`grid size-9 place-items-center rounded-md border text-sm font-bold ${n === count ? "border-primary bg-primary text-primary-foreground shadow-glow" : n > count ? "border-border bg-secondary text-muted-foreground" : "border-border/50 text-muted-foreground/40"}`}>{n}</span>)}</div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs"><Button variant="ghost" size="sm" onClick={toggleLike} className={`px-0 ${liked ? "text-primary" : "text-muted-foreground"}`}><Heart className={`size-4 ${liked ? "fill-current" : ""}`} />{likes.toLocaleString()}</Button><span className="text-muted-foreground">Ticket 4 of 10</span></div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3"><Button variant="vault" size="touch" onClick={() => { setQueued((value) => !value); notify(queued ? "You left the queue" : "You joined with 10 tickets"); }}>{queued ? <><Check /> In queue</> : "PLAY NOW · $1"}</Button><Button variant="vaultOutline" size="touchIcon" aria-label="Open chat" onClick={() => setChatOpen(true)}><MessageCircle /></Button></div>
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-muted-foreground"><span>Next draw in 00:0{count}</span><span className="text-primary">Base · Auto</span></div>
      </div>
    </div>
  </section>;

  const ActivityPanel = ({ mobile = false }: { mobile?: boolean }) => <Panel id={mobile ? undefined : "feed"} className={mobile ? "min-h-full border-b-0 pr-16" : ""}>
    <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-primary">Live activity</p><h2 className="font-display text-2xl font-bold">The feed</h2></div><Sparkles className="size-5 text-accent" /></div>
    <div className="mt-5 space-y-3">{activity.map((item) => <Button variant="ghost" key={`${item.user}-${item.time}`} onClick={() => { setSelectedPlayer(item.user); mobile ? selectPage(0) : scrollTo("live"); }} className="grid h-auto w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent bg-secondary p-3 text-left hover:border-primary/40">
      <span className={`grid size-10 place-items-center rounded-md text-[10px] font-bold ${item.kind === "WIN" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>{item.kind}</span>
      <span className="min-w-0"><strong className="block truncate text-sm">{item.user}</strong><span className="block truncate text-xs text-muted-foreground">{item.text}</span><span className="mt-1 block text-[10px] text-muted-foreground">{item.time} ago</span></span>
      <strong className="text-sm text-accent">{item.amount}</strong>
    </Button>)}</div>
  </Panel>;

  const QueuePanel = ({ mobile = false }: { mobile?: boolean }) => <Panel id={mobile ? undefined : "queue"} className={mobile ? "min-h-full border-b-0 pr-16" : ""}>
    <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-primary">Hash order</p><h2 className="font-display text-2xl font-bold">Up next</h2></div><span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">4 waiting</span></div>
    <div className="mt-5 space-y-3">{queue.map((item, index) => <Button variant="ghost" key={item.hash} onClick={() => notify(`${item.user} is #${index + 1} in line`)} className="grid h-auto w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3 text-left hover:border-primary/50"><span className="font-display text-lg font-bold text-muted-foreground">0{index + 1}</span><span className="min-w-0"><span className="flex items-center gap-1 truncate text-sm font-semibold">{item.user}{item.agent && <Bot className="size-3.5 text-primary" />}</span><span className="block truncate font-mono text-[10px] text-muted-foreground">{item.hash} · {item.chain}</span></span><span className="text-xs text-muted-foreground">{item.tickets} left</span></Button>)}</div>
    <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4"><p className="text-xs font-bold uppercase text-primary">Your position</p><p className="mt-1 font-display text-3xl font-bold">#12</p><p className="text-xs text-muted-foreground">Estimated wait: 55 seconds</p></div>
  </Panel>;

  const SettingsPanel = ({ mobile = false }: { mobile?: boolean }) => <Panel id={mobile ? "mobile-settings" : "wallet"} className={mobile ? "min-h-full border-b-0 pr-16" : ""}>
    <div><p className="text-xs font-bold uppercase text-primary">Settings</p><h2 className="font-display text-2xl font-bold">Your game</h2></div>
    <div className="mt-5 space-y-2">
      {[{ icon: Bell, label: "Draw alerts", active: alerts, set: () => setAlerts((v) => !v) }, { icon: Radio, label: "Auto-play stream", active: autoplay, set: () => setAutoplay((v) => !v) }, { icon: Volume2, label: "Sound effects", active: sound, set: () => setSound((v) => !v) }].map((item) => <div key={item.label} className="flex min-h-14 items-center gap-3 rounded-lg border border-border px-3"><item.icon className="size-5 text-muted-foreground" /><span className="flex-1 text-sm font-semibold">{item.label}</span><Toggle active={item.active} label={item.label} onChange={item.set} /></div>)}
    </div>
    <div className="mt-6" id={mobile ? "mobile-wallet" : undefined}><p className="text-xs font-bold uppercase text-primary">Wallet</p><Button variant="vaultOutline" size="touch" className="mt-2 w-full justify-between" onClick={() => notify("Wallet connection is ready for setup")}><span className="flex items-center gap-2"><Wallet /> Connect wallet</span><ChevronRight /></Button></div>
    <p className="mt-6 text-xs font-bold uppercase text-muted-foreground">Winner move</p>
    <div className="mt-2 grid gap-2">{["Cash out", "PvP bet · from $0.20", "Keep playing AI bets"].map((option) => <Button variant="ghost" key={option} aria-pressed={winnerOption === option} onClick={() => { setWinnerOption(option); notify(`${option} selected`); }} className={`grid h-auto grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border p-3 text-left text-sm font-semibold ${winnerOption === option ? "border-primary bg-primary/10 text-primary" : "border-border"}`}><span>{option}</span>{winnerOption === option ? <Check className="size-4" /> : <ChevronRight className="size-4 text-muted-foreground" />}</Button>)}</div>
    <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">Pay with</p>
    <div className="mt-2 flex flex-wrap gap-2">{["Crypto", "Card", "x402", "Apple Pay", "Google Pay"].map((method) => <Button variant={payment === method ? "vault" : "vaultOutline"} size="sm" key={method} aria-pressed={payment === method} onClick={() => setPayment(method)}>{method}</Button>)}</div>
  </Panel>;

  return <div className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
        <Button variant="ghost" onClick={() => { selectPage(0); scrollTo("live"); }} className="flex h-auto min-w-0 items-center gap-3 p-0 text-left" aria-label="Go to live draw"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-vault">CG</span><span className="min-w-0"><span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground"><span className="size-1.5 animate-pulse rounded-full bg-live" /> {pageNames[mobilePage]}</span><span className="block truncate font-display text-lg font-bold">CHAIN GANG</span></span></Button>
        <Button variant="vaultOutline" size="sm" onClick={() => { selectPage(3); notify("Wallet settings opened"); }}><Wallet /> Connect</Button>
      </div>
    </header>

    <div className="sm:hidden"><PlayerStrip /></div>
    <main className="sm:hidden">
      <div className="overflow-hidden touch-pan-y" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="flex transition-transform duration-300 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${mobilePage * 100}%)` }}>
          <article className="h-[calc(100dvh-9.25rem)] w-full shrink-0 overflow-y-auto overscroll-contain pr-12"><LivePanel mobile /></article>
          <article className="h-[calc(100dvh-9.25rem)] w-full shrink-0 overflow-y-auto overscroll-contain"><ActivityPanel mobile /></article>
          <article className="h-[calc(100dvh-9.25rem)] w-full shrink-0 overflow-y-auto overscroll-contain"><QueuePanel mobile /></article>
          <article className="h-[calc(100dvh-9.25rem)] w-full shrink-0 overflow-y-auto overscroll-contain"><SettingsPanel mobile /></article>
        </div>
      </div>
      <div className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-2 backdrop-blur-xl" aria-label={`Page ${mobilePage + 1} of ${pageNames.length}`}>
        {pageNames.map((name, index) => <Button key={name} variant="ghost" size="icon" aria-label={`Open ${name}`} onClick={() => selectPage(index)} className={`size-2 rounded-full p-0 ${index === mobilePage ? "bg-primary" : "bg-muted-foreground/40"}`} />)}
      </div>
    </main>

    <nav aria-label="Mobile screens" className="fixed right-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2 rounded-lg border border-border bg-background/90 p-1.5 shadow-xl backdrop-blur-xl sm:hidden">
      {[{ icon: Radio, label: "Timeline", page: 0 }, { icon: Trophy, label: "Activity", page: 1 }, { icon: ListOrdered, label: "Hash order", page: 2 }, { icon: Wallet, label: "Wallet", page: 3 }, { icon: Settings, label: "Settings", page: 3 }].map((item) => <Button key={item.label} variant="ghost" size="icon" aria-label={item.label} aria-current={mobilePage === item.page ? "page" : undefined} onClick={() => selectPage(item.page)} className={`size-10 rounded-md ${mobilePage === item.page ? "bg-primary text-primary-foreground shadow-vault" : "text-muted-foreground"}`}><item.icon className="size-5" /></Button>)}
    </nav>

    <main className="mx-auto hidden max-w-6xl px-4 pb-8 pt-4 sm:block"><PlayerStrip /><div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start"><div className="min-w-0 space-y-4"><LivePanel /><ActivityPanel /></div><aside className="min-w-0 space-y-4 lg:sticky lg:top-20"><QueuePanel /><SettingsPanel /><Panel id="target"><div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><p className="text-xs font-bold uppercase">AI target · #419</p></div><h2 className="mt-1 font-display text-xl font-bold">Build the missing face</h2><div className="mt-3 flex flex-wrap gap-2">{["half-smile", "raised brow", "side light", "green jacket", "wide eyes"].map((tag) => <Button variant="vaultOutline" size="sm" key={tag} onClick={() => notify(`${tag} highlighted`)}>{tag}</Button>)}</div></Panel></aside></div></main>

    <div className="fixed bottom-5 right-5 z-30 hidden gap-2 sm:flex"><Button variant="vaultOutline" size="touchIcon" aria-label="Copy game link" onClick={async () => { await navigator.clipboard.writeText(window.location.href); notify("Link copied"); }}><Copy /></Button><Button variant="vault" size="touch" onClick={share}><Share2 /> Share draw</Button></div>
    {mobilePage > 0 && <Button variant="vaultOutline" size="icon" className="fixed bottom-3 left-3 z-40 sm:hidden" aria-label="Previous screen" onClick={() => selectPage(mobilePage - 1)}><ChevronLeft /></Button>}

    {chatOpen && <div className="fixed inset-0 z-50 flex items-end bg-background/70 backdrop-blur-sm sm:items-center sm:justify-center" onMouseDown={(event) => { if (event.target === event.currentTarget) setChatOpen(false); }}><div className="float-up w-full border-t border-border bg-card p-4 sm:max-w-md sm:rounded-lg sm:border"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center"><div><p className="text-xs font-bold uppercase text-primary">Live room</p><h2 className="font-display text-xl font-bold">Gang chat</h2></div><Button variant="ghost" size="icon" aria-label="Close chat" onClick={() => setChatOpen(false)}><X /></Button></div><div className="mt-4 max-h-56 space-y-2 overflow-y-auto">{messages.map((message, index) => <p key={`${message}-${index}`} className="rounded-lg bg-secondary p-3 text-sm">{message}</p>)}</div><div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2"><input value={chat} onChange={(event) => setChat(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") sendChat(); }} placeholder="Say something…" aria-label="Chat message" className="min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary" /><Button variant="vault" size="touchIcon" aria-label="Send message" onClick={sendChat}><Send /></Button></div></div></div>}
    {notice && <div role="status" className="float-up fixed left-1/2 top-20 z-[60] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-semibold shadow-xl"><Check className="size-4 text-accent" />{notice}</div>}
  </div>;
}
