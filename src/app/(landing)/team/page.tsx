"use client";

import { useState } from "react";
import { Users, ChevronRight } from "lucide-react";
import { teamMembers } from "@/data/team-data";
import { TeamMemberCard } from "@/components/features/team/team-card";
import { TeamMemberDialog } from "@/components/features/team/team-member-dialog";
import { Button } from "@/components/ui/button";

export default function TeamPage() {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMemberClick = (index: number) => {
    setSelectedMemberIndex(index);
    setIsDialogOpen(true);
  };

  const handleNext = () => {
    if (
      selectedMemberIndex !== null &&
      selectedMemberIndex < teamMembers.length - 1
    ) {
      setSelectedMemberIndex(selectedMemberIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedMemberIndex !== null && selectedMemberIndex > 0) {
      setSelectedMemberIndex(selectedMemberIndex - 1);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const selectedMember =
    selectedMemberIndex !== null ? teamMembers[selectedMemberIndex] : null;
  const hasNext =
    selectedMemberIndex !== null &&
    selectedMemberIndex < teamMembers.length - 1;
  const hasPrevious = selectedMemberIndex !== null && selectedMemberIndex > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-zinc-800 bg-gradient-to-b from-white/10 to-transparent">
        <div className="mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-6">
            <span>HOME</span>
            <ChevronRight size={16} />
            <span className="text-white">TEAM</span>
          </div>

          {/* Title */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              {/* <Users size={48} className="" /> */}
              <h1 className="text-7xl font-bold italic">OUR TEAM</h1>
            </div>
            <p className="text-xl text-zinc-400 font-mono leading-relaxed">
              Meet the elite runners and coaches who power GPM. From marathon
              champions to ultra specialists, our team brings decades of
              experience to help you reach your goals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="text-4xl font-bold  mb-2">6</div>
              <div className="text-sm font-mono text-zinc-500">
                ELITE COACHES
              </div>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="text-4xl font-bold  mb-2">80+</div>
              <div className="text-sm font-mono text-zinc-500">
                YEARS COMBINED
              </div>
            </div>
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div className="text-4xl font-bold  mb-2">50K+</div>
              <div className="text-sm font-mono text-zinc-500">KM WEEKLY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onClick={() => handleMemberClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Join Team CTA */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold italic mb-4">JOIN OUR TEAM</h2>
            <p className="text-zinc-400 mb-8">
              We're always looking for passionate runners and coaches to join
              our community. If you think you'd be a good fit, we'd love to hear
              from you.
            </p>
            <Button className="px-8 py-4 rounded-lg font-bold font-mono transition-all">
              GET IN TOUCH
            </Button>
          </div>
        </div>
      </div>

      {/* Team Member Dialog */}
      <TeamMemberDialog
        member={selectedMember}
        open={isDialogOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </div>
  );
}
