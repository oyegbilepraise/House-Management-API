const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Model = Mongoose.model;


var PropertiesCategoriesSchema = new Schema({
	name:{
		type:String,
		required:true,
		unique:true,
		set: function(v){return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
		
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
,{timestamps: true});



module.exports = Model("PropertiesCategories",PropertiesCategoriesSchema);