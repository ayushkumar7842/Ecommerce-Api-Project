// import userRegisteration from "./src/middleware/hashPassword.js";
// // const arr = ["user@gmail.com", "123456"];

// // const [email, password] = arr;

// // console.log(email);
// // console.log(password);

// // const str = "My name is ayush kumar";

// // const data = str.split(" ");
// // console.log(data);

// // for (let i = 0; i < data.length; i++) {
// //   console.log(data[i]);
// // }

// const check = async () => {
//   try {
//     const data = await userRegisteration("test@gmail.com", "123456");
//     console.log(data);
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     throw error;
//   }
// };

// check();

import { configDotenv } from "dotenv"; 
configDotenv();

console.log(process.env.SECRET_KEY);

// (JWT) are referred to as stateless because the authorizing server needs to maintain no state; the token itself is all that is needed to verify a token bearer's authorization.

// In stateless authentication there is no need to store user information in the session. We can easily use the same token for fetching a secure resource from a domain other than the one we are logged in to. 

//+++++++++++ adavantage ++++++++++++++++

// Since JWTs already contain necessary information about the user, they reduce the need for extra queries to a database for user data. 