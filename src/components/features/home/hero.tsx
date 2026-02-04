"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [paceData] = useState([
    { pace: `4'45" /KM`, city: "NYC" },
    { pace: `4'30" /KM`, city: "TOKYO" },
    { pace: `5'00" /KM`, city: "BORMAR" },
    { pace: `4'50" /KM`, city: "BANDUNG" },
    { pace: `4'40" /KM`, city: "BERLIN" },
    { pace: `4'35" /KM`, city: "LONDON" },
  ]);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen">
        <div className="relative w-full h-full">
          {/* Content */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-8 lg:gap-16 z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold text-center"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                FIND YOUR PACE,
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="italic"
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                FEEL THE GROOVE.
              </motion.div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-zinc-400 font-mono text-xs sm:text-sm text-center"
            >
              GPM // URBAN PERFORMANCE ENGINEERING
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center"
            >
              <Button className="px-6 sm:px-8 py-4 sm:py-6 font-mono text-sm w-full sm:w-auto">
                SHOP THE DROP
              </Button>
              <Button
                variant="outline"
                className="px-6 sm:px-8 py-4 sm:py-6 font-mono text-sm w-full sm:w-auto"
              >
                JOIN CREW
              </Button>
            </motion.div>
          </div>

          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 left-0 w-full h-full overflow-hidden bg-cover grayscale contrast-125 z-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(13, 13, 13, 0.7), rgba(13, 13, 13, 0.9)), url("/images/backgrounds/urban-runner.png")',
              backgroundPosition: "center",
            }}
          />

          {/* Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-0 left-0 w-full overflow-hidden border border-x-0 border-y border-zinc-800 py-3 sm:py-4 bg-black/40 backdrop-blur-sm"
          >
            <div
              className="flex items-center gap-4 sm:gap-6 whitespace-nowrap"
              style={{
                animation: "marquee 25s linear infinite",
              }}
            >
              {[...paceData, ...paceData].map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <span className="font-mono text-xs sm:text-sm text-zinc-200">
                    {item.pace} - {item.city}
                  </span>
                  <Dot size={24} className="text-zinc-500 sm:w-9 sm:h-9" />
                </div>
              ))}
            </div>
          </motion.div>

          <style jsx global>{`
            @keyframes marquee {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>
      </div>
      <div className="min-h-screen"></div>
    </>
  );
};

export default HeroSection;
