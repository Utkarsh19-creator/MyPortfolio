import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/motion-primitives";
import { Magnetic } from "@/components/site-chrome";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Utkarsh Srivastava — Start a Project" },
      {
        name: "description",
        content:
          "Tell Utkarsh about your project: pick a scope, timeline and budget, and get a reply within a day. Full-stack development with Spring Boot and React.",
      },
      { property: "og:title", content: "Contact Utkarsh Srivastava" },
      {
        property: "og:description",
        content:
          "A quick, interactive brief — scope, timeline and budget — and I'll reply within a day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const PROJECT_TYPES = [
  { id: "api", label: "Backend / REST API", hint: "Spring Boot services & data models" },
  { id: "web", label: "Full-stack web app", hint: "React frontend + API + database" },
  { id: "frontend", label: "Frontend & motion", hint: "Interfaces, micro-interactions" },
  { id: "other", label: "Something else", hint: "Tell me in your own words" },
];

const TIMELINES = ["ASAP", "2 — 4 weeks", "1 — 3 months", "Just exploring"];
const BUDGETS = ["Student / side project", "₹25k — ₹75k", "₹75k — ₹2L", "Let's discuss"];

const DETAILS = [
  {
    icon: Mail,
    label: "Email",
    value: "utkarshsri0264@gmail.com",
    href: "mailto:utkarshsri0264@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+91 9369976413", href: "tel:+919369976413" },
  { icon: MapPin, label: "Based in", value: "Lucknow, Uttar Pradesh", href: undefined },
];

const STEPS = ["Scope", "Timing", "Message"];

function Chip({
  active,
  onClick,
  title,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border p-4 text-left transition-colors",
        active ? "border-primary bg-surface-2" : "border-border bg-surface hover:border-primary/50",
      )}
    >
      {active && (
        <motion.span
          layoutId="chip-glow"
          className="absolute inset-0 -z-10 opacity-20"
          style={{ background: "var(--gradient-ember)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={cn("block text-sm font-medium", active && "text-primary")}>{title}</span>
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </button>
  );
}

function Contact() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const typeLabel = PROJECT_TYPES.find((p) => p.id === type)?.label;

  const canAdvance = useMemo(() => {
    if (step === 0) return Boolean(type);
    if (step === 1) return Boolean(timeline && budget);
    return name.trim().length > 1 && /.+@.+\..+/.test(email) && message.trim().length > 9;
  }, [step, type, timeline, budget, name, email, message]);

  const brief = `Project: ${typeLabel ?? "—"}
Timeline: ${timeline ?? "—"}
Budget: ${budget ?? "—"}

${message || "…"}

— ${name || "Your name"} (${email || "your@email.com"})`;

  const submit = () => {
    if (!canAdvance) return;
    setSent(true);
    const subject = encodeURIComponent(`New project enquiry — ${typeLabel}`);
    window.location.href = `mailto:utkarshsri0264@gmail.com?subject=${subject}&body=${encodeURIComponent(brief)}`;
    toast.success("Brief ready", { description: "Your mail app is opening with the details." });
  };

  return (
    <main className="grain relative min-h-screen overflow-hidden pt-32 pb-24">
      <div className="bg-veil pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="label-mono">Contact</span>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] font-bold md:text-6xl">
            Have something in mind? <span className="text-gradient-ember">Let's build it.</span>
          </h1>
          <p className="mt-5 max-w-lg text-muted-foreground">
            Three quick steps. Answer what you know, skip the rest — I reply within a day.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Interactive brief builder */}
          <div className="surface-card p-6 md:p-9">
            {/* progress */}
            <div className="flex items-center gap-3">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => !sent && setStep(i)}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full border font-mono text-xs transition-colors",
                        i <= step
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {i < step || sent ? <Check className="size-3.5" /> : i + 1}
                    </span>
                    <span
                      className={cn(
                        "hidden text-xs sm:block",
                        i === step ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="h-px flex-1 overflow-hidden bg-border">
                      <motion.div
                        className="h-full origin-left"
                        style={{ background: "var(--gradient-ember)" }}
                        initial={false}
                        animate={{ scaleX: i < step || sent ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-9 min-h-[330px]">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-[330px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="flex size-16 items-center justify-center rounded-full text-primary-foreground"
                      style={{ background: "var(--gradient-ember)" }}
                    >
                      <Check className="size-8" />
                    </motion.span>
                    <h2 className="mt-6 text-2xl font-semibold">Brief packaged up</h2>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Your mail client should be open with everything filled in. If it didn't
                      launch, copy the brief on the right and send it over.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setStep(0);
                      }}
                      className="mt-6 rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      Start another brief
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 26 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -26 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {step === 0 && (
                      <div>
                        <h2 className="text-xl font-semibold">What are we building?</h2>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {PROJECT_TYPES.map((p) => (
                            <Chip
                              key={p.id}
                              active={type === p.id}
                              onClick={() => setType(p.id)}
                              title={p.label}
                              hint={p.hint}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-7">
                        <div>
                          <h2 className="text-xl font-semibold">When do you need it?</h2>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {TIMELINES.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setTimeline(t)}
                                className={cn(
                                  "rounded-full border px-4 py-2 text-sm transition-colors",
                                  timeline === t
                                    ? "border-primary text-primary"
                                    : "border-border text-muted-foreground hover:text-foreground",
                                )}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">Rough budget?</h2>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {BUDGETS.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setBudget(b)}
                                className={cn(
                                  "rounded-full border px-4 py-2 text-sm transition-colors",
                                  budget === b
                                    ? "border-primary text-primary"
                                    : "border-border text-muted-foreground hover:text-foreground",
                                )}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Tell me the details</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          />
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@email.com"
                            type="email"
                            className="rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                          />
                        </div>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={5}
                          maxLength={600}
                          placeholder="What are you trying to build, and what does done look like?"
                          className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        />
                        <div className="flex justify-between font-mono text-xs text-muted-foreground">
                          <span>
                            {message.trim().length < 10 ? "min. 10 characters" : "looks good"}
                          </span>
                          <span>{message.length}/600</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!sent && (
              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                >
                  <ArrowLeft className="size-4" /> Back
                </button>

                <Magnetic strength={0.25}>
                  <button
                    onClick={() => (step === 2 ? submit() : setStep((s) => s + 1))}
                    disabled={!canAdvance}
                    className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-primary-foreground shadow-ember transition-opacity disabled:opacity-40"
                    style={{ background: "var(--gradient-ember)" }}
                  >
                    {step === 2 ? "Send message" : "Continue"}
                    {step === 2 ? (
                      <Send className="size-4 transition-transform group-hover:translate-x-1" />
                    ) : (
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </Magnetic>
              </div>
            )}
          </div>

          {/* Live brief preview + details */}
          <div className="space-y-6">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between">
                <span className="label-mono">Live brief</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(brief);
                    toast.success("Brief copied to clipboard");
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  <Copy className="size-3.5" /> Copy
                </button>
              </div>
              <pre className="mt-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground/80">
                {brief}
              </pre>
            </div>

            <div className="surface-card divide-y divide-border">
              {DETAILS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <div className="flex items-center gap-4 p-5">
                    <span className="flex size-9 items-center justify-center rounded-full border border-border text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="label-mono">{label}</p>
                      <p className="mt-1 text-sm">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block transition-colors hover:bg-surface-2">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>

            <div className="surface-card flex items-center gap-3 p-5">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              <p className="text-sm text-muted-foreground">
                Currently available for new projects · replies within 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
