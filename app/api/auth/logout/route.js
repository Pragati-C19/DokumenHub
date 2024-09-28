// Authentication-related APIs - Logout route

import { NextResponse } from "next/server"; // Import NextResponse for handling responses
import { auth } from "../../../utils/firebase/firebase-init"; // Import Firebase auth instance
import { signOut } from "firebase/auth"; // Import signOut function from Firebase Auth

// Logout API work will be handle at on client side 

export async function POST(req) {
  try {
    // Sign out the user from Firebase
    await signOut(auth);

    // Return success response
    return NextResponse.json({
      statusCode: 200,
      message: "User logged out successfully.",
    });
  } catch (error) {
    // Log the error and return a failure response
    console.error("Error in POST /api/auth/logout:", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error logging out user.",
    });
  }
}
