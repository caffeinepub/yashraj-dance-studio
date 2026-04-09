import EnquiryForm from "@/components/EnquiryForm";
import { Mail } from "lucide-react";

export default function EnquirySection() {
  return (
    <section
      id="enquiry"
      style={{ backgroundColor: "#0d0d0d", borderTop: "1px solid #1f1f1f" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#7c3aed",
              }}
            >
              <Mail size={12} />
              Free Trial Available
            </div>
            <h2 className="section-heading mb-4">
              <span className="gradient-text">Book a Free Trial</span>
              <br />
              <span style={{ color: "#ffffff" }}>or Ask Us Anything</span>
            </h2>
            <p
              className="text-sm leading-relaxed max-w-sm mx-auto"
              style={{ color: "#a0a0a0" }}
            >
              Fill in the form below and we'll get back to you within 24 hours —
              or WhatsApp us directly for a faster response.
            </p>
          </div>

          {/* Form Card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#111111",
              border: "1px solid #1f1f1f",
            }}
            data-ocid="enquiry-card"
          >
            <EnquiryForm />
          </div>

          {/* Trust Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              "✅ No registration fee",
              "🎯 First class is FREE",
              "📞 Quick WhatsApp response",
            ].map((item) => (
              <span key={item} className="text-xs" style={{ color: "#666" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
