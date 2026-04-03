"use client";

import { valuePropositions, fadeInUp, staggerContainer } from "@/lib/data";
import { motion } from "framer-motion";

export default function WhyRongta() {
  return (
    <section id="avantages" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-sm font-semibold uppercase tracking-widest text-primary"
          >
            Nos engagements
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Pourquoi choisir Rongta Maroc ?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground"
          >
            Plus qu&apos;un fournisseur, un partenaire local qui vous accompagne
            de l&apos;achat à la maintenance.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {valuePropositions.map((vp) => (
            <motion.div
              key={vp.title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 card-hover"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                <vp.icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {vp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {vp.description}
              </p>

              {/* Decorative corner accent */}
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/[0.03] transition-transform duration-300 group-hover:scale-150" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
