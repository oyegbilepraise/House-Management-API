

const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const InvoiceSchema = new Schema({

    identity: {
        default: 00,
        type:String

    },
    invoice_link: {
        default: null,
        type:String

    },
    created_by: {
        type:String
    },
    updated_by: {
        default: null,
        type:String
    },
    status: {
        default: "not sent out",
        type:String
    },
    send_by: {
        default:null,
        type:String
    },
    sendAt: {
        default:null,
        type:String
    },

    createdAt: {
        default: Date.now(),
        type: Date
    } ,
    updatedAt: {
        default: null,
        type: Date
    } 
})

module.exports =  model('invoice', InvoiceSchema)