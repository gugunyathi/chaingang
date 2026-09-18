import { Button } from "@/components/ui/button";
import { Check, Clock, Hash, Layers, ShieldCheck, Ticket, Users } from "lucide-react";
import React from "react";

export interface QueueItem {
  id: string;
  user: string;
  txHash: string;
  timestamp: string;
  chain: string;
  ticketsLeft: number;
  totalTickets: number;
  ticketValue: string;
  loginDuration: string;
  totalTransactions: number;
  isAgent?: boolean;
}

interface QueueTicketsHUDProps {
  queue: QueueItem[];
  userQueued: boolean;
  onToggleQueue: () => void;
  notify: (msg: string) => void;
}

export const INITIAL_QUEUE_DATA: QueueItem[] = [
  {
    id: "q-1",
    user: "ava.base",
    txHash: "0x7a1f9e2b4c81",
    timestamp: "14:11:02 UTC",
    chain: "Base",
    ticketsLeft: 10,
    totalTickets: 10,
    ticketValue: "$0.09",
    loginDuration: "4h 12m",
    totalTransactions: 128,
  },
  {
    id: "q-2",
    user: "agent_07",
    txHash: "0x7a3b8c4d901e",
    timestamp: "14:11:08 UTC",
    chain: "ARC",
    ticketsLeft: 7,
    totalTickets: 10,
    ticketValue: "$0.09",
    loginDuration: "6h 45m",
    totalTransactions: 340,
    isAgent: true,
  },
  {
    id: "q-3",
    user: "solmonk",
    txHash: "0x7b02551a884a",
    timestamp: "14:11:15 UTC",
    chain: "Solana",
    ticketsLeft: 3,
    totalTickets: 10,
    ticketValue: "$0.09",
    loginDuration: "2h 30m",
    totalTransactions: 68,
  },
  {
    id: "q-4",
    user: "0xk9d",
    txHash: "0x7c992ef10a22",
    timestamp: "14:11:24 UTC",
    chain: "Base",
    ticketsLeft: 8,
    totalTickets: 10,
    ticketValue: "$0.09",
    loginDuration: "1h 50m",
    totalTransactions: 45,
  },
];

export function QueueTicketsHUD({
  queue,
  userQueued,
  onToggleQueue,
  notify,
}: QueueTicketsHUDProps) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-3 sm:p-4 text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-primary">
            <Ticket className="size-4" />
            <span className="text-xs font-bold uppercase tracking-wide">Blockchain Queue Order</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            $1 Entry = 10 Tickets ($0.09 each) · Strict Hash + Timestamp Order
          </p>
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-mono font-bold text-muted-foreground">
          {queue.length} in Queue
        </span>
      </div>

      {/* Tie-breaker explanation */}
      <div className="flex items-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-[11px] text-muted-foreground">
        <ShieldCheck className="size-3.5 text-accent shrink-0" />
        <span>
          <strong className="text-foreground">Tie-Breakers:</strong> Longest active session duration & highest historical transaction count.
        </span>
      </div>

      {/* Queue Items */}
      <div className="space-y-2">
        {queue.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-center justify-between rounded-lg border p-2.5 transition-all text-xs ${
              index === 0
                ? "border-accent/40 bg-accent/10 shadow-sm"
                : "border-border bg-background/50"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-display font-black text-sm text-primary">
                0{index + 1}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground truncate">@{item.user}</span>
                  {item.isAgent && (
                    <span className="rounded bg-primary/20 px-1 py-0.2 text-[9px] font-bold text-primary">
                      AI Agent
                    </span>
                  )}
                  {index === 0 && (
                    <span className="rounded bg-accent/30 px-1.5 py-0.2 text-[9px] font-black text-accent">
                      LIVE ON CAMERA
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                  <span>{item.txHash}</span>
                  <span>·</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-foreground block">
                {item.ticketsLeft}/10 Tickets
              </span>
              <span className="text-[10px] text-muted-foreground">
                {item.loginDuration} · {item.totalTransactions} txs
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Join / Leave Queue Button */}
      <Button
        variant={userQueued ? "vaultOutline" : "vault"}
        size="touch"
        onClick={onToggleQueue}
        className="w-full flex items-center justify-center gap-2 font-bold mt-2"
      >
        {userQueued ? (
          <>
            <Check className="size-4 text-accent" />
            <span>QUEUED WITH 10 TICKETS ($1.00)</span>
          </>
        ) : (
          <>
            <Ticket className="size-4" />
            <span>JOIN QUEUE · $1.00 (10 TICKETS @ $0.09)</span>
          </>
        )}
      </Button>
    </div>
  );
}
