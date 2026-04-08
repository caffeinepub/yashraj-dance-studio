const AUDIENCE = [
  { emoji: "🌱", label: "Absolute beginners" },
  { emoji: "💪", label: "Fitness enthusiasts" },
  { emoji: "👧", label: "Kids & teens" },
  { emoji: "💼", label: "Working professionals" },
  { emoji: "💍", label: "Couples preparing for weddings" },
  { emoji: "✨", label: "Anyone who wants to feel more confident" },
];

export default function WhoItsForSection() {
  return (
    <section
      id="who-its-for"
      className="py-20 md:py-28 relative"
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,188,212,0.1)",
              border: "1px solid rgba(0,188,212,0.2)",
              color: "#00bcd4",
            }}
          >
            For Everyone
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Who It&apos;s <span className="gradient-text">For</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            Our studio welcomes people from all walks of life. No experience
            needed — just a desire to move and grow.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {AUDIENCE.map(({ emoji, label }) => (
            <div
              key={label}
              className="rounded-2xl p-5 flex flex-col items-center text-center gap-3 transition-smooth group"
              style={{
                backgroundColor: "#111111",
                border: "1px solid #1f1f1f",
              }}
              data-ocid="audience-card"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {emoji}
              </span>
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
