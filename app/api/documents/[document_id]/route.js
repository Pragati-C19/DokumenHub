// Document management APIs -  Get, Update, Delete specific document

import checkMySQLConnection from "../../../utils/database/mysql-connection";
import checkMongoDBConnection from "@/app/utils/database/mongodb-connection";
import { NextResponse } from "next/server";
import { authenticateToken } from "../../../middleware/authenticate-token";

// This function handles GET requests to Fetch the specific document
// GET http://localhost:3000/api/documents/:document_id

export async function GET(req, { params }) {
  // Authenticate the token
  const authId = authenticateToken(req);
  console.log("fn: GET api/documents/:document_id : authId - ", authId);

  const { document_id } = params; // Extract document_id from params

  try {
    const db = await checkMySQLConnection(); // Connect to MongoDB
    const mongoDb = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = mongoDb.collection("document_content_collection"); // Access 'documents' collection

    // Fetch the specific document that belongs to the user
    const [document] = await db.query(
      `SELECT d.*
       FROM documents_table d
       JOIN users_table u ON d.user_id = u.id
       WHERE d.document_id = ? AND u.auth_uid = ?`,
      [document_id, authId] // Ensure the document belongs to the user
    );

    // Fetch the content of specific document that belongs to the user
    const content = await collection
      .find({ document_id: parseInt(document_id) })
      .toArray(); // Fetch all documents

    if (document.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Document not found or does not belong to user.",
        },
        { status: 404 }
      );
    }

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Document content not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      document: document[0], // Metadata from MySQL
      content: content, // Content from MongoDB
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
// PUT http://localhost:3000/api/documents/:document_id

export async function PUT(req, { params }) {
  // Authenticate the token
  const authId = authenticateToken(req);
  console.log("fn: PUT api/documents/:document_id : authId - ", authId);

  const { document_id } = params; // Extract document_id from params

  try {
    const { document_title, content } = await req.json();

    // Check for valid title and content
    if (!document_title && !content) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one field (title or content) is required.",
        },
        { status: 400 }
      );
    }

    const db = await checkMySQLConnection(); // Connect to MongoDB
    const mongoDb = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = mongoDb.collection("document_content_collection"); // Access 'documents' collection

    const [result] = await db.query(
      `UPDATE documents_table d
       JOIN users_table u ON d.user_id = u.id
       SET d.document_title = ?, d.updated_at = NOW()
       WHERE d.document_id = ? AND u.auth_uid = ?`,
      [document_title, document_id, authId] // Ensure the document belongs to the user
    );

    // Update the existing content in MongoDB
    await collection.updateOne(
      { document_id: parseInt(document_id) },
      { $set: { content: content, updated_at: new Date() } }
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

// This function handles DELETE requests to Soft Delete the document (Move to Trash)
// We are doing soft delete so only updating deleted_at in mysql
// DELETE http://localhost:3000/api/documents/:document_id

export async function DELETE(req, { params }) {
  // Authenticate the token
  const authId = authenticateToken(req);
  console.log("fn: DELETE api/documents/:document_id : authId - ", authId);

  const { document_id } = params; // Extract document_id from params

  try {
    const db = await checkMySQLConnection();
    const [result] = await db.query(
      `UPDATE documents_table d
       JOIN users_table u ON d.user_id = u.id
       SET d.deleted_at = NOW()
       WHERE d.document_id = ? AND u.auth_uid = ?`,
      [document_id, authId] // Ensure the document belongs to the user
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
