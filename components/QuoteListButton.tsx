"use client";

import { ClipboardList } from "lucide-react";
import { useQuoteList } from "@/lib/quote-list-context";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteListButton() {
  const { count, setDrawerOpen, justAdded } = useQuoteList();

  return (
    <button
      onClick={() => setDrawerOpen(true)}
      aria-label={`Ma liste de devis (${count} produit${count > 1 ? "s" : ""})`}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
    >
      <motion.div
        animate={justAdded ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ClipboardList className="h-5 w-5" />
      </motion.div>

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-md ring-2 ring-background"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
