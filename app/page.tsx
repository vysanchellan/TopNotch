import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import PackagesSection from "@/components/PackagesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-brand-black text-white font-body">
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <PackagesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
