import { Button } from "@/components/ui/button";
import {
  Camera,
  Check,
  Crown,
  Flame,
  Mic,
  MicOff,
  RefreshCw,
  Sparkles,
  Square,
  Trophy,
  Video,
  Volume2,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

export interface WinnerPostData {
  id: string;
  winnerName: string;
  amountWon: string;
  caption: string;
  timeAgo: string;
  likes: number;
  comments: number;
  bgGradient: string;
  hasVideo: boolean;
  mediaUrl?: string;
  mediaType: "video" | "image";
  aiPrompt?: string;
  micDecibels?: string;
}

interface CameraStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultWinnerName?: string;
  defaultPrizeAmount?: string;
  onPostClip: (clip: WinnerPostData) => void;
  playSound?: (type: "WIN" | "LOSE" | "TICK") => void;
  notify?: (msg: string) => void;
}

const AI_STYLES = [
  {
    id: "cyber-gold",
    name: "Cyber Gold Crown",
    icon: Crown,
    gradient: "from-amber-500 via-red-600 to-zinc-950",
    color: "#f59e0b",
    tag: "AI Curated: High-Roller Gold Aura",
  },
  {
    id: "laser-blitz",
    name: "Neon Laser Blitz",
    icon: Zap,
    gradient: "from-cyan-500 via-blue-700 to-slate-950",
    color: "#06b6d4",
    tag: "AI Curated: 5-Second Warp Speed",
  },
  {
    id: "flame-jackpot",
    name: "Inferno Jackpot",
    icon: Flame,
    gradient: "from-rose-600 via-orange-600 to-neutral-950",
    color: "#f43f5e",
    tag: "AI Curated: Peak Arena Victory Scream",
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

const ARENA_USERS = ["you", "ava.base", "solmonk", "agent_07", "0xk9d", "nia.arc", "cyber_sam"];

export function CameraStudioModal({
  isOpen,
  onClose,
  defaultWinnerName = "you",
  defaultPrizeAmount = "$412.80",
  onPostClip,
  playSound,
  notify,
}: CameraStudioModalProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [selectedStyle, setSelectedStyle] = useState(AI_STYLES[0]);
  const [winnerName, setWinnerName] = useState(defaultWinnerName);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [micVolume, setMicVolume] = useState(0);
  const [peakDecibels, setPeakDecibels] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [customCaption, setCustomCaption] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setWinnerName(defaultWinnerName);
  }, [defaultWinnerName]);

  const cleanupStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
  }, [stream]);

  // Request real Camera & Microphone access
  useEffect(() => {
    if (!isOpen) {
      cleanupStream();
      return;
    }

    let active = true;

    async function initMedia() {
      try {
        setCameraError(null);
        const userMedia = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 720 }, height: { ideal: 720 } },
          audio: isMicEnabled,
        });

        if (!active) {
          userMedia.getTracks().forEach((track) => track.stop());
          return;
        }

        setStream(userMedia);
        if (videoRef.current) {
          videoRef.current.srcObject = userMedia;
        }

        // Setup Audio Analyser for mic level meter
        if (isMicEnabled && userMedia.getAudioTracks().length > 0) {
          try {
            const AudioCtx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const ctx = new AudioCtx();
            const source = ctx.createMediaStreamSource(userMedia);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);

            audioContextRef.current = ctx;
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateVolume = () => {
              if (!analyserRef.current) return;
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
              }
              const avg = sum / bufferLength;
              const normalized = Math.min(100, Math.round((avg / 128) * 100));
              setMicVolume(normalized);
              setPeakDecibels((prev) => Math.max(prev, Math.round(40 + (normalized * 60) / 100)));

              animFrameRef.current = requestAnimationFrame(updateVolume);
            };
            updateVolume();
          } catch {
            // Audio context fallback
          }
        }
      } catch (err) {
        console.warn("Camera/Mic access note:", err);
        setCameraError(
          "Real camera access restricted or not granted. AI Visual Generator simulation mode active.",
        );
      }
    }

    initMedia();

    return () => {
      active = false;
      cleanupStream();
    };
  }, [isOpen, facingMode, isMicEnabled, cleanupStream]);

  // Switch between front and back camera
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // Take Snapshot and Render AI Celebration Artwork onto Canvas
  const takeAiSnapshot = () => {
    setIsAiProcessing(true);
    playSound?.("WIN");

    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // 1. Draw video frame or stylized fallback gradient
      if (videoRef.current && videoRef.current.readyState >= 2) {
        ctx.drawImage(videoRef.current, 0, 0, 640, 640);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 640, 640);
        grad.addColorStop(0, "#18181b");
        grad.addColorStop(0.5, selectedStyle.color);
        grad.addColorStop(1, "#000000");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 640, 640);

        // Draw avatar symbol
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 96px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(winnerName.slice(0, 2).toUpperCase(), 320, 340);
      }

      // 2. AI Celebration Tint & Vignette Overlay
      const overlayGrad = ctx.createRadialGradient(320, 320, 150, 320, 320, 420);
      overlayGrad.addColorStop(0, "rgba(0,0,0,0.1)");
      overlayGrad.addColorStop(1, "rgba(0,0,0,0.75)");
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, 0, 640, 640);

      // 3. AI Golden Victory Laurel / Border Ring
      ctx.strokeStyle = selectedStyle.color;
      ctx.lineWidth = 14;
      ctx.strokeRect(20, 20, 600, 600);

      // Inner thin neon ring
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, 580, 580);

      // 4. Draw Header Badge: "CHAIN GANG 5S WINNER"
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.beginPath();
      ctx.roundRect(40, 40, 260, 44, 22);
      ctx.fill();

      ctx.fillStyle = selectedStyle.color;
      ctx.font = "bold 16px Outfit, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`👑 ${selectedStyle.name.toUpperCase()}`, 56, 68);

      // 5. Draw Prize Ribbon & Amount
      ctx.fillStyle = selectedStyle.color;
      ctx.beginPath();
      ctx.roundRect(380, 40, 220, 50, 25);
      ctx.fill();

      ctx.fillStyle = "#000000";
      ctx.font = "900 24px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${defaultPrizeAmount} WIN`, 490, 75);

      // 6. Draw Winner Name & Verified Payout Timestamp
      ctx.fillStyle = "rgba(0,0,0,0.85)";
      ctx.beginPath();
      ctx.roundRect(40, 520, 560, 80, 16);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px Outfit, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`@${winnerName}`, 60, 554);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "13px Figtree, sans-serif";
      const cheerInfo =
        peakDecibels > 60 ? ` · Mic Cheer: ${peakDecibels} dB` : " · Verified Draw Instant Payout";
      ctx.fillText(`5-Second Arena Instant Win${cheerInfo}`, 60, 582);

      // 7. Draw AI Watermark
      ctx.fillStyle = selectedStyle.color;
      ctx.font = "bold 12px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`AI GENERATED #${Math.floor(Math.random() * 89999 + 10000)}`, 580, 554);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
      setCapturedImage(dataUrl);
      setRecordedVideoUrl(null);
    }

    setTimeout(() => {
      setIsAiProcessing(false);
      notify?.("✨ AI Winner Celebration photo generated from camera & mic!");
    }, 600);
  };

  // Start Real 5-Second Video Recording with Mic Audio
  const startVideoRecording = () => {
    if (!stream) {
      // Fallback simulation video capture
      setIsRecording(true);
      setRecordSeconds(0);
      let sec = 0;
      recordTimerRef.current = setInterval(() => {
        sec += 1;
        setRecordSeconds(sec);
        if (sec >= 5) {
          if (recordTimerRef.current) clearInterval(recordTimerRef.current);
          setIsRecording(false);
          takeAiSnapshot();
        }
      }, 1000);
      return;
    }

    try {
      recordedChunksRef.current = [];
      const options = { mimeType: "video/webm;codecs=vp9,opus" };
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, options);
      } catch {
        recorder = new MediaRecorder(stream);
      }

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideoUrl(videoUrl);
        setCapturedImage(null);
        notify?.("🎥 5-second victory reaction video recorded!");
        playSound?.("WIN");
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordSeconds(0);

      let sec = 0;
      recordTimerRef.current = setInterval(() => {
        sec += 1;
        setRecordSeconds(sec);
        if (sec >= 5) {
          stopVideoRecording();
        }
      }, 1000);
    } catch (err) {
      console.warn("MediaRecorder start error:", err);
      takeAiSnapshot();
    }
  };

  const stopVideoRecording = () => {
    if (recordTimerRef.current) {
      clearInterval(recordTimerRef.current);
      recordTimerRef.current = null;
    }
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  // AI Auto-select a user from arena and generate celebration
  const aiAutoSelectUser = () => {
    const randomUser = ARENA_USERS[Math.floor(Math.random() * ARENA_USERS.length)];
    const randomStyle = AI_STYLES[Math.floor(Math.random() * AI_STYLES.length)];
    setWinnerName(randomUser);
    setSelectedStyle(randomStyle);
    notify?.(`🤖 AI selected @${randomUser} for the ${randomStyle.name} celebration!`);
    setTimeout(() => {
      takeAiSnapshot();
    }, 400);
  };

  // Submit and Post to Reels & Timeline
  const handlePostToTimelineAndReels = () => {
    const finalCaption =
      customCaption.trim() ||
      (mode === "video"
        ? `5s Live reaction recording! Screamed at ${peakDecibels || 88} dB and took home the pot! 🎉🔥`
        : `AI Curated victory moment! ${selectedStyle.tag} #WinnerReels 🏆✨`);

    const newPost: WinnerPostData = {
      id: `clip-${Date.now()}`,
      winnerName: winnerName || "you",
      amountWon: defaultPrizeAmount,
      caption: finalCaption,
      timeAgo: "just now",
      likes: 1,
      comments: 0,
      bgGradient: selectedStyle.gradient,
      hasVideo: mode === "video" || !!recordedVideoUrl,
      mediaUrl: recordedVideoUrl || capturedImage || undefined,
      mediaType: recordedVideoUrl ? "video" : "image",
      aiPrompt: selectedStyle.tag,
      micDecibels: peakDecibels > 0 ? `${peakDecibels} dB Cheer` : undefined,
    };

    onPostClip(newPost);
    playSound?.("WIN");
    notify?.(`🚀 Posted @${winnerName}'s reaction to Status Reels & Timeline!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-3 sm:p-5 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="float-up relative flex h-[90vh] max-h-[720px] w-full max-w-md flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 text-white shadow-2xl">
        {/* Top Header Controls */}
        <div className="z-10 flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow">
              <Camera className="size-4" />
            </span>
            <div>
              <h3 className="font-display text-sm font-bold flex items-center gap-1.5">
                <span>AI Winner Camera & Mic Studio</span>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[9px] font-black text-accent-foreground">
                  LIVE
                </span>
              </h3>
              <p className="text-[10px] text-white/60">
                Capture winners for Status Reels & Timeline
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close studio"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Viewfinder Canvas Area */}
        <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center p-2">
          {/* Real Camera Video Element */}
          {!capturedImage && !recordedVideoUrl && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="size-full max-h-[380px] rounded-2xl object-cover shadow-inner"
            />
          )}

          {/* Captured AI Image Preview */}
          {capturedImage && (
            <img
              src={capturedImage}
              alt="AI Generated Winner celebration"
              className="size-full max-h-[380px] rounded-2xl object-contain shadow-2xl border border-white/20"
            />
          )}

          {/* Recorded Video Playback Preview */}
          {recordedVideoUrl && (
            <video
              ref={playbackVideoRef}
              src={recordedVideoUrl}
              autoPlay
              loop
              playsInline
              controls
              className="size-full max-h-[380px] rounded-2xl object-cover shadow-2xl border border-white/20"
            />
          )}

          {/* Camera Error / Simulator Notice */}
          {cameraError && !capturedImage && !recordedVideoUrl && (
            <div className="absolute inset-4 rounded-2xl bg-zinc-900/90 border border-white/10 p-4 flex flex-col items-center justify-center text-center">
              <Sparkles className="size-10 text-primary animate-pulse mb-2" />
              <p className="text-xs font-bold text-white mb-1">AI Studio Camera Simulation</p>
              <p className="text-[11px] text-white/70 max-w-xs">{cameraError}</p>
              <div className="mt-3 flex gap-2">
                <Button variant="vault" size="sm" onClick={takeAiSnapshot}>
                  ✨ Snap AI Generated Avatar
                </Button>
              </div>
            </div>
          )}

          {/* Live Viewfinder Overlays (When not previewing captured media) */}
          {!capturedImage && !recordedVideoUrl && (
            <>
              {/* Top Viewfinder Status: Live Mic VU meter */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs backdrop-blur-md">
                  <span className="size-2 rounded-full bg-red-500 animate-ping" />
                  <span className="font-bold text-[11px]">
                    {isRecording ? `REC ${recordSeconds}s / 5s` : "CAMERA READY"}
                  </span>
                </div>

                {/* Mic Volume Level Bar */}
                <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs backdrop-blur-md">
                  <Mic className={`size-3.5 ${micVolume > 40 ? "text-accent" : "text-white/80"}`} />
                  <div className="h-2 w-16 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full bg-accent transition-all duration-100"
                      style={{ width: `${Math.min(100, micVolume * 1.5)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-accent">
                    {peakDecibels > 0 ? `${peakDecibels}dB` : "0dB"}
                  </span>
                </div>
              </div>

              {/* High Energy Scream Callout */}
              {micVolume > 50 && (
                <div className="absolute top-16 animate-bounce rounded-full border border-accent bg-accent/90 px-3 py-1 text-xs font-black text-accent-foreground shadow-glow">
                  ⚡ VICTORY CHEER DETECTED!
                </div>
              )}

              {/* Viewfinder Corner Flairs */}
              <div className="absolute top-6 left-6 size-6 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-6 right-6 size-6 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-6 left-6 size-6 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-6 right-6 size-6 border-b-2 border-r-2 border-primary" />
            </>
          )}

          {/* AI Processing Spinner */}
          {isAiProcessing && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
              <Sparkles className="size-10 text-accent animate-spin" />
              <p className="mt-3 text-sm font-bold text-white">
                AI Curator is Stylizing Winner Artwork...
              </p>
              <p className="text-xs text-white/60">
                Applying victory halos, verified timestamp, and laurels
              </p>
            </div>
          )}
        </div>

        {/* Controls & AI Style Selection Drawer */}
        <div className="z-10 space-y-3 border-t border-white/10 bg-zinc-900 p-4">
          {/* Top Row: User Selection & AI Styles */}
          {!capturedImage && !recordedVideoUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white/80">Select Winner & AI Style:</span>
                <button
                  type="button"
                  onClick={aiAutoSelectUser}
                  className="flex items-center gap-1 text-[11px] font-bold text-accent hover:underline cursor-pointer"
                >
                  <Wand2 className="size-3" /> AI Auto-Select User
                </button>
              </div>

              {/* AI Style Pill Selector */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {AI_STYLES.map((style) => {
                  const Icon = style.icon;
                  const isSelected = selectedStyle.id === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      className={`flex items-center gap-1.5 shrink-0 rounded-full border px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-glow"
                          : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="size-3.5" />
                      <span>{style.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Trigger Buttons */}
          {!capturedImage && !recordedVideoUrl ? (
            <div className="grid grid-cols-4 gap-2 pt-1">
              {/* Flip camera */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCamera}
                className="flex flex-col items-center gap-1 h-auto py-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                title="Switch Camera"
              >
                <RefreshCw className="size-4" />
                <span className="text-[10px]">Flip Cam</span>
              </Button>

              {/* Toggle Mic */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMicEnabled((prev) => !prev)}
                className={`flex flex-col items-center gap-1 h-auto py-2 rounded-xl border transition-all ${
                  isMicEnabled
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/10 bg-white/5 text-white/50"
                }`}
                title="Toggle Microphone"
              >
                {isMicEnabled ? <Mic className="size-4" /> : <MicOff className="size-4" />}
                <span className="text-[10px]">{isMicEnabled ? "Mic ON" : "Mic OFF"}</span>
              </Button>

              {/* Snap Photo Button */}
              <Button
                variant="vault"
                size="sm"
                onClick={takeAiSnapshot}
                className="flex flex-col items-center gap-1 h-auto py-2 rounded-xl"
                title="Take AI Winner Snap"
              >
                <Camera className="size-4" />
                <span className="text-[10px]">AI Snap</span>
              </Button>

              {/* Record 5s Video Button */}
              <Button
                variant="default"
                size="sm"
                onClick={isRecording ? stopVideoRecording : startVideoRecording}
                className={`flex flex-col items-center gap-1 h-auto py-2 rounded-xl border transition-all ${
                  isRecording
                    ? "bg-red-600 text-white animate-pulse border-red-400"
                    : "bg-gradient-to-r from-rose-600 to-amber-600 text-white hover:opacity-90"
                }`}
                title="Record 5s Video Clip"
              >
                {isRecording ? <Square className="size-4" /> : <Video className="size-4" />}
                <span className="text-[10px]">{isRecording ? "Stop" : "5s Reel"}</span>
              </Button>
            </div>
          ) : (
            /* Post to Reels & Timeline Confirmation Row */
            <div className="space-y-3">
              <input
                type="text"
                value={customCaption}
                onChange={(e) => setCustomCaption(e.target.value)}
                placeholder="Add victory caption for Timeline & Reels..."
                className="w-full rounded-xl border border-white/20 bg-black/60 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCapturedImage(null);
                    setRecordedVideoUrl(null);
                  }}
                  className="flex-1 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <RefreshCw className="size-4 mr-1.5" /> Retake
                </Button>

                <Button
                  variant="vault"
                  size="sm"
                  onClick={handlePostToTimelineAndReels}
                  className="flex-[2] rounded-xl font-bold"
                >
                  <Check className="size-4 mr-1.5 text-accent" /> Post to Reels & Timeline
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
