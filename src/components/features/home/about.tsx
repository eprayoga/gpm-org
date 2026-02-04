"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <React.Fragment>
      <div
        ref={sectionRef}
        className="relative w-full px-4 sm:px-8 lg:px-20 xl:px-40 py-20"
      >
        {/* Vertical Text - Hidden on mobile */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hidden lg:block absolute top-0 left-4 xl:left-0 rotate-90 origin-bottom-left tracking-widest uppercase text-zinc-500 font-mono text-xs"
        >
          E S T A B L I S H E D <span className="ml-4"></span> M M X X I V
        </motion.span>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 lg:ml-20"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold italic leading-tight">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                THE
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{
                  WebkitTextStroke: "2px white",
                  color: "transparent",
                }}
              >
                JOURNEY.
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-mono font-bold mt-4 text-zinc-500 text-sm sm:text-base"
            >
              BELIEVE IN EVERY STEP
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="w-full flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8 text-zinc-500 text-sm sm:text-base lg:text-lg"
            >
              <p>
                <span className="text-white">Groovy Pace Miles (GPM)</span>{" "}
                bukan sekadar komunitas lari. Kami lahir dari keyakinan bahwa
                hidup yang lebih baik dimulai dari langkah yang konsisten.
              </p>
              <p>
                Kami percaya berlari bukan soal siapa yang paling cepat, tetapi
                siapa yang paling menikmati perjalanannya. Setiap langkah punya
                ritme. Setiap ritme punya cerita.
              </p>
              <p>
                Setiap kilometer adalah proses menuju versi diri yang lebih
                kuat—secara fisik, mental, dan karakter. Kami adalah ruang bagi
                mereka yang ingin bergerak maju dalam hidup.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative w-full lg:w-2/5 mt-10 lg:mt-0"
          >
            <div className="relative border border-zinc-800 w-full aspect-[3/4] p-2 sm:p-4">
              <motion.div style={{ y }}>
                <Image
                  src="/images/content/about-run.png"
                  alt="GPM-RUNNER"
                  width={400}
                  height={533}
                  className="object-cover w-full h-full grayscale"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -left-4 sm:-left-8 -bottom-4 sm:-bottom-8 w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 p-4 sm:p-6 md:p-10 bg-white"
              >
                <Image
                  src="/images/content/about-run-2.png"
                  alt="GPM-RUNNER-2"
                  width={240}
                  height={240}
                  className="object-cover w-full h-full grayscale"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Three Principles Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 lg:mt-40 grid grid-cols-1 md:grid-cols-3"
      >
        {[
          {
            title: "GROOVY",
            description:
              "Ritme yang asik, mengalir, dan penuh energi. Saat langkah bertemu irama, tubuh dan pikiran bergerak selaras.",
            delay: 0.2,
          },
          {
            title: "PACE",
            description:
              "Kami menghargai tempo. Bukan tentang memaksa, melainkan menemukan kecepatan yang pas. Konsistensi di atas ego.",
            delay: 0.4,
          },
          {
            title: "MILES",
            description:
              "Jarak yang ditempuh dengan dedikasi. Setiap mile mencerminkan proses, bukan sekadar angka di jam tangan.",
            delay: 0.6,
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`bg-white text-zinc-900 p-6 sm:p-8 lg:p-10 ${
              index === 1
                ? "border-y md:border-x md:border-y-0 border-zinc-800"
                : ""
            }`}
          >
            <h1 className="text-3xl sm:text-4xl font-black italic">
              {item.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </React.Fragment>
  );
};

export default AboutSection;
