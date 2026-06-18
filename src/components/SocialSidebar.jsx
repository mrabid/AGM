import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";

const links = [
  { icon: <Linkedin size={15} />, href: "https://www.linkedin.com/in/morshedul-islam/", label: "LinkedIn" },
  { icon: <Mail size={15} />, href: "mailto:islm.hr@gmail.com", label: "Email" },
  { icon: <Phone size={15} />, href: "tel:+8801771969671", label: "Phone" },
];

export function SocialSidebar() {
  return (
    <motion.div
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <div className="h-16 w-px bg-gradient-to-b from-transparent to-[var(--c-border-strong)]" />
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          aria-label={l.label}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="theme-icon-btn group flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur transition"
        >
          {l.icon}
        </a>
      ))}
      <div className="h-16 w-px bg-gradient-to-t from-transparent to-[var(--c-border-strong)]" />
    </motion.div>
  );
}
