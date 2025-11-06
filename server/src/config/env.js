// env.js
import dotenv from "dotenv";

//configure dotenv
dotenv.config();

export const PORT=process.env.PORT || 3000;
export const CLIENT_URL=process.env.CLIENT_URL || "http://localhost:5173";
export const PEPPER_SECRET=process.env.PEPPER_SECRET || "some_random_string";
export const SECRET_KEY=process.env.SECRET_KEY || "some_secret_key";
export const MONGO_URI=process.env.MONGO_URI || "mongodb://localhost:27017";
export const DB_NAME=process.env.DB_NAME || "ecommerce";