const mongoose = require("mongoose")

const CustomersModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    postal: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    purchases: {
        type: Array,
        required: true  
    }, 
    sent: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model("Customer", CustomersModel, "Customers");



