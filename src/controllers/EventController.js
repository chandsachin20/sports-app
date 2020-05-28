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
  async getEventById(req, res) {
    const { eventId } = req.params;
    try {
      const event = await Event.findById("eventId");

      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "EventId does not exist" });
    }
  },

  async getEvents(req, res) {
    try {
      const event = await Event.find({});

      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "NO events found" });
    }
  },

  async sports(req, res) {
    const { sport } = req.params;
    const query = sport || {};
    try {
      const events = await Event.find(query);
      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "no sports available" });
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
