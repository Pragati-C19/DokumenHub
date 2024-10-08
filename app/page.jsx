// Landing page (for non-logged-in users)

import HeroSection from "./components/landingpage/hero-section"
import AboutUs from './components/landingpage/about-us'
import ReviewCards from './components/landingpage/review-cards'
import Footer from './components/landingpage/footer';

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
