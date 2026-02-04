"use client";

import { galleryData } from "@/data/gallery-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get first 5 images for display
  const displayImages = galleryData.slice(0, 5);

  return (
    <div className="py-20 lg:py-40 px-4 sm:px-8 lg:px-20 xl:px-60">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-start sm:items-center"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic">
          GALLERY.
        </div>
        <hr className="w-full border-zinc-800" />
      </motion.div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-4 grid-rows-4 sm:grid-rows-2 gap-3 sm:gap-4 mt-10 lg:mt-20">
        {/* Large Image - Takes 2x2 on desktop, full width on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative col-span-2 row-span-2 overflow-hidden aspect-square border border-zinc-800"
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={displayImages[0]?.url || "/images/content/about-run.png"}
            alt={displayImages[0]?.title || "Gallery Image"}
            className="object-cover w-full h-full grayscale hover:scale-110 hover:grayscale-0 transition-all duration-500"
            width={800}
            height={800}
          />
        </motion.div>

        {/* Small Images */}
        {displayImages.slice(1, 4).map((image, i) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden border border-zinc-800"
            onMouseEnter={() => setHoveredIndex(i + 1)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              src={image.url}
              alt={image.title}
              className="object-cover w-full h-full grayscale hover:scale-110 hover:grayscale-0 transition-all duration-500"
              objectFit="cover"
              width={400}
              height={400}
            />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: (4 + 1) * 0.1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden border border-zinc-800 p-8"
          onMouseEnter={() => setHoveredIndex(4 + 1)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href="/gallery"
            className="h-full flex flex-col justify-between items-start font-mono text-sm transition-all duration-300 hover:scale-105 hover:text-zinc-500"
          >
            <ArrowRight size={40} />
            <div>VIEW ALL GALLERY</div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GallerySection;
