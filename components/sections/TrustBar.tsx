"use client";

import Image from "next/image";
import { partners, stats } from "@/lib/data";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("fr-MA")}
      {suffix}
    </span>
  );
}

export default function TrustBar() {
  // Double the partners array for seamless infinite scroll
  const doubled = [...partners, ...partners];

  return (
    <section className="border-y border-border bg-secondary/50 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <stat.icon className="mb-1 h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground sm:text-3xl">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Label */}
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Ils nous font confiance
        </p>

        {/* Infinite scrolling logos */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-secondary/50 to-transparent sm:w-24" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-secondary/50 to-transparent sm:w-24" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex w-max items-center gap-12 sm:gap-16"
          >
            {doubled.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex h-10 w-24 shrink-0 items-center justify-center grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-12 sm:w-28"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={112}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
