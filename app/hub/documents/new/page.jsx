// Text Editor Component

'use client'; // Add this directive to make it a Client Component

import TextEditor from "@/app/components/editor/text-editor";
import { useState } from "react";

export default function EditorPage() {
  const [content, setContent] = useState("<p>Hello World!</p>");

  const handleChange = (newContent) => {
    setContent(newContent); // Update content state
  };

  return (
    <div className="max-w-3xl mx-auto py-5">
      <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
      <TextEditor content={content} onChange={handleChange} />
    </div>
  );
}
