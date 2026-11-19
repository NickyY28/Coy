"use client";

import { MatchCard } from "@/features/matches/components/MatchCard";
import { useMatches } from "@/features/matches/hooks/useMatches";

export default function MatchesPage() {
  const { matches, loading } = useMatches();
  return (
    <section className="matches-page">
      <div className="page-heading"><p>Matches</p></div>
      {loading ? <div className="loading-state"><div className="spinner" /></div> :
        matches.length ? (
          <div className="matches-grid">{matches.map((match) => <MatchCard key={match.id} match={match} />)}</div>
        ) : (
          <div className="empty-state"><div className="empty-orb">♥</div><h2>No matches yet</h2><p>When you both like each other, they’ll appear here.</p></div>
        )}
    </section>
  );
}
