import { getPhotoUrl, useHeroPhotos } from "@/hooks/useQueries";
import { ChevronDown, Star } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const STATS = [
  { value: "4.9★", label: "Rated" },
  { value: "70+", label: "Clients" },
  { value: "5", label: "Classes" },
  { value: "Morning & Evening", label: "Batches" },
];

const FALLBACK_BG = "url('/assets/generated/hero-dance.dim_1920x1080.jpg')";

export default function HeroSection() {
  const { data: heroPhotos } = useHeroPhotos();

  const heroPhoto = heroPhotos && heroPhotos.length > 0 ? heroPhotos[0] : null;
  const bgImage = heroPhoto
    ? `url('${getPhotoUrl(heroPhoto.storageRef)}')`
    : FALLBACK_BG;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 transition-smooth"
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 40%, rgba(10,10,10,0.75) 80%, rgba(10,10,10,1) 100%)",
        }}
      />

      {/* Accent orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0,188,212,0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          transform: "translate(50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
          style={{
            background: "rgba(0,188,212,0.1)",
            border: "1px solid rgba(0,188,212,0.25)",
            color: "#00bcd4",
          }}
        >
          <Star size={12} fill="currentColor" />
          Pune&apos;s Premier Dance Academy
          <Star size={12} fill="currentColor" />
        </div>

        {/* Heading */}
        <h1
          className="font-display font-black mb-6 leading-tight tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          <span style={{ color: "#ffffff", display: "block" }}>
            Move Better.
          </span>
          <span className="gradient-text" style={{ display: "block" }}>
            Feel Stronger.
          </span>
          <span style={{ color: "#ffffff", display: "block" }}>
            Dance Freely.
          </span>
        </h1>

        <p
          className="max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Dance, fitness, and wellness—all in one space. From beginners to
          performers, we help you grow with confidence.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            type="button"
            className="btn-primary relative z-10 text-base"
            onClick={() => scrollTo("services")}
            data-ocid="hero-join-cta"
          >
            Join a Class
          </button>
          <button
            type="button"
            className="btn-outline text-base"
            onClick={() => scrollTo("contact")}
            data-ocid="hero-trial-cta"
          >
            Book Free Trial
          </button>
        </div>

        {/* Stats */}
        <div
          className="inline-flex flex-wrap items-center justify-center gap-8 md:gap-12 px-8 py-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-black font-display gradient-text"
                data-ocid="hero-stat"
              >
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#a0a0a0" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About section"
        style={{
          color: "rgba(255,255,255,0.4)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
