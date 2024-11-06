import CartModel from "./cartModel";

export default class CartController {
  addToCart = (req, res) => {
    const { productId, quantity } = req.body;
    const userdId = req.user.id;
    const cart = CartModel.addProductToCart(productId, userdId, quantity);
    res.status(200).json({
      success: true,
      data: cart,
    });
  };
}
