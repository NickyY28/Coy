"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useFeed } from "@/features/discover/hooks/useFeed";
import { useSwipe } from "@/features/discover/hooks/useSwipe";
import type { Profile } from "@/features/discover/types/discover.types";
import { EmptyState } from "@/features/discover/components/EmptyState";
import { ProfileCard } from "@/features/discover/components/ProfileCard";
import { SwipeActions } from "@/features/discover/components/SwipeActions";

export function SwipeContainer() {
  const { profiles, setProfiles, loading, error, reload } = useFeed();
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const { swipe, busy } = useSwipe((profile, matched) => {
    setProfiles((current) => current.filter((item) => item.id !== profile.id));
    if (matched) setMatchedProfile(profile);
  });

  async function handleSwipe(action: "like" | "pass") {
    const profile = profiles[0];
    if (!profile) return;
    await swipe(profile, action);
  }

  if (loading) return <div className="loading-state"><div className="spinner" /><p>Finding people...</p></div>;
  if (error) return <div className="empty-state"><h2>Couldn’t load Discover</h2><p>{error}</p><button className="secondary-button" onClick={reload}>Try again</button></div>;

  return (
    <>
      <div className="swipe-stage">
        <AnimatePresence mode="popLayout">
          {profiles[0] ? (
            <ProfileCard key={profiles[0].id} profile={profiles[0]} onSwipe={handleSwipe} />
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><EmptyState onReload={reload} /></motion.div>
          )}
        </AnimatePresence>
      </div>
      {profiles[0] && <SwipeActions onPass={() => handleSwipe("pass")} onLike={() => handleSwipe("like")} disabled={busy} />}

      <AnimatePresence>
        {matchedProfile && (
          <motion.div className="match-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="match-modal" initial={{ scale: 0.75, y: 30 }} animate={{ scale: 1, y: 0 }}>
              <div className="match-hearts">♥</div>
              <p className="match-kicker">It’s a match!</p>
              <img src={matchedProfile.photo} alt={matchedProfile.name} />
              <h2>You and {matchedProfile.name} liked each other</h2>
              <button className="primary-button" onClick={() => setMatchedProfile(null)}>Keep discovering</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
