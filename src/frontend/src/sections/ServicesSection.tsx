interface ServiceData {
  id: string;
  emoji: string;
  title: string;
  description: string;
  highlights: string[];
  badge: string;
  accent: "cyan" | "purple" | "gradient";
  image: string;
}

const SERVICES: ServiceData[] = [
  {
    id: "regular",
    emoji: "🎯",
    title: "Regular Dance Classes",
    description:
      "Structured dance training covering Bollywood, Freestyle, and Semi-classical basics with choreography-based learning. Best for beginners to intermediate dancers.",
    highlights: [
      "Bollywood & Freestyle",
      "Semi-classical basics",
      "Choreography-based learning",
      "Focus: Rhythm, coordination, confidence",
    ],
    badge: "All Levels",
    accent: "gradient",
    image: "/assets/generated/studio-interior.dim_1200x800.jpg",
  },
  {
    id: "zumba",
    emoji: "🔥",
    title: "Zumba Fitness",
    description:
      "High-energy cardio sessions that blend dance with fitness. Burns calories, boosts stamina, and makes working out feel like a party. Best for weight loss & fun workouts.",
    highlights: [
      "High-energy cardio sessions",
      "Dance-based workout",
      "Fat loss + stamina improvement",
      "Best for: Weight loss & fun",
    ],
    badge: "All Levels",
    accent: "cyan",
    image: "/assets/generated/aero-dance.dim_800x600.jpg",
  },
  {
    id: "yoga",
    emoji: "🧘",
    title: "Yoga & Wellness",
    description:
      "Mindful yoga practice to complement your fitness journey. Build flexibility, strength, and find mental calm. Best for mind-body balance.",
    highlights: [
      "Flexibility improvement",
      "Strength + balance",
      "Stress relief sessions",
      "Breathing & relaxation techniques",
    ],
    badge: "All Levels",
    accent: "purple",
    image: "/assets/generated/classical-dance.dim_800x600.jpg",
  },
  {
    id: "wedding",
    emoji: "💍",
    title: "Wedding Choreography",
    description:
      "Make your special day unforgettable with personalized wedding choreography. Couple dances, family performances, and Sangeet routines crafted for you.",
    highlights: [
      "Couple dances & family performances",
      "Sangeet & entry choreography",
      "Customized routines",
      "Song selection guidance",
    ],
    badge: "All Levels",
    accent: "gradient",
    image: "/assets/generated/bollywood-dance.dim_800x600.jpg",
  },
  {
    id: "kids",
    emoji: "👶",
    title: "Kids Dance Classes",
    description:
      "A fun, nurturing dance environment for kids and teens. Learn basic rhythm, movement, and build confidence through age-appropriate choreography.",
    highlights: [
      "Fun learning environment",
      "Basic rhythm & movement",
      "Confidence building",
      "Age Group: Kids & teens",
    ],
    badge: "Beginner",
    accent: "cyan",
    image: "/assets/generated/bollywood-dance.dim_800x600.jpg",
  },
];

const accentMap = {
  cyan: {
    border: "rgba(0,188,212,0.2)",
    dot: "#00bcd4",
    btnBg: "rgba(0,188,212,0.12)",
    btnColor: "#00bcd4",
  },
  purple: {
    border: "rgba(124,58,237,0.2)",
    dot: "#7c3aed",
    btnBg: "rgba(124,58,237,0.12)",
    btnColor: "#7c3aed",
  },
  gradient: {
    border: "rgba(124,58,237,0.2)",
    dot: "#00bcd4",
    btnBg:
      "linear-gradient(135deg, rgba(0,188,212,0.12), rgba(124,58,237,0.12))",
    btnColor: "#00bcd4",
  },
};

const badgeMap: Record<string, { bg: string; color: string }> = {
  "All Levels": { bg: "rgba(0,188,212,0.12)", color: "#00bcd4" },
  Beginner: { bg: "rgba(52,211,153,0.12)", color: "#34d399" },
};

function ServiceCard({ service }: { service: ServiceData }) {
  const accent = accentMap[service.accent];
  const badge = badgeMap[service.badge] ?? badgeMap["All Levels"];

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-smooth group"
      style={{
        backgroundColor: "#111111",
        border: `1px solid ${accent.border}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
      data-ocid="service-card"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(10,10,10,0.35)" }}
        >
          <span
            style={{ fontSize: "3rem" }}
            role="img"
            aria-label={service.title}
          >
            {service.emoji}
          </span>
        </div>
        <span
          className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(10,10,10,0.85)",
            color: badge.color,
            border: `1px solid ${badge.color}30`,
          }}
        >
          {service.badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3
          className="text-xl font-bold font-display mb-2"
          style={{ color: "#ffffff" }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-5 flex-1"
          style={{ color: "#a0a0a0" }}
        >
          {service.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-6">
          {service.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-xs"
              style={{ color: "#a0a0a0" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1"
                style={{ background: accent.dot }}
              />
              {h}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="w-full py-2.5 rounded-lg text-sm font-semibold transition-smooth"
          style={{
            background: accent.btnBg,
            color: accent.btnColor,
            border: `1px solid ${accent.border}`,
          }}
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          data-ocid="service-enroll-btn"
        >
          Enroll in This Class
        </button>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="py-24 md:py-32 relative"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,188,212,0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.2)",
              color: "#7c3aed",
            }}
          >
            Our Classes
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            What We <span className="gradient-text">Offer</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            From energetic Zumba to mindful Yoga, wedding choreography to kids
            classes—we have something for everyone.
          </p>
        </div>

        {/* Grid — 3-col lg layout for 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
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
