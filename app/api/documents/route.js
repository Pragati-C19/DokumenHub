// Document management APIs - Get all documents

import checkMongoDBConnection from '../../utils/database/mongodb-connection';
import { NextResponse } from 'next/server';

// Handle GET request
export async function GET() {
  try {
    const db = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = db.collection('document_content_collection'); // Access 'documents' collection
    const documents = await collection.find({}).toArray(); // Fetch all documents

    return NextResponse.json({ success: true, data: documents }, { status: 200 });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle POST request
export async function POST(req) {
  try {
    const { document_id, content } = await req.json(); // Get document_id and content from the request body
    const db = await checkMongoDBConnection(); // Connect to MongoDB
    const collection = db.collection('document_content_collection'); // Access 'documents' collection
    const result = await collection.insertOne({ document_id, content }); // Insert new document

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('Error inserting document:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
