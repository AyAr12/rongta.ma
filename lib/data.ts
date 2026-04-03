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
  { label: "Témoignages", href: "#temoignages" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ============================================================
// PRODUCT CATEGORIES & PRODUCTS
// ============================================================
export type ProductCategory =
  | "imprimantes"
  | "balances"
  | "terminaux"
  | "accessoires";

export interface ProductCategoryTab {
  id: ProductCategory;
  label: string;
  icon: LucideIcon;
}

export const productCategories: ProductCategoryTab[] = [
  { id: "imprimantes", label: "Imprimantes thermiques", icon: Printer },
  { id: "balances", label: "Balances commerciales", icon: Scale },
  { id: "terminaux", label: "Terminaux POS", icon: Monitor },
  { id: "accessoires", label: "Accessoires", icon: Cable },
];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  image: string;
  specs: string[];
  badge?: string;
  description: string;
}

export const products: Product[] = [
  // — Imprimantes —
  {
    id: "rp820",
    name: "RP820",
    category: "imprimantes",
    image: "/products/rp820.png",
    specs: ["80mm", "250 mm/s", "USB + WiFi", "Auto-cutter"],
    badge: "Best-seller",
    description:
      "Imprimante thermique haute vitesse pour tickets de caisse, adaptée à la restauration et au retail.",
  },
  {
    id: "rp410",
    name: "RP410",
    category: "imprimantes",
    image: "/products/rp410.png",
    specs: ["110mm", "203 dpi", "USB + Ethernet", "Étiquettes"],
    description:
      "Imprimante d'étiquettes professionnelle pour la logistique et la gestion de stock.",
  },
  {
    id: "rp58",
    name: "RP58",
    category: "imprimantes",
    image: "/products/rp58.png",
    specs: ["58mm", "90 mm/s", "USB + Bluetooth", "Compact"],
    badge: "Compact",
    description:
      "Imprimante portable compacte pour les petits commerces et la vente ambulante.",
  },
  {
    id: "rp326",
    name: "RP326",
    category: "imprimantes",
    image: "/products/rp326.png",
    specs: ["80mm", "326 mm/s", "USB + Série + LAN", "Auto-cutter"],
    badge: "Ultra-rapide",
    description:
      "La plus rapide de sa catégorie. Idéale pour les environnements à fort volume de transactions.",
  },
  // — Balances —
  {
    id: "rls1000",
    name: "RLS-1000",
    category: "balances",
    image: "/products/rls1000.png",
    specs: ["30 kg", "Écran LCD", "Impression intégrée", "PLU 10 000"],
    badge: "Populaire",
    description:
      "Balance étiqueteuse avec impression intégrée pour boucheries, fromageries et épiceries.",
  },
  {
    id: "rls1100",
    name: "RLS-1100",
    category: "balances",
    image: "/products/rls1100.png",
    specs: ["15 kg", 'Tactile 10"', "WiFi", "Double écran"],
    description:
      "Balance tactile nouvelle génération avec double écran client/vendeur.",
  },
  // — Terminaux —
  {
    id: "rt500",
    name: "RT-500",
    category: "terminaux",
    image: "/products/rt500.png",
    specs: ['15.6" tactile', "Intel i3", "128 Go SSD", "Windows POS"],
    badge: "Pro",
    description:
      "Terminal de caisse tout-en-un avec écran tactile HD pour la restauration et le retail.",
  },
  {
    id: "rt300",
    name: "RT-300",
    category: "terminaux",
    image: "/products/rt300.png",
    specs: ['10.1" tactile', "Android 12", "WiFi + 4G", "Batterie"],
    description:
      "Terminal mobile Android pour la livraison et les points de vente éphémères.",
  },
  // — Accessoires —
  {
    id: "cd410",
    name: "CD-410",
    category: "accessoires",
    image: "/products/cd410.png",
    specs: ["Tiroir-caisse", "4 billets / 8 pièces", "RJ11", "Métal"],
    description:
      "Tiroir-caisse métallique résistant avec ouverture automatique.",
  },
  {
    id: "scanner-bs6600",
    name: "BS-6600",
    category: "accessoires",
    image: "/products/bs6600.png",
    specs: ["Scanner 2D", "USB + Sans fil", "CMOS", "IP54"],
    description:
      "Scanner de codes-barres 2D sans fil pour une lecture rapide et précise.",
  },
];

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
  id: "rp820",
  name: "RP820",
  tagline:
    "L'imprimante thermique la plus fiable du marché marocain. Adoptée par plus de 500 commerces.",
  image: "/products/rp820-hero.png",
  features: [
    { label: "Vitesse", value: "250 mm/s" },
    { label: "Largeur", value: "80 mm" },
    { label: "Connectivité", value: "USB, WiFi, Bluetooth" },
    { label: "Découpe", value: "Auto-cutter intégré" },
    { label: "Durabilité", value: "150 km de papier" },
    { label: "Garantie", value: "2 ans Maroc" },
  ],
  ctaLabel: "Demander un devis",
};

// ============================================================
// WHY RONGTA — VALUE PROPOSITIONS
// ============================================================
export interface ValueProposition {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const valuePropositions: ValueProposition[] = [
  {
    icon: ShieldCheck,
    title: "Garantie 2 ans",
    description:
      "Tous nos produits sont couverts par une garantie locale de 2 ans avec prise en charge directe au Maroc.",
  },
  {
    icon: Headphones,
    title: "SAV réactif",
    description:
      "Une équipe technique dédiée, joignable 6j/7, avec intervention sous 24h dans les grandes villes.",
  },
  {
    icon: Package,
    title: "Stock permanent",
    description:
      "Un entrepôt à Casablanca avec stock permanent. Livraison 24-48h partout au Maroc.",
  },
  {
    icon: BadgeDollarSign,
    title: "Prix distributeur",
    description:
      "En tant que distributeur exclusif, nous proposons les meilleurs tarifs du marché avec des remises volume.",
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

export const faqItems: FaqItem[] = [
  {
    question: "Êtes-vous le distributeur officiel de Rongta au Maroc ?",
    answer:
      "Oui, rongta.ma est le distributeur exclusif et agréé de la marque Rongta pour l'ensemble du territoire marocain. Tous nos produits sont importés directement de l'usine avec certification d'origine.",
  },
  {
    question: "Quelle est la durée de la garantie ?",
    answer:
      "Tous nos produits bénéficient d'une garantie de 2 ans couvrant les défauts de fabrication. La prise en charge se fait directement à notre atelier à Casablanca, sans besoin d'envoyer le matériel à l'étranger.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Livraison sous 24h à Casablanca et les grandes villes (Rabat, Marrakech, Tanger, Fès). 48-72h pour le reste du Maroc. Tous les produits affichés sont en stock permanent dans notre entrepôt.",
  },
  {
    question: "Proposez-vous des tarifs pour les professionnels ?",
    answer:
      "Absolument. Nous proposons des remises volume pour les revendeurs, intégrateurs et grandes surfaces. Contactez notre équipe commerciale pour un devis personnalisé.",
  },
  {
    question:
      "Les imprimantes sont-elles compatibles avec mon logiciel de caisse ?",
    answer:
      "Les imprimantes Rongta sont compatibles avec tous les logiciels de caisse majeurs (ESC/POS standard) : Cegid, Odoo, Soft Restaurant, WinRest, et bien d'autres. Notre équipe technique peut vous assister pour l'installation.",
  },
  {
    question: "Comment fonctionne le SAV ?",
    answer:
      "Contactez-nous par téléphone ou WhatsApp. Pour les pannes simples, notre support résout le problème à distance. Pour les interventions physiques, un technicien se déplace sous 24h dans les grandes villes, ou nous prenons en charge l'envoi/retour du matériel.",
  },
  {
    question: "Proposez-vous la formation à l'installation ?",
    answer:
      "Oui, chaque achat inclut une assistance à l'installation gratuite (en personne à Casablanca, ou à distance pour les autres villes). Nous fournissons également des guides d'installation détaillés.",
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
  { name: "Acima", logo: "/partners/acima.svg" },
  { name: "Virgin Megastore", logo: "/partners/virgin.svg" },
  { name: "Paul", logo: "/partners/paul.svg" },
  { name: "Domino's Pizza", logo: "/partners/dominos.svg" },
  { name: "Pharmacie Ibn Sina", logo: "/partners/ibnsina.svg" },
  { name: "TransMaghreb", logo: "/partners/transmaghreb.svg" },
  { name: "Kitea", logo: "/partners/kitea.svg" },
];

// ============================================================
// HERO
// ============================================================
export const heroContent = {
  headline: "Équipez votre commerce avec la technologie POS de référence",
  subheadline:
    "Distributeur exclusif Rongta au Maroc — Imprimantes thermiques, balances et terminaux POS avec garantie et SAV local.",
  ctaPrimary: "Demander un devis",
  ctaSecondary: "Découvrir nos produits",
  image: "/hero/printer-hero.jpg",
};

// ============================================================
// CTA BANNER
// ============================================================
export const ctaBanner = {
  headline: "Prêt à moderniser votre point de vente ?",
  subheadline:
    "Contactez-nous pour un devis gratuit et personnalisé. Livraison sous 24-48h partout au Maroc.",
  ctaLabel: "Obtenir mon devis gratuit",
  phone: "+212 5 22 00 00 00",
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
      { label: "Imprimantes thermiques", href: "#" },
      { label: "Balances commerciales", href: "#" },
      { label: "Terminaux POS", href: "#" },
      { label: "Accessoires", href: "#" },
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
  phone: "+212 5 22 00 00 00",
  whatsapp: "+212 6 00 00 00 00",
  email: "contact@rongta.ma",
  address: "Bd Moulay Ismail, Casablanca, Maroc",
};

// ============================================================
// ANIMATION VARIANTS (Framer Motion)
// ============================================================
// Ajout de ': Variants' pour que TypeScript valide correctement la propriété 'ease'
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
