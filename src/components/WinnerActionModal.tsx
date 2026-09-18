import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Check, DollarSign, Play, Sparkles, Swords, Trophy, Wallet } from "lucide-react";
import React, { useState } from "react";
import type { WinnerPostData } from "./CameraStudioModal";

interface WinnerActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  winnerClip: WinnerPostData | null;
  amountWon: string;
  onCashOut: () => void;
  onEnterPvP: () => void;
  onContinueAIBet: () => void;
}

export function WinnerActionModal({
  open,
  onOpenChange,
  winnerClip,
  amountWon,
  onCashOut,
  onEnterPvP,
  onContinueAIBet,
}: WinnerActionModalProps) {
  const [selectedAction, setSelectedAction] = useState<"CASHOUT" | "PVP" | "AIBET">("CASHOUT");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedNotice, setCompletedNotice] = useState<string | null>(null);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (selectedAction === "CASHOUT") {
        setCompletedNotice(`Successfully initiated ${amountWon} withdrawal to connected Base wallet!`);
        setTimeout(() => {
          setCompletedNotice(null);
          onCashOut();
          onOpenChange(false);
        }, 1200);
      } else if (selectedAction === "PVP") {
        onEnterPvP();
        onOpenChange(false);
      } else {
        onContinueAIBet();
        onOpenChange(false);
      }
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card p-5 sm:p-6 text-foreground shadow-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-accent/20 border border-accent/40 text-accent mb-2">
            <Trophy className="size-6 text-accent animate-bounce" />
          </div>
          <DialogTitle className="font-display text-2xl font-black text-white">
            VICTORY! YOU WON {amountWon}
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Your winning image and reaction have been <strong className="text-primary">auto-posted to the Status Stories and Public Timeline Feed</strong>!
          </p>
        </DialogHeader>

        {/* Auto-posted Image Preview */}
        {winnerClip && (
          <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-lg aspect-video flex items-center justify-center">
            {winnerClip.mediaUrl ? (
              winnerClip.mediaType === "video" ? (
                <video
                  src={winnerClip.mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover"
                />
              ) : (
                <img
                  src={winnerClip.mediaUrl}
                  alt={winnerClip.caption}
                  className="size-full object-cover"
                />
              )
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Sparkles className="size-8 text-amber-400 mb-1" />
                <span className="text-xs font-bold text-white">AI Micro-Expression Match</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white">
              <span className="font-bold">@{winnerClip.winnerName}</span>
              <span className="rounded bg-accent/90 px-1.5 py-0.5 font-mono text-[10px] font-black text-accent-foreground">
                AUTO-POSTED TO FEED
              </span>
            </div>
          </div>
        )}

        {/* Economy Options for Winner */}
        <div className="mt-4 space-y-2">
          <p className="text-xs font-bold uppercase text-primary">Choose Your Next Move</p>

          {/* Option 1: Cash Out */}
          <button
            type="button"
            onClick={() => setSelectedAction("CASHOUT")}
            className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
              selectedAction === "CASHOUT"
                ? "border-accent bg-accent/15 shadow-sm"
                : "border-border bg-background/50 hover:border-border/80"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-lg bg-accent/20 text-accent">
                <Wallet className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Cash Out Full Winnings</p>
                <p className="text-xs text-muted-foreground">Transfer {amountWon} instantly to wallet</p>
              </div>
            </div>
            {selectedAction === "CASHOUT" && <Check className="size-4 text-accent" />}
          </button>

          {/* Option 2: Enter PvP Bets (min $0.20) */}
          <button
            type="button"
            onClick={() => setSelectedAction("PVP")}
            className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
              selectedAction === "PVP"
                ? "border-primary bg-primary/15 shadow-sm"
                : "border-border bg-background/50 hover:border-border/80"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/20 text-primary">
                <Swords className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Enter PvP Duel Arena</p>
                <p className="text-xs text-muted-foreground">Minimum $0.20 wager · AI judged features</p>
              </div>
            </div>
            {selectedAction === "PVP" && <Check className="size-4 text-primary" />}
          </button>

          {/* Option 3: Continue Random AI Bets */}
          <button
            type="button"
            onClick={() => setSelectedAction("AIBET")}
            className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
              selectedAction === "AIBET"
                ? "border-amber-500 bg-amber-500/15 shadow-sm"
                : "border-border bg-background/50 hover:border-border/80"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-lg bg-amber-500/20 text-amber-400">
                <Play className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Continue Random AI Pool</p>
                <p className="text-xs text-muted-foreground">Re-enter 10 tickets ($0.09 each = $1.00 entry)</p>
              </div>
            </div>
            {selectedAction === "AIBET" && <Check className="size-4 text-amber-400" />}
          </button>
        </div>

        {completedNotice && (
          <div className="mt-2 rounded-lg bg-accent/20 border border-accent/40 p-2.5 text-center text-xs font-bold text-accent">
            {completedNotice}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="flex-1 text-xs"
          >
            Close
          </Button>
          <Button
            variant="vault"
            size="sm"
            disabled={isProcessing}
            onClick={handleConfirm}
            className="flex-1 text-xs flex items-center justify-center gap-1.5"
          >
            <span>{isProcessing ? "Processing..." : "Confirm Action"}</span>
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
