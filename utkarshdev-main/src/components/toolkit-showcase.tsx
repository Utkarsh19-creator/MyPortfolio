import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Group = {
  id: string;
  label: string;
  headline: string;
  blurb: string;
  items: string[];
};

const GROUPS: Group[] = [
  {
    id: "languages",
    label: "Languages",
    headline: "Strong typed core, loose typed edges",
    blurb:
      "Java for the services that must not fall over, JavaScript for the surfaces people touch, SQL for the truth underneath.",
    items: ["Java", "SQL", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    headline: "Spring Boot services, React interfaces",
    blurb:
      "Layered MVC services with JPA repositories, wired to React frontends that stay responsive on the slowest device in the room.",
    items: ["Spring Boot", "REST APIs & MVC", "Spring Data JPA", "React", "Maven"],
  },
  {
    id: "data",
    label: "Data & Cloud",
    headline: "Clean schemas, repeatable deploys",
    blurb:
      "Relational models in PostgreSQL, document stores in MongoDB, containerized and shipped through AWS, Vercel and Render.",
    items: ["PostgreSQL", "MongoDB", "Docker", "Terraform", "AWS · Vercel · Render"],
  },
  {
    id: "foundations",
    label: "Foundations",
    headline: "The part that does not go out of date",
    blurb:
      "Data structures, algorithms, object-oriented design and database systems — practised continuously alongside applied project work.",
    items: ["DSA", "OOPs", "DBMS", "Git", "Postman"],
  },
];

/** Expandable feature block (skiper76-inspired). */
export function ToolkitShowcase() {
  const [active, setActive] = useState(GROUPS[0]!.id);
  const group = GROUPS.find((g) => g.id === active) ?? GROUPS[0]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col divide-y divide-border border-y border-border">
        {GROUPS.map((g) => {
          const isActive = g.id === active;
          return (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className="group relative overflow-hidden px-1 py-6 text-left"
            >
              {isActive && (
                <motion.span
                  layoutId="toolkit-active"
                  className="absolute inset-0 -z-10 bg-surface"
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                />
              )}
              <div className="flex items-center justify-between gap-4 px-4">
                <div>
                  <span className="label-mono">{String(GROUPS.indexOf(g) + 1).padStart(2, "0")}</span>
                  <h3
                    className={cn(
                      "mt-2 text-2xl font-semibold transition-colors md:text-3xl",
                      isActive ? "text-primary" : "text-foreground/70 group-hover:text-foreground",
                    )}
                  >
                    {g.label}
                  </h3>
                </div>
                <ChevronRight
                  className={cn(
                    "size-5 shrink-0 transition-transform",
                    isActive ? "translate-x-1 text-primary" : "text-muted-foreground",
                  )}
                />
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden px-4"
                  >
                    <p className="pt-3 text-sm text-muted-foreground">{g.blurb}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="surface-card grain relative overflow-hidden p-8">
        <div className="bg-veil pointer-events-none absolute inset-0 opacity-70" />
        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="label-mono">{group.label}</span>
            <h4 className="mt-3 text-3xl leading-tight font-semibold">{group.headline}</h4>
            <div className="mt-8 flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.35 }}
                  className="rounded-full border border-border bg-surface-2 px-4 py-2 font-mono text-xs text-foreground/85 transition-colors hover:border-primary hover:text-primary"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
