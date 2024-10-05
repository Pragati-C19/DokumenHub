// Document management APIs -  Get, Create, Update document content

import checkMongoDBConnection from "../../../../utils/database/mongodb-connection";
import { NextResponse } from "next/server";

// This function handles GET requests to Fetch the document content

export async function GET(req, { params }) {
  const { document_id } = params; // Extract document_id from params
  console.log("fn: api/documents/content/:document_id : GET - ", document_id);

  try {
    const db = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = db.collection("document_content_collection"); // Access 'documents' collection
    const content = await collection
      .find({ document_id: parseInt(document_id) })
      .toArray(); // Fetch all documents

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Document content not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: content }, { status: 200 });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// This function handles POST requests to Create the document content

export async function POST(req, { params }) {
  const { document_id } = params; // Extract document_id from params

  try {
    const { content } = await req.json(); // Get document_id and content from the request body
    const db = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = db.collection("document_content_collection"); // Access 'documents' collection

    const result = await collection.insertOne({
      document_id: parseInt(document_id),
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
    }); // Insert new document

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Document content is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Document content saved successfully.",
        content_id: result.insertedId,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving document content:", error);
    return NextResponse.json(
      { success: false, message: "Error saving document content" },
      { status: 500 }
    );
  }
}

// This function handles PUT requests to update the document content

export async function PUT(req, { params }) {
  const { document_id } = params; // Extract document_id from params

  try {
    const { content } = await req.json(); // Get document_id and content from the request body
    const db = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = db.collection("document_content_collection"); // Access 'documents' collection

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Document content is required.",
        },
        { status: 400 }
      );
    }

    // Update the existing content in MongoDB
    const result = collection.updateOne(
      { document_id: parseInt(document_id) },
      { $set: { content: content, updated_at: new Date() } }
    );

    if (result.matchedCount === 0) {
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
      message: "Document content updated successfully.",
    });
  } catch (error) {
    console.error("Error updating document content:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating document content.",
      },
      { status: 500 }
    );
  }
}
