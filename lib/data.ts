import {
  Printer,
  Scale,
  Monitor,
  Cable,
  ShieldCheck,
  Headphones,
  Package,
  BadgeDollarSign,
  Store,
  UtensilsCrossed,
  Truck,
  HeartPulse,
  Star,
  Clock,
  MapPin,
  Users,
  ThumbsUp,
  Zap,
  type LucideIcon,
  RefreshCcw,
  Wrench,
  Award,
} from "lucide-react";
import { type Variants } from "framer-motion";

// ============================================================
// NAVIGATION
// ============================================================
export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Produits", href: "#produits" },
  { label: "Pourquoi Rongta", href: "#avantages" },
  { label: "Secteurs", href: "#secteurs" },
  // { label: "Témoignages", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ============================================================
// WHATSAPP
// ============================================================
export const whatsappConfig = {
  number: "212661251330",
  message:
    "Bonjour, je suis intéressé(e) par vos produits Rongta. Pouvez-vous me renseigner ?",
};

// ============================================================

// ============================================================
// FEATURED PRODUCT
// ============================================================
export interface FeaturedProduct {
  id: string;
  name: string;
  tagline: string;
  image: string;
  features: { label: string; value: string }[];
  ctaLabel: string;
}

export const featuredProduct: FeaturedProduct = {
  id: "rp335",
  name: "RP335",
  tagline:
    "L'imprimante thermique la plus fiable du marché marocain. Adoptée par plus de 500 commerces.",
  image: "/products/rp335-hero.png",
  features: [
    { label: "Vitesse", value: "250 mm/s" },
    { label: "Largeur", value: "80 mm" },
    { label: "Connectivité", value: "USB, WiFi, Bluetooth" },
    { label: "Découpe", value: "Auto-cutter intégré" },
    { label: "Durabilité", value: "150 km de papier" },
    { label: "Garantie", value: "Jusqu'à 4 ans (Extension)" },
    { label: "SAV", value: "Imprimante de prêt incluse" },
  ],
  ctaLabel: "Demander un devis",
};

// ============================================================
// HERO BENEFITS — Les 5 engagements, présentés en carousel rotatif
// ============================================================
export interface HeroBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}
 
export const heroBenefits: HeroBenefit[] = [
  {
    icon: Package,
    title: "Pièces disponibles 4 ans",
    description:
      "Garantie de disponibilité des pièces de rechange pendant 4 ans — un engagement unique au Maroc pour sécuriser votre parc installé.",
    accent: "Disponibilité longue durée",
  },
  {
    icon: ShieldCheck,
    title: "Extension de garantie 2 ou 3 ans",
    description:
      "Au-delà de la garantie standard, proposez à vos clients une extension jusqu'à 2 ou 3 ans pour valoriser votre offre.",
    accent: "Valorisez votre offre",
  },
  {
    icon: RefreshCcw,
    title: "Programme de reprise universel",
    description:
      "Échangez l'ancienne imprimante de votre client contre une Rongta neuve à prix imbattable — quelle que soit la marque d'origine.",
    accent: "Toutes marques acceptées",
  },
  {
    icon: Wrench,
    title: "Centre SAV dédié Rongta",
    description:
      "Notre centre de service après-vente est exclusivement dédié aux produits Rongta. Expertise garantie, interventions rapides.",
    accent: "Expertise certifiée",
  },
  {
    icon: Award,
    title: "Imprimante de prêt pendant réparation",
    description:
      "Votre client ne reste jamais bloqué : nous fournissons une imprimante de remplacement pendant toute la durée de la réparation.",
    accent: "Zéro interruption",
  },
];

// ============================================================
// WHY RONGTA — VALUE PROPOSITIONS
// ============================================================
export interface ValueProposition {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const valuePropositions = [
  {
    icon: ShieldCheck,
    title: "Garantie & pièces 4 ans",
    description:
      "Garantie standard, extension possible à 2 ou 3 ans, et disponibilité des pièces détachées garantie pendant 4 ans.",
  },
  {
    icon: Wrench,
    title: "Centre SAV dédié",
    description:
      "Un centre d'expertise exclusif Rongta au Maroc. Imprimante de prêt incluse pendant la réparation.",
  },
  {
    icon: RefreshCcw,
    title: "Programme de reprise",
    description:
      "Reprise de l'ancienne imprimante de votre client, toutes marques confondues, contre une Rongta neuve.",
  },
  {
    icon: Award,
    title: "Distributeur officiel",
    description:
      "Représentant officiel Rongta au Maroc : tarifs partenaires, stock permanent et expertise certifiée constructeur.",
  },
];

// ============================================================
// SECTORS
// ============================================================
export interface Sector {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  products: string[];
}

export const sectors: Sector[] = [
  {
    id: "retail",
    icon: Store,
    title: "Retail & Commerce",
    description:
      "Supermarchés, boutiques, magasins de vêtements. Solutions complètes de caisse et d'étiquetage.",
    products: ["RP820", "RLS-1000", "RT-500", "CD-410"],
  },
  {
    id: "restauration",
    icon: UtensilsCrossed,
    title: "Restauration",
    description:
      "Restaurants, cafés, fast-food. Impression rapide des tickets et gestion des commandes.",
    products: ["RP820", "RP326", "RT-500"],
  },
  {
    id: "logistique",
    icon: Truck,
    title: "Logistique & Industrie",
    description:
      "Entrepôts, usines, centres de tri. Étiquetage, suivi de colis et gestion de stock.",
    products: ["RP410", "BS-6600", "RT-300"],
  },
  {
    id: "sante",
    icon: HeartPulse,
    title: "Santé & Pharmacie",
    description:
      "Pharmacies, cliniques, laboratoires. Impression d'ordonnances et étiquetage de médicaments.",
    products: ["RP820", "RP410", "BS-6600"],
  },
];

// ============================================================
// TESTIMONIALS
// ============================================================
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Karim Bennani",
    role: "Directeur IT",
    company: "Marjane Holding",
    avatar: "/avatars/karim.jpg",
    rating: 5,
    quote:
      "Depuis que nous avons adopté les imprimantes Rongta, le taux de panne a chuté de 60%. Le SAV local fait toute la différence.",
  },
  {
    id: "t2",
    name: "Fatima Zahra El Idrissi",
    role: "Gérante",
    company: "Pâtisserie Amoud — Rabat",
    avatar: "/avatars/fatima.jpg",
    rating: 5,
    quote:
      "La RP820 est incroyablement rapide et fiable. En plein rush du weekend, elle ne nous a jamais lâchés.",
  },
  {
    id: "t3",
    name: "Youssef Alami",
    role: "Responsable Logistique",
    company: "TransMaghreb",
    avatar: "/avatars/youssef.jpg",
    rating: 4,
    quote:
      "Les étiqueteuses RP410 tournent 12h par jour dans nos entrepôts. Rapport qualité-prix imbattable.",
  },
  {
    id: "t4",
    name: "Salma Tazi",
    role: "Pharmacienne",
    company: "Pharmacie Ibn Sina — Fès",
    avatar: "/avatars/salma.jpg",
    rating: 5,
    quote:
      "La garantie 2 ans et le stock permanent à Casa nous ont convaincus. On ne commande plus à l'étranger.",
  },
];

// ============================================================
// KEY STATS
// ============================================================
export interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { icon: Users, value: 2000, suffix: "+", label: "Clients actifs" },
  { icon: MapPin, value: 15, suffix: "", label: "Villes couvertes" },
  { icon: Clock, value: 24, suffix: "h", label: "Délai SAV" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Satisfaction client" },
];

// ============================================================
// FAQ
// ============================================================
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems = [
  {
    question: "Êtes-vous le distributeur officiel de Rongta au Maroc ?",
    answer:
      "Oui, rongta.ma est le distributeur officiel et agréé de la marque Rongta pour l'ensemble du territoire marocain. Tous nos produits sont importés directement de l'usine avec certification d'origine.",
  },
  {
    question: "Comment devenir revendeur Rongta ?",
    answer:
      "Remplissez le formulaire « Devenir revendeur » disponible sur notre site. Notre équipe commerciale vous contactera sous 24h pour discuter des conditions, marges et modalités de partenariat.",
  },
  {
    question: "Quels sont les avantages pour les revendeurs ?",
    answer:
      "Tarifs partenaires dégressifs selon le volume, stock permanent à Casablanca, support technique prioritaire, centre SAV dédié avec imprimante de prêt, formation produit, et co-marketing sur demande.",
  },
  {
    question: "Comment fonctionne le programme de reprise ?",
    answer:
      "Nous reprenons l'ancienne imprimante de votre client, quelle que soit sa marque ou son état, et lui faisons bénéficier d'une remise exceptionnelle sur l'achat d'une Rongta neuve.",
  },
  {
    question:
      "Quelle est la durée de la garantie et des pièces de rechange ?",
    answer:
      "Garantie standard avec possibilité d'extension à 2 ou 3 ans. En tant que distributeur officiel, nous garantissons également la disponibilité des pièces de rechange pendant 4 ans minimum.",
  },
  {
    question: "Que se passe-t-il en cas de panne chez mon client ?",
    answer:
      "Nous disposons d'un centre SAV exclusivement dédié aux produits Rongta. Pour ne pas bloquer l'activité de votre client, nous fournissons une imprimante de rechange pendant toute la durée de la réparation.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Livraison sous 24h à Casablanca et les grandes villes (Rabat, Marrakech, Tanger, Fès). 48-72h pour le reste du Maroc. Stock permanent dans notre entrepôt de Casablanca.",
  },
  {
    question:
      "Les imprimantes sont-elles compatibles avec les logiciels de caisse ?",
    answer:
      "Les imprimantes Rongta sont compatibles avec tous les logiciels de caisse majeurs (ESC/POS standard) : Cegid, Odoo, Soft Restaurant, WinRest, et bien d'autres. Notre équipe technique assiste vos installations.",
  },
];

// ============================================================
// PARTNER LOGOS
// ============================================================
export interface Partner {
  name: string;
  logo: string;
}

export const partners: Partner[] = [
  { name: "Marjane", logo: "/partners/marjane.svg" },
  { name: "BIM", logo: "/partners/bim.svg" },
  { name: "Carrefour", logo: "/partners/carrefour.svg" },
  { name: "Paul", logo: "/partners/paul.svg" },
  { name: "Domino's Pizza", logo: "/partners/dominos.svg" },
  { name: "Electroplanet", logo: "/partners/electroplanet.svg" },
  { name: "Kitea", logo: "/partners/kitea.svg" },
];

// ============================================================
// HERO
// ============================================================
export const heroContent = {
  badge: "Distributeur officiel au Maroc",
  headline: "Nous sommes le distributeur officiel de la marque Rongta au Maroc",
  subheadline:
    "Revendeurs, intégrateurs et installateurs — accédez à la gamme complète Rongta avec garantie locale, pièces disponibles 4 ans et SAV dédié.",
  ctaPrimary: "Devenir revendeur",
  ctaSecondary: "Découvrir le catalogue",
  image: "/hero/printer-hero.jpg",
};

// ============================================================
// CTA BANNER — Reseller-focused
// ============================================================
export const ctaBanner = {
  headline: "Rejoignez notre réseau de revendeurs agréés",
  subheadline:
    "Distribuez les solutions POS Rongta au Maroc avec le soutien du distributeur officiel. Marges attractives, stock permanent, support dédié.",
  ctaLabel: "Devenir revendeur",
  phone: "+212 6 61 25 13 30",
};

// ============================================================
// FOOTER
// ============================================================
export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Produits",
    links: [
      {
        label: "Imprimantes tickets",
        href: "/products?category=receipt-printer",
      },
      {
        label: "Imprimantes étiquettes",
        href: "/products?category=label-printer",
      },
      {
        label: "Imprimantes portables",
        href: "/products?category=portable-printer",
      },
      {
        label: "Modules & Accessoires",
        href: "/products?category=panel-printer",
      },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Centre d'aide", href: "#" },
      { label: "Garantie", href: "#" },
      { label: "Téléchargements & Drivers", href: "#" },
      { label: "Demande SAV", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "#" },
      { label: "Devenir revendeur", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const footerContact = {
  phone: "+212 6 61 25 13 30",
  whatsapp: "+212 6 61 25 13 30",
  email: "contact@rongta.ma",
  address: "Bd Moulay Ismail, Casablanca, Maroc",
};

// ============================================================
// ANIMATION VARIANTS (Framer Motion)
// ============================================================
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
