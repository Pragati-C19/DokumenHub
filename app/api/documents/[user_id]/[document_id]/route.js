// Document management APIs -  Get, Update, Delete specific document

import checkMySQLConnection from "../../../../utils/database/mysql-connection";
import { NextResponse } from "next/server";

// This function handles GET requests to Fetch the specific document

export async function GET(req, { params }) {
  const { user_id, document_id } = params; // Extract user_id and document_id from params

  try {
    const db = await checkMySQLConnection();
    const [document] = await db.query(
      "SELECT * FROM documents_table WHERE document_id = ? AND owner_id = ?",
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

export async function PUT(req, { params }) {
  const { user_id, document_id } = params; // Extract user_id and document_id from params

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
  const { user_id, document_id } = params; // Extract user_id and document_id from params

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
