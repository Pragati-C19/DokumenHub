// Landing page (for non-logged-in users)

import HeroSection from "./components/hero-section"
import AboutUs from './components/about-us'
import ReviewCards from './components/review-cards'
import Footer from './components/footer';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <ReviewCards />
      <Footer />
    </>
  );
}
