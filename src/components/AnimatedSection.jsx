import { motion } from "framer-motion";

export function AnimatedSection({ id, label, title, subtitle, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {(label || title || subtitle) && (
        <div className="mb-10">
          {label && (
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-accent-gold">
              {label}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base text-accent-smoke">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  );
}
