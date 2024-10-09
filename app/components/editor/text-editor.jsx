// Text Editor Component

// TODO: Page Deletion is Remain

'use client'; // Add this directive to make it a Client Component

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";

export default function TextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList,
      OrderedList,
      Highlight,
      Image,
      ImageResize,
    ],
    content,
    editorProps: {
      attributes: {
        class: "min-h-[200px] border rounded-lg bg-slate-100 py-3 px-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Update content on change
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
