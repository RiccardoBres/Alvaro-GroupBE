const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
name: {
    type : String,
    required: true
} ,
surname: {
    type : String,
    require : false
},
email: {
    type : String,
    require: true
},
password: {
    type : String,
    require: true
},


},{timestamps :true, strict :true});


module.exports = mongoose.model("User", UserModel, "Users");