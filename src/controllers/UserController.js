const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;

      const existenceUser = await User.findOne({ email });

      if (!existenceUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        const userResponse = await User.create({
          firstName: firstName,
          lastName: lastName,
          password: hashPassword,
          email: email,
        });

        return jwt.sign({ user: userResponse }, "secret", (err, token) => {
        //  console.log()
          return res.json({
            user: token,
            user_id: userResponse._id,
          });
        });
      } else {
        return res.status(400).json({
          message: "email already exist! do you want to login  instead?",
        });
      }
    } catch (error) {
      throw Error(`Error while registering new user:${error}`);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: "user id does not exist! do you want to register  instead?",
      });
    }
  },
};
