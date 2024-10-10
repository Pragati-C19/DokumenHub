// Text Editor Component

"use client"; // Add this directive to make it a Client Component

import EditorJsHolder from "@/app/components/editor/editor-js-holder";
import useDocuments from "@/app/hooks/useDocuments";

export default function NewDocument() {
  const { saveDocument } = useDocuments(); // Destructure the save function

  const handleSave = async (documentData) => {
    const result = await saveDocument(null, documentData); // No ID for new documents
    if (result) {
      alert("Document created successfully!");
    }
  };

  return (
    <div className="items-center flex flex-col">
      <EditorJsHolder onSave={handleSave} />
    </div>
  );
}
