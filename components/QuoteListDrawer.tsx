"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  Trash2,
  ClipboardList,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { useQuoteList } from "@/lib/quote-list-context";
import { motion, AnimatePresence } from "framer-motion";

export default function QuoteListDrawer() {
  const {
    items,
    count,
    drawerOpen,
    setDrawerOpen,
    updateQuantity,
    removeItem,
    clear,
    whatsappUrl,
  } = useQuoteList();

  console.log({ items });

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="h-5 w-5 text-primary" />
            Ma liste de devis
          </SheetTitle>
          <SheetDescription className="text-xs">
            {items.length === 0
              ? "Aucun produit pour le moment"
              : `${count} produit${count > 1 ? "s" : ""} dans votre demande`}
          </SheetDescription>
        </SheetHeader>

        {/* ── Body ───────────────────────────────────────────── */}
        {items.length === 0 ? (
          // ── Empty state ───────────────────────────────────
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="h-9 w-9 text-muted-foreground/50" />
            </div>
            <h3 className="mt-5 text-base font-semibold text-foreground">
              Votre liste est vide
            </h3>
            <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
              Parcourez notre catalogue et ajoutez les produits qui vous
              intéressent pour préparer votre demande de devis.
            </p>
            <Button
              className="mt-6 gap-1.5"
              asChild
              onClick={() => setDrawerOpen(false)}
            >
              <Link href="/products">
                Découvrir nos produits
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* ── Items list ─────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        x: 30,
                        transition: { duration: 0.2 },
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="group flex gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary/30"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-secondary/40"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain p-1.5"
                        />
                      </Link>

                      {/* Content */}
                      <div className="flex flex-1 flex-col min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={() => setDrawerOpen(false)}
                              className="block text-sm font-semibold leading-snug text-foreground hover:text-primary transition-colors line-clamp-2"
                            >
                              {item.name}
                            </Link>
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              Réf: {item.modelCode}
                            </p>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label="Retirer"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Quantity controls */}
                        <div className="mt-auto flex items-center gap-1.5 pt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label="Diminuer"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val)) updateQuantity(item.id, val);
                            }}
                            className="h-7 w-12 rounded-md border border-border bg-background text-center text-xs font-semibold tabular-nums outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Augmenter"
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Clear button */}
              <button
                onClick={clear}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-red-600"
              >
                <Trash2 className="h-3 w-3" />
                Vider la liste
              </button>
            </div>

            {/* ── Footer with CTA ────────────────────────────── */}
            <div className="border-t border-border bg-secondary/30 px-6 py-5">
              {/* Summary line */}
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total articles</span>
                <span className="font-semibold text-foreground tabular-nums">
                  {count}
                </span>
              </div>

              {/* WhatsApp CTA */}
              <Button
                asChild
                size="lg"
                className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#1fb855] shadow-md shadow-emerald-500/20"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M16.004 2.667c-7.364 0-13.338 5.974-13.338 13.338 0 2.352.616 4.652 1.786 6.682L2.667 29.333l6.84-1.794a13.28 13.28 0 006.497 1.682c7.364 0 13.338-5.974 13.338-13.338S23.368 2.667 16.004 2.667zm0 24.41a11.03 11.03 0 01-5.624-1.54l-.404-.24-4.186 1.098 1.116-4.078-.263-.418a11.02 11.02 0 01-1.69-5.895c0-6.086 4.954-11.04 11.04-11.04 6.087 0 11.04 4.954 11.04 11.04.001 6.088-4.942 11.073-11.029 11.073zm6.054-8.27c-.332-.166-1.964-.97-2.268-1.08-.304-.112-.526-.166-.748.166s-.858 1.08-1.052 1.302c-.194.222-.388.25-.72.084-.332-.166-1.402-.517-2.67-1.648-.986-.88-1.652-1.966-1.846-2.298-.194-.332-.02-.512.146-.678.15-.148.332-.388.498-.582.166-.194.222-.332.332-.554.112-.222.056-.416-.028-.582-.084-.166-.748-1.804-1.024-2.468-.27-.648-.544-.56-.748-.57-.194-.01-.416-.012-.638-.012s-.582.084-.886.416c-.304.332-1.162 1.136-1.162 2.77s1.19 3.214 1.356 3.436c.166.222 2.342 3.574 5.676 5.012.792.342 1.412.546 1.894.7.796.252 1.52.216 2.092.132.638-.096 1.964-.804 2.242-1.58.278-.776.278-1.44.194-1.58-.084-.138-.304-.222-.638-.388z" />
                  </svg>
                  Demander mon devis sur WhatsApp
                </a>
              </Button>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Notre équipe vous répond généralement sous 1h en horaires
                ouvrés.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
