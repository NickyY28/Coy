"use client";

import { motion } from "framer-motion";
import type { Match } from "@/features/matches/types/matches.types";

export function MatchModal({ match, onClose }: { match: Match; onClose: () => void }) {
  return (
    <motion.div className="match-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="match-modal" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
        <div className="match-hearts">♥</div>
        <p className="match-kicker">It’s a match!</p>
        <img src={match.photo} alt={match.name} />
        <h2>You and {match.name} liked each other</h2>
        <button className="primary-button" onClick={onClose}>Close</button>
      </motion.div>
    </motion.div>
  );
}
