import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* Conteneur de l'image d'erreur */}
      <div className="relative mb-2 h-48 w-48 sm:h-64 sm:w-64 drop-shadow-xl">
        <Image
          src="/error.webp"
          alt="Produit non trouvé - Image d'erreur"
          fill
          className="object-contain"
          priority // Priorité haute car c'est l'élément principal de la page
          sizes="(max-width: 768px) 192px, 256px"
        />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Produit non trouvé
      </h1>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Ce produit n&apos;existe pas ou a été retiré du catalogue.
      </p>

      <Button variant="outline" className="mt-8 gap-2" asChild>
        <Link href="/products">
          <ArrowLeft className="h-4 w-4" />
          Retour aux produits
        </Link>
      </Button>
    </div>
  );
}
