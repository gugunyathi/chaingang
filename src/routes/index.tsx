import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Copy,
  Crown,
  Film,
  Flame,
  Heart,
  ListOrdered,
  Maximize2,
  Medal,
  MessageCircle,
  Minimize2,
  Music,
  Pause,
  Play,
  Plus,
  Radio,
  Send,
  Settings,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Video,
  Volume2,
  VolumeX,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chain Gang — Five seconds to win" },
      {
        name: "description",
        content: "Enter the live Chain Gang draw, follow the queue, and chase the rolling pot.",
      },
      { property: "og:title", content: "Chain Gang — Five seconds to win" },
      {
        property: "og:description",
        content: "Enter the live Chain Gang draw, follow the queue, and chase the rolling pot.",
      },
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
  {
    id: "act-1",
    user: "ava.base",
    text: "matched the missing smirk",
    amount: "+$412.80",
    kind: "WIN",
    time: "now",
  },
  {
    id: "act-2",
    user: "agent_07",
    text: "joined with 7 tickets",
    amount: "",
    kind: "AI",
    time: "4s",
  },
  {
    id: "act-3",
    user: "tinker",
    text: "completed the eyebrow arc",
    amount: "+$96.30",
    kind: "WIN",
    time: "9s",
  },
  {
    id: "act-4",
    user: "nia.arc",
    text: "moved to position four",
    amount: "",
    kind: "LIVE",
    time: "14s",
  },
  {
    id: "act-5",
    user: "solmonk",
    text: "placed a fresh entry",
    amount: "-$1.00",
    kind: "PLAY",
    time: "22s",
  },
];
const initialWinnerClips = [
  {
    id: "clip-1",
    winnerName: "ava.base",
    amountWon: "$412.80",
    caption: "Matched the 5s smirk at 0.01s! Instant cashout! 🚀🔥",
    timeAgo: "2m ago",
    likes: 1420,
    comments: 89,
    bgGradient: "from-amber-600/40 via-red-900/50 to-purple-950",
    hasVideo: true,
  },
  {
    id: "clip-2",
    winnerName: "solmonk",
    amountWon: "$820.50",
    caption: "PvP battle win vs agent_07! That last tick was insane!! 🏆",
    timeAgo: "12m ago",
    likes: 980,
    comments: 42,
    bgGradient: "from-emerald-600/40 via-teal-900/50 to-slate-950",
    hasVideo: true,
  },
  {
    id: "clip-3",
    winnerName: "0xk9d",
    amountWon: "$310.00",
    caption: "10 tickets in queue, hit the jackpot on my 1st try 😎",
    timeAgo: "1h ago",
    likes: 650,
    comments: 31,
    bgGradient: "from-purple-600/40 via-indigo-900/50 to-zinc-950",
    hasVideo: true,
  },
];

type Timeframe = "24hrs" | "1week" | "1month" | "1year" | "all";

const timeframeOptions: Array<{ key: Timeframe; label: string }> = [
  { key: "24hrs", label: "24hrs" },
  { key: "1week", label: "1 week" },
  { key: "1month", label: "1 month" },
  { key: "1year", label: "1 year" },
  { key: "all", label: "All time" },
];

const leaderboardData: Record<
  Timeframe,
  Array<{
    rank: number;
    user: string;
    prize: string;
    numericPrize: number;
    wins: number;
    badge: string;
    highlightGame: string;
  }>
> = {
  "24hrs": [
    {
      rank: 1,
      user: "ava.base",
      prize: "$1,420.50",
      numericPrize: 1420.5,
      wins: 18,
      badge: "Smirk Legend",
      highlightGame: "Smirk Hash #42",
    },
    {
      rank: 2,
      user: "solmonk",
      prize: "$980.20",
      numericPrize: 980.2,
      wins: 12,
      badge: "PvP High Roller",
      highlightGame: "Base PvP Pot",
    },
    {
      rank: 3,
      user: "0xk9d",
      prize: "$640.00",
      numericPrize: 640.0,
      wins: 9,
      badge: "Speed Matcher",
      highlightGame: "AI Smirk Catch",
    },
    {
      rank: 4,
      user: "tinker",
      prize: "$412.80",
      numericPrize: 412.8,
      wins: 5,
      badge: "Arc Master",
      highlightGame: "Eyebrow Arc",
    },
    {
      rank: 5,
      user: "agent_07",
      prize: "$285.40",
      numericPrize: 285.4,
      wins: 4,
      badge: "Bot Sniper",
      highlightGame: "Auto-Bot Multiplier",
    },
    {
      rank: 6,
      user: "nia.arc",
      prize: "$190.00",
      numericPrize: 190.0,
      wins: 3,
      badge: "Arbitrum Flash",
      highlightGame: "Arbitrum Flash",
    },
    {
      rank: 7,
      user: "cyber_sam",
      prize: "$125.50",
      numericPrize: 125.5,
      wins: 2,
      badge: "Frame Perfect",
      highlightGame: "5s Frame Match",
    },
    {
      rank: 8,
      user: "luna_vault",
      prize: "$85.00",
      numericPrize: 85.0,
      wins: 1,
      badge: "Quick Strike",
      highlightGame: "Quick Strike",
    },
  ],
  "1week": [
    {
      rank: 1,
      user: "solmonk",
      prize: "$5,840.00",
      numericPrize: 5840.0,
      wins: 42,
      badge: "Weekly King",
      highlightGame: "Mega Jackpot #89",
    },
    {
      rank: 2,
      user: "ava.base",
      prize: "$4,210.50",
      numericPrize: 4210.5,
      wins: 36,
      badge: "Base Champ",
      highlightGame: "Smirk Hash #42",
    },
    {
      rank: 3,
      user: "agent_07",
      prize: "$3,650.00",
      numericPrize: 3650.0,
      wins: 28,
      badge: "ARC Bot Titan",
      highlightGame: "ARC Auto-Trader",
    },
    {
      rank: 4,
      user: "0xk9d",
      prize: "$2,980.00",
      numericPrize: 2980.0,
      wins: 22,
      badge: "Multi-Chain",
      highlightGame: "Multi-Chain Streak",
    },
    {
      rank: 5,
      user: "nia.arc",
      prize: "$1,840.20",
      numericPrize: 1840.2,
      wins: 15,
      badge: "Speedster",
      highlightGame: "Arbitrum Flash",
    },
    {
      rank: 6,
      user: "tinker",
      prize: "$1,250.00",
      numericPrize: 1250.0,
      wins: 11,
      badge: "Precision",
      highlightGame: "Eyebrow Arc",
    },
    {
      rank: 7,
      user: "crypto_queen",
      prize: "$980.00",
      numericPrize: 980.0,
      wins: 8,
      badge: "PvP Star",
      highlightGame: "PvP Arena",
    },
    {
      rank: 8,
      user: "satoshi_99",
      prize: "$620.50",
      numericPrize: 620.5,
      wins: 6,
      badge: "Hash Master",
      highlightGame: "Hash Sniper",
    },
  ],
  "1month": [
    {
      rank: 1,
      user: "agent_07",
      prize: "$18,450.00",
      numericPrize: 18450.0,
      wins: 114,
      badge: "Monthly Master",
      highlightGame: "AI Multi-Chain",
    },
    {
      rank: 2,
      user: "solmonk",
      prize: "$14,200.00",
      numericPrize: 14200.0,
      wins: 92,
      badge: "Solana Legend",
      highlightGame: "Mega Jackpot #89",
    },
    {
      rank: 3,
      user: "ava.base",
      prize: "$11,890.50",
      numericPrize: 11890.5,
      wins: 84,
      badge: "Base Pioneer",
      highlightGame: "Smirk Hash Champion",
    },
    {
      rank: 4,
      user: "0xk9d",
      prize: "$8,750.00",
      numericPrize: 8750.0,
      wins: 65,
      badge: "Vault Crusher",
      highlightGame: "Base Chain Vault",
    },
    {
      rank: 5,
      user: "nia.arc",
      prize: "$6,120.00",
      numericPrize: 6120.0,
      wins: 48,
      badge: "Arbitrum Leader",
      highlightGame: "Arbitrum Leader",
    },
    {
      rank: 6,
      user: "tinker",
      prize: "$4,890.00",
      numericPrize: 4890.0,
      wins: 39,
      badge: "Arc Specialist",
      highlightGame: "Eyebrow Arc",
    },
    {
      rank: 7,
      user: "blaze_runner",
      prize: "$3,450.00",
      numericPrize: 3450.0,
      wins: 27,
      badge: "Streak Demon",
      highlightGame: "Speed Run",
    },
    {
      rank: 8,
      user: "zenith_ai",
      prize: "$2,100.00",
      numericPrize: 2100.0,
      wins: 19,
      badge: "Cluster Ace",
      highlightGame: "Bot Cluster",
    },
  ],
  "1year": [
    {
      rank: 1,
      user: "solmonk",
      prize: "$84,500.00",
      numericPrize: 84500.0,
      wins: 410,
      badge: "Annual High Roller",
      highlightGame: "All-Time High Roller",
    },
    {
      rank: 2,
      user: "agent_07",
      prize: "$72,300.00",
      numericPrize: 72300.0,
      wins: 380,
      badge: "Autonomous Titan",
      highlightGame: "Autonomous Bot Titan",
    },
    {
      rank: 3,
      user: "ava.base",
      prize: "$59,800.00",
      numericPrize: 59800.0,
      wins: 310,
      badge: "Base Pioneer",
      highlightGame: "Base Network Pioneer",
    },
    {
      rank: 4,
      user: "0xk9d",
      prize: "$41,200.00",
      numericPrize: 41200.0,
      wins: 240,
      badge: "Smirk Legend",
      highlightGame: "Smirk Master",
    },
    {
      rank: 5,
      user: "nia.arc",
      prize: "$28,900.00",
      numericPrize: 28900.0,
      wins: 175,
      badge: "Arbitrum Legend",
      highlightGame: "Arbitrum Legend",
    },
    {
      rank: 6,
      user: "tinker",
      prize: "$19,400.00",
      numericPrize: 19400.0,
      wins: 120,
      badge: "Veteran Matcher",
      highlightGame: "Eyebrow Arc",
    },
    {
      rank: 7,
      user: "hyper_whale",
      prize: "$14,800.00",
      numericPrize: 14800.0,
      wins: 95,
      badge: "Whale Chaser",
      highlightGame: "Whale Entry",
    },
    {
      rank: 8,
      user: "pixel_pete",
      prize: "$9,300.00",
      numericPrize: 9300.0,
      wins: 62,
      badge: "Frame Boss",
      highlightGame: "Frame Perfect",
    },
  ],
  all: [
    {
      rank: 1,
      user: "solmonk",
      prize: "$142,800.00",
      numericPrize: 142800.0,
      wins: 680,
      badge: "GOAT #1",
      highlightGame: "Hall of Fame #1",
    },
    {
      rank: 2,
      user: "agent_07",
      prize: "$118,500.00",
      numericPrize: 118500.0,
      wins: 590,
      badge: "AI Autonomous Record",
      highlightGame: "AI Autonomous Record",
    },
    {
      rank: 3,
      user: "ava.base",
      prize: "$94,200.00",
      numericPrize: 94200.0,
      wins: 480,
      badge: "Base Hall of Famer",
      highlightGame: "Base Network Legend",
    },
    {
      rank: 4,
      user: "0xk9d",
      prize: "$68,400.00",
      numericPrize: 68400.0,
      wins: 370,
      badge: "Smirk Pioneer",
      highlightGame: "Smirk Hash Pioneer",
    },
    {
      rank: 5,
      user: "nia.arc",
      prize: "$45,100.00",
      numericPrize: 45100.0,
      wins: 260,
      badge: "Arbitrum Titan",
      highlightGame: "Arbitrum Titan",
    },
    {
      rank: 6,
      user: "tinker",
      prize: "$32,600.00",
      numericPrize: 32600.0,
      wins: 195,
      badge: "Arc Master",
      highlightGame: "Eyebrow Arc",
    },
    {
      rank: 7,
      user: "satoshi_99",
      prize: "$24,800.00",
      numericPrize: 24800.0,
      wins: 140,
      badge: "Genesis Winner",
      highlightGame: "Genesis Winner",
    },
    {
      rank: 8,
      user: "crypto_queen",
      prize: "$18,200.00",
      numericPrize: 18200.0,
      wins: 105,
      badge: "PvP Champion",
      highlightGame: "PvP Champion",
    },
  ],
};

const pageNames = ["Live / Bet", "Winners Reel", "The Feed", "Hash & Settings", "Wallet"];

function Panel({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-b border-border bg-card px-4 py-5 sm:rounded-lg sm:border ${className}`}
    >
      {children}
    </section>
  );
}

function Toggle({
  active,
  label,
  onChange,
}: {
  active: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      role="switch"
      aria-label={label}
      aria-checked={active}
      onClick={onChange}
      className={`h-7 w-12 rounded-full border p-1 ${active ? "justify-end border-accent bg-accent" : "justify-start border-border bg-secondary"}`}
    >
      <span
        className={`block size-4 rounded-full ${active ? "bg-accent-foreground" : "bg-muted-foreground"}`}
      />
    </Button>
  );
}

function Index() {
  const [count, setCount] = useState(5);
  const [potAmount, setPotAmount] = useState<number>(1284.57);
  const [recentChange, setRecentChange] = useState<{
    amount: string;
    type: "up" | "down";
    label: string;
  } | null>(null);
  const [drawResult, setDrawResult] = useState<"WIN" | "LOSE" | null>(null);
  const [resultBanner, setResultBanner] = useState<string | null>(null);
  const [activityList, setActivityList] = useState(activity);
  const [feedTab, setFeedTab] = useState<"feed" | "leaderboard">("feed");
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<Timeframe>("24hrs");
  const [winnerClips, setWinnerClips] = useState(initialWinnerClips);
  const [selectedPlayer, setSelectedPlayer] = useState("ava.base");
  const [betMode, setBetMode] = useState<"AI" | "PVP">("AI");
  const [queued, setQueued] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(2841);
  const [payment, setPayment] = useState("Crypto");
  const [winnerOption, setWinnerOption] = useState("Cash out");
  const [notice, setNotice] = useState("");
  const [activePlayingClipId, setActivePlayingClipId] = useState<string | null>(null);
  const [selectedStoryClip, setSelectedStoryClip] = useState<(typeof initialWinnerClips)[0] | null>(
    null,
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([
    "ava.base: Five seconds. Make it count.",
    "solmonk: That pot is moving!",
  ]);
  const [mobilePage, setMobilePage] = useState(0);
  const [showFloatingIcons, setShowFloatingIcons] = useState(true);
  const [timelineFullscreen, setTimelineFullscreen] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const [autoplay, setAutoplay] = useState(true);
  const [sound, setSound] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playSoundEffect = useCallback(
    (type: "WIN" | "LOSE" | "TICK") => {
      if (!sound) return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === "WIN") {
          // 1. Victory Fanfare Arpeggio
          const notes = [523.25, 659.25, 783.99, 1046.5];
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.1 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.4);
          });

          // 2. Synthesized "YAAAY!" Vocal Cheer (pitch glide with formant bandpass filter)
          const cheerOsc = ctx.createOscillator();
          const cheerGain = ctx.createGain();
          const cheerFilter = ctx.createBiquadFilter();

          cheerOsc.type = "sawtooth";
          cheerOsc.frequency.setValueAtTime(320, ctx.currentTime + 0.05);
          cheerOsc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.35);
          cheerOsc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 1.1);

          cheerFilter.type = "bandpass";
          cheerFilter.frequency.setValueAtTime(1200, ctx.currentTime + 0.05);
          cheerFilter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.35);
          cheerFilter.Q.value = 3.5;

          cheerGain.gain.setValueAtTime(0, ctx.currentTime + 0.05);
          cheerGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.2);
          cheerGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.25);

          cheerOsc.connect(cheerFilter);
          cheerFilter.connect(cheerGain);
          cheerGain.connect(ctx.destination);

          cheerOsc.start(ctx.currentTime + 0.05);
          cheerOsc.stop(ctx.currentTime + 1.3);

          // 3. Synthesized Crowd Applause / People Clapping (filtered noise bursts)
          const bufferSize = ctx.sampleRate * 1.5;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }

          for (let clap = 0; clap < 30; clap++) {
            const clapTime = ctx.currentTime + Math.random() * 1.4;
            const noiseSource = ctx.createBufferSource();
            noiseSource.buffer = buffer;

            const bandpass = ctx.createBiquadFilter();
            bandpass.type = "bandpass";
            bandpass.frequency.value = 1400 + Math.random() * 800;
            bandpass.Q.value = 3;

            const clapGain = ctx.createGain();
            clapGain.gain.setValueAtTime(0, clapTime);
            clapGain.gain.linearRampToValueAtTime(0.15 + Math.random() * 0.1, clapTime + 0.005);
            clapGain.gain.exponentialRampToValueAtTime(
              0.001,
              clapTime + 0.06 + Math.random() * 0.04,
            );

            noiseSource.connect(bandpass);
            bandpass.connect(clapGain);
            clapGain.connect(ctx.destination);

            noiseSource.start(clapTime);
            noiseSource.stop(clapTime + 0.12);
          }
        } else if (type === "LOSE") {
          const notes = [174.61, 155.56, 130.81];
          notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.12 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.25);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + i * 0.12);
            osc.stop(ctx.currentTime + i * 0.12 + 0.3);
          });
        } else if (type === "TICK") {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.06);
        }
      } catch {
        // Browser audio context permission handler
      }
    },
    [sound],
  );

  const notify = (message: string) => {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2600);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((value) => {
        if (value > 1) {
          playSoundEffect("TICK");
          return value - 1;
        }
        return 0;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, [playSoundEffect]);

  // Scroll listener: Hide floating icons on scroll, reappear on screen click or tap
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingIcons(false);
    };

    const handleScreenTap = () => {
      setShowFloatingIcons(true);
    };

    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("click", handleScreenTap);
    window.addEventListener("touchstart", handleScreenTap, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("click", handleScreenTap);
      window.removeEventListener("touchstart", handleScreenTap);
    };
  }, []);

  // Live incoming orders stream that continuously increments the rolling pot
  useEffect(() => {
    const orderInterval = setInterval(() => {
      const increment = Number((Math.random() * 2.1 + 0.3).toFixed(2));
      setPotAmount((prev) => Number((prev + increment).toFixed(2)));

      setRecentChange({
        amount: `+$${increment.toFixed(2)}`,
        type: "up",
        label: "Incoming order",
      });

      const orderUsers = [
        "solmonk",
        "0xk9d",
        "agent_07",
        "nia.arc",
        "tinker",
        "cyber_sam",
        "luna_vault",
        "satoshi_99",
      ];

      if (Math.random() > 0.45) {
        const u = orderUsers[Math.floor(Math.random() * orderUsers.length)];
        setActivityList((prev) => [
          {
            id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            user: u,
            text: `bought $${increment.toFixed(2)} ticket order`,
            amount: `+$${increment.toFixed(2)}`,
            kind: "LIVE",
            time: "just now",
          },
          ...prev.slice(0, 10),
        ]);
      }
    }, 2200);

    return () => clearInterval(orderInterval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      const isWin = queued || Math.random() > 0.45;
      const outcome = isWin ? "WIN" : "LOSE";
      setDrawResult(outcome);
      playSoundEffect(outcome);

      const prizePayout = 412.8;

      if (isWin) {
        setPotAmount((prev) => {
          const newPot = Math.max(250.0, Number((prev - prizePayout).toFixed(2)));
          return newPot;
        });

        setRecentChange({
          amount: `-$${prizePayout.toFixed(2)}`,
          type: "down",
          label: "Winner payout",
        });

        setResultBanner(`🎉 WINNER! +$412.80 awarded to ${selectedPlayer}`);

        setActivityList((prev) => [
          {
            id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            user: selectedPlayer,
            text: "matched the 5-second draw",
            amount: "+$412.80",
            kind: "WIN",
            time: "now",
          },
          ...prev.slice(0, 10),
        ]);

        const newClip = {
          id: `clip-${Date.now()}`,
          winnerName: selectedPlayer,
          amountWon: "$412.80",
          caption: `Live 5-second draw winner! Recorded video timestamp #${Math.floor(Math.random() * 899 + 100)} 🏆✨`,
          timeAgo: "just now",
          likes: 1,
          comments: 0,
          bgGradient: "from-rose-600/40 via-amber-900/50 to-neutral-950",
          hasVideo: true,
        };
        setWinnerClips((prev) => [newClip, ...prev]);
        notify("📹 Winner reaction recorded & posted to Winners Reel!");
      } else {
        // Rollover pot increase
        setPotAmount((prev) => Number((prev + 5.0).toFixed(2)));
        setRecentChange({
          amount: "+$5.00",
          type: "up",
          label: "Rollover bonus",
        });
        setResultBanner(`❌ NO MATCH — Rolling pot rolls over & increases!`);
      }

      const resetTimer = setTimeout(() => {
        setDrawResult(null);
        setResultBanner(null);
        setCount(5);
      }, 1800);

      return () => clearTimeout(resetTimer);
    }
  }, [count, playSoundEffect, queued, selectedPlayer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && timelineFullscreen) {
        setTimelineFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [timelineFullscreen]);

  const selectPage = (page: number) =>
    setMobilePage(Math.max(0, Math.min(pageNames.length - 1, page)));
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
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const toggleLike = () => {
    setLiked((value) => !value);
    setLikes((value) => value + (liked ? -1 : 1));
  };
  const sendChat = () => {
    const clean = chat.trim();
    if (!clean) return;
    setMessages((current) => [...current, `you: ${clean}`]);
    setChat("");
    notify("Message sent");
  };
  const shareClip = async (clipId: string, winnerName: string, amount: string) => {
    const deepLink = `${window.location.origin}${window.location.pathname}?clip=${clipId}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Chain Gang Winner — ${winnerName}`,
          text: `Watch ${winnerName}'s ${amount} winning clip on Chain Gang! 🔥`,
          url: deepLink,
        });
        notify(`Shared ${winnerName}'s deep link!`);
      } else {
        await navigator.clipboard.writeText(deepLink);
        notify(`Deep link copied: ?clip=${clipId}`);
      }
    } catch {
      notify("Share cancelled");
    }
  };

  const share = async () => {
    try {
      if (navigator.share)
        await navigator.share({
          title: "Chain Gang",
          text: "Five seconds to win.",
          url: window.location.href,
        });
      else await navigator.clipboard.writeText(window.location.href);
      notify("Share link ready");
    } catch {
      notify("Share cancelled");
    }
  };

  const LivePanel = ({ mobile = false }: { mobile?: boolean }) => {
    const formattedPot = potAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const [potInteger, potDecimal] = formattedPot.split(".");

    return (
      <section
        id={mobile ? undefined : "live"}
        className={`relative overflow-hidden bg-card ${mobile ? "min-h-full" : "min-h-[680px] rounded-lg border border-border"}`}
      >
        <div className="vault-radial absolute inset-0" />
        <div
          className={`relative flex flex-col p-4 sm:p-6 ${mobile ? "min-h-[calc(100dvh-5rem)]" : "min-h-[680px]"}`}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center rounded-lg border border-border/80 bg-secondary/80 p-1 backdrop-blur-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setBetMode("AI");
                    notify("Switched to AI Bet mode");
                  }}
                  className={`h-7 rounded-md px-2.5 text-xs font-bold transition-all ${
                    betMode === "AI"
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Bot className="mr-1 size-3.5" />
                  AI Bet
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setBetMode("PVP");
                    notify("Switched to PvP Split-Screen mode");
                  }}
                  className={`h-7 rounded-md px-2.5 text-xs font-bold transition-all ${
                    betMode === "PVP"
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Users className="mr-1 size-3.5" />
                  PvP Bet
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSound((v) => {
                      const next = !v;
                      notify(next ? "Sound enabled 🔊" : "Sound muted 🔇");
                      if (next) playSoundEffect("WIN");
                      return next;
                    });
                  }}
                  aria-label={sound ? "Mute sound effects" : "Enable sound effects"}
                  className="size-9 rounded-lg border border-border/80 bg-secondary/80 text-foreground transition-all active:scale-95"
                >
                  {sound ? (
                    <Volume2 className="size-4 text-primary" />
                  ) : (
                    <VolumeX className="size-4 text-muted-foreground" />
                  )}
                </Button>
                <Button
                  variant="vaultOutline"
                  size="sm"
                  className="h-9"
                  onClick={() => notify("12,432 people are watching")}
                >
                  <Users className="size-4 text-accent" />
                  12.4K
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <h1 className="truncate font-display text-xl font-bold sm:text-2xl">
                {betMode === "PVP" ? `${selectedPlayer} vs solmonk` : selectedPlayer}
              </h1>
              <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 backdrop-blur-md">
                <span className="size-2 rounded-full bg-live animate-ping" />
                <span className="hidden text-[10px] font-bold uppercase text-muted-foreground sm:inline">
                  Rolling Pot
                </span>
                <span className="font-display text-base font-bold tabular-nums sm:text-lg">
                  ${potInteger}
                  <span className="text-primary">.{potDecimal}</span>
                </span>
                {recentChange && (
                  <span
                    className={`text-[10px] font-black ${
                      recentChange.type === "up" ? "text-accent" : "text-destructive-foreground"
                    }`}
                  >
                    {recentChange.amount}
                  </span>
                )}
              </div>
            </div>
          </div>

          {betMode === "PVP" ? (
            <div className="relative my-4 flex flex-1 flex-col gap-3">
              {/* Top Player (P1) */}
              <div className="relative flex min-h-[140px] flex-1 flex-col justify-between overflow-hidden rounded-xl border border-primary/40 bg-secondary/40 p-3 backdrop-blur-md sm:min-h-[160px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {selectedPlayer.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-display text-sm font-bold text-foreground">
                      {selectedPlayer}
                    </span>
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-primary">
                      P1
                    </span>
                  </div>
                  <span className="text-xs font-bold text-accent">$642.28</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-live animate-pulse" /> Live Feed #1
                  </span>
                  <span>Hash 0x9f...a2</span>
                </div>
              </div>

              {/* Central Floating Timer & Pot Overlay */}
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center justify-center">
                <div className="pointer-events-auto flex flex-col items-center">
                  <div className="rounded-full border border-border/80 bg-background/90 px-3.5 py-1.5 text-center shadow-2xl backdrop-blur-xl">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">PvP Pot</p>
                    <p className="font-display text-lg font-bold tabular-nums sm:text-xl">
                      ${potInteger}
                      <span className="text-primary">.{potDecimal}</span>
                    </p>
                    {recentChange && (
                      <span
                        className={`block text-[10px] font-black ${
                          recentChange.type === "up" ? "text-accent" : "text-destructive-foreground"
                        }`}
                      >
                        {recentChange.amount}
                      </span>
                    )}
                  </div>

                  {resultBanner && (
                    <div
                      className={`animate-outcome my-1.5 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-xl ${
                        drawResult === "WIN"
                          ? "border-accent bg-accent/20 text-accent"
                          : "border-destructive bg-destructive/20 text-destructive-foreground"
                      }`}
                    >
                      {drawResult === "WIN" ? (
                        <Trophy className="size-3.5" />
                      ) : (
                        <X className="size-3.5" />
                      )}
                      {resultBanner}
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={toggleLike}
                    aria-label="Like live draw"
                    aria-pressed={liked}
                    className={`relative my-1.5 size-28 rounded-full border-4 p-0 transition-all active:scale-95 sm:size-36 ${
                      drawResult === "WIN"
                        ? "animate-outcome animate-win-glow border-accent bg-accent/30 shadow-glow"
                        : drawResult === "LOSE"
                          ? "animate-outcome animate-lose-shake border-destructive bg-destructive/30 shadow-xl"
                          : "border-primary/50 bg-background/90 shadow-glow backdrop-blur-xl"
                    }`}
                  >
                    {drawResult === null && (
                      <span className="absolute inset-0 animate-spin rounded-full border-t-4 border-primary motion-reduce:animate-none" />
                    )}
                    {drawResult === "WIN" ? (
                      <span className="animate-outcome font-display text-3xl font-black text-accent sm:text-5xl">
                        WIN!
                      </span>
                    ) : drawResult === "LOSE" ? (
                      <span className="animate-outcome font-display text-3xl font-black text-destructive sm:text-5xl">
                        LOSE
                      </span>
                    ) : (
                      <span className="font-display text-4xl font-bold sm:text-6xl">{count}</span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Bottom Player (P2) */}
              <div className="relative flex min-h-[140px] flex-1 flex-col justify-between overflow-hidden rounded-xl border border-border bg-secondary/30 p-3 backdrop-blur-md sm:min-h-[160px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid size-7 place-items-center rounded-full bg-live text-xs font-bold text-white">
                      SO
                    </span>
                    <span className="font-display text-sm font-bold text-foreground">solmonk</span>
                    <span className="rounded bg-live/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-live">
                      P2
                    </span>
                  </div>
                  <span className="text-xs font-bold text-accent">$642.29</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="size-2 rounded-full bg-live animate-pulse" /> Live Feed #2
                  </span>
                  <span>Hash 0x41...8c</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
              {resultBanner && (
                <div
                  className={`animate-outcome mb-2 flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold shadow-xl ${
                    drawResult === "WIN"
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-destructive bg-destructive/20 text-destructive-foreground"
                  }`}
                >
                  {drawResult === "WIN" ? <Trophy className="size-4" /> : <X className="size-4" />}
                  {resultBanner}
                </div>
              )}

              <Button
                variant="ghost"
                onClick={toggleLike}
                aria-label="Like live draw"
                aria-pressed={liked}
                className={`relative mt-6 size-44 rounded-full border-4 p-0 transition-all active:scale-95 sm:size-56 ${
                  drawResult === "WIN"
                    ? "animate-outcome animate-win-glow border-accent bg-accent/20 shadow-glow"
                    : drawResult === "LOSE"
                      ? "animate-outcome animate-lose-shake border-destructive bg-destructive/20 shadow-xl"
                      : "border-primary/30 bg-background/30 shadow-glow"
                }`}
              >
                {drawResult === null && (
                  <span className="absolute inset-0 animate-spin rounded-full border-t-4 border-primary motion-reduce:animate-none" />
                )}
                {drawResult === "WIN" ? (
                  <span className="animate-outcome font-display text-6xl font-black text-accent sm:text-8xl">
                    WIN!
                  </span>
                ) : drawResult === "LOSE" ? (
                  <span className="animate-outcome font-display text-6xl font-black text-destructive sm:text-8xl">
                    LOSE
                  </span>
                ) : (
                  <span className="font-display text-8xl font-bold sm:text-9xl">{count}</span>
                )}
              </Button>
            </div>
          )}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLike}
                className={`px-0 ${liked ? "text-primary" : "text-muted-foreground"}`}
              >
                <Heart className={`size-4 ${liked ? "fill-current" : ""}`} />
                {likes.toLocaleString()}
              </Button>
              <span className="text-muted-foreground">Ticket 4 of 10</span>
            </div>
            <Button
              variant="vault"
              size="touch"
              className="w-full"
              onClick={() => {
                const nextQueued = !queued;
                setQueued(nextQueued);
                if (nextQueued) {
                  setPotAmount((prev) => Number((prev + 1.0).toFixed(2)));
                  setRecentChange({
                    amount: "+$1.00",
                    type: "up",
                    label: "Your ticket order",
                  });
                  notify("Joined queue with 10 tickets ($1.00 added to pot)");
                } else {
                  notify("You left the queue");
                }
              }}
            >
              {queued ? (
                <>
                  <Check /> In queue
                </>
              ) : (
                "PLAY NOW · $1"
              )}
            </Button>
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-muted-foreground">
              <span>Next draw in 00:0{count}</span>
              <span className="text-primary">Base · Auto</span>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const WinnersTimelinePanel = ({ mobile = false }: { mobile?: boolean }) => (
    <Panel
      id={mobile ? undefined : "winners"}
      className={mobile ? "min-h-full border-b-0 p-3 sm:p-4" : ""}
    >
      {/* Top Header & Status Stories Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-primary">Status & Reels</p>
          <h2 className="font-display text-xl font-bold">Winners Timeline</h2>
        </div>
        <Button
          variant="vault"
          size="sm"
          onClick={() => {
            setTimelineFullscreen(true);
            notify("Full-screen vertical reels activated 🎬 (swipe or scroll vertically)");
          }}
          className="flex items-center gap-1.5 h-8 px-3 text-xs"
          aria-label="Enter full-screen vertical scroll"
        >
          <Maximize2 className="size-3.5" />
          <span>Full Screen</span>
        </Button>
      </div>

      {/* Status Stories Horizontal Bar with Floating Status Indicators */}
      <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <Button
          variant="ghost"
          onClick={() => setRecordOpen(true)}
          className="flex h-auto shrink-0 flex-col items-center gap-1.5 p-0"
        >
          <div className="relative grid size-12 place-items-center rounded-full border-2 border-dashed border-primary bg-primary/10 text-primary transition-transform active:scale-95">
            <Plus className="size-5" />
            <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-black text-primary-foreground shadow-glow">
              +
            </span>
          </div>
          <span className="w-14 truncate text-center text-[10px] font-bold text-primary">
            Post status
          </span>
        </Button>

        {winnerClips.map((clip, index) => {
          const statusIcons = ["🏆", "🔥", "⚡", "👑", "🎯"];
          const statusIcon = statusIcons[index % statusIcons.length];
          return (
            <div
              key={`status-${clip.id}`}
              className="group flex h-auto shrink-0 flex-col items-center gap-1.5 p-0"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedStoryClip(clip);
                  playSoundEffect("WIN");
                  notify(`Viewing status story of @${clip.winnerName}`);
                }}
                className="relative grid size-12 place-items-center rounded-full border-2 border-accent bg-secondary p-0.5 shadow-glow transition-transform group-active:scale-95 group-hover:border-primary cursor-pointer"
                aria-label={`View ${clip.winnerName}'s status story`}
              >
                <span className="grid size-full place-items-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground">
                  {clip.winnerName.slice(0, 2).toUpperCase()}
                </span>
                {/* Floating status icon badge on story avatar */}
                <span
                  className="animate-float-bob absolute -top-1 -right-1 grid size-5 place-items-center rounded-full border border-accent/40 bg-black/80 text-[10px] shadow-lg backdrop-blur-md transition-transform hover:scale-125"
                  title={`Open ${clip.winnerName}'s ${statusIcon} story`}
                >
                  {statusIcon}
                </span>
                <span className="absolute -bottom-1.5 rounded-full border border-accent/60 bg-accent px-1.5 py-0.5 text-[8px] font-extrabold text-accent-foreground shadow-md">
                  {clip.amountWon}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedStoryClip(clip);
                  playSoundEffect("WIN");
                  notify(`Viewing status story of @${clip.winnerName}`);
                }}
                className="w-14 truncate text-center text-[10px] font-semibold text-foreground/90 hover:text-primary cursor-pointer"
              >
                {clip.winnerName}
              </button>
            </div>
          );
        })}
      </div>

      {/* TikTok Style Vertical Reel Container with Floating Clickable Status Icons */}
      <div className="mt-4 space-y-4">
        {winnerClips.map((clip, idx) => (
          <div
            key={clip.id}
            className={`relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-b ${clip.bgGradient} p-4 shadow-2xl sm:min-h-[440px]`}
          >
            {/* Top Floating Video Header Overlay (Clickable Status Badges) */}
            <div className="z-10 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedStoryClip(clip);
                  playSoundEffect("WIN");
                  notify(`Opening video story of @${clip.winnerName}`);
                }}
                className="animate-float-bob flex h-auto items-center gap-2 rounded-full border border-white/30 bg-black/60 px-3.5 py-1.5 shadow-2xl backdrop-blur-md transition-all active:scale-95 hover:bg-black/80 p-0 pr-3"
              >
                <span className="grid size-7 place-items-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground shadow-glow">
                  {clip.winnerName.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-xs font-bold text-white">@{clip.winnerName}</span>
                <span className="flex items-center gap-1 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-black text-accent-foreground shadow-md">
                  <Trophy className="size-3" />
                  {clip.amountWon} WIN
                </span>
              </Button>
              <div className="animate-float-slow flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTimelineFullscreen(true);
                    notify(`Full-screen vertical viewing of @${clip.winnerName}`);
                  }}
                  className="size-7 rounded-full border border-white/30 bg-black/60 text-white shadow-lg backdrop-blur-md transition-all active:scale-90 hover:bg-black/80"
                  aria-label={`Open full screen for ${clip.winnerName}`}
                  title="Full screen vertical view"
                >
                  <Maximize2 className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setRecordOpen(true);
                    notify("Open reaction video recorder");
                  }}
                  className="flex h-auto items-center gap-1.5 rounded-full border border-red-400/30 bg-red-600/90 px-3 py-1 text-[10px] font-extrabold text-white shadow-lg backdrop-blur-md animate-pulse active:scale-95 p-0"
                >
                  <span className="size-1.5 rounded-full bg-white" /> REC CLIP
                </Button>
                <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                  {clip.timeAgo}
                </span>
              </div>
            </div>

            {/* Floating Clickable Live Status Badges On Screen (Middle Left & Right) */}
            <div className="pointer-events-auto absolute inset-x-4 top-16 z-10 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => {
                  playSoundEffect("TICK");
                  notify(`Verified Draw Hash for @${clip.winnerName}: 0x8f...a92b`);
                }}
                className="animate-float-slow flex h-auto items-center gap-1.5 rounded-full border border-accent/40 bg-black/60 px-3 py-1 text-[10px] font-bold text-accent shadow-xl backdrop-blur-md transition-all active:scale-95 hover:bg-black/80"
              >
                <Sparkles className="size-3 text-accent" />
                <span>Verified Draw Hash</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedStoryClip(clip);
                  playSoundEffect("WIN");
                }}
                className="animate-float-bob flex h-auto items-center gap-1.5 rounded-full border border-primary/40 bg-black/60 px-3 py-1 text-[10px] font-bold text-primary shadow-xl backdrop-blur-md transition-all active:scale-95 hover:bg-black/80"
              >
                <Flame className="size-3 text-primary" />
                <span>{idx % 2 === 0 ? "🔥 Hot Reel" : "⚡ Instant Payout"}</span>
              </Button>
            </div>

            {/* Middle Video Simulation & Play Button */}
            <div className="z-10 flex flex-1 items-center justify-center py-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const isPlaying = activePlayingClipId === clip.id;
                  setActivePlayingClipId(isPlaying ? null : clip.id);
                  notify(
                    isPlaying
                      ? `Paused video reaction of @${clip.winnerName}`
                      : `Playing video reaction of @${clip.winnerName}`,
                  );
                  if (!isPlaying) playSoundEffect("WIN");
                }}
                className={`animate-float-bob size-16 rounded-full border border-white/40 text-white backdrop-blur-xl transition-all active:scale-90 hover:scale-105 shadow-glow ${
                  activePlayingClipId === clip.id
                    ? "border-accent bg-accent/40 shadow-glow"
                    : "bg-black/50 hover:bg-black/70"
                }`}
                aria-label={
                  activePlayingClipId === clip.id
                    ? `Pause video for ${clip.winnerName}`
                    : `Play video for ${clip.winnerName}`
                }
              >
                {activePlayingClipId === clip.id ? (
                  <Pause className="size-7 text-accent" />
                ) : (
                  <Play className="size-7 fill-white translate-x-0.5" />
                )}
              </Button>
            </div>

            {/* Bottom Info & Floating Right Sidebar Actions */}
            <div className="z-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-snug text-white drop-shadow-md">
                  {clip.caption}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <span className="grid size-6 place-items-center rounded-full bg-black/50 backdrop-blur-md">
                    <Music className="size-3.5 text-primary" />
                  </span>
                  <span className="truncate text-[11px] font-semibold">
                    Chain Gang Winners Sound · Original Clip
                  </span>
                </div>
              </div>

              {/* TikTok Style Floating Right Action Column */}
              <div className="flex flex-col items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setWinnerClips((prev) =>
                      prev.map((item) =>
                        item.id === clip.id ? { ...item, likes: item.likes + 1 } : item,
                      ),
                    );
                    notify("Liked winner reel!");
                  }}
                  className="animate-float-bob group flex flex-col items-center gap-1 rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl backdrop-blur-md transition-all active:scale-110 hover:bg-black/80"
                >
                  <Heart className="size-5 fill-rose-500 text-rose-500 transition-transform group-active:scale-125" />
                  <span className="text-[10px] font-bold">{clip.likes}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setChatOpen(true)}
                  className="animate-float-slow flex flex-col items-center gap-1 rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl backdrop-blur-md transition-all active:scale-110 hover:bg-black/80"
                >
                  <MessageCircle className="size-5 text-accent" />
                  <span className="text-[10px] font-bold">{clip.comments}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => shareClip(clip.id, clip.winnerName, clip.amountWon)}
                  className="animate-float-bob flex flex-col items-center gap-1 rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl backdrop-blur-md transition-all active:scale-110 hover:bg-black/80"
                  aria-label={`Share deep link for ${clip.winnerName}'s win`}
                >
                  <Share2 className="size-5 text-primary" />
                  <span className="text-[10px] font-bold">Share</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );

  const ActivityPanel = ({ mobile = false }: { mobile?: boolean }) => {
    const currentLeaderboard = leaderboardData[leaderboardTimeframe];

    return (
      <Panel id={mobile ? undefined : "feed"} className={mobile ? "min-h-full border-b-0" : ""}>
        {/* Top Navigation Tabs for Feed vs Leaderboard */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-secondary/80 p-1 backdrop-blur-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFeedTab("feed")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                feedTab === "feed"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <Sparkles className="size-3.5" /> Feed
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFeedTab("leaderboard")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                feedTab === "leaderboard"
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              <Trophy className="size-3.5" /> Leaderboard
            </Button>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-accent">
            {feedTab === "feed" ? (
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-live animate-ping" /> Live updates
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Flame className="size-3.5 text-amber-400" /> High Rollers
              </span>
            )}
          </span>
        </div>

        {feedTab === "feed" ? (
          <div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-primary">Live activity</p>
                <h2 className="font-display text-2xl font-bold">The feed</h2>
              </div>
              <Sparkles className="size-5 text-accent" />
            </div>
            <div className="mt-4 space-y-2.5">
              {activityList.map((item) => (
                <Button
                  variant="ghost"
                  key={item.id}
                  onClick={() => {
                    setSelectedPlayer(item.user);
                    if (mobile) {
                      selectPage(0);
                    } else {
                      scrollTo("live");
                    }
                  }}
                  className="grid h-auto w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent bg-secondary/80 p-3 text-left transition-all hover:border-primary/40 hover:bg-secondary"
                >
                  <span
                    className={`grid size-10 place-items-center rounded-md text-[10px] font-bold ${
                      item.kind === "WIN"
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {item.kind}
                  </span>
                  <span className="min-w-0">
                    <strong className="block truncate text-sm">{item.user}</strong>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.text}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-muted-foreground">
                      {item.time} ago
                    </span>
                  </span>
                  <strong className="text-sm font-bold text-accent">{item.amount}</strong>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Leaderboard Header */}
            <div className="mt-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-primary">Rankings by Prize</p>
                <h2 className="font-display text-2xl font-bold">Top Winners</h2>
              </div>
              <Trophy className="size-6 text-amber-400 animate-pulse" />
            </div>

            {/* Timeframe Selector Options */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-hide">
              {timeframeOptions.map((tf) => (
                <Button
                  key={tf.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLeaderboardTimeframe(tf.key);
                    notify(`Leaderboard timeframe: ${tf.label}`);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    leaderboardTimeframe === tf.key
                      ? "border border-primary/50 bg-primary/20 text-primary font-bold shadow-sm"
                      : "border border-border/50 bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {tf.label}
                </Button>
              ))}
            </div>

            {/* Winners Ranked Top to Bottom */}
            <div className="mt-3 space-y-2.5">
              {currentLeaderboard.map((item) => {
                const isTop1 = item.rank === 1;
                const isTop2 = item.rank === 2;
                const isTop3 = item.rank === 3;

                return (
                  <Button
                    variant="ghost"
                    key={`${leaderboardTimeframe}-${item.user}-${item.rank}`}
                    onClick={() => {
                      setSelectedPlayer(item.user);
                      notify(`Selected #${item.rank} winner @${item.user} (${item.prize} won)`);
                      if (mobile) {
                        selectPage(0);
                      } else {
                        scrollTo("live");
                      }
                    }}
                    className={`grid h-auto w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      isTop1
                        ? "border-amber-400/60 bg-gradient-to-r from-amber-500/15 via-purple-900/30 to-secondary shadow-glow"
                        : isTop2
                          ? "border-slate-300/50 bg-gradient-to-r from-slate-400/15 via-purple-900/20 to-secondary"
                          : isTop3
                            ? "border-amber-700/50 bg-gradient-to-r from-amber-800/15 via-purple-900/20 to-secondary"
                            : "border-border/60 bg-secondary/60 hover:border-primary/40 hover:bg-secondary"
                    }`}
                  >
                    {/* Rank Badge Column */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`grid size-9 place-items-center rounded-lg font-display text-xs font-extrabold ${
                          isTop1
                            ? "bg-amber-400 text-zinc-950 shadow-md ring-2 ring-amber-300/80"
                            : isTop2
                              ? "bg-slate-300 text-zinc-950 shadow-sm"
                              : isTop3
                                ? "bg-amber-700 text-amber-50 shadow-sm"
                                : "bg-card text-muted-foreground border border-border/80"
                        }`}
                      >
                        {isTop1 ? (
                          <Crown className="size-4 fill-zinc-950 text-zinc-950" />
                        ) : isTop2 ? (
                          <Medal className="size-4 fill-zinc-950 text-zinc-950" />
                        ) : isTop3 ? (
                          <Medal className="size-4 fill-amber-50 text-amber-50" />
                        ) : (
                          `#${item.rank}`
                        )}
                      </span>
                    </div>

                    {/* User Details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-bold text-foreground">
                          {item.user}
                        </span>
                        <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary truncate">
                          {item.badge}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{item.wins} wins</span>
                        <span>•</span>
                        <span className="truncate text-[11px]">{item.highlightGame}</span>
                      </div>
                    </div>

                    {/* Prize Won Column */}
                    <div className="text-right">
                      <span className="block font-display text-sm font-black text-amber-400">
                        {item.prize}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground">
                        Total Won
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </Panel>
    );
  };

  const QueuePanel = ({ mobile = false }: { mobile?: boolean }) => (
    <Panel id={mobile ? undefined : "queue"} className={mobile ? "min-h-full border-b-0" : ""}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-primary">Hash order</p>
          <h2 className="font-display text-2xl font-bold">Up next</h2>
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
          4 waiting
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {queue.map((item, index) => (
          <Button
            variant="ghost"
            key={item.hash}
            onClick={() => notify(`${item.user} is #${index + 1} in line`)}
            className="grid h-auto w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border p-3 text-left hover:border-primary/50"
          >
            <span className="font-display text-lg font-bold text-muted-foreground">
              0{index + 1}
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1 truncate text-sm font-semibold">
                {item.user}
                {item.agent && <Bot className="size-3.5 text-primary" />}
              </span>
              <span className="block truncate font-mono text-[10px] text-muted-foreground">
                {item.hash} · {item.chain}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">{item.tickets} left</span>
          </Button>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4">
        <p className="text-xs font-bold uppercase text-primary">Your position</p>
        <p className="mt-1 font-display text-3xl font-bold">#12</p>
        <p className="text-xs text-muted-foreground">Estimated wait: 55 seconds</p>
      </div>
    </Panel>
  );

  const SettingsPanel = ({ mobile = false }: { mobile?: boolean }) => (
    <Panel
      id={mobile ? "mobile-settings" : "settings"}
      className={mobile ? "min-h-full border-b-0 p-4" : ""}
    >
      <div>
        <p className="text-xs font-bold uppercase text-primary">Settings</p>
        <h2 className="font-display text-2xl font-bold">Your game</h2>
      </div>
      <div className="mt-5 space-y-2">
        {[
          { icon: Bell, label: "Draw alerts", active: alerts, set: () => setAlerts((v) => !v) },
          {
            icon: Radio,
            label: "Auto-play stream",
            active: autoplay,
            set: () => setAutoplay((v) => !v),
          },
          {
            icon: Volume2,
            label: "Sound effects",
            active: sound,
            set: () => {
              setSound((v) => {
                const next = !v;
                if (next) playSoundEffect("WIN");
                return next;
              });
            },
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex min-h-14 items-center gap-3 rounded-lg border border-border px-3"
          >
            <item.icon className="size-5 text-muted-foreground" />
            <span className="flex-1 text-sm font-semibold">{item.label}</span>
            <Toggle active={item.active} label={item.label} onChange={item.set} />
          </div>
        ))}
        {sound && (
          <div className="flex gap-2 pt-1">
            <Button
              variant="vaultOutline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => playSoundEffect("WIN")}
            >
              🎵 Test Win FX
            </Button>
            <Button
              variant="vaultOutline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => playSoundEffect("LOSE")}
            >
              🔊 Test Lose FX
            </Button>
          </div>
        )}
      </div>
    </Panel>
  );

  const WalletPanel = ({ mobile = false }: { mobile?: boolean }) => (
    <Panel
      id={mobile ? "mobile-wallet" : "wallet"}
      className={mobile ? "min-h-full border-b-0 p-4" : ""}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-primary">Vault & Wallet</p>
          <h2 className="font-display text-2xl font-bold">My Wallet</h2>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary shadow-glow">
          <Wallet className="size-3.5" /> Connected
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/60 to-background p-4 shadow-lg">
        <p className="text-xs font-semibold text-muted-foreground">Available Balance</p>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-display text-2xl font-black text-foreground">$1,482.50 USD</span>
          <span className="text-xs font-bold text-accent">0.854 ETH</span>
        </div>

        <Button
          variant="vault"
          size="touch"
          className="mt-4 w-full justify-center gap-2"
          onClick={() => notify("Wallet connect popup ready")}
        >
          <Wallet className="size-4" /> Connect / Manage Wallet
        </Button>
      </div>

      <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">
        Winner Payout Preference
      </p>
      <div className="mt-2 grid gap-2">
        {["Cash out", "PvP bet · from $0.20", "Keep playing AI bets"].map((option) => (
          <Button
            variant="ghost"
            key={option}
            aria-pressed={winnerOption === option}
            onClick={() => {
              setWinnerOption(option);
              notify(`${option} selected`);
            }}
            className={`grid h-auto grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border p-3 text-left text-sm font-semibold ${
              winnerOption === option
                ? "border-primary bg-primary/10 text-primary"
                : "border-border"
            }`}
          >
            <span>{option}</span>
            {winnerOption === option ? (
              <Check className="size-4" />
            ) : (
              <ChevronRight className="size-4 text-muted-foreground" />
            )}
          </Button>
        ))}
      </div>

      <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">Pay with</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {["Crypto", "Card", "x402", "Apple Pay", "Google Pay"].map((method) => (
          <Button
            variant={payment === method ? "vault" : "vaultOutline"}
            size="sm"
            key={method}
            aria-pressed={payment === method}
            onClick={() => setPayment(method)}
          >
            {method}
          </Button>
        ))}
      </div>
    </Panel>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl transition-all ${timelineFullscreen ? "hidden" : ""}`}
      >
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
          <Button
            variant="ghost"
            onClick={() => {
              selectPage(0);
              scrollTo("live");
            }}
            className="flex h-auto min-w-0 items-center gap-3 p-0 text-left"
            aria-label="Go to live draw"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-vault">
              CG
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground">
                <span className="size-1.5 animate-pulse rounded-full bg-live" />{" "}
                {pageNames[mobilePage]}
              </span>
              <span className="block truncate font-display text-lg font-bold">CHAIN GANG</span>
            </span>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSound((v) => {
                  const next = !v;
                  notify(next ? "Sound enabled 🔊" : "Sound muted 🔇");
                  if (next) playSoundEffect("WIN");
                  return next;
                });
              }}
              aria-label={sound ? "Mute sound effects" : "Enable sound effects"}
              className="size-9 rounded-lg border border-border/80 bg-secondary/80 text-foreground transition-all active:scale-95"
            >
              {sound ? (
                <Volume2 className="size-4 text-primary" />
              ) : (
                <VolumeX className="size-4 text-muted-foreground" />
              )}
            </Button>
            <Button
              variant="vaultOutline"
              size="sm"
              onClick={() => {
                selectPage(4);
                scrollTo("wallet");
                notify("Wallet page opened");
              }}
            >
              <Wallet /> Connect
            </Button>
          </div>
        </div>
      </header>

      <main className="sm:hidden">
        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${mobilePage * 100}%)` }}
          >
            <article className="h-[calc(100dvh-5.5rem)] w-full shrink-0 overflow-y-auto overscroll-contain">
              <LivePanel mobile />
            </article>
            <article className="h-[calc(100dvh-5.5rem)] w-full shrink-0 overflow-y-auto overscroll-contain">
              <WinnersTimelinePanel mobile />
            </article>
            <article className="h-[calc(100dvh-5.5rem)] w-full shrink-0 overflow-y-auto overscroll-contain">
              <ActivityPanel mobile />
            </article>
            <article className="h-[calc(100dvh-5.5rem)] w-full shrink-0 overflow-y-auto overscroll-contain">
              <QueuePanel mobile />
              <SettingsPanel mobile />
            </article>
            <article className="h-[calc(100dvh-5.5rem)] w-full shrink-0 overflow-y-auto overscroll-contain">
              <WalletPanel mobile />
            </article>
          </div>
        </div>
        {!timelineFullscreen && (
          <div
            className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-3 py-1.5 backdrop-blur-xl shadow-xl transition-all duration-300"
            aria-label={`Page ${mobilePage + 1} of ${pageNames.length}`}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous screen"
              disabled={mobilePage === 0}
              onClick={() => selectPage(mobilePage - 1)}
              className={`size-7 rounded-full transition-all duration-300 ${mobilePage === 0 ? "scale-75 opacity-0 pointer-events-none" : "opacity-100 hover:bg-secondary"}`}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-2 px-1">
              {pageNames.map((name, index) => (
                <Button
                  key={name}
                  variant="ghost"
                  size="icon"
                  aria-label={`Open ${name}`}
                  onClick={() => selectPage(index)}
                  className={`size-2 rounded-full p-0 transition-all ${index === mobilePage ? "bg-primary scale-125 shadow-glow" : "bg-muted-foreground/40"}`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next screen"
              disabled={mobilePage === pageNames.length - 1}
              onClick={() => selectPage(mobilePage + 1)}
              className={`size-7 rounded-full transition-all duration-300 ${mobilePage === pageNames.length - 1 ? "scale-75 opacity-0 pointer-events-none" : "opacity-100 hover:bg-secondary"}`}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </main>

      {/* Independently Floating Vertical Action Column */}
      <div
        aria-label="Floating quick actions and screens"
        className={`fixed right-3.5 bottom-20 z-50 flex flex-col items-center gap-1.5 transition-all duration-300 ease-in-out sm:hidden ${
          showFloatingIcons && !timelineFullscreen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-12 pointer-events-none"
        }`}
      >
        {/* Top Floating Action: Chat */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open live chat"
          onClick={() => {
            setChatOpen(true);
            notify("Live chat opened 💬");
          }}
          className="relative size-10 rounded-full border border-accent/60 bg-background/90 text-accent shadow-glow backdrop-blur-xl transition-all duration-200 hover:scale-110 active:scale-90"
        >
          <MessageCircle className="size-4.5" />
          <span className="absolute -top-0.5 -right-0.5 grid size-3 place-items-center rounded-full bg-accent text-[8px] font-black text-accent-foreground animate-pulse">
            •
          </span>
        </Button>

        {/* Top Floating Action: Like */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Like draw"
          aria-pressed={liked}
          onClick={toggleLike}
          className={`relative size-10 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-110 active:scale-90 ${
            liked
              ? "border-rose-500/80 bg-rose-500/20 text-rose-500 shadow-glow"
              : "border-border/80 bg-background/90 text-muted-foreground hover:border-rose-400 hover:text-rose-400"
          }`}
        >
          <Heart className={`size-4.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
        </Button>

        {/* Separator subtle indicator */}
        <div className="my-0.5 h-0.5 w-5 rounded-full bg-border/60 backdrop-blur-sm" />

        {/* Screen Navigation Buttons (Each Floating Independently) */}
        {[
          { icon: Radio, label: "Live / Bet", page: 0 },
          { icon: Film, label: "Winners Reel", page: 1 },
          { icon: Sparkles, label: "The Feed", page: 2 },
          { icon: Settings, label: "Hash & Settings", page: 3 },
          { icon: Wallet, label: "Wallet", page: 4 },
        ].map((item) => {
          const isActive = mobilePage === item.page;

          return (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              onClick={() => selectPage(item.page)}
              className={`relative size-10 rounded-full border shadow-xl backdrop-blur-xl transition-all duration-200 hover:scale-110 active:scale-90 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-glow scale-105"
                  : "border-border/80 bg-background/90 text-muted-foreground hover:border-primary/50 hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="size-4.5" />
            </Button>
          );
        })}
      </div>

      <main className="mx-auto hidden max-w-6xl px-4 pb-8 pt-4 sm:block">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-start">
          <div className="min-w-0 space-y-4">
            <LivePanel />
            <WinnersTimelinePanel />
            <ActivityPanel />
          </div>
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-20">
            <QueuePanel />
            <SettingsPanel />
            <WalletPanel />
          </aside>
        </div>
      </main>

      {selectedStoryClip && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedStoryClip(null);
          }}
        >
          <div className="float-up relative flex h-[85vh] max-h-[640px] w-full max-w-sm flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-zinc-900 via-primary/20 to-black p-4 shadow-2xl">
            {/* Top Story Header: Progress bar & User info */}
            <div className="z-10 space-y-3">
              <div className="flex gap-1">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-full bg-white animate-pulse" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground shadow-glow">
                    {selectedStoryClip.winnerName.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white flex items-center gap-1">
                      @{selectedStoryClip.winnerName}
                      <span className="rounded bg-accent/90 px-1 text-[9px] font-black text-accent-foreground">
                        {selectedStoryClip.amountWon} WIN
                      </span>
                    </h3>
                    <p className="text-[10px] text-white/70">{selectedStoryClip.timeAgo}</p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedStoryClip(null)}
                  className="size-8 rounded-full bg-black/40 text-white hover:bg-black/60"
                  aria-label="Close story viewer"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Middle Story Player Canvas */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-6 text-center">
              <div className="animate-float-bob relative grid size-24 place-items-center rounded-full border-4 border-accent/60 bg-black/50 shadow-glow backdrop-blur-xl">
                <Trophy className="size-10 text-accent" />
                <span className="absolute -top-2 -right-2 grid size-7 place-items-center rounded-full bg-live text-xs font-black text-white shadow-lg animate-ping">
                  🔥
                </span>
              </div>
              <p className="mt-4 text-base font-bold text-white drop-shadow-md">
                "{selectedStoryClip.caption}"
              </p>
              <div className="mt-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/90 backdrop-blur-md">
                <Sparkles className="size-3.5 text-accent" />
                <span>Chain Reaction Story · Verified Payout</span>
              </div>
            </div>

            {/* Bottom Story Footer Controls */}
            <div className="z-10 flex items-center justify-between gap-3 pt-2">
              <Button
                variant="vault"
                size="sm"
                onClick={() => {
                  setWinnerClips((prev) =>
                    prev.map((item) =>
                      item.id === selectedStoryClip.id ? { ...item, likes: item.likes + 1 } : item,
                    ),
                  );
                  setSelectedStoryClip((prev) =>
                    prev ? { ...prev, likes: prev.likes + 1 } : null,
                  );
                  playSoundEffect("WIN");
                  notify(`Sent heart to @${selectedStoryClip.winnerName}!`);
                }}
                className="flex-1 gap-1.5"
              >
                <Heart className="size-4 fill-current text-rose-400" />
                <span>Like Story ({selectedStoryClip.likes})</span>
              </Button>

              <Button
                variant="vaultOutline"
                size="touchIcon"
                onClick={() => {
                  shareClip(
                    selectedStoryClip.id,
                    selectedStoryClip.winnerName,
                    selectedStoryClip.amountWon,
                  );
                }}
                aria-label="Share story"
              >
                <Share2 className="size-4 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {recordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
          <div className="float-up w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="size-5 text-primary" />
                <h3 className="font-display text-lg font-bold">Record Winner Reaction</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setRecordOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>

            <div className="relative my-4 flex h-60 flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-secondary/80 p-4 text-center">
              <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                <span className="size-1.5 animate-ping rounded-full bg-white" /> CAMERA LIVE
              </span>
              <Film className="size-12 text-primary/60 animate-bounce" />
              <p className="mt-2 text-xs font-semibold text-foreground">
                {isRecording
                  ? `Recording victory clip (${recordingProgress}%)...`
                  : "Tap below to record victory video"}
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="vault"
                size="touch"
                className="w-full"
                disabled={isRecording}
                onClick={() => {
                  setIsRecording(true);
                  let progress = 0;
                  const interval = setInterval(() => {
                    progress += 20;
                    setRecordingProgress(progress);
                    if (progress >= 100) {
                      clearInterval(interval);
                      setIsRecording(false);
                      setRecordOpen(false);
                      const userClip = {
                        id: `clip-${Date.now()}`,
                        winnerName: "you",
                        amountWon: "$412.80",
                        caption: "Recorded my victory reaction! Instant cashout! 🎉🔥",
                        timeAgo: "just now",
                        likes: 12,
                        comments: 2,
                        bgGradient: "from-purple-600/40 via-rose-900/50 to-zinc-950",
                        hasVideo: true,
                      };
                      setWinnerClips((prev) => [userClip, ...prev]);
                      notify("📹 Winner video reaction recorded & posted!");
                    }
                  }, 500);
                }}
              >
                {isRecording ? "Recording video..." : "Start Recording"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 z-30 hidden gap-2 sm:flex">
        <Button
          variant="vaultOutline"
          size="touchIcon"
          aria-label="Copy game link"
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            notify("Link copied");
          }}
        >
          <Copy />
        </Button>
        <Button variant="vault" size="touch" onClick={share}>
          <Share2 /> Share draw
        </Button>
      </div>

      {chatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-background/70 backdrop-blur-sm sm:items-center sm:justify-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setChatOpen(false);
          }}
        >
          <div className="float-up w-full border-t border-border bg-card p-4 sm:max-w-md sm:rounded-lg sm:border">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
              <div>
                <p className="text-xs font-bold uppercase text-primary">Live room</p>
                <h2 className="font-display text-xl font-bold">Gang chat</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close chat"
                onClick={() => setChatOpen(false)}
              >
                <X />
              </Button>
            </div>
            <div className="mt-4 max-h-56 space-y-2 overflow-y-auto">
              {messages.map((message, index) => (
                <p key={`${message}-${index}`} className="rounded-lg bg-secondary p-3 text-sm">
                  {message}
                </p>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <input
                value={chat}
                onChange={(event) => setChat(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendChat();
                }}
                placeholder="Say something…"
                aria-label="Chat message"
                className="min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              />
              <Button variant="vault" size="touchIcon" aria-label="Send message" onClick={sendChat}>
                <Send />
              </Button>
            </div>
          </div>
        </div>
      )}
      {notice && (
        <div
          role="status"
          className="float-up fixed left-1/2 top-20 z-[60] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface-raised px-4 py-2 text-xs font-semibold shadow-xl"
        >
          <Check className="size-4 text-accent" />
          {notice}
        </div>
      )}

      {/* Full-Screen Vertical Scroll Timeline Reels (All extra overlayed items disappear) */}
      {timelineFullscreen && (
        <div
          className="fixed inset-0 z-[100] h-[100dvh] w-screen overflow-y-scroll snap-y snap-mandatory touch-pan-y scrollbar-hide bg-black text-white"
          tabIndex={0}
        >
          {winnerClips.map((clip, index) => (
            <section
              key={`fullscreen-${clip.id}`}
              className={`relative flex h-[100dvh] w-full snap-start snap-always flex-col justify-between overflow-hidden bg-gradient-to-b ${clip.bgGradient} p-5 sm:p-8`}
            >
              {/* Minimal Top Header: Exit Full Screen Button & Reels Counter */}
              <div className="z-20 flex items-center justify-between pt-1">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setTimelineFullscreen(false);
                    notify("Exited full screen");
                  }}
                  className="flex h-auto items-center gap-2 rounded-full border border-white/30 bg-black/60 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xl backdrop-blur-xl transition-all active:scale-95 hover:bg-black/80 hover:text-white"
                  aria-label="Exit full-screen view"
                >
                  <Minimize2 className="size-4 text-primary" />
                  <span>Exit Full Screen</span>
                </Button>

                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1 text-xs font-bold text-white shadow-xl backdrop-blur-xl">
                  <span className="text-primary font-mono">{index + 1}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/80 font-mono">{winnerClips.length}</span>
                  <span className="ml-1 text-[11px] text-accent font-semibold">Swipe ↕</span>
                </div>
              </div>

              {/* Middle Video Simulation & Central Play/Pause button */}
              <div className="relative z-10 flex flex-1 items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const isPlaying = activePlayingClipId === clip.id;
                    setActivePlayingClipId(isPlaying ? null : clip.id);
                    notify(
                      isPlaying
                        ? `Paused @${clip.winnerName}`
                        : `Playing video reaction of @${clip.winnerName}`,
                    );
                    if (!isPlaying) playSoundEffect("WIN");
                  }}
                  className={`size-20 sm:size-24 rounded-full border-2 border-white/40 text-white backdrop-blur-2xl transition-all active:scale-90 hover:scale-105 shadow-glow ${
                    activePlayingClipId === clip.id
                      ? "border-accent bg-accent/40 shadow-glow animate-pulse"
                      : "bg-black/40 hover:bg-black/60"
                  }`}
                  aria-label={
                    activePlayingClipId === clip.id
                      ? `Pause video for ${clip.winnerName}`
                      : `Play video for ${clip.winnerName}`
                  }
                >
                  {activePlayingClipId === clip.id ? (
                    <Pause className="size-9 sm:size-10 text-accent" />
                  ) : (
                    <Play className="size-9 sm:size-10 fill-white translate-x-0.5" />
                  )}
                </Button>
              </div>

              {/* Bottom Winner Info & TikTok Style Right Action Column */}
              <div className="z-20 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 pb-3">
                <div className="space-y-2.5 max-w-md">
                  <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground shadow-glow">
                      {clip.winnerName.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base font-bold text-white drop-shadow-md">
                          @{clip.winnerName}
                        </span>
                        <span className="flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-black text-accent-foreground shadow-md">
                          <Trophy className="size-3" />
                          {clip.amountWon} WIN
                        </span>
                      </div>
                      <span className="text-[11px] text-white/70">{clip.timeAgo}</span>
                    </div>
                  </div>

                  <p className="text-sm font-medium leading-relaxed text-white drop-shadow-md">
                    {clip.caption}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <span className="grid size-6 place-items-center rounded-full bg-black/50 backdrop-blur-md">
                      <Music className="size-3.5 text-primary" />
                    </span>
                    <span className="truncate text-[11px] font-semibold">
                      Chain Gang Winners Sound · Original Clip
                    </span>
                  </div>
                </div>

                {/* TikTok Style Floating Right Action Buttons */}
                <div className="flex flex-col items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setWinnerClips((prev) =>
                        prev.map((item) =>
                          item.id === clip.id ? { ...item, likes: item.likes + 1 } : item,
                        ),
                      );
                      playSoundEffect("WIN");
                      notify("Liked winner reel! ❤️");
                    }}
                    className="flex h-auto flex-col items-center gap-1 rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-2xl backdrop-blur-xl transition-all active:scale-110 hover:bg-black/80 hover:text-white"
                  >
                    <Heart className="size-5 fill-rose-500 text-rose-500" />
                    <span className="text-[10px] font-bold">{clip.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setChatOpen(true)}
                    className="flex h-auto flex-col items-center gap-1 rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-2xl backdrop-blur-xl transition-all active:scale-110 hover:bg-black/80 hover:text-white"
                  >
                    <MessageCircle className="size-5 text-accent" />
                    <span className="text-[10px] font-bold">{clip.comments}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => shareClip(clip.id, clip.winnerName, clip.amountWon)}
                    className="flex h-auto flex-col items-center gap-1 rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-2xl backdrop-blur-xl transition-all active:scale-110 hover:bg-black/80 hover:text-white"
                    aria-label={`Share deep link for ${clip.winnerName}'s win`}
                  >
                    <Share2 className="size-5 text-primary" />
                    <span className="text-[10px] font-bold">Share</span>
                  </Button>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
