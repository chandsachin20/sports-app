const Registration = require('../models/Registration');
const Event = require('../models/Event');

module.exports = {
    async Create(req,res){
        const { userId} = req.headers;
        const {eventId} = req.params;

        const {date} = req.body;

        const registration = Registration.Create({
            user:user._id,
            event:eventId,
            date:date,

        })
        await registration
        .populate('event')
        .populate('user','password')
        .execPopulate();
        return res.json(registration);
       
    },
    async getRegistration(req, res){
        const {registrationid} = req.params;

        try {
            const registration = await Registration.findById(registrationid);

                return res.json(registration);
        } catch (error) {
            return res.status(400).json({message:'registration not found'});
        }
    }
}