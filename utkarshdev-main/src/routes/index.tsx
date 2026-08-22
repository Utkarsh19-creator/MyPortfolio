import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useScroll, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import portrait from "@/assets/portrait.png";
import { Parallax, Reveal, RevealText } from "@/components/motion-primitives";
import { ToolkitShowcase } from "@/components/toolkit-showcase";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { ScrollLetters } from "@/components/scroll-letters";
import { Magnetic } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Utkarsh Srivastava — Full-Stack Developer, Java & React" },
      {
        name: "description",
        content:
          "Portfolio of Utkarsh Srivastava, a full-stack developer from Lucknow building Spring Boot APIs, React interfaces and cloud deploys on AWS, Vercel and Render.",
      },
      { property: "og:title", content: "Utkarsh Srivastava — Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Spring Boot APIs, React frontends and clean data models — selected work, toolkit and contact.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ROLES = ["Full-Stack Developer", "Spring Boot Engineer", "React Interface Builder"];

function Typewriter() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = ROLES[index % ROLES.length]!;
    const done = text === full;
    const empty = text === "";
    const delay = deleting ? 40 : done ? 1600 : 85;

    const t = window.setTimeout(() => {
      if (!deleting && done) return setDeleting(true);
      if (deleting && empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
        return;
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);

    return () => window.clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span className="text-gradient-ember font-display">
      {text}
      <span className="ml-0.5 inline-block animate-pulse text-primary">|</span>
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold text-foreground">
      {value}
      {suffix}
    </span>
  );
}

const MARQUEE = [
  "Java", "Spring Boot", "React", "PostgreSQL", "MongoDB", "Docker",
  "Terraform", "Maven", "AWS", "Vercel", "Render", "Git", "Postman",
  "DSA", "OOPs", "DBMS",
];

const TIMELINE = [
  {
    period: "2024 — 2028",
    title: "B.Tech, Computer Science & Engineering",
    body: "Babu Banarasi Das National Institute of Technology and Management, Lucknow — core software engineering paradigms, object-oriented architecture and algorithmic optimization.",
  },
  {
    period: "2025 — Now",
    title: "Full-Stack Projects · Spring Boot + React",
    body: "Shipping end-to-end products: REST APIs, relational and document data models, containerized deploys on AWS, Vercel and Render.",
  },
  {
    period: "Foundations",
    title: "DSA · OOPs · DBMS · REST design",
    body: "Continuous practice in data structures and algorithms, object-oriented programming and database systems alongside applied project work.",
  },
];

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="grain relative min-h-screen overflow-hidden pt-32 pb-20">
        <div className="bg-veil pointer-events-none absolute inset-0" />
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              <span className="label-mono">Available for new projects</span>
            </motion.span>

            <h1 className="mt-7 text-5xl leading-[0.95] font-bold md:text-7xl">
              <RevealText text="Hi, I'm Utkarsh" delay={0.25} />
              <br />
              <RevealText text="Srivastava" delay={0.4} className="text-foreground/60" />
            </h1>

            <p className="mt-5 text-2xl md:text-3xl">
              <Typewriter />
            </p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Computer Science undergrad and full-stack developer from Lucknow. I build
              production-grade REST APIs with Spring Boot, responsive React frontends, and ship
              them on AWS, Vercel and Render — with clean data models in PostgreSQL and MongoDB
              behind them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-ember"
                  style={{ background: "var(--gradient-ember)" }}
                >
                  Explore my work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  Let's talk
                </Link>
              </Magnetic>
            </motion.div>

            <div className="mt-10 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Lucknow, UP
              </span>
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-primary" /> utkarshsri0264@gmail.com
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-primary" /> +91 9369976413
              </span>
            </div>
          </div>

          <Parallax distance={40}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card relative overflow-hidden shadow-soft"
            >
              <img
                src={portrait}
                alt="Portrait of Utkarsh Srivastava"
                width={880}
                height={1209}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-background/70 px-5 py-4 backdrop-blur-md">
                <p className="font-display text-base font-semibold">Utkarsh Srivastava</p>
                <p className="text-xs text-muted-foreground">
                  Full-Stack Developer · Java & React
                </p>
              </div>
            </motion.div>
          </Parallax>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border py-5">
        <div className="marquee-track flex w-max gap-8">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`} className="font-mono text-sm text-muted-foreground">
              {item} <span className="text-primary">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <Reveal>
          <span className="label-mono">About</span>
        </Reveal>
        <div className="mt-6 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <h2 className="text-4xl leading-tight font-semibold md:text-5xl">
            <RevealText text="A developer who sweats the small stuff" />
          </h2>
          <div className="space-y-5 text-muted-foreground">
            <Reveal delay={0.1}>
              <p>
                I started building for the web because I liked the instant feedback loop — change
                a line, see it move. That curiosity turned into shipping full products: interfaces
                with real motion, APIs that stay fast under load, and codebases other people can
                pick up without a manual.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                These days I work across the stack, from design tokens and micro-interactions to
                database schemas and deploys. If it makes a product feel quicker or clearer, I'm
                interested.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
          {[
            { to: 6, suffix: "+", label: "Full-stack projects" },
            { to: 5, suffix: "", label: "Languages & stacks" },
            { to: 3, suffix: "", label: "Cloud platforms shipped on" },
            { to: 2028, suffix: "", label: "B.Tech CSE graduation" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <Counter to={stat.to} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Toolkit */}
      <section id="toolkit" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28">
        <Reveal>
          <span className="label-mono">Toolkit</span>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight font-semibold md:text-5xl">
            Tools & technologies I reach for
          </h2>
        </Reveal>
        <div className="mt-14">
          <ToolkitShowcase />
        </div>
      </section>

      <ScrollLetters />

      {/* Work */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-28">
        <Reveal>
          <span className="label-mono">Selected work</span>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight font-semibold md:text-5xl">
            Projects, opened up
          </h2>
        </Reveal>
        <div className="mt-12">
          <ProjectsShowcase />
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <span className="label-mono">Journey</span>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">How I got here</h2>
        </Reveal>
        <ol className="mt-14 space-y-px">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <li className="group grid gap-4 border-t border-border py-8 transition-colors md:grid-cols-[180px_1fr] hover:bg-surface/60">
                <span className="label-mono pt-1">{item.period}</span>
                <div>
                  <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{item.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <Reveal>
          <div className="surface-card grain relative overflow-hidden px-8 py-16 text-center md:py-24">
            <div className="bg-veil pointer-events-none absolute inset-0" />
            <div className="relative">
              <span className="label-mono">Contact</span>
              <h2 className="mx-auto mt-4 max-w-2xl text-4xl leading-tight font-semibold md:text-5xl">
                Have something in mind? Let's build it.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tell me about the project and I'll get back within a day.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-ember"
                    style={{ background: "var(--gradient-ember)" }}
                  >
                    Start a conversation
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
