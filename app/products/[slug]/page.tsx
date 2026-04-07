import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  Package,
  CheckCircle2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getProduct,
  getProducts,
  getImageUrl,
  renderFeatures,
} from "@/lib/api";
import type { Metadata } from "next";
import ProductImageGallery from "./ProductImageGallery";
import ProductCard from "@/components/ProductCard";
import React from "react";
import DirectQuoteCTA from "@/components/DirectQuoteCTA";

// ── Metadata ─────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProduct(slug);
  if (!result) return { title: "Produit non trouvé" };

  const product = result.data;
  return {
    title: product.name,
    description: `${product.name} — ${product.modelCode}. Distributeur officiel Rongta au Maroc.`,
    openGraph: {
      images: product.images?.[0]
        ? [{ url: getImageUrl(product.images[0]) }]
        : [],
    },
  };
}

// ── Page ─────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const result = await getProduct(slug);
  if (!result) notFound();

  const product = result.data;

  // const whatsappUrl = `https://wa.me/212661251330?text=${encodeURIComponent(
  //   `Bonjour, je suis intéressé(e) par le produit ${product.name} (${product.modelCode}). Pouvez-vous me donner plus d'informations ?`,
  // )}`;

  // Fetch related products from the same category
  let relatedProducts: (typeof product)[] = [];
  try {
    const relatedRes = await getProducts({
      category: product.category?.slug,
      limit: 4,
    });
    relatedProducts = relatedRes.data
      .filter((p) => p.id !== product.id)
      .slice(0, 3);
  } catch {
    // Silently fail
  }

  const specsEntries = product.specs ? Object.entries(product.specs) : [];
  const hasDownloads = product.downloads && product.downloads.length > 0;

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
          <Link
            href="/products"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Produits
          </Link>
          {product.category && (
            <>
              <span className="text-muted-foreground/30">/</span>
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span className="text-muted-foreground/30">/</span>
          <span className="font-medium text-foreground truncate">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* ── Hero: Gallery + Info with cover background ─────── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
          {/* Left — Image gallery (uses images[] only) */}
          <div className="w-full lg:w-1/2">
            <ProductImageGallery
              images={product.images || []}
              productName={product.name}
            />
          </div>

          {/* Right — Product info with coverImage as background */}
          <div className="relative w-full overflow-hidden rounded-xl lg:w-1/2 lg:rounded-l-none">
            {/* ── Cover image background ─────────────────────── */}
            {product.coverImage && (
              <div className="absolute inset-0 z-0">
                <Image
                  src={getImageUrl(product.coverImage)}
                  alt=""
                  fill
                  // On passe l'opacité à 40% (opacity-40) pour bien voir l'image
                  className="object-cover opacity-60"
                  sizes="50vw"
                  aria-hidden="true"
                />

                {/* On allège le gradient (50% au lieu de 95%) pour laisser respirer l'image */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-background/60 to-background/80" />
              </div>
            )}

            {/* ── Info content (on top of cover bg) ──────────── */}
            <div className="relative z-10 p-6 lg:p-8">
              {/* Category + availability */}
              <div className="flex items-center gap-2">
                {product.category && (
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-primary text-xs"
                  >
                    {product.category.name}
                  </Badge>
                )}
                {product.isAvailable ? (
                  <Badge className="bg-emerald-500/90 text-white text-xs hover:bg-emerald-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    En stock
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-xs">
                    <Package className="mr-1 h-3 w-3" />
                    Sur commande
                  </Badge>
                )}
              </div>

              {/* Name + model */}
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Réf: {product.modelCode}
              </p>

              {/* Quick specs */}
              {/* {specsEntries.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {specsEntries.slice(0, 6).map(([key, val]) => (
                    <div
                      key={key}
                      className="rounded-lg border border-border bg-background/60 backdrop-blur-sm px-3 py-2.5"
                    >
                      <p className="text-[11px] font-medium text-muted-foreground">
                        {key}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {String(val)}
                      </p>
                    </div>
                  ))}
                </div>
              )} */}

               {/* CTAs — Quantity picker + WhatsApp + Add to list */}
              <div className="mt-8">
                <DirectQuoteCTA product={product} />
              </div>

              {/* Trust line */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Garantie jusqu&apos;à 4 ans
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  SAV avec imprimante de prêt
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Livraison 24-48h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Features (HTML or plain text with \n) ──────────── */}
        {product.features && (
          <section className="mt-12 border-t border-border pt-10 lg:mt-16">
            {/* <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Caractéristiques
            </h2> */}
            <div
              className="prose prose-sm prose-slate mt-6 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-lg prose-h3:text-base prose-li:marker:text-primary"
              dangerouslySetInnerHTML={{
                __html: renderFeatures(product.features),
              }}
            />
          </section>
        )}

        {/* ── Full specs table ───────────────────────────────── */}
        {(() => {
          const specsRaw = product.specs as any;

          // Parse both formats
          const groups: {
            group: string;
            items: { key: string; value: string }[];
          }[] = Array.isArray(specsRaw)
            ? specsRaw
            : specsRaw &&
                typeof specsRaw === "object" &&
                Object.keys(specsRaw).length > 0
              ? [
                  {
                    group: "",
                    items: Object.entries(specsRaw).map(([key, value]) => ({
                      key,
                      value: String(value),
                    })),
                  },
                ]
              : [];

          const hasSpecs = groups.some((g) => g.items.length > 0);

          if (!hasSpecs) return null;

          return (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Spécifications techniques
              </h2>
              <div className="mt-6 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {groups.map((group, gi) => {
                      let rowIndex = 0;
                      return (
                        <React.Fragment key={gi}>
                          {group.group && (
                            <tr>
                              <td
                                colSpan={2}
                                className="bg-muted/50 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-y border-border"
                              >
                                {group.group}
                              </td>
                            </tr>
                          )}
                          {group.items.map((item, ii) => {
                            const isEven = rowIndex % 2 === 0;
                            rowIndex++;
                            return (
                              <tr
                                key={`${gi}-${ii}`}
                                className={
                                  isEven ? "bg-secondary/30" : "bg-background"
                                }
                              >
                                <td className="px-4 py-3 font-medium text-muted-foreground w-1/3 sm:w-1/4">
                                  {item.key}
                                </td>
                                <td className="px-4 py-3 text-foreground whitespace-pre-line">
                                  {item.value}
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })()}

        {/* ── Downloads ──────────────────────────────────────── */}
        {hasDownloads && (
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Téléchargements
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {product.downloads!.map((dl, i) => (
                <a
                  key={i}
                  href={getImageUrl(dl.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {dl.type === "driver" ? (
                      <Download className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {dl.title}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {dl.type}
                    </p>
                  </div>
                  <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* ── Related products ───────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 border-t border-border pt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Produits similaires
              </h2>
              <Link
                href={`/products?category=${product.category?.slug}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Voir tout
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux produits
          </Link>
        </div>
      </div>
    </div>
  );
}
