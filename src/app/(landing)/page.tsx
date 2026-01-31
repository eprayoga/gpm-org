"use client";

import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [paceData] = useState([
    { pace: `4'45" /KM`, city: "NYC" },
    { pace: `4'30" /KM`, city: "TOKYO" },
    { pace: `5'00" /KM`, city: "BORMAR" },
    { pace: `4'50" /KM`, city: "BANDUNG" },
    { pace: `4'40" /KM`, city: "BERLIN" },
    { pace: `4'35" /KM`, city: "LONDON" },
  ]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen">
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-16 z-1">
          <div className="text-8xl font-bold text-center">
            <div>FIND YOUR PACE,</div>
            <div
              className="italic"
              style={{
                WebkitTextStroke: "2px white",
                color: "transparent",
              }}
            >
              FEEL THE GROOVE.
            </div>
          </div>

          <span className="text-zinc-400 font-mono">
            GPM // URBAN PERFORMANCE ENGINEERING
          </span>

          <div className="flex gap-6 items-center">
            <Button className="px-8 py-6 font-mono">SHOP THE DROP</Button>
            <Button variant="outline" className="px-8 py-6 font-mono">
              JOIN CREW
            </Button>
          </div>
        </div>

        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden bg-cover grayscale contrast-125 z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(13, 13, 13, 0.7), rgba(13, 13, 13, 0.9)), url("/images/backgrounds/urban-runner.png")',
          }}
        />

        <div className="absolute bottom-0 left-0 w-full overflow-hidden border border-x-0 border-y border-zinc-800 py-4 bg-black/40 backdrop-blur-sm">
          <div
            className="flex items-center gap-6 whitespace-nowrap"
            style={{
              animation: "marquee 25s linear infinite",
            }}
          >
            {[...paceData, ...paceData].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="font-mono text-sm text-zinc-200">
                  {item.pace} - {item.city}
                </span>
                <Dot size={36} className="text-zinc-500" />
              </div>
            ))}
          </div>
        </div>

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
  );
}
