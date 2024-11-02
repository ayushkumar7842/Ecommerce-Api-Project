import express from "express";
import ProductController from "./productController.js";
import { validateProductData } from "../../middleware/validateProductData.js";
import { validateFilterData } from "../../middleware/validateFilterData.js";

const router = express.Router();

// Create the instance of ProductController
const productController = new ProductController();

// Define routes
router.get("/", productController.getAllProducts);
router.post("/", validateProductData, productController.addProduct);

// Place '/filter' route before '/:id' to avoid conflicts
router.get("/filter", validateFilterData, productController.filterProducts);
router.get("/rate", productController.rateProduct);
router.get("/:id", productController.getOneProduct);

// Consider using PUT or PATCH for updating resources
// router.post("/rate", productController.rateProduct); 

export default router;
