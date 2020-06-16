const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  createEvent(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
          const { title, description, price } = req.body;

          //read session from sessions headers
          const { userId } = authData.user._id;
          const { fileName } = req.file;

          const user = await User.findById(userId);

          if (!user) {
            return res.status(400).json({ message: "user does not exist" });
          }

          const event = await Event.create({
            title,
            description,
            price: parseFloat(price),
            user: userId,
            thumbnail: fileName,
          });

          return res.json(event);
        } catch (error) {
          return res.status(400).json({
            message: "Not able to create. try again",
          });
        }
      }
    });
  },

  deleteEvent(req, res) {
    wt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { eventId } = req.params;
        try {
          const events = Event.findByIdAndDelete(eventId);
          if (events) {
            return res.status(204).send();
          }
        } catch (error) {
          return res.status(404).json({ message: "no sports available" });
          
        }
      }
    });
  },
};
