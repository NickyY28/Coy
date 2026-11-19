"use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import type { Profile } from "@/features/discover/types/discover.types";

type Props = {
  profile: Profile;
  onSwipe: (action: "like" | "pass") => void;
};

export function ProfileCard({ profile, onSwipe }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const likeOpacity = useTransform(x, [20, 110], [0, 1]);
  const passOpacity = useTransform(x, [-110, -20], [1, 0]);

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x > 100) onSwipe("like");
    else if (info.offset.x < -100) onSwipe("pass");
  }

  return (
    <motion.article
      className="profile-card"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.94, opacity: 0, y: 18 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, x: x.get() > 0 ? 480 : -480, rotate: x.get() > 0 ? 18 : -18 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <motion.div className="swipe-label like-label" style={{ opacity: likeOpacity }}>LIKE</motion.div>
      <motion.div className="swipe-label pass-label" style={{ opacity: passOpacity }}>PASS</motion.div>
      <img src={profile.photo} alt={profile.name} draggable={false} />
      <div className="profile-gradient" />
      <div className="profile-info">
        <h2>{profile.name}, <span>{profile.age}</span></h2>
        <p className="profile-city">{profile.city}</p>
        <p className="profile-bio">{profile.bio}</p>
        <div className="interest-list">
          {profile.interests.map((interest) => <span key={interest}>{interest}</span>)}
        </div>
      </div>
    </motion.article>
  );
}
