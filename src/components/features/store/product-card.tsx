"use client";

import { Product } from "@/data/product-data";
import { useWishlistStore } from "@/store/useWishlistStore";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const allSizes = Array.from(
    new Set(product.variants.flatMap((v) => v.sizes.map((s) => s.size))),
  ).sort();

  const colors = product.variants.map((v) => v.color);

  const defaultImage =
    product.variants[0]?.images[0] || "/images/products/placeholder.png";

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-background border border-zinc-800 p-4 sm:p-6 group hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/10 transition-all relative"
    >
      <Link href={`/store/product/${product.id}`}>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 cursor-pointer bg-zinc-900">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={defaultImage}
              width={400}
              height={400}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>

          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
          )}

          {/* New badge */}
          {new Date(product.createdAt) >
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-mono font-bold"
            >
              NEW
            </motion.div>
          )}
        </div>
      </Link>

      <div className="flex justify-between gap-3 sm:gap-4">
        <Link href={`/store/product/${product.id}`} className="grow min-w-0">
          <motion.div
            whileHover={{ x: 2 }}
            className="text-base sm:text-lg font-bold hover:text-blue-600 transition-colors cursor-pointer truncate"
          >
            {product.name}
          </motion.div>
        </Link>

        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Heart
            size={24}
            onClick={handleWishlistClick}
            className={`cursor-pointer transition-all flex-shrink-0 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "hover:fill-red-500 hover:text-red-500"
            }`}
          />
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-400 font-semibold"
        >
          Rp. {product.price.toLocaleString("id-ID")}
        </motion.div>
        <div className="font-mono text-xs text-zinc-500">
          {allSizes.join(" / ")}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-mono text-xs text-zinc-500 mt-2"
      >
        TECH: {product.tech}
      </motion.p>

      {colors.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mt-3"
        >
          {colors.map((color, index) => (
            <motion.div
              key={color.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-zinc-700 cursor-pointer hover:border-white transition-all"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
