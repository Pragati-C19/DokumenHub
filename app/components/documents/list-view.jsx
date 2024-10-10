// List View of Documents Component

"use client"; // Add this directive to make it a Client Component

import style from "../../styles/ReviewCards.module.css";
import { FaTrash, FaFileAlt } from "react-icons/fa"; // Importing list and grid icons
import Link from "next/link";
import { formatDistanceToNow } from "date-fns"; //to get relative time like second ago min ago

export default function ListView({ documents }) {
  return (
    <>
      {/* List View - Table with Fixed Headers and Scrollable Body */}
      <div
        className={`overflow-auto max-h-150 border rounded-lg shadow ${style.noScrollbar}`}>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="py-2 px-4 border-b">📚</th>
              <th className="py-2 px-4 border-b">Document Name</th>
              <th className="py-2 px-4 border-b">Owner Name</th>
              <th className="py-2 px-4 border-b">Updated At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 text-center align-middle">
                <td className="py-2 px-4 text-center">
                  <button className="text-blue-400 hover:text-purple-800">
                    <FaFileAlt />
                  </button>
                </td>
                <Link href={`/hub/documents/${doc.document_id}`}>
                  <td className="py-2 px-4 ">{doc.document_title}</td>
                </Link>
                <td className="py-2 px-4 ">{doc.username}</td>
                <td className="py-2 px-4 ">
                  {formatDistanceToNow(new Date(doc.updated_at), {
                    addSuffix: true,
                  })}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete Document">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
