"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { teamData } from "@/data/team-data";
import { TeamMember } from "@/types/team.type";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  Calendar,
  ChevronRight,
  Heart,
  Instagram,
  MapPin,
  MoveDownRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const BlurReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const randomPositions = [
  {
    container: "ml-10 lg:ml-[10%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: -2,
    xParallax: [40, -40],
    yParallax: [30, -30],
    flexDirection: "flex-row",
  },
  {
    container: "ml-auto mr-10 lg:mr-[10%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: 1,
    xParallax: [-40, 40],
    yParallax: [25, -25],
    flexDirection: "flex-row-reverse",
  },
  {
    container: "ml-[5%] lg:ml-[15%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: 2,
    xParallax: [35, -35],
    yParallax: [40, -40],
    flexDirection: "flex-row",
  },
  {
    container: "ml-auto mr-[8%] lg:mr-[12%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: -1,
    xParallax: [-35, 35],
    yParallax: [30, -30],
    flexDirection: "flex-row-reverse",
  },
  {
    container: "ml-[3%] lg:ml-[8%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: -2,
    xParallax: [45, -45],
    yParallax: [35, -35],
    flexDirection: "flex-row",
  },
  {
    container: "ml-auto mr-[5%] lg:mr-[18%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: 1,
    xParallax: [-30, 30],
    yParallax: [28, -28],
    flexDirection: "flex-row-reverse",
  },
  {
    container: "ml-[10%] lg:ml-[20%]",
    imageSize: "w-40 md:w-64 lg:w-100",
    rotation: -1,
    xParallax: [38, -38],
    yParallax: [32, -32],
    flexDirection: "flex-row",
  },
];

const RosterCard = ({
  member,
  index,
  onClick,
}: {
  member: TeamMember;
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const config = randomPositions[index % randomPositions.length];

  const x = useTransform(scrollYProgress, [0, 1], config.xParallax);
  const y = useTransform(scrollYProgress, [0, 1], config.yParallax);
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [config.rotation, 0, -config.rotation],
  );

  const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.9],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        x: xSpring,
        y: ySpring,
        opacity,
        scale,
      }}
      className={`${config.container} mb-24 lg:mb-32`}
    >
      <motion.div
        style={{ rotate }}
        className="cursor-pointer"
        onClick={onClick}
      >
        {/* Flex container untuk foto dan quote - NO OVERFLOW */}
        <div
          className={`flex gap-6 lg:gap-100 items-center ${config.flexDirection} max-w-full`}
        >
          {/* Image dengan animasi muncul */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: config.rotation * 2,
              filter: "blur(20px)",
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: config.rotation,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            className="flex-shrink-0"
          >
            <div
              className={`${config.imageSize} aspect-[3/4] overflow-hidden border border-zinc-800 shadow-2xl`}
            >
              <Image
                src={member.image}
                width={800}
                height={1200}
                alt={member.name}
                className="grayscale w-full h-full object-cover group-hover:grayscale-0 hover:grayscale-0 hover:scale-110 transition-all duration-700 ease-out"
              />
            </div>

            {/* Name tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-4 border border-zinc-800 p-3 inline-block"
            >
              <div className="text-base lg:text-lg font-mono font-bold uppercase tracking-wider">
                {member.name}
              </div>
              <span className="font-mono text-xs text-zinc-500 uppercase mt-1 block">
                {member.role}
              </span>
            </motion.div>
          </motion.div>

          {/* Quote - positioned close to image, NO ABSOLUTE positioning */}
          <motion.div
            initial={{
              opacity: 0,
              x: config.flexDirection === "flex-row" ? -20 : 20,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 max-w-md"
          >
            <div className="font-mono italic text-sm lg:text-xl text-zinc-400 border border-zinc-800 p-4 lg:p-6 leading-relaxed">
              <span className="text-zinc-600">"</span>
              {member.runningPhilosophy}
              <span className="text-zinc-600">"</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamMemberModal = ({
  member,
  open,
  onClose,
}: {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
}) => {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-2xl lg:text-3xl font-bold font-mono uppercase tracking-wider">
            {member.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Left column - Image and basic info */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[3/4] overflow-hidden border border-zinc-800 shadow-2xl"
            >
              <Image
                src={member.image}
                width={600}
                height={900}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="mt-6 space-y-4">
              <div className="border border-zinc-800 p-4">
                <div className="text-xs text-zinc-500 font-mono uppercase mb-2 tracking-widest">
                  Role
                </div>
                <Badge
                  variant="outline"
                  className="font-mono border-zinc-700 text-white"
                >
                  {member.role}
                </Badge>
              </div>

              <div className="border border-zinc-800 p-4">
                <div className="text-xs text-zinc-500 font-mono uppercase mb-2 tracking-widest">
                  Specialty
                </div>
                <p className="font-mono text-sm text-zinc-300">
                  {member.specialty}
                </p>
              </div>

              <div className="space-y-3 border border-zinc-800 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-zinc-500" />
                  <span className="font-mono text-zinc-300">
                    {member.location}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-zinc-500" />
                  <span className="font-mono text-zinc-300">
                    {member.yearsRunning} years running
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Activity size={16} className="text-zinc-500" />
                  <span className="font-mono text-zinc-300">
                    {member.weeklyMileage} / week
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Heart size={16} className="text-zinc-500" />
                  <span className="font-mono text-zinc-300">
                    {member.favoriteDistance}
                  </span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 border border-zinc-800 p-4">
              <div className="text-xs text-zinc-500 font-mono uppercase mb-3 tracking-widest">
                Connect
              </div>
              <div className="flex gap-3">
                {member.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300"
                  >
                    {social.platform === "Instagram" && <Instagram size={18} />}
                    {social.platform === "Strava" && <Activity size={18} />}
                    {social.platform === "Twitter" && <Zap size={18} />}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Details */}
          <div className="space-y-6">
            <div className="border border-zinc-800 p-4">
              <div className="text-xs text-zinc-500 font-mono uppercase mb-3 tracking-widest">
                Bio
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {member.bio}
              </p>
            </div>

            <div className="border border-zinc-800 p-4">
              <div className="text-xs text-zinc-500 font-mono uppercase mb-3 tracking-widest">
                Philosophy
              </div>
              <p className="italic text-sm leading-relaxed text-zinc-300">
                "{member.runningPhilosophy}"
              </p>
            </div>

            {/* Personal Records */}
            <div className="border border-zinc-800 p-4">
              <div className="text-xs text-zinc-500 font-mono uppercase mb-4 tracking-widest">
                Personal Records
              </div>
              <div className="space-y-2">
                {member.personalRecords.map((pr, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono font-bold text-sm text-white">
                        {pr.distance}
                      </span>
                      <span className="font-mono text-lg text-white">
                        {pr.time}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>{pr.location}</span>
                      <span className="text-zinc-400">{pr.pace}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="border border-zinc-800 p-4">
              <div className="text-xs text-zinc-500 font-mono uppercase mb-4 tracking-widest">
                Achievements
              </div>
              <div className="space-y-2">
                {member.achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-3 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-mono font-bold text-sm text-white">
                        {achievement.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="font-mono text-xs bg-zinc-900 text-zinc-300 border-zinc-800"
                      >
                        {achievement.year}
                      </Badge>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Favorite Gear */}
            <div className="border border-zinc-800 p-4">
              <div className="text-xs text-zinc-500 font-mono uppercase mb-3 tracking-widest">
                Favorite Gear
              </div>
              <div className="flex flex-wrap gap-2">
                {member.favoriteGear.map((gear, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="font-mono text-xs border-zinc-800 text-zinc-300 hover:border-zinc-600 transition-colors"
                  >
                    {gear}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black border-t border-zinc-800">
      <div className="mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <BlurReveal delay={0.1}>
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-8">
            <span className="hover:text-white transition-colors cursor-pointer">
              HOME
            </span>
            <ChevronRight size={16} />
            <span className="text-white">TEAM</span>
          </div>
        </BlurReveal>

        {/* Hero Section - Simple */}
        <div className="border-y border-zinc-800 py-10 lg:py-20">
          <BlurReveal delay={0.2}>
            <div className="text-4xl lg:text-7xl xl:text-8xl font-bold leading-[1.1]">
              NOT A TEAM, <br />A{" "}
              <span
                className="inline-block"
                style={{
                  WebkitTextStroke: "1px white",
                  color: "transparent",
                }}
              >
                MOVEMENT
              </span>
              , <br />
              BUILT FOR THE STREET, <br />
              REFINED FOR THE ATHLETE.
            </div>
          </BlurReveal>
        </div>

        {/* Description Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start py-10 lg:py-20 gap-8">
          <BlurReveal delay={0.3}>
            <div className="font-mono text-base lg:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              GPM exists at the intersection of performance and subculture. We
              don't follow seasons; we follow the rhythm of the city.
            </div>
          </BlurReveal>
          <BlurReveal delay={0.4}>
            <MoveDownRight size={48} className="text-zinc-700" />
          </BlurReveal>
        </div>

        {/* Roster Header */}
        <div className="mt-10 py-6 lg:py-10 flex flex-col lg:flex-row justify-between items-start lg:items-end border-y border-zinc-800 gap-4">
          <BlurReveal delay={0.5}>
            <div className="text-4xl lg:text-7xl xl:text-8xl font-bold">
              THE ROSTER
            </div>
          </BlurReveal>
          <BlurReveal delay={0.6}>
            <div className="font-mono text-sm lg:text-md text-zinc-500">
              [ ACTIVE AGENTS: {teamData.length.toString().padStart(2, "0")} ]
            </div>
          </BlurReveal>
        </div>

        {/* Roster Grid - Controlled Abstract Layout */}
        <div className="py-20 space-y-16 lg:space-y-24">
          {teamData.map((member, index) => (
            <RosterCard
              key={member.id}
              member={member}
              index={index}
              onClick={() => handleMemberClick(member)}
            />
          ))}
        </div>

        {/* Footer CTA - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-zinc-800 py-20 text-center"
        >
          <div className="text-2xl lg:text-4xl font-bold font-mono mb-4">
            WANT TO JOIN THE MOVEMENT?
          </div>

          <p className="text-zinc-500 font-mono mb-8 text-sm lg:text-base">
            We're always looking for passionate runners to join our crew.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-mono font-bold hover:bg-zinc-200 transition-all duration-300 border border-white"
          >
            GET IN TOUCH
          </motion.button>
        </motion.div>
      </div>

      {/* Team Member Detail Modal */}
      <TeamMemberModal
        member={selectedMember}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
