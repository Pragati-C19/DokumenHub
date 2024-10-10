// Authentication Function of Token

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

/*
   Middleware to authenticate and verify JWT token in Next.js 14 API routes.
 
   - The token is expected to come from the "Authorization" header in the format: "Bearer TOKEN".
   - The middleware checks for the token, verifies it, and extracts the user_id from the token payload.
   - If the token is missing, invalid, or expired, appropriate error responses are returned.
   - If the token is valid, the user_id is added to the request object (req.user_id) for downstream use.
  
   @param {NextRequest} req - Next.js API request object
   @param {Function} next - Function to pass the request to the next handler
   @returns {NextResponse|Function} - Returns response or continues to the next handler
 */

export function authenticateToken(req, next) {
  // Extract the Authorization header value (which includes 'Bearer <token>')
  const authHeader = req.headers.get("Authorization");

  // If the Authorization header exists, remove 'Bearer' and only keep the token
  const token = authHeader && authHeader.split(" ")[1];

  console.log("fn: authenticateToken: authHeader, token - ", authHeader, token);

  const emptyValues = ["", null, undefined];

  // If token is missing or empty, return a 401 Unauthorized response
  if (emptyValues.includes(token)) {
    return NextResponse.json(
      { statusCode: 401, statusMsg: "Unauthorized. Token missing." },
      { status: 401 }
    );
  } else {
    // Verify the token using the secret from .env (process.env.JWT_SECRET)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log("decoded - ", decoded);

      // If the token is valid, decoded contains the payload (e.g., user_id, iat, exp)
      req.auth_uid = decoded.auth_uid; // Attach user_id to the request object

      // If the token is valid, return the user_id from the decoded payload
      return req.auth_uid;
    } catch (err) {
      // If the token is invalid or expired, return a 403 Forbidden response
      console.error("JWT verification error:", err); // Log the error for debugging
      return NextResponse.json(
        { statusCode: 403, statusMsg: "Forbidden. Invalid or expired token." },
        { status: 403 }
      );
    }
  }
}
