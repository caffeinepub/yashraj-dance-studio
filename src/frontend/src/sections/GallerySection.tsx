import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
}

const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: "/assets/generated/hero-dance.dim_1920x1080.jpg",
    alt: "Dance class session at Yashraj Dance Studio",
    caption: "Regular Class Session",
    category: "class-sessions",
  },
  {
    id: "g2",
    src: "/assets/generated/aero-dance.dim_800x600.jpg",
    alt: "Zumba fitness session",
    caption: "Zumba Fitness",
    category: "zumba",
  },
  {
    id: "g3",
    src: "/assets/generated/bollywood-dance.dim_800x600.jpg",
    alt: "Wedding choreography rehearsal",
    caption: "Wedding Choreography",
    category: "wedding-choreography",
  },
  {
    id: "g4",
    src: "/assets/generated/classical-dance.dim_800x600.jpg",
    alt: "Kids dance class",
    caption: "Kids Dance Class",
    category: "kids-classes",
  },
  {
    id: "g5",
    src: "/assets/generated/studio-interior.dim_1200x800.jpg",
    alt: "Yashraj Dance Studio interior",
    caption: "Studio Space",
    category: "studio",
  },
  {
    id: "g6",
    src: "/assets/generated/hiphop-dance.dim_800x600.jpg",
    alt: "Performance and choreography session",
    caption: "Class Session",
    category: "class-sessions",
  },
];

type GalleryCategory =
  | "class-sessions"
  | "zumba"
  | "wedding-choreography"
  | "kids-classes"
  | "studio";

const CATEGORIES: Array<{ value: "all" | GalleryCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "class-sessions", label: "Class Sessions" },
  { value: "zumba", label: "Zumba" },
  { value: "wedding-choreography", label: "Wedding Choreography" },
  { value: "kids-classes", label: "Kids Classes" },
  { value: "studio", label: "Studio" },
];

export default function GallerySection() {
  const [filter, setFilter] = useState<"all" | GalleryCategory>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    filter === "all" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft")
        setLightboxIdx((i) =>
          i !== null ? (i - 1 + filtered.length) % filtered.length : 0,
        );
      if (e.key === "ArrowRight")
        setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : 0));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx, filtered.length]);

  function prev() {
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : 0,
    );
  }
  function next() {
    setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : 0));
  }

  const active = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <section
      id="gallery"
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,188,212,0.1)",
              border: "1px solid rgba(0,188,212,0.2)",
              color: "#00bcd4",
            }}
          >
            Gallery
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Moments of <span className="gradient-text">Magic</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            A glimpse into our classes, sessions, and the studio where the magic
            happens.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-smooth"
              style={
                filter === value
                  ? {
                      background: "linear-gradient(135deg, #00bcd4, #7c3aed)",
                      color: "#fff",
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                      color: "#a0a0a0",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }
              }
              data-ocid="gallery-filter"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className="relative group rounded-xl overflow-hidden transition-smooth cursor-pointer text-left"
              style={{ aspectRatio: "4/3", border: "1px solid #1f1f1f" }}
              onClick={() => setLightboxIdx(idx)}
              aria-label={`View ${item.alt}`}
              data-ocid="gallery-item"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-smooth group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-smooth"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,10,10,0.85) 0%, transparent 60%)",
                }}
              >
                <p className="text-sm font-medium" style={{ color: "#ffffff" }}>
                  {item.caption}
                </p>
                <span
                  className="text-xs mt-1 px-2 py-0.5 rounded-full w-fit"
                  style={{
                    background: "rgba(0,188,212,0.2)",
                    color: "#00bcd4",
                  }}
                >
                  {CATEGORIES.find((c) => c.value === item.category)?.label ??
                    item.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <dialog
          className="fixed inset-0 z-50 flex items-center justify-center p-4 m-0 max-w-none w-full h-full"
          style={{
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(10px)",
          }}
          open
          aria-label="Image lightbox"
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-smooth"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            onClick={() => setLightboxIdx(null)}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-smooth"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-smooth"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
          <div className="max-w-4xl w-full mx-16">
            <img
              src={active.src}
              alt={active.alt}
              className="w-full rounded-xl"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
            />
            {active.caption && (
              <p
                className="text-center mt-4 text-sm"
                style={{ color: "#a0a0a0" }}
              >
                {active.caption}
              </p>
            )}
          </div>
        </dialog>
      )}

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
