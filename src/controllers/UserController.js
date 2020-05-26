const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;

      const existenceUser = await User.findOne({ email });

      if (!existenceUser) {
        const hashPassword = await bcrypt.hashPassword(password, 10);
        const user = await User.create({
          firstName: firstName,
          lastName: lastName,
          password: password,
          email: email,
        });

        return res.json(user);
      }
      return res.status(400).json({
        message: "email already exist! do you want to login  instead?",
      });
    } catch (error) {
      throw Error(`Error while registering new user:${error}`);
    }
  },


  async getUserById(req, res){
    const { userId } = req.params;

    try{

      const user = await User.findById(userId);
      return res.json(user);

    }catch(error){
      return res.status(400).json({
        message: "user id does not exist! do you want to register  instead?",
      });
    }
  }
};
