const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')


module.exports = {
  async loginStore(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email);
      if (!email || !password) {
        return res.status(200).json({ message: "email or password missing" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(200)
          .json({ message: "user not found! Do you want to register" });
      }
      
     
      if (user && await bcrypt.compare(password, user.password)) {
        const userResponse = {
          _id:user._id,
          email: user.email,
          firstName:user.firstName,
          lastName:user.lastName
        }
        //token 
        return jwt.sign({user: userResponse}, 'secret', (err, token) => {
          return res.json({
            user:token,
            user_id:user._id
          })
        })

       // return res.json(userResponse);
      } else {
        return res
          .status(200)
          .json({ message: "Email or Password does not match" })
      }
    } catch (error) {
        throw new Error(`Error while authenticating a user${error}`)
    }
  },
};
