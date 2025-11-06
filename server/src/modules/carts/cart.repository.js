// cart.repository.js
import { ObjectId } from "mongodb";
import CartModel from "./cart.model.js";
import { getDB } from "../../config/mongodb.js";

export default class CartRepository {
  constructor() {
    this.collection = null;
  }

  // lazy initialization of collection
  async getCollection() {
    if (!this.collection) {
      this.collection = getDB().collection("carts");
    }
    return this.collection;
  }

  // lazy initialization of getProductCollection
  async getProductCollection() {
    if (!this.productCollection) {
      this.productCollection = getDB().collection("products");
    }
    return this.productCollection;
  } 

  // method to get cart by user id
  async getCartByUserId(userId) {
    try {
      const collection = await this.getCollection();

      const cart = await collection.findOne({
        userId: ObjectId.createFromHexString(userId),
      });

      return cart ? { status: "SUCCESS", cart } : { status: "NOT_FOUND" };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching cart: " + error.message);
    }
  }

  // method to add item to cart
  async addItemToCart(userId, productId, quantity, size, ) {
    try {
      const collection = await this.getCollection();
      const productCollection = await this.getProductCollection();

      // validate product
      if (!ObjectId.isValid(productId)) return { status: "INVALID_PRODUCT_ID" };
      if (!ObjectId.isValid(userId)) return { status: "INVALID_USER_ID" };

      const userObj = ObjectId.createFromHexString(userId);
      const productObj = ObjectId.createFromHexString(productId);

      const product = await productCollection.findOne({
        _id: productObj,
      });

      if (!product) return { status: "PRODUCT_NOT_FOUND" };

      const result = await this.getCartByUserId(userId);

      // create cart, if not found
      if (result.status === "NOT_FOUND") {
        const item = {
          productId: productObj,
          name: product.name,
          quantity: Number(quantity),
          price: Number(product.price),
          imageUrl: product.imageUrl,
          category: product.category,
            size: String(size) || null,
          total: Number((quantity * product.price).toFixed(2)),
        };

        const newCart = new CartModel(userObj, [item]);
        newCart.cartTotal = Number(item.total.toFixed(2));

        // insert document
        const insertResult = await collection.insertOne(newCart);
        newCart._id = insertResult.insertedId;
        return { status: "SUCCESS", cart: newCart };
      } else {
        // if cart found
        const existing = result.cart;
        const cart = new CartModel(existing.userId, existing.items || []);
        cart._id = existing._id;

        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productObj.toString()
        );

        //if item already present then update
        if (existingItemIndex !== -1) {
          const existingItem = cart.items[existingItemIndex];
          existingItem.quantity += Number(quantity);
          existingItem.total = Number(
            (existingItem.quantity * existingItem.price).toFixed(2)
          );
        } else {
          // if not present then add item
          const item = {
            productId: productObj,
            name: product.name,
            quantity: Number(quantity),
            price: Number(product.price),
            total: Number((quantity * product.price).toFixed(2)),
            size: String(size) || null,
            imageUrl: product.imageUrl,
          };
          cart.items.push(item);
        }

        cart.cartTotal = Number(
          cart.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)
        );

        const updatedCart = await collection.updateOne(
          { _id: cart._id },
          { $set: { items: cart.items, cartTotal: cart.cartTotal } }
        );

        return { status: "SUCCESS", cart };
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error adding item to cart" + error.message);
    }
  }

  // method to update cart item
  async updateCartItem(userId, productId, quantity) {
    try {
      const collection = await this.getCollection();

      // validate product
      if (!ObjectId.isValid(productId)) return { status: "INVALID_PRODUCT_ID" };
      if (!ObjectId.isValid(userId)) return { status: "INVALID_USER_ID" };

      const productObj = ObjectId.createFromHexString(productId);

      // get existing cart
      const result = await this.getCartByUserId(userId);
      let cart;

      if (result.status === "NOT_FOUND") {
        // create a new cart for the user
        return { status: "CART_NOT_FOUND" };
      } else {
        cart = result.cart;
      }

      // find item index
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productObj.toString()
      );

      if (itemIndex === -1) {
        return { status: "ITEM_NOT_FOUND" };
      }

      // update the quantity
      cart.items[itemIndex].quantity = Number(quantity);

      cart.items[itemIndex].total = Number(
        (cart.items[itemIndex].quantity * cart.items[itemIndex].price).toFixed(
          2
        )
      );

      cart.cartTotal = Number(
        cart.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)
      );

      const updatedCart = await collection.updateOne(
        { _id: cart._id },
        { $set: { items: cart.items, cartTotal: cart.cartTotal } }
      );

      if (updatedCart.modifiedCount === 0) return { status: "UPDATE_FAILED" };

      return { status: "SUCCESS", cart };
    } catch (error) {
      console.log(error);
      throw new Error("Error updating cart item: " + error.message);
    }
  }

  // method to delete specific item from cart
  async removeCartItem(userId, productId) {
    try {
      const collection = await this.getCollection();

      // validate product
      if (!ObjectId.isValid(productId)) return { status: "INVALID_PRODUCT_ID" };
      if (!ObjectId.isValid(userId)) return { status: "INVALID_USER_ID" };

      const result =await this.getCartByUserId(userId);
      let cart;

      if (result.status === "NOT_FOUND") {
        // create a new cart for the user
        return { status: "CART_NOT_FOUND" };
      } else {
        cart = result.cart;
      }

      const itemIndex = cart.items.findIndex(
        (item) => String(item.productId) === String(productId)
      );

      if (itemIndex === -1) {
        return { status: "ITEM_NOT_FOUND" };
      }

      // remove item
      cart.items.splice(itemIndex, 1);

      // recalculate cart total
      cart.cartTotal = Number(
        cart.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)
      );

      // if cart is empty after deletion then delete cart
      if (cart.items.length === 0) {
        await collection.deleteOne({ _id: cart._id });
        return { status: "CART_EMPTY_DELETED" };
      }

      // otherwise update cart
      const updatedCart = await collection.updateOne(
        { _id: cart._id },
        { $set: { items: cart.items, cartTotal: cart.cartTotal } }
      );

      return { status: "SUCCESS", cart };
    } catch (error) {
      console.log(error);
      throw new Error("Error removing item from cart: " + error.message);
    }
  }

  // method to clear whole cart
  async clearCart(userId) {
    try {
      const collection = await this.getCollection();

      const result =await this.getCartByUserId(userId);

      if (result.status === "NOT_FOUND") {
        // create a new cart for the user
        return { status: "CART_NOT_FOUND" };
      }
      const deleteResult = await collection.deleteOne({
        _id: result.cart._id,
      });

      if(deleteResult.deletedCount===0){
        return {status:"DELETE_FAILED"}
      }

      return { status: "SUCCESS" };
    } catch (error) {
      console.log(error);
      throw new Error("Error clearing cart: " + error.message);
    }
  }
}

// // sample cart mock data
// let carts = [
//   new CartModel(
//     "1756862084457", // cartId
//     "1756862084954", // user2 userid
//     [
//       {
//         productId: "1756862084956",
//         productName: "Laptop",
//         price: 50000,
//         quantity: 1,
//       },
//       {
//         productId: "1756862084957",
//         productName: "Mouse",
//         price: 1500,
//         quantity: 2,
//       },
//     ]
//   ),
// ];
