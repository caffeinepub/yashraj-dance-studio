const HIGHLIGHTS = [
  { stat: "4.9★", label: "Rated Studio", color: "#00bcd4" },
  { stat: "70+", label: "Happy Clients", color: "#7c3aed" },
  { stat: "✓", label: "Beginner-Friendly Training", color: "#00bcd4" },
  { stat: "♀", label: "Women-Friendly & Inclusive", color: "#7c3aed" },
  { stat: "👶", label: "Kids-Friendly Environment", color: "#00bcd4" },
  { stat: "🏠", label: "Offline + Interactive Sessions", color: "#7c3aed" },
];

export default function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="py-20 md:py-24 relative"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(0,188,212,0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,188,212,0.1)",
              border: "1px solid rgba(0,188,212,0.2)",
              color: "#00bcd4",
            }}
          >
            Why Students Love Us
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            What Makes Us <span className="gradient-text">Special</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {HIGHLIGHTS.map(({ stat, label, color }) => (
            <div
              key={label}
              className="rounded-2xl p-5 text-center transition-smooth"
              style={{
                background: `${color}0a`,
                border: `1px solid ${color}25`,
              }}
              data-ocid="highlight-card"
            >
              <div
                className="text-3xl font-black font-display mb-2"
                style={{ color }}
              >
                {stat}
              </div>
              <p
                className="text-xs font-medium leading-snug"
                style={{ color: "#c0c0c0" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,188,212,0.3), transparent)",
        }}
      />
    </section>
  );
}
