"use client";

import { Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { CartDrawer } from "@/components/features/store/cart-drawer";
import { useCartStore } from "@/store/useCartStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCartStore();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => pathname.startsWith(path);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/team", label: "TEAM" },
    { href: "/store", label: "SHOP" },
    { href: "/gallery", label: "GALLERY" },
  ];

  return (
    <>
      <div className="relative flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-transparent z-20">
        {/* MOBILE MENU BUTTON */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="lg:hidden text-zinc-400 hover:text-zinc-50 transition"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </motion.button>

        {/* DESKTOP LEFT MENU */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex items-center gap-6 xl:gap-8"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={`cursor-pointer font-mono text-sm transition-colors ${
                  pathname === link.href || isActive(link.href)
                    ? "text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* LOGO CENTER */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/images/logos/GPM - Full - White.png"
              width={120}
              height={60}
              alt="LOGO"
              objectFit="w-full"
            />
          </motion.div>
        </Link>

        {/* RIGHT ICONS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 sm:gap-4 text-zinc-400"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <User
              className="cursor-pointer hover:text-zinc-50 transition w-5 h-5 sm:w-6 sm:h-6"
              size={20}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <ShoppingCart
              className="cursor-pointer hover:text-zinc-50 transition w-5 h-5 sm:w-6 sm:h-6"
              onClick={() => setIsCartOpen(true)}
              size={20}
            />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-mono font-bold"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <Link href="/store/wishlist">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Heart
                className={`w-5 h-5 sm:w-6 sm:h-6 transition ${
                  pathname === "/store/wishlist"
                    ? "text-red-500 fill-red-500 scale-110"
                    : "text-zinc-400 hover:text-zinc-50"
                }`}
              />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* MOBILE MENU */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <Image
                src="/images/logos/GPM - Full - White.png"
                width={100}
                height={50}
                alt="LOGO"
                className="w-24 h-12"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:bg-zinc-800 p-2 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center p-4 rounded-lg font-mono text-sm transition-all ${
                      pathname === link.href || isActive(link.href)
                        ? "bg-blue-600/20 border border-blue-600 text-blue-600"
                        : "hover:bg-white/5 border border-transparent text-zinc-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-6 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 font-mono text-center">
                © 2024 GROOVY PACE MILES
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
