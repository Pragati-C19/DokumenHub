// Grid View of Documents Component

"use client"; // Add this directive to make it a Client Component

import { FaTrash } from "react-icons/fa"; // Importing list and grid icons

export default function GridView({ documents }) {
  return (
    <>
      {/* Enhanced Grid View - Cool Card Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 font-serif">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="relative w-full h-64 bg-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
            {/* Top Half with Background Color and Document Name */}
            <div className="flex items-center justify-center bg-opacity-50 h-1/2">
              <h2 className="text-black text-xl font-bold text-center px-4">
                {doc.document_title}
              </h2>
            </div>

            {/* Bottom Half with Owner Name, Updated At, and Delete Icon */}
            <div className="bg-white h-1/2 p-9 flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-2">
                  <strong>Owner :</strong> {doc.username}
                </p>
                <p className="text-gray-500 font-sans italic">
                  Updated At : {new Date(doc.updated_at).toLocaleString()}
                </p>
              </div>
              <button
                className="text-red-600 hover:text-red-800"
                title="Delete Document">
                <FaTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
