"use client";

import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { products } from "@/data/product-data";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const wishlistProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter(Boolean);

  const handleQuickAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Get first variant with available stock
    const firstAvailableVariant = product.variants.find((v) =>
      v.sizes.some((s) => s.stock > 0),
    );

    if (firstAvailableVariant) {
      const firstAvailableSize = firstAvailableVariant.sizes.find(
        (s) => s.stock > 0,
      );

      if (firstAvailableSize) {
        const variantIndex = product.variants.indexOf(firstAvailableVariant);
        addToCart({
          productId,
          variantIndex,
          size: firstAvailableSize.size,
          quantity: 1,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-zinc-800 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-bold italic mb-4">MY WISHLIST</h1>
              <p className="text-zinc-400 font-mono">
                {items.length} {items.length === 1 ? "ITEM" : "ITEMS"} SAVED
              </p>
            </div>
            {items.length > 0 && (
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="font-mono"
              >
                CLEAR ALL
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <Heart size={80} className="text-zinc-700" />
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-zinc-500 font-mono mb-6">
                Save items you love to buy them later
              </p>
              <Link href="/store">
                <Button className="font-mono">START SHOPPING</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => {
              if (!product) return null;

              const defaultVariant = product.variants[0];
              const defaultImage =
                defaultVariant?.images[0] || "/images/products/placeholder.png";

              // Check if product has any stock
              const hasStock = product.variants.some((v) =>
                v.sizes.some((s) => s.stock > 0),
              );

              return (
                <div
                  key={product.id}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group hover:border-blue-600/50 transition-all"
                >
                  {/* Image */}
                  <Link
                    href={`/store/product/${product.id}`}
                    className="relative block aspect-square overflow-hidden bg-zinc-800"
                  >
                    <Image
                      src={defaultImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-black/80 rounded-full hover:bg-red-500 transition-colors z-10"
                    >
                      <X size={18} />
                    </button>
                  </Link>

                  {/* Info */}
                  <div className="p-4">
                    <Link href={`/store/product/${product.id}`}>
                      <h3 className="font-bold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-zinc-400 text-sm mb-1">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-xs text-zinc-500 font-mono mb-4">
                      {product.tech}
                    </p>

                    {/* Colors */}
                    {product.variants.length > 1 && (
                      <div className="flex gap-2 mb-4">
                        {product.variants.slice(0, 4).map((variant) => (
                          <div
                            key={variant.color.id}
                            className="w-6 h-6 rounded-full border-2 border-zinc-700"
                            style={{ backgroundColor: variant.color.hex }}
                            title={variant.color.name}
                          />
                        ))}
                        {product.variants.length > 4 && (
                          <div className="w-6 h-6 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center text-xs">
                            +{product.variants.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/store/product/${product.id}`}
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full font-mono"
                        >
                          VIEW
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="font-mono"
                        disabled={!hasStock}
                        onClick={() => handleQuickAddToCart(product.id)}
                      >
                        <ShoppingCart size={16} />
                      </Button>
                    </div>

                    {!hasStock && (
                      <p className="text-xs text-red-500 font-mono mt-2 text-center">
                        OUT OF STOCK
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
