"use client";

import { whatsappConfig } from "@/lib/data";
import { motion } from "framer-motion";

export default function WhatsappButton() {
  const url = `https://wa.me/${whatsappConfig.number}?text=${encodeURIComponent(
    whatsappConfig.message,
  )}`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 animate-ping rounded-full bg-green-500/30" />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactez-nous sur WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/25 transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 2.667c-7.364 0-13.338 5.974-13.338 13.338 0 2.352.616 4.652 1.786 6.682L2.667 29.333l6.84-1.794a13.28 13.28 0 006.497 1.682c7.364 0 13.338-5.974 13.338-13.338S23.368 2.667 16.004 2.667zm0 24.41a11.03 11.03 0 01-5.624-1.54l-.404-.24-4.186 1.098 1.116-4.078-.263-.418a11.02 11.02 0 01-1.69-5.895c0-6.086 4.954-11.04 11.04-11.04 6.087 0 11.04 4.954 11.04 11.04.001 6.088-4.942 11.073-11.029 11.073zm6.054-8.27c-.332-.166-1.964-.97-2.268-1.08-.304-.112-.526-.166-.748.166s-.858 1.08-1.052 1.302c-.194.222-.388.25-.72.084-.332-.166-1.402-.517-2.67-1.648-.986-.88-1.652-1.966-1.846-2.298-.194-.332-.02-.512.146-.678.15-.148.332-.388.498-.582.166-.194.222-.332.332-.554.112-.222.056-.416-.028-.582-.084-.166-.748-1.804-1.024-2.468-.27-.648-.544-.56-.748-.57-.194-.01-.416-.012-.638-.012s-.582.084-.886.416c-.304.332-1.162 1.136-1.162 2.77s1.19 3.214 1.356 3.436c.166.222 2.342 3.574 5.676 5.012.792.342 1.412.546 1.894.7.796.252 1.52.216 2.092.132.638-.096 1.964-.804 2.242-1.58.278-.776.278-1.44.194-1.58-.084-.138-.304-.222-.638-.388z" />
        </svg>
      </a>

      {/* Tooltip */}
      <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block hidden">
        Discutez avec nous
        <div className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 bg-foreground" />
      </div>
    </motion.div>
  );
}
