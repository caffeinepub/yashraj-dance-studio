import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do I need prior dance experience?",
    answer:
      "No, beginners are absolutely welcome! Our classes are designed to be beginner-friendly with step-by-step guidance so anyone can start from zero.",
  },
  {
    question: "Do you provide trial classes?",
    answer:
      "Yes, trial sessions are available. You can book a free trial class to experience the studio before committing to a full batch.",
  },
  {
    question: "What should I wear?",
    answer:
      "Comfortable workout or dance clothes are ideal. Loose-fitting attire that allows free movement is recommended. Specific requirements will be communicated for specialized classes.",
  },
  {
    question: "Are there separate batches for kids?",
    answer:
      "Yes, we have dedicated Kids Dance Classes with age-appropriate curriculum for children and teens in a safe, fun environment.",
  },
  {
    question: "Do you customize wedding choreography?",
    answer:
      "Yes, absolutely! Our wedding choreography is fully personalized — we create routines based on your song choices, group size, and event requirements.",
  },
];

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-smooth"
      style={{
        backgroundColor: "#111111",
        border: isOpen ? "1px solid rgba(0,188,212,0.25)" : "1px solid #1f1f1f",
      }}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-ocid="faq-toggle"
      >
        <span
          className="text-sm font-semibold font-display"
          style={{ color: "#ffffff" }}
        >
          {item.question}
        </span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 transition-smooth"
          style={{
            color: isOpen ? "#00bcd4" : "#555",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {isOpen && (
        <div
          className="px-6 pb-5 text-sm leading-relaxed"
          style={{
            color: "#a0a0a0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="pt-4">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 relative"
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
        <div className="text-center max-w-xl mx-auto mb-12">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.2)",
              color: "#7c3aed",
            }}
          >
            FAQ
          </div>
          <h2 className="section-heading mb-4" style={{ color: "#ffffff" }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p style={{ color: "#a0a0a0" }}>
            Everything you need to know before joining. Don&apos;t see your
            question? Contact us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, idx) => (
            <FAQAccordionItem
              key={faq.question}
              item={faq}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
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
