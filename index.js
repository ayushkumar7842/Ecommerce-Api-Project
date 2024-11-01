import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import productRoutes from "./src/features/product/productRoute.js";
import userRoutes from "./src/features/user/userRoutes.js";
// import customBasicAuth from "./src/middleware/basicAuth.js";
import jwtAuth from "./src/middleware/jwtAuth.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

// middleware

// parse requests of content-type - application/x-www-form-urlencoded````````````
app.use(urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(json());

// Handling the product routes
app.use("/api/products", jwtAuth, productRoutes);

// Hadling the user routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send(`server is running at ${port}`);
});

app.listen(port, () => {
  console.log("server is started at", port);
});
