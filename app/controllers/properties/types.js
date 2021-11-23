const TypeModel = require("../../models/properties/PropertiesTypes");
const PropertyModel = require("../../models/properties/property");
const LogError =  require("../../helpers/logError");
const Categories =  require("./categories");

// name is unique,
// when you update categoryId in types document(Database) , update it in property document too


class Types{


  static create(name,catname,adminEmail){
	
	return new Promise((resolve,reject)=>{
		var admin = adminEmail;
		
		
		name = name !=undefined  ?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		name = name.length>0?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		catname = catname!=undefined ?catname: reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		catname = catname.length>0?catname: reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		adminEmail = adminEmail !=undefined  ?adminEmail: reject({message:"admin Email is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		adminEmail = adminEmail.length>0?adminEmail: reject({message:"admin Email is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		
		Categories.categoryExist(catname) 
		.then(mycategory=>{
			 
			var categoryId = mycategory.data._id;
			
			TypeModel.findOne({name:name,categoryId:categoryId}, (exist_err, exist_res)=>{
				 if(exist_err){
					LogError("Error found while creating property type: \n "+error);
reject({message: "Error found, "+name+" property type not created. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_CREATION_FAILED",status:400}); 
 
				 }
				 //no error
				 else{
					 
					 // if found
					 if(data!=null){
						
reject({message: "Error found, "+name+" property type("+name+") already exist. ",data:[],statusCode:"PROPERTY_TYPE_EXIST",status:409}); 
	 
					 }
					 // else not found
					 else{
					
			
			var newType = new TypeModel({
			name:name,createdBy:admin,categoryId:categoryId
		})
.save()
.then(category=>{ resolve({message:name+" property type created successfully. ",data:[],statusCode:"PROPERTY_TYPE_CREATED",status:201});  })		
.catch(error=>{ 
if (error.name === 'MongoError' && error.code === 11000) {
reject({message: "Error found, "+name+" property type already exist. ",data:[],statusCode:"PROPERTY_TYPE_EXIST",status:409}); 
	
}


LogError("Error found while creating property type: \n "+error);
reject({message: "Error found, "+name+" property type not created. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_CREATION_FAILED",status:400}); 

 })
		




					
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



  static getTypeById(id,admin=false){
	
	return new Promise((resolve,reject)=>{
		id = id!=undefined ?id:reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		id = id.length>0?id:reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId";
			
		
		 }
		 else{
			var filter = "name _id categoryId";
			 
		 }
		 var getCategoryType = TypeModel.findOne({
			_id:id
		}, filter,(err,res)=>{
			
			if(err || res==null){
				
LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property type fetched successfully. ",data:[res],statusCode:"PROPERTY_TYPE_GET_SUCCESS",status:200});  
	
				
			}
			
			
		})
		
		 
	
	
	
}

);

	
	
}




  static getTypeByName(name,admin=false){
	
	return new Promise((resolve,reject)=>{
		name = name!=undefined ?name.toLowerCase():reject({message:"property name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		name = name.length>0?name.toLowerCase():reject({message:"property name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId";
			
		
		 }
		 else{
			var filter = "name _id categoryId";
			 
		 }
		 var getCategoryType = TypeModel.findOne({
			name:name
		}, filter,(err,res)=>{
			
			if(err || res==null ){
				
LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property type fetched successfully. ",data:[res],statusCode:"PROPERTY_TYPE_GET_SUCCESS",status:400});  
	
				
			}
			
			
		})
		
		 
	
	
	
}


);
	
	
}



  static getTypeByCat(catname,admin=false){
	
	return new Promise((resolve,reject)=>{
		
		catname = catname!=undefined?catname.toLowerCase():reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		catname = catname.length>0?catname.toLowerCase():reject({message:"category name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId";
			
		
		 }
		 else{
			var filter = "name _id categoryId";
			 
		 }
		 
		 
		 
		 Categories.categoryExist(catname)
		 .then(category=>{
			 
		 var getCategoryType = TypeModel.find({
			categoryId:category.data._id
		}, filter,(err,res)=>{
			
			if(err){
				
LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category fetched successfully. ",data:res,statusCode:"PROPERTY_TYPE_GET_SUCCESS",status:200});  
	
				
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

 
  static get_all(admin=false){
	
	return new Promise((resolve,reject)=>{
		
		 
		 if(admin){ 
		 var filter = "name _id createdBy createdAt categoryId";
			
		
		 }
		 else{
			var filter = "name _id categoryId";
			 
		 }
		 
		 
		 
		 	 
		 var getCategoryType = TypeModel.find({
			 
		}, filter,(err,res)=>{
			
			if(err){
				
LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category fetched successfully. ",data:res,statusCode:"PROPERTY_TYPE_GET_SUCCESS",status:200});  
	
				
			}
			
			
		})
	
	
}

);

	
	
}

 


  static update(id,newData){
	
	
	return new Promise((resolve,reject)=>{
		 newData = newData!=undefined ?newData: reject({message:"new data is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 
		 id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		
		if(typeof newData =="string"){
			newData = JSON.parse(newData);
		}
		
		for(var a in newData){
			if(newData[a]==undefined ){
				reject({message:a+" is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
			}
			
			if(newData[a].length<=0 ){
				reject({message:a+" is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
			}
		}
		
		
		
		
		 if(newData.hasOwnProperty("category"))
		 {
			 newData.category = newData.category.toLowerCase();
			 
			 CategoryModel.categoryExist(newData.category)
			 .then(cat=>{
				 newData.categoryId = cat._id;
				 //update
				  var getCategoryType = TypeModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				
if (err.name === 'MongoError' && err.code === 11000) {
reject({message: "Error found, "+name+" property type already exist. ",data:[],statusCode:"PROPERTY_TYPE_EXIST",status:409}); 
	
}

LogError("Error found while Updating property Type: \n "+err);
reject( {message: "Error found, property category type not updated. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
				PropertyModel.updateMany({typeId:id}, {categoryId:cat._id},(err2,res2)=>{
					
				})
				
				resolve({message:" property category updated successfully. ",data:[],statusCode:"PROPERTY_TYPE_UPDATED",status:200});  
	
				
			}
			
			
		})
				 
			 })
			 .catch(err=>{
				 
				 LogError("Error found while fetching property type : \n "+err);
reject( {message: "Error found, property type not fetched. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_GET_FAILED",status:400}); 
	 
			 })
		 }
		 else{
			  var getCategoryType = TypeModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				
LogError("Error found while Updating property Type: \n "+err);
reject( {message: "Error found, property category type not updated. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category updated successfully. ",data:[],statusCode:"PROPERTY_CATEGORY_UPDATED",status:200});  
	
				
			}
			
			
		})
		 }
		 //category not specified
		 
		 
		
		
		 
	







}


);

}







  static remove(id,newData){
	
	return new Promise((resolve,reject)=>{
		
		 id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 var TypeCategory =TypeModel.deleteOne({
			_id:id
		},(err)=>{
			
			if(err){
				
LogError("Error found while deleting property Type : \n "+err);
reject( {message: "Error found, property Type not deleted. Please try again. ",data:[],statusCode:"PROPERTY_TYPE_DELETE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property Type deleted successfully. ",data:[],statusCode:"PROPERTY_TYPE_DELETED",status:200});  
	
				
			}
			
			
		})
		
		 
	







}


);




}







}




module.exports = Types;