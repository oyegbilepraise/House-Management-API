const CategoryModel = require("../../models/properties/PropertiesCategories");
const LogError =  require("../../helpers/logError");
class Categories{


  static create(name,adminEmail){
	
	return new  Promise( (resolve,reject)=>{
		var admin = adminEmail;
		//console.log(name," " , adminEmail,name.length>0)
		name = name!=undefined ?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		name = name.length>0?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		adminEmail = adminEmail!=undefined ?adminEmail: reject({message:"admin is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED" ,status:400 });
		adminEmail = adminEmail.length>0?adminEmail: reject({message:"admin is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED" ,status:400 });
	
		var newCategory = new CategoryModel({
			name:name,createdBy:admin
		})
.save()
.then(category=>{ resolve({message:name+" property category created successfully. ",data:[],statusCode:"PROPERTY_CATEGORY_CREATED" ,status:201});  })		
.catch(error=>{ 

console.log(error);

if (error.name === 'MongoError' && error.code === 11000) {
reject({message: "Error found, "+name+" property Category already exist. ",data:[],statusCode:"PROPERTY_CATEGORY_EXIST" ,status:409}); 
	
}

LogError("Error found while creating property : \n "+error);
reject({message: "Error found, "+name+" property category not created. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_CREATION_FAILED" ,status:400});

  })		
		
		
	}
	
	);
	
	
	
}



  static get(id,admin=false){
	
	return new Promise((resolve,reject)=>{
	 	id = id!=undefined ?id: reject({message:"cid is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"cid is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
	
		 if(admin){ 
		 var filter = "name _id createdBy createdAt";
			
		
		 }
		 else{
			var filter = "name _id";
			 
		 }
		 var getCategory = CategoryModel.findOne({
			_id:id
		}, filter,(err,res)=>{
			
			if(err || res==null){
				
LogError("Error found while fetching property : \n "+err);
reject( {message: "Error found, property categories not fetched. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category fetched successfully. ",data:[res],statusCode:"PROPERTY_CATEGORY_GET_SUCCESS",status:200});  
	
				
			}
			
			
		})
		
		 
	
	
	
}

);

	
	
}


  static get_all(admin=false){
	
	return new Promise((resolve,reject)=>{
		
		 if(admin){ 
		 var filter = "name _id createdBy createdAt";
			
		
		 }
		 else{
			var filter = "name _id";
			 
		 }
		 var getCategory = CategoryModel.find({
			 
		}, filter,(err,res)=>{
			
			if(err){
				
LogError("Error found while fetching property Categories: \n "+err);
reject( {message: "Error found, property categories not fetched. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_GET_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category fetched successfully. ",data:res,statusCode:"PROPERTY_CATEGORY_GET_SUCCESS",status:200});  
	
				
			}
			
			
		})
		
		 
	
	
	
}

);

	
	
}


  static categoryExist(name){
	
	return new Promise((resolve,reject)=>{
		name = name.toLowerCase();
		 name = name !=undefined ?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		 name = name.length>0?name: reject({message:"name is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 var getCategory = CategoryModel.findOne({
			name:name
		},"name _id",(err,res)=>{
			
			if(err || res==null){
				
LogError("Error found while fetching property : \n "+err);
reject( {message: "Category not found",data:[],statusCode:"PROPERTY_CATEGORY_NOT_FOUND",status:404}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category fetched successfully. ",data:res,statusCode:"PROPERTY_CATEGORY_FOUND",status:200});  
	
				
			}
			
			
		})
		
		 
	
	
	
}

);

	
	
}





  static update(id,newData){
	
	return new Promise((resolve,reject)=>{
		
		 newData = newData!=undefined ?newData: reject({message:"new data is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 
		if( typeof newData =="string"){
			newData = JSON.parse(newData);
		}
		
		
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
		
		 
		 var getCategory = CategoryModel.updateOne({
			_id:id
		}, newData,(err,res)=>{
			
			if(err){
				
if (err.name === 'MongoError' && err.code === 11000) {
reject({message: "Error found, "+name+" property Category already exist. ",data:[],statusCode:"PROPERTY_CATEGORY_EXIST",status:409}); 
	
}
LogError("Error found while Updating property : \n "+err);
reject( {message: "Error found, property category not updated. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_UPDATE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category updated successfully. ",data:[],statusCode:"PROPERTY_CATEGORY_UPDATED",status:200});  
	
				
			}
			
			
		})
		
		 
	







}

);

}







  static remove(id){
	
	return new Promise((resolve,reject)=>{
		id = id!=undefined ?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
	 	id = id.length>0?id: reject({message:"id is required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		
		 
		 var getCategory = CategoryModel.deleteOne({
			_id:id
		},(err)=>{
			
			if(err){
				
LogError("Error found while deleting property : \n "+err);
reject( {message: "Error found, property category not deleted. Please try again. ",data:[],statusCode:"PROPERTY_CATEGORY_DELETE_FAILED",status:400}); 

 	
	
			}
			else{
				
				
				resolve({message:" property category deleted successfully. ",data:[],statusCode:"PROPERTY_CATEGORY_DELETED",status:200});  
	
				
			}
			
			
		})
		
		 
	







}

);





}







}



module.exports = Categories;