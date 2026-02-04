"use client";

import { teamData } from "@/data/team-data";
import { TeamMember } from "@/types/team.type";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const TeamCard = ({
  member,
  index,
}: {
  member: TeamMember;
  index?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4 ${index && index % 2 == 0 ? "lg:pt-24" : 0}`}
    >
      <div className="w-full">
        <div className="w-full overflow-hidden aspect-[3/4] border border-zinc-800">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={533}
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full mt-4 sm:mt-6 flex justify-between items-end gap-2"
        >
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold italic">
            {member.name}
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase">
            {member.role}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TeamSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="py-20 lg:py-40 px-4 sm:px-8 lg:px-20 xl:px-40 bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
      >
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold italic leading-tight">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            THE
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              WebkitTextStroke: "2px white",
              color: "transparent",
            }}
          >
            TEAM.
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full sm:w-80 text-left sm:text-right uppercase font-mono text-xs sm:text-sm text-zinc-400"
        >
          Kumpulan individu yang disatukan oleh satu hal: kemauan untuk bergerak
          dan berkembang. Di GPM, kamu tidak berlari sendirian.
        </motion.p>
      </motion.div>

      {/* Carousel */}
      <div className="mt-20 lg:mt-40 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-4">
            {teamData.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index + 1} />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={`p-3 sm:p-4 border border-zinc-800 transition-all duration-300 ${
              canScrollPrev
                ? "hover:bg-white hover:text-black"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={`p-3 sm:p-4 border border-zinc-800 transition-all duration-300 ${
              canScrollNext
                ? "hover:bg-white hover:text-black"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {teamData.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-white transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
