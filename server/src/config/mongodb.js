// mongodb.js
import { MongoClient } from "mongodb";
import { MONGO_URI } from "./env.js";
import { DB_NAME } from "./env.js";

// console.log("MONGO_URI: ", MONGO_URI);
let db = null;
let client = null;

export const connectToMongoDB = async () => {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(DB_NAME);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("MongoDB connection not established");
  }
  return db;
};
