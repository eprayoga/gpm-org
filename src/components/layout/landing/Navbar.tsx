"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CartDrawer } from "@/components/features/store/cart-drawer";
import { useCartStore } from "@/store/useCartStore";

const Navbar = () => {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <>
      <div className="relative flex justify-between items-center px-8 py-6 bg-transparent z-20">
        {/* LEFT MENU */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`cursor-pointer ${
              pathname === "/"
                ? "text-zinc-50"
                : "text-zinc-400 hover:text-zinc-50"
            }`}
          >
            Home
          </Link>

          <Link
            href="/team"
            className={`cursor-pointer ${
              isActive("/team")
                ? "text-zinc-50"
                : "text-zinc-400 hover:text-zinc-50"
            }`}
          >
            Team
          </Link>

          <Link
            href="/store"
            className={`cursor-pointer ${
              isActive("/store")
                ? "text-zinc-50"
                : "text-zinc-400 hover:text-zinc-50"
            }`}
          >
            Shop
          </Link>

          <Link
            href="/gallery"
            className={`cursor-pointer ${
              isActive("/gallery")
                ? "text-zinc-50"
                : "text-zinc-400 hover:text-zinc-50"
            }`}
          >
            Gallery
          </Link>
        </div>

        {/* LOGO CENTER */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/images/logos/GPM - Full - White.png"
            width={120}
            height={60}
            alt="LOGO"
            priority
          />
        </Link>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 text-zinc-400">
          <User className="cursor-pointer hover:text-zinc-50 transition" />

          <div className="relative">
            <ShoppingCart
              className="cursor-pointer hover:text-zinc-50 transition"
              onClick={() => setIsCartOpen(true)}
            />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-mono">
                {itemCount}
              </span>
            )}
          </div>

          <Link href="/store/wishlist">
            <Heart
              className={`w-5 h-5 transition ${
                pathname === "/store/wishlist"
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-zinc-400 hover:text-zinc-50"
              }`}
            />
          </Link>
        </div>
      </div>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
