import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingCTA() {
  return (
    <motion.a
      href="https://wa.me/8801771969671"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(37,211,102,0.45)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}
