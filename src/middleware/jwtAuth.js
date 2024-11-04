import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import UserModel from "../features/user/userModel.js";

// dotenv.config();

const jwtAuth = (req, res, next) => {
  try {
    // 1. Read and verify the auth header
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No credentials provided",
      });
    }

    // 2. Extract the token from the header
    const token = authHeader.split(" ")[1];

    // 3. Verify the token
    const secretKey = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secretKey);
    console.log(payload);
    // Convert `iat` to milliseconds and create a Date object
    const issueDate = new Date(payload.iat * 1000);

    // Format the date as needed (e.g., "MM/DD/YYYY HH:mm:ss")
    console.log(`Token was issued at: ${issueDate.toLocaleString()}`);

    // 4. Check if the user exists
    const email = payload.email;
    // we are checking this because it is possible that user is removed but the token is present and still not expired
    const user = UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User does not exist",
      });
    }

    console.log(user);
    // 5. Attach user information to the request object (optional)
    req.user = user;

    // 6. Proceed to the next middleware
    next();
  } catch (err) {
    console.error("JWT Authentication Error:", err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
      error: err.message,
    });
  }
};

export default jwtAuth;
