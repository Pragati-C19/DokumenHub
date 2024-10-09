// This is my Editorjs component, better if make a seperate component and use it

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import SimpleImage from "@editorjs/simple-image";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Raw from "@editorjs/raw";

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
      delimiter: Delimiter,
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
      table: {
        class: Table,
        inlineToolbar: true,
      },
      image: {
        class: ImageTool,
        inlineToolbar: true,
        config: {
          endpoints: {
            byFile: "/api/uploadFile", // Your backend file uploader endpoint
            byUrl: "/api/fetchUrl", // Your endpoint that provides uploading by URL
          },
          field: "file",
          additionalRequestHeaders: {
            // Add any headers if needed
          },
          captions: true, // Enable image captions
          buttonContent: "Upload Image", // Custom button text
        },
      },
      simpleImage: SimpleImage,
      inlineCode: {
        class: InlineCode,
        shortcut: "CMD+SHIFT+C",
      },
      raw: Raw,
};

function EditorJsHolder({ data, onChange, holder }) {
  //add a reference to editor
  const ref = useRef();
  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        autofocus: true,
        placeholder: "Start writing here...",
        tools: EDITOR_TOOLS,
        data: data || {},
        inlineToolbar: true,
        logLevel: "ERROR",
        onReady: () => {
          ref.current = editor;
        },
        onChange: async () => {
          try {
            const content = await ref.current.save();
            onChange && onChange(content);
          } catch (error) {
            console.error("Error saving content:", error);
          }
        },
        // Enable Drag-and-Drop Images
        dragAndDrop: {
          enabled: true,
          files: (files) => {
            // Handle file uploads if needed
            console.log("Dropped files:", files);
          },
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div
        id={holder}
        style={{
          width: "100%",
          minHeight: 500,
          borderRadius: " 7px",
          background: "fff",
        }}
      />
    </>
  );
}

export default EditorJsHolder;
