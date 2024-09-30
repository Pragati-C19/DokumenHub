// Layout page of Landing page (for non-logged-in users)

import React from 'react';
import './styles/globals.css';
import Header from './components/header'
import Footer from './components/footer';
import HeroSection from "./components/hero-section"

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        {/* For Footer Social Media Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <body>
        <Header />
        <HeroSection />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
