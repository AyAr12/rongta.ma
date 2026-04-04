"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { type ApiCategory } from "@/lib/api";
import { useState, useMemo } from "react";

interface CategorySidebarProps {
  categories: ApiCategory[];
}

export default function CategorySidebar({ categories }: CategorySidebarProps) {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") || null;

  // Memoize parent categories to avoid re-renders
  const parents = useMemo(
    () => categories.filter((c) => !c.parentId),
    [categories],
  );

  // Compute initial expanded state — expand parent that contains activeSlug
  const initialExpanded = useMemo(() => {
    const map: Record<string, boolean> = {};
    if (!activeSlug) return map;
    for (const cat of parents) {
      if (
        cat.slug === activeSlug ||
        cat.children?.some((c) => c.slug === activeSlug)
      ) {
        map[cat.id] = true;
      }
    }
    return map;
  }, [activeSlug, parents]);

  const [expanded, setExpanded] =
    useState<Record<string, boolean>>(initialExpanded);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <nav className="flex flex-col">
      {parents.map((cat) => {
        const hasChildren = cat.children && cat.children.length > 0;
        const isOpen = expanded[cat.id] || false;

        // Parent is active if its slug matches OR one of its children matches
        const isParentActive =
          activeSlug === cat.slug ||
          cat.children?.some((c) => c.slug === activeSlug);

        return (
          <div
            key={cat.id}
            className={`border-b border-border/50 ${
              isParentActive
                ? "border-l-[3px] border-l-primary"
                : "border-l-[3px] border-l-transparent"
            }`}
          >
            {/* Parent row */}
            <div className="flex items-center">
              <Link
                href={`/products?category=${cat.slug}`}
                className={`flex-1 py-3 pl-4 pr-2 text-sm font-medium transition-colors ${
                  activeSlug === cat.slug
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {cat.name}
              </Link>

              {hasChildren && (
                <button
                  onClick={() => toggle(cat.id)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isOpen ? "Réduire" : "Développer"}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Children — collapsible */}
            {hasChildren && (
              <div
                className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-2 pl-8 pr-4 flex flex-col gap-0.5">
                  {cat.children.map((child) => (
                    <Link
                      key={child.id}
                      href={`/products?category=${child.slug}`}
                      className={`block rounded-md py-1.5 text-sm transition-colors ${
                        activeSlug === child.slug
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
