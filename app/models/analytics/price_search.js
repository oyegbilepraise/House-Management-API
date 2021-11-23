

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const price_analytics = new Schema({
    min_price: {
        type:String
    },
    max_price: {
        type:String
    },
    currency: {
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

module.exports =  model('price_analytics', price_analytics)