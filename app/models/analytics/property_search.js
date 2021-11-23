

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const property_search = new Schema({
    property_id: {
        type:Mongoose.Schema.Types.ObjectId, ref:"propert"
    },
    count:{
        type:String,
    },
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('property_search', property_search)