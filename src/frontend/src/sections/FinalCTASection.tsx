import { MessageCircle } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function FinalCTASection() {
  return (
    <section id="cta" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,188,212,0.12) 0%, rgba(124,58,237,0.18) 50%, rgba(0,188,212,0.1) 100%)",
          backgroundColor: "#080810",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,188,212,0.5), rgba(124,58,237,0.5), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(0,188,212,0.4), transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
          style={{
            background: "rgba(0,188,212,0.1)",
            border: "1px solid rgba(0,188,212,0.25)",
            color: "#00bcd4",
          }}
        >
          Start Today
        </div>

        <h2
          className="font-display font-black mb-5 leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#ffffff" }}
        >
          Ready to start your{" "}
          <span className="gradient-text">dance journey?</span>
        </h2>

        <p
          className="max-w-xl mx-auto text-lg mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Take the first step — join a free trial class today and discover why
          students love Yashraj Dance Studio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="btn-primary text-base relative z-10"
            onClick={() => scrollTo("contact")}
            data-ocid="cta-book-trial"
          >
            Book a Trial Class
          </button>
          <a
            href="https://wa.me/919145793569"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center gap-2 text-base"
            data-ocid="cta-whatsapp"
          >
            <MessageCircle size={18} />
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
