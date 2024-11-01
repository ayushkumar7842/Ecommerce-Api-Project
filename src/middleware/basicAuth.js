// middlewares/basicAuth.js
// import bAuth from "express-basic-auth";
import UserModel from "../features/user/userModel.js";

// custom basic authentication
const customBasicAuth = (req, res, next) => {
  // 1. check for authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No credentials provided",
    });
  }

  // 2. Decode the credentials
  const credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(credentials, "base64").toString(
    "ascii"
  );
  const [email, password] = decodedCredentials.split(":");
  // check email and password
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      messsage: "Unauthorized: Invalid credentials format",
    });
  }

  // 3. Retrieve user from database based on email
  const user = UserModel.getUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid email or password",
    });
  }

  // 4. Compare passwords securely using bcrypt
  const isPasswordValid = user.password === password;
  if (!isPasswordValid) {
    return res.status(401).send("Unauthorized: Invalid email or password");
  }

  // 5. Authentication successful, proceed to the next middleware/route
  next();
};

export default customBasicAuth;
// // Custom authorizer function
// const basicAuthorizer = (email, password) => {
//   // 1. Get all users
//   const users = UserModel.getAll();

//   // 2. Find the user by comparing the email
//   const user = users.find((u) => bAuth.safeCompare(email, u.email));

//   if (user) {
//     // 3. Compare the password securely
//     return bAuth.safeCompare(password, user.password);
//   } else {
//     // 4. If user not found, return false (authentication fails)
//     return false;
//   }
// };

// // Setup the basic authentication middleware with custom authorizer
// const authorizer = bAuth({
//   authorizer: basicAuthorizer,
//   challenge: true, // Enables the authentication challenge
//   unauthorizedResponse: (req) => "Unauthorized", // Custom response for unauthorized requests
// });

// export default authorizer;
