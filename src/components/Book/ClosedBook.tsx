import { motion } from "framer-motion";
import { eventMeta } from "../../data/book";

interface ClosedBookProps {
  onOpen: () => void;
}

export default function ClosedBook({ onOpen }: ClosedBookProps) {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-6">
      {/* soft spotlight behind the book */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.08] blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_75%)]" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[420px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.button
          type="button"
          onClick={onOpen}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-[10px] border border-white/10 bg-black p-0 text-left shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
          style={{ aspectRatio: "3 / 4.5" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src={eventMeta.coverImage}
            alt={`${eventMeta.title} cover`}
            className="h-full w-full select-none object-contain transition duration-300 group-hover:brightness-110"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[10px] ring-1 ring-white/10" />
        </motion.button>

        <motion.button
          type="button"
          onClick={onOpen}
          className="mx-auto mt-10 flex items-center gap-3 rounded-full border border-gold/50 px-8 py-3 font-display text-xs uppercase tracking-[0.35em] text-gold transition-colors hover:bg-gold hover:text-ink active:scale-95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Open Book
        </motion.button>
      </motion.div>
    </div>
  );
}
