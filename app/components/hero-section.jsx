// components/Hero.js

"use client"; // Add this directive to make it a Client Component

import React from "react";
import Image from "next/image";
import background from "../public/hero-section-bg2.png";
import styles from "../styles/HeroSection.module.css";
import useGoogleLogin from "../hooks/useGoogleLogin";

const HeroSection = () => {

  const { loginWithGoogle, loading, error } = useGoogleLogin();

  return (
    <section className="relative h-screen overflow-hidden">
      <Image
        alt="Mountains"
        src={background}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />

      <div className="relative z-10 mt-44 items-left justify-center h-full text-left text-black p-2">
        <h1 className="text-4xl md:text-6xl font-serif mb-8 px-20">
          Unleash Your Productivity
        </h1>
        <h1 className="text-4xl md:text-6xl font-serif px-40">
          with <span className="text-pink-200">DokumenHub</span>
        </h1>
        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className={`${styles.styleButton} bg-pink-400 text-white py-2 px-6 rounded-full hover:bg-pink-500 transition duration-300 text-2xl font-serif mt-24`}>
          Start Your Journey
        </button>
        <p
          className={`${styles.para} mt-24 text-lg md:text-xl font-sans max-w-4xl text-gray-500 px-20`}>
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
