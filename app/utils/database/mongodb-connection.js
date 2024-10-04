import { MongoClient } from "mongodb"; // Import MongoClient from the mongodb library
import dbConfig from "./db-config"; // Import database configuration

let mongoDb; // Variable to hold the MongoDB connection

// Function to connect to MongoDB
const checkMongoDBConnection = async () => {
  // Check if the MongoDB connection already exists
  if (mongoDb) return Promise.resolve(mongoDb); // Return existing connection as a resolved promise

  const mongoDbClient = new MongoClient(dbConfig.mongodb.uri);

  // Attempt to connect to MongoDB
  return mongoDbClient
    .connect()
    .then(() => {
      mongoDb = mongoDbClient.db(dbConfig.mongodb.database); // Specify your database name
      console.log("Successfully connected to MongoDB."); // Log success message
      return mongoDb; // Return the MongoDB database instance
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error); // Log error message
      throw error; // Propagate the error for handling elsewhere
    })
    .finally(() => {
      console.log("MongoDB connection attempt finished."); // Log that the connection attempt has finished
    });
};

export default checkMongoDBConnection; // Export the connection function for use in other parts of the application
