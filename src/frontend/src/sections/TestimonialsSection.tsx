import { Quote, Star } from "lucide-react";

interface Review {
  id: string;
  title: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: "r1",
    title: "Amazing experience!",
    comment:
      "I joined for wedding choreography and it turned out better than I imagined. The steps were simple, elegant, and easy to learn even for beginners. Highly recommend!",
  },
  {
    id: "r2",
    title: "Supportive and hardworking trainer",
    comment:
      "The trainer is extremely dedicated and makes sure everyone understands the steps. You never feel left out in the class.",
  },
  {
    id: "r3",
    title: "Perfect for beginners",
    comment:
      "I had zero dance experience, but the way everything is taught step-by-step made it super easy to follow. Now I actually enjoy dancing!",
  },
  {
    id: "r4",
    title: "Fun + fitness together",
    comment:
      "Zumba sessions are full of energy. It doesn't feel like a workout, but you still burn calories and feel great after every class.",
  },
  {
    id: "r5",
    title: "Great for kids too",
    comment:
      "My child attends the classes and absolutely loves them. The environment is friendly and encouraging.",
  },
];

function StarRow({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {["s1", "s2", "s3", "s4", "s5"].map((k) => (
        <Star key={k} size={size} fill="#fbbf24" color="#fbbf24" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 transition-smooth h-full"
      style={{
        backgroundColor: "#111111",
        border: "1px solid rgba(124,58,237,0.25)",
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
      data-ocid="review-card"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.border =
          "1px solid rgba(0,188,212,0.4)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 32px rgba(0,0,0,0.6), 0 0 24px rgba(0,188,212,0.1), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.border =
          "1px solid rgba(124,58,237,0.25)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)";
      }}
    >
      {/* Quote icon */}
      <Quote
        size={28}
        style={{
          color: "rgba(0,188,212,0.45)",
          flexShrink: 0,
        }}
      />

      {/* Review text */}
      <p
        className="text-sm leading-relaxed flex-1 italic"
        style={{ color: "#c0c0c0" }}
      >
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Footer: title + stars */}
      <div
        className="pt-4 flex items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span
          className="font-bold text-sm leading-snug"
          style={{ color: "#ffffff" }}
        >
          {review.title}
        </span>
        <StarRow size={13} />
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const firstRow = REVIEWS.slice(0, 3);
  const secondRow = REVIEWS.slice(3);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.35), rgba(0,188,212,0.35), transparent)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="text-center mb-4">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(124,58,237,0.12)",
              border: "1px solid rgba(124,58,237,0.25)",
              color: "#a78bfa",
            }}
          >
            REVIEWS &amp; TESTIMONIALS
          </div>
        </div>

        {/* Heading */}
        <h2
          className="section-heading text-center mb-8"
          style={{ color: "#ffffff" }}
        >
          What Students Say About{" "}
          <span className="gradient-text">Yashraj Dance Studio</span>
        </h2>

        {/* Overall rating badge */}
        <div className="flex flex-col items-center gap-3 mb-14">
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,188,212,0.07) 0%, rgba(124,58,237,0.07) 100%)",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow:
                "0 0 40px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            data-ocid="overall-rating-badge"
          >
            {/* Big rating number */}
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black font-display gradient-text leading-none">
                4.9
              </span>
              <span
                className="text-lg font-semibold mb-1"
                style={{ color: "#a0a0a0" }}
              >
                / 5
              </span>
            </div>

            {/* Divider on sm+ */}
            <div
              className="hidden sm:block w-px h-10 self-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />

            {/* Stars + count */}
            <div className="flex flex-col items-center sm:items-start gap-1">
              <StarRow size={22} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#e0e0e0" }}
              >
                ⭐ (70+ Reviews)
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="text-sm italic text-center max-w-md"
            style={{ color: "#8a8a8a" }}
          >
            What this really means: people consistently love the teaching style,
            energy, and comfort level here.
          </p>
        </div>

        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Second row: 2 cards centered */}
        <div className="flex flex-col md:flex-row justify-center gap-6 md:max-w-2xl lg:max-w-3xl mx-auto">
          {secondRow.map((review) => (
            <div key={review.id} className="flex-1 md:max-w-sm lg:max-w-md">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
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
