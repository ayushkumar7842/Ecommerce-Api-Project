import ProductModel from "../features/product/productModel.js";
export const validateProductData = (req, res, next) => {
  // Destructure the required fields from the request body
  const { name, description, imageUrl, category, prices, sizes } = req.body;

  // Check if required fields are present
  if (!name) {
    return res.status(400).json({ error: "Product name is required." });
  }
  if (!description) {
    return res.status(400).json({ error: "Product description is required." });
  }
  if (!imageUrl) {
    return res.status(400).json({ error: "Product image URL is required." });
  }
  // category name is present in the categories array
  if (!category || !ProductModel.isCategoryValid(category)) {
    return res.status(400).json({ error: "Product category is required." });
  }
  if (!prices) {
    return res.status(400).json({ error: "Product prices are required." });
  }
  if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
    return res
      .status(400)
      .json({ error: "Product sizes must be a non-empty array." });
  }

  // Additional validation for data types and formats
  // Check if the name is a string
  if (typeof name !== "string") {
    return res.status(400).json({ error: "Product name must be a string." });
  }
  // Check if the description is a string
  if (typeof description !== "string") {
    return res
      .status(400)
      .json({ error: "Product description must be a string." });
  }
  // Check if the image URL is a string and has a valid image file extension
  if (
    typeof imageUrl !== "string" ||
    !/\.(jpg|jpeg|png|gif)$/i.test(imageUrl)
  ) {
    return res
      .status(400)
      .json({ error: "Product image URL must be a valid image file." });
  }
  // Check if the category is a string
  if (typeof category !== "string") {
    return res
      .status(400)
      .json({ error: "Product category must be a string." });
  }
  // Check if all elements in the sizes array are non-empty strings
  if (!sizes.every((size) => typeof size === "string" && size.length > 0)) {
    return res
      .status(400)
      .json({ error: "All sizes must be non-empty strings." });
  }

  // If all validations pass, proceed to the next middleware or route handler
  next();
};
