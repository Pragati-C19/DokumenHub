// This is my Editorjs component

'use client'; // Add this directive to make it a Client Component

import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import CheckList from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import styles from "../../styles/EditorJSHolder.module.css";

//  Configuration for Editor.js tools.

const EDITOR_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4],
      defaultLevel: 1,
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  code: {
    class: Code,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  embed: {
    class: Embed,
    inlineToolbar: false,
    config: {
      services: {
        youtube: true,
        twitter: true,
        // Add more services if needed
      },
    },
  },
};

const EditorJsHolder = ({ holder }) => {

    const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');

  const editorRef = useRef(null); // Reference to the Editor.js instance

  useEffect(() => {
    if (!editorRef.current) {
      // Initialize Editor.js only once
      const editor = new EditorJS({
        holder: holder,
        autofocus: true,
        placeholder: "Start writing here...",
        tools: EDITOR_TOOLS,
        data: content || {}, // Load initial data if provided
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }

    // Cleanup Editor.js instance on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSave = (content) => {
    const documentData = {
      title,
      content,
      savedAt: new Date().toISOString(),
    };
    // Here, you can send the documentData to a backend or store it locally
    // For simplicity, we'll store it in state
    setContent(documentData);
    alert('Document saved successfully!');
    console.log('Saved Document:', documentData);
  };

  const saveEditorContent = async () => {
    try {
      const content = await editorRef.current.save();
      handleSave(content);
    } catch (error) {
      console.error('Saving failed: ', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl ">
        {/* Document Title Input */}
        <div className="p-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${styles.titleStyle} py-3 px-4 font-bold text-2xl font-serif`}
            placeholder="Enter your document title..."
          />
        </div>

        {/* Editor.js Container */}
        <div
          id={holder}
          className={`${styles.editorjsContainer} ${styles.noScrollbar} overflow-y-auto py-5`}
        ></div>

        {/* Save Button */}
        <div className="mt-3 flex justify-center font-serif">
          <button
            onClick={saveEditorContent}
            className={`${styles.customButton}`}
          >
            Save Document
          </button>
        </div>

        {/* Display Saved Document (For Demonstration)
        {content && (
          <div className="mt-6 p-4 rounded font-serif">
            <h2 className="text-xl mb-2">Saved Document</h2>
            <p>
              <strong>Title:</strong> {content.title}
            </p>
            <p>
              <strong>Saved At:</strong> {new Date(content.savedAt).toLocaleString()}
            </p>
            <pre className="mt-2 bg-gray-200 p-2 rounded overflow-auto">
              {JSON.stringify(content.content, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </>
  );

};

export default EditorJsHolder;