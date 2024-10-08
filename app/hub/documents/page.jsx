// Documents List

"use client"; // Add this directive to make it a Client Component

import Heading from "@/app/components/documents/heading";
import GridView from "@/app/components/documents/grid-view";
import ListView from "@/app/components/documents/list-view";
import useDocuments from "../../hooks/useDocuments";

const Documents = () => {
  const { documents, view, documentView } = useDocuments();

  return (
    <div className="p-10 h-full w-full">
      <Heading documentView={documentView} view={view} />

      {documents.length === 0 ? (
        <p className="text-gray-500 text-center">
          Document is not created yet.
        </p>
      ) : (
        <div>
          {view === "grid" ? (
            <GridView documents={documents} />
          ) : (
            <ListView documents={documents} />
          )}
        </div>
      )}
    </div>
  );
};

export default Documents;
