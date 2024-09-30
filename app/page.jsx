// Landing page (for non-logged-in users)

import HeroSection from "./components/hero-section"
import Footer from './components/footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <main className="text-3xl font-bold">Hello, DokumenHub!</main>
      <Footer />
    </>
  );
}
