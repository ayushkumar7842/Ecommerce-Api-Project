import UserModel from "../user/userModel.js";

export default class ProductModel {
  constructor(id, name, description, imageUrl, category, prices, sizes) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.category = category;
    this.prices = prices;
    this.sizes = sizes;
  }

  // return all the products
  static getAll() {
    return products;
  }

  // get the any product with the given id
  static getProductById(productId) {
    const product = products.find((product) => {
      return product.id === productId;
    });
    return product;
  }

  // filter the product based on the given data
  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        product.prices >= minPrice &&
        product.prices <= maxPrice &&
        product.category === category
      );
    });
    return result;
  }

  static isCategoryValid(categoryName) {
    return categoies.includes(categoryName);
  }

  // add the new product
  static addNewProduct(product) {
    // Create a new ProductModel instance with an auto-generated ID
    const newProduct = new ProductModel(
      products.length + 1, // Auto-generate the ID based on the current length
      product.name,
      product.description,
      product.imageUrl,
      product.category,
      product.price,
      product.sizes
    );

    // Add the new product to the products array
    products.push(newProduct);
    // return the status
    return true;
  }

  // rate the product
  static rateProduct(userId, productId, rating) {
    // validate the user and product
    const user = UserModel.getAll().find((singleUser) => {
      return singleUser.id === userId;
    });

    // if user is not found then return the message with user not found
    if (!user) {
      return {
        success: false,
        message: "User Not Found",
      };
    }

    // validate the product
    const product = ProductModel.getProductById(productId);

    if (!product) {
      return {
        success: false,
        message: "Product Not Found",
      };
    }

    // Check if there are any ratings in the product and if not then add ratings array.
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userID: userId,
        rating: rating,
      });
    } else {
      // if ratings array available in the product
      // then check that same user is making rating in the product
      const existingRatingIndex = product.ratings.findIndex((rating) => {
        return rating.userID === userId;
      });

      // if it exists then update the rating with same user id
      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex]["rating"] = rating;
      } else {
        // no user exists
        product.ratings.push({
          userID: userId,
          rating: rating,
        });
      }
    }
  }
}

const products = [
  new ProductModel(
    1,
    "Product 1",
    "Description 1",
    "image1.jpg",
    "category_a",
    9.99,
    []
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description 2",
    "image2.jpg",
    "category_b",
    19.99,
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description 3",
    "image3.jpg",
    "category_c",
    29.99,
    ["S"]
  ),
];

// categoies
const categoies = ["category_a", "category_b", "category_c"];
// minPrice=10&maxPrice=20&category=
