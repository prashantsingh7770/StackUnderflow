// product.controller.js
export default class ProductController {
  constructor(productRepository) {
    this.productRepo = productRepository;
  }

  // middleware to get all products
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productRepo.getAll();

      if (products.length === 0)
        return res.status(404).json({ message: "No products found" });

      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // middleware to get one product
  getOneProduct = async (req, res) => {
    try {
      const result = await this.productRepo.getOne(req.params.id);

      switch (result.status) {
        case "SUCCESS":
          return res.status(200).json(result.product);
        case "INVALID_ID":
          return res.status(400).json({ message: "Invalid product ID" });
        case "NOT_FOUND":
          return res.status(404).json({ message: "Product not found" });
        default:
          return res
            .status(500)
            .json({ message: "Unexpected repository result" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // middleware to get filtered products
  getFilteredProducts = async (req, res) => {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const result = await this.productRepo.getFiltered(
        minPrice,
        maxPrice,
        category
      );

      switch(result.status){
        case "SUCCESS":
            return res.status(200).json(result.products);
        case "NOT_FOUND":
            return res.status(404).json({ message: "Product not found" });
        default:
            return res.status(500).json({ message: "Unexpected repository result" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
