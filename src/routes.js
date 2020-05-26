const express = require("express");
const routes = express.Router();
const userController = require('./controllers/UserController');

routes.get("/status", (req, res) => {
  res.send({status:200});
});

routes.post("/user/register", userController.createUser);
routes.get("/user/:userId", userController.getUserById);

module.exports = routes;