

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const PaymentSchema = new Schema({

    name: {
        type:String
    },
    unit: {

        type:String

    },
    price: {
        default:null,
        type:String
    },

    currency: {

        type:String
    },

    status:{

        default:"pending",
        type:String,
    },
     

    createdAt: {
        default: Date.now(),
        type: Date
    },
    updatedAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('payment', PaymentSchema)