"use client";

import { Button } from "@/components/ui/button";
import { products } from "@/data/product-data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ShopSection = () => {
  return (
    <div className="py-20 lg:py-40 px-4 sm:px-8 lg:px-20 xl:px-40 bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold italic"
        >
          SHOP.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/store"
            className="text-left sm:text-right text-xs uppercase font-mono border-b border-white hover:text-zinc-400 hover:border-zinc-400 hover:scale-105 transition-all duration-300 inline-block"
          >
            LIHAT SEMUA PRODUK →
          </Link>
        </motion.div>
      </motion.div>

      <div className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {products.slice(0, 3).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="w-full p-4 sm:p-6 lg:p-8 border border-zinc-800 group"
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={item.variants[0].images[0]}
                  alt={item.name}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  width={600}
                  height={600}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
              viewport={{ once: true }}
              className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 mt-4 sm:mt-6"
            >
              <div className="flex-1">
                <h1 className="text-base sm:text-lg font-bold italic">
                  {item.name}
                </h1>
                <p className="text-xs font-mono text-zinc-500 mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
              <Button
                className="font-mono font-bold rounded-none text-xs px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-auto hover:bg-zinc-200 transition-colors"
                asChild
              >
                <Link href={`/store/product/${item.id}`}>LIHAT DETAIL</Link>
              </Button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Extra CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 lg:mt-20 text-center border-t border-zinc-800 pt-16 lg:pt-20"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono mb-4"
        >
          GEAR UP FOR THE STREETS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-zinc-400 font-mono text-xs sm:text-sm mb-8"
        >
          Performance meets culture. Shop the latest drop.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button
            className="px-6 sm:px-8 py-4 sm:py-6 font-mono font-bold text-sm hover:bg-zinc-200 transition-colors"
            asChild
          >
            <Link href="/store">EXPLORE COLLECTION</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShopSection;
