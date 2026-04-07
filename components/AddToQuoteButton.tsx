"use client";

import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteList } from "@/lib/quote-list-context";
import { type ApiProduct } from "@/lib/api";
import { useState } from "react";

interface AddToQuoteButtonProps {
  product: ApiProduct;
  variant?:
    | "default"
    | "link"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
  fullLabel?: boolean;
}

export default function AddToQuoteButton({
  product,
  variant = "default",
  size = "sm",
  className,
  fullLabel = true,
}: AddToQuoteButtonProps) {
  const { addItem, hasItem, setDrawerOpen } = useQuoteList();
  const inList = hasItem(product.id);
  const [bounce, setBounce] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inList) {
      // Already in list — open drawer to view/edit
      setDrawerOpen(true);
      return;
    }

    addItem(product);
    setBounce(true);
    setTimeout(() => setBounce(false), 400);
  };

  return (
    <Button
      onClick={handleClick}
      variant={inList ? "outline" : variant}
      size={size}
      className={`gap-1.5 transition-all ${bounce ? "scale-95" : ""} ${
        inList
          ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          : ""
      } ${className || ""}`}
    >
      {inList ? (
        <>
          <Check className="h-4 w-4" />
          {fullLabel && "Dans ma liste"}
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" />
          {fullLabel && "Ajouter à ma liste"}
        </>
      )}
    </Button>
  );
}
