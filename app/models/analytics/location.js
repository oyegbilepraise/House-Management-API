

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const locationSchema = new Schema({
    state: {

        type:String
    },
    city: {

        type:String

    },


    count:{
        
        type:String,
    },
     

    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('locations', locationSchema)