// Authentication-related APIs - Google login route

import checkMySQLConnection from "../../../utils/database/mysql-connection";
import { NextResponse } from "next/server";

/*
   Handles POST requests for Google login authentication.
   
   - Parses the incoming request body to extract user information.
   - Connects to the MySQL database to check if the user already exists.
   - If the user does not exist, inserts their information into the database.
   - Returns appropriate responses based on the user's existence in the database.
   
   @param {NextRequest} req - Next.js API request object
   @returns {NextResponse} - JSON response with the status code and message
 */

export async function POST(req) {
  try {
    // Parse request body to get user details
    const { user_name, email, profile_image, google_auth_id } =
      await req.json();

    // Connect to the database
    const db = await checkMySQLConnection();

    console.log("fn: checkMySQLConnection() : db : ", db);

    // Check if the user already exists based on google_auth_id
    const [existingUser] = await db.query(
      "SELECT user_name, user_email, profile_image, google_auth_id FROM users_table WHERE google_auth_id = ?",
      [google_auth_id]
    );

    // If the user does not exist, insert their details into the database
    if (!existingUser.length) {
      await db.query(
        "INSERT INTO users_table (user_name, user_email, profile_image, google_auth_id, created_at) VALUES (?, ?, ?, ?, NOW())",
        [user_name, email, profile_image, google_auth_id]
      );

      return NextResponse.json({
        statusCode: 200,
        message: "User authenticated and stored!",
      });
    } else {
      // If the user already exists, return a message indicating this
      return NextResponse.json({
        statusCode: 200,
        message: "User already exists.",
      });
    }
  } catch (error) {
    console.error("Error in POST /api/auth/login: ", error);

    return NextResponse.json({
      statusCode: 500,
      message: "Error storing user in database.",
    });
  }
}
