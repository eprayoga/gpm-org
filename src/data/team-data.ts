import { TeamMember } from "@/types/team.type";

export const teamMembers: TeamMember[] = [
  {
    id: "tm-001",
    name: "Alex Chen",
    role: "HEAD COACH",
    specialty: "Marathon Training",
    image: "/images/teams/team-1.png",
    bio: "Former Olympic trials qualifier with 15+ years of coaching experience. Specializes in marathon preparation and endurance building.",
    location: "Jakarta, Indonesia",
    yearsRunning: 18,
    personalRecords: [
      {
        distance: "5K",
        time: "15:23",
        pace: "3:05 /km",
        location: "Singapore Marathon",
        date: "2023-12-03",
      },
      {
        distance: "10K",
        time: "32:15",
        pace: "3:14 /km",
        location: "Jakarta International 10K",
        date: "2024-04-15",
      },
      {
        distance: "Half Marathon",
        time: "1:10:45",
        pace: "3:22 /km",
        location: "Bali Half Marathon",
        date: "2024-08-20",
      },
      {
        distance: "Marathon",
        time: "2:28:30",
        pace: "3:31 /km",
        location: "Tokyo Marathon",
        date: "2023-03-05",
      },
    ],
    weeklyMileage: "120-140 km",
    favoriteDistance: "Marathon",
    achievements: [
      {
        title: "Olympic Trials Qualifier",
        year: "2020",
        description: "Qualified for Olympic Marathon Trials with sub-2:30 time",
      },
      {
        title: "Boston Marathon",
        year: "2021",
        description: "Top 50 finish at Boston Marathon",
      },
      {
        title: "IAAF Level 3 Coach",
        year: "2022",
        description: "Certified International Athletics Federation Coach",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/alexchen_runs",
        handle: "@alexchen_runs",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/alexchen",
        handle: "Alex Chen",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/alexchen_coach",
        handle: "@alexchen_coach",
      },
    ],
    favoriteGear: [
      "Nike Vaporfly 3",
      "Garmin Forerunner 965",
      "Oakley Kato Sunglasses",
      "GPM-01 VOID Running Tee",
    ],
    runningPhilosophy:
      "Consistency over intensity. Build your base, respect the process, and the results will follow.",
    joinedDate: "2020-01-15",
  },
  {
    id: "tm-002",
    name: "Sarah Martinez",
    role: "SPEED SPECIALIST",
    specialty: "5K & 10K Training",
    image: "/images/teams/team-1.png",
    bio: "Track & field champion turned coach. Expert in speed development and VO2max training for competitive runners.",
    location: "Surabaya, Indonesia",
    yearsRunning: 12,
    personalRecords: [
      {
        distance: "5K",
        time: "16:45",
        pace: "3:21 /km",
        location: "National Track Championship",
        date: "2024-06-12",
      },
      {
        distance: "10K",
        time: "35:20",
        pace: "3:32 /km",
        location: "Jakarta 10K Race",
        date: "2024-05-08",
      },
      {
        distance: "Half Marathon",
        time: "1:18:55",
        pace: "3:44 /km",
        location: "Surabaya Half",
        date: "2023-11-20",
      },
    ],
    weeklyMileage: "80-100 km",
    favoriteDistance: "5K",
    achievements: [
      {
        title: "National 5K Champion",
        year: "2022",
        description: "Won Indonesian National 5K Championship",
      },
      {
        title: "SEA Games Medalist",
        year: "2023",
        description: "Bronze medal in 10,000m at Southeast Asian Games",
      },
      {
        title: "Sub-17 5K Club",
        year: "2021",
        description: "Joined elite sub-17 minute 5K runners club",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/sarah_speedster",
        handle: "@sarah_speedster",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/sarahmartinez",
        handle: "Sarah Martinez",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/@SarahRunsFast",
        handle: "Sarah Runs Fast",
      },
    ],
    favoriteGear: [
      "Adidas Adizero Adios Pro 3",
      "COROS Pace 3",
      "Goodr Sunglasses",
      "GPM-02 SHADOW Running Shorts",
    ],
    runningPhilosophy:
      "Speed is a skill that can be developed. Train smart, race hard, recover harder.",
    joinedDate: "2020-08-20",
  },
  {
    id: "tm-003",
    name: "David Kim",
    role: "TRAIL SPECIALIST",
    specialty: "Ultra & Trail Running",
    image: "/images/teams/team-1.png",
    bio: "Ultra runner and mountain athlete. Passionate about long-distance trail running and helping others discover the joy of running in nature.",
    location: "Bandung, Indonesia",
    yearsRunning: 15,
    personalRecords: [
      {
        distance: "50K Trail",
        time: "4:35:20",
        pace: "5:30 /km",
        location: "Bromo Ultra Trail",
        date: "2024-07-14",
      },
      {
        distance: "100K Ultra",
        time: "9:45:30",
        pace: "5:51 /km",
        location: "Ultra Trail Indonesia",
        date: "2023-09-23",
      },
      {
        distance: "Marathon",
        time: "2:45:15",
        pace: "3:55 /km",
        location: "Jakarta Marathon",
        date: "2024-10-27",
      },
    ],
    weeklyMileage: "140-180 km",
    favoriteDistance: "50K-100K Ultra",
    achievements: [
      {
        title: "UTMB Finisher",
        year: "2023",
        description: "Completed Ultra-Trail du Mont-Blanc (UTMB)",
      },
      {
        title: "Indonesia Trail Champion",
        year: "2024",
        description: "Won Indonesian National Trail Running Championship",
      },
      {
        title: "100-Mile Finisher",
        year: "2022",
        description: "Completed first 100-mile ultra marathon",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/davidkim_trail",
        handle: "@davidkim_trail",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/davidkim",
        handle: "David Kim",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/davidruns",
        handle: "@davidruns",
      },
    ],
    favoriteGear: [
      "Hoka Speedgoat 5",
      "Suunto Vertical",
      "Black Diamond Trail Poles",
      "GPM-03 PHANTOM Running Jacket",
    ],
    runningPhilosophy:
      "The mountains are calling. Embrace the journey, not just the destination.",
    joinedDate: "2021-03-10",
  },
  {
    id: "tm-004",
    name: "Maya Putri",
    role: "NUTRITION COACH",
    specialty: "Sports Nutrition & Recovery",
    image: "/images/teams/team-1.png",
    bio: "Registered sports nutritionist and sub-3:00 marathoner. Helps athletes optimize their nutrition for peak performance and recovery.",
    location: "Jakarta, Indonesia",
    yearsRunning: 10,
    personalRecords: [
      {
        distance: "Half Marathon",
        time: "1:25:30",
        pace: "4:03 /km",
        location: "Jakarta Half Marathon",
        date: "2024-09-15",
      },
      {
        distance: "Marathon",
        time: "2:58:45",
        pace: "4:14 /km",
        location: "Berlin Marathon",
        date: "2023-09-24",
      },
    ],
    weeklyMileage: "90-110 km",
    favoriteDistance: "Marathon",
    achievements: [
      {
        title: "Sub-3:00 Marathon Club",
        year: "2023",
        description: "Achieved sub-3:00 marathon at Berlin Marathon",
      },
      {
        title: "Sports Nutritionist Certification",
        year: "2021",
        description: "Certified Sports Nutritionist (CISSN)",
      },
      {
        title: "Age Group Winner",
        year: "2024",
        description: "1st place in F30-34 at Jakarta Marathon",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/maya_runs_eats",
        handle: "@maya_runs_eats",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/mayaputri",
        handle: "Maya Putri",
      },
      {
        platform: "TikTok",
        url: "https://tiktok.com/@mayafitrun",
        handle: "@mayafitrun",
      },
    ],
    favoriteGear: [
      "Asics Metaspeed Sky+",
      "Garmin Fenix 7",
      "Hydrapak Speedster",
      "GPM-05 PULSE Running Tank",
    ],
    runningPhilosophy:
      "Fuel your body right, and it will take you places you never imagined.",
    joinedDate: "2021-07-01",
  },
  {
    id: "tm-005",
    name: "Ryan Foster",
    role: "STRENGTH COACH",
    specialty: "Injury Prevention & Strength",
    image: "/images/teams/team-1.png",
    bio: "Physical therapist and strength coach specializing in runner-specific training. Helps prevent injuries and build resilient athletes.",
    location: "Bali, Indonesia",
    yearsRunning: 14,
    personalRecords: [
      {
        distance: "5K",
        time: "17:20",
        pace: "3:28 /km",
        location: "Bali 5K",
        date: "2024-03-10",
      },
      {
        distance: "10K",
        time: "36:45",
        pace: "3:40 /km",
        location: "Ubud 10K",
        date: "2024-05-22",
      },
      {
        distance: "Half Marathon",
        time: "1:22:10",
        pace: "3:54 /km",
        location: "Bali Half Marathon",
        date: "2023-08-13",
      },
    ],
    weeklyMileage: "70-90 km",
    favoriteDistance: "10K",
    achievements: [
      {
        title: "Doctor of Physical Therapy",
        year: "2018",
        description: "DPT degree with specialization in sports medicine",
      },
      {
        title: "CSCS Certification",
        year: "2019",
        description: "Certified Strength & Conditioning Specialist",
      },
      {
        title: "Ironman Finisher",
        year: "2022",
        description: "Completed Ironman 70.3 Bali",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/ryan_runstrong",
        handle: "@ryan_runstrong",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/ryanfoster",
        handle: "Ryan Foster",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/@RunnerStrength",
        handle: "Runner Strength",
      },
    ],
    favoriteGear: [
      "Brooks Hyperion Elite 3",
      "Whoop 4.0",
      "Theragun PRO",
      "GPM-04 STEALTH Compression Tights",
    ],
    runningPhilosophy:
      "Strong runners are healthy runners. Build the body, build the performance.",
    joinedDate: "2020-11-05",
  },
  {
    id: "tm-006",
    name: "Lisa Anderson",
    role: "PACING STRATEGIST",
    specialty: "Race Strategy & Mental Training",
    image: "/images/teams/team-1.png",
    bio: "Sports psychologist and elite pacer. Expert in race-day strategy, mental preparation, and helping runners achieve their goals.",
    location: "Jakarta, Indonesia",
    yearsRunning: 13,
    personalRecords: [
      {
        distance: "Half Marathon",
        time: "1:20:30",
        pace: "3:49 /km",
        location: "Singapore Half Marathon",
        date: "2024-02-18",
      },
      {
        distance: "Marathon",
        time: "2:52:20",
        pace: "4:04 /km",
        location: "Chicago Marathon",
        date: "2023-10-08",
      },
    ],
    weeklyMileage: "100-120 km",
    favoriteDistance: "Marathon",
    achievements: [
      {
        title: "Official Marathon Pacer",
        year: "2022",
        description: "Certified pacer for major marathons (2:45-3:00)",
      },
      {
        title: "Sports Psychology MSc",
        year: "2020",
        description: "Master's degree in Sports & Exercise Psychology",
      },
      {
        title: "Chicago Marathon Pacer",
        year: "2023",
        description: "Successfully paced 2:55 group at Chicago Marathon",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/lisa_pace_perfect",
        handle: "@lisa_pace_perfect",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/lisaanderson",
        handle: "Lisa Anderson",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/lisapaces",
        handle: "@lisapaces",
      },
    ],
    favoriteGear: [
      "Saucony Endorphin Pro 3",
      "Garmin Forerunner 965",
      "Aftershokz OpenRun Pro",
      "GPM-01 VOID Running Tee",
    ],
    runningPhilosophy:
      "Trust your training, pace your race, believe in yourself. The finish line is waiting.",
    joinedDate: "2021-05-20",
  },
];
