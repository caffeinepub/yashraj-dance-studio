import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const FOOTER_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    key: "instagram",
    href: "https://www.instagram.com/yashrajdancestudio/",
    label: "Follow us on Instagram",
    Icon: InstagramIcon,
  },
  {
    key: "whatsapp",
    href: "https://wa.me/919145793569",
    label: "Contact us on WhatsApp",
    Icon: WhatsAppIcon,
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
    >
      {/* Header */}
      <header
        data-ocid="nav"
        className="fixed top-0 left-0 right-0 z-50 transition-smooth"
        style={{
          backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          borderBottom: scrolled
            ? "1px solid #1f1f1f"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-3 flex-shrink-0"
              aria-label="Yashraj Dance Studio - Home"
            >
              <img
                src="/assets/yashraj-logo.png"
                alt="Yashraj Dance Studio"
                className="h-14 md:h-20 w-auto object-contain"
                style={{ filter: "brightness(1.1)" }}
              />
            </button>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="px-3 py-2 text-sm font-medium rounded-md transition-smooth nav-link"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+919145793569"
                className="hidden md:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-smooth"
                style={{
                  background: "linear-gradient(135deg, #00bcd4, #7c3aed)",
                  color: "#fff",
                }}
                data-ocid="nav-cta"
              >
                <Phone size={14} />
                Enroll Now
              </a>
              <button
                type="button"
                className="md:hidden p-2 rounded-lg transition-smooth"
                style={{ color: "#a0a0a0" }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                data-ocid="nav-hamburger"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="md:hidden"
            style={{
              backgroundColor: "rgba(10,10,10,0.98)",
              borderTop: "1px solid #1f1f1f",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    setTimeout(() => scrollTo(link.href), 100);
                  }}
                  className="px-4 py-3 text-sm font-medium rounded-lg transition-smooth nav-link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+919145793569"
                className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #00bcd4, #7c3aed)",
                  color: "#fff",
                }}
                data-ocid="nav-mobile-cta"
              >
                <Phone size={14} />
                Enroll Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer
        style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid #1f1f1f" }}
      >
        {/* Top Footer */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <img
                src="/assets/yashraj-logo.png"
                alt="Yashraj Dance Studio"
                className="h-24 w-auto object-contain mb-4"
              />
              <p
                className="text-sm leading-relaxed mb-4 max-w-xs"
                style={{ color: "#a0a0a0" }}
              >
                Pune's vibrant dance and fitness space — designed for all ages
                and skill levels. Dance, fitness, and wellness in one place.
              </p>
              <p className="text-xs mb-4" style={{ color: "#666" }}>
                Founded by{" "}
                <span style={{ color: "#e0e0e0", fontWeight: 600 }}>
                  Bhakti Gill
                </span>
              </p>
              <p className="text-xs mb-3" style={{ color: "#555" }}>
                Follow us:
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ key, href, label, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-smooth social-icon"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      color: "#a0a0a0",
                    }}
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "#00bcd4" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className="text-sm transition-smooth footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: "#7c3aed" }}
              >
                Contact Us
              </h4>
              <ul className="space-y-3 text-sm" style={{ color: "#a0a0a0" }}>
                <li>
                  <span
                    className="block font-medium"
                    style={{ color: "#ffffff" }}
                  >
                    Address
                  </span>
                  C-3, Gurumeher Niwas, Lane No. 5, Adarsh Colony, Tingre Nagar,
                  Pune – 411015
                </li>
                <li>
                  <span
                    className="block font-medium"
                    style={{ color: "#ffffff" }}
                  >
                    Phone
                  </span>
                  <a
                    href="tel:+919145793569"
                    className="hover:text-studio-cyan transition-smooth"
                  >
                    +91 91457 93569
                  </a>
                </li>
                <li>
                  <span
                    className="block font-medium"
                    style={{ color: "#ffffff" }}
                  >
                    Hours
                  </span>
                  Morning &amp; Evening Batches
                  <br />
                  Open till ~9 PM
                </li>
                <li>
                  <a
                    href="https://wa.me/919145793569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-smooth mt-1"
                    style={{
                      background: "rgba(0,188,212,0.1)",
                      border: "1px solid rgba(0,188,212,0.2)",
                      color: "#00bcd4",
                    }}
                  >
                    <MessageCircle size={12} />
                    WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #1a1a1a" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "#555" }}>
              © {new Date().getFullYear()} YASHRAJ DANCE STUDIO. All rights
              reserved.
            </p>
            <p className="text-xs" style={{ color: "#555" }}>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-smooth caffeine-link"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
