"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Product } from "@/data/product-data";
import { useWishlistStore } from "@/store/useWishlistStore";
import Link from "next/link";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Cart and Wishlist stores
  const { addToCart, isInCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const selectedVariant = product.variants[selectedVariantIndex];
  const selectedImage =
    selectedVariant.images[selectedImageIndex] ||
    "/images/products/placeholder.png";
  const isWishlisted = isInWishlist(product.id);

  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
    setSelectedImageIndex(0);
    setSelectedSize(null);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const selectedSizeStock = selectedSize
    ? selectedVariant.sizes.find((s) => s.size === selectedSize)?.stock || 0
    : 0;

  const canAddToCart = selectedSize && selectedSizeStock > 0;
  const alreadyInCart = selectedSize
    ? isInCart(product.id, selectedVariantIndex, selectedSize)
    : false;

  const handleAddToCart = () => {
    if (!canAddToCart || !selectedSize) return;

    addToCart({
      productId: product.id,
      variantIndex: selectedVariantIndex,
      size: selectedSize,
      quantity: quantity,
    });

    // Optional: Show toast notification
    if (typeof toast !== "undefined") {
      toast.success("Added to cart!", {
        description: `${product.name} - ${selectedVariant.color.name} - ${selectedSize}`,
      });
    }

    // Reset quantity after adding
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);

    // Optional: Show toast notification
    if (typeof toast !== "undefined") {
      if (isWishlisted) {
        toast.info("Removed from wishlist");
      } else {
        toast.success("Added to wishlist!");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-y border-zinc-800 px-8 py-6">
        <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
          <Link
            href={"/store"}
            className="cursor-pointer hover:text-white transition-colors"
          >
            STORE
          </Link>
          <ChevronRight size={16} />
          <Link
            href={`/store?category=${product.category.toLowerCase()}`}
            className="cursor-pointer hover:text-white transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0">
        {/* Left Side - Images */}
        <div className="border-r border-zinc-800 p-8">
          {/* Main Image */}
          <div className="w-full aspect-square bg-zinc-900 rounded-lg overflow-hidden mb-4 border border-zinc-800">
            <Image
              src={selectedImage}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {selectedVariant.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {selectedVariant.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-square bg-zinc-900 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImageIndex === idx
                      ? "border-blue-600"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Product Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <Truck className="text-blue-600" size={32} />
              <span className="text-xs font-mono text-zinc-400 text-center">
                FREE SHIPPING
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <Shield className="text-blue-600" size={32} />
              <span className="text-xs font-mono text-zinc-400 text-center">
                AUTHENTIC
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <RotateCcw className="text-blue-600" size={32} />
              <span className="text-xs font-mono text-zinc-400 text-center">
                30 DAY RETURN
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="p-8 flex flex-col">
          {/* Product Header */}
          <div className="space-y-4 pb-8 border-b border-zinc-800">
            <Badge className="font-mono">{product.category}</Badge>

            <h1 className="text-5xl font-bold italic leading-tight">
              {product.name}
            </h1>

            <p className="text-zinc-400 text-lg">{product.description}</p>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              <span className="text-sm text-zinc-500 font-mono">
                TECH: {product.tech}
              </span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="py-6 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono text-zinc-400">
                SELECT COLOR
              </span>
              <span className="text-sm font-bold">
                {selectedVariant.color.name}
              </span>
            </div>
            <div className="flex gap-3">
              {product.variants.map((variant, idx) => (
                <div
                  key={variant.color.id}
                  onClick={() => handleVariantChange(idx)}
                  className={`w-14 h-14 rounded-lg cursor-pointer border-2 transition-all relative ${
                    selectedVariantIndex === idx
                      ? "border-blue-600 scale-110"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                  style={{ backgroundColor: variant.color.hex }}
                  title={variant.color.name}
                >
                  {selectedVariantIndex === idx && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="text-white drop-shadow-lg" size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="py-6 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-mono text-zinc-400">
                SELECT SIZE
              </span>
              {selectedSize && (
                <span className="text-sm text-zinc-500 font-mono">
                  Stock: {selectedSizeStock}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {selectedVariant.sizes.map((sizeOption) => {
                const isSelected = selectedSize === sizeOption.size;
                const isOutOfStock = sizeOption.stock === 0;

                return (
                  <button
                    key={sizeOption.size}
                    onClick={() =>
                      !isOutOfStock && setSelectedSize(sizeOption.size)
                    }
                    disabled={isOutOfStock}
                    className={`py-4 px-6 rounded-lg border-2 font-bold text-lg transition-all ${
                      isOutOfStock
                        ? "border-zinc-800 bg-zinc-900 text-zinc-700 cursor-not-allowed line-through"
                        : isSelected
                          ? "border-blue-600 bg-blue-600/20 text-blue-600"
                          : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900"
                    }`}
                  >
                    {sizeOption.size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity */}
          <div className="py-6 border-b border-zinc-800">
            <span className="text-sm font-mono text-zinc-400 block mb-4">
              QUANTITY
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-zinc-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-4 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="px-8 py-4 font-bold text-lg border-x-2 border-zinc-700">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-4 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= selectedSizeStock || quantity >= 99}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 flex gap-4">
            <Button
              size="lg"
              className="flex-1 py-6 text-lg font-bold font-mono"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" />
              {alreadyInCart ? "ADD MORE" : "ADD TO CART"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="py-6 px-6"
              onClick={handleToggleWishlist}
            >
              <Heart
                size={24}
                className={`transition-all ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
          </div>

          {!selectedSize && (
            <p className="text-sm text-amber-500 font-mono mt-4 text-center">
              ⚠ Please select a size
            </p>
          )}

          {alreadyInCart && (
            <p className="text-sm text-blue-500 font-mono mt-2 text-center">
              ✓ This item is already in your cart
            </p>
          )}

          {/* Product Details */}
          <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg space-y-4">
            <h3 className="font-bold text-lg font-mono">PRODUCT DETAILS</h3>
            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex justify-between">
                <span className="font-mono">CATEGORY:</span>
                <span className="font-bold text-white">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">SUBCATEGORY:</span>
                <span className="font-bold text-white">
                  {product.subcategory}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">TECH SPECS:</span>
                <span className="font-bold text-white">{product.tech}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono">PRODUCT ID:</span>
                <span className="font-bold text-white font-mono">
                  {product.id}
                </span>
              </div>
            </div>
          </div>

          {/* Size Guide Link */}
          <div className="mt-6 text-center">
            <button className="text-sm font-mono text-blue-600 hover:text-blue-500 underline">
              VIEW SIZE GUIDE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
