import { api } from "@/lib/api";
import type { Match } from "@/features/matches/types/matches.types";

export const matchesService = {
  getMatches: () => api<Match[]>("/matches")
};
