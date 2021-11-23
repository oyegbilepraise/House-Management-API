

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const unavailable_search = new Schema({
    name: {
        type:String
    },
    location: {
        default:null,
        type:String
    },
    description: {
        default:null,
        type:String
    },
    min_price: {
        default:null,
        type:String
    },
    max_price: {
        default:null,
        type:String
    },
    currency: {
        default:null,
        type:String
    },
    count:{
        default:0,
        type:String,
    },
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('unavailable_search', unavailable_search)