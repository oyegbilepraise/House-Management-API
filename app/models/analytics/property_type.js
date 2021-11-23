

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const propetyType_Schema = new Schema({
    
    property_type_id: {
         type:Mongoose.Schema.Types.ObjectId, ref:"PropertiesType"
    },
    count:{
        type:String,
    },
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('property_type_analytics', propetyType_Schema)