import { api } from "@/lib/api";
import type { Profile } from "@/features/discover/types/discover.types";

export const discoverService = {
  getFeed: () => api<Profile[]>("/feed"),
  swipe: (profileId: string, action: "like" | "pass") =>
    api<{ matched: boolean }>("/swipe", {
      method: "POST",
      body: JSON.stringify({ profileId, action })
    })
};
