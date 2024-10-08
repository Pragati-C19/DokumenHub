// components/Hero.js

"use client"; // Add this directive to make it a Client Component

import React from "react";
import Image from "next/image";
import background from "../public/bg-hero-section.png";
import logo from "../public/logo.png";
import styles from "../styles/HeroSection.module.css";
import useAuth from "../hooks/useAuth";

const HeroSection = () => {
  const { loginWithGoogle, loading} = useAuth();

  return (
    <section className="relative h-screen overflow-hidden">
      <Image
        alt="Hero Section Background"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute top-4 left-28 right-28 flex justify-between items-center p-6">
        <div className="flex items-center">
          <Image
            src={logo} // Change this to your logo file
            alt="DokumenHub Logo"
            width={80} // Set width as needed
          />
        </div>
        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="bg-yellow-200 rounded-full hover:bg-yellow-300 transition duration-300 text-xl font-serif text-black px-5 py-1">
          Login
        </button>
      </div>

      <div className="relative z-10 mt-40 items-left justify-center h-full text-left text-black p-2">
        <h1 className="text-4xl text-blue-200 md:text-6xl font-serif mb-8 px-20">
          Unleash Your Productivity
        </h1>
        <h1 className="text-4xl text-blue-200 md:text-6xl font-serif px-40">
          with <span className="text-gray-800">DokumenHub</span>
        </h1>
        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className={`${styles.styleButton} bg-pink-400 text-white py-2 px-6 rounded-full hover:bg-pink-500 transition duration-300 text-2xl font-serif mt-28`}>
          Start Your Journey
        </button>
        <p
          className={`${styles.para} mt-20 text-lg md:text-xl font-serif max-w-4xl text-gray-500 px-20`}>
          DokumenHub combines simplicity with powerful features, redefining how
          you manage notes, tasks, and projects. Whether for personal use or
          collaborative efforts, our adaptable workspace enhances your
          productivity and creativity, allowing you to focus on what matters
          most.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
