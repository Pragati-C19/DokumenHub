// Text Editor Component

'use client'; // Add this directive to make it a Client Component

import EditorJsHolder from "@/app/components/editor/editor-js-holder";
import { useState } from "react";

export default function EditorPage() {
  const [content, setContent] = useState(null);

  return (
    <div className="max-w-3xl mx-auto py-5">
      <h1 className="text-2xl font-bold mb-4">Text Editor</h1>
      <EditorJsHolder
          data={content}
          onChange={(e) => setContent(e)}
          holder="editor_create"
        />
    </div>
  );
}
