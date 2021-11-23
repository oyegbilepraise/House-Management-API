const TypeModel = require("../../models/properties/PropertiesTypes");
const ParameterModel = require("../../models/properties/parameters");
const LogError =  require("../../helpers/logError");
const Categories =  require("./categories");
const Types =  require("./types"); 

class Parameter{
  static create(tid,propertyData, adminEmail){
	var admin = adminEmail;
	return new Promise((resolve,reject)=>{
		
		propertyData = propertyData !=undefined ?propertyData: reject({message:"parameters are required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		 
		
		var typeId = tid !=undefined  ?tid: reject({message:"type is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		typeId = tid.length>0?tid: reject({message:"type is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
		var categoryId = cid !=undefined  ?cid: reject({message:"category is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		categoryId = cid.length>0?cid: reject({message:"category is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
		
		adminEmail = adminEmail !=undefined  ?adminEmail: reject({message:"admin Email is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		adminEmail = adminEmail.length>0?adminEmail: reject({message:"admin Email is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
		if( typeof propertyData  =="string"){
			propertyData = JSON.parse(propertyData);
		}
		
		 
		for(var a in propertyData){
			
			if( propertyData[a].toLowerCase() !="optional" ){
				//reject({message:a+" is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		propertyData[a] = "required";
			}
			
			 
		}
		
		
		
		
		
		
		
		
		Types.getTypeById(typeId) 
		.then(mytype=>{
			
			var categoryId = mytype.data[0].categoryId;
			var typeId = mytype.data[0]._id;
			
			
			
			ParameterModel.findOne({typeId:typeId},(exist_err,exist_res)=>{
				if(exist_err){
					
reject({message: "Error found, "+name+" parameter not created. Please try again. ",data:[],statusCode:"PARAMETERS_CREATION_FAILED",status:400}); 

				}
				else{
					
					// save if not exist
					if(exist_res==null){
						
						var newParameter = new ParameterModel({
			 createdBy:adminEmail,categoryId:categoryId, typeId:typeId,parameters:propertyData
		})
.save()
.then(category=>{ resolve({message:name+"parameters created successfully. ",data:[],statusCode:"PARAMETERS_CREATED",status:201});  })		
.catch(error=>{ 
if (error.name === 'MongoError' && error.code === 11000) {
reject({message: "Error found, "+name+" parameter already exist. ",data:[],statusCode:"PARAMETERS_EXIST",status:409}); 
	
}


LogError("Error found while creating parameter: \n "+error);
reject({message: "Error found, "+name+" parameter not created. Please try again. ",data:[],statusCode:"PARAMETERS_CREATION_FAILED",status:400}); 

 })
		


						
						
					}
					
					else{
					
reject({message: "Error found, "+name+" parameter for this type already exist. ",data:[],statusCode:"PARAMETERS_EXIST",status:409}); 
		
					}
					
				}
				
			})
			
			
			


		
		})
		
		
		
		
		
		.catch(err=>{
			reject(err);
		})
		
		
		
				
		
		
	}
	
	);
	
	
}



  static getParameterByType(typeId,admin=false){
	
	return new Promise((resolve,reject)=>{
		typeId = typeId!=undefined ?typeId:reject({message:"type is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		typeId = typeId.length>0?typeId:reject({message:"type is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "_id createdBy createdAt categoryId typeId parameters";
			
		
		 }
		 else{
			var filter = "_id categoryId typeId parameters";
			 
		 }
		
Types.getTypeById(typeId)
.then(mytype=>{
	
		 var getParameter = ParametersModel.find({
			 typeId:mytype.data[0]._id
		}, filter,(err,res)=>{
			
			
			
			if(err){
				
LogError("Error found while fetching parameter : \n "+err);
reject( {message: "Error found, parameter not fetched. Please try again. ",data:[],statusCode:"PARAMETERS_GET_FAILED",status:401}); 

 	
	
			}
			else if(res==null){
				 
reject( {message: "parameter not found. Please try again. ",data:[],statusCode:"PARAMETERS_NOT_FOUND",status:404}); 

 	
	
			}
			else{
				
				
				resolve({message:"parameters fetched successfully. ",data:res,statusCode:"PARAMETERS_GET_SUCCESS",status:200});  
	
				
			}
			
			
			
			
			
		})
		
		 
	
	
	
	
	
})
.catch(err=>{
			
LogError("Error found while fetching parameter type : \n "+err);
reject( {message: "Error found, parameter not fetched. Please try again. ",data:[],statusCode:"PARAMETERS_GET_FAILED",status:400}); 

})
		
	
	
}

);

	
	
}


  static getParameterAll(admin=false){
	
	return new Promise((resolve,reject)=>{
		 
		 if(admin){ 
		 var filter = "_id createdBy createdAt categoryId typeId parameters";
			
		
		 }
		 else{
			var filter = "_id categoryId typeId parameters";
			 
		 }
		
Types.getTypeById(typeId)
.then(mytype=>{
	
		 var getParameter = ParametersModel.find({
			  
		}, filter,(err,res)=>{
			
			if(err){
				
LogError("Error found while fetching parameter : \n "+err);
reject( {message: "Error found, parameter not fetched. Please try again. ",data:[],statusCode:"PARAMETERS_GET_FAILED",status:401}); 

 	
	
			}
			else if(res==null){
				 
reject( {message: "parameter not found. Please try again. ",data:[],statusCode:"PARAMETERS_NOT_FOUND",status:404}); 

 	
	
			}
			else{
				
				
				resolve({message:"parameters fetched successfully. ",data:res,statusCode:"PARAMETERS_GET_SUCCESS",status:200});  
	
				
			}
			
			
		})
		
		 
	
	
	
	
	
})
.catch(err=>{
			
LogError("Error found while fetching parameter type : \n "+err);
reject( {message: "Error found, parameter not fetched. Please try again. ",data:[],statusCode:"PARAMETERS_GET_FAILED",status:400}); 

})
		
	
	
}

);

	
	
}


 

  static update(id,newData){
	
	
	return new Promise((resolve,reject)=>{
		
		 newData = newData!=undefined ?newData: reject({message:"new data is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
	 
		
		if(typeof newData =="string"){
			newData = JSON.parse(newData);
		}
		var name = newData.name;
		 id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
		for(var a in newData){
			if(newData[a]==undefined ){
				reject({message:a+" is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
			}
			
			if(newData[a].length<=0 ){
				reject({message:a+" is required",data:[],statusCode:"PARAMETERS_FIELD_REQUIRED",status:400});
		
			}
		}
		
		
		
		
		 
		 
		 
		 if(newData.hasOwnProperty("typeId"))
		 {
			// newData.typeId = newData.typeId.toLowerCase();
			 
			 Types.getTypeById(newData.typeId)
			 .then(type=>{
				 newData.typeId = type.data[0]._id;
				 newData.categoryId = type.data[0].categoryId;
				 
				  // check id data set
				  if(newData.hasOwnProperty("data"))
		 {
			 
			 
				 PropertyModel.findOne({
					 _id:id
				 },function(error,resp){
					
				 //update
				  if(error || resp==null){
					  	 
LogError("Error found while fetching property: \n "+error);
reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
				  }
				  else{
  newData.data = {...resp.data,...newData.data};
				  
				  
				  
				  
				  
 //update
				  var update = PropertyModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				
if (err.name === 'MongoError' && err.code === 11000) {
reject({message: "Error found, "+name+" property already exist. ",data:[],statusCode:"PROPERTY_EXIST",status:409}); 
	
}

LogError("Error found while Updating property: \n "+err);
reject( {message: "Error found, property not updated. Please try again. ",data:[],statusCode:"PROPERTY_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property data updated successfully. ",data:[],statusCode:"PROPERTY_UPDATED",status:200});  
	
				
			}
			
			
		})
				
 
				 
				 
				 
				  }
				  
					 
				 })

				 
			 
			 
			 
		 }
		 
		 else{
			 
			   
				  
				  
				  
				  
 //update
				  var update = PropertyModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				
if (err.name === 'MongoError' && err.code === 11000) {
reject({message: "Error found, "+newData.name+" property already exist. ",data:[],statusCode:"PROPERTY_EXIST",status:409}); 
	
}

LogError("Error found while Updating property: \n "+err);
reject( {message: "Error found, property not updated. Please try again. ",data:[],statusCode:"PROPERTY_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property data updated successfully. ",data:[],statusCode:"PROPERTY_UPDATED",status:200});  
	
				
			}
			
			
		})
				
 
				 
				 
				 
		 }
	
				  
				
				 
				 

				
			 })
			 .catch(err=>{
				 
				 LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_GET_FAILED",status:400}); 
	 
			 })
		 }
		
//type not set
		else{
			
				  if(newData.hasOwnProperty("data"))
		 {
			 
			 
				 PropertyModel.findOne({
					 _id:id
				 },function(error,resp){
					
				 //update
				  if(error || resp==null){
					  
					  	 
LogError("Error found while fetching property: \n "+error);
reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
				  }
				  else{
					  
  newData.data = {...resp.data,...newData.data};
				  
				  
				 //update
				  var update = PropertyModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				 
if (err.name === 'MongoError' && err.code === 11000) {
reject({message: "Error found, "+name+" property already exist. ",data:[],statusCode:"PROPERTY_EXIST",status:409}); 
	
}

LogError("Error found while Updating property: \n "+err);
reject( {message: "Error found, property not updated. Please try again. ",data:[],statusCode:"PROPERTY_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
			 
				resolve({message:" property data updated successfully. ",data:[],statusCode:"PROPERTY_UPDATED",status:200});  
	
				
			}
			
			
		})
			
		
				 
				 
				  }
				  
					 
				 })

				 
			 
			 
			 
		 }
		 
		 else{
			 
			   
				  
				  
		 //update
				  var update = PropertyModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				
if (err.name === 'MongoError' && err.code === 11000) {
reject({message: "Error found, "+name+" property already exist. ",data:[],statusCode:"PROPERTY_EXIST",status:409}); 
	
}

LogError("Error found while Updating property: \n "+err);
reject( {message: "Error found, property not updated. Please try again. ",data:[],statusCode:"PROPERTY_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property data updated successfully. ",data:[],statusCode:"PROPERTY_UPDATED",status:200});  
	
				
			}
			
			
		})
			
				 
				 
				 
		 }
	
				  
			
			
			
			
			
			
				 	
		 }
		 //type not specified
		 
		 
		
		
		 
	







}

);


}





 



}




module.exports = Parameter;