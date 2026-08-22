import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Work", to: "/", hash: "work" },
  { label: "About", to: "/", hash: "about" },
  { label: "Toolkit", to: "/", hash: "toolkit" },
  { label: "Contact", to: "/contact", hash: undefined },
];

/** Button/link wrapper that leans toward the cursor. */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "backdrop-blur-xl" : "",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-500",
          scrolled ? "my-2 rounded-full border border-border bg-background/70 py-2.5" : "py-5",
        )}
      >
        <Link to="/" className="font-display text-sm font-bold tracking-tight">
          US<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-1">
          {LINKS.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                href={`/#${link.hash}`}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Magnetic key={link.label}>
                <Link
                  to={link.to}
                  className={cn(
                    "ml-1 rounded-full border border-border px-4 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary",
                    pathname === "/contact" && "border-primary text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </Magnetic>
            ),
          )}
        </nav>
      </div>
    </motion.header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Utkarsh Srivastava · Lucknow, India</p>
        <div className="flex gap-5">
          <a
            href="https://github.com/Utkarsh19-creator"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/utkarsh-srivastava-3019082a3"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href="mailto:utkarshsri0264@gmail.com"
            className="transition-colors hover:text-primary"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
