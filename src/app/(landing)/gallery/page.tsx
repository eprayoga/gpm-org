"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { galleryData } from "@/data/gallery-data";
import { GalleryCategory, GalleryImage } from "@/types/gallery.type";
import { motion } from "framer-motion";
import {
  Calendar,
  Camera,
  ChevronRight,
  MapPin,
  MoveDownRight,
  Search,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const BlurReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const categoryLabels: Record<GalleryCategory, string> = {
  event: "EVENTS",
  training: "TRAINING",
  race: "RACES",
  community: "COMMUNITY",
  location: "LOCATIONS",
};

const GalleryCard = ({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer overflow-hidden border border-zinc-800 group"
    >
      <div className="relative w-full aspect-auto">
        <Image
          src={image.url}
          alt={image.title}
          width={800}
          height={1200}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />

        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80 flex flex-col justify-end p-4 lg:p-6"
        >
          <div className="font-mono text-lg lg:text-xl font-bold uppercase tracking-wider mb-2">
            {image.title}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <Calendar size={14} />
            <span>{new Date(image.date).toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Category badge */}
        {/* <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="font-mono text-xs bg-black/80 border-zinc-700 text-white backdrop-blur-sm"
          >
            {categoryLabels[image.category]}
          </Badge>
        </div> */}
      </div>
    </motion.div>
  );
};

const GalleryModal = ({
  image,
  open,
  onClose,
}: {
  image: GalleryImage | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-black border border-zinc-800 p-0">
        <div className="grid grid-cols-1 gap-0">
          {/* Image - takes 3 columns */}
          <div className="lg:col-span-3 relative aspect-auto">
            <Image
              src={image.url}
              alt={image.title}
              width={1200}
              height={1600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details - takes 2 columns */}
          <div className="lg:col-span-2 p-6 lg:p-8 space-y-6 border-t lg:border-t-0 lg:border-l border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-2xl lg:text-3xl font-bold font-mono uppercase tracking-wider leading-tight">
                {image.title}
              </DialogTitle>
            </DialogHeader>

            {/* Category */}
            <div>
              <div className="text-xs text-zinc-500 font-mono uppercase mb-2 tracking-widest">
                Category
              </div>
              <Badge
                variant="outline"
                className="font-mono border-zinc-700 text-white"
              >
                {categoryLabels[image.category]}
              </Badge>
            </div>

            {/* Description */}
            {image.description && (
              <div className="border border-zinc-800 p-4">
                <div className="text-xs text-zinc-500 font-mono uppercase mb-3 tracking-widest">
                  Description
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  {image.description}
                </p>
              </div>
            )}

            {/* Location */}
            <div className="border border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-zinc-500" />
                <div>
                  <div className="text-xs text-zinc-500 font-mono uppercase mb-1">
                    Location
                  </div>
                  <div className="font-mono text-sm text-white">
                    {image.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="border border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-zinc-500" />
                <div>
                  <div className="text-xs text-zinc-500 font-mono uppercase mb-1">
                    Date
                  </div>
                  <div className="font-mono text-sm text-white">
                    {new Date(image.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Photographer */}
            {image.photographer && (
              <div className="border border-zinc-800 p-4">
                <div className="flex items-center gap-3">
                  <Camera size={18} className="text-zinc-500" />
                  <div>
                    <div className="text-xs text-zinc-500 font-mono uppercase mb-1">
                      Photographer
                    </div>
                    <div className="font-mono text-sm text-white">
                      {image.photographer}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {image.tags && image.tags.length > 0 && (
              <div className="border border-zinc-800 p-4">
                <div className="flex items-start gap-3">
                  <Tag size={18} className="text-zinc-500 mt-1" />
                  <div className="flex-1">
                    <div className="text-xs text-zinc-500 font-mono uppercase mb-3">
                      Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="font-mono text-xs border-zinc-800 text-zinc-300"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    GalleryCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories: Array<GalleryCategory | "all"> = [
    "all",
    "event",
    "training",
    "race",
    "community",
    "location",
  ];

  const filteredImages = galleryData.filter((image) => {
    const matchesCategory =
      selectedCategory === "all" || image.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black border-t border-zinc-800">
      <div className="mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <BlurReveal delay={0.1}>
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-8">
            <span className="hover:text-white transition-colors cursor-pointer">
              HOME
            </span>
            <ChevronRight size={16} />
            <span className="text-white">GALLERY</span>
          </div>
        </BlurReveal>

        {/* Hero Section */}
        <div className="border-y border-zinc-800 py-10 lg:py-20">
          <BlurReveal delay={0.2}>
            <div className="text-4xl lg:text-7xl xl:text-8xl font-bold leading-[1.1]">
              CAPTURED <br />
              <span
                className="inline-block"
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                MOMENTS
              </span>
              , <br />
              RUNNING THROUGH <br />
              THE STREETS.
            </div>
          </BlurReveal>
        </div>

        {/* Description Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start py-10 lg:py-20 gap-8">
          <BlurReveal delay={0.3}>
            <div className="font-mono text-base lg:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Every run tells a story. From early morning training sessions to
              race day triumphs, community gatherings to urban explorations—this
              is GPM in motion.
            </div>
          </BlurReveal>
          <BlurReveal delay={0.4}>
            <MoveDownRight size={48} className="text-zinc-700" />
          </BlurReveal>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-6 border-y border-zinc-800 py-6">
          {/* Search Bar */}
          <BlurReveal delay={0.5}>
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type="text"
                placeholder="SEARCH GALLERY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border border-zinc-800 px-12 py-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </BlurReveal>

          {/* Category Filters */}
          <BlurReveal delay={0.6}>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  {category === "all" ? "ALL" : categoryLabels[category]}
                </motion.button>
              ))}
            </div>
          </BlurReveal>

          {/* Results Count */}
          <BlurReveal delay={0.7}>
            <div className="font-mono text-sm text-zinc-500">
              [ SHOWING: {filteredImages.length.toString().padStart(2, "0")}{" "}
              IMAGES ]
            </div>
          </BlurReveal>
        </div>

        {/* Gallery Grid - Masonry-like Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
            <div key={image.id} className="break-inside-avoid">
              <GalleryCard
                image={image}
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-2xl font-mono font-bold text-zinc-700 mb-4">
              NO IMAGES FOUND
            </div>
            <p className="text-zinc-500 font-mono text-sm">
              Try adjusting your filters or search query
            </p>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-zinc-800 mt-20 py-20 text-center"
        >
          <div className="text-2xl lg:text-4xl font-bold font-mono mb-4">
            WANT TO CAPTURE YOUR MOMENT?
          </div>

          <p className="text-zinc-500 font-mono mb-8 text-sm lg:text-base">
            Join us on our next run and be part of the gallery.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-mono font-bold hover:bg-zinc-200 transition-all duration-300 border border-white"
          >
            JOIN THE CREW
          </motion.button>
        </motion.div>
      </div>

      {/* Gallery Detail Modal */}
      <GalleryModal
        image={selectedImage}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
