const Registration = require("../models/Registration");

module.exports = {
  async reject(req, res) {
    jwt.verify(req.token, "secret", async (err, authData) => {
      if (err) {
        res.sendStatus(401);
      } else {}
    });
    
    const { registrationId } = req.params;

    try {
      const registration = await Registration.findById(registrationId);

      registration.approval = false;
      await registration.save();

      return res.json(registration);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
