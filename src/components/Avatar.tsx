"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  hidden?: boolean;
};

export default function Avatar({ hidden = false }: Props) {
  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className="fixed right-6 top-5 z-50"
        >
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            }}
            className="h-11 w-11 rounded-full overflow-hidden border border-white/10"
            aria-label="User menu"
          >
            <div
              className="h-full w-full flex items-center justify-center text-sm font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-yellow-light), var(--brand-green-light))",
              }}
            >
              AB
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
