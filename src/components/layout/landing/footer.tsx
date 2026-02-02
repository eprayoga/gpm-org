import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full border-t border-zinc-800 flex flex-col justify-center items-center gap-8 py-20">
      <div className="w-40 h-fit">
        <Image
          src={"/images/logos/GPM - alt 2 - White.png"}
          width={200}
          height={200}
          alt="LOGO"
          className="w-full h-full"
        />
      </div>
      <div className="flex items-center gap-8">
        <a href="" className="font-mono tracking-wide text-xs">
          INSTAGRAM
        </a>
        <a href="" className="font-mono tracking-wide text-xs">
          STRAVA
        </a>
        <a href="" className="font-mono tracking-wide text-xs">
          TIKTOK
        </a>
        <a href="" className="font-mono tracking-wide text-xs">
          YOUTUBE
        </a>
      </div>
      <p className="font-mono text-xs text-zinc-500 mt-10">
        © 2024 GROOVY PACE MILES // TEMUKAN RITMEMU // RASAKAN ALURNYA
      </p>
    </div>
  );
};

export default Footer;
