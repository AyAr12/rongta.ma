"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContent, fadeInUp, staggerContainer } from "@/lib/data";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient orb top-right */}
        <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24">
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
                Distributeur exclusif Maroc
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              {heroContent.headline.split("POS")[0]}
              <span className="text-gradient-rongta">POS</span>
              {heroContent.headline.split("POS")[1]}
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
              <Button size="lg" className="glow-orange gap-2 text-base" asChild>
                <Link href="#contact">
                  {heroContent.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base"
                asChild
              >
                <Link href="#produits">
                  <Play className="h-4 w-4" />
                  {heroContent.ctaSecondary}
                </Link>
              </Button>
            </motion.div>

            {/* Mini trust indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                Garantie 4 ans
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                SAV local 24h
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
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

            {/* Floating card accents */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-1/4 z-10 rounded-lg border border-border bg-background/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:-left-8"
            >
              <p className="text-xs font-semibold text-foreground">250 mm/s</p>
              <p className="text-[10px] text-muted-foreground">
                Vitesse d&apos;impression
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -right-4 bottom-1/4 z-10 rounded-lg border border-border bg-background/90 px-3 py-2 shadow-lg backdrop-blur-sm sm:-right-8"
            >
              <p className="text-xs font-semibold text-primary">★ 4.9/5</p>
              <p className="text-[10px] text-muted-foreground">
                Satisfaction client
              </p>
            </motion.div>

            {/* Product image */}
            <div className="relative aspect-square w-full">
              <Image
                src={heroContent.image}
                alt="Imprimante thermique Rongta RP820"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
