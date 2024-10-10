// Grid View of Documents Component

"use client"; // Add this directive to make it a Client Component

import { FaTrash } from "react-icons/fa"; // Importing list and grid icons
import Link from "next/link";
import background from "../../public/documents_bg1.png";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns"; //to get relative time like second ago min ago

export default function GridView({ documents }) {
  return (
    <>
      {/* Enhanced Grid View - Cool Card Design */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 font-serif">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="relative w-full h-60 flex flex-col justify-between">
            {/* Background Image */}
            <Image
              alt={doc.document_title}
              src={background}
              placeholder="blur"
              quality={100}
              width={500}
              height={100}
              objectFit="cover"
              className="absolute inset-0 z-0" // Ensures image is behind content
            />

            {/* Title and Owner Name Together */}
            <div className="flex flex-col items-center justify-center z-10 p-2">
              <Link
                href={`/hub/documents/${doc.document_id}`}
                className="text-center text-black text-l font-bold mt-16">
                {doc.document_title}
              </Link>
              <p className="text-gray-600 font-sans mb-1">{doc.username}</p>
              <div className="flex items-center space-x-20 justify-between z-10">
                {/* Updated At */}
                <p className="text-gray-500 font-sans text-sm">
                  {formatDistanceToNow(new Date(doc.updated_at), {
                    addSuffix: true,
                  })}
                </p>

                {/* Delete Icon */}
                <button
                  className="text-red-600 hover:text-red-800"
                  title="Delete Document">
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
