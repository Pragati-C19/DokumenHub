// Documents List

'use client'; // Add this directive to make it a Client Component

import useDocuments from "../../hooks/useDocuments";
import style from "../../styles/ReviewCards.module.css"
import { FaTrash, FaTh, FaList, FaFileAlt } from "react-icons/fa"; // Importing list and grid icons

const Documents = () => {
  const { documents, view, documentView } = useDocuments();

  // Function to handle document deletion (dummy implementation)
  const handleDelete = (index) => {
    // Here you would call your delete function (e.g., API call)
    console.log(`Delete document at index: ${index}`);
    // In real use case, update the documents state to remove the deleted document
  };

  return (
    <div className="p-10 h-full w-full">
      <div className="flex items-center justify-center space-x-3 mb-8">
      <h1 className="text-3xl font-bold font-serif flex justify-center">Documents</h1>
        <button
          onClick={documentView}
          className="flex items-center bg-green-600 text-white py-1 px-2 rounded-full"
          title="Change View"
        >
          {view === "grid" ? (
            <>
              <FaList/>
            </>
          ) : (
            <>
              <FaTh />
            </>
          )}
        </button>
      </div>

      {documents.length === 0 ? (
        <p className="text-gray-500">Document is not created yet.</p>
      ) : (
        <div>
          {view === "grid" ? (
            // Enhanced Grid View - Cool Card Design
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 font-serif">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="relative w-full h-64 bg-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
          >
            {/* Top Half with Background Color and Document Name */}
            <div className="flex items-center justify-center bg-opacity-50 h-1/2">
              <h2 className="text-black text-xl font-bold text-center px-4">
                {doc.document_title}
              </h2>
            </div>

            {/* Bottom Half with Owner Name, Updated At, and Delete Icon */}
            <div className="bg-white h-1/2 p-9 flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 mb-2"><strong>Owner :</strong> {doc.username}</p>
                    <p className="text-gray-500 font-sans italic">Updated At : {new Date(doc.updated_at).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => deleteDocument(index)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Document"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
          </div>
        ))}
      </div>
          ) : (
            // List View - Table with Fixed Headers and Scrollable Body
        <div className={`overflow-auto max-h-96 border rounded-lg shadow ${style.noScrollbar}`}>
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
              <tr key={index} className="hover:bg-gray-100 text-center align-middle">
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-purple-600 hover:text-purple-800">
                    <FaFileAlt />
                  </button>
                </td>
                <td className="py-2 px-4 border-b">{doc.document_title}</td>
                <td className="py-2 px-4 border-b">{doc.username}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(doc.updated_at).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Document"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Documents;
