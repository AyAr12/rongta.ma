"use client";

import { useState } from "react";
import { submitResellerRequest } from "@/lib/api";
import {
  Building2,
  Phone,
  Mail,
  MessageSquare,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface ResellerFormProps {
  onSuccess?: () => void;
}

export default function ResellerForm({ onSuccess }: ResellerFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);

    const result = await submitResellerRequest({
      companyName: fd.get("companyName") as string,
      phone: fd.get("phone") as string,
      email: (fd.get("email") as string) || undefined,
      notes: (fd.get("notes") as string) || undefined,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      onSuccess?.();
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 mb-3">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="text-base font-semibold text-foreground">
          Demande envoyée !
        </h3>
        <p className="mt-1.5 text-xs text-muted-foreground max-w-sm">
          Merci pour votre intérêt. Notre équipe commerciale vous contactera
          dans les 24h.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Company name */}
      <div className="space-y-1">
        <label
          htmlFor="companyName"
          className="text-xs font-medium text-foreground"
        >
          Nom de la société *
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="companyName"
            name="companyName"
            required
            placeholder="ex: Tech Solutions SARL"
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <label htmlFor="phone" className="text-xs font-medium text-foreground">
          Téléphone *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="ex: 0661-234-567"
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Email (optional) */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-medium text-foreground">
          Email{" "}
          <span className="text-muted-foreground font-normal">(optionnel)</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="contact@societe.ma"
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Notes (optional) */}
      <div className="space-y-1">
        <label htmlFor="notes" className="text-xs font-medium text-foreground">
          Message{" "}
          <span className="text-muted-foreground font-normal">(optionnel)</span>
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Précisez votre besoin, volume estimé, zone géographique..."
            className="w-full rounded-lg border border-border bg-background pl-10 pr-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="h-10 w-full rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </button>

      <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
        En soumettant ce formulaire, vous acceptez d&apos;être contacté par
        notre équipe commerciale.
      </p>
    </form>
  );
}
