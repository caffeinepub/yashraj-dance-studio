import { Award, MapPin, Star, Users } from "lucide-react";

const MILESTONES = [
  { icon: Star, label: "Rating", value: "4.9★", color: "#00bcd4" },
  { icon: Users, label: "Happy Clients", value: "70+", color: "#7c3aed" },
  { icon: Award, label: "Classes", value: "5", color: "#00bcd4" },
  {
    icon: MapPin,
    label: "Location",
    value: "Tingre Nagar, Pune",
    color: "#7c3aed",
  },
];

const WHY_CHOOSE = [
  "Beginner-friendly environment",
  "Personalized attention",
  "Focus on both fun and fitness",
  "Safe and inclusive space",
  "Community-driven learning",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#0d0d0d" }}
    >
      {/* Subtle accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,188,212,0.3), rgba(124,58,237,0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-2xl opacity-30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,188,212,0.15), rgba(124,58,237,0.15))",
                filter: "blur(30px)",
              }}
            />
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid #1f1f1f" }}
            >
              <img
                src="/assets/generated/studio-interior.dim_1200x800.jpg"
                alt="Yashraj Dance Studio interior"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "4/3" }}
              />
              <div
                className="absolute bottom-6 left-6 px-5 py-3 rounded-xl"
                style={{
                  background: "rgba(10,10,10,0.85)",
                  border: "1px solid rgba(0,188,212,0.25)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="text-2xl font-black font-display gradient-text">
                  4.9 ★
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#a0a0a0" }}>
                  Rated by 70+ Happy Students
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(0,188,212,0.1)",
                border: "1px solid rgba(0,188,212,0.2)",
                color: "#00bcd4",
              }}
            >
              About Us
            </div>
            <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
              Who We <span className="gradient-text">Are</span>
            </h2>
            <div
              className="space-y-4 text-base leading-relaxed"
              style={{ color: "#a0a0a0" }}
            >
              <p>
                Yashraj Dance Studio is a vibrant dance and fitness space in
                Pune designed for people of all ages and skill levels. Whether
                you want to learn dance, get fit, or prepare for a special
                performance, this is a space where you feel comfortable,
                confident, and inspired.
              </p>
              <p>
                Founded by{" "}
                <strong style={{ color: "#e0e0e0" }}>Bhakti Gill</strong>, our
                studio has grown into one of Tingre Nagar's most loved
                performing arts spaces.
              </p>
            </div>

            {/* Our Philosophy */}
            <div className="mt-8">
              <h3
                className="text-lg font-bold font-display mb-3"
                style={{ color: "#ffffff" }}
              >
                Our Philosophy
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#a0a0a0" }}
              >
                We believe dance is not just about steps—it's about expression,
                energy, and transformation. Every session is designed to make
                you feel stronger, happier, and more connected to yourself.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="mt-8">
              <h3
                className="text-lg font-bold font-display mb-4"
                style={{ color: "#ffffff" }}
              >
                Why Choose Us
              </h3>
              <div className="flex flex-wrap gap-2">
                {WHY_CHOOSE.map((val) => (
                  <span
                    key={val}
                    className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(0,188,212,0.08)",
                      border: "1px solid rgba(0,188,212,0.2)",
                      color: "#00bcd4",
                    }}
                  >
                    ✓ {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Milestones row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {MILESTONES.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="card-dark p-6 rounded-xl text-center transition-smooth"
              data-ocid="about-milestone"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div
                className="text-2xl font-black font-display mb-1"
                style={{ color }}
              >
                {value}
              </div>
              <div className="text-xs" style={{ color: "#a0a0a0" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(0,188,212,0.3), transparent)",
        }}
      />
    </section>
  );
}
