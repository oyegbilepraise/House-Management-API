

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const property_view = new Schema({
    property_id: {
        type:Mongoose.Schema.Types.ObjectId, ref:"property"
    },
    count:{
        type:String,
    },
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('property_view', property_view)