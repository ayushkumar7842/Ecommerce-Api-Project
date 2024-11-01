export const validateFilterData = (req, res, next) => {
  const { minPrice, maxPrice, category } = req.query;

  // Check if all parameters are empty or not provided
  if (!minPrice || !maxPrice || !category) {
    return res.status(400).json({
      success: false,
      message:
        "All filter criterion (minPrice, maxPrice, or category) is required.",
    });
  }

  // Validate the minPrice
  if (minPrice !== undefined) {
    const minPriceData = Number(minPrice);
    if (Number.isNaN(minPriceData) || minPriceData < 0) {
      return res.status(400).json({
        success: false,
        message: "Min price is invalid. It must be a non-negative number.",
      });
    }
  }

  // Validate the maxPrice
  if (maxPrice !== undefined) {
    const maxPriceData = Number(maxPrice);
    if (Number.isNaN(maxPriceData) || maxPriceData < 0) {
      return res.status(400).json({
        success: false,
        message: "Max price is invalid. It must be a non-negative number.",
      });
    }
  }

  // Validate that minPrice is not greater than maxPrice
  if (minPrice !== undefined && maxPrice !== undefined) {
    const minPriceData = Number(minPrice);
    const maxPriceData = Number(maxPrice);
    if (minPriceData > maxPriceData) {
      return res.status(400).json({
        success: false,
        message: "Min price cannot be greater than max price.",
      });
    }
  }
  // category should only contain alphabets
  // Validate the category
  if (category !== undefined) {
    if (!(typeof category === "string") || !(category.trim().length > 0)) {
      return res.status(400).json({
        success: false,
        message: "Category is invalid. It must be a non-empty string.",
      });
    }

    // Optionally, if the category should not be numeric, add this check:
    if (!isNaN(Number(category))) {
      return res.status(400).json({
        success: false,
        message: "Category should not be a number.",
      });
    }
  }

  // If all the given data is valid, call the next middleware or route handler
  next();
};
