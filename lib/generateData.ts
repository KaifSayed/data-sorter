import { User } from '../types';

const CITIES = [
  'New York', 'London', 'Tokyo', 'Sydney', 'Berlin',
  'Toronto', 'Mumbai', 'São Paulo', 'Dubai', 'Singapore',
  'Paris', 'Seoul', 'Chicago', 'Amsterdam', 'Stockholm',
  'Melbourne', 'Barcelona', 'Zurich', 'Austin', 'Dublin',
];

const STATUSES: User['status'][] = ['active', 'inactive', 'pending'];

const FIRST_NAMES = [
  'James', 'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 'Ethan', 'Ava',
  'Lucas', 'Mia', 'Mason', 'Isabella', 'Logan', 'Charlotte', 'Alexander',
  'Amelia', 'Benjamin', 'Harper', 'Daniel', 'Evelyn', 'Henry', 'Abigail',
  'Sebastian', 'Emily', 'Jack', 'Ella', 'Owen', 'Scarlett', 'Samuel', 'Grace',
  'Ryan', 'Chloe', 'Nathan', 'Victoria', 'Leo', 'Riley', 'Adam', 'Aria',
  'Aaron', 'Lily', 'Charles', 'Zoe', 'Eli', 'Nora', 'Ian', 'Hannah',
  'Caleb', 'Layla', 'Dylan', 'Stella',
];

const LAST_NAMES = [
  'Anderson', 'Chen', 'Williams', 'Müller', 'Patel', 'Garcia', 'Tanaka',
  'Kim', 'Johansson', 'Silva', 'Brown', 'Nakamura', 'Novak', 'Dubois',
  'Jensen', 'Santos', 'Kowalski', 'Ivanova', 'Schmidt', 'O\'Brien',
];

const COMPANIES = [
  'Quantum Dynamics', 'NovaTech Solutions', 'Apex Analytics', 'CloudForge Inc',
  'DataStream Labs', 'Zenith Software', 'PulsePoint AI', 'Vertex Systems',
  'EchoWave Digital', 'Catalyst Corp', 'BlueShift IO', 'Ironclad Tech',
  'Prism Networks', 'Helix Innovations', 'ArcLight Group',
];

const DOMAINS = [
  'quantum.io', 'novatech.com', 'apex-analytics.co', 'cloudforge.dev',
  'datastream.io', 'zenithsoft.com', 'pulsepoint.ai', 'vertexsys.net',
  'echowave.digital', 'catalyst.co', 'blueshift.io', 'ironclad.tech',
  'prism-networks.com', 'helixinnovations.dev', 'arclight.group',
];

/**
 * Simple seeded pseudo-random number generator (mulberry32).
 * Ensures deterministic output across renders/builds.
 */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function formatPhone(rand: () => number): string {
  const area = Math.floor(rand() * 900 + 100);
  const mid = Math.floor(rand() * 900 + 100);
  const last = Math.floor(rand() * 9000 + 1000);
  return `(${area}) ${mid}-${last}`;
}

/**
 * Generates `count` deterministic mock users.
 * Uses seed users from the API as the base for the first 10,
 * then generates the rest synthetically.
 */
export function generateUsers(seedUsers: User[], count: number = 500): User[] {
  const rand = seededRandom(42);
  const users: User[] = [];

  // First, normalize the seed users to include status and city
  for (let i = 0; i < seedUsers.length; i++) {
    users.push({
      ...seedUsers[i],
      address: seedUsers[i].address ?? { city: CITIES[i % CITIES.length] },
      status: STATUSES[i % STATUSES.length],
    });
  }

  // Generate remaining users
  for (let i = seedUsers.length; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
    const companyIdx = Math.floor(rand() * COMPANIES.length);

    users.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(rand() * 99)}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${DOMAINS[companyIdx]}`,
      phone: formatPhone(rand),
      website: DOMAINS[companyIdx],
      company: { name: COMPANIES[companyIdx] },
      address: { city: CITIES[Math.floor(rand() * CITIES.length)] },
      status: STATUSES[Math.floor(rand() * STATUSES.length)],
    });
  }

  return users;
}
