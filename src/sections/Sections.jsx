import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight, Award, BarChart2, Briefcase, Download,
  Eye, Layers, Linkedin, Mail, MessageCircle, PlayCircle,
  Target, TrendingUp, Users, Zap,
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import {
  caseStudies, expertise, insights, leadership,
  metrics, testimonials, timeline, tools, trustBrands,
} from "../data/content";
import profileImage from "../../Morshed.jpg.jpeg";

/* ── shared helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

const expertiseIcons = [Target, TrendingUp, BarChart2, Eye, Zap, Layers, Users, Award, Briefcase, TrendingUp];

/* ── card base ── */
function Card({ children, className = "", tilt = false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-60, 60], [5, -5]);
  const rotY = useTransform(x, [-60, 60], [-5, 5]);

  const onMouseMove = (e) => {
    if (!tilt) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tilt ? { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" } : {}}
      className={`group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-soft
        transition-colors duration-500 hover:border-accent-gold/40 hover:bg-white/[0.06]
        ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-accent-gold/30 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

/* ── animated number counter ── */
function AnimatedNumber({ target, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

/* ══════════════════════════════════
   HERO
══════════════════════════════════ */
export function Hero() {
  const roles = ["Brand Manager", "Branding Strategist", "Marketing Leader"];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] overflow-hidden">
      {/* ambient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-24 pt-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        {/* copy */}
        <motion.div variants={stagger(0.12)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent-gold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-gold" />
            Executive Brand Leadership Portfolio
          </motion.p>

          <motion.h1 variants={fadeUp} className="mt-5 font-['Manrope'] text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-7xl">
            Morshedul
            <br />
            <span className="text-gradient">Islam</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mt-4 flex items-center gap-2 text-lg text-accent-smoke sm:text-xl">
            <span className="h-px w-6 bg-accent-gold" />
            <motion.span
              key={roleIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-medium text-white"
            >
              {roles[roleIdx]}
            </motion.span>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-accent-smoke">
            I build strategic brand systems that blend creativity, market intelligence, and operational leadership—scaling trust, demand, and long-term business value across industries.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-accent-smoke">
            {["Meta Certified Creative Strategy", "Google Digital Marketing", "IELTS 6.5 · Fluent English"].map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1">{t}</span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#case-studies" className="btn-premium group">
              View Case Studies
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#" className="btn-secondary">
              <Download size={15} /> Download Resume
            </a>
            <a href="#contact" className="btn-link">Let's Connect →</a>
          </motion.div>
        </motion.div>

        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* glow ring */}
          <div className="absolute -inset-4 animate-pulse-slow rounded-[2.5rem] bg-gradient-to-br from-accent-gold/20 via-transparent to-accent-gold/5 blur-2xl" />
          {/* gradient border frame */}
          <div className="portrait-frame relative rounded-[2rem] p-[1.5px]">
            <div className="relative overflow-hidden rounded-[2rem] bg-base-900">
              <img
                src={profileImage}
                alt="Morshedul Islam — AGM Branding & Marketing"
                className="h-[540px] w-full object-cover object-top"
                loading="eager"
              />
              {/* bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-950 to-transparent" />
              {/* floating badge */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/15 bg-base-950/80 px-4 py-3 backdrop-blur-sm">
                <div>
                  <p className="text-xs font-semibold text-white">Morshedul Islam</p>
                  <p className="text-[10px] text-accent-smoke">AGM · Chuti Group · Dhaka</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   TRUST STRIP
══════════════════════════════════ */
export function Trust() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.015] py-8">
      <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.24em] text-accent-smoke">
        Trusted by brands, teams & growing businesses
      </p>
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...trustBrands, ...trustBrands].map((brand, i) => (
            <span key={i} className="mx-6 whitespace-nowrap text-sm font-medium text-white/70">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   ABOUT
══════════════════════════════════ */
export function About() {
  return (
    <AnimatedSection id="about">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* image slot */}
        <motion.div variants={fadeUp} className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-base-900">
            <div className="flex h-[380px] items-center justify-center bg-gradient-to-br from-white/[0.03] to-accent-gold/5">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-white/20">
                  <Users className="text-accent-smoke" size={20} />
                </div>
                <p className="text-xs text-accent-smoke">Add a candid / work photo here</p>
                <code className="mt-1 block text-[10px] text-white/30">src: media/about.jpg</code>
              </div>
            </div>
          </div>
          {/* stat badge */}
          <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/15 bg-base-900 px-5 py-3 shadow-soft">
            <p className="text-2xl font-bold text-white">9+</p>
            <p className="text-xs text-accent-smoke">Years of experience</p>
          </div>
        </motion.div>

        {/* text */}
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-[0.24em] text-accent-gold">About</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-4xl font-bold tracking-tight text-white">
            Strategic leadership with human-centered brand thinking
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-accent-smoke">
            I started as a digital specialist and grew into a brand and marketing executive through consistent high-stakes delivery. Today I lead strategy, creative direction, campaign architecture, and team culture at Chuti Group.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-accent-smoke">
            My philosophy is simple: every brand decision should sharpen business direction, not only visual appeal. Great marketing earns trust before it earns attention.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Branding Philosophy", val: "Strategy-first, story-led" },
              { label: "Leadership Style", val: "Empowering, direct, outcome-focused" },
              { label: "Decision Framework", val: "Data + intuition + context" },
              { label: "Core belief", val: "Brands are promises — keep them." },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
                <p className="text-[11px] uppercase tracking-widest text-accent-gold">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{item.val}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   EXPERTISE
══════════════════════════════════ */
export function Expertise() {
  return (
    <AnimatedSection id="expertise" label="Core Expertise" title="What I bring to the table">
      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {expertise.map((item, i) => {
          const Icon = expertiseIcons[i % expertiseIcons.length];
          return (
            <motion.div key={item} variants={fadeUp}>
              <Card tilt className="min-h-[130px]">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gold/10 text-accent-gold">
                  <Icon size={16} />
                </div>
                <h3 className="text-sm font-semibold text-white">{item}</h3>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   EXPERIENCE TIMELINE
══════════════════════════════════ */
export function Experience() {
  return (
    <AnimatedSection id="experience" label="Career Journey" title="Experience Timeline">
      <div className="relative ml-3 border-l border-white/10 pl-8">
        {timeline.map((item, i) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8 last:mb-0"
          >
            <span className="absolute -left-[42px] top-4 flex h-5 w-5 items-center justify-center rounded-full border border-accent-gold bg-base-950 ring-4 ring-base-950">
              <span className="h-2 w-2 rounded-full bg-accent-gold" />
            </span>
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent-gold">{item.duration}</p>
                  <h3 className="mt-1 text-xl font-bold text-white">{item.role}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent-smoke">{item.company}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {item.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-accent-smoke">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-gold" />
                    {a}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.article>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   CASE STUDIES
══════════════════════════════════ */
export function CaseStudies() {
  return (
    <AnimatedSection id="case-studies" label="Portfolio" title="Featured Case Studies" subtitle="Agency-style strategic presentations. Replace placeholders with real assets, metrics, and campaign visuals.">
      <div className="space-y-8">
        {caseStudies.map((study, i) => (
          <motion.article
            key={study.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
          >
            {/* hero banner placeholder */}
            <div className="relative flex h-48 items-center justify-center border-b border-white/10 bg-gradient-to-br from-accent-gold/10 via-white/[0.02] to-transparent">
              <div className="text-center">
                <PlayCircle className="mx-auto text-accent-gold/50" size={32} />
                <p className="mt-2 text-xs text-accent-smoke">Hero banner / campaign visual</p>
                <code className="text-[10px] text-white/25">media/case-{i + 1}-banner.jpg</code>
              </div>
              <span className="absolute left-5 top-5 rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-semibold text-accent-gold">
                Case Study {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <CaseField label="Brand Challenge" value={study.challenge} />
                  <CaseField label="Strategic Direction" value={study.strategy} />
                  <CaseField label="Execution" value={study.execution} />
                </dl>
              </div>
              <div className="space-y-4">
                <CaseField label="Business Outcome" value={study.outcome} />
                {/* metrics placeholder */}
                <div className="rounded-xl border border-dashed border-white/15 bg-base-900/60 p-4">
                  <p className="text-[11px] uppercase tracking-widest text-accent-gold">Key Metrics</p>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {["ROI", "Reach", "Conv."].map((m) => (
                      <div key={m} className="rounded-lg bg-white/[0.03] p-2 text-center">
                        <p className="text-lg font-bold text-white">—</p>
                        <p className="text-[10px] text-accent-smoke">{m}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-white/25">Replace with real data</p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </AnimatedSection>
  );
}

function CaseField({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <dt className="text-[11px] uppercase tracking-[0.15em] text-accent-gold">{label}</dt>
      <dd className="mt-1.5 leading-relaxed text-accent-smoke">{value}</dd>
    </div>
  );
}

/* ══════════════════════════════════
   LEADERSHIP
══════════════════════════════════ */
const leadershipIcons = [Users, Target, MessageCircle, Zap, TrendingUp, Award];

export function Leadership() {
  return (
    <AnimatedSection id="leadership" label="Leadership" title="How I lead teams & build brand culture">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {leadership.map((item, i) => {
          const Icon = leadershipIcons[i % leadershipIcons.length];
          return (
            <motion.div key={item} variants={fadeUp}>
              <Card>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 text-accent-gold">
                  <Icon size={18} />
                </div>
                <p className="font-semibold text-white">{item}</p>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   METRICS
══════════════════════════════════ */
export function Metrics() {
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-gold/[0.04] via-transparent to-accent-gold/[0.03]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center text-xs font-medium uppercase tracking-[0.24em] text-accent-gold"
        >
          Impact by the numbers
        </motion.p>
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <Card className="text-center">
                <p className="text-5xl font-extrabold tracking-tight text-white">
                  <AnimatedNumber target={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-2 text-sm text-accent-smoke">{m.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   TESTIMONIALS
══════════════════════════════════ */
export function Testimonials() {
  return (
    <AnimatedSection id="testimonials" label="What people say" title="Trusted by leaders & collaborators">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 lg:grid-cols-3"
      >
        {testimonials.map((item, i) => (
          <motion.div key={item.author} variants={fadeUp}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <span className="font-['Manrope'] text-5xl leading-none text-accent-gold/40">"</span>
                <p className="mt-1 text-base leading-relaxed text-accent-smoke">{item.quote}</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-gold/15 text-xs font-bold text-accent-gold">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.author}</p>
                  <p className="text-xs text-accent-smoke">Replace with real name & title</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   GALLERY
══════════════════════════════════ */
export function Gallery() {
  const slots = [
    { label: "Campaign / Event Photo", hint: "media/campaign-1.jpg", span: "lg:col-span-2 lg:row-span-2" },
    { label: "Resort / Property", hint: "media/resort.jpg", span: "" },
    { label: "Team / Brand Activation", hint: "media/team.jpg", span: "" },
    { label: "Showreel / Video", hint: "media/reel.mp4", video: true, span: "lg:col-span-2" },
  ];
  return (
    <AnimatedSection id="gallery" label="Media" title="Gallery & Reels">
      <div className="grid auto-rows-[200px] gap-4 lg:grid-cols-4">
        {slots.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-2xl border border-dashed border-white/20 bg-base-900 ${s.span}`}
          >
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              {s.video
                ? <PlayCircle className="mb-2 text-accent-gold/50" size={28} />
                : <div className="mb-2 text-2xl text-accent-gold/30">+</div>}
              <p className="text-xs font-medium text-white/60">{s.label}</p>
              <code className="mt-1 text-[10px] text-white/25">{s.hint}</code>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   INSIGHTS
══════════════════════════════════ */
export function Insights() {
  return (
    <AnimatedSection id="insights" label="Thought Leadership" title="Insights & Articles">
      <motion.div
        variants={stagger(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-4 md:grid-cols-2"
      >
        {insights.map((item, i) => (
          <motion.div key={item} variants={fadeUp}>
            <Card className="group cursor-pointer">
              <div className="mb-4 flex h-32 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-gradient-to-br from-white/[0.03] to-accent-gold/5">
                <p className="text-[10px] text-white/25">Featured image — media/insight-{i + 1}.jpg</p>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-accent-gold">Article Draft</p>
              <h3 className="mt-2 text-lg font-semibold text-white transition group-hover:text-accent-gold">{item}</h3>
              <p className="mt-2 text-sm leading-relaxed text-accent-smoke">
                Add your full article or strategic perspective here — replace placeholder in <code className="text-[10px] text-white/30">content.js</code>.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent-gold opacity-0 transition group-hover:opacity-100">
                Read more <ArrowRight size={12} />
              </span>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   TOOLS
══════════════════════════════════ */
export function Tools() {
  return (
    <AnimatedSection id="tools" label="Stack" title="Tools & Platforms">
      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3"
      >
        {tools.map((tool) => (
          <motion.span
            key={tool}
            variants={fadeUp}
            whileHover={{ scale: 1.05, borderColor: "rgba(198,168,109,0.5)" }}
            className="cursor-default rounded-full border border-white/15 bg-white/[0.025] px-4 py-2 text-sm font-medium text-white/80 transition-colors"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   CONTACT
══════════════════════════════════ */
export function Contact() {
  return (
    <AnimatedSection id="contact" className="pb-32">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-accent-gold/[0.03]">
        {/* banner */}
        <div className="relative px-8 pb-8 pt-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent-gold">Open to opportunities</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let's build brands<br />people remember.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-accent-smoke">
            Available for advisory, leadership roles, strategic consulting, and high-impact marketing transformation.
          </p>
        </div>

        {/* contact grid */}
        <div className="grid gap-px border-t border-white/10 md:grid-cols-3">
          {[
            { icon: <Mail size={18} />, label: "Email", val: "morshedulislam512@gmail.com", href: "mailto:morshedulislam512@gmail.com" },
            { icon: <Linkedin size={18} />, label: "LinkedIn", val: "linkedin.com/in/morshedul", href: "https://linkedin.com" },
            { icon: <MessageCircle size={18} />, label: "WhatsApp", val: "+880 1771 969671", href: "https://wa.me/8801771969671" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/[0.02] p-6 transition hover:bg-accent-gold/[0.06]"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-accent-gold transition group-hover:border-accent-gold group-hover:bg-accent-gold/10">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-accent-smoke">{item.label}</p>
                <p className="text-sm font-medium text-white">{item.val}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Calendly placeholder */}
        <div className="border-t border-white/10 p-6 text-center">
          <p className="text-xs text-accent-smoke">Calendly / booking embed goes here — replace with real link</p>
          <a
            href="#"
            className="btn-premium mt-4 inline-flex"
          >
            Book a 30-min call <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
