export function EmptyState({ onReload }: { onReload: () => void }) {
  return (
    <div className="empty-state">
      <div className="empty-orb">✓</div>
      <h2>You’re all caught up</h2>
      <p>We’ll have more people to discover soon.</p>
      <button className="secondary-button" onClick={onReload}>Refresh feed</button>
    </div>
  );
}
