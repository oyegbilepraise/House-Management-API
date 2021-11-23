var Misc = require("./misc");
var LogError = require("./logError");
var jwt  = require('jsonwebtoken');
class AdminAuth{

constructor(){
	//console.log("...");
}

  SignIn(req,res,next){
	  
	  try{
		 req.isAdmin="false";
	var {AdminEmail,AdminPass} = req.body;
	
	req.adminEmail = AdminEmail;
	
	
 AdminEmail = AdminEmail == process.env.ADMIN_EMAIL?true:false;
 AdminPass = AdminPass == process.env.ADMIN_PASSWORD?true:false;
	
if(AdminEmail && AdminPass){
	var user_token_data ={
		email:process.env.ADMIN_EMAIL,
		id:process.env.ADMIN_ID
	}
	 var token = Misc.generateToken(user_token_data, '24hr')
	 req.isAdmin="true";
res.resObj = {statusCode:"SIGNIN_SUCCESS",data:[{token:token}],message:"Signin successful",status:200};
	Misc.appResponse(res);
	 


	return;
}
	
else{
	res.resObj = {statusCode:"INVALID_LOGIN_DATA",data:[],message:"invalid login data",status:400};
	Misc.appResponse(res);
	 return  ;
	
}
	 
	  }


catch(err){
	LogError("Admin Login Error Message: "+err.message);
	res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	Misc.appResponse(res);
            return ;
}	





}



  Login(req, res, next){
	  
	  
	  
	  try {  
	  req.isAdmin="false";
        const authHeader = req.get('Authorization') || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];

        if (!authHeader) {
             res.resObj = {statusCode:"INVALID_LOGIN_TOKEN",data:[],message:"invalid login data",status:400};
	Misc.appResponse(res);
            return ;
        }

        if (req.body.AdminEmail ==undefined) {
            res.resObj = {statusCode:"INVALID_LOGIN_DATA",data:[],message:"invalid login data",status:400};
	Misc.appResponse(res);
            return ;
        }




        const token = authHeader.split(' ')[1];
        let decodedToken = false; 

        try {
            decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        } catch (err) {
			LogError("error ocurred, during JWT Decode, "+err.message)
            res.resObj = {statusCode:"INVALID_LOGIN_TOKEN",data:[],message:"invalid login data.",status:400};
	Misc.appResponse(res);
            return ;
        }
 

        if (!decodedToken) {
            res.resObj = {statusCode:"INVALID_LOGIN_TOKEN",data:[],message:"invalid login data..",status:400};
	Misc.appResponse(res);
            return ;
        }
        req.userId = decodedToken.userId;
		
		// console.log( "Email:   ")
		// console.log(req.body.AdminEmail.toLowerCase(),"  ", decodedToken.email.toLowerCase())
		
		
        if(req.body.AdminEmail.toLowerCase() == decodedToken.email.toLowerCase()){
 req.isAdmin="true";
			req.adminEmail = req.body.AdminEmail.toLowerCase().trim();
            next();
        }
		
		else{
           res.resObj = {statusCode:"INVALID_LOGIN_DATA",data:[],message:"invalid login data...",status:400};
	Misc.appResponse(res);
            return ;
  
        }
     








	 
    }
	
	

	
catch(err){
	LogError("Admin Login Error Message: "+err.message);
	 res.resObj = {statusCode:"UNKNOWN_ERROR",data:[],message:"Error occured, please try again. ",status:500};
	 
	Misc.appResponse(res);
            return ;
}	


	
	
	


  }

}


module.exports = new AdminAuth();