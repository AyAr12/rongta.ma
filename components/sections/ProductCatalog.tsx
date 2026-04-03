"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  products,
  productCategories,
  fadeInUp,
  staggerContainer,
  type ProductCategory,
} from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCatalog() {
  const [active, setActive] = useState<ProductCategory>("imprimantes");
  const filtered = products.filter((p) => p.category === active);

  return (
    <section id="produits" className="bg-secondary/40 py-16 sm:py-24">
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
            Notre catalogue
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Matériel POS professionnel
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground"
          >
            Une gamme complète d&apos;équipements certifiés pour chaque besoin
            commercial — de l&apos;imprimante compacte au terminal tout-en-un.
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {productCategories.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 card-hover"
              >
                {/* Badge */}
                {product.badge && (
                  <Badge className="absolute right-3 top-3 z-10 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}

                {/* Image */}
                <div className="relative flex h-48 items-center justify-center bg-secondary/40 p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-semibold text-foreground">
                    Rongta {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specs pills */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-primary hover:text-primary hover:bg-primary/5"
                      asChild
                    >
                      <a href="#contact">
                        Demander un devis
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
