import Link from "next/link";
import { Zap, Phone, Mail, MapPin } from "lucide-react";
import { footerColumns, footerContact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid gap-10 border-b border-background/10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:py-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-background">
                Rongta
                <span className="text-primary">.ma</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/60">
              Distributeur exclusif Rongta au Maroc. Matériel POS professionnel
              avec garantie et SAV local.
            </p>

            {/* Contact info */}
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-background/60">
              <a
                href={`tel:${footerContact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {footerContact.phone}
              </a>
              <a
                href={`mailto:${footerContact.email}`}
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {footerContact.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {footerContact.address}
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-background">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Rongta Maroc. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-background/40 hover:text-primary transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="#"
              className="text-xs text-background/40 hover:text-primary transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
