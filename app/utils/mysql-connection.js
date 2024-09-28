import mysql from "mysql2/promise"; // Import mysql2 library for promise-based MySQL connection
import dbConfig from "./db-config";

// Create a connection pool for better performance
const mysqlPool = mysql.createPool(dbConfig.mysql); // Use dbConfig.mysql for clarity

console.log("dbConfig.mysql : ", dbConfig.mysql);

// Function to check MySQL database connection
const checkMySQLConnection = async () => {
  try {
    const connection = await mysqlPool.getConnection();
    console.log("Successfully connected to the MySQL database."); // Log success message
    //connection.release(); // Release the connection back to the pool
    return connection;
  } catch (error) {
    console.log("Error connecting to the MySQL database."); // Log error message
    return null; // Ensure you return null or throw the error
  } finally {
    console.log("MySQL connection attempt finished."); // Log that the connection attempt has finished
  }
};

// Call the function to check the MySQL connection (optional)
checkMySQLConnection();

export default checkMySQLConnection; // Export the MySQL connection pool for use in other parts of the application
