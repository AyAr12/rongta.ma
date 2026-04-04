import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getProducts,
  getProductsForCategoryTree,
  getCategories,
} from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";
import ProductSearch from "@/components/ProductSearch";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Produits",
  description:
    "Découvrez toute la gamme de matériel POS Rongta : imprimantes thermiques, étiqueteuses, portables, modules et accessoires.",
};

interface Props {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const categorySlug = params.category || undefined;
  const searchQuery = params.q || undefined;
  const page = params.page ? parseInt(params.page, 10) : 1;

  // Fetch categories
  const categoriesRes = await getCategories();
  const categories = categoriesRes.data;

  // Fetch products — with search, category tree, or all
  let productsRes;
  if (searchQuery) {
    // Search overrides category filter
    productsRes = await getProducts({ q: searchQuery, page, limit: 20 });
  } else if (categorySlug) {
    productsRes = await getProductsForCategoryTree(
      categorySlug,
      categories,
      page,
      20,
    );
  } else {
    productsRes = await getProducts({ page, limit: 20 });
  }

  const { data: products, pagination } = productsRes;

  // Resolve active category name
  let activeCategoryName: string | null = null;
  if (categorySlug) {
    const parent = categories.find((c) => c.slug === categorySlug);
    if (parent) {
      activeCategoryName = parent.name;
    } else {
      for (const cat of categories) {
        const child = cat.children?.find((c) => c.slug === categorySlug);
        if (child) {
          activeCategoryName = child.name;
          break;
        }
      }
    }
  }

  // Build pagination URLs
  const buildPageUrl = (p: number) => {
    const sp = new URLSearchParams();
    if (categorySlug) sp.set("category", categorySlug);
    if (searchQuery) sp.set("q", searchQuery);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto flex h-12 max-w-7xl items-center gap-2 px-4 text-sm sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Accueil
          </Link>
          <span className="text-muted-foreground/30">/</span>
          {activeCategoryName ? (
            <>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Produits
              </Link>
              <span className="text-muted-foreground/30">/</span>
              <span className="font-medium text-foreground truncate">
                {activeCategoryName}
              </span>
            </>
          ) : searchQuery ? (
            <>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Produits
              </Link>
              <span className="text-muted-foreground/30">/</span>
              <span className="font-medium text-foreground truncate">
                Recherche : &ldquo;{searchQuery}&rdquo;
              </span>
            </>
          ) : (
            <span className="font-medium text-foreground">Produits</span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ── Sidebar ──────────────────────────────────────── */}
          <aside className="w-full shrink-0 lg:w-56 xl:w-60">
            {/* Search */}
            <div className="mb-6">
              <Suspense
                fallback={
                  <div className="h-10 animate-pulse rounded-lg bg-secondary" />
                }
              >
                <ProductSearch />
              </Suspense>
            </div>

            {/* Categories */}
            <Suspense
              fallback={
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded-lg bg-secondary"
                    />
                  ))}
                </div>
              }
            >
              <CategorySidebar categories={categories} />
            </Suspense>
          </aside>

          {/* ── Main content ─────────────────────────────────── */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {searchQuery
                    ? `Résultats pour "${searchQuery}"`
                    : activeCategoryName || "Tous nos produits"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pagination.total} produit
                  {pagination.total > 1 ? "s" : ""}
                  {activeCategoryName && !searchQuery
                    ? ` dans ${activeCategoryName}`
                    : ""}
                </p>
              </div>
            </div>

            {/* Product grid */}
            {products.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-16 flex flex-col items-center text-center">
                <div className="relative h-56 w-56 opacity-80 mix-blend-multiply sm:h-72 sm:w-72 dark:mix-blend-normal">
                  <Image
                    src="/error.webp"
                    alt="Aucun produit trouvé"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 224px, 288px"
                  />
                </div>

                <p className="text-base font-semibold text-foreground">
                  {searchQuery
                    ? "Aucun résultat pour cette recherche"
                    : "Aucun produit dans cette catégorie"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {searchQuery
                    ? "Essayez avec d'autres mots-clés."
                    : "Essayez une autre catégorie."}
                </p>
                <Link
                  href="/products"
                  className="mt-4 text-sm font-semibold text-primary hover:underline"
                >
                  Voir tous les produits
                </Link>
              </div>
            )}

            {/* ── Pagination ─────────────────────────────────── */}
            {pagination.totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-1">
                {/* Previous */}
                {page > 1 ? (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground/30">
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                )}

                {/* Page numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => {
                  const p = i + 1;

                  // Show: first, last, current, and neighbors
                  const isFirst = p === 1;
                  const isLast = p === pagination.totalPages;
                  const isCurrent = p === page;
                  const isNearCurrent = Math.abs(p - page) <= 1;

                  if (!isFirst && !isLast && !isCurrent && !isNearCurrent) {
                    // Show ellipsis only once between gaps
                    const prevShown =
                      i > 0 &&
                      (i === 1 ||
                        Math.abs(i - page) <= 2 ||
                        i + 1 === pagination.totalPages);
                    if (!prevShown && (p === page - 2 || p === page + 2)) {
                      return (
                        <span
                          key={p}
                          className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                        >
                          …
                        </span>
                      );
                    }
                    if (!isNearCurrent && !isFirst && !isLast) return null;
                  }

                  return (
                    <Link
                      key={p}
                      href={buildPageUrl(p)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        isCurrent
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}

                {/* Next */}
                {page < pagination.totalPages ? (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground/30">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
