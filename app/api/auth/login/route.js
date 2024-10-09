// Authentication-related APIs - Google login route

import checkMySQLConnection from "../../../utils/database/mysql-connection";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const { username, email, profile_image, auth_uid } = await req.json();

    // console.log("username, email, auth_id : ", username, email, auth_uid )

    // Connect to the database
    const db = await checkMySQLConnection();

    //console.log("fn: checkMySQLConnection() : db : ", db);

    // Check if the user already exists based on auth_uid
    const [existingUser] = await db.query(
      "SELECT username, email, profile_image, auth_uid FROM users_table WHERE auth_uid = ?",
      [auth_uid]
    );

    // If the user does not exist, insert their details into the database
    if (!existingUser.length) {
      await db.query(
        "INSERT INTO users_table (username, email, profile_image, auth_uid, created_at) VALUES (?, ?, ?, ?, NOW())",
        [username, email, profile_image, auth_uid]
      );

      return NextResponse.json({
        statusCode: 200,
        message: "User authenticated and stored!",
      });
    } else {
      // JWT Token Code
      const jwtToken = jwt.sign(
        { auth_uid: auth_uid },
        process.env.JWT_SECRET_KEY
      );

      // If the user already exists, return a message indicating this
      return NextResponse.json({
        statusCode: 200,
        message: "User already exists.",
        jwtToken: jwtToken,
        username: username,
        email: email,
        profile_image: profile_image,
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
