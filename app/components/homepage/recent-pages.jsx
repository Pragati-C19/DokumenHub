// 5 Recent Documents Component

"use client"; // Add this directive to make it a Client Component

import GridView from "../documents/grid-view";
import ListView from "../documents/list-view";
import useDocuments from "@/app/hooks/useDocuments";

export default function RecentDocs() {
  const { documents } = useDocuments();

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-center">
        Recent Documents{" "}
      </h2>

      {documents.length === 0 ? (
        <p className="flex justify-center">Not Visited Any Documents Yet.</p>
      ) : (
        <div>
          <GridView documents={documents} />
          <ListView documents={documents} />
        </div>
      )}
    </div>
  );
}
