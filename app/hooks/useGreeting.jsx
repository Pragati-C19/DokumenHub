// Hook for Greeting by specific time

"use client"; // Add this directive to make it a Client Component

import { useState, useEffect } from 'react';

export const useGreeting = (username) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    let greet = '';
    if (currentHour < 12) {
      greet = 'Good Morning 😶‍🌫️';
    } else if (currentHour < 18) {
      greet = 'Good Afternoon 😎';
    } else {
      greet = 'Good Evening 👻';
    }
    setGreeting(`${greet}, ${username}`);
  }, [username]);

  return greeting;
};
