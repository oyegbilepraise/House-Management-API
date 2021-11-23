const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const Model = Mongoose.model;


 


var PropertyCheckInSchema = new Schema({
	 propertyId:{
		required:true,
		type:Schema.Types.ObjectId
	},
	
	 
	
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
	occupation:{
		type:String,
		required:true,
	},
	dob:{
		type:String,
		required:true
		 
	}, 
	kids:{
	type:Number,
		default:0
	},
	adults:{
	type:Number,
		default:0
	},
	currency:{
		type:String,
		required:true,
		set: function(v){ return v.toUppwerCase().trim()}
		
	},
	cost:{
		type:Number ,
		 required:true
	},
	
 	createdAt:{
		type:String,
		default:Date.now()
	}
	,
	amount_paid:{
		type:Number,
			default:0
		 
	},
	
	dates:[{
		type:String, 
		set: function(v){return v.toLowerCase().trim()} ,
		required:true
		
	}],
checkOutDateEpoch{
	type:String,
	required:true
},
	requestDate:{
		type:Number, 
		default:Date.now(),
		set: function(v){return v.toLowerCase().trim()} ,
		required:true
		
	},
	
	
	 
	paidDate:{
		type:String 
	}
	,
	paidDateEpoch:{
		type:Number
		 
	}
	,cartDateEpoch:{
		type:Number,
		 default:Date.now()
	}
	,
	paid:{
		type:String,
		default:"false",
		
		set: function(v){ return v.toLowerCase().trim()},
		get: function(v){return v.toUpperCase().trim()}
		
	}
	
	
}
	,{timestamps: true}
	);



module.exports = Model("PropertyCheckIn",PropertyCheckInSchema);