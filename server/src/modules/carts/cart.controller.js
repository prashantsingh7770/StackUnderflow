// cart.controller.js
export default class CartController {
  constructor(cartRepository) {
    this.cartRepo = cartRepository;
  }

  // get cart middleware
  getCart = async (req, res) => {
    try {
      const userId = req.userId;
      const result = await this.cartRepo.getCartByUserId(userId);

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json(result.cart);
        case "NOT_FOUND":
          return res.status(404).json({ message: "Cart is not found" });
        default:
          return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.log("Error in getCart", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  //add item middleware
  postCartItem = async (req, res) => {
    try {
      const userId = req.userId;
      const { productId, quantity, size } = req.body;

      // Basic validation
      if (!productId) {
        return res
          .status(400)
          .json({ message: "Product ID is required" });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      const result = await this.cartRepo.addItemToCart(
        userId,
        productId,
        quantity,
        size,
      );

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json(result.cart);
        case "INVALID_PRODUCT_ID":
          return res.status(400).json({ message: "Invalid product ID format" });
        case "INVALID_USER_ID":
          return res.status(400).json({ message: "Invalid user ID format" });
        case "PRODUCT_NOT_FOUND":
          return res.status(404).json({ message: "Product not found" });
        default:
          return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.log("Error in postCartItem", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // update item middleware
  putCartItem = async (req, res) => {
    try {
      const userId = req.userId;
      const { productId, quantity } = req.body;

      // Basic validation
      if (!productId) {
        return res.status(400).json({ message: "Product ID required" });
      }
      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }

      const result = await this.cartRepo.updateCartItem(
        userId,
        productId,
        quantity
      );

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json(result.cart);
        case "CART_NOT_FOUND":
          return res.status(404).json({ message: "Cart not found" });
        case "ITEM_NOT_FOUND":
          return res.status(404).json({ message: "Item not found" });
        case "INVALID_PRODUCT_ID":
          return res.status(400).json({ message: "Invalid product ID format" });
        case "INVALID_USER_ID":
          return res.status(400).json({ message: "Invalid user ID format" });
        case "UPDATE_FAILED":
          return res.status(500).json({ message: "Update failed" });
        default:
          return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.log("Error in putCartItem", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // delete cart item middleware
  deleteCartItem = async (req, res) => {
    try {
      const userId = req.userId;
      const productId = req.params.id;

      // Basic validation
      if (!productId) {
        return res.status(400).json({ message: "Product ID  required" });
      }

      const result = await this.cartRepo.removeCartItem(userId, productId);

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json(result.cart);
        case "INVALID_PRODUCT_ID":
          return res.status(400).json({ message: "Invalid product ID format" });
        case "INVALID_USER_ID":
          return res.status(400).json({ message: "Invalid user ID format" });
        case "CART_NOT_FOUND":
          return res.status(404).json({ message: "Cart not found" });
        case "ITEM_NOT_FOUND":
          return res.status(404).json({ message: "Item not found" });
        case "CART_EMPTY_DELETED":
          return res
            .status(204)
            .json({ message: "Cart is empty,cart deleted" });
        default:
          return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // clear cart middleware
  deleteAllCartItem = async (req, res) => {
    try {
      const userId = req.userId;
      const result = await this.cartRepo.clearCart(userId);

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json({ message: "Cart cleared" });
        case "CART_NOT_FOUND":
          return res.status(404).json({ message: "Cart not found" });
        case "DELETE_FAILED":
          return res.status(500).json({ message: "Failed to clear cart" });
        default:
          return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
