"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { type ApiProduct, getImageUrl, getProductCover } from "@/lib/api";
import { buildSingleProductQuoteUrl } from "@/lib/quote-list-context";
import AddToQuoteButton from "./AddToQuoteButton";

interface DirectQuoteCTAProps {
  product: ApiProduct;
}

export default function DirectQuoteCTA({ product }: DirectQuoteCTAProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cover = getProductCover(product);
  const whatsappUrl = buildSingleProductQuoteUrl(product, quantity);

  // Reset quantity when dialog opens
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) setQuantity(1);
  };

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      {/* ── Demander un devis (opens dialog) ───────────────── */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button size="lg" className="glow-orange gap-2 flex-1">
            <svg viewBox="0 0 32 32" fill="currentColor" className="h-4 w-4">
              <path d="M16.004 2.667c-7.364 0-13.338 5.974-13.338 13.338 0 2.352.616 4.652 1.786 6.682L2.667 29.333l6.84-1.794a13.28 13.28 0 006.497 1.682c7.364 0 13.338-5.974 13.338-13.338S23.368 2.667 16.004 2.667zm0 24.41a11.03 11.03 0 01-5.624-1.54l-.404-.24-4.186 1.098 1.116-4.078-.263-.418a11.02 11.02 0 01-1.69-5.895c0-6.086 4.954-11.04 11.04-11.04 6.087 0 11.04 4.954 11.04 11.04.001 6.088-4.942 11.073-11.029 11.073zm6.054-8.27c-.332-.166-1.964-.97-2.268-1.08-.304-.112-.526-.166-.748.166s-.858 1.08-1.052 1.302c-.194.222-.388.25-.72.084-.332-.166-1.402-.517-2.67-1.648-.986-.88-1.652-1.966-1.846-2.298-.194-.332-.02-.512.146-.678.15-.148.332-.388.498-.582.166-.194.222-.332.332-.554.112-.222.056-.416-.028-.582-.084-.166-.748-1.804-1.024-2.468-.27-.648-.544-.56-.748-.57-.194-.01-.416-.012-.638-.012s-.582.084-.886.416c-.304.332-1.162 1.136-1.162 2.77s1.19 3.214 1.356 3.436c.166.222 2.342 3.574 5.676 5.012.792.342 1.412.546 1.894.7.796.252 1.52.216 2.092.132.638-.096 1.964-.804 2.242-1.58.278-.776.278-1.44.194-1.58-.084-.138-.304-.222-.638-.388z" />
            </svg>
            Demander un devis
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md p-0 overflow-hidden gap-0">
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle className="text-lg">Demander un devis</DialogTitle>
            <DialogDescription className="text-xs">
              Précisez la quantité souhaitée. Nous vous enverrons une
              proposition rapidement.
            </DialogDescription>
          </DialogHeader>

          {/* Product summary */}
          <div className="flex gap-4 px-6 py-5">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-secondary/40">
              <Image
                src={getImageUrl(product.images[0])}
                alt={product.name}
                width={80}
                height={80}
                className="h-full w-full object-contain p-1.5"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center min-w-0">
              <p className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
                {product.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Réf: {product.modelCode}
              </p>
              {product.category && (
                <p className="mt-0.5 text-[11px] text-primary">
                  {product.category.name}
                </p>
              )}
            </div>
          </div>

          {/* Quantity picker */}
          <div className="border-t border-border bg-secondary/30 px-6 py-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quantité souhaitée
            </label>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1) setQuantity(val);
                }}
                className="h-11 flex-1 rounded-lg border border-border bg-background text-center text-base font-semibold tabular-nums outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Augmenter"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Quick quantity presets */}
            <div className="mt-3 flex gap-1.5">
              {[1, 2, 5, 10].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setQuantity(preset)}
                  className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                    quantity === preset
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-border px-6 py-5">
            <Button
              asChild
              size="lg"
              className="w-full gap-2 bg-[#25D366] text-white hover:bg-[#1fb855] shadow-md shadow-emerald-500/20"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M16.004 2.667c-7.364 0-13.338 5.974-13.338 13.338 0 2.352.616 4.652 1.786 6.682L2.667 29.333l6.84-1.794a13.28 13.28 0 006.497 1.682c7.364 0 13.338-5.974 13.338-13.338S23.368 2.667 16.004 2.667zm0 24.41a11.03 11.03 0 01-5.624-1.54l-.404-.24-4.186 1.098 1.116-4.078-.263-.418a11.02 11.02 0 01-1.69-5.895c0-6.086 4.954-11.04 11.04-11.04 6.087 0 11.04 4.954 11.04 11.04.001 6.088-4.942 11.073-11.029 11.073zm6.054-8.27c-.332-.166-1.964-.97-2.268-1.08-.304-.112-.526-.166-.748.166s-.858 1.08-1.052 1.302c-.194.222-.388.25-.72.084-.332-.166-1.402-.517-2.67-1.648-.986-.88-1.652-1.966-1.846-2.298-.194-.332-.02-.512.146-.678.15-.148.332-.388.498-.582.166-.194.222-.332.332-.554.112-.222.056-.416-.028-.582-.084-.166-.748-1.804-1.024-2.468-.27-.648-.544-.56-.748-.57-.194-.01-.416-.012-.638-.012s-.582.084-.886.416c-.304.332-1.162 1.136-1.162 2.77s1.19 3.214 1.356 3.436c.166.222 2.342 3.574 5.676 5.012.792.342 1.412.546 1.894.7.796.252 1.52.216 2.092.132.638-.096 1.964-.804 2.242-1.58.278-.776.278-1.44.194-1.58-.084-.138-.304-.222-.638-.388z" />
                </svg>
                Envoyer sur WhatsApp
              </a>
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Une nouvelle conversation s&apos;ouvrira dans WhatsApp
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Add to list ─────────────────────────────────────── */}
      <AddToQuoteButton
        product={product}
        variant="outline"
        size="lg"
        className="flex-1 sm:flex-initial"
      />
    </div>
  );
}