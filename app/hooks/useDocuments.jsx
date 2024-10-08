// hooks/useDocumentList.js

'use client'; // Add this directive to make it a Client Component

// hooks/useDocuments.js
import { useState, useEffect } from "react";

// Dummy data to simulate API response
const dummyDocuments = [
  { title: "Document 1", content: "This is content 1", user_id: 1, updated_at: new Date() },
  { title: "Document 2", content: "This is content 2", user_id: 2, updated_at: new Date() },
  { title: "Document 3", content: "This is content 3", user_id: 3, updated_at: new Date() }
];

// Hook for fetching and managing documents
const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch documents from the API
  const fetchDocuments = async () => {
    setLoading(true);
    try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoX3VpZCI6IkxJYnF2TlVKTGViQnAxZGhUeXc1eWVXaUxkejIiLCJpYXQiOjE3MjgzNzk3OTd9.eZYMBtzN-mXF2TgfRZRf0Ab4jSJqN2iOMuT3pT16m1M" // Or however you're storing the token
        console.log("fn: fetchDocuments(): getToken : ", token)

        const response = await fetch("/api/documents", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Ensure this is set
          },
        });
        console.log("fn: fetchDocuments(): response - ",response)

        if (!response.ok) {
          throw new Error("Failed to fetch documents.");
        }
    
        const data = await response.json();
        console.log("fn: fetchDocuments(): data - ", data)

        setDocuments(data.documents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(); // Fetch documents when the component mounts
  }, []);

  // Function to toggle between grid and list view
  const documentView = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  return { documents, view, documentView };
};

export default useDocuments;
