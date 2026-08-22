import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const WORDS = ["BUILT", "TO", "SHIP", "FAST", "AND", "STAY", "FAST"];

function LetterRow({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / (total + 2);
  const end = start + 0.45;

  const scaleX = useTransform(progress, [start, end], [7, 1]);
  const opacity = useTransform(progress, [start, start + 0.1, end], [0, 1, 1]);
  const x = useTransform(progress, [start, end], [index % 2 === 0 ? -60 : 60, 0]);

  return (
    <motion.h3
      style={{ scaleX, opacity, x }}
      className="origin-center text-[13vw] leading-[0.82] font-bold tracking-tighter text-foreground/90 md:text-[9vw]"
    >
      {word}
    </motion.h3>
  );
}

/** Scroll-driven letter stretch band (skiper27-inspired). */
export function ScrollLetters() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="bg-veil pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <span className="label-mono mb-10">Philosophy</span>
        {WORDS.map((word, i) => (
          <LetterRow
            key={word + i}
            word={word}
            index={i}
            total={WORDS.length}
            progress={scrollYProgress}
          />
        ))}
        <p className="mt-10 max-w-md text-sm text-muted-foreground">
          Interfaces with real motion, APIs that stay quick under load, and codebases
          another developer can pick up without a manual.
        </p>
      </div>
    </section>
  );
}
