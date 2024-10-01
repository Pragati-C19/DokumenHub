// Landing page (for non-logged-in users)

import HeroSection from "./components/hero-section"
import AboutUs from './components/about-us'
import FeedbackCards from './components/review-cards'
import Footer from './components/footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <FeedbackCards />
      <main className="text-3xl font-bold">Hello, DokumenHub!</main>
      <Footer />
    </>
  );
}
