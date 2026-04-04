import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories, type ApiCategory } from "@/lib/api";
import ProductCatalogGrid from "./ProductCatalogGrid";

export default async function ProductCatalog() {
  let categories: ApiCategory[] = [];

  try {
    const res = await getCategories();
    // Only parent categories with products, first 4
    categories = res.data
      .filter((c) => !c.parentId)
      .slice(0, 4);
  } catch {
    // API unavailable
  }

  return (
    <section id="produits" className="bg-secondary/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Notre catalogue
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Matériel POS professionnel
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Une gamme complète d&apos;équipements certifiés pour chaque besoin
            commercial — de l&apos;imprimante compacte au terminal tout-en-un.
          </p>
        </div>

        {/* Category showroom grid */}
        <ProductCatalogGrid categories={categories} />

        {/* See all link */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Voir tous les produits
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}