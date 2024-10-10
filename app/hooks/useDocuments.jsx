// Hook for CRUD Documents 

"use client"; // Add this directive to make it a Client Component

import { useState, useEffect } from "react";

// Hook for fetching and managing documents
const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All documents from the API
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Or however you're storing the token
      console.log("fn: fetchDocuments(): getToken : ", token);

      const response = await fetch("/api/documents", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is set
        },
      });
      console.log("fn: fetchDocuments(): response - ", response);

      if (!response.ok) {
        throw new Error("Failed to fetch documents.");
      }

      const data = await response.json();
      console.log("fn: fetchDocuments(): data - ", data);

      setDocuments(data.documents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get a document by its ID
  const getDocumentById = async (documentId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Or however you're storing the token
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is set
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch document.");
      }

      const document = await response.json();
      return document; // Return the document data
    } catch (error) {
      console.error("Error fetching document:", error);
      return null; // Return null on error
    } finally {
      setLoading(false);
    }
  };

  // Function to save or update a document
  const saveDocument = async (documentId, documentData) => {
    const method = documentId ? "PUT" : "POST";
    const url = documentId ? `/api/documents/${documentId}` : "/api/documents";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure this is set
        },
        body: JSON.stringify(documentData),
      });

      if (!response.ok) {
        throw new Error("Failed to save document.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error saving document:", error);
      return null; // Return null on error
    }
  };

  //INFO: Function Create document for testing
  const createDocument = async (documentData) => {
    const token = localStorage.getItem("token"); 

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure this is set
        },
        body: JSON.stringify(documentData),
      });

      if (!response.ok) {
        throw new Error("Failed to save document.");
      }

      const result = await response.json();
      console.log("Saved Document:", result);
      return result;
    } catch (error) {
      console.error("Error saving document:", error);
      return null; // Return null on error
    }
  };

  // Function to delete a document
  const deleteDocument = async (documentId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure this is set
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete document.");
      }

      return true; // Return true if deletion was successful
    } catch (error) {
      console.error("Error deleting document:", error);
      return false; // Return false on error
    }
  };

  useEffect(() => {
    fetchDocuments(); // Fetch documents when the component mounts
  }, []);

  // Function to toggle between grid and list view
  const documentView = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  return {
    documents,
    view,
    createDocument,
    documentView,
    loading,
    error,
    getDocumentById,
    saveDocument,
    deleteDocument,
  };
};

export default useDocuments;
