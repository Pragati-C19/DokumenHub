import mysql from "mysql2/promise"; // Import mysql2 library for promise-based MySQL connection
import dbConfig from "./db-config";

// Create a connection pool for better performance
const mysqlPool = mysql.createPool(dbConfig.mysql); // Use dbConfig.mysql for clarity

// Function to check MySQL database connection
const checkMySQLConnection = () => {
  mysqlPool
    .getConnection() // Attempt to get a connection from the pool
    .then((connection) => {
      console.log("Successfully connected to the MySQL database."); // Log success message
      connection.release(); // Release the connection back to the pool
    })
    .catch((error) => {
      console.error("Error connecting to the MySQL database:", error); // Log error message
    })
    .finally(() => {
      console.log("MySQL connection attempt finished."); // Log that the connection attempt has finished
    });
};

// Call the function to check the MySQL connection (optional)
checkMySQLConnection();

export default mysqlPool; // Export the MySQL connection pool for use in other parts of the application
