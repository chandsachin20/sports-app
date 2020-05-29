const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  async createEvent(req, res) {
    try {
      const { title, description, price } = req.body;

      //read session from sessions headers
      const { userId } = req.headers;

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
  },
  

  async deleteEvent(req, res) {
    const { eventId } = req.params;

    try {
      const events = Event.findByIdAndDelete(eventId);
      if (events) {
        return res.status(204);
      }
    } catch (error) {
      return res.status(404).json({ message: "no sports available" });
      4;
    }
  },
};
