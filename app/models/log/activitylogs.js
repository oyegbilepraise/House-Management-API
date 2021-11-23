

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const log = new Schema({
     message:String,
     
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('logs', log)