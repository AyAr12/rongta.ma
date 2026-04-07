"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Handshake,
  TrendingUp,
  Headphones,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ResellerForm from "./ResellerForm";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    title: "Marges attractives",
    description:
      "Tarifs distributeur dégressifs selon le volume. Maximisez votre rentabilité.",
  },
  {
    icon: Package,
    title: "Stock permanent",
    description:
      "Approvisionnement garanti depuis notre entrepôt à Casablanca, livraison 24-48h.",
  },
  {
    icon: Headphones,
    title: "Support dédié",
    description:
      "Un interlocuteur commercial unique et un support technique prioritaire.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie & SAV",
    description:
      "Bénéficiez de notre centre SAV agréé et du programme d'imprimante de prêt.",
  },
];

interface ResellerDialogProps {
  children: React.ReactNode;
}

export default function ResellerDialog({ children }: ResellerDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-4xl p-0 overflow-hidden gap-0 sm:rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          {/* ── Left column — Benefits ─────────────────────────── */}
          <div className="relative bg-gradient-to-br from-primary via-primary to-orange-600 p-8 md:p-10 text-primary-foreground overflow-hidden">
            {/* Decorative background pattern */}
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                Programme Partenaires
              </div>

              {/* Title */}
              <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                Rejoignez notre réseau de revendeurs
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90 md:text-base">
                Distribuez les solutions POS Rongta au Maroc et bénéficiez
                d&apos;un partenariat sur mesure avec le distributeur officiel.
              </p>

              {/* Benefits list */}
              <ul className="mt-7 space-y-4">
                {benefits.map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
                      <b.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold leading-snug">
                        {b.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-primary-foreground/80">
                        {b.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Trust line */}
              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
                  <Handshake className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold">
                    +50 partenaires au Maroc
                  </p>
                  <p className="text-[11px] text-primary-foreground/70">
                    Rejoignez un réseau de confiance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column — Form ────────────────────────────── */}
          <div className="bg-background p-6 md:p-8">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Démarrer le partenariat
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Remplissez ce formulaire, nous vous recontactons sous 24h.
            </p>
            <div className="mt-5">
              <ResellerForm />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
