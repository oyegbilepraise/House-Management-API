const PropertyTypesControllers = require("../../controllers/properties/types");
var LogError = require("../../helpers/logError");
var Misc = require("../../helpers/misc");

class PropertyTypesMiddleWare {
	
	constructor(){
		//console.log(".....");
	}
	
	
	  create(req,res,next){

try { 
PropertyTypesControllers.create(req.body.name,req.body.categoryname,req.adminEmail)
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
	
	
	  get_all_admin(req,res,next){

try { 
PropertyTypesControllers.get_all(true)
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
PropertyTypesControllers.get_all()
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
	get_by_id(req,res,next){

try { 
PropertyTypesControllers.getTypeById(req.body.id)
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
	get_by_id_admin(req,res,next){

try { 
PropertyTypesControllers.getTypeById(req.body.id,true)
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
PropertyTypesControllers.getTypeByName(req.body.name)
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
	
	get_by_name_admin(req,res,next){

try { 
PropertyTypesControllers.getTypeByName(req.body.name,true)
.then(result=>{
	// result.data = [result.data];
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
	
	
	get_by_cat_users(req,res,next){

try { 
PropertyTypesControllers.getTypeByCat(req.body.categoryname)
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
	
	get_by_cat_admin(req,res,next){

try { 
PropertyTypesControllers.getTypeByCat(req.body.categoryname,true)
.then(result=>{
	// result.data = [result.data];
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
	
	
	
	 
	updateType(req,res,next){

try {
	if(req.body._id!=undefined){
		delete req.body._id;
	}
PropertyTypesControllers.update(req.body.id,{...req.body})
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
	
	
	deleteType(req,res,next){

try { 
PropertyTypesControllers.remove(req.body.id)
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


module.exports = new PropertyTypesMiddleWare();