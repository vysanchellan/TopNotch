function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
    </svg>
  );
}

const links = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-border py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <img
          src="https://i.ibb.co/8gydjndn/Screenshot-10-6-2026-14054-www-facebook-com.jpg"
          alt="Top Notch Creations"
          className="h-10 w-auto object-contain mx-auto mb-3"
        />
        <p className="text-sm text-white font-display">
          Top Notch Creations &amp; Mobile Homes
        </p>
        <p className="text-xs text-text-muted mt-1 mb-6">
          &copy; 2025 Top Notch Creations. All rights reserved.
          <br />
          Cape Town, South Africa
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-text-muted hover:text-gold-light transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="https://www.facebook.com/Kitchens.TopNotchKitchens.flooring.cupboards"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gold-light transition-colors mb-8"
        >
          <FacebookIcon className="w-4 h-4" />
          <span className="text-xs">Facebook</span>
        </a>

        <div className="border-t border-brand-border pt-6 mt-6">
          <p className="text-[11px] text-text-muted">
            Built with ♥ by kassora-tech
          </p>
        </div>
      </div>
    </footer>
  );
}
