const Event = require("../models/Event");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

module.exports = {
  getEventById(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { eventId } = req.params;
        try {
          const events = await Event.findById(eventId);

          if (events) {
            return res.json({ authData: authData, events });
          }
        } catch (error) {
          return res.status(400).json({ message: "EventId does not exist" });
        }
      }
    });
  },

  getEvents(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        //console.log("token: ", req.token);
        const { sport } = req.params;
        const query = sport ? { sport } : {};
        try {
          const event = await Event.find({ query });
          if (event) {
            return res.json({ authData, event });
          }
        } catch (error) {
          return res.status(400).json({ message: "NO events found" });
        }
      }
    });
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

  getEventsByUserId(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {
        const { userId } = req.headers;
        try {
          const events = await Event.find({ user: authData.user._id });
          if (events) {
            return res.json({authData, events});
          }
        } catch (error) {
          return res
            .status(400)
            .json({ message: "we do not have any events with the usr id" });
        }
      }
    });
  },
};
