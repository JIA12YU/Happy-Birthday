"use client";

import { motion } from "framer-motion";
import { withBasePath } from "@/lib/basePath";

type LivingBackgroundProps = {
  started: boolean;
};

export default function LivingBackground({ started }: LivingBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f5efd8]">
      <motion.video
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        src={withBasePath("/assets/summer2024/opening-loop.mp4")}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ scale: 1 }}
        animate={{ scale: started ? 1.055 : 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 52%, transparent 0 45%, rgba(39,49,29,0.10) 100%)",
        }}
      />
    </div>
  );
}
