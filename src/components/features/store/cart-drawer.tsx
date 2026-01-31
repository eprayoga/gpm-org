"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { CartItemWithProduct } from "@/types/store.types";
import { products } from "@/data/product-data";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCartStore();

  const cartItemsWithProducts: CartItemWithProduct[] = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;

      const variant = product.variants[item.variantIndex];
      const size = variant.sizes.find((s) => s.size === item.size);

      return {
        ...item,
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: variant.images[0] || "/images/products/placeholder.png",
          colorName: variant.color.name,
          colorHex: variant.color.hex,
          tech: product.tech,
          stock: size?.stock || 0,
        },
      };
    })
    .filter(Boolean) as CartItemWithProduct[];

  const total = getCartTotal(products);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold font-mono">
              CART ({itemCount})
            </SheetTitle>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-xs font-mono text-zinc-500 hover:text-red-500"
              >
                CLEAR ALL
              </Button>
            )}
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <ShoppingBag size={64} className="text-zinc-700" />
            <p className="text-zinc-500 font-mono text-center">
              Your cart is empty
            </p>
            <Button onClick={onClose} variant="outline" className="font-mono">
              CONTINUE SHOPPING
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {cartItemsWithProducts.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantIndex}-${item.size}`}
                    className="flex gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-lg"
                  >
                    {/* Product Image */}
                    <Link
                      href={`/store/product/${item.productId}`}
                      onClick={onClose}
                      className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/store/product/${item.productId}`}
                          onClick={onClose}
                          className="font-bold text-sm hover:text-blue-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.variantIndex,
                              item.size,
                            )
                          }
                          className="text-zinc-500 hover:text-red-500 transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <div
                          className="w-4 h-4 rounded-full border border-zinc-600"
                          style={{ backgroundColor: item.product.colorHex }}
                        />
                        <span>{item.product.colorName}</span>
                        <span>•</span>
                        <span>Size: {item.size}</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-zinc-700 rounded overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantIndex,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="p-1.5 hover:bg-zinc-800 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1.5 text-sm font-bold border-x border-zinc-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantIndex,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="p-1.5 hover:bg-zinc-800 transition-colors"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold">
                            Rp{" "}
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString("id-ID")}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-zinc-500">
                              Rp {item.product.price.toLocaleString("id-ID")}{" "}
                              each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4 border-t border-zinc-800 space-y-4">
              {/* Subtotal */}
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span className="font-mono">SUBTOTAL</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span className="font-mono">SHIPPING</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="border-t border-zinc-800 pt-2 flex justify-between text-lg font-bold">
                  <span className="font-mono">TOTAL</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/store/checkout" onClick={onClose}>
                <Button
                  className="w-full py-6 text-lg font-bold font-mono"
                  size="lg"
                >
                  CHECKOUT
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full font-mono"
                onClick={onClose}
              >
                CONTINUE SHOPPING
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
