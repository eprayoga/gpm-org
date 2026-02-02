"use client";

import AboutSection from "@/components/features/home/about";
import GallerySection from "@/components/features/home/gallery";
import HeroSection from "@/components/features/home/hero";
import ShopSection from "@/components/features/home/shop";
import TeamSection from "@/components/features/home/team";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <GallerySection />
      <ShopSection />
    </React.Fragment>
  );
}
