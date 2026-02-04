"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const socialLinks = [
    { label: "INSTAGRAM", href: "#" },
    { label: "STRAVA", href: "#" },
    { label: "TIKTOK", href: "#" },
    { label: "YOUTUBE", href: "#" },
  ];

  return (
    <div className="w-full border-t border-zinc-800 flex flex-col justify-center items-center gap-6 sm:gap-8 py-12 sm:py-16 lg:py-20 px-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-32 sm:w-36 lg:w-40 h-fit"
      >
        <Image
          src={"/images/logos/GPM - alt 2 - White.png"}
          width={200}
          height={200}
          alt="LOGO"
          className="w-full h-full"
        />
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8"
      >
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05, color: "#ffffff" }}
            whileTap={{ scale: 0.95 }}
            className="font-mono tracking-wide text-[10px] sm:text-xs text-zinc-400 hover:text-zinc-50 transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="font-mono text-[10px] sm:text-xs text-zinc-500 mt-6 sm:mt-8 lg:mt-10 text-center max-w-md px-4"
      >
        © 2024 GROOVY PACE MILES // TEMUKAN RITMEMU // RASAKAN ALURNYA
      </motion.p>
    </div>
  );
};

export default Footer;
