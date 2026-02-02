"use client";

import Image from "next/image";
import { MapPin, Calendar, Eye } from "lucide-react";
import { GalleryImage } from "@/types/gallery.type";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image, index) => (
        <GalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
}

interface GalleryItemProps {
  image: GalleryImage;
  onClick: () => void;
}

function GalleryItem({ image, onClick }: GalleryItemProps) {
  // Calculate aspect ratio class based on image dimensions
  const getAspectClass = () => {
    const ratio = image.width / image.height;

    if (ratio > 1.5) return "aspect-[16/9]"; // Wide landscape
    if (ratio > 1.2) return "aspect-[4/3]"; // Landscape
    if (ratio > 0.9) return "aspect-square"; // Square-ish
    if (ratio > 0.7) return "aspect-[3/4]"; // Portrait
    return "aspect-[9/16]"; // Tall portrait
  };

  const getCategoryColor = () => {
    switch (image.category) {
      case "event":
        return "bg-purple-600/20 border-purple-600 text-purple-600";
      case "training":
        return "bg-green-600/20 border-green-600 text-green-600";
      case "race":
        return "bg-red-600/20 border-red-600 text-red-600";
      case "community":
        return "bg-yellow-600/20 border-yellow-600 text-yellow-600";
      case "location":
        return "bg-blue-600/20 border-blue-600 text-blue-600";
      default:
        return "bg-zinc-600/20 border-zinc-600 text-zinc-600";
    }
  };

  return (
    <div
      onClick={onClick}
      className="break-inside-avoid group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-white/50 transition-all duration-300"
    >
      {/* Image Container */}
      <div
        className={`relative ${getAspectClass()} overflow-hidden bg-zinc-800`}
      >
        <Image
          src={image.url}
          alt={image.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Eye className="fill-zinc-950" size={24} />
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <div
            className={`px-3 py-1 rounded-full border text-xs font-bold font-mono ${getCategoryColor()}`}
          >
            {image.category.toUpperCase()}
          </div>
        </div>

        {/* Views Counter */}
        {image.views && (
          <div className="absolute top-3 right-3 bg-black/80 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Eye size={12} className="text-zinc-400" />
            <span className="text-xs font-mono text-zinc-400">
              {image.views.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-bold text-sm  transition-colors line-clamp-2">
          {image.title}
        </h3>

        {/* Description */}
        {image.description && (
          <p className="text-xs text-zinc-500 line-clamp-2">
            {image.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-zinc-600 font-mono pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{image.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>
              {new Date(image.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
