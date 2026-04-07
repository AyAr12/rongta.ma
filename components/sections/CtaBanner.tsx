"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ctaBanner, fadeInUp, staggerContainer } from "@/lib/data";
import { motion } from "framer-motion";
import ResellerDialog from "../ResellerDialog";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
          >
            {ctaBanner.headline}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/80"
          >
            {ctaBanner.subheadline}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <ResellerDialog>
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 bg-white text-primary font-semibold hover:bg-white/90 shadow-lg shadow-black/10"
              >
                {ctaBanner.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </ResellerDialog>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary-foreground/30 hover:bg-primary-foreground/10"
              asChild
            >
              <Link href={`tel:${ctaBanner.phone.replace(/\s/g, "")}`}>
                <Phone className="h-4 w-4" />
                {ctaBanner.phone}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
