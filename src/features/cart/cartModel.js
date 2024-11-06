export default class CartModel {
  constructor(id, productId, userId, quantity) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }

  static addProductToCart(productId, userId, quantity) {
    const cart = new CartModel(productId, userId, quantity);
    cart.id = carts.length + 1;
    carts.push(cart);
    return cart;
  }
}

var carts = [new CartModel(1, 2, 1, 1)];
