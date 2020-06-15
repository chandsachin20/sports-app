const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
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
    const { sport } = req.params;
    const query = sport ? { sport } : {};
    try {
      const event = await Event.find(query);

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

  async getEventsByUserId(req, res) {
    const { userId } = req.headers;
    try {
      const events = await Event.find({ user: userId });
      if (events) {
        return res.json(events);
      }
    } catch (error) {
      return res.status(400).json({ message: "we do not have any events with the usr id" });
    }
  },
};
