"use client";

import { motion } from "framer-motion";

interface SplitScreenProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function SplitScreen({ left, right }: SplitScreenProps) {
  return (
    <div className="flex w-full h-screen">
      <motion.div
        className="hidden md:flex flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {left}
      </motion.div>
      <motion.div
        className="flex flex-1"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {right}
      </motion.div>
    </div>
  );
}
