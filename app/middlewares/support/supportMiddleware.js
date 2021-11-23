const SupportControllers = require("../../controllers/support/actions");
var LogError = require("../../helpers/logError");
var Misc = require("../../helpers/misc");

class SupportMiddleWare {
	
	constructor(){
		//console.log(".....");
	}
	//create
	//get
	//update
	
	  create(req,res,next){

try { 
SupportControllers.create(req.body)
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
	// console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	
	  get_all_admin(req,res,next){

try { 
SupportControllers.get(req.body.read)
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
	
	 markRead(req,res,next){

try { 
SupportControllers.markRead(req.body.id)
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


module.exports = new SupportMiddleWare();