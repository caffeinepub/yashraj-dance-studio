import { Layout } from "./components/Layout";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import FAQSection from "./sections/FAQSection";
import FacilitiesSection from "./sections/FacilitiesSection";
import FinalCTASection from "./sections/FinalCTASection";
import GallerySection from "./sections/GallerySection";
import HeroSection from "./sections/HeroSection";
import HighlightsSection from "./sections/HighlightsSection";
import ServicesSection from "./sections/ServicesSection";
import TeachingApproachSection from "./sections/TeachingApproachSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import WhoItsForSection from "./sections/WhoItsForSection";

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhoItsForSection />
      <TeachingApproachSection />
      <HighlightsSection />
      <FacilitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FinalCTASection />
    </Layout>
  );
}
