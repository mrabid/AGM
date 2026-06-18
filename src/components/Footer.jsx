export function Footer() {
  return (
    <footer className="theme-border border-t py-6 sm:py-7">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="theme-text type-small font-semibold">Morshedul Islam</p>
          <p className="theme-muted type-caption">Brand Manager · Branding Strategist · Marketing Leader</p>
        </div>
        <p className="theme-muted type-caption">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
