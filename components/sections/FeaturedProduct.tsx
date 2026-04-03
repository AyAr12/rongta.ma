"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredProduct, fadeInUp, staggerContainer } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FeaturedProduct() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left — Specs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex max-w-lg flex-col lg:w-1/2"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="border-primary/30 text-primary"
              >
                Produit vedette
              </Badge>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Rongta {featuredProduct.name}
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-3 text-base leading-relaxed text-muted-foreground"
            >
              {featuredProduct.tagline}
            </motion.p>

            {/* Feature list */}
            <motion.div
              variants={staggerContainer}
              className="mt-8 grid grid-cols-2 gap-3"
            >
              {featuredProduct.features.map((feat) => (
                <motion.div
                  key={feat.label}
                  variants={fadeInUp}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/40 p-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {feat.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {feat.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8">
              <Button size="lg" className="glow-orange gap-2" asChild>
                <Link href="#contact">
                  {featuredProduct.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex w-full items-center justify-center lg:w-1/2"
          >
            {/* Background glow */}
            <div className="absolute inset-0 m-auto h-[70%] w-[70%] rounded-full bg-primary/5 blur-3xl" />

            <motion.div
              style={{ y: imageY }}
              className="relative aspect-square w-full max-w-md"
            >
              <Image
                src={featuredProduct.image}
                alt={`Rongta ${featuredProduct.name}`}
                fill
                className="object-contain drop-shadow-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
