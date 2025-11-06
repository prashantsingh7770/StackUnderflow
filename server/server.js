// server.js
import express from "express";
import { PORT } from "./src/config/env.js";
import productRoutes from "./src/modules/products/product.routes.js";
import userRoutes from "./src/modules/users/user.routes.js";
import cors from "./src/config/cors.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import cartRoutes from "./src/modules/carts/cart.routes.js";
import { connectToMongoDB } from "./src/config/mongodb.js";

//create server
const server = express();

// server.use("/",(req,res)=>{
//     res.status(200).send("Backend is working");
// });

server.use(cors);

// parses JSON bodies
server.use(express.json());

// parse form data
server.use(express.urlencoded({ extended: true }));

// start server only after DB connection
const startServer = async () => {
  try {
    await connectToMongoDB(); // connect to mongoDB

    // all products req are redirected to product.routes.js
    server.use(
      "/api/products",
      productRoutes
    );

    // all user req are redirected to user.routes.js
    server.use("/api/users", userRoutes);

    // all cart req are redirected to cart.routes.js
    server.use("/api/cart", jwtAuth, cartRoutes);

    // middleware to handle 404 req
    server.use((req, res) => {
      res.status(404).send("API not found");
    });

    server.listen(PORT, () => {
      console.log(`server is listening at ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
startServer();
