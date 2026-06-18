import { motion } from "framer-motion";

export function AnimatedSection({ id, label, title, subtitle, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`section-wrap mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {(label || title || subtitle) && (
        <div className="section-head">
          {label && (
            <p className="type-label text-accent-gold">{label}</p>
          )}
          {title && (
            <h2 className="type-h2 theme-text">{title}</h2>
          )}
          {subtitle && (
            <p className="type-body theme-muted max-w-2xl">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
}
