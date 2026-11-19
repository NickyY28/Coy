"use client";

import { useCallback, useEffect, useState } from "react";
import { discoverService } from "@/features/discover/services/discover.service";
import type { Profile } from "@/features/discover/types/discover.types";

export function useFeed() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setProfiles(await discoverService.getFeed());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void reload(); }, [reload]);

  return { profiles, setProfiles, loading, error, reload };
}
