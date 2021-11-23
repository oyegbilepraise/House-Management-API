const TypeModel = require("../../models/properties/PropertiesTypes");
const PropertyModel = require("../../models/properties/property");
const LogError =  require("../../helpers/logError");
const Categories =  require("./categories");
const Analytics =  require("../Analytics/analyticsSetController");
const Types =  require("./types");



const Search = (filter,start=0,suspended="false")=>{


return new Promise((resolve,reject)=>{
	
	//Property Category, Location, Type of Property, Cost Range, Bed Count (For Houses)
try{ 

  filter !=undefined ?filter: reject({message:"search keywords are required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
  //filter.length>0 ?filter: reject({message:"search keywords are required",data:[],statusCode:"PROPERTY_FIELD_REQUIRED",status:400});
		 
//console.log("F: ",filter);
if(typeof filter=="string" ){
	filter = JSON.parse(filter);
}



var min_price=0;
var max_price=0;
var query = {suspended}

//tid is typeid and cid is categoryid
filter.hasOwnProperty("cid")?query.categoryId=filter.cid:true;
filter.hasOwnProperty("tid")?query.typeId=filter.tid:true;



	if(filter.hasOwnProperty("data")){
		
		
		var data =  filter.data;
		
		min_price = data.hasOwnProperty("min_price")? parseFloat(data.min_price):0;
		max_price = data.hasOwnProperty("max_price")?parseFloat(data.max_price):0;
		delete data.min_price;
		delete data.max_price;
		
		var dataQuery = "";
 for(var d in data){
	 dataQuery = "data."+d;
	 
	 if(d!="currency"){
		 query[dataQuery]={$regex:new RegExp(data[d]),$options:"i"}
	 }
	 
 } 	
 
 if(max_price + min_price>0){
	 //if(filter.currency.toLowerCase("USD"))
	 query["data.cost_"+data.currency.toUpperCase()]={$gte:min_price,$lte:max_price}
	 
 }

	
	}
	//console.log(query);
	
	
	PropertyModel.find(query,  null, { skip: start,limit:20,populate:"typeId categoryId" },
	
	function(err, docs) {
		//console.log(docs)
		 
err || !docs || docs==undefined || docs==null? reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}):true; 

	//console.log("type filter : ",typeof filter);

var analytics_search = typeof filter=="string"?JSON.parse(filter):filter;
	
	//console.log("type analytics_search : ",typeof analytics_search);

	if(docs){
		
		
if(docs.length==0) {
	
	Analytics.Save_Search(analytics_search)
	.then(res=>{})
	.catch(err=>{})
	
	reject({message:"Search not found.",data:[],statusCode:"SEARCH_NOT_FOUND",status:404})
	
}	
//:true;

 
if(docs.length>0){
	
	// console.log("type FOund : ",typeof analytics_search);
	analytics_search = typeof docs=="string"?JSON.parse(docs):docs;
	
	// console.log("Found: ",analytics_search);
	
	 Analytics.Save_Search(analytics_search)
	 .then(res=>{})
	.catch(err=>{})
	
	var myres =  [];
				 var each_prop = {};
				 
	
				 for(var i=0;i<docs.length;i++){
					 //each_prop = {data:res[i].data}
					 each_prop =  (( {name, _id, createdBy, createdAt, categoryId, typeId, suspended, data})=>({name, _id, createdBy, createdAt, categoryId, typeId, suspended, data}))(docs[i]) 
				 
				 
				 //( ( { a, c }) => ({ a, c }))(object);

				 
				 each_prop.categoryName =  docs[i].categoryId[0].name
				 each_prop.categoryId =  docs[i].categoryId[0]._id
				
				each_prop.typeName =  docs[i].typeId[0].name
				 each_prop.typeId =  docs[i].typeId[0]._id
					
					myres.push(each_prop);
			   // res[i].categoryId = ele.categoryId[0]._id
					
				//res[i].typeId = ele.typeId[0]._id
				// res[i].typeName = ele.typeId[0].name
					   //console.log(  res[i].categoryName,i, ele)
					
					if(i==(docs.length-1)){
						//console.log( res[i].categoryId[0]);
						resolve({message:"Search found.",data:myres,statusCode:"SEARCH_FOUND",status:200})
	 
						//resolve({message:" property fetched successfully. ",data:myres,statusCode:"PROPERTY_GET_SUCCESS",status:200});  
	
					}
					
				}
				 
	
	
	// resolve({message:"Search found.",data:docs,statusCode:"SEARCH_FOUND",status:200})
	 
	 
}  






		
	}
	
	else{
		reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

		
	}

		}
		
		
		
	)
	 
}

catch(err){
	LogError("Error occured during search, Keywords: ",filter, " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

}	
	
	
})
	
	
	
}



module.exports = Search;