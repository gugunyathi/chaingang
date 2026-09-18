import confetti from "canvas-confetti";

export function triggerWinFireworks() {
  try {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 35, spread: 360, ticks: 75, zIndex: 120 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = Math.floor(40 * (timeLeft / duration));
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.15, 0.35), y: Math.random() - 0.15 },
        colors: ["#22c55e", "#eab308", "#06b6d4", "#ec4899", "#a855f7", "#ffffff"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.65, 0.85), y: Math.random() - 0.15 },
        colors: ["#22c55e", "#eab308", "#06b6d4", "#ec4899", "#a855f7", "#ffffff"],
      });
    }, 280);
  } catch (e) {
    console.warn("Fireworks trigger note:", e);
  }
}
