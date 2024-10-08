// Heading of Documents Page Component

"use client"; // Add this directive to make it a Client Component

import { FaTh, FaList } from "react-icons/fa"; // Importing list and grid icons

export default function Heading({ view, documentView }) {
  return (
    <>
      <div className="flex items-center justify-center space-x-3 mb-8">
        <h1 className="text-3xl font-bold font-serif flex justify-center">
          Documents
        </h1>
        <button
          onClick={documentView}
          className="flex items-center bg-green-600 text-white py-1 px-2 rounded-full"
          title="Change View">
          {view === "grid" ? (
            <>
              <FaList />
            </>
          ) : (
            <>
              <FaTh />
            </>
          )}
        </button>
      </div>
    </>
  );
}
