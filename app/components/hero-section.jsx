// components/Hero.js

'use client'; // Add this directive to make it a Client Component

import React from 'react';
import '../styles/HeroSection.module.css'; // Importing CSS module

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen hero-section-bg-custom-image">
           <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black p-4">
        <h1 className="text-5xl md:text-7xl font-bold">
          Transform the Way You Work with DokumenHub
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          DokumenHub is your all-in-one workspace for notes, tasks, and collaborative documents. Whether you're organizing your personal projects or managing team workflows, our platform brings everything together in one seamless experience.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
