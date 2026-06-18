export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient-layer pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
      <div className="ambient-orb ambient-orb-4" />
      <div className="ambient-grid" />
    </div>
  );
}
