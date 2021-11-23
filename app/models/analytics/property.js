

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const property = new Schema({
    name: {
        type:String
    },
    area:{
        type:String,
    },
    price:{
        type:String,
    },
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('property', property)