const APPROACH_POINTS = [
  {
    emoji: "📋",
    title: "Simple, easy-to-follow steps",
    desc: "Every move broken down so you can follow along from day one.",
  },
  {
    emoji: "🪜",
    title: "Step-by-step breakdown",
    desc: "Systematic progression so you build skills naturally over time.",
  },
  {
    emoji: "🤗",
    title: "Focus on comfort over perfection",
    desc: "We prioritize your confidence and enjoyment above strict technique.",
  },
  {
    emoji: "🎉",
    title: "Fun + engaging sessions",
    desc: "Classes are designed to energize you — never a dull moment on the floor.",
  },
  {
    emoji: "👁️",
    title: "Personal attention in every batch",
    desc: "Small groups ensure every student gets individual guidance and support.",
  },
];

export default function TeachingApproachSection() {
  return (
    <section
      id="teaching-approach"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,188,212,0.3), rgba(124,58,237,0.3), transparent)",
        }}
      />

      {/* Background orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,188,212,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.2)",
              color: "#7c3aed",
            }}
          >
            How We Teach
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Our Teaching <span className="gradient-text">Approach</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            Our teaching method is built around you — making every session
            approachable, effective, and genuinely enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {APPROACH_POINTS.map(({ emoji, title, desc }, idx) => (
            <div
              key={title}
              className="rounded-2xl p-6 flex flex-col gap-3 transition-smooth"
              style={{
                backgroundColor: "#111111",
                border:
                  idx % 2 === 0
                    ? "1px solid rgba(0,188,212,0.15)"
                    : "1px solid rgba(124,58,237,0.15)",
              }}
              data-ocid="approach-card"
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {emoji}
              </span>
              <h3
                className="text-sm font-bold font-display leading-snug"
                style={{ color: "#ffffff" }}
              >
                {title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#a0a0a0" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
      />
    </section>
  );
}
