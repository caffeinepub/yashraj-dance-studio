import { Clock, Instagram, MapPin, Phone } from "lucide-react";

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    values: ["+91 91457 93569"],
    color: "#00bcd4",
    href: "tel:+919145793569",
  },
  {
    icon: MapPin,
    label: "Address",
    values: [
      "C-3, Gurumeher Niwas,",
      "Lane No. 5, Adarsh Colony,",
      "Tingre Nagar, Pune – 411015",
    ],
    color: "#7c3aed",
    href: "https://maps.google.com/?q=Yashraj+Dance+Studio+Tingre+Nagar+Pune",
  },
  {
    icon: Clock,
    label: "Studio Hours",
    values: ["Morning & Evening Batches", "Open till ~9 PM"],
    color: "#00bcd4",
    href: null,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,188,212,0.3), rgba(124,58,237,0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,188,212,0.1)",
              border: "1px solid rgba(0,188,212,0.2)",
              color: "#00bcd4",
            }}
          >
            Find Us
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Visit <span className="gradient-text">Yashraj Dance Studio</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            Come visit us at our studio in Tingre Nagar, Pune. We'd love to show
            you around and let you try a free trial class.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Contact info */}
          <div className="space-y-5">
            {CONTACT_ITEMS.map(({ icon: Icon, label, values, color, href }) => (
              <div
                key={label}
                className="rounded-xl p-5 flex gap-4 items-start transition-smooth"
                style={{
                  backgroundColor: "#111111",
                  border: "1px solid #1f1f1f",
                }}
                data-ocid="contact-info-item"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "#555" }}
                  >
                    {label}
                  </div>
                  {values.map((v, i) =>
                    href && i === 0 ? (
                      <a
                        key={v}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="block text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: "#ffffff" }}
                      >
                        {v}
                      </a>
                    ) : (
                      <p
                        key={v}
                        className="text-sm"
                        style={{ color: i === 0 ? "#ffffff" : "#a0a0a0" }}
                      >
                        {v}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}

            {/* Instagram follow link */}
            <a
              href="https://www.instagram.com/yashrajdancestudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-4 flex gap-3 items-center transition-smooth group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,188,212,0.08), rgba(124,58,237,0.08))",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
              data-ocid="contact-instagram-link"
            >
              <Instagram
                size={20}
                style={{ color: "#00bcd4", flexShrink: 0 }}
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#fff" }}>
                  Follow us on Instagram
                </p>
                <p className="text-xs" style={{ color: "#a0a0a0" }}>
                  @yashrajdancestudio
                </p>
              </div>
            </a>
          </div>

          {/* Map embed */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid #1f1f1f", minHeight: "360px" }}
          >
            <iframe
              title="Yashraj Dance Studio Location"
              src="https://maps.google.com/maps?q=Yashraj+Dance+Studio+Tingre+Nagar+Pune+411015&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(0.85) hue-rotate(180deg)",
                display: "block",
                minHeight: "360px",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
