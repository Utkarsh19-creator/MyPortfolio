import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import loveGhar from "@/assets/project-loveghar.jpg";
import emailAi from "@/assets/project-email-ai.jpg";
import inventory from "@/assets/project-inventory.jpg";
import railEase from "@/assets/project-railease.jpg";

type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  detail: string;
  stack: string[];
  image: string;
  link?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    id: "railease",
    title: "RailEase",
    year: "2026",
    category: "Database · Full-Stack",
    summary:
      "A railway reservation system built as a living DBMS walkthrough — normalized relations, live SQL and an authenticated booking console.",
    detail:
      "RailEase models a railway reservation domain the way a database course wishes it were taught: users, trains and bookings as properly normalized relations with real keys and constraints, then an interface that lets you actually poke at them. You can read the schema, run live queries against the trains relation, watch ALTER TABLE history as the schema evolves, and sign in to a console where you can alter your own user tuple. Row-level security scopes every write to the authenticated owner, so the demo stays open without becoming a free-for-all. It is equal parts product and teaching tool — the reservation flow works end to end, but every screen also shows the SQL underneath it.",
    stack: ["React", "PostgreSQL", "SQL", "RLS", "Auth", "Vercel"],
    image: railEase,
    link: "https://rail-ease-one.vercel.app/",
  },
  {
    id: "loveghar",
    title: "LoveGhar",
    year: "2026",
    category: "Web",
    summary:
      "Full-stack property platform with a responsive React single-page frontend and Spring Boot services behind it.",
    detail:
      "Listing search, filtering and enquiry flows on the front, a layered Spring Boot API with JPA repositories and a normalized PostgreSQL schema underneath. Built so a new listing type is a migration and a mapper, not a rewrite.",
    stack: ["React", "Spring Boot", "PostgreSQL"],
    image: loveGhar,
  },
  {
    id: "email-ai",
    title: "AI Email Assistant Ecosystem",
    year: "2025",
    category: "Backend",
    summary:
      "Automated email orchestration platform that parses payloads and classifies mail contextually.",
    detail:
      "Ingests raw email payloads, normalizes them into a canonical model and routes each message through contextual classification before dispatching an action. REST endpoints throughout, Maven-managed modules, designed for retry-safe processing.",
    stack: ["Spring Boot", "Maven", "REST APIs"],
    image: emailAi,
  },
  {
    id: "inventory",
    title: "Cloud Inventory System",
    year: "2025",
    category: "Cloud",
    summary:
      "Full-stack inventory tracker with a semantic HTML/CSS interface and a schemaless MongoDB document layer.",
    detail:
      "Stock movements, item histories and low-stock signals over a document model that tolerates irregular product shapes. Deployed to the cloud with a lightweight, dependency-free frontend that loads instantly.",
    stack: ["HTML5", "CSS3", "JavaScript", "MongoDB"],
    image: inventory,
  },
];

/** Hover-driven project gallery with draggable preview + expandable detail (skiper80-inspired). */
export function ProjectsShowcase() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const preview = PROJECTS.find((p) => p.id === hovered);
  const active = PROJECTS.find((p) => p.id === open);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-col border-t border-border">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered((h) => (h === project.id ? null : h))}
            onFocus={() => setHovered(project.id)}
            onClick={() => setOpen(project.id)}
            className="group relative flex items-center justify-between gap-6 border-b border-border py-8 text-left"
          >
            <motion.span
              className="absolute inset-x-0 bottom-0 h-px origin-left"
              style={{ background: "var(--gradient-ember)" }}
              initial={false}
              animate={{ scaleX: hovered === project.id ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="min-w-0">
              <span className="label-mono">
                {project.category} · {project.year}
              </span>
              <h3 className="mt-2 truncate text-3xl font-semibold transition-colors group-hover:text-primary md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                {project.summary}
              </p>
            </div>
            <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
          </button>
        ))}
      </div>

      <p className="mt-5 text-center font-mono text-xs text-muted-foreground">
        hover a project · click to open · drag the preview
      </p>

      {/* Draggable floating preview */}
      <AnimatePresence>
        {preview && !open && (
          <motion.div
            key={preview.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.18}
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 3 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-1/2 right-4 z-20 hidden w-64 cursor-grab overflow-hidden rounded-xl border border-border shadow-soft active:cursor-grabbing lg:block"
          >
            <img
              src={preview.image}
              alt={`${preview.title} preview`}
              className="h-40 w-full object-cover"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded detail */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/85 backdrop-blur-md"
              onClick={() => setOpen(null)}
            />
            <motion.div
              layout
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card relative grid max-h-[86vh] w-full max-w-4xl overflow-y-auto md:grid-cols-2"
            >
              <img
                src={active.image}
                alt={`${active.title} interface`}
                className="h-56 w-full object-cover md:h-full"
              />
              <div className="p-8">
                <span className="label-mono">
                  {active.category} · {active.year}
                </span>
                <h3 className="mt-3 text-3xl font-semibold">{active.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {active.detail}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {active.link && (
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-ember"
                    style={{ background: "var(--gradient-ember)" }}
                  >
                    Visit live site
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close project"
                className="absolute top-4 right-4 rounded-full border border-border bg-background/70 p-2 text-foreground transition-colors hover:text-primary"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
