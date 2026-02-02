"use client";

import { useState } from "react";
import { ChevronRight, Camera, MapPin, Calendar, Eye } from "lucide-react";
import { galleryImages } from "@/data/gallery-data";
import { GalleryGrid } from "@/components/features/gallery/gallery-grid";
import { GalleryLightbox } from "@/components/features/gallery/gallery-lightbox";
import { GalleryCategory } from "@/types/gallery.type";
import { Button } from "@/components/ui/button";

const categories: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "EVENTS", value: "event" },
  { label: "TRAINING", value: "training" },
  { label: "RACES", value: "race" },
  { label: "COMMUNITY", value: "community" },
  { label: "LOCATIONS", value: "location" },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    GalleryCategory | "all"
  >("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < filteredImages.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleClose = () => {
    setIsLightboxOpen(false);
  };

  const selectedImage =
    selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;
  const hasNext =
    selectedImageIndex !== null &&
    selectedImageIndex < filteredImages.length - 1;
  const hasPrevious = selectedImageIndex !== null && selectedImageIndex > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-zinc-800 bg-gradient-to-b from-white/10 to-transparent">
        <div className="mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-6">
            <span>HOME</span>
            <ChevronRight size={16} />
            <span className="text-white">GALLERY</span>
          </div>

          {/* Title */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-7xl font-bold italic">GALLERY</h1>
            </div>
            <p className="text-xl text-zinc-400 font-mono leading-relaxed">
              Capturing moments from our runs, races, and community gatherings.
              Every photo tells a story of dedication, passion, and the joy of
              running together.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="text-4xl font-bold mb-2">
                {galleryImages.length}
              </div>
              <div className="text-sm font-mono text-zinc-500">PHOTOS</div>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="text-4xl font-bold mb-2">
                {
                  new Set(
                    galleryImages.map((img) =>
                      new Date(img.date).getFullYear(),
                    ),
                  ).size
                }
              </div>
              <div className="text-sm font-mono text-zinc-500">YEARS</div>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="text-4xl font-bold mb-2">
                {new Set(galleryImages.map((img) => img.location)).size}
              </div>
              <div className="text-sm font-mono text-zinc-500">LOCATIONS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-zinc-800 bg-zinc-950/50 sticky top-0 z-20 backdrop-blur-sm">
        <div className="mx-auto px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2.5 rounded-lg font-bold font-mono text-sm transition-all whitespace-nowrap ${
                  selectedCategory === category.value
                    ? "bg-white text-zinc-950"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto px-8 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-zinc-500 font-mono text-sm">
            Showing {filteredImages.length} photo
            {filteredImages.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <Camera size={16} />
            <span className="font-mono">Click to view full size</span>
          </div>
        </div>

        <GalleryGrid images={filteredImages} onImageClick={handleImageClick} />
      </div>

      {/* CTA Section */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold italic mb-4">
              SHARE YOUR MOMENTS
            </h2>
            <p className="text-zinc-400 mb-8">
              Have photos from our runs or events? We'd love to feature them in
              our gallery. Send us your best shots and be part of our story.
            </p>
            <Button className="px-8 py-4 rounded-lg font-bold font-mono transition-all">
              SUBMIT PHOTOS
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        image={selectedImage}
        open={isLightboxOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
}
