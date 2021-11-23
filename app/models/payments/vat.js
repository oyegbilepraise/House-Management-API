

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const VatSchema = new Schema({

    amount: {

        type:String

    },
    description: {

        type:String

    },
    status:{
        default:"active",
        type:String,
    },
    created_by: {
        type:String
    },
    updated_by: {
        default:null,
        type:String
    },

    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('vat', VatSchema)
