const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Model = Mongoose.model;


/* 
 
Request Form

Name  Phone Email Type of Property Location of Property Price range Visitor’s Country (determined by IP address) 



 */



var PropertyRequestSchema = new Schema({
	
	 
	
	type:{
		required:true,
		type:String
	}
	,
	location:{
		required:true,
		type:String
	}
	,
	
	name:{
		type:String,
		required:true,
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
		
	}
	,
	email:{
		type:String,
	required:true,
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
		
	},
	
	available:{
		type:String,
		default:"false",
		
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
	},
	country:{
		type:String,
		required:true,
	},
	phone:{
		type:String,
		required:true
		 
	}, 
	
	description:{
		type:String 
		 
	},
	price_range:{
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



module.exports = Model("PropertyRequest",PropertyRequestSchema);