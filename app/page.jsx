// Landing page (for non-logged-in users)

import HeroSection from "./components/hero-section"
import AboutUs from './components/about-us'
import Footer from './components/footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <main className="text-3xl font-bold">Hello, DokumenHub!</main>
      <Footer />
    </>
  );
}
