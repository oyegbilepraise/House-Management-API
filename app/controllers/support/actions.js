 
const Support_Model = require("../../models/support/supportModel");
const LogError =  require("../../helpers/logError"); 


class Support{
	
	create (data){
		return new Promise((resolve,reject)=>{
			var newData = data;
			  newData = newData!=undefined ?newData: reject({message:"data is required",data:[],statusCode:"SUPPORT_FIELD_REQUIRED",status:400});
			  newData.email !=undefined  ?true: reject({message:"email is required",data:[],statusCode:"SUPPORT_FIELD_REQUIRED",status:400});
			  newData.email.length>0 ?true: reject({message:"email is required",data:[],statusCode:"SUPPORT_FIELD_REQUIRED",status:400});
	 
		
		
		
		 newData.name !=undefined  ?true: reject({message:"name is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.message !=undefined  ?true: reject({message:"message is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.country !=undefined  ?true: reject({message:"country is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		   newData.phone !=undefined  ?true: reject({message:"phone number is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
			 
			 
			 
			 
		 newData.name.length>0 ?true: reject({message:"name is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.message.length>0  ?true: reject({message:"message is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		 newData.country.length>0  ?true: reject({message:"country is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
		   newData.phone.length>0 ?true:reject({message:"phone number is required",data:[],statusCode:"REQUEST_FIELD_REQUIRED",status:400});
			
		
		
		
		
		if(typeof newData =="string"){
			newData = JSON.parse(newData);
		}
			
			
			new Support_Model({...data})
			.save()
			.then(resp=>{
				resolve({message:"request submitted ",data:[],statusCode:"SUPPORT_CREATED",status:200});
	 
		
			})
			.catch(err=>{
				 
				reject({message:"Error found, please try again",data:[],statusCode:"UNKNOWN_ERROR",status:500});
	 
		
			})
			
		})
		
		
		
		
	}
	
	
	get (read){
		 
		return new Promise((resolve,reject)=>{
			    
		 var useRead =  false;
		 
		useRead = read=="true" || read=="false"?true:false;
			
			
			 if(useRead){
				 Support_Model.find({read},(err,mydata)=>{
				 !err? true: reject({message:"error found , please try again.",data:[],statusCode:"UNKNOWN_ERROR",status:500});
				 !mydata? true: resolve({message:"success.",data:mydata,statusCode:"SUPPORT_GET_SUCCESS",status:200});
			 
				 
			 })
			 }else{
				 Support_Model.find({},(err,mydata)=>{
				 !err? true: reject({message:"error found , please try again.",data:[],statusCode:"UNKNOWN_ERROR",status:500});
				 !mydata? true: resolve({message:"success.",data:mydata,statusCode:"SUPPORT_GET_SUCCESS",status:200});
			 
				 
			 })
			 }
			 
	
	
	})
		
		
		
		
	}
	
	markRead (id){
		 
		return new Promise((resolve,reject)=>{
			 id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"SUPPORT_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"SUPPORT_FIELD_REQUIRED",status:400});
		   
		 
			
			
			 Support_Model.updateOne({_id:id},{read:"true"},(err,mydata)=>{
				 !err? true: reject({message:"error found , please try again.",data:[],statusCode:"UNKNOWN_ERROR",status:500});
				 !mydata? true: resolve({message:"updated.",data:[],statusCode:"SUPPORT_UPDATE_SUCCESS",status:200});
			 
				 
			 })
			 
	
	
	})
		
		
		
		
	}
	
	
}

module.exports = new Support();