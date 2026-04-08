import {
  CheckCircle,
  Clock,
  Instagram,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

interface FormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}

const COURSES = [
  "Regular Classes",
  "Zumba",
  "Yoga",
  "Wedding Choreography",
  "Kids Dance Class",
  "Other / General Inquiry",
];

const CONTACT_ITEMS = [
  {
    icon: Phone,
    label: "Phone",
    values: ["+91 91457 93569"],
    color: "#00bcd4",
    href: "tel:+919145793569",
  },
  {
    icon: MapPin,
    label: "Address",
    values: [
      "C-3, Gurumeher Niwas,",
      "Lane No. 5, Adarsh Colony,",
      "Tingre Nagar, Pune – 411015",
    ],
    color: "#7c3aed",
    href: "https://maps.google.com/?q=Yashraj+Dance+Studio+Tingre+Nagar+Pune",
  },
  {
    icon: Clock,
    label: "Studio Hours",
    values: ["Morning & Evening Batches", "Open till ~9 PM"],
    color: "#00bcd4",
    href: null,
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  return (
    <section
      id="contact"
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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,188,212,0.1)",
              border: "1px solid rgba(0,188,212,0.2)",
              color: "#00bcd4",
            }}
          >
            Get In Touch
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Ready to Start <span className="gradient-text">Dancing?</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            Fill out the form below and our team will reach out to schedule a
            free trial class — no commitment required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {CONTACT_ITEMS.map(({ icon: Icon, label, values, color, href }) => (
              <div
                key={label}
                className="rounded-xl p-5 flex gap-4 items-start transition-smooth"
                style={{
                  backgroundColor: "#111111",
                  border: "1px solid #1f1f1f",
                }}
                data-ocid="contact-info-item"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "#555" }}
                  >
                    {label}
                  </div>
                  {values.map((v, i) =>
                    href && i === 0 ? (
                      <a
                        key={v}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="block text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: "#ffffff" }}
                      >
                        {v}
                      </a>
                    ) : (
                      <p
                        key={v}
                        className="text-sm"
                        style={{ color: i === 0 ? "#ffffff" : "#a0a0a0" }}
                      >
                        {v}
                      </p>
                    ),
                  )}
                </div>
              </div>
            ))}

            {/* Instagram follow link */}
            <a
              href="https://www.instagram.com/yashrajdancestudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-4 flex gap-3 items-center transition-smooth group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,188,212,0.08), rgba(124,58,237,0.08))",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
              data-ocid="contact-instagram-link"
            >
              <Instagram
                size={20}
                style={{ color: "#00bcd4", flexShrink: 0 }}
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#fff" }}>
                  Follow us on Instagram
                </p>
                <p className="text-xs" style={{ color: "#a0a0a0" }}>
                  @yashrajdancestudio
                </p>
              </div>
            </a>

            {/* Map embed */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid #1f1f1f", aspectRatio: "4/3" }}
            >
              <iframe
                title="Yashraj Dance Studio Location"
                src="https://maps.google.com/maps?q=Yashraj+Dance+Studio+Tingre+Nagar+Pune+411015&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.85) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div
            className="lg:col-span-3 rounded-2xl p-8"
            style={{ backgroundColor: "#111111", border: "1px solid #1f1f1f" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle size={56} style={{ color: "#00bcd4" }} />
                <h3
                  className="text-2xl font-bold font-display"
                  style={{ color: "#ffffff" }}
                >
                  Message Received!
                </h3>
                <p style={{ color: "#a0a0a0" }}>
                  Thank you! Our team will contact you within 24 hours to
                  schedule your free trial class.
                </p>
                <button
                  type="button"
                  className="btn-outline mt-4"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      course: "",
                      message: "",
                    });
                  }}
                  data-ocid="contact-reset-btn"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3
                  className="text-xl font-bold font-display mb-2"
                  style={{ color: "#ffffff" }}
                >
                  Book a Free Trial Class
                </h3>
                <p className="text-sm mb-6" style={{ color: "#a0a0a0" }}>
                  Fill in your details and we&apos;ll get back to you within 24
                  hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#a0a0a0" }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-lg px-4 py-2.5 text-sm transition-smooth outline-none"
                      style={{
                        backgroundColor: "#1a1a1a",
                        border: `1px solid ${errors.name ? "#ef4444" : "#2a2a2a"}`,
                        color: "#ffffff",
                      }}
                      onFocus={(e) => {
                        if (!errors.name)
                          (e.target as HTMLInputElement).style.borderColor =
                            "#00bcd4";
                      }}
                      onBlur={(e) => {
                        if (!errors.name)
                          (e.target as HTMLInputElement).style.borderColor =
                            "#2a2a2a";
                      }}
                      data-ocid="contact-name-input"
                    />
                    {errors.name && (
                      <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "#a0a0a0" }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+91 00000 00000"
                      className="w-full rounded-lg px-4 py-2.5 text-sm transition-smooth outline-none"
                      style={{
                        backgroundColor: "#1a1a1a",
                        border: `1px solid ${errors.phone ? "#ef4444" : "#2a2a2a"}`,
                        color: "#ffffff",
                      }}
                      onFocus={(e) => {
                        if (!errors.phone)
                          (e.target as HTMLInputElement).style.borderColor =
                            "#00bcd4";
                      }}
                      onBlur={(e) => {
                        if (!errors.phone)
                          (e.target as HTMLInputElement).style.borderColor =
                            "#2a2a2a";
                      }}
                      data-ocid="contact-phone-input"
                    />
                    {errors.phone && (
                      <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "#a0a0a0" }}
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg px-4 py-2.5 text-sm transition-smooth outline-none"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: `1px solid ${errors.email ? "#ef4444" : "#2a2a2a"}`,
                      color: "#ffffff",
                    }}
                    onFocus={(e) => {
                      if (!errors.email)
                        (e.target as HTMLInputElement).style.borderColor =
                          "#00bcd4";
                    }}
                    onBlur={(e) => {
                      if (!errors.email)
                        (e.target as HTMLInputElement).style.borderColor =
                          "#2a2a2a";
                    }}
                    data-ocid="contact-email-input"
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Course */}
                <div>
                  <label
                    htmlFor="contact-course"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "#a0a0a0" }}
                  >
                    Interested In
                  </label>
                  <select
                    id="contact-course"
                    value={form.course}
                    onChange={(e) => handleChange("course", e.target.value)}
                    className="w-full rounded-lg px-4 py-2.5 text-sm transition-smooth outline-none"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      color: form.course ? "#ffffff" : "#555",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLSelectElement).style.borderColor =
                        "#00bcd4";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLSelectElement).style.borderColor =
                        "#2a2a2a";
                    }}
                    data-ocid="contact-course-select"
                  >
                    <option value="">Select a course...</option>
                    {COURSES.map((c) => (
                      <option
                        key={c}
                        value={c}
                        style={{ backgroundColor: "#1a1a1a", color: "#ffffff" }}
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "#a0a0a0" }}
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us about your dance experience or any questions..."
                    rows={4}
                    className="w-full rounded-lg px-4 py-2.5 text-sm transition-smooth outline-none resize-none"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: "1px solid #2a2a2a",
                      color: "#ffffff",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor =
                        "#00bcd4";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor =
                        "#2a2a2a";
                    }}
                    data-ocid="contact-message-input"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm relative z-10"
                  data-ocid="contact-submit-btn"
                >
                  <Send size={16} />
                  Send Message &amp; Book Trial
                </button>

                <p className="text-xs text-center" style={{ color: "#555" }}>
                  First trial class is free. No hidden fees. We&apos;ll contact
                  you to confirm.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
