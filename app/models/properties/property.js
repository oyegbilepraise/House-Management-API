const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Model = Mongoose.model;


var PropertySchema = new Schema({
	
	categoryId:[{
		required:true,
		type:Schema.Types.ObjectId,
		ref:"PropertiesCategories"
	}],
	
	typeId:[{
		required:true,
		type:Schema.Types.ObjectId,
		ref:"PropertiesType"
	}]
	,
	/* 
	categoryName:{ type: String, ref: 'Event' },
	typeName:{ type: String, ref: 'Event' } */
	
	name:{
		type:String,
		required:true, 
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()},
		unique:false
		
	},
	
	suspended:{
		type:String,
		default:"false",
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
	},
	units:{
	type:Number,
		required:true	
	}
	,
	data:{
		type:Schema.Types.Mixed,
		required:true
	},
	createdAt:{
		type:String,
		default:Date.now()
	},
	createdBy:{
		type:String,
		required:true,
		set: function(v){return v.toLowerCase().trim()} 
	}
	
	
}
	,{timestamps: true}
	);

module.exports = Model("Property",PropertySchema);