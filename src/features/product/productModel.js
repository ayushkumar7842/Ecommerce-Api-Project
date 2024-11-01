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
