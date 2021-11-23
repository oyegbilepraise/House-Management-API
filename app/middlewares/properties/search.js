const PropertySearchControllers = require("../../controllers/properties/search");
var LogError = require("../../helpers/logError");
var Misc = require("../../helpers/misc");

	  function PropertySearchMiddleWare(req,res,next){

try {
	
	if(req.hasOwnProperty("isAdmin")){
		
	if(req.isAdmin !="true"){
	req.body.suspended="false";	
	}
	else{
	req.body.suspended=="false" || req.body.suspended =="true"?req.body.suspended:"false";	
	}
	
		//console.log(req.isAdmin," Suspended: ",req.body.suspended)
	}
	else{
		req.body.suspended="false";	
	}
//console.log("R: ",req.body);
PropertySearchControllers(req.body,req.body.start,req.body.suspended)
.then(result=>{
	 
	 //console.log(result);
	 
	 res.resObj = result;
	 
	  //log to Analytics
	 Misc.appResponse(res);
	 
	
})
.catch(err=>{
	  console.log(err);
	
	 
	 res.resObj = err;
	 
	  //log to Analytics
	 Misc.appResponse(res);
})
		
	  }	
catch(err){
	//console.log(err);
var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
	LogError(fullURL," Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	

		
		
	}
	
	 
module.exports = PropertySearchMiddleWare;