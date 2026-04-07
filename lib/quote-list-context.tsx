"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { type ApiProduct, getImageUrl } from "@/lib/api";

// ── Types ────────────────────────────────────────────────────

export interface QuoteItem {
  id: string;
  slug: string;
  modelCode: string;
  name: string;
  image: string;
  quantity: number;
}

interface QuoteState {
  items: QuoteItem[];
}

type QuoteAction =
  | { type: "ADD"; product: ApiProduct }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: QuoteItem[] };

// ── Reducer ──────────────────────────────────────────────────

function reducer(state: QuoteState, action: QuoteAction): QuoteState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };

    case "ADD": {
      const exists = state.items.find((i) => i.id === action.product.id);
      if (exists) {
        // Increment if already in list
        return {
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: action.product.id,
            slug: action.product.slug,
            modelCode: action.product.modelCode,
            name: action.product.name,
            image: action.product.images?.[0]
              ? getImageUrl(action.product.images[0])
              : "/placeholder-product.png",
            quantity: 1,
          },
        ],
      };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };

    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

// ── Helpers ──────────────────────────────────────────────────

const STORAGE_KEY = "rongta:quote-list";
const WHATSAPP_NUMBER = "212661251330";

function buildWhatsappUrl(items: QuoteItem[]): string {
  if (items.length === 0) {
    return `https://wa.me/${WHATSAPP_NUMBER}`;
  }

  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.name} (${item.modelCode}) — Qté: ${item.quantity}`
  );

  const message = `Bonjour, je souhaite recevoir un devis pour les produits suivants :

${lines.join("\n")}

Pouvez-vous me préparer une proposition ? Merci.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── Context ──────────────────────────────────────────────────

interface QuoteListContextValue {
  items: QuoteItem[];
  count: number;
  hasItem: (id: string) => boolean;
  addItem: (product: ApiProduct) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  whatsappUrl: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  justAdded: boolean;
}

const QuoteListContext = createContext<QuoteListContextValue | null>(null);

// ── Provider ─────────────────────────────────────────────────

export function QuoteListProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Hydrate from localStorage on mount — migrate legacy `cover` to `image`
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const rawItems = JSON.parse(raw);
        if (Array.isArray(rawItems)) {
          // Migrate: if item has `cover` but no `image`, rename it
          const migrated: QuoteItem[] = rawItems.map((item) => ({
            id: item.id,
            slug: item.slug,
            modelCode: item.modelCode,
            name: item.name,
            image:
              item.image ||
              item.cover ||
              "/placeholder-product.png",
            quantity: item.quantity || 1,
          }));
          dispatch({ type: "HYDRATE", items: migrated });
        }
      }
    } catch {
      // Invalid storage — ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage full or disabled — ignore
    }
  }, [state.items, hydrated]);

  // Trigger justAdded animation flag
  const triggerJustAdded = () => {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 700);
  };

  const value = useMemo<QuoteListContextValue>(
    () => ({
      items: state.items,
      count: state.items.reduce((sum, i) => sum + i.quantity, 0),
      hasItem: (id: string) => state.items.some((i) => i.id === id),
      addItem: (product: ApiProduct) => {
        dispatch({ type: "ADD", product });
        triggerJustAdded();
      },
      removeItem: (id: string) => dispatch({ type: "REMOVE", id }),
      updateQuantity: (id: string, quantity: number) =>
        dispatch({ type: "UPDATE_QTY", id, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
      whatsappUrl: buildWhatsappUrl(state.items),
      drawerOpen,
      setDrawerOpen,
      justAdded,
    }),
    [state.items, drawerOpen, justAdded]
  );

  return (
    <QuoteListContext.Provider value={value}>
      {children}
    </QuoteListContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────

export function useQuoteList(): QuoteListContextValue {
  const ctx = useContext(QuoteListContext);
  if (!ctx) {
    throw new Error("useQuoteList must be used inside QuoteListProvider");
  }
  return ctx;
}

/**
 * Builds a WhatsApp URL for a single product with a given quantity.
 * Used by the "Demander un devis direct" button on detail pages.
 */
export function buildSingleProductQuoteUrl(
  product: ApiProduct,
  quantity: number
): string {
  const message = `Bonjour, je souhaite recevoir un devis pour :

${product.name} (${product.modelCode}) — Qté: ${quantity}

Pouvez-vous me préparer une proposition ? Merci.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}