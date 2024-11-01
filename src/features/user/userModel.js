export default class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static signUp(name, email, password, type) {
    const newUser = new UserModel(
      users.length + 1,
      name,
      email,
      password,
      type
    );
    users.push(newUser);
    return newUser;
  }

  static signIn(email) {
    // get the users by the email and
    const userData = users.find((user) => {
      return user.email === email;
    });

    return userData;
  }

  static getUserByEmail(email) {
    const userData = users.find((user) => {
      return user.email === email;
    });

    return userData;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: "Seller User",
    email: "seller@ecom.com",
    password: "password1",
    type: "Seller",
  },
  {
    id: 2,
    name: "Sumit",
    email: "sumit@gmail.com",
    password: "sumit123",
    type: "Customer",
  },
];
