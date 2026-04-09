import { getPhotoUrl, useFacilitiesPhotos } from "@/hooks/useQueries";

const FACILITIES = [
  {
    id: "onsite",
    emoji: "🏫",
    title: "On-site Classes",
    desc: "In-person sessions at our studio in Tingre Nagar.",
  },
  {
    id: "online",
    emoji: "💻",
    title: "Online Classes Available",
    desc: "Optional virtual sessions for flexibility from home.",
  },
  {
    id: "payment",
    emoji: "📱",
    title: "Google Pay Accepted",
    desc: "Quick, convenient, and cashless payment accepted.",
  },
  {
    id: "clean",
    emoji: "🧹",
    title: "Clean & Safe Studio Space",
    desc: "Hygienic, well-maintained environment for all students.",
  },
  {
    id: "inclusive",
    emoji: "🚻",
    title: "Gender-Neutral Facilities",
    desc: "Inclusive and welcoming space for everyone.",
  },
];

export default function FacilitiesSection() {
  const { data: facilityPhotos, isLoading } = useFacilitiesPhotos();

  const sortedPhotos = facilityPhotos
    ? facilityPhotos
        .slice()
        .sort((a, b) => Number(a.displayOrder) - Number(b.displayOrder))
    : [];

  return (
    <section
      id="facilities"
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.2)",
              color: "#7c3aed",
            }}
          >
            Facilities
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Our <span className="gradient-text">Facilities</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            Everything you need for a great experience — from the moment you
            walk in.
          </p>
        </div>

        {/* Photo thumbnails grid — shown only when photos are uploaded */}
        {!isLoading && sortedPhotos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {sortedPhotos.map((photo) => (
              <div
                key={String(photo.id)}
                className="rounded-xl overflow-hidden transition-smooth group"
                style={{
                  aspectRatio: "4/3",
                  border: "1px solid #1f1f1f",
                }}
                data-ocid="facility-photo"
              >
                <img
                  src={getPhotoUrl(photo.storageRef)}
                  alt={photo.filename}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Loading skeleton for photos */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="rounded-xl animate-pulse"
                style={{
                  aspectRatio: "4/3",
                  background: "#1a1a1a",
                  border: "1px solid #1f1f1f",
                }}
              />
            ))}
          </div>
        )}

        {/* Facility feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {FACILITIES.map(({ id, emoji, title, desc }) => (
            <div
              key={id}
              className="rounded-2xl p-6 flex flex-col gap-4 items-center text-center transition-smooth"
              style={{
                backgroundColor: "#111111",
                border: "1px solid #1f1f1f",
              }}
              data-ocid="facility-card"
            >
              <span className="text-4xl" role="img" aria-hidden="true">
                {emoji}
              </span>
              <div>
                <h3
                  className="text-sm font-bold font-display mb-1"
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
