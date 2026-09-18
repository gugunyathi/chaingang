import { Button } from "@/components/ui/button";
import { Bot, Clock, Flame, Globe, Sparkles, TrendingUp, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface CompositeSceneTarget {
  id: string;
  name: string;
  targetMissingElement: string;
  inspirationSource: string;
  predictionMarketTrend: string;
  expiresInSec: number;
  matchScore: number;
}

const SAMPLE_SCENES: CompositeSceneTarget[] = [
  {
    id: "scene-419",
    name: "Cyber Euphoria Bull Run",
    targetMissingElement: "Confident Gaze + Subtle Right Brow Smirk",
    inspirationSource: "Tokyo Tech Summit & Polymarket Bull Surge",
    predictionMarketTrend: "ETH All-Time High Odds (+18%)",
    expiresInSec: 1140, // ~19 mins left
    matchScore: 94.6,
  },
  {
    id: "scene-420",
    name: "Golden Hour High-Roller Aura",
    targetMissingElement: "Illuminated Jaw Symmetry + Relaxed Smile",
    inspirationSource: "Viral Social Trends & Prediction Market Arbitrage",
    predictionMarketTrend: "Base Mainnet Active Wallets +34%",
    expiresInSec: 920,
    matchScore: 97.2,
  },
];

export function AiCriteriaHUD() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(1140);
  const [liveMicroExpressions, setLiveMicroExpressions] = useState({
    smileArc: 94.8,
    browAngle: 96.2,
    gazeFocus: 98.1,
    highRollerAura: 95.5,
  });

  const scene = SAMPLE_SCENES[currentSceneIndex] || SAMPLE_SCENES[0];

  // 20-min countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setCurrentSceneIndex((idx) => (idx + 1) % SAMPLE_SCENES.length);
          return 1200; // Reset 20 mins
        }
        return prev - 1;
      });

      // Micro fluctuations
      setLiveMicroExpressions({
        smileArc: Number((93 + Math.random() * 6).toFixed(1)),
        browAngle: Number((94 + Math.random() * 5).toFixed(1)),
        gazeFocus: Number((96 + Math.random() * 3.5).toFixed(1)),
        highRollerAura: Number((92 + Math.random() * 7).toFixed(1)),
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return (
    <div className="rounded-xl border border-primary/30 bg-black/40 backdrop-blur-md p-3 sm:p-4 space-y-3">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-primary">
          <Bot className="size-4" />
          <span className="text-xs font-bold uppercase tracking-wide">
            20-Min AI Composite Target
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
          <Clock className="size-3 text-primary" />
          <span>Rotates in {timeFormatted}</span>
        </div>
      </div>

      {/* Target Missing Element & Inspiration */}
      <div className="rounded-lg border border-border bg-background/60 p-2.5 space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white truncate">{scene.name}</span>
          <span className="rounded bg-accent/20 px-1.5 py-0.2 text-[10px] font-bold text-accent">
            Match {liveMicroExpressions.gazeFocus}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          <strong className="text-primary font-semibold">Missing Element Wanted:</strong>{" "}
          {scene.targetMissingElement}
        </p>
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 rounded bg-secondary/40 px-1.5 py-0.5">
            <Globe className="size-2.5 text-primary" />
            {scene.inspirationSource}
          </span>
          <span className="flex items-center gap-1 rounded bg-secondary/40 px-1.5 py-0.5 text-accent">
            <TrendingUp className="size-2.5" />
            {scene.predictionMarketTrend}
          </span>
        </div>
      </div>

      {/* Real-time Facial Micro-expression Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        <div className="rounded-md border border-white/5 bg-secondary/20 p-2">
          <span className="block text-[10px] text-muted-foreground">Smile Arc</span>
          <span className="font-mono font-bold text-accent">{liveMicroExpressions.smileArc}%</span>
        </div>
        <div className="rounded-md border border-white/5 bg-secondary/20 p-2">
          <span className="block text-[10px] text-muted-foreground">Brow Focus</span>
          <span className="font-mono font-bold text-primary">{liveMicroExpressions.browAngle}%</span>
        </div>
        <div className="rounded-md border border-white/5 bg-secondary/20 p-2">
          <span className="block text-[10px] text-muted-foreground">Gaze Vector</span>
          <span className="font-mono font-bold text-amber-400">{liveMicroExpressions.gazeFocus}%</span>
        </div>
        <div className="rounded-md border border-white/5 bg-secondary/20 p-2">
          <span className="block text-[10px] text-muted-foreground">Aura Tier</span>
          <span className="font-mono font-bold text-purple-400">{liveMicroExpressions.highRollerAura}%</span>
        </div>
      </div>
    </div>
  );
}
