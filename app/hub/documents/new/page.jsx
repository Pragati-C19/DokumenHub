// Text Editor Component

'use client'; // Add this directive to make it a Client Component

import EditorJsHolder from "@/app/components/editor/editor-js-holder";

export default function EditorPage() {

  return (
    <div className="items-center flex flex-col">
      <EditorJsHolder holder="editorjs"/>
    </div>
  );
}
