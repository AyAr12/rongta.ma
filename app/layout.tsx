import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rongta Maroc — Distributeur Officiel Matériel POS",
    template: "%s | Rongta Maroc",
  },
  description:
    "Distributeur exclusif Rongta au Maroc. Imprimantes thermiques, balances commerciales, terminaux POS. SAV & garantie locale.",
  keywords: [
    "Rongta Maroc",
    "imprimante thermique Maroc",
    "matériel POS Maroc",
    "imprimante ticket de caisse",
    "balance commerciale Maroc",
    "terminal de paiement",
    "rongta.ma",
  ],
  authors: [{ name: "Rongta Maroc" }],
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: "https://rongta.ma",
    siteName: "Rongta Maroc",
    title: "Rongta Maroc — Distributeur Officiel Matériel POS",
    description:
      "Distributeur exclusif Rongta au Maroc. Imprimantes thermiques, balances, terminaux POS avec SAV & garantie locale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}