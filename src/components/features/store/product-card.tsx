"use client";

import { Product } from "@/data/product-data";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const allSizes = Array.from(
    new Set(product.variants.flatMap((v) => v.sizes.map((s) => s.size))),
  ).sort();

  const colors = product.variants.map((v) => v.color);

  const defaultImage =
    product.variants[0]?.images[0] || "/images/products/placeholder.png";

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  return (
    <div className="bg-background border border-zinc-800 p-6 group hover:border-blue-600/50 transition-all relative">
      <Link href={`/store/product/${product.id}`}>
        <div className="relative w-full h-75 rounded-lg overflow-hidden mb-4 cursor-pointer">
          <Image
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={defaultImage}
            width={300}
            height={300}
            alt={product.name}
          />
        </div>
      </Link>

      <div className="flex justify-between gap-4">
        <Link href={`/store/product/${product.id}`} className="grow">
          <div className="text-lg font-bold hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </div>
        </Link>
        <Heart
          size={30}
          onClick={handleWishlistClick}
          className={`cursor-pointer hover:scale-110 transition-all flex-shrink-0 ${
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "hover:fill-red-500 hover:text-red-500"
          }`}
        />
      </div>

      <div className="flex justify-between items-center gap-4 mt-2">
        <div className="grow text-lg text-zinc-400">
          Rp. {product.price.toLocaleString("id-ID")}
        </div>
        <div className="text-nowrap font-mono text-xs text-zinc-500">
          {allSizes.join(" / ")}
        </div>
      </div>

      <p className="font-mono text-xs text-zinc-500 mt-2">
        TECH: {product.tech}
      </p>

      {colors.length > 1 && (
        <div className="flex items-center gap-2 mt-3">
          {colors.map((color) => (
            <div
              key={color.id}
              className="w-6 h-6 rounded-full border-2 border-zinc-700 cursor-pointer hover:border-white transition-all"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
