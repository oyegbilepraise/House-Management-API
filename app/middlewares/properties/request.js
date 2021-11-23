const PropertyRequestControllers = require("../../controllers/properties/request");
var LogError = require("../../helpers/logError");
var Misc = require("../../helpers/misc");

class PropertyRequestMiddleWare {
	
	constructor(){
		//console.log(".....");
	}
	//create
	//get
	//update
	
	  create(req,res,next){

try { 
PropertyRequestControllers.create(req.body)
.then(result=>{
	// console.log(result);
	 
	 res.resObj = result;
	 Misc.appResponse(res);
})
.catch(err=>{
	 //console.log(err);
	 
	 res.resObj = err;
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	console.log("Error found");
	console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	  get_all_admin(req,res,next){

try { 
PropertyRequestControllers.get(req.body.available)
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
	
	 makeAvailable(req,res,next){

try { 
PropertyRequestControllers.makeAvailable(req.body.id)
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
catch(err){ ;
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	
	
	
	
	
}


module.exports = new PropertyRequestMiddleWare();