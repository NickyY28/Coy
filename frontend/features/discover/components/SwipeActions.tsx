"use client";

type Props = {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
};

export function SwipeActions({ onPass, onLike, disabled }: Props) {
  return (
    <div className="swipe-actions" aria-label="Swipe actions">
      <button className="action-button pass" onClick={onPass} disabled={disabled} aria-label="Pass">✕</button>
      <button className="action-button like" onClick={onLike} disabled={disabled} aria-label="Like">♥</button>
    </div>
  );
}
