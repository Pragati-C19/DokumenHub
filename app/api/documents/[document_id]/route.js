// Document management APIs -  Get, Update, Delete specific document

import checkMySQLConnection from "../../../utils/database/mysql-connection";
import { NextResponse } from "next/server";
import { authenticateToken } from "../../../middleware/authenticate-token";

// This function handles GET requests to Fetch the specific document
// GET {{dokumenhub_base_url}}/documents/[document_id]

export async function GET(req, { params }) {
  const { document_id } = params; // Extract user_id and document_id from params

  // Authenticate the request and get the user_id
  const user_id = authenticateToken(req);
  console.log("fn: api/documents/[document_id] : GET - ", user_id);

  if (!user_id || typeof user_id === "object") return user_id; // Handle authentication error

  try {
    const db = await checkMySQLConnection();

    // Fetch the specific document that belongs to the user
    const [document] = await db.query(
      "SELECT document_id, document_title, created_at, updated_at FROM documents_table WHERE document_id = ? AND owner_id = ?",
      [document_id, user_id] // Ensure the document belongs to the user
    );

    if (document.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found or does not belong to user.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      document: document[0],
    });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching document.",
      },
      { status: 500 }
    );
  }
}

// This function handles PUT requests to update the specific document

export async function PUT(req) {
  const { document_id } = req.params; // Extract document_id from params

  // Authenticate the token and get the user_id
  const authResponse = authenticateToken(req, () => {});
  if (authResponse) return authResponse; // Handle authentication error

  const user_id = req.user_id; // Get user_id from the authenticated token

  try {
    const { document_title } = await req.json();

    // Check for valid title
    if (!document_title) {
      return NextResponse.json(
        {
          success: false,
          message: "Document title is required.",
        },
        { status: 400 }
      );
    }

    const db = await checkMySQLConnection();
    const [result] = await db.query(
      "UPDATE documents_table SET document_title = ?, updated_at = NOW() WHERE document_id = ? AND owner_id = ?",
      [document_title, document_id, user_id] // Ensure the document belongs to the user
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found or does not belong to user.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Document updated successfully.",
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating document.",
      },
      { status: 500 }
    );
  }
}

// This function handles DELETE requests to SOft Delete the document (Move to Trash)

export async function DELETE(req, { params }) {
  const { document_id } = params; // Extract document_id from params

  // Authenticate the token and get the user_id
  const authResponse = authenticateToken(req, () => {});
  if (authResponse) return authResponse; // Handle authentication error

  const user_id = req.user_id; // Get user_id from the authenticated token

  try {
    const db = await checkMySQLConnection();
    const [result] = await db.query(
      "UPDATE documents_table SET deleted_at = NOW() WHERE document_id = ? AND owner_id = ?",
      [document_id, user_id] // Ensure the document belongs to the user
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found or does not belong to user.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Document moved to trash successfully.",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting document.",
      },
      { status: 500 }
    );
  }
}
