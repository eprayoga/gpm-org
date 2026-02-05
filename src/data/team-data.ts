import { TeamMember } from "@/types/team.type";

export const teamData: TeamMember[] = [
  {
    id: "tm-001",
    name: "MUHAMMAD IRHAM ABDUL GHANI",
    role: "TECHNICAL PERFORMANCE",
    specialty: "Speed & Endurance",
    image: "/images/teams/irham.png",
    bio: "Street-born speedster with a technical eye. Known for pushing limits in urban environments and turning the city into a personal training ground.",
    location: "Jakarta, Indonesia",
    yearsRunning: 12,
    personalRecords: [
      {
        distance: "5K",
        time: "16:45",
        pace: "3:21 /km",
        location: "Jakarta Street Series",
        date: "2024-05-12",
      },
      {
        distance: "10K",
        time: "35:20",
        pace: "3:32 /km",
        location: "Urban Night Run",
        date: "2024-07-20",
      },
      {
        distance: "Half Marathon",
        time: "1:18:30",
        pace: "3:43 /km",
        location: "Jakarta Half",
        date: "2024-09-15",
      },
    ],
    weeklyMileage: "80-100 km",
    favoriteDistance: "10K",
    achievements: [
      {
        title: "Fastest Street Runner",
        year: "2024",
        description: "Record holder for Jakarta's urban circuit",
      },
      {
        title: "Night Run Champion",
        year: "2023",
        description: "Winner of Jakarta Midnight Marathon",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/irham_ajoknalpot",
        handle: "@irham_ajoknalpot",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/irham",
        handle: "Irham AK",
      },
    ],
    favoriteGear: [
      "Nike Alphafly 3",
      "Garmin Fenix 7",
      "GPM-01 VOID Running Tee",
      "Oakley Radar EV",
    ],
    runningPhilosophy:
      "Speed is a byproduct of silence. In the concrete labyrinth, the quietest move is often the fastest.",
    joinedDate: "2020-03-10",
  },
  {
    id: "tm-003",
    name: "DIAS RESTUYALI RIZQI",
    role: "ENDURANCE SPECIALIST",
    specialty: "Marathon & Ultra",
    image: "/images/teams/dias.png",
    bio: "The silent warrior of long distances. Dias thrives where others fade, turning impossible distances into daily routines.",
    location: "Bandung, Indonesia",
    yearsRunning: 15,
    personalRecords: [
      {
        distance: "5K",
        time: "17:20",
        pace: "3:28 /km",
        location: "Bandung Speed Run",
        date: "2024-03-15",
      },
      {
        distance: "10K",
        time: "36:45",
        pace: "3:40 /km",
        location: "Bandung 10K",
        date: "2024-05-20",
      },
      {
        distance: "Half Marathon",
        time: "1:20:15",
        pace: "3:48 /km",
        location: "Jakarta Half Marathon",
        date: "2024-07-14",
      },
      {
        distance: "Marathon",
        time: "2:52:30",
        pace: "4:05 /km",
        location: "Singapore Marathon",
        date: "2023-12-03",
      },
    ],
    weeklyMileage: "100-120 km",
    favoriteDistance: "Marathon",
    achievements: [
      {
        title: "Ultra Marathon Finisher",
        year: "2024",
        description: "Completed 100K Ultra in under 10 hours",
      },
      {
        title: "Marathon Sub-3 Club",
        year: "2023",
        description: "Achieved sub-3 hour marathon",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/dias_phantom",
        handle: "@dias_phantom",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/diasphantom",
        handle: "Dias Phantom",
      },
    ],
    favoriteGear: [
      "ASICS Metaspeed Sky+",
      "Coros Pace 3",
      "GPM Endurance Tank",
      "Nathan Hydration Belt",
    ],
    runningPhilosophy:
      "Distance is just a number. The mind breaks before the body ever will.",
    joinedDate: "2019-08-05",
  },
  {
    id: "tm-002",
    name: "DHEA RIZKIA MAYANDARI",
    role: "URBAN EXPLORATION",
    specialty: "Trail & City Routes",
    image: "/images/teams/dhea.png",
    bio: "Explorer at heart, runner by passion. Dhea maps the city's hidden routes and transforms overlooked spaces into running havens.",
    location: "Jakarta, Indonesia",
    yearsRunning: 10,
    personalRecords: [
      {
        distance: "5K",
        time: "18:15",
        pace: "3:39 /km",
        location: "City Trail Challenge",
        date: "2024-04-08",
      },
      {
        distance: "10K",
        time: "38:50",
        pace: "3:53 /km",
        location: "Jakarta Urban Trail",
        date: "2024-06-22",
      },
      {
        distance: "Half Marathon",
        time: "1:25:40",
        pace: "4:04 /km",
        location: "Bandung Trail Half",
        date: "2024-08-11",
      },
    ],
    weeklyMileage: "60-80 km",
    favoriteDistance: "Trail 10K",
    achievements: [
      {
        title: "Route Pioneer Award",
        year: "2024",
        description: "Discovered 15+ new running routes in Jakarta",
      },
      {
        title: "Trail Explorer Champion",
        year: "2023",
        description: "Top finisher in Urban Trail Series",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/dhea_shift",
        handle: "@dhea_shift",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/dheashift",
        handle: "Dhea Shift",
      },
    ],
    favoriteGear: [
      "Hoka Speedgoat 5",
      "Garmin Forerunner 955",
      "GPM Trail Series Cap",
      "Salomon Hydration Vest",
    ],
    runningPhilosophy:
      "The city is a canvas. Every street, alley, and hidden path tells a story waiting to be run.",
    joinedDate: "2020-06-20",
  },
  {
    id: "tm-004",
    name: "FACHIRA ADILA PERMATASARI",
    role: "SPRINT COACH",
    specialty: "Speed Training & Intervals",
    image: "/images/teams/fachira.png",
    bio: "Fire on the track, precision in training. Fachira brings explosive energy to every session and pushes the team to new limits.",
    location: "Jakarta, Indonesia",
    yearsRunning: 8,
    personalRecords: [
      {
        distance: "5K",
        time: "17:55",
        pace: "3:35 /km",
        location: "Jakarta Speed Challenge",
        date: "2024-06-10",
      },
      {
        distance: "10K",
        time: "37:20",
        pace: "3:44 /km",
        location: "Speed Runners 10K",
        date: "2024-08-25",
      },
      {
        distance: "Half Marathon",
        time: "1:22:45",
        pace: "3:55 /km",
        location: "Surabaya Half",
        date: "2024-10-05",
      },
    ],
    weeklyMileage: "70-90 km",
    favoriteDistance: "5K",
    achievements: [
      {
        title: "Track & Field Coach Certification",
        year: "2023",
        description: "Certified Sprint and Interval Coach",
      },
      {
        title: "Jakarta 5K Record",
        year: "2024",
        description: "Women's 5K record holder",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/fachira_blaze",
        handle: "@fachira_blaze",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/fachirablaze",
        handle: "Fachira Blaze",
      },
    ],
    favoriteGear: [
      "Nike Dragonfly",
      "Garmin Forerunner 265",
      "GPM Speed Series Shorts",
      "Oakley Sutro Lite",
    ],
    runningPhilosophy:
      "Explosiveness is trained, not born. Every sprint is a chance to redefine your limits.",
    joinedDate: "2021-02-14",
  },
  {
    id: "tm-005",
    name: "FIRLY FAUZIA HERMAPUTRA",
    role: "RECOVERY SPECIALIST",
    specialty: "Injury Prevention & Mobility",
    image: "/images/teams/firly.png",
    bio: "The invisible force behind every great run. Firly ensures the team stays healthy, mobile, and ready for whatever comes next.",
    location: "Jakarta, Indonesia",
    yearsRunning: 11,
    personalRecords: [
      {
        distance: "5K",
        time: "18:40",
        pace: "3:44 /km",
        location: "Recovery Run Series",
        date: "2024-04-20",
      },
      {
        distance: "10K",
        time: "39:15",
        pace: "3:55 /km",
        location: "Jakarta Easy Run",
        date: "2024-07-08",
      },
      {
        distance: "Half Marathon",
        time: "1:28:00",
        pace: "4:10 /km",
        location: "Bali Half Marathon",
        date: "2024-09-22",
      },
    ],
    weeklyMileage: "50-70 km",
    favoriteDistance: "Easy 10K",
    achievements: [
      {
        title: "Sports Physiotherapy Certified",
        year: "2022",
        description: "Licensed sports injury prevention specialist",
      },
      {
        title: "Mobility Master",
        year: "2023",
        description: "Advanced certification in runner mobility",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/firly_ghost",
        handle: "@firly_ghost",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/firlyghost",
        handle: "Firly Ghost",
      },
    ],
    favoriteGear: [
      "Hoka Clifton 9",
      "Whoop Recovery Band",
      "GPM Recovery Hoodie",
      "Hyperice Massage Gun",
    ],
    runningPhilosophy:
      "The best run is the one you can repeat tomorrow. Recovery isn't rest—it's preparation.",
    joinedDate: "2020-11-18",
  },
  {
    id: "tm-006",
    name: "NILAM AULIYAH",
    role: "COMMUNITY BUILDER",
    specialty: "Group Runs & Events",
    image: "/images/teams/nilam.png",
    bio: "The heartbeat of GPM. Nilam brings runners together, creates unforgettable experiences, and builds the culture that defines us.",
    location: "Jakarta, Indonesia",
    yearsRunning: 9,
    personalRecords: [
      {
        distance: "5K",
        time: "19:10",
        pace: "3:50 /km",
        location: "Community Run Fest",
        date: "2024-05-18",
      },
      {
        distance: "10K",
        time: "40:25",
        pace: "4:02 /km",
        location: "Jakarta Social Run",
        date: "2024-07-30",
      },
      {
        distance: "Half Marathon",
        time: "1:30:15",
        pace: "4:16 /km",
        location: "Yogyakarta Half",
        date: "2024-09-10",
      },
    ],
    weeklyMileage: "60-75 km",
    favoriteDistance: "Social 10K",
    achievements: [
      {
        title: "Event Organizer of the Year",
        year: "2024",
        description: "Organized 20+ successful group runs",
      },
      {
        title: "Community Leader Award",
        year: "2023",
        description: "Built Jakarta's largest running community",
      },
    ],
    socials: [
      {
        platform: "Instagram",
        url: "https://instagram.com/nilam_stride",
        handle: "@nilam_stride",
      },
      {
        platform: "Strava",
        url: "https://strava.com/athletes/nilamstride",
        handle: "Nilam Stride",
      },
    ],
    favoriteGear: [
      "Brooks Ghost 15",
      "Garmin Forerunner 255",
      "GPM Community Crew Tee",
      "Nathan SpeedDraw Flask",
    ],
    runningPhilosophy:
      "Running alone is training. Running together is living. The crew makes the difference.",
    joinedDate: "2021-04-22",
  },
];
