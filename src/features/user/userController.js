import UserModel from "./userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class UserController {
  signUp = (req, res) => {
    try {
      const { name, email, password, type } = req.body;
      // add the user data into the model
      const user = UserModel.signUp(name, email, password, type);
      // send the response with user
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  signIn = (req, res) => {
    try {
      // get the data
      const { email, password } = req.body;
      // send the email and password to the model to check it is present or not
      const user = UserModel.signIn(email);
      // if the result is invalid
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      // if the exits then check the password
      let ispasswordValid = user.password === password;

      if (!ispasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      // generate the token
      // 1. payload
      const payload = {
        userId: user.id,
        email: user.email,
      };
      // 2. secret key
      const secretKey = process.env.SECRET_KEY;

      // 3. Create token.
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

      // 2. Send token.
      return res.status(200).json({
        success: true,
        token: token,
      });
    } catch (error) {
      console.error("Sign-in Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error. Please try again later.",
      });
    }
  };
}
