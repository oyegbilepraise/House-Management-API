

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const monthly_price_analytics = new Schema({
     
     month: {
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

module.exports =  model('monthly_price_analytics', monthly_price_analytics)