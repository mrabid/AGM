export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-white">Morshedul Islam</p>
          <p className="text-xs text-accent-smoke">Brand Manager · Branding Strategist · Marketing Leader</p>
        </div>
        <p className="text-xs text-accent-smoke">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
