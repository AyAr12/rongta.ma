"use client";

import { sectors, fadeInUp, staggerContainer } from "@/lib/data";
import { motion } from "framer-motion";

export default function Sectors() {
  return (
    <section id="secteurs" className="bg-secondary/40 py-16 sm:py-24">
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
            Solutions par secteur
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Un équipement adapté à chaque métier
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground"
          >
            Que vous soyez dans le retail, la restauration, la logistique ou la
            santé, nous avons la solution POS qu&apos;il vous faut.
          </motion.p>
        </motion.div>

        {/* Sectors grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {sectors.map((sector) => (
            <motion.div
              key={sector.id}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 card-hover sm:p-8"
            >
              {/* Icon + title row */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                  <sector.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {sector.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {sector.description}
              </p>

              {/* Recommended products (hover reveal) */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {sector.products.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* Background decorative */}
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/[0.03] transition-transform duration-300 group-hover:scale-[2]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
