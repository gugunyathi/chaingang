import { Button } from "@/components/ui/button";
import { Camera, CameraOff, Crown, Flame, RefreshCw, Trophy, Zap } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import type { WinnerPostData } from "./CameraStudioModal";

export const AI_AR_STYLES = [
  {
    id: "cyber-gold",
    name: "Cyber Gold Crown",
    icon: Crown,
    gradient: "from-amber-500 via-yellow-600 to-amber-950",
    color: "#f59e0b",
    tag: "AI Curated: High-Roller Gold Aura",
  },
  {
    id: "laser-blitz",
    name: "Neon Laser Blitz",
    icon: Zap,
    gradient: "from-cyan-500 via-blue-600 to-slate-950",
    color: "#06b6d4",
    tag: "AI Curated: 10-Second Warp Speed",
  },
  {
    id: "flame-jackpot",
    name: "Inferno Jackpot",
    icon: Flame,
    gradient: "from-rose-600 via-orange-600 to-neutral-950",
    color: "#f43f5e",
    tag: "AI Curated: Peak Arena Victory",
  },
  {
    id: "diamond-vault",
    name: "Diamond Vault",
    icon: Trophy,
    gradient: "from-purple-600 via-pink-600 to-zinc-950",
    color: "#a855f7",
    tag: "AI Curated: Diamond Hands Tier",
  },
];

interface LiveCameraArenaProps {
  count: number;
  drawResult: "WIN" | "LOSE" | null;
  resultBanner: string | null;
  potInteger: string;
  potDecimal: string;
  recentChange: { amount: string; type: "up" | "down"; label: string } | null;
  selectedPlayer: string;
  liked: boolean;
  onToggleLike: () => void;
  onPostWinnerClip: (clip: WinnerPostData) => void;
  playSoundEffect: (type: "WIN" | "LOSE" | "TICK") => void;
  notify: (msg: string) => void;
  onScreenClick?: () => void;
}

export function LiveCameraArena({
  count,
  drawResult,
  resultBanner,
  potInteger: _potInteger,
  potDecimal: _potDecimal,
  recentChange: _recentChange,
  selectedPlayer,
  liked: _liked,
  onToggleLike,
  onPostWinnerClip,
  playSoundEffect: _playSoundEffect,
  notify: _notify,
  onScreenClick,
}: LiveCameraArenaProps) {
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const selectedStyle = AI_AR_STYLES[0];

  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastCapturedCountRef = useRef<number>(-1);

  // Stop camera tracks cleanly
  const stopMediaTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Initialize camera stream once and keep it steady
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      stopMediaTracks();

      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 1280 },
        },
        audio: false,
      });

      streamRef.current = userMedia;
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = userMedia;
      }
    } catch (err) {
      console.warn("Camera auto-start note:", err);
      setCameraError("Camera permission pending. Tap to enable webcam.");
    }
  }, [facingMode, stopMediaTracks]);

  // Mount effect: start camera
  useEffect(() => {
    startCamera();
    return () => {
      stopMediaTracks();
    };
  }, [startCamera, stopMediaTracks]);

  // Pure background silent snapshot function - completely invisible to the eye
  const captureBackgroundSnapshot = useCallback((): string => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 640;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          ctx.drawImage(videoRef.current, 0, 0, 640, 640);
        } else {
          const grad = ctx.createLinearGradient(0, 0, 640, 640);
          grad.addColorStop(0, "#18181b");
          grad.addColorStop(0.5, selectedStyle.color);
          grad.addColorStop(1, "#000000");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 640, 640);

          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 96px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(selectedPlayer.slice(0, 2).toUpperCase(), 320, 340);
        }

        // Clean border & watermark for the saved gallery item
        ctx.strokeStyle = selectedStyle.color;
        ctx.lineWidth = 6;
        ctx.strokeRect(12, 12, 616, 616);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`🏆 @${selectedPlayer} · $412.80 WINNER`, 24, 610);

        return canvas.toDataURL("image/jpeg", 0.85);
      }
    } catch (e) {
      console.warn("Background snapshot note:", e);
    }
    return "";
  }, [selectedPlayer, selectedStyle]);

  // Capture image in the background when countdown finishes (zero flash, zero stream interruption)
  useEffect(() => {
    if (count === 0 && lastCapturedCountRef.current !== 0) {
      lastCapturedCountRef.current = 0;

      // Silent background capture
      const photoUrl = captureBackgroundSnapshot();

      if (photoUrl) {
        const newWinClip: WinnerPostData = {
          id: `clip-live-${Date.now()}`,
          winnerName: selectedPlayer === "you" ? "you" : selectedPlayer,
          amountWon: "$412.80",
          caption: `🔥 Just won $412.80 live on camera! ${selectedStyle.tag} @ 0.00s! 🚀✨`,
          timeAgo: "just now",
          likes: 12,
          comments: 3,
          bgGradient: selectedStyle.gradient,
          hasVideo: false,
          mediaUrl: photoUrl,
          mediaType: "image",
          aiPrompt: selectedStyle.tag,
          micDecibels: "82 dB Cheer",
        };

        onPostWinnerClip(newWinClip);
      }
    } else if (count > 0) {
      lastCapturedCountRef.current = count;
    }
  }, [count, captureBackgroundSnapshot, onPostWinnerClip, selectedPlayer, selectedStyle]);

  // Smooth progress calculation (10s total)
  const progressPercent = Math.max(0, Math.min(100, (count / 10) * 100));
  const strokeDashoffset = 283 - (283 * progressPercent) / 100;

  return (
    <div
      onClick={onScreenClick}
      className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black cursor-pointer select-none"
    >
      {/* 100% Steady Live Camera Video (No opacity transitions, no flashing overlays) */}
      <div className="relative size-full min-h-[420px] sm:min-h-[480px] flex items-center justify-center overflow-hidden bg-zinc-950">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 size-full object-cover scale-x-[-1]"
        />

        {/* Fallback View if camera permission not yet granted */}
        {(!cameraActive || cameraError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 bg-zinc-950">
            <div className="grid size-14 place-items-center rounded-full bg-primary/20 border border-primary/50 text-primary mb-3">
              <Camera className="size-7" />
            </div>
            <p className="text-sm font-bold text-white">Live Camera</p>
            <p className="mt-1 max-w-xs text-xs text-zinc-400">
              {cameraError || "Enable webcam to see your live face"}
            </p>
            <Button
              variant="vaultOutline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              className="mt-3 flex items-center gap-1.5 text-xs"
            >
              <RefreshCw className="size-3" />
              <span>Enable Camera</span>
            </Button>
          </div>
        )}

        {/* Discreet Top Minimal Controls */}
        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md">
            <span className="size-2 rounded-full bg-red-500" />
            <span className="font-mono text-[10px] text-red-300">REC 10S</span>
            <span className="text-white/30">·</span>
            <span className="text-[10px] text-white/70">Live</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                if (cameraActive) {
                  stopMediaTracks();
                  setCameraActive(false);
                } else {
                  startCamera();
                }
              }}
              title={cameraActive ? "Turn off camera" : "Turn on camera"}
              className="size-7 rounded-full text-white/90 hover:bg-white/20"
            >
              {cameraActive ? <Camera className="size-3.5" /> : <CameraOff className="size-3.5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
              }}
              title="Flip camera"
              className="size-7 rounded-full text-white/90 hover:bg-white/20"
            >
              <RefreshCw className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Center: Translucent Floating Countdown Over Face */}
        <div className="pointer-events-none z-20 flex flex-col items-center justify-center p-4">
          {resultBanner && (
            <div
              className={`mb-4 flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold backdrop-blur-md ${
                drawResult === "WIN"
                  ? "border-accent/40 bg-accent/25 text-accent"
                  : "border-destructive/40 bg-destructive/25 text-destructive-foreground"
              }`}
            >
              {drawResult === "WIN" ? <Trophy className="size-4 text-accent" /> : null}
              <span>{resultBanner}</span>
            </div>
          )}

          <div className="relative size-44 sm:size-52 flex items-center justify-center">
            {/* Steady glowing countdown progress track */}
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-white/10 fill-none"
                strokeWidth="3"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="fill-none transition-all duration-300 ease-linear"
                strokeWidth="3"
                strokeDasharray="283"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke={drawResult === "WIN" ? "#22c55e" : "rgba(255, 255, 255, 0.55)"}
              />
            </svg>

            {/* Translucent Center Digits / Outcome */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike();
              }}
              className="pointer-events-auto absolute inset-0 flex flex-col items-center justify-center rounded-full transition-transform active:scale-95"
            >
              {drawResult === "WIN" ? (
                <div className="flex flex-col items-center">
                  <span className="font-display text-5xl sm:text-6xl font-black text-accent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    WIN!
                  </span>
                  <span className="text-[11px] font-bold uppercase text-white drop-shadow-md">
                    +$412.80
                  </span>
                </div>
              ) : drawResult === "LOSE" ? (
                <span className="font-display text-5xl sm:text-6xl font-black text-destructive drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  LOSE
                </span>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="font-display text-7xl sm:text-9xl font-black text-white/25 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] select-none">
                    {count}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
