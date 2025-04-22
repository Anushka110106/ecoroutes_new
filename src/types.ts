export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredMiles: number;
  unlocked: boolean;
}

export interface UserStats {
  totalMiles: number;
  ecoMiles: number;
  carbonSaved: number;
  rank: number;
  achievements: Achievement[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  ecoMiles: number;
  rank: number;
}