// cart.routes.js
import express from "express";
import CartController from "./cart.controller.js";
import CartRepository from "./cart.repository.js";

// initialise express router
const cartRoutes=express.Router();

// create instance of cart repository
const cartRepository=new CartRepository();

// create instance of cart controller
const cartController=new CartController(cartRepository); // injecting cart repository


// to get cart 
cartRoutes.get(
    "/", // http://localhost:3000/api/cart/
    cartController.getCart
);

// to add items to cart
cartRoutes.post(
    "/",
    cartController.postCartItem
);

// to update items in cart
cartRoutes.put(
    "/",
    cartController.putCartItem
);

// to clear all items from cart
cartRoutes.delete(
    "/clear",//clearCart
    cartController.deleteAllCartItem
);

// to delete items from cart
cartRoutes.delete(
    "/:id", // http://localhost:3000/api/cart/productId 
    cartController.deleteCartItem
);

export default cartRoutes;