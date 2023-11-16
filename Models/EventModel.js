const mongoose = require("mongoose")

const EventModel = new mongoose.Schema({
name: {
    type : String,
    required: true
} ,
image: {
    type : String,
    require : false
},
location: {
    type : String,
    require: true
},
date: {
    type : String,
    require: true
},
generalInfo: {
    type : String,
    require: true
}

},{timestamps :true, strict :true});


module.exports = mongoose.model("Event", EventModel, "Events");