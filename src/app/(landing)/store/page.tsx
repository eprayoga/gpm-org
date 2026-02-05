"use client";

import { ProductCard } from "@/components/features/store/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { products } from "@/data/product-data";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Filter,
  Grid,
  Shirt,
  UserCog,
  Watch,
} from "lucide-react";
import { useMemo, useState } from "react";

type SortOption = "newest" | "price-low" | "price-high" | "name";
type GridSize = "2" | "3" | "4";

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedSubcategory,
  categories,
  categoryIcons,
}: any) => {
  return (
    <div className="flex flex-col p-6 lg:p-8 h-full">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-zinc-500 font-mono"
      >
        FILTER / NAVIGATOR
      </motion.span>

      <div className="flex flex-col gap-2 mt-4">
        {categories.map((category: string, index: number) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons];
          const isActive = selectedCategory === category;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubcategory("ALL GEAR");
              }}
              className={`flex items-center p-3 lg:p-4 gap-3 rounded-lg cursor-pointer transition-all ${
                isActive
                  ? "bg-blue-600/20 border border-blue-600 text-blue-600"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-bold text-sm lg:text-base">{category}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("APPAREL");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string>("ALL GEAR");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [gridSize, setGridSize] = useState<GridSize>("4");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get unique subcategories based on selected category
  const subcategories = useMemo(() => {
    const subs = products
      .filter((p) => p.category === selectedCategory)
      .map((p) => p.subcategory);
    return ["ALL GEAR", ...Array.from(new Set(subs))];
  }, [selectedCategory]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.category === selectedCategory);

    if (selectedSubcategory !== "ALL GEAR") {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory, sortBy]);

  const categoryIcons = {
    APPAREL: Shirt,
    ACCESSORIES: Watch,
    GEAR: UserCog,
  };

  const categories = ["APPAREL", "ACCESSORIES", "GEAR"];

  const gridCols = {
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className="w-full min-h-screen border-t border-zinc-800 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-75 border-r border-zinc-800">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedSubcategory={setSelectedSubcategory}
          categories={categories}
          categoryIcons={categoryIcons}
        />
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <SheetHeader className="p-6 border-b border-zinc-800">
            <SheetTitle className="font-mono text-left">
              FILTER & CATEGORY
            </SheetTitle>
          </SheetHeader>
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSelectedSubcategory={setSelectedSubcategory}
            categories={categories}
            categoryIcons={categoryIcons}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full p-4 sm:p-6 lg:p-8 border-b border-zinc-800 flex flex-col gap-4"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono flex-wrap">
            <span>STORE</span>
            <ChevronRight size={16} />
            <span className="text-white">
              {selectedCategory}{" "}
              {selectedSubcategory !== "ALL GEAR" && `/ ${selectedSubcategory}`}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold italic leading-tight"
          >
            {selectedCategory}{" "}
            {selectedSubcategory !== "ALL GEAR" && selectedSubcategory}
          </motion.h1>

          {/* Description & Actions */}
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 font-mono text-xs sm:text-sm max-w-2xl"
            >
              High-energy performance gear engineered for the nocturnal city
              athlete.
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-2 items-center"
            >
              {/* Mobile Filter Button */}
              <Button
                className="font-mono lg:hidden"
                variant="outline"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <Filter className="w-4 h-4" />
                FILTER
              </Button>

              {/* Sort Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="font-mono text-xs sm:text-sm"
                    variant="outline"
                  >
                    <span className="hidden sm:inline">SORT BY</span>
                    <span className="sm:hidden">SORT</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  <div className="flex flex-col gap-1">
                    {[
                      { value: "newest", label: "Newest First" },
                      { value: "price-low", label: "Price: Low to High" },
                      { value: "price-high", label: "Price: High to Low" },
                      { value: "name", label: "Name: A-Z" },
                    ].map((option) => (
                      <motion.div
                        key={option.value}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        onClick={() => setSortBy(option.value as SortOption)}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
                          sortBy === option.value ? "bg-accent" : ""
                        }`}
                      >
                        <span className="text-sm font-mono">
                          {option.label}
                        </span>
                        {sortBy === option.value && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Grid Size Popover - Hidden on mobile */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="font-mono text-xs sm:text-sm hidden sm:flex"
                    variant="outline"
                  >
                    <span className="hidden md:inline">
                      GRID ({gridSize}x{gridSize})
                    </span>
                    <span className="md:hidden">
                      {gridSize}x{gridSize}
                    </span>
                    <Grid className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2" align="end">
                  <div className="flex flex-col gap-1">
                    {["2", "3", "4"].map((size) => (
                      <motion.div
                        key={size}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                        }}
                        onClick={() => setGridSize(size as GridSize)}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
                          gridSize === size ? "bg-accent" : ""
                        }`}
                      >
                        <span className="text-sm font-mono">
                          {size}x{size}
                        </span>
                        {gridSize === size && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          </div>

          {/* Subcategory Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 flex-wrap"
          >
            {subcategories.map((sub, index) => (
              <motion.div
                key={sub}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <Badge
                  className="cursor-pointer text-xs"
                  variant={
                    selectedSubcategory === sub ? "default" : "secondary"
                  }
                  onClick={() => setSelectedSubcategory(sub)}
                >
                  {sub}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <div
          className={`w-full grid ${gridCols[gridSize]} gap-4 p-4 sm:p-6 lg:p-8 bg-zinc-900`}
        >
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex items-center justify-center py-20"
              >
                <p className="text-zinc-500 font-mono text-sm lg:text-lg">
                  No products found in this category
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
