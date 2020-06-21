const Registration = require("../models/Registration");
const Event = require("../models/Event");
const jwt = require("jsonwebtoken");

module.exports = {
  async Create(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const userId = authData.user._id;
        const { eventId } = req.params;

       // const { date } = req.body;

        const registration = Registration.Create({
          user: userId,
          event: eventId,
         // date: date,
        });
        await registration
          .populate("event")
          .populate("user", "password")
          .execPopulate();

        const ownerSocket = req.connectedUsers[registration.event.user_id];


        if(ownerSocket){
            req.io.to(ownerSocket).emit('registration request', registration)
        }

        return res.json(registration);
      }
    });
  },
  async getRegistration(req, res) {
    const { registrationid } = req.params;

    try {
      const registration = await Registration.findById(registrationid);

      return res.json(registration);
    } catch (error) {
      return res.status(400).json({ message: "registration not found" });
    }
  },
};
