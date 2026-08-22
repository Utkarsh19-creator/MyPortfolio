import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

/** Particle + box loader intro (skiper15-inspired). */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        x: (i * 37) % 100,
        y: (i * 61) % 100,
        size: 2 + ((i * 7) % 5),
        delay: (i % 10) * 0.14,
        duration: 3.2 + ((i * 3) % 5) * 0.5,
      })),
    [],
  );

  useEffect(() => {
    let frame = 0;
    const tick = window.setInterval(() => {
      frame += 1;
      setProgress((p) => {
        const next = Math.min(100, p + Math.max(1, (100 - p) * 0.09) + (frame % 3));
        return next;
      });
    }, 55);
    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = window.setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 520);
    return () => window.clearTimeout(t);
  }, [progress, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-veil pointer-events-none absolute inset-0" />

          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-primary/50"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{ y: [-18, 18, -18], opacity: [0.15, 0.9, 0.15] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative flex flex-col items-center gap-8">
            <div className="relative h-16 w-16 [perspective:600px]">
              <motion.div
                className="absolute inset-0 rounded-lg border border-primary/70"
                animate={{ rotateX: [0, 180, 180, 360], rotateY: [0, 0, 180, 180] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
              />
              <motion.div
                className="absolute inset-3 rounded-md bg-primary/25"
                animate={{ scale: [0.7, 1, 0.7], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="w-56">
              <div className="h-px w-full overflow-hidden bg-border">
                <motion.div
                  className="h-full origin-left"
                  style={{ background: "var(--gradient-ember)" }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="label-mono">Utkarsh Srivastava</span>
                <span className="font-mono text-xs text-primary">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
