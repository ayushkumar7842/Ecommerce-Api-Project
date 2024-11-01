import bcrypt from "bcrypt";

const saltRounds = 10; // Adjust this as necessary
// function to hash th password
const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// at the time of registration only the password will be hashed
const userRegisteration = async (email, password) => {
  try {
    const value = await hashPassword(password);

    // Now you can store `hashedPassword` instead of the plain password in the database
    const newUser = {
      email,
      password: value,
      // Add other user fields as needed
    };
    return newUser;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

export default userRegisteration;
