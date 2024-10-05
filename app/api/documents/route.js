// Document management APIs -  Get, Create document

import checkMySQLConnection from "../../utils/database/mysql-connection";
import { NextResponse } from "next/server";
import { authenticateToken } from "../../middleware/authenticate-token";

// This function handles GET requests to Fetch the documents
// GET http://localhost:3000/api/documents

export async function GET(req) {
  // Authenticate the token 
  const authId = authenticateToken(req);
  console.log("fn: GET api/documents : authId - ", authId);

  try {
    // Connect to the database
    const db = await checkMySQLConnection();

    // Fetch documents associated with the user
    const [documents] = await db.query(
      `SELECT documents_table.*, users_table.* 
       FROM documents_table 
       INNER JOIN users_table 
       ON documents_table.user_id = users_table.id 
       WHERE users_table.auth_uid = ?`,
      [authId]
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
// POST http://localhost:3000/api/documents

export async function POST(req) {
  // Authenticate the token 
  const authId = authenticateToken(req);
  console.log("fn: GET api/documents : authId - ", authId);

  try {
    // Parse the incoming request body
    const { documentTitle } = await req.json();

    // Connect to the MySQL database
    const db = await checkMySQLConnection();

    // Insert a new document into the documents_table
    const [result] = await db.query(
      `INSERT INTO documents_table (user_id, document_title, created_at, updated_at)
       SELECT u.id, ?, NOW(), NOW()
       FROM users_table u
       WHERE u.auth_uid = ?`,
      [documentTitle, authId] // Use user_id as owner_id
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
