"use client";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/logo";

export function AuthShell({
  children,
  panel,
}: {
  children: React.ReactNode;
  panel?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2 lg:px-16"
      >
        <div className="mx-auto w-full max-w-sm">
          <Logo className="mb-8" />
          {children}
        </div>
      </motion.div>

      {panel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden lg:flex lg:w-1/2 items-center justify-center bg-secondary/60 p-16"
        >
          {panel}
        </motion.div>
      )}
    </div>
  );
}
