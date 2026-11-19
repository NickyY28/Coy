"use client";

import { useEffect, useState } from "react";
import { matchesService } from "@/features/matches/services/matches.service";
import type { Match } from "@/features/matches/types/matches.types";

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    matchesService.getMatches().then(setMatches).finally(() => setLoading(false));
  }, []);

  return { matches, loading };
}
