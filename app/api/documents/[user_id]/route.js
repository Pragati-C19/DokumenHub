// Document management APIs -  Get, Create document

import checkMySQLConnection from "../../../utils/database/mysql-connection";
import { NextResponse } from "next/server";

// This function handles GET requests to Fetch the documents

export async function GET(req, { params }) {
  const userId = params.user_id;

  console.log("userID in Get Docs", params.user_id);

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
  try {
    // Parse the incoming request body
    const { documentTitle } = await req.json();
    const userId = params.user_id;
    console.log(
      "fn: api/documents/:user_id : POST : userID, documentTitle - ",
      userId,
      documentTitle
    );

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
