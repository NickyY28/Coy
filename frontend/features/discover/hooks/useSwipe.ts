"use client";

import { useState } from "react";
import { discoverService } from "@/features/discover/services/discover.service";
import type { Profile } from "@/features/discover/types/discover.types";

export function useSwipe(onComplete: (profile: Profile, matched: boolean) => void) {
  const [busy, setBusy] = useState(false);

  async function swipe(profile: Profile, action: "like" | "pass") {
    if (busy) return;
    setBusy(true);
    try {
      const result = await discoverService.swipe(profile.id, action);
      onComplete(profile, result.matched);
    } finally {
      setBusy(false);
    }
  }

  return { swipe, busy };
}
