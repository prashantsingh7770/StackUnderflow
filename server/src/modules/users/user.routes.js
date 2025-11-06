// user.routes.js
import express from "express";
import UserController from "./user.controller.js";
import UserRepository from "./user.repository.js";

const userRoutes=express.Router(); // initializing express server

// creating instance of UserRepository
const userRepository=new UserRepository();

// creating instance of UserController
const userController=new UserController(userRepository); // injecting UserRepository


userRoutes.post(
    "/signup", // http:localhost:3000/api/users/signup
    userController.postSignUp
);


userRoutes.post(
    "/signin",// http://localhost:3000/api/users/signin
    userController.postSignIn
);

export default userRoutes;