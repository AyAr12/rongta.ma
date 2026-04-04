import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ApiProduct, getImageUrl } from "@/lib/api";

interface ProductCardProps {
  product: ApiProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-full max-w-[280px]"
    >
      <div className="space-y-5">
        <div className="relative aspect-square overflow-hidden rounded-[24px] border border-[#dedede] bg-[#f5f5f5]">
          {product.images?.[0] ? (
            <Image
              src={getImageUrl(product.images[0])}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-5xl opacity-10">📦</span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 scale-90 items-center justify-center rounded-full bg-[#ff6a00] text-white opacity-0 shadow-[0_0_0_6px_rgba(60,60,60,0.9)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <ArrowRight className="h-7 w-7" strokeWidth={2.2} />
            </div>
          </div>
        </div>

        <div className="px-3 text-center">
          <p className="text-[16px] font-normal leading-[1.5] text-[#707070]">
            {product.name}
          </p>
        </div>
      </div>
    </Link>
  );
}