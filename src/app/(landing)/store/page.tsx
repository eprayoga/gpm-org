"use client";

import { ProductCard } from "@/components/features/store/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { products } from "@/data/product-data";
import {
  ChevronDown,
  ChevronRight,
  Grid,
  Shirt,
  Watch,
  UserCog,
  Check,
} from "lucide-react";
import { useState, useMemo } from "react";

type SortOption = "newest" | "price-low" | "price-high" | "name";
type GridSize = "2" | "3" | "4";

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("APPAREL");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState<string>("ALL GEAR");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [gridSize, setGridSize] = useState<GridSize>("4");

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
    "2": "grid-cols-2",
    "3": "grid-cols-3",
    "4": "grid-cols-4",
  };

  return (
    <div className="w-full min-h-screen border-t border-zinc-800 flex">
      {/* Sidebar */}
      <div className="w-75 border-r border-zinc-800 flex flex-col p-8">
        <span className="text-xs text-zinc-500 font-mono">
          FILTER / NAVIGATOR
        </span>

        <div className="flex flex-col gap-2 mt-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const isActive = selectedCategory === category;

            return (
              <div
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubcategory("ALL GEAR");
                }}
                className={`flex items-center p-4 gap-3 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? "bg-blue-600/20 border border-blue-600 text-blue-600"
                    : "hover:bg-white/5"
                }`}
              >
                <Icon />
                <span className="font-bold">{category}</span>
              </div>
            );
          })}
        </div>

        <span className="text-xs text-zinc-500 font-mono mt-10">
          TECHNICAL SPECS
        </span>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-3 items-center text-xs">
            <Checkbox id="reflective" name="reflective" />
            <label htmlFor="reflective" className="font-mono">
              Reflective (3M)
            </label>
          </div>
          <div className="flex gap-3 items-center text-xs">
            <Checkbox id="aeroready" name="aeroready" />
            <label htmlFor="aeroready" className="font-mono">
              Aeroready tech
            </label>
          </div>
          <div className="flex gap-3 items-center text-xs">
            <Checkbox id="thermal insulation" name="thermal insulation" />
            <label htmlFor="thermal insulation" className="font-mono">
              Thermal Insulation
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grow min-h-full flex flex-col">
        {/* Header */}
        <div className="w-full h-fit p-8 border-b border-zinc-800 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
            <span>STORE</span>
            <ChevronRight size={16} />
            <span className="text-white">
              {selectedCategory}{" "}
              {selectedSubcategory !== "ALL GEAR" && `/ ${selectedSubcategory}`}
            </span>
          </div>

          <h1 className="text-7xl font-bold italic">
            {selectedCategory}{" "}
            {selectedSubcategory !== "ALL GEAR" && selectedSubcategory}
          </h1>

          <div className="flex justify-between gap-4">
            <span className="text-zinc-500 font-mono">
              High-energy performance gear engineered for the nocturnal city
              athlete.
            </span>
            <div className="flex gap-2 items-center">
              {/* Sort Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="font-mono" variant={"outline"}>
                    SORT BY <ChevronDown />
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
                      <div
                        key={option.value}
                        onClick={() => setSortBy(option.value as SortOption)}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-accent ${
                          sortBy === option.value ? "bg-accent" : ""
                        }`}
                      >
                        <span className="text-sm font-mono">
                          {option.label}
                        </span>
                        {sortBy === option.value && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Grid Size Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="font-mono" variant={"outline"}>
                    GRID ({gridSize}x{gridSize}) <Grid />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2" align="end">
                  <div className="flex flex-col gap-1">
                    {["2", "3", "4"].map((size) => (
                      <div
                        key={size}
                        onClick={() => setGridSize(size as GridSize)}
                        className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-accent ${
                          gridSize === size ? "bg-accent" : ""
                        }`}
                      >
                        <span className="text-sm font-mono">
                          {size}x{size}
                        </span>
                        {gridSize === size && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Subcategory Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {subcategories.map((sub) => (
              <Badge
                key={sub}
                className="cursor-pointer"
                variant={selectedSubcategory === sub ? "default" : "secondary"}
                onClick={() => setSelectedSubcategory(sub)}
              >
                {sub}
              </Badge>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`w-full grid ${gridCols[gridSize]} grow bg-zinc-900 px-8`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-20">
              <p className="text-zinc-500 font-mono text-lg">
                No products found in this category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
