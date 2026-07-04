// Mock data for Lena Voss — resident at Haslangstraße, Ingolstadt
// Day 47 of a 180-day winter-semester stay

const RESIDENT = {
  firstName: "Lena",
  lastName: "Voss",
  initials: "LV",
  unit: "Studio 4B",
  floor: "4th floor",
  building: "Haslangstraße 12",
  city: "Ingolstadt",
  moveIn: "1 Oct 2025",
  moveOut: "31 Mar 2026",
  stayDay: 47,
  stayLength: 180,
  email: "lena.voss@thi.de",
  uni: "Technische Hochschule Ingolstadt",
  course: "MS User Experience Design",
};

const RENT = {
  amount: 549,
  currency: "EUR",
  dueDate: "1 Dec 2026",
  status: "paid",         // paid | due | overdue
  paidOn: "27 Nov 2026",
  method: "SEPA · DE89 ··· 4172",
  autopay: true,
  breakdown: [
    { k: "Base rent",      v: 489, kind: "Furnished studio · 28 m²" },
    { k: "Utilities",      v: 45, kind: "Heat, water, electric" },
    { k: "Internet",       v: 15, kind: "Wi-Fi 1 Gb · ethernet in room" },
    { k: "Community fund", v: 8,  kind: "Events, gym upkeep, lounge" },
    { k: "Cleaning",       v: 0,  kind: "Common spaces only · included" },
  ],
  history: [
    { month: "Aug", year: "26", state: "paid" },
    { month: "Sep", year: "26", state: "paid" },
    { month: "Oct", year: "26", state: "paid" },
    { month: "Nov", year: "26", state: "paid" },
    { month: "Dec", year: "26", state: "due" },
    { month: "Jan", year: "27", state: "future" },
    { month: "Feb", year: "27", state: "future" },
  ],
};

const PULSE = [
  { ic: "users-round", v: "47", lbl: "Online now", tone: "warm" },
  { ic: "coffee",      v: "12", suf: "min", lbl: "Lounge wait", tone: "cool" },
  { ic: "calendar",    v: "3",  lbl: "Events tonight", tone: "navy" },
];

const EVENTS = [
  {
    id: "lounge",
    kind: "lounge",
    when: "Tonight · 19:00",
    title: "Sunset wine pour in the lounge",
    place: "Ground floor lounge",
    host: "Mira & Jonas",
    going: 23,
    capacity: 40,
    desc: "Two Franconian whites, one Riesling, and Mira's playlist of Berlin disco. We pop the first bottle at 19:00 sharp — drop in whenever, leave whenever. Bring a glass if you have a favourite one upstairs.",
    blocks: ["Wine", "Music", "Free"],
  },
  {
    id: "run",
    kind: "run",
    when: "Tomorrow · 06:30",
    title: "Sunrise run along the Danube",
    place: "Meet at front desk",
    host: "Run club",
    going: 9,
    capacity: 20,
    desc: "An easy 5 K loop from Haslangstraße to Klenzepark and back along the river. Pace 5:30–6:00 / km, nobody dropped. Coffee at the front desk after.",
    blocks: ["5 K", "Easy", "Coffee after"],
  },
  {
    id: "movie",
    kind: "movie",
    when: "Sat · 21:00",
    title: "Movie night — Wes Anderson double",
    place: "Seminar room S2",
    host: "Theo",
    going: 14,
    capacity: 28,
    desc: "Grand Budapest Hotel followed by Asteroid City. Popcorn from the kitchen, projector dialled in last week. Pyjamas welcome.",
    blocks: ["Double feature", "Popcorn", "Cosy"],
  },
  {
    id: "kitchen",
    kind: "kitchen",
    when: "Sun · 13:00",
    title: "Pasta-from-scratch lunch",
    place: "Shared kitchen, 2F",
    host: "Carla",
    going: 8,
    capacity: 12,
    desc: "Carla learnt this from her nonna in Bologna and is teaching the rest of us. Bring an apron, leave with tagliatelle for the week.",
    blocks: ["€3 ingredient pot", "Bring apron"],
  },
  {
    id: "gym",
    kind: "gym",
    when: "Tue · 18:00",
    title: "Push-pull-legs together",
    place: "Fitness room, basement",
    host: "Adi",
    going: 6,
    capacity: 8,
    desc: "Three lifters running the same split. Spotters welcome. We trade form notes after.",
    blocks: ["Strength", "Spotters"],
  },
];

const ANNOUNCEMENTS = [
  {
    id: "a1",
    kind: "warm",
    icon: "bell",
    title: "Hot water back on for floors 3–5",
    sub: "Sorted at 14:20 · Sorry for the cold morning",
    time: "32m ago",
    unread: true,
    from: "Magda — Building manager",
    body:
      "The hot water on floors 3–5 is fully back. The valve we replaced this morning was the culprit. If anyone's still cold, ping me on the maintenance line and I'll come up and check your taps directly. Showers should be back to normal by tonight.",
  },
  {
    id: "a2",
    kind: "cool",
    icon: "package",
    title: "Two parcels at the front desk for you",
    sub: "DHL + Hermes · pick up by Friday",
    time: "2h ago",
    unread: true,
    from: "Front desk",
    body:
      "Two parcels arrived for you this afternoon. The desk is open until 22:00 today and from 07:00 tomorrow. If you can't make it before Friday, drop a note and we'll hold them in the office for another week.",
  },
  {
    id: "a3",
    kind: "ink",
    icon: "calendar",
    title: "Seminar room S2 closed Sat morning",
    sub: "Movie night still on Saturday evening",
    time: "Yesterday",
    unread: false,
    from: "Magda — Building manager",
    body:
      "Cleaning crew is doing a deep clean of S2 Saturday 08:00–14:00. The movie night Theo is hosting is still good for 21:00 — they'll be done well before then.",
  },
];

const FACILITIES = [
  { id: "gym",     name: "Fitness room", sub: "06–23 · 8 in",   open: "Open",   tone: "navy", ic: "dumbbell",     occ: [3,4,5,6,4,3] },
  { id: "lounge",  name: "Lounge & bar", sub: "17–01 · busy",   open: "Busy",   tone: "warm", ic: "coffee",       openClass: "busy", occ: [6,7,7,8,8,9] },
  { id: "seminar", name: "Seminar room", sub: "Open · 2 h max", open: "Open",   tone: "cool", ic: "presentation", occ: [1,2,1,3,2,2] },
  { id: "music",   name: "Music room",   sub: "Closes 22:00",   open: "Open",   tone: "navy", ic: "music",        occ: [0,1,1,2,1,0] },
];

const MATES = [
  { name: "Mira",   role: "4A · Next door",  init: "M",  state: "online", color: "linear-gradient(135deg,#ffb594,#e35418)" },
  { name: "Jonas",  role: "4C",              init: "J",  state: "online", color: "linear-gradient(135deg,#b3c5cb,#2c4953)" },
  { name: "Carla",  role: "2F · Kitchen",    init: "C",  state: "away",   color: "linear-gradient(135deg,#ffd2bc,#ff7236)" },
  { name: "Theo",   role: "3D",              init: "T",  state: "online", color: "linear-gradient(135deg,#dde4e7,#3a5f6b)" },
  { name: "Adi",    role: "Basement gym",    init: "A",  state: "off",    color: "linear-gradient(135deg,#ffb594,#e35418)" },
  { name: "Yui",    role: "4F",              init: "Y",  state: "away",   color: "linear-gradient(135deg,#dde4e7,#3a5f6b)" },
];

const MAINTENANCE_TYPES = [
  { id: "leak",     l: "Leak", ic: "droplet" },
  { id: "heat",     l: "Heat / cold", ic: "thermometer" },
  { id: "electric", l: "Electric", ic: "zap" },
  { id: "lock",     l: "Door / lock", ic: "lock" },
  { id: "wifi",     l: "Wi-Fi", ic: "wifi" },
  { id: "other",    l: "Other", ic: "wrench" },
];

window.DATA = { RESIDENT, RENT, PULSE, EVENTS, ANNOUNCEMENTS, FACILITIES, MATES, MAINTENANCE_TYPES };
