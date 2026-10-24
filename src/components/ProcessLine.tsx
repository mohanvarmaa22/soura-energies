"use client";

import { MotionConfig, motion } from "motion/react";

/** Teal line that draws across the process steps as they enter view, showing the order of the work. Desktop only. */
export function ProcessLine() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-7 hidden h-px bg-line lg:block">
      {/* Reduced motion: the line appears drawn instantly; same markup on server and client. */}
      <MotionConfig reducedMotion="user">
        <motion.div
          className="h-full origin-left bg-brand"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
        />
      </MotionConfig>
    </div>
  );
}
