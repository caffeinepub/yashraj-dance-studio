import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import EnquirySection from "./sections/EnquirySection";
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

function HomePage() {
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
      <EnquirySection />
      <ContactSection />
      <FAQSection />
      <FinalCTASection />
    </Layout>
  );
}

const rootRoute = createRootRoute();

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: AdminLoginPage,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, adminRoute, adminLoginRoute]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
