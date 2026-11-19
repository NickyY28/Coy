import type { Match } from "@/features/matches/types/matches.types";

export function MatchCard({ match }: { match: Match }) {
  return (
    <article className="match-card">
      <img src={match.photo} alt={match.name} />
      <div>
        <h3>{match.name}, {match.age}</h3>
        <p>{match.city}</p>
      </div>
    </article>
  );
}
