"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [value, setValue] = useState(currentQuery);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync input with URL when navigating
  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  const updateSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    // Reset to page 1 on new search
    params.delete("page");

    router.push(`/products?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    // Debounce 400ms
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => updateSearch(val), 400);
  };

  const handleClear = () => {
    setValue("");
    updateSearch("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Rechercher un produit..."
        className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
