import express from "express";
import CartController from "./cartController.js";

const router = express.Router();

// create the instance of cart controller
const cartController = new CartController();

router.post("/", cartController.addToCart);

export default router;
