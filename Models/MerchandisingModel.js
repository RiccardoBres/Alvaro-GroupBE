const mongoose = require("mongoose")

const MerchandisingModel = new mongoose.Schema({
name: {
    type : String,
    required: true
} ,
image: {
    type : String,
    require : false
},
size: {
    type : String,
    require: true
},
price: {
    type : Number,
    require: true
},


},{timestamps :true, strict :true});


module.exports = mongoose.model("Merch", MerchandisingModel, "Merchandising");