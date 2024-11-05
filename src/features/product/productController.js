import ProductModel from "./productModel.js";

export default class ProductController {
  // get all the products from the model
  getAllProducts = (req, res) => {
    try {
      const products = ProductModel.getAll();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  //add the product to the model
  addProduct = (req, res) => {
    try {
      // add the product
      let status = ProductModel.addNewProduct(req.body);

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Product Data is not added",
        });
      }
      // if the product is added successfully
      return res.status(200).json({
        success: true,
        message: "Product is added successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  // rate the product
  rateProduct = (req, res) => {
    try {
      const { productId, rating } = req.body;
      const userId = req.user.id;
      console.log(userId);
      const ratingValue = Number(rating);

      if (Number.isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
        return res.status(401).json({
          success: false,
          message: "Rating is invalid",
        });
      }

      const isRatingAdded = ProductModel.rateProduct(
        userId,
        productId,
        ratingValue
      );

      if (!isRatingAdded.success) {
        res.status(400).json({
          success: false,
          message: error,
        });
      } else {
        res.status(200).json({
          success: true,
          data: isRatingAdded.data,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  // get any one product with the id
  getOneProduct = (req, res) => {
    try {
      const { id } = req.params;
      // convert the id into the number
      const productId = Number(id);

      // validate the product id
      if (Number.isNaN(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Product Id",
        });
      }

      // get the product by the id
      const product = ProductModel.getProductById(productId);

      if (!product) {
        return res.status(400).json({
          success: false,
          data: "Product not found",
        });
      }

      // if the product is found
      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  // filter the product base on the provided data
  filterProducts = (req, res) => {
    try {
      // get the data from the req.query
      const { minPrice, maxPrice, category } = req.query;

      // all the given data is valid then you call the filter function
      const result = ProductModel.filter(+minPrice, +maxPrice, category);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
}
