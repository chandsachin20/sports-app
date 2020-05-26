const mongoose = require('mongoose');

const EventSchema  = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumnail:String,
    date: Date,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})


module.exports = mongoose.model("Event", EventSchema);