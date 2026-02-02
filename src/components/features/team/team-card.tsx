"use client";

import Image from "next/image";
import { MapPin, Calendar, Trophy } from "lucide-react";
import { TeamMember } from "@/types/team.type";

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
}

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden cursor-pointer group hover:border-white/50 transition-all"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="text-sm font-mono text-white">VIEW PROFILE →</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-6 space-y-3">
        {/* Role Badge */}
        <div className="inline-block px-3 py-1 bg-white/20 border border-white rounded-full">
          <span className="text-xs font-bold font-mono text-white">
            {member.role}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold italic group-hover:text-white transition-colors">
          {member.name}
        </h3>

        {/* Specialty */}
        <p className="text-zinc-400 font-mono text-sm">{member.specialty}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono pt-2">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{member.location.split(",")[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{member.yearsRunning}+ Years</span>
          </div>
        </div>

        {/* Favorite Distance */}
        <div className="pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-white" />
            <span className="text-sm font-bold">{member.favoriteDistance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
