

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const PromotionSchema = new Schema({
    property_id: {
        type:Mongoose.Schema.Types.ObjectId, ref:"property"
    },
    type: {
        type:String
    },
    duration:{
        type:String,
    },
    status:{
        default:"active",
        type:String,
    },
    toggleTime: {
        default: Date.now(),
        type: Date
    },
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('promotions', PromotionSchema)