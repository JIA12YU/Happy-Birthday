"use client";

import { motion } from "framer-motion";

type StartButtonProps = {
  started: boolean;
  visible: boolean;
  onStart: () => void;
};

export default function StartButton({ started, visible, onStart }: StartButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onStart}
      disabled={started}
      className="group relative overflow-hidden rounded-full border border-white/60 bg-white/22 px-14 py-6 text-[#42553b] shadow-[0_22px_80px_rgba(255,238,174,0.38)] outline-none backdrop-blur-2xl transition duration-700 hover:border-white/85 hover:bg-white/38 hover:shadow-[0_24px_90px_rgba(255,246,190,0.58)] focus-visible:ring-2 focus-visible:ring-white/80 sm:px-20 sm:py-7"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{
        opacity: started || !visible ? 0 : 1,
        y: started || !visible ? 24 : 0,
        scale: started ? 0.96 : visible ? 1 : 0.98,
      }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: started ? 0.96 : 1.018 }}
      whileTap={{ scale: 0.985 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,235,0.62), rgba(255,255,255,0.08) 62%, transparent)",
        }}
      />
      <span className="relative block text-center">
        <span
          className="script-font block text-5xl tracking-[0.03em] sm:text-6xl"
        >
          Start
        </span>
        <span
          className="script-font mt-2 block text-[0.9rem] tracking-[0.12em] text-[#60734c]/80"
        >
          Begin the Journey
        </span>
      </span>
    </motion.button>
  );
}
