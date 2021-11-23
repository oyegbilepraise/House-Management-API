const PropertyControllers = require("../../controllers/properties/property");
var LogError = require("../../helpers/logError");
var Misc = require("../../helpers/misc");

class PropertyMiddleWare {
	
	constructor(){
		//console.log(".....");
	}
	
	
	  create(req,res,next){

try { 
PropertyControllers.create(req.body.name,req.body.typeId,req.body.data,req.adminEmail)
.then(result=>{
	 
	  
	 
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	 console.log(err,"\n\n");
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	
	
	  get_all_admin(req,res,next){

try { 

//var suspended =  suspended!=undefined ? req.body.suspended:"false";



PropertyControllers.getAllProperty(true,req.body.suspended)
.then(result=>{
	//res.status(result.status).json(result);
	
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	 
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	get_all_users(req,res,next){

try { 
PropertyControllers.getAllProperty()
.then(result=>{
	//res.status(result.status).json(result);
	
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	
	 res.resObj = err;
	 Misc.appResponse(res);
	//res.status(err.status).json(err);
	
})
		
	  }	
catch(err){
	
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	get_by_name_users(req,res,next){

try { 
var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";

PropertyControllers.getPropertyByName(req.body.name,false,"false")
.then(result=>{
	  
	 res.resObj = result;
	 Misc.appResponse(res);
	
})
.catch(err=>{
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	get_by_id_users(req,res,next){

try { 
var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";

PropertyControllers.getPropertyById(req.body.id,false,"false")
.then(result=>{
	  
	 res.resObj = result;
	 Misc.appResponse(res);
	
})
.catch(err=>{
	console.log(err);
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	
	
	
	get_by_name_admin(req,res,next){

try { 

var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";

PropertyControllers.getPropertyByName(req.body.name,true,suspended)
.then(result=>{
	//result.data = [result.data];
	
	 res.resObj = result;
	 Misc.appResponse(res);
	//res.status(result.status).json(result);
	
})
.catch(err=>{
	//res.status(err.status).json(err);
	
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	get_by_id_admin(req,res,next){

try { 

var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";

PropertyControllers.getPropertyById(req.body.id,true,suspended)
.then(result=>{
	//result.data = [result.data];
	
	 res.resObj = result;
	 Misc.appResponse(res);
	//res.status(result.status).json(result);
	
})
.catch(err=>{
	//res.status(err.status).json(err);
	
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	







	
	get_by_cat_users(req,res,next){

try { 

var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";

PropertyControllers.getPropertyByCat(req.body.categoryname,false,"false")
.then(result=>{
	//result.data = [result.data];
	 
	 res.resObj = result;
	 Misc.appResponse(res);
	
})
.catch(err=>{
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	get_by_cat_admin(req,res,next){

try { 

var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";

PropertyControllers.getPropertyByCat(req.body.categoryname,true,suspended)
.then(result=>{
	//result.data = [result.data];
	//res.status(result.status).json(result);
	
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	//res.status(err.status).json(err);
	
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	
	get_by_types_users(req,res,next){

try { 


var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";



PropertyControllers.getPropertyByType(req.body.typeId,false,"false")
.then(result=>{
	// result.data = [result.data];
	 
	 res.resObj = result;
	 Misc.appResponse(res);
	
})
.catch(err=>{
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	get_by_types_admin(req,res,next){

try { 

var suspended = req.body.suspended !=undefined ? req.body.suspended:"false";


PropertyControllers.getPropertyByType(req.body.typeId,true,suspended)
.then(result=>{
	// result.data = [result.data];
	//res.status(result.status).json(result);
	
	
	 res.resObj = result;
	 Misc.appResponse(res);
	
})
.catch(err=>{
	
	 res.resObj = err;
	 Misc.appResponse(res);
	/* res.status(err.status).json(err); */
	
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	updateProperty(req,res,next){

try {
	if(req.body._id!=undefined){
		delete req.body._id;
	}
	
PropertyControllers.update(req.body.id,{...req.body})
.then(result=>{
	//result.data = [result.data];
	/* res.status(result.status).json(result); */
	
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	//res.status(err.status).json(err);
	 //console.log(err);
	 res.resObj = err;
	 Misc.appResponse(res);
	 
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	deletePropertyByCategory(req,res,next){

try { 
PropertyControllers.removeByCat(req.body.categoryname)
.then(result=>{
	//result.data = [result.data];
	// res.status(result.status).json(result);
	
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	//res.status(err.status).json(err);
	
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	deleteProperty(req,res,next){

try { 
PropertyControllers.remove(req.body.id)
.then(result=>{
	//result.data = [result.data];
	// res.status(result.status).json(result);
	
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	//res.status(err.status).json(err);
	
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	
	
	
	
	
}


module.exports = new PropertyMiddleWare();