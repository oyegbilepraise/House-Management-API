const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Model = Mongoose.model;

/* 

Parameters for contact form:

Name

Phone

Email

Message

Visitor’s Country (determined by IP address)

 */
var support = new Schema({
	
	 
	
	name:{
		type:String,
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
		
	},
	phone:{
		type:String 
		
	}
	,
	email:{
		type:String,
	
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
		
	},
	
	read:{
		type:String,
		default:"false",
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
	},
	message:{
		type:String
	},
	country:{
		type:String,
		required:true
	},
	 
	createdAt:{
		type:String,
		default:Date.now()
	},
	updatedBy:{
		type:String, 
		set: function(v){return v.toLowerCase().trim()} 
	}
	
	
	
	
	
	
}
	,{timestamps: true}
	);



module.exports = Model("support",support);