"use client";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TeamMember } from "@/types/team.type";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Activity,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Heart,
  Instagram,
  MapPin,
  Trophy,
  Twitter,
  Youtube,
  Zap,
} from "lucide-react";
import Image from "next/image";

interface TeamMemberDialogProps {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const socialIcons: Record<string, any> = {
  Instagram: Instagram,
  Twitter: Twitter,
  YouTube: Youtube,
  Strava: Activity,
  TikTok: Trophy,
};

export function TeamMemberDialog({
  member,
  open,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: TeamMemberDialogProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle />
        <div className="relative">
          {/* Navigation Arrows */}
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 hover:bg-black rounded-full flex items-center justify-center border border-zinc-700 hover:border-blue-600 transition-all"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 hover:bg-black rounded-full flex items-center justify-center border border-zinc-700 hover:border-blue-600 transition-all"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Header Image */}
          <div className="relative h-80 overflow-hidden bg-zinc-900">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Name & Role Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <Badge className="mb-3 font-mono">{member.role}</Badge>
              <h2 className="text-5xl font-bold italic mb-2">{member.name}</h2>
              <p className="text-xl text-zinc-400 font-mono">
                {member.specialty}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Bio & Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-sm font-mono text-zinc-500 mb-2">BIO</h3>
                  <p className="text-zinc-300 leading-relaxed">{member.bio}</p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-zinc-500 mb-2">
                    RUNNING PHILOSOPHY
                  </h3>
                  <p className="text-blue-600 italic font-medium">
                    "{member.runningPhilosophy}"
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-blue-600" />
                    <h3 className="text-xs font-mono text-zinc-500">
                      LOCATION
                    </h3>
                  </div>
                  <p className="font-bold">{member.location}</p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={16} className="text-blue-600" />
                    <h3 className="text-xs font-mono text-zinc-500">
                      EXPERIENCE
                    </h3>
                  </div>
                  <p className="font-bold">
                    {member.yearsRunning}+ Years Running
                  </p>
                </div>

                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} className="text-blue-600" />
                    <h3 className="text-xs font-mono text-zinc-500">
                      WEEKLY MILEAGE
                    </h3>
                  </div>
                  <p className="font-bold">{member.weeklyMileage}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Records */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold font-mono">
                  PERSONAL RECORDS
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {member.personalRecords.map((pr, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900 p-5 rounded-lg border border-zinc-800 hover:border-blue-600/50 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-2xl font-bold">{pr.distance}</span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {pr.pace}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {pr.time}
                    </div>
                    <p className="text-sm text-zinc-400">{pr.location}</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      {new Date(pr.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold font-mono">ACHIEVEMENTS</h3>
              </div>
              <div className="space-y-3">
                {member.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-zinc-900 p-4 rounded-lg border border-zinc-800"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 border border-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          {achievement.year}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">{achievement.title}</h4>
                        <p className="text-sm text-zinc-400">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Favorite Gear */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold font-mono">FAVORITE GEAR</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {member.favoriteGear.map((gear, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 font-mono"
                  >
                    {gear}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Social Media */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ExternalLink size={20} className="text-blue-600" />
                <h3 className="text-xl font-bold font-mono">CONNECT</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {member.socials.map((social, index) => {
                  const Icon = socialIcons[social.platform] || ExternalLink;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-blue-600 hover:bg-blue-600/10 transition-all group"
                    >
                      <Icon size={20} className="text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-zinc-500 font-mono">
                          {social.platform}
                        </p>
                        <p className="text-sm font-bold truncate group-hover:text-blue-600 transition-colors">
                          {social.handle}
                        </p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="text-zinc-600 group-hover:text-blue-600"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
