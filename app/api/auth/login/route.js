// Authentication-related APIs - Google login route

import { checkMySQLConnection } from "../../../utils/mysql-connection";

const loginUser = async (req, res) => {
  if (req.method === "POST") {
    const { user_name, email, profile_image, google_auth_id } = req.body;

    try {
      const db = await checkMySQLConnection();
      const [existingUser] = await db.query(
        "SELECT user_name, user_email, profile_image, google_auth_id FROM users_table WHERE google_auth_id = ?",
        [google_auth_id]
      );

      if (!existingUser.length) {
        await db.query(
          "INSERT INTO users_table (user_name, user_email, profile_image, google_auth_id, created_at) VALUES (?, ?, ?, ?, NOW())",
          [user_name, email, profile_image, google_auth_id]
        );
      }

      res
        .status(200)
        .json({ statusCode: 200, message: "User authenticated and stored!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ statusCode: 500, message: "Error storing user in database." });
    }
  } else {
    res.status(405).json({ statusCode: 405, message: "Method not allowed." });
  }
};

export default loginUser;
