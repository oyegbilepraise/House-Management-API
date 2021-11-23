const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Model = Mongoose.model;


var ParametersSchema = new Schema({
	
	categoryId:{
		required:true,
		type:Schema.Types.ObjectId
	},
	
	typeId:{
		required:true,
		type:Schema.Types.ObjectId
	}
	,
	
	 
	
	 
	parameters:{
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

module.exports = Model("Parameters",ParametersSchema);