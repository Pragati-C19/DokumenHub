// Document management APIs -  Get, Create document

import checkMySQLConnection from "../../utils/database/mysql-connection";
import { NextResponse } from "next/server";
import { authenticateToken } from "@/app/middleware/authenticate-token";

// This function handles GET requests to Fetch the documents

export async function GET(req) {

  // Authenticate the token and get the user_id
  const authResponse = authenticateToken(req, () => {});
  if (authResponse) return authResponse; // Handle authentication error
  console.log("fn: GET api/documents : authResponse - ", authResponse);

  const userId = req.user_id; // Get user_id from the authenticated token
  console.log("fn: GET api/documents : userId - ", userId);

  try {
    // Connect to the database
    const db = await checkMySQLConnection();

    // Fetch documents associated with the user
    const [documents] = await db.query(
      "SELECT * FROM documents_table WHERE owner_id = ?",
      [userId]
    );

    return NextResponse.json({
      success: true,
      documents: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching documents.",
      },
      { status: 500 }
    );
  }
}

// This function handles POST requests to Create the document

export async function POST(req, { params }) {
  
  // Authenticate the token and get the user_id
  const authResponse = authenticateToken(req, () => {});
  if (authResponse) return authResponse; // Handle authentication error

  const userId = req.user_id; // Get user_id from the authenticated token
  console.log("fn: POST api/documents : userId - ", userId);

  try {
    // Parse the incoming request body
    const { documentTitle } = await req.json();

    // Connect to the MySQL database
    const db = await checkMySQLConnection();

    // Insert a new document into the documents_table
    const [result] = await db.query(
      "INSERT INTO documents_table (owner_id, document_title, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [userId, documentTitle] // Use user_id as owner_id
    );

    // Get the ID of the newly created document
    const newDocumentId = result.insertId;

    // Optionally, you can also save content to MongoDB if you need to
    // (You will need to implement the MongoDB insert logic here if needed)

    return NextResponse.json({
      success: true,
      message: "Document created successfully.",
      document: {
        id: newDocumentId, // Get the ID of the newly created document
        documentTitle: documentTitle,
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while creating the document.",
    });
  }
}
