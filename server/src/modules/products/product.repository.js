//product.repository.js
import ProductModel from "./product.model.js";
import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class ProductRepository {
  constructor() {
    this.collection = null;
  }

  async getCollection() {
    // lazy initialization of collection
    if (!this.collection) {
      this.collection = getDB().collection("products");
    }
    return this.collection;
  }

  // method to get all products
  async getAll() {
    try {
      const collection = await this.getCollection();

      return await collection.find().toArray();
    } catch (error) {
      throw new Error("Error getting products: " + error.message);
    }
  }

  // method to get one product
  async getOne(id) {
    try {
      const collection = await this.getCollection();

      // check if product id is valid
      if (!ObjectId.isValid(id)) return { status: "INVALID_ID" };

      const product = await collection.findOne({
        _id: ObjectId.createFromHexString(id),
      });

      return product
        ? { status: "SUCCESS", product }
        : { status: "NOT_FOUND" };
    } catch (error) {
      throw new Error("Error getting product: " + error.message);
    }
  }

  // method to get filtered product
  async getFiltered(minPrice, maxPrice, category) {
    try {
      const collection = await this.getCollection();

      // to build dynamic query
      const query = {};

      if (minPrice) {
        query.price = { ...query.price, $gte: parseFloat(minPrice) };
      }

      if (maxPrice) {
        query.price = { ...query.price, $lte: parseFloat(maxPrice) };
      }

      if (category) {
        query.category = category;
      }

      // perform query in mongodb
      const products = await collection.find(query).toArray();

      return products.length > 0
        ? { status: "SUCCESS", products }
        : { status: "NOT_FOUND" };
    } catch (error) {
      throw new Error("Error getting filtered products: " + error.message);
    }
  }
}

// Sample test products
// var products = [
//   new ProductModel(
//     1,
//     "Nike Air Max 270",
//     "Lightweight, stylish, and incredibly comfortable sneakers for everyday use.",
//     7499.0,
//     "https://dummyimage.com/200x200/000/fff&text=Nike+Air+Max+270",
//     "Footwear",
//     ["7", "8", "9", "10"],
//     3,
//     "12"
//   ),
//   new ProductModel(
//     2,
//     "Apple iPhone 14",
//     "Latest iPhone with A15 Bionic chip, Super Retina XDR display, and improved battery life.",
//     79999.0,
//     "https://dummyimage.com/200x200/333/fff&text=iPhone+14",
//     "Electronics",
//     [],
//     3,
//     "15"
//   ),
//   new ProductModel(
//     3,
//     "Levi's Denim Jacket",
//     "Classic fit denim jacket with modern trims and comfortable stitching.",
//     3499.0,
//     "https://dummyimage.com/200x200/123456/ffffff&text=Levi's+Jacket",
//     "Clothing",
//     ["S", "M", "L", "XL"],
//     3,
//     "15"
//   ),
//   new ProductModel(
//     4,
//     "Sony WH-1000XM5",
//     "Industry-leading noise cancellation headphones with premium sound quality.",
//     29990.0,
//     "https://dummyimage.com/200x200/000/aaa&text=Sony+XM5",
//     "Audio",
//     [],
//     4,
//     "15"
//   ),
//   new ProductModel(
//     5,
//     "Samsung 55'' 4K UHD Smart TV",
//     "Smart LED TV with crystal-clear visuals, 4K resolution, and smart connectivity.",
//     42999.0,
//     "https://dummyimage.com/200x200/000000/00ffcc&text=Samsung+4K+TV",
//     "Electronics",
//     [],
//     2,
//     "15"
//   ),
//   new ProductModel(
//     6,
//     "Puma Sports T-shirt",
//     "Breathable, sweat-wicking t-shirt for gym and outdoor workouts.",
//     899.0,
//     "https://dummyimage.com/200x200/ff0066/ffffff&text=Puma+Tee",
//     "Clothing",
//     ["S", "M", "L"],
//     5,
//     "15"
//   ),
// ];
