// data/team-data.ts

export interface SocialMedia {
  platform: string;
  url: string;
  handle: string;
}

export interface PersonalRecord {
  distance: string;
  time: string;
  pace: string;
  location: string;
  date: string;
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  location: string;
  yearsRunning: number;

  // Running Stats
  personalRecords: PersonalRecord[];
  weeklyMileage: string;
  favoriteDistance: string;

  // Achievements
  achievements: Achievement[];

  // Social Media
  socials: SocialMedia[];

  // Preferences
  favoriteGear: string[];
  runningPhilosophy: string;

  // Additional
  joinedDate: string;
}
