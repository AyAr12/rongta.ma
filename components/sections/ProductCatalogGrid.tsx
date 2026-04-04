"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ApiCategory, getImageUrl } from "@/lib/api";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/data";

interface Props {
  categories: ApiCategory[];
}

export default function ProductCatalogGrid({ categories }: Props) {
    
  if (categories.length === 0) {
    return (
      <div className="mt-12 text-center text-muted-foreground">
        <p>
          Les catégories seront affichées dès que le catalogue est configuré.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
    >
      {categories.map((cat) => (
        <motion.div key={cat.id} variants={fadeInUp}>
          <Link
            href={`/products?category=${cat.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-[#e8e8e8] dark:bg-[#2a2a2a]"
          >
            {/* Conteneur principal qui définit les proportions */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              
              {/* Category image — from API */}
              {cat.image ? (
                <Image
                  src={getImageUrl(cat.image)}
                  alt={cat.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary/60">
                  <span className="text-6xl opacity-10">📦</span>
                </div>
              )}

              {/* Gradient de protection (optionnel mais pro) pour assurer la lisibilité du texte noir */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent z-10 pointer-events-none" />

              {/* Title en surimpression : Top, Center, Noir */}
              <div className="absolute inset-x-0 top-0 z-20 pt-6 px-4 text-center pointer-events-none">
                <h3 className="text-base font-bold uppercase tracking-wide text-black sm:text-lg drop-shadow-sm">
                  {cat.name}
                </h3>
              </div>

              {/* Hover overlay with arrow */}
              <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/0 opacity-0 shadow-lg transition-all duration-300 group-hover:bg-white group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            {/* Hover border */}
            <div className="pointer-events-none absolute inset-0 z-40 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-primary/40" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}