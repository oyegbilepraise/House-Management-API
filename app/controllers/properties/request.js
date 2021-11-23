 
const PropertyRequestModel = require("../../models/properties/request");
const LogError =  require("../../helpers/logError"); 
const Mailer =  require("../../helpers/sendMail"); 


class Request{
	
	create (data){
		
		return new Promise((resolve,reject)=>{
			var newData = data;
			  newData = newData!=undefined ?newData: reject({message:"data is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
			  newData.email !=undefined  ?true: reject({message:"email is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
			  newData.email.length>0 ?true: reject({message:"email is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
	 
		
		 newData.name !=undefined  ?true: reject({message:"name is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.location !=undefined  ?true: reject({message:"location is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.country !=undefined  ?true: reject({message:"country is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.type !=undefined  ?true: reject({message:"property type is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.price_range !=undefined  ?true: reject({message:"price range is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
	     newData.phone !=undefined  ?true: reject({message:"phone number is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
			 
			 
			 
			 
		 newData.name.length>0 ?true: reject({message:"name is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.location.length>0  ?true: reject({message:"location is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.country.length>0  ?true: reject({message:"country is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.type.length>0  ?true: reject({message:"property type is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.price_range.length>0  ?true: reject({message:"price range is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
	  newData.phone.length>0 ?true:reject({message:"phone number is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
			
			 
			 
			 // description
		
		
		if(typeof newData =="string"){
			newData = JSON.parse(newData);
		}
			
			
			new PropertyRequestModel({...data})
			.save()
			.then(resp=>{
				resolve({message:"request submitted ",data:[],statusCode:"REQUEST_CREATED",status:200});
	 
		
			})
			.catch(err=>{
				 /* console.log(err);
				  */
				reject({message:"Error found, please try again",data:[],statusCode:"UNKNOWN_ERROR",status:500});
	 
		
			})
			
		})
		
		
		
		
	}
	
	
	get (available){
		 
		return new Promise((resolve,reject)=>{
			    var useAvailable =false;
		 
			available=="true" || available=="false" ?useAvailable =true:useAvailable =false;
			
			
			if(useAvailable){
				 PropertyRequestModel.find({available},(err,mydata)=>{
				 !err? true: reject({message:"error found , please try again.",data:[],statusCode:"UNKNOWN_ERROR",status:500});
				 !mydata? true: resolve({message:"success.",data:mydata,statusCode:"REQUEST_GET_SUCCESS",status:200});
			 
				 
			 })
			 
			}
			else{
			 PropertyRequestModel.find({},(err,mydata)=>{
				 !err? true: reject({message:"error found , please try again.",data:[],statusCode:"UNKNOWN_ERROR",status:500});
				 !mydata? true: resolve({message:"success.",data:mydata,statusCode:"REQUEST_GET_SUCCESS",status:200});
			 
				 
			 })	
			}
			
			 
	
	
	})
		
		
		
		
	}
	
	makeAvailable (id){
		 
		return new Promise((resolve,reject)=>{
			 id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		   
		 
			
			  PropertyRequestModel.findOne({_id:id},(err,mydata)=>{
				  if(err){
					  reject({message:"request not found.",data:[],statusCode:"REQUEST_NOT_FOUND",status:500});
				  
				  } 
else{
	
	
			 PropertyRequestModel.updateOne({_id:id},{available:"true"},(err,updatedata)=>{
				 if(err){
				  reject({message:"error found , please try again.",data:[],statusCode:"UNKNOWN_ERROR",status:500});
				 
				 }
				 else{
					 Mailer.Send({
						 to:mydata.email,
						 subject:"Property is now available",
						 body:"Hi, "+mydata.name+", \n The property you requested ("+mydata.type+") is now available. "
					 
					 }, function(Mailerr,Maildata){
						 if(Mailerr){
							 LogError("Error found while sending mail to "+mydata.email+", "+Mailerr);
						 }
						 
					 })
					 
					 
					 resolve({message:"updated.",data:[],statusCode:"REQUEST_UPDATE_SUCCESS",status:200});
			 
				 }
				 
				 //if(data? true: 
				 
			 })
			 
	
	
}				  
				  
				  
				  
				  
				  
				  
			  })
			  
			  
		 
			 
	
	
	})
		
		
		
		
	}
	
	
}

module.exports = new Request();