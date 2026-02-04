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

export interface Social {
  platform: string;
  url: string;
  handle: string;
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
  personalRecords: PersonalRecord[];
  weeklyMileage: string;
  favoriteDistance: string;
  achievements: Achievement[];
  socials: Social[];
  favoriteGear: string[];
  runningPhilosophy: string;
  joinedDate: string;
}
