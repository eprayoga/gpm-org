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
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Product } from "@/data/product-data";
import { useWishlistStore } from "@/store/useWishlistStore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

    if (typeof toast !== "undefined") {
      toast.success("Added to cart!", {
        description: `${product.name} - ${selectedVariant.color.name} - ${selectedSize}`,
      });
    }

    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-y border-zinc-800 px-4 sm:px-6 lg:px-8 py-4 lg:py-6"
      >
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-zinc-500 font-mono flex-wrap">
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
          <ChevronRight size={16} className="hidden sm:block" />
          <span className="text-white hidden sm:block">{product.name}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Side - Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 sm:p-6 lg:p-8"
        >
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full aspect-square bg-zinc-900 rounded-lg overflow-hidden mb-4 border border-zinc-800 cursor-pointer"
            onClick={() => setIsImageModalOpen(true)}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </motion.div>

          {/* Thumbnail Images */}
          {selectedVariant.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-4 gap-2 sm:gap-4"
            >
              {selectedVariant.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Product Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4"
          >
            {[
              { icon: Truck, label: "FREE SHIPPING" },
              { icon: Shield, label: "AUTHENTIC" },
              { icon: RotateCcw, label: "30 DAY RETURN" },
            ].map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-zinc-900 border border-zinc-800 rounded-lg"
              >
                <feature.icon
                  className="text-blue-600"
                  size={window.innerWidth < 640 ? 24 : 32}
                />
                <span className="text-[10px] sm:text-xs font-mono text-zinc-400 text-center">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 sm:p-6 lg:p-8 flex flex-col"
        >
          {/* Product Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3 sm:space-y-4 pb-6 sm:pb-8 border-b border-zinc-800"
          >
            <Badge className="font-mono text-xs">{product.category}</Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold italic leading-tight">
              {product.name}
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              <span className="text-xs sm:text-sm text-zinc-500 font-mono">
                TECH: {product.tech}
              </span>
            </div>
          </motion.div>

          {/* Color Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="py-4 sm:py-6 border-b border-zinc-800"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-mono text-zinc-400">
                SELECT COLOR
              </span>
              <span className="text-xs sm:text-sm font-bold">
                {selectedVariant.color.name}
              </span>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {product.variants.map((variant, idx) => (
                <motion.div
                  key={variant.color.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVariantChange(idx)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg cursor-pointer border-2 transition-all relative ${
                    selectedVariantIndex === idx
                      ? "border-blue-600 scale-110"
                      : "border-zinc-700 hover:border-zinc-500"
                  }`}
                  style={{ backgroundColor: variant.color.hex }}
                  title={variant.color.name}
                >
                  {selectedVariantIndex === idx && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Check className="text-white drop-shadow-lg" size={20} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Size Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="py-4 sm:py-6 border-b border-zinc-800"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-mono text-zinc-400">
                SELECT SIZE
              </span>
              {selectedSize && (
                <span className="text-xs sm:text-sm text-zinc-500 font-mono">
                  Stock: {selectedSizeStock}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {selectedVariant.sizes.map((sizeOption, idx) => {
                const isSelected = selectedSize === sizeOption.size;
                const isOutOfStock = sizeOption.stock === 0;

                return (
                  <motion.button
                    key={sizeOption.size}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                    whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
                    whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                    onClick={() =>
                      !isOutOfStock && setSelectedSize(sizeOption.size)
                    }
                    disabled={isOutOfStock}
                    className={`py-3 sm:py-4 px-4 sm:px-6 rounded-lg border-2 font-bold text-sm sm:text-base lg:text-lg transition-all ${
                      isOutOfStock
                        ? "border-zinc-800 bg-zinc-900 text-zinc-700 cursor-not-allowed line-through"
                        : isSelected
                          ? "border-blue-600 bg-blue-600/20 text-blue-600"
                          : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900"
                    }`}
                  >
                    {sizeOption.size}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Quantity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="py-4 sm:py-6 border-b border-zinc-800"
          >
            <span className="text-xs sm:text-sm font-mono text-zinc-400 block mb-3 sm:mb-4">
              QUANTITY
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-zinc-700 rounded-lg overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 sm:p-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </motion.button>
                <span className="px-6 sm:px-8 py-3 sm:py-4 font-bold text-base sm:text-lg border-x-2 border-zinc-700">
                  {quantity}
                </span>
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 sm:p-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= selectedSizeStock || quantity >= 99}
                >
                  <Plus size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-6 sm:pt-8 flex gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              className="flex-1 py-5 sm:py-6 text-sm sm:text-base lg:text-lg font-bold font-mono"
              disabled={!canAddToCart}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              {alreadyInCart ? "ADD MORE" : "ADD TO CART"}
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="py-5 sm:py-6 px-5 sm:px-6"
                onClick={handleToggleWishlist}
              >
                <Heart
                  size={20}
                  className={`transition-all ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {!selectedSize && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs sm:text-sm text-amber-500 font-mono mt-3 sm:mt-4 text-center"
              >
                ⚠ Please select a size
              </motion.p>
            )}

            {alreadyInCart && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs sm:text-sm text-blue-500 font-mono mt-2 text-center"
              >
                ✓ This item is already in your cart
              </motion.p>
            )}
          </AnimatePresence>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 sm:mt-8 p-4 sm:p-6 bg-zinc-900 border border-zinc-800 rounded-lg space-y-3 sm:space-y-4"
          >
            <h3 className="font-bold text-base sm:text-lg font-mono">
              PRODUCT DETAILS
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-400">
              {[
                { label: "CATEGORY", value: product.category },
                { label: "SUBCATEGORY", value: product.subcategory },
                { label: "TECH SPECS", value: product.tech },
                { label: "PRODUCT ID", value: product.id },
              ].map((detail, idx) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="flex justify-between"
                >
                  <span className="font-mono">{detail.label}:</span>
                  <span className="font-bold text-white font-mono">
                    {detail.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Size Guide Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 sm:mt-6 text-center"
          >
            <button className="text-xs sm:text-sm font-mono text-blue-600 hover:text-blue-500 underline">
              VIEW SIZE GUIDE
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <Sheet open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <SheetContent
          side="bottom"
          className="h-[90vh] sm:h-[95vh] p-0 bg-black/95"
        >
          <SheetHeader className="p-4 sm:p-6 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-mono text-sm sm:text-base">
                {product.name}
              </SheetTitle>
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="hover:bg-zinc-800 p-2 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>
          </SheetHeader>
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
            <Image
              src={selectedImage}
              alt={product.name}
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
