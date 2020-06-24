const express = require("express");
const multer = require('multer');
const verifyToken  = require('../src/config/verifyToken')

const userController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const uploadConfig = require('./config/upload')
const Dashboard  = require('./controllers/Dashboard')
const LoginController = require('./controllers/LoginController')
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');
const routes = express.Router();
const upload = multer(uploadConfig);


routes.get("/status", (req, res) => {
  res.send({status:200});
});


//login controller
routes.post("/login", LoginController.loginStore);
//Event 
routes.get("/dashboard/:sports",verifyToken,  Dashboard.sports);
routes.get("/dashboard",verifyToken, Dashboard.getEvents);
routes.get("/event/:eventId",verifyToken, Dashboard.getEventById  );
routes.get("/user/events",verifyToken, Dashboard.getEventsByUserId);

//upload is a middleware to upload the file
routes.post("/event", verifyToken, upload.single('thumbnail'), EventController.createEvent );
routes.delete("/event/:eventId",verifyToken, EventController.deleteEvent)

//user
routes.post("/user/register", userController.createUser);
routes.get("/user/:userId", userController.getUserById);



//registration routes
routes.post('/register/:eventId',verifyToken, RegistrationController.Create);
routes.get('/registration/:registrationId', RegistrationController.getRegistration)
routes.get('/registration/:registrationId/approval', verifyToken,ApprovalController.approval);
routes.get('/registration/:registrationId/rejection', verifyToken,RejectionController.reject);


module.exports = routes;