import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Award, BarChart2, Briefcase,
  Eye, ExternalLink, GraduationCap, Layers, Linkedin,
  Mail, MessageCircle, PlayCircle, Shield, Target,
  TrendingUp, Users, X, Zap,
} from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import {
  caseStudies, credentials, expertise, howIWork, insights, leadership,
  metrics, testimonials, timeline, tools, trustBrands,
} from "../data/content";
const profileImage = "/m.png";

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
  const canTilt = tilt && typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const onMouseMove = (e) => {
    if (!canTilt || !ref.current) return;
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
      style={canTilt ? { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" } : {}}
      className={`premium-card group relative rounded-xl p-4 sm:p-5 ${className}`}
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
  const roles = ["Business Growth Strategist", "Marketing Leader", "Brand Developer"];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-[85vh] overflow-hidden sm:min-h-[88vh]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 pt-12 sm:gap-8 sm:px-6 sm:pb-14 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="hero-portrait group relative order-first mx-auto w-full lg:order-last lg:self-end"
        >
          <img
            src={profileImage}
            alt="Morshedul Islam — Business Growth Strategist"
            className="hero-portrait-img block object-contain"
            loading="eager"
          />

          <div className="hero-portrait-overlay pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end px-1 pb-1 sm:px-2 sm:pb-2">
            <div className="hero-portrait-caption theme-border flex items-center justify-between gap-3 rounded-xl border px-4 py-3 backdrop-blur-md">
              <div className="min-w-0">
                <p className="theme-text type-small font-semibold truncate">Morshedul Islam</p>
                <p className="theme-muted type-caption truncate">Business Growth Strategist · Marketing & Brand Development</p>
              </div>
              <span className="type-caption flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Available
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={stagger(0.12)} initial="hidden" animate="show" className="order-last lg:order-first">
          <motion.p variants={fadeUp} className="type-label inline-flex items-center gap-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 px-3 py-1 text-accent-gold">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-gold" />
            Business Growth & Marketing Strategy
          </motion.p>

          <motion.h1 variants={fadeUp} className="type-hero theme-text mt-3">
            Help Businesses
            <br />
            <span className="text-gradient">Grow & Thrive</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="theme-muted mt-2.5 flex items-center gap-2 sm:mt-3">
            <span className="h-px w-5 shrink-0 bg-accent-gold sm:w-6" />
            <motion.span
              key={roleIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="type-role theme-text font-medium"
            >
              {roles[roleIdx]}
            </motion.span>
          </motion.div>

          <motion.p variants={fadeUp} className="type-body theme-muted mt-3 max-w-lg sm:mt-4">
            With years of experience in hospitality, tourism, real estate, and digital marketing, I help businesses attract more customers, increase sales, and build stronger brands that generate measurable results.
          </motion.p>

          <motion.div variants={fadeUp} className="theme-muted mt-3 flex flex-wrap gap-1.5 sm:mt-4">
            {["Hospitality & Resort Marketing", "Real Estate Strategy", "10+ Years Experience"].map((t) => (
              <span key={t} className="type-caption panel-soft rounded-full px-2.5 py-1">{t}</span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a href="#case-studies" className="btn-premium group w-full sm:w-auto">
              View My Work
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-secondary w-full sm:w-auto">
              <MessageCircle size={15} /> Let's Talk
            </a>
          </motion.div>
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
    <div className="theme-border relative overflow-hidden border-y py-5 sm:py-6" style={{ background: "var(--c-trust-bg)" }}>
      <p className="type-label theme-muted mb-3 text-center sm:mb-4">
        Trusted by brands, teams & growing businesses
      </p>
      <div className="marquee-track">
        <div className="marquee-inner">
          {[...trustBrands, ...trustBrands].map((brand, i) => (
            <span key={i} className="type-small theme-muted mx-4 whitespace-nowrap font-medium sm:mx-5">
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
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
        {/* image slot */}
        <motion.div variants={fadeUp} className="relative">
          <div className="premium-card overflow-hidden rounded-2xl">
            <div className="flex h-[240px] items-center justify-center bg-gradient-to-br from-accent-gold/5 to-transparent sm:h-[300px] lg:h-[340px]">
              <div className="px-4 text-center">
                <div className="theme-border mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full border border-dashed">
                  <Briefcase className="theme-muted" size={18} />
                </div>
                <p className="theme-muted type-caption">Your business story</p>
                <code className="theme-faint type-caption mt-1 block">src: media/about.jpg</code>
              </div>
            </div>
          </div>
          <div className="theme-elevated theme-border absolute -bottom-3 -right-2 rounded-lg border px-3.5 py-2 shadow-soft sm:-bottom-4 sm:-right-3 sm:px-4 sm:py-2.5">
            <p className="type-stat theme-text">10+</p>
            <p className="theme-muted type-caption">Years of experience</p>
          </div>
        </motion.div>

        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} className="type-label text-accent-gold">About</motion.p>
          <motion.h2 variants={fadeUp} className="type-h2 theme-text mt-2">
            Building businesses through strategy and results
          </motion.h2>
          <motion.p variants={fadeUp} className="type-body theme-muted mt-3 sm:mt-4">
            I help businesses attract more customers, increase sales, and build stronger brands. With experience across hospitality, tourism, real estate, and digital marketing, I focus on creating strategies that generate measurable business results.
          </motion.p>
          <motion.p variants={fadeUp} className="type-body theme-muted mt-2.5 sm:mt-3">
            My approach is simple: every marketing decision should contribute to revenue growth. I work as a true partner, combining strategic thinking with hands-on execution to deliver real business outcomes.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
            {[
              { label: "Core Focus", val: "Business results over vanity metrics" },
              { label: "Approach", val: "Strategic, practical, and partnership-driven" },
              { label: "Expertise", val: "Hospitality, real estate, brand strategy" },
              { label: "Commitment", val: "Sustainable growth and measurable impact" },
            ].map((item) => (
              <div key={item.label} className="panel-inset p-3">
                <p className="type-label text-accent-gold">{item.label}</p>
                <p className="type-small theme-text mt-1 font-medium">{item.val}</p>
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
    <AnimatedSection id="expertise" label="Capabilities" title="My Core Expertise">
      <motion.div
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {expertise.map((item, i) => {
          const Icon = expertiseIcons[i % expertiseIcons.length];
          return (
            <motion.div key={item} variants={fadeUp}>
              <Card tilt className="min-h-[120px]">
                <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gold/10 text-accent-gold">
                  <Icon size={15} />
                </div>
                <h3 className="type-small theme-text font-semibold">{item}</h3>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   HOW I WORK
══════════════════════════════════ */
export function HowIWork() {
  return (
    <AnimatedSection id="how-i-work" label="Process" title="How I Work">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {howIWork.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="flex h-full flex-col">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 text-base font-bold text-accent-gold">
                {item.step}
              </div>
              <h3 className="type-h3 theme-text">{item.title}</h3>
              <p className="type-small theme-muted mt-2 flex-grow">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ══════════════════════════════════
   EXPERIENCE TIMELINE
══════════════════════════════════ */
export function Experience() {
  return (
    <AnimatedSection id="experience" label="Career Journey" title="Experience Timeline">
      <div className="relative ml-3 border-l border-white/10 pl-6 sm:pl-8">
        {timeline.map((item, i) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-6 last:mb-0"
          >
            <span className="absolute -left-[42px] top-4 flex h-5 w-5 items-center justify-center rounded-full border border-accent-gold bg-base-950 ring-4 ring-base-950">
              <span className="h-2 w-2 rounded-full bg-accent-gold" />
            </span>
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="type-label text-accent-gold">{item.duration}</p>
                  <h3 className="type-h3 theme-text mt-1 font-bold">{item.role}</h3>
                  <p className="type-small theme-muted mt-0.5 font-medium">{item.company}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {item.achievements.map((a) => (
                  <li key={a} className="type-small theme-muted flex items-start gap-2">
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
    <AnimatedSection
      id="case-studies"
      label="Portfolio"
      title="Featured Case Studies"
      subtitle="Agency-style strategic presentations with measurable business outcomes."
    >
      <div className="space-y-6">
        {caseStudies.map((study, i) =>
          study.featured ? (
            <FeaturedCaseStudy key={study.id} study={study} index={i} />
          ) : (
            <StandardCaseStudy key={study.title} study={study} index={i} />
          )
        )}
      </div>
    </AnimatedSection>
  );
}

function FeaturedCaseStudy({ study, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="premium-card overflow-hidden rounded-xl sm:rounded-2xl"
    >
      {/* Banner */}
      <div className="theme-border relative border-b bg-gradient-to-br from-accent-gold/12 via-blue-500/5 to-transparent px-4 py-7 sm:px-6 sm:py-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(198,168,109,0.12),transparent_45%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="type-caption rounded-full bg-accent-gold/20 px-2.5 py-0.5 font-semibold text-accent-gold">
              Case Study {String(index + 1).padStart(2, "0")}
            </span>
            <span className="type-caption panel-soft theme-muted rounded-full px-2.5 py-0.5">
              {study.client}
            </span>
            <span className="type-caption theme-faint">{study.period}</span>
          </div>
          <h3 className="type-h2 theme-text mt-3 max-w-4xl">
            {study.title}
          </h3>
          <p className="type-body theme-muted mt-3 max-w-3xl">
            {study.summary}
          </p>
        </div>
      </div>

      <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
        {/* Metrics grid */}
        <div>
          <p className="type-label mb-3 text-accent-gold">
            Measurable Results — 20 Months
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="panel-inset p-3 transition hover:border-accent-gold/30"
              >
                <p className="type-label theme-faint">{m.label}</p>
                <div className="mt-1.5 flex flex-wrap items-end gap-2">
                  <span className="type-caption theme-faint line-through">{m.before}</span>
                  <span className="case-metric-after type-stat theme-text">{m.after}</span>
                </div>
                <p className="type-caption theme-muted mt-1">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge / Strategy / Execution */}
        <div className="grid gap-3 lg:grid-cols-3">
          <CaseField label="Brand Challenge" value={study.challenge} />
          <CaseField label="Strategic Direction" value={study.strategy} />
          <CaseField label="Execution" value={study.execution} />
        </div>

        {/* Objectives */}
        <div className="panel-inset p-4">
          <p className="type-label text-accent-gold">Objectives</p>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {study.objectives.map((obj) => (
              <li key={obj} className="type-small theme-muted flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-gold" />
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* Channels + Portfolio */}
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="panel-inset p-4">
            <p className="type-label text-accent-gold">Marketing Channels</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {study.channels.map((ch) => (
                <span key={ch} className="type-caption panel-soft theme-muted rounded-full px-2.5 py-0.5">
                  {ch}
                </span>
              ))}
            </div>
          </div>
          <div className="panel-inset p-4">
            <p className="type-label text-accent-gold">Portfolio Brands</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {study.portfolio.map((brand) => (
                <span key={brand} className="type-caption rounded-full border border-accent-gold/20 bg-accent-gold/5 px-2.5 py-0.5 text-accent-gold">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Outcome + Success Factors */}
        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
          <CaseField label="Business Outcome" value={study.outcome} />
          <div className="panel-inset p-4">
            <p className="type-label text-accent-gold">Key Success Factors</p>
            <ul className="mt-3 space-y-1.5">
              {study.successFactors.map((f) => (
                <li key={f} className="type-small theme-muted flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="panel-soft rounded-xl border-dashed p-4 text-center sm:p-5">
          <PlayCircle className="mx-auto text-accent-gold/40" size={24} />
          <p className="type-caption theme-muted mt-2">Campaign visuals / before-after assets</p>
          <code className="type-caption theme-faint">media/case-1-banner.jpg</code>
        </div>
      </div>
    </motion.article>
  );
}

function StandardCaseStudy({ study, index }) {
  return (
    <motion.article
      key={study.title}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="premium-card overflow-hidden rounded-xl"
    >
      <div className="relative flex h-36 items-center justify-center border-b border-white/10 bg-gradient-to-br from-accent-gold/8 via-white/[0.02] to-transparent">
        <span className="type-caption absolute left-4 top-4 rounded-full bg-accent-gold/20 px-2.5 py-0.5 font-semibold text-accent-gold">
          Case Study {String(index + 1).padStart(2, "0")}
        </span>
        <div className="type-caption theme-muted text-center">
          <PlayCircle className="mx-auto mb-1.5 opacity-40" size={24} />
          <p>Visual placeholder — add campaign assets</p>
        </div>
      </div>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h3 className="type-h3 theme-text font-bold">{study.title}</h3>
          <dl className="type-small mt-3 space-y-2.5">
            <CaseField label="Brand Challenge" value={study.challenge} />
            <CaseField label="Strategic Direction" value={study.strategy} />
            <CaseField label="Execution" value={study.execution} />
          </dl>
        </div>
        <CaseField label="Business Outcome" value={study.outcome} />
      </div>
    </motion.article>
  );
}

function CaseField({ label, value }) {
  return (
    <div className="panel-inset p-3 sm:p-4">
      <dt className="type-label text-accent-gold">{label}</dt>
      <dd className="type-small theme-muted mt-1.5">{value}</dd>
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
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {leadership.map((item, i) => {
          const Icon = leadershipIcons[i % leadershipIcons.length];
          return (
            <motion.div key={item} variants={fadeUp}>
              <Card>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 text-accent-gold">
                  <Icon size={18} />
                </div>
                <p className="type-small theme-text font-semibold">{item}</p>
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
    <div className="theme-border relative overflow-hidden border-y py-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-gold/[0.04] via-transparent to-accent-gold/[0.03]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="type-label mb-6 text-center text-accent-gold sm:mb-8"
        >
          Impact by the numbers
        </motion.p>
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3"
        >
          {metrics.map((m) => (
            <motion.div key={m.label} variants={fadeUp}>
              <Card className="text-center">
                <p className="type-stat theme-text">
                  <AnimatedNumber target={m.value} suffix={m.suffix} />
                </p>
                <p className="type-small theme-muted mt-1.5">{m.label}</p>
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
        className="grid gap-3 lg:grid-cols-3"
      >
        {testimonials.map((item, i) => (
          <motion.div key={item.author} variants={fadeUp}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <span className="font-['Manrope'] text-4xl leading-none text-accent-gold/40">"</span>
                <p className="type-body theme-muted mt-1">{item.quote}</p>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold/15 type-caption font-bold text-accent-gold">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="type-small theme-text font-semibold">{item.author}</p>
                  <p className="type-caption theme-muted">Replace with real name & title</p>
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
      <div className="grid auto-rows-[140px] gap-2.5 sm:auto-rows-[180px] sm:gap-3 lg:grid-cols-4">
        {slots.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`panel-soft relative overflow-hidden rounded-xl border-dashed ${s.span}`}
          >
            <div className="flex h-full w-full flex-col items-center justify-center px-3 text-center">
              {s.video
                ? <PlayCircle className="mb-1.5 text-accent-gold/50" size={24} />
                : <div className="mb-1.5 text-xl text-accent-gold/30">+</div>}
              <p className="type-caption theme-muted font-medium">{s.label}</p>
              <code className="type-caption theme-faint mt-0.5">{s.hint}</code>
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
        className="grid gap-3 md:grid-cols-2"
      >
        {insights.map((item, i) => (
          <motion.div key={item} variants={fadeUp}>
            <Card className="group cursor-pointer">
              <div className="theme-border mb-3 flex h-28 items-center justify-center overflow-hidden rounded-lg border border-dashed">
                <p className="type-caption theme-faint">Featured image — media/insight-{i + 1}.jpg</p>
              </div>
              <p className="type-label text-accent-gold">Article Draft</p>
              <h3 className="type-h3 theme-text mt-1.5 transition group-hover:text-accent-gold">{item}</h3>
              <p className="type-small theme-muted mt-2">
                Add your full article or strategic perspective here — replace placeholder in <code className="type-caption theme-faint">content.js</code>.
              </p>
              <span className="type-caption mt-3 inline-flex items-center gap-1 font-medium text-accent-gold opacity-0 transition group-hover:opacity-100">
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
   CREDENTIALS
══════════════════════════════════ */
const categoryColors = {
  Education:     "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Language:      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Technology:    "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Communication: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Professional:  "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const categoryIcons = {
  Education:     GraduationCap,
  Language:      Eye,
  Technology:    Shield,
  Communication: Zap,
  Professional:  Award,
};

export function Credentials() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <AnimatedSection
      id="credentials"
      label="Verified Credentials"
      title="Education & Certifications"
      subtitle="Real certified proof — click any card to view the original certificate."
    >
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {credentials.map((cred) => {
          const Icon = categoryIcons[cred.category] || Award;
          const colorClass = categoryColors[cred.category] || "text-accent-gold bg-accent-gold/10 border-accent-gold/20";
          return (
            <motion.div
              key={cred.id}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <button
                type="button"
                onClick={() => setActive(cred)}
                className="premium-card group relative w-full cursor-pointer rounded-xl p-4 text-left transition-all duration-500 hover:-translate-y-0.5 sm:p-4"
              >
                {/* gradient ring on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-accent-gold/25 transition-opacity duration-500 group-hover:opacity-100" />

                {/* top row */}
                <div className="mb-3 flex items-start justify-between gap-2.5">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${colorClass}`}>
                    <Icon size={16} />
                  </div>
                  <span className={`type-caption rounded-full border px-2 py-0.5 font-semibold uppercase tracking-widest ${colorClass}`}>
                    {cred.category}
                  </span>
                </div>

                {/* cert thumbnail */}
                <div className="theme-border mb-3 overflow-hidden rounded-lg border">
                  <img
                    src={cred.file}
                    alt={cred.title}
                    className="h-32 w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <h3 className="type-small theme-text font-bold">{cred.title}</h3>
                <p className="type-caption theme-muted mt-0.5 font-medium">{cred.subtitle}</p>
                <p className="type-caption theme-faint mt-0.5">{cred.issuer}</p>

                <div className="mt-2.5 flex items-center justify-between">
                  <span className="type-caption theme-faint">{cred.date}</span>
                  <span className="type-caption flex items-center gap-1 font-medium text-accent-gold opacity-0 transition-opacity group-hover:opacity-100">
                    View full <ExternalLink size={11} />
                  </span>
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            className="lightbox-overlay fixed inset-0 z-[200] flex items-end justify-center p-0 backdrop-blur-sm sm:items-center sm:p-4"
          >
            <motion.div
              key="lightbox-modal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="lightbox-modal relative max-h-[100dvh] w-full max-w-2xl overflow-auto rounded-t-2xl sm:max-h-[92vh] sm:rounded-2xl"
            >
              {/* close */}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="theme-icon-btn absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur sm:right-4 sm:top-4"
                aria-label="Close"
              >
                <X size={15} />
              </button>

              {/* certificate image */}
              <img
                src={active.file}
                alt={active.title}
                className="w-full rounded-t-2xl object-contain"
                loading="eager"
              />

              {/* meta */}
              <div className="theme-border border-t p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="type-label text-accent-gold">{active.category}</p>
                    <h3 className="type-h3 theme-text mt-1 font-bold">{active.title}</h3>
                    <p className="type-small theme-muted">{active.subtitle}</p>
                    <p className="type-caption theme-faint mt-0.5">{active.issuer} · {active.date}</p>
                    <p className="type-caption theme-muted mt-2">{active.detail}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
            className="panel-soft type-small theme-text cursor-default rounded-full px-3.5 py-1.5 font-medium transition-colors"
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
    <AnimatedSection id="contact" className="!pb-16 sm:!pb-20">
      <div className="premium-card overflow-hidden rounded-xl sm:rounded-2xl">
        <div className="relative px-4 pb-5 pt-8 text-center sm:px-6 sm:pb-6 sm:pt-10">
          <p className="type-label text-accent-gold">Open to opportunities</p>
          <h2 className="type-h2 theme-text mt-2">
            Let's Grow Your Business<br className="hidden sm:inline" /> Together
          </h2>
          <p className="type-body theme-muted mx-auto mt-3 max-w-xl">
            Whether you're launching a venture, promoting a project, or strengthening your brand, let's discuss your goals and create a winning strategy.
          </p>
        </div>

        {/* contact grid */}
        <div className="theme-border grid gap-px border-t md:grid-cols-3">
          {[
            { icon: <Mail size={18} />, label: "Email", val: "islm.hr@gmail.com", href: "mailto:islm.hr@gmail.com" },
            { icon: <Linkedin size={18} />, label: "LinkedIn", val: "linkedin.com/in/morshedul-islam", href: "https://www.linkedin.com/in/morshedul-islam/" },
            { icon: <MessageCircle size={18} />, label: "WhatsApp", val: "+880 1771 969671", href: "https://wa.me/8801771969671" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="theme-surface group flex items-center gap-3 p-3.5 transition hover:bg-accent-gold/[0.06] sm:gap-3.5 sm:p-4"
            >
              <div className="theme-icon-btn flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border text-accent-gold transition group-hover:border-accent-gold group-hover:bg-accent-gold/10">
                {item.icon}
              </div>
              <div>
                <p className="type-caption theme-muted">{item.label}</p>
                <p className="type-small theme-text break-all font-medium sm:break-normal">{item.val}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Calendly placeholder */}
        <div className="theme-border border-t p-4 text-center sm:p-5">
          <p className="type-caption theme-muted">Calendly / booking embed goes here — replace with real link</p>
          <a href="#" className="btn-premium mt-3 inline-flex">
            Book a 30-min call <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
