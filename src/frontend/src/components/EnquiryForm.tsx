import type { EnquiryFormData } from "@/types";
import { useState } from "react";

const CLASS_OPTIONS = [
  "Bollywood Dance",
  "Zumba Fitness",
  "Yoga & Wellness",
  "Kids Dance Classes",
  "Wedding Choreography",
  "Fitness & Flexibility",
  "Meditation & Relaxation",
];

const WHATSAPP_NUMBER = "919145793569";

const INPUT_BASE: React.CSSProperties = {
  background: "#161616",
  border: "1px solid #2a2a2a",
  color: "#ffffff",
  outline: "none",
};

const INPUT_FOCUS_BORDER = "1px solid #00bcd4";
const INPUT_ERROR_BORDER = "1px solid #ef4444";
const INPUT_DEFAULT_BORDER = "1px solid #2a2a2a";

function buildWhatsAppLink(data: EnquiryFormData): string {
  const lines = [
    "Hi Yashraj Dance Studio! 👋",
    "",
    "I'd like to enquire about joining a class:",
    `• Name: ${data.name}`,
    `• Phone: ${data.phone}`,
    `• Email: ${data.email || "Not provided"}`,
    `• Interested in: ${data.classInterest}`,
  ];
  if (data.message) lines.push(`• Message: ${data.message}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

interface FieldStyleProps {
  hasError: boolean;
}

function useBorderStyle({ hasError }: FieldStyleProps) {
  const [focused, setFocused] = useState(false);
  const borderStyle = focused
    ? INPUT_FOCUS_BORDER
    : hasError
      ? INPUT_ERROR_BORDER
      : INPUT_DEFAULT_BORDER;
  return {
    style: { ...INPUT_BASE, border: borderStyle },
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}

export default function EnquiryForm() {
  const [form, setForm] = useState<EnquiryFormData>({
    name: "",
    phone: "",
    email: "",
    classInterest: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<EnquiryFormData>>({});

  const nameField = useBorderStyle({ hasError: !!errors.name });
  const phoneField = useBorderStyle({ hasError: !!errors.phone });
  const emailField = useBorderStyle({ hasError: !!errors.email });
  const classField = useBorderStyle({ hasError: !!errors.classInterest });
  const messageField = useBorderStyle({ hasError: false });

  function validate(): boolean {
    const newErrors: Partial<EnquiryFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      newErrors.phone = "Enter a valid 10-digit Indian mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.classInterest) newErrors.classInterest = "Please select a class";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const link = buildWhatsAppLink(form);
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate data-ocid="enquiry-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="enq-name"
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#a0a0a0" }}
          >
            Full Name <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <input
            id="enq-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
            autoComplete="name"
            className="rounded-lg px-4 py-3 text-sm transition-smooth"
            style={nameField.style}
            onFocus={nameField.onFocus}
            onBlur={nameField.onBlur}
            data-ocid="enquiry-name"
          />
          {errors.name && (
            <span className="text-xs" style={{ color: "#ef4444" }}>
              {errors.name}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="enq-phone"
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#a0a0a0" }}
          >
            WhatsApp / Phone <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            autoComplete="tel"
            className="rounded-lg px-4 py-3 text-sm transition-smooth"
            style={phoneField.style}
            onFocus={phoneField.onFocus}
            onBlur={phoneField.onBlur}
            data-ocid="enquiry-phone"
          />
          {errors.phone && (
            <span className="text-xs" style={{ color: "#ef4444" }}>
              {errors.phone}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="enq-email"
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#a0a0a0" }}
          >
            Email <span style={{ color: "#555" }}>(optional)</span>
          </label>
          <input
            id="enq-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. priya@email.com"
            autoComplete="email"
            className="rounded-lg px-4 py-3 text-sm transition-smooth"
            style={emailField.style}
            onFocus={emailField.onFocus}
            onBlur={emailField.onBlur}
            data-ocid="enquiry-email"
          />
          {errors.email && (
            <span className="text-xs" style={{ color: "#ef4444" }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Class Interest */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="enq-class"
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#a0a0a0" }}
          >
            Interested In <span style={{ color: "#7c3aed" }}>*</span>
          </label>
          <select
            id="enq-class"
            name="classInterest"
            value={form.classInterest}
            onChange={handleChange}
            className="rounded-lg px-4 py-3 text-sm transition-smooth"
            style={{
              ...classField.style,
              color: form.classInterest ? "#ffffff" : "#555",
              appearance: "none",
              cursor: "pointer",
            }}
            onFocus={classField.onFocus}
            onBlur={classField.onBlur}
            data-ocid="enquiry-class"
          >
            <option
              value=""
              disabled
              style={{ color: "#555", background: "#161616" }}
            >
              Select a class...
            </option>
            {CLASS_OPTIONS.map((opt) => (
              <option
                key={opt}
                value={opt}
                style={{ color: "#ffffff", background: "#161616" }}
              >
                {opt}
              </option>
            ))}
          </select>
          {errors.classInterest && (
            <span className="text-xs" style={{ color: "#ef4444" }}>
              {errors.classInterest}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1 mt-5">
        <label
          htmlFor="enq-message"
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#a0a0a0" }}
        >
          Message <span style={{ color: "#555" }}>(optional)</span>
        </label>
        <textarea
          id="enq-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Any specific queries, preferred batch timings, or details about you..."
          rows={3}
          className="rounded-lg px-4 py-3 text-sm resize-none transition-smooth"
          style={messageField.style}
          onFocus={messageField.onFocus}
          onBlur={messageField.onBlur}
          data-ocid="enquiry-message"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-smooth w-full sm:w-auto"
          style={{
            background: "linear-gradient(135deg, #25d366, #128c7e)",
            color: "#ffffff",
            cursor: "pointer",
          }}
          data-ocid="enquiry-submit"
        >
          <WhatsAppIcon />
          Enquire on WhatsApp
        </button>
      </div>
    </form>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
