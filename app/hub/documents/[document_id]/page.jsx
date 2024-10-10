// Specific Docs

'use client'; // Add this directive to make it a Client Component

import React, { useEffect, useState } from "react";
import EditorJsHolder from "@/app/components/editor/editor-js-holder";
import useDocuments from "@/app/hooks/useDocuments";

const UpdateDocument = ({ params }) => {
  const { document_id } = params;
  const { getDocumentById, saveDocument } = useDocuments(); // Destructure the functions from the hook
  const [initialData, setInitialData] = useState([]);

  console.log("fn: UpdateDocument() : id - ", document_id)

  useEffect(() => {
    const fetchDocument = async () => {
      const document = await getDocumentById(document_id); // Fetch the document by ID
      if (document) {
        setInitialData(document.content); // Set the initial data for the editor
      }
    };
    fetchDocument();
  }, [document_id]);

  const handleSave = async (documentData) => {
    const result = await saveDocument(document_id, documentData); // Pass the ID for updates
    if (result) {
      alert("Document updated successfully!");
    }
  };

  console.log("fn: UpdateDocument(): initialData - ", initialData)

  return (
    <div className="items-center flex flex-col">
      {initialData && <EditorJsHolder initialData={initialData} onSave={handleSave} />}
    </div>
  );
};

export default UpdateDocument;
