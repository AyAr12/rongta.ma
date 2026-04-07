// ============================================================
// lib/api.ts — Fetch layer for admin.rongta.ma public API
// ============================================================

const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

// ── Types ────────────────────────────────────────────────────

export interface ApiProduct {
  id: string;
  modelCode: string;
  name: string;
  slug: string;
  features: string;
  coverImage: string | null;
  images: string[];
  specs: Record<string, string>;
  downloads: { title: string; url: string; type: string }[] | null;
  isAvailable: boolean;
  status: "published" | "draft";
  category: {
    name: string;
    slug: string;
  };
}

/**
 * Renders a features string as safe HTML.
 * If the content is plain text with \n, converts to <br> tags.
 * If already HTML (contains < tags), returns as-is.
 */
export function renderFeatures(raw: string): string {
  if (!raw) return "";
  // Already contains HTML tags — return as-is
  if (/<[a-z][\s\S]*>/i.test(raw)) return raw;
  // Plain text — convert \n to <br> and wrap paragraphs
  return raw
    .split(/\n\n+/)
    .map((paragraph) => {
      const lines = paragraph.split(/\n/).join("<br>");
      return `<p>${lines}</p>`;
    })
    .join("");
}

/**
 * Returns the best image for a product card:
 * coverImage first, then first image in gallery, then placeholder.
 */
export function getProductCover(product: ApiProduct): string {
  if (product.coverImage) return getImageUrl(product.coverImage);
  if (product.images?.[0]) return getImageUrl(product.images[0]);
  return "/placeholder-product.png";
}

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  parentId: string | null;
  parent: { id: string; name: string; slug: string } | null;
  children: { id: string; name: string; slug: string }[];
  _count: { products: number };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── Empty responses ──────────────────────────────────────────

const EMPTY_PRODUCTS: PaginatedResponse<ApiProduct> = {
  data: [],
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
};

const EMPTY_CATEGORIES: { data: ApiCategory[] } = { data: [] };

// ── Fetchers (safe — never throw) ────────────────────────────

export async function getProducts(params?: {
  category?: string;
  page?: number;
  limit?: number;
  available?: boolean;
  q?: string;
}): Promise<PaginatedResponse<ApiProduct>> {
  try {
    const sp = new URLSearchParams();
    if (params?.available !== false) sp.set("available", "true");
    if (params?.category) sp.set("category", params.category);
    if (params?.page) sp.set("page", String(params.page));
    if (params?.limit) sp.set("limit", String(params.limit));
    if (params?.q) sp.set("q", params.q);

    const res = await fetch(
      `${ADMIN_URL}/api/public/products?${sp.toString()}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      console.warn(`[api] getProducts failed: ${res.status}`);
      return EMPTY_PRODUCTS;
    }

    return await res.json();
  } catch (err) {
    console.warn("[api] getProducts error:", err);
    return EMPTY_PRODUCTS;
  }
}

/**
 * Fetch products for a category AND all its children.
 * If the selected slug is a parent category, we fetch for each
 * child slug too and merge the results.
 */
export async function getProductsForCategoryTree(
  slug: string,
  categories: ApiCategory[],
  page?: number,
  limit?: number,
): Promise<PaginatedResponse<ApiProduct>> {
  // Find the category — could be a parent or a child
  const parent = categories.find((c) => c.slug === slug);

  if (parent && parent.children.length > 0) {
    // It's a parent category — fetch for the parent slug AND each child slug
    const allSlugs = [slug, ...parent.children.map((c) => c.slug)];
    const fetches = allSlugs.map((s) =>
      getProducts({ category: s, page: 1, limit: limit || 100 }),
    );
    const results = await Promise.all(fetches);

    // Merge & deduplicate by id
    const seen = new Set<string>();
    const merged: ApiProduct[] = [];
    for (const res of results) {
      for (const product of res.data) {
        if (!seen.has(product.id)) {
          seen.add(product.id);
          merged.push(product);
        }
      }
    }

    // Apply pagination manually
    const start = ((page || 1) - 1) * (limit || 20);
    const end = start + (limit || 20);
    const paginated = merged.slice(start, end);

    return {
      data: paginated,
      pagination: {
        page: page || 1,
        limit: limit || 20,
        total: merged.length,
        totalPages: Math.ceil(merged.length / (limit || 20)),
      },
    };
  }

  // It's a child category or not found — just fetch normally
  return getProducts({ category: slug, page, limit });
}

export async function getProduct(
  slug: string,
): Promise<{ data: ApiProduct } | null> {
  try {
    const res = await fetch(`${ADMIN_URL}/api/public/products/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn(`[api] getProduct(${slug}) error:`, err);
    return null;
  }
}

export async function getCategories(): Promise<{ data: ApiCategory[] }> {
  try {
    const res = await fetch(`${ADMIN_URL}/api/public/categories`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[api] getCategories failed: ${res.status}`);
      return EMPTY_CATEGORIES;
    }

    return await res.json();
  } catch (err) {
    console.warn("[api] getCategories error:", err);
    return EMPTY_CATEGORIES;
  }
}

export async function submitResellerRequest(data: {
  companyName: string;
  phone: string;
  email?: string;
  notes?: string;
}): Promise<{ success?: boolean; error?: string }> {
  try {
    const res = await fetch(`${ADMIN_URL}/api/public/reseller`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return { error: "Erreur de connexion. Réessayez plus tard." };
  }
}

// ── Helpers ──────────────────────────────────────────────────

export function getImageUrl(path: string): string {
  if (!path) return "/placeholder-product.png";

  // Si c'est déjà une URL complète (ex: hébergée sur un cloud externe)
  if (path.startsWith("http")) return path;

  let cleanPath = path.trim();

  // On retire le slash initial s'il y en a un pour harmoniser
  cleanPath = cleanPath.replace(/^\/+/, "");

  // Sécurité : On s'assure que le chemin contient "uploads/" pour matcher le next.config.ts
  if (!cleanPath.startsWith("uploads/")) {
    cleanPath = `uploads/${cleanPath}`;
  }

  // On construit l'URL finale
  const baseUrl = ADMIN_URL.replace(/\/+$/, "");
  return `${baseUrl}/${cleanPath}`;
}

/**
 * Returns the admin base URL — useful for debugging.
 */
export function getAdminUrl(): string {
  return ADMIN_URL;
}
