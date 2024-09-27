// Authentication-related APIs - Google login route

// app/api/auth/login/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../../utils/mysql-connection"; // Import MySQL connection

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return new Promise((resolve, reject) => {
        // Query to find user by Google ID
        db.query("SELECT * FROM Users WHERE google_auth_id = ?", [user.id])
          .then(([rows]) => {
            if (rows.length > 0) {
              resolve(true); // User exists, allow sign in
            } else {
              // User does not exist, create a new user
              db.query(
                "INSERT INTO Users (email, user_name, google_auth_id, created_at) VALUES (?, ?, ?, ?)",
                [user.email, user.name, user.id, new Date()]
              )
                .then(() => resolve(true)) // User created successfully
                .catch((error) => {
                  console.error("Error creating user:", error);
                  reject(false); // Deny sign in due to error
                });
            }
          })
          .catch((error) => {
            console.error("Error querying user:", error);
            reject(false); // Deny sign in due to query error
          });
      });
    },
  },
});

// Export the API route
export { handler as POST }; // Only POST method for login
