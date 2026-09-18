import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bot, Check, DollarSign, Flame, Sparkles, Swords, Trophy, Users, Zap } from "lucide-react";
import React, { useState } from "react";

interface PvPArenaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userBalance?: number;
  notify: (msg: string) => void;
  playSoundEffect: (type: "WIN" | "LOSE" | "TICK") => void;
}

const PVP_OPPONENTS = [
  { name: "solmonk", rank: "#1 GOAT", avatar: "SM", winRate: "78%", recentStakes: "$5.00" },
  { name: "0xk9d", rank: "Smirk Pro", avatar: "K9", winRate: "64%", recentStakes: "$1.00" },
  { name: "agent_07", rank: "AI Autonomous", avatar: "A7", winRate: "82%", recentStakes: "$2.50" },
  { name: "nia.arc", rank: "Arc Master", avatar: "NA", winRate: "71%", recentStakes: "$0.50" },
];

export function PvPArenaModal({
  open,
  onOpenChange,
  userBalance = 412.8,
  notify,
  playSoundEffect,
}: PvPArenaModalProps) {
  const [wager, setWager] = useState<number>(0.2);
  const [selectedOpponent, setSelectedOpponent] = useState(PVP_OPPONENTS[0]);
  const [duelState, setDuelState] = useState<"IDLE" | "MATCHING" | "BATTLING" | "RESULT">("IDLE");
  const [duelOutcome, setDuelOutcome] = useState<"WIN" | "LOSE" | null>(null);
  const [aiVerdict, setAiVerdict] = useState<string>("");

  const WAGER_PRESETS = [0.2, 0.5, 1.0, 2.5, 5.0, 10.0];

  const startDuel = () => {
    setDuelState("MATCHING");
    playSoundEffect("TICK");
    notify(`Searching PvP Duel vs @${selectedOpponent.name} for $${wager.toFixed(2)} wager...`);

    setTimeout(() => {
      setDuelState("BATTLING");
      playSoundEffect("TICK");

      setTimeout(() => {
        const isWin = Math.random() > 0.45;
        const outcome = isWin ? "WIN" : "LOSE";
        setDuelOutcome(outcome);
        setDuelState("RESULT");
        playSoundEffect(outcome);

        if (isWin) {
          const winAmount = (wager * 1.9).toFixed(2);
          setAiVerdict(
            `AI Referee: Your facial micro-expression match (99.1%) beat @${selectedOpponent.name} (92.4%)! Awarded +$${winAmount}!`,
          );
          notify(`🏆 PvP Victory! Won +$${winAmount} vs @${selectedOpponent.name}!`);
        } else {
          setAiVerdict(
            `AI Referee: @${selectedOpponent.name} provided sharper brow symmetry (97.8% vs 91.2%). $${wager.toFixed(2)} added to rolling prize pool!`,
          );
          notify(`PvP Duel finished. Stakes rolled over to pot.`);
        }
      }, 3000);
    }, 1500);
  };

  const resetDuel = () => {
    setDuelState("IDLE");
    setDuelOutcome(null);
    setAiVerdict("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border bg-card p-5 sm:p-6 text-foreground shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-primary">
            <Swords className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Player vs Player Arena</span>
          </div>
          <DialogTitle className="font-display text-2xl font-bold">
            AI-Judged PvP Facial Duels
          </DialogTitle>
          <p className="text-xs text-muted-foreground">
            Wager against live players (min $0.20). The AI referee scores facial micro-expressions and awards the pot instantly.
          </p>
        </DialogHeader>

        {duelState === "IDLE" && (
          <div className="mt-4 space-y-4">
            {/* Wager Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span className="text-muted-foreground uppercase">Select Wager (Min $0.20)</span>
                <span className="text-primary font-mono font-bold">${wager.toFixed(2)} USD</span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {WAGER_PRESETS.map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={wager === amt ? "vault" : "vaultOutline"}
                    size="sm"
                    onClick={() => setWager(amt)}
                    className="h-8 text-xs font-mono font-bold"
                  >
                    ${amt.toFixed(amt === 0.2 || amt === 0.5 ? 2 : 0)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Select Opponent */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1.5">
                Select Challenger
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {PVP_OPPONENTS.map((opp) => (
                  <button
                    type="button"
                    key={opp.name}
                    onClick={() => setSelectedOpponent(opp)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      selectedOpponent.name === opp.name
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-border bg-background/50 hover:border-border/80"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-8 place-items-center rounded-full bg-secondary font-bold text-xs">
                        {opp.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-foreground">@{opp.name}</span>
                          <span className="text-[10px] text-primary">{opp.rank}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          Win Rate: {opp.winRate} · Typical Stake: {opp.recentStakes}
                        </span>
                      </div>
                    </div>
                    {selectedOpponent.name === opp.name && <Check className="size-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Judging Criteria Notice */}
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs space-y-1 text-muted-foreground">
              <div className="flex items-center gap-1.5 text-foreground font-semibold">
                <Bot className="size-3.5 text-primary" />
                <span>AI Referee Rules</span>
              </div>
              <p>
                The referee collects micro-expression confidence, symmetry, and target gaze angles during a 5-second camera duel.
              </p>
            </div>

            <Button
              variant="vault"
              size="touch"
              onClick={startDuel}
              className="w-full flex items-center justify-center gap-2 font-bold"
            >
              <Swords className="size-4" />
              <span>START DUEL · WAGER ${wager.toFixed(2)}</span>
            </Button>
          </div>
        )}

        {duelState === "MATCHING" && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <p className="text-base font-bold text-white">Connecting with @{selectedOpponent.name}...</p>
            <p className="text-xs text-muted-foreground">Locking smart contract escrow for ${wager.toFixed(2)}</p>
          </div>
        )}

        {duelState === "BATTLING" && (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <div className="size-16 rounded-full border-2 border-primary overflow-hidden bg-zinc-900 grid place-items-center font-bold text-white">
                  YOU
                </div>
                <span className="text-xs font-bold mt-1 text-primary">Camera Active</span>
              </div>
              <div className="font-display text-2xl font-black text-accent">VS</div>
              <div className="flex flex-col items-center">
                <div className="size-16 rounded-full border-2 border-muted overflow-hidden bg-zinc-900 grid place-items-center font-bold text-white">
                  {selectedOpponent.avatar}
                </div>
                <span className="text-xs font-bold mt-1 text-muted-foreground">@{selectedOpponent.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
              <Sparkles className="size-3.5 animate-spin" />
              <span>AI Referee Analyzing Facial Micro-Expressions...</span>
            </div>
          </div>
        )}

        {duelState === "RESULT" && (
          <div className="py-4 space-y-4">
            <div
              className={`p-4 rounded-xl border text-center ${
                duelOutcome === "WIN"
                  ? "border-accent/40 bg-accent/15 text-accent"
                  : "border-destructive/40 bg-destructive/15 text-destructive-foreground"
              }`}
            >
              {duelOutcome === "WIN" ? (
                <>
                  <Trophy className="size-10 text-accent mx-auto mb-1 animate-bounce" />
                  <p className="font-display text-2xl font-black text-white">DUEL VICTORY!</p>
                  <p className="text-sm font-bold text-accent mt-0.5">
                    +${(wager * 1.9).toFixed(2)} USD Added to Wallet
                  </p>
                </>
              ) : (
                <>
                  <Swords className="size-10 text-destructive mx-auto mb-1" />
                  <p className="font-display text-2xl font-black text-white">DUEL DEFEAT</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Stakes rolled over to cumulative pot
                  </p>
                </>
              )}
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border">
              {aiVerdict}
            </p>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="flex-1 text-xs"
              >
                Done
              </Button>
              <Button
                variant="vault"
                size="sm"
                onClick={resetDuel}
                className="flex-1 text-xs"
              >
                Duel Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
