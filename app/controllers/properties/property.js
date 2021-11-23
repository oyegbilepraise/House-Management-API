const TypeModel = require("../../models/properties/PropertiesTypes");
const PropertyModel = require("../../models/properties/property"); 
const LogError =  require("../../helpers/logError");
const Categories =  require("./categories");
//const Parameters =  require("./parameters");
const Types =  require("./types");
const Analytics =  require("../Analytics/analyticsSetController");
 

class Property{


  static create(name,typeid,propertyData, adminEmail){
	var admin = adminEmail;
	return new Promise((resolve,reject)=>{
		
		propertyData = propertyData !=undefined ?propertyData: reject({message:"property data is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		name = name !=undefined ?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		name = name.length>0?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		var units = propertyData.units;

		units = units !=undefined ?Number(units): reject({message:"units is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		units = units>0 || units==NaN ?units: reject({message:"units is must be at least 1",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		
		typeid = typeid !=undefined  ?typeid: reject({message:"type Id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		typeid = typeid.length>0?typeid: reject({message:"type Id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		
		adminEmail = adminEmail !=undefined  ?adminEmail: reject({message:"admin Email is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		adminEmail = adminEmail.length>0?adminEmail: reject({message:"admin Email is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		if( typeof propertyData  =="string"){
			propertyData = JSON.parse(propertyData);
		}
		
		 
		for(var a in propertyData){
			
			
			if(propertyData[a]==undefined ){
				reject({message:a+" is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
			}
			
			if(propertyData[a].length<=0 ){
				reject({message:a+" is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
			}
		}
		
		
		
		
		
		
		
		
		Types.getTypeById(typeid) 
		.then(mytype=>{
			
			var categoryId = mytype.data[0].categoryId;
			var typeId = mytype.data[0]._id;
			
			delete propertyData.units;
			
			PropertyModel.findOne({categoryId,typeId,"data.location":propertyData.location,name}, (exist_err,exist_res)=>{
				if(exist_err){
					
LogError("Error found while creating property: \n "+error);
reject({message: "Error found, "+name+" property not created. Please try again. ",data:[],statusCode:"PROPERTY_CREATION_FAILED",status:400}); 

				}
				
				else{
					
					if(exist_res==null){
						
						var newProperty = new PropertyModel({
			name:name,createdBy:adminEmail,categoryId, typeId,data:propertyData,units
		})
.save()
.then(category=>{ resolve({message:name+" property created successfully. ",data:[],statusCode:"PROPERTY_CREATED",status:201});  })		
.catch(error=>{ 
if (error.name === 'MongoError' && error.code === 11000) {
reject({message: "Error found, "+name+" property already exist. ",data:[],statusCode:"PROPERTY_EXIST",status:409}); 
	
}


LogError("Error found while creating property: \n "+error);
reject({message: "Error found, "+name+" property not created. Please try again. ",data:[],statusCode:"PROPERTY_CREATION_FAILED",status:400}); 

 })
			
			
					}
					else{
						//exist
					
reject({message: "Error found, "+name+" property already exist. ",data:[],statusCode:"PROPERTY_EXIST",status:409});	
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



  static getPropertyByType(typeid,admin=false,suspended="false"){
	
	return new Promise((resolve,reject)=>{
		typeid = typeid!=undefined ?typeid:reject({message:"type is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		typeid = typeid.length>0?typeid:reject({message:"type is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId typeId suspended data categoryName.name typeName.name";
			
		
		 }
		 else{
			var filter = "name _id categoryId typeId suspended data categoryName.name typeName.name";
			 
		 }
		
Types.getTypeById(typeid)
.then(mytype=>{
	
		 var getProperty = PropertyModel.find({
			 typeId:mytype.data[0]._id,suspended:suspended
		}, filter, {populate:"typeId categoryId"},(err,res)=>{
			
			if(err|| res==null){
				
LogError("Error found while fetching property : \n "+err);
reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:401}); 

 	
	
			}
			else{
 
				var myres =  [];
				 var each_prop = {};
				 
				    res.length==0?resolve({message:" property not found . ",data:myres,statusCode:"PROPERTY_NOT_FOUND",status:404}):true;
				 
				 
				 for(var i=0;i<res.length;i++){
					 //each_prop = {data:res[i].data}
					 each_prop =  (( {name, _id, createdBy, createdAt, categoryId, typeId, suspended, data})=>({name, _id, createdBy, createdAt, categoryId, typeId, suspended, data}))(res[i]) 
				 
				 
				 //( ( { a, c }) => ({ a, c }))(object);

				 
				 each_prop.categoryName =  res[i].categoryId[0].name
				 each_prop.categoryId =  res[i].categoryId[0]._id
 
				//var myres =  res;
				 
				 /* res.forEach((ele,i,a)=>{
				 res[i].categoryName = ele.categoryId[0].name
					
			   // res[i].categoryId = ele.categoryId[0]._id
					
				//res[i].typeId = ele.typeId[0]._id
				// res[i].typeName = ele.typeId[0].name
					 console.log( ele.categoryId[0].name,i, ele)
					
				}) */
				 
				 
 
				
				each_prop.typeName =  res[i].typeId[0].name
				 each_prop.typeId =  res[i].typeId[0]._id
					
					myres.push(each_prop);
			   // res[i].categoryId = ele.categoryId[0]._id
					
				//res[i].typeId = ele.typeId[0]._id
				// res[i].typeName = ele.typeId[0].name
					   //console.log(  res[i].categoryName,i, ele)
					
					if(i==(res.length-1)){
						//console.log( res[i].categoryId[0]);
						resolve({message:" property fetched successfully. ",data:myres,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
					}
					
				}
				 
				 
				// for loop end
				
				
				
			}
			
			
		})
		
		 
	
	
	
	
	
})
.catch(err=>{
			
LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_GET_FAILED",status:400}); 

})
		
	
	
}

);

	
	
}




  static getPropertyByName(name,admin=false,suspended="false"){
	
	return new Promise((resolve,reject)=>{
		name = name!=undefined ?name.toLowerCase():reject({message:"property name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		name = name.length>0?name.toLowerCase():reject({message:"property name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId typeId  suspended data";
			
		
		 }
		 else{
			var filter = "name _id categoryId typeId suspended data";
			 
		 }
		 var getProperty = PropertyModel.find({
			name:name,suspended:suspended
		}, filter, {populate:"typeId categoryId"},(err,res)=>{
			
			if(err || res==null){
			 
LogError("Error found while fetching property: \n "+err);
reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
	
			}
			else{
				//console.log(res[0]._id);
				
				 
				
				//resolve({message:" property fetched successfully. ",data:res,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
				var myres =  [];
				 var each_prop = {};
				 
				   res.length==0?resolve({message:" property not found . ",data:myres,statusCode:"PROPERTY_NOT_FOUND",status:404}):true;
				 
				 for(var i=0;i<res.length;i++){
					 //each_prop = {data:res[i].data}
					 each_prop =  (( {name, _id, createdBy, createdAt, categoryId, typeId, suspended, data})=>({name, _id, createdBy, createdAt, categoryId, typeId, suspended, data}))(res[i]) 
				 
				 
				 //( ( { a, c }) => ({ a, c }))(object);

				 
				 each_prop.categoryName =  res[i].categoryId[0].name
				 each_prop.categoryId =  res[i].categoryId[0]._id
				
				each_prop.typeName =  res[i].typeId[0].name
				 each_prop.typeId =  res[i].typeId[0]._id
					
					myres.push(each_prop);
			   // res[i].categoryId = ele.categoryId[0]._id
					
				//res[i].typeId = ele.typeId[0]._id
				// res[i].typeName = ele.typeId[0].name
					   //console.log(  res[i].categoryName,i, ele)
					
					if(i==(res.length-1)){
						// console.log( res[i].categoryId[0]);
						resolve({message:" property fetched successfully. ",data:myres,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
					}
					
				}
				 
				
			}
			
			
		})
		
		 
	
	
	
}

);

	
	
}


  static getPropertyById(id,admin=false,suspended="false"){
	
	return new Promise((resolve,reject)=>{
		id = id!=undefined ?id:reject({message:"property id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		id = id.length>0?id :reject({message:"property id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId typeId  suspended data";
			var query ={_id:id}
		
		 }
		 else{
			var filter = "name _id categoryId typeId suspended data";
				var query ={_id:id,suspended:"false"} 
		 }
		 var getProperty = PropertyModel.findOne( query, filter, {populate:"typeId categoryId"},(err,res)=>{
			
			if(err){
			 
LogError("Error found while fetching property: \n "+err);
reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
	
			}
			else if(res==null){
	 resolve({message:" property not found . ",data:[],statusCode:"PROPERTY_NOT_FOUND",status:404});
				 
	
			}
			else{
				//console.log(res[0]._id);
				
				 if(!admin){ 
				Analytics.saveView(res._id)
				.then(res=>{})
				.catch(err=>{})
				
			}
				// 
			

var myres =  [];
				 var each_prop = {};
				 
				  
				  
					 //each_prop = {data:res[i].data}
					 each_prop =  (( {name, _id, createdBy, createdAt, categoryId, typeId, suspended, data})=>({name, _id, createdBy, createdAt, categoryId, typeId, suspended, data}))(res) 
				 
				 
				 //( ( { a, c }) => ({ a, c }))(object);

				 
				 each_prop.categoryName =  res.categoryId[0].name
				 each_prop.categoryId =  res.categoryId[0]._id
				
				each_prop.typeName =  res.typeId[0].name
				 each_prop.typeId =  res.typeId[0]._id
					
					myres.push(each_prop);
			   
					
			 resolve({message:" property fetched successfully. ",data:[myres],statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
				 
				
			
			}
			
			
		})
		
		 
	
	
	
}

);

	
	
}



  static getAllProperty(admin=false,suspended ="false"){
	
	return new Promise((resolve,reject)=>{
		 
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId typeId  suspended data";

			if(suspended=="true" || suspended=="false"){
			
		var query = {suspended}	
			}
			else{
				
		var query = {}
			}
			
		 }
		 else{
			var filter = "name _id categoryId typeId suspended data";
			 var query = {suspended:"false"}
		 }
		 var getProperty = PropertyModel.find( query, filter, {populate:"typeId categoryId"},(err,res)=>{
			
			if(err){
				
			LogError("Error found while fetching property: \n "+err);
			reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				//resolve({message:" property fetched successfully. ",data:res,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	var myres =  [];
				 var each_prop = {};
				 
				    res.length==0?resolve({message:" property not found . ",data:myres,statusCode:"PROPERTY_NOT_FOUND",status:404}):true;
				 
				 
				 for(var i=0;i<res.length;i++){
					 //each_prop = {data:res[i].data}
					 each_prop =  (( {name, _id, createdBy, createdAt, categoryId, typeId, suspended, data})=>({name, _id, createdBy, createdAt, categoryId, typeId, suspended, data}))(res[i]) 
				 
				 
				 //( ( { a, c }) => ({ a, c }))(object);

				 
				 each_prop.categoryName =  res[i].categoryId[0].name
				 each_prop.categoryId =  res[i].categoryId[0]._id
				
				each_prop.typeName =  res[i].typeId[0].name
				 each_prop.typeId =  res[i].typeId[0]._id
					
					myres.push(each_prop);
			   // res[i].categoryId = ele.categoryId[0]._id
					
				//res[i].typeId = ele.typeId[0]._id
				// res[i].typeName = ele.typeId[0].name
					   //console.log(  res[i].categoryName,i, ele)
					
					if(i==(res.length-1)){
						// console.log( res[i].categoryId[0]);
						resolve({message:" property fetched successfully. ",data:myres,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
					}
					
				}
				 
				
				
			}
			
			
		})
		
		 
	
	
	
}


);
	
	
}



  static getPropertyByCat(catname,admin=false,suspended="false"){
	
	return new Promise((resolve,reject)=>{
		 
		catname = catname!=undefined ?catname.toLowerCase():reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		catname = catname.length>0?catname.toLowerCase():reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId suspended data";
			
		
		 }
		 else{
			var filter = "name _id categoryId suspended data";
			 
		 }
		 
		 
		 
		 Categories.categoryExist(catname)
		 .then(category=>{
			 
		 var getProperty = PropertyModel.find({
			categoryId:category.data._id,suspended:suspended
		}, filter, {populate:"typeId categoryId"},(err,res)=>{
			
			if(err || res==null){
				
LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				//resolve({message:" property fetched successfully. ",data:res,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
	var myres =  [];
				 var each_prop = {};
				 
				    res.length==0?resolve({message:" property not found . ",data:myres,statusCode:"PROPERTY_NOT_FOUND",status:404}):true;
				 
				 
				 for(var i=0;i<res.length;i++){
					 //each_prop = {data:res[i].data}
					 each_prop =  (( {name, _id, createdBy, createdAt, categoryId, typeId, suspended, data})=>({name, _id, createdBy, createdAt, categoryId, typeId, suspended, data}))(res[i]) 
				 
				 
				 //( ( { a, c }) => ({ a, c }))(object);

				 
				 each_prop.categoryName =  res[i].categoryId[0].name
				 each_prop.categoryId =  res[i].categoryId[0]._id
				
				each_prop.typeName =  res[i].typeId[0].name
				 each_prop.typeId =  res[i].typeId[0]._id
					
					myres.push(each_prop);
			   // res[i].categoryId = ele.categoryId[0]._id
					
				//res[i].typeId = ele.typeId[0]._id
				// res[i].typeName = ele.typeId[0].name
					   //console.log(  res[i].categoryName,i, ele)
					
					if(i==(res.length-1)){
						// console.log( res[i].categoryId[0]);
						resolve({message:" property fetched successfully. ",data:myres,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
					}
					
				}
				 
				
	
	
				
			}
			
			
		})
		
		 
	
		 })
		 .catch(err=>{
		LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_GET_FAILED",status:400}); 
	 
			 
		 })
	
	
}


);
	
	
}

 
 

  static update(id,newData){
	
	
	return new Promise((resolve,reject)=>{
		
		 newData = newData!=undefined ?newData: reject({message:"new data is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 
		
		if(typeof newData =="string"){
			newData = JSON.parse(newData);
		}
		var name = newData.name;
		 id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		for(var a in newData){
			if(newData[a]==undefined ){
				reject({message:a+" is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
			}
			
			if(newData[a].length<=0 ){
				reject({message:a+" is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
			}
		}
		
		
		
		
		 
		 
		 
		 if(newData.hasOwnProperty("typeId"))
		 {
			// newData.typeId = newData.typeid.toLowerCase();
			 
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







  static remove(id){
	
	return new Promise((resolve,reject)=>{
		id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 
		 var delete_property = PropertyModel.deleteOne({
			_id:id
		},(err)=>{
			
			if(err){
				
LogError("Error found while deleting property : \n "+err);
reject( {message: "Error found, property not deleted. Please try again. ",data:[],statusCode:"PROPERTY_DELETE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property deleted successfully. ",data:[],statusCode:"PROPERTY_DELETED",status:200});  
	
				
			}
			
			
		})
		
		 
	







}

);




}



  static removeByCat(catname){
	
	return new Promise((resolve,reject)=>{
		catname = catname!=undefined ?catname: reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		catname = catname.length>0  ?catname: reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	 
		 
		 
		 Categories.categoryExist(catname)
		 .then(category=>{
			 
		  //
	
		 
		 
		 var delete_property = PropertyModel.deleteOne({
			categoryId:category.data._id
		},(err)=>{
			
			if(err){
				
LogError("Error found while deleting property : \n "+err);
reject( {message: "Error found, property not deleted. Please try again. ",data:[],statusCode:"PROPERTY_DELETE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property deleted successfully. ",data:[],statusCode:"PROPERTY_DELETED",status:200});  
	
				
			}
			
			
		})
		
		 
	

		 })
		 .catch(err=>{
		LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_GET_FAILED",status:400}); 
	 
			 
		 })
	
	






}

);




}







}




module.exports = Property;