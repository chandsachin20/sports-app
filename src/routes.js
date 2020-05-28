const express = require("express");
const multer = require('multer');


const userController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const uploadConfig = require('./config/upload')
const Dashboard  = require('./controllers/Dashboard')
const LoginController = require('./controllers/LoginController')

const routes = express.Router();
const upload = multer(uploadConfig);


routes.get("/status", (req, res) => {
  res.send({status:200});
});


//login controller
routes.post("/login", LoginController.loginStore);
//Event 
routes.get("/event/:sports", Dashboard.sports);
routes.get("/events", Dashboard.getEvents);
routes.get("/event/:eventId", Dashboard.getEventById  );


//upload is a middleware to upload the file
routes.post("/event", upload.single('thumbnail'), EventController.createEvent );
routes.delete("/event/:eventId", EventController.deleteEvent)

//user
routes.post("/user/register", userController.createUser);
routes.get("/user/:userId", userController.getUserById);

module.exports = routes;