// About Us on Landing page

"use client"; // Add this directive to make it a Client Component

import styles from "../styles/AboutUs.module.css";
import AboutUsCards from "./about-us-cards";

const AboutUs = () => {
  return (
    <>
      <section
        className={`${styles.bgCustomBackground} flex items-center justify-center py-20`}>
        <div className="text-center">
          <h2 className="mt-14 text-4xl font-serif font-bold mb-10">
            What’s the Secret Sauce?
          </h2>
          <p className="mb-16 mt-12 text-lg font-serif max-w-7xl text-gray-800 px-20">
            Forget the days of lost files and messy email chains. With
            DokumenHub, your documents have a home as cozy as your favorite
            blanket. Collaborate in real time, like magic, while watching your
            colleagues make typos live! Need a Project Report? Team Proposal? Or
            maybe just a random Brainstorming Session about who’s ordering
            lunch? We’ve got you covered. Plus, with version control, you can
            always blame someone else for that "tiny" mistake. Oh, and we’re so
            secure even your dog can’t sniff out those private docs.
          </p>
        </div>
      </section>
      <AboutUsCards />
    </>
  );
};

export default AboutUs;
