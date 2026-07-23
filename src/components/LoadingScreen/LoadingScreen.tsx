import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-16 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h1
          className="relative font-display text-3xl tracking-[0.35em] text-gold sm:text-4xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          PROTOTYPE
          <br />
          <span className="text-white">QUEST</span>
        </motion.h1>
      </div>

      <motion.div
        className="mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="flex gap-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
        </span>
        Loading book...
      </motion.div>
    </motion.div>
  );
}
