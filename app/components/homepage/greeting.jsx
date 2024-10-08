// Greeting Component

"use client"; // Add this directive to make it a Client Component

import { useGreeting } from "../../hooks/useGreeting";
import Link from "next/link";

export default function Greeting() {
  const username = localStorage.getItem("username");
  const greeting = useGreeting(username);

  return (
    <div>
      {/* Greeting */}
      <h1 className="text-3xl font-bold mb-8 flex flex-col items-center">
        {greeting}
      </h1>

      {/* Start Today Section */}
      <div className="mb-6 p-2">
        <h2 className="text-xl font-semibold mb-2">Start Today...</h2>
        <div className="flex space-x-20 p-6">
          <Link
            href={"/hub/documents/new"}
            className="border border-dashed border-gray-400 p-4 w-40 h-40 flex justify-center items-center bg-white text-gray-400 rounded-md">
            Blank Page
          </Link>
          <Link
            href={"/hub/documents/sample"}
            className="border border-gray-400 p-4 w-40 h-40 flex justify-center items-center bg-gradient-to-b from-blue-200 to-yellow-200 text-gray-800 rounded-md">
            Getting Started
          </Link>
        </div>
      </div>
    </div>
  );
}
