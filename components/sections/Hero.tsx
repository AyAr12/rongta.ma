"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  heroContent,
  heroBenefits,
  fadeInUp,
  staggerContainer,
} from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ResellerDialog from "@/components/ResellerDialog";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate benefits every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroBenefits.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeBenefit = heroBenefits[activeIndex];
  const ActiveIcon = activeBenefit.icon;

  return (
    <section className="relative overflow-hidden bg-background pt-16">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Top: Text + Product image ──────────────────────── */}
        <div className="flex flex-col items-center justify-center gap-10 py-14 lg:flex-row lg:items-center lg:gap-14 lg:py-20">
          {/* Left column — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {heroContent.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Nous sommes le{" "}
              <span className="text-gradient-rongta">
                distributeur officiel
              </span>{" "}
              de la marque Rongta au Maroc
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {heroContent.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ResellerDialog>
                <Button size="lg" className="glow-orange gap-2 text-base">
                  {heroContent.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </ResellerDialog>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base"
                asChild
              >
                <Link href="/products">
                  <Play className="h-4 w-4" />
                  {heroContent.ctaSecondary}
                </Link>
              </Button>
            </motion.div>

            {/* Mini trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Garantie locale
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Pièces 4 ans
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Stock Casablanca
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — Product image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative flex w-full max-w-md items-center justify-center lg:max-w-lg xl:max-w-xl"
          >
            {/* Decorative circle behind image */}
            <div className="absolute inset-0 m-auto h-[80%] w-[80%] rounded-full bg-primary/5 blur-2xl" />

            {/* Floating card — 4 ans */}
            <motion.div
              style={{ willChange: "transform" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-1/4 z-10 rounded-lg border border-border bg-background px-3 py-2 shadow-md sm:-left-8"
            >
              <p className="text-xs font-semibold text-foreground">4 ans</p>
              <p className="text-[10px] text-muted-foreground">
                Pièces disponibles
              </p>
            </motion.div>

            {/* Floating card — Officiel */}
            <motion.div
              style={{ willChange: "transform" }}
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -right-4 bottom-1/4 z-10 rounded-lg border border-border bg-background px-3 py-2 shadow-md sm:-right-8"
            >
              <p className="text-xs font-semibold text-primary">✓ Officiel</p>
              <p className="text-[10px] text-muted-foreground">Agréé Rongta</p>
            </motion.div>

            {/* Product image */}
            <div className="relative aspect-square w-full">
              <Image
                src={heroContent.image}
                alt="Imprimante thermique Rongta"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Bottom: Rotating benefits ticker ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-background/60 backdrop-blur-xl shadow-xl shadow-primary/5"
        >
          <div className="grid lg:grid-cols-[auto_1fr_auto]">
            {/* Left — Label */}
            <div className="flex items-center gap-2 border-b border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 py-4 lg:border-b-0 lg:border-r lg:px-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                <ActiveIcon className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  Nos engagements
                </span>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(heroBenefits.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Center — Rotating content */}
            <div className="relative min-h-[88px] px-6 py-4 lg:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col justify-center h-full"
                >
                  <p className="text-sm font-bold leading-tight text-foreground sm:text-base">
                    {activeBenefit.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm line-clamp-2">
                    {activeBenefit.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — Dots navigation */}
            <div className="flex items-center justify-center gap-1.5 border-t border-border bg-secondary/30 px-6 py-4 lg:border-t-0 lg:border-l lg:px-8">
              {heroBenefits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2500);
                  }}
                  aria-label={`Engagement ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-8 bg-primary"
                      : "w-1.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
