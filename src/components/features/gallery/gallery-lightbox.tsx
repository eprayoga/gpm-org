"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GalleryImage } from "@/types/gallery.type";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Eye,
  X,
  Download,
  Share2,
} from "lucide-react";
import Image from "next/image";

interface GalleryLightboxProps {
  image: GalleryImage | null;
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function GalleryLightbox({
  image,
  open,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: GalleryLightboxProps) {
  if (!image) return null;

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

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[95vh] p-0 bg-black border-zinc-800">
        <DialogTitle className="sr-only">{image.title}</DialogTitle>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center border border-zinc-700 hover:border-blue-600 transition-all"
        >
          <X size={20} />
        </button>

        {/* Navigation Arrows */}
        {hasPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/80 hover:bg-black rounded-full flex items-center justify-center border border-zinc-700 hover:border-blue-600 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-black/80 hover:bg-black rounded-full flex items-center justify-center border border-zinc-700 hover:border-blue-600 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        )}

        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="flex-1 relative flex items-center justify-center p-4 bg-black">
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-contain"
                priority
                sizes="95vw"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-zinc-950 border-t border-zinc-800 p-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-start justify-between gap-4">
                {/* Left: Info */}
                <div className="flex-1 space-y-3">
                  {/* Category Badge */}
                  <div
                    className={`inline-block px-3 py-1 rounded-full border text-xs font-bold font-mono ${getCategoryColor()}`}
                  >
                    {image.category.toUpperCase()}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold italic">{image.title}</h2>

                  {/* Description */}
                  {image.description && (
                    <p className="text-zinc-400 leading-relaxed">
                      {image.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-zinc-500 font-mono pt-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600" />
                      <span>{image.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span>
                        {new Date(image.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {image.views && (
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-blue-600" />
                        <span>{image.views.toLocaleString()} views</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {image.tags && image.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {image.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded font-mono"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Photographer */}
                  {image.photographer && (
                    <div className="pt-2 text-sm">
                      <span className="text-zinc-600">Photo by </span>
                      <span className="text-zinc-400 font-bold">
                        {image.photographer}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleDownload}
                    className="px-4 py-2  rounded-lg font-bold font-mono text-sm transition-all flex items-center gap-2"
                  >
                    <Download size={16} />
                    DOWNLOAD
                  </Button>
                  {"share" in navigator && (
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-bold font-mono text-sm transition-all flex items-center gap-2"
                    >
                      <Share2 size={16} />
                      SHARE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
