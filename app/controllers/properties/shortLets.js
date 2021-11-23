const CheckInModel = require("../../models/properties/checkIn");
const PropertyModel = require("../../models/properties/property"); 
const Analytics =  require("../Analytics/analyticsSetController");
const LogError =  require("../../helpers/logError");
 

class ShortLets{
	
	// delete and update shortlet request
	// get all booked time
	
	    dateFormat(dates){
	
	return new Promise((resolve,reject)=>{
		 
		
	var cdate = "";
	var count = dates.length;
	count = count-1;
	for(var i=0;i<dates.length;i++){
		
		var value = dates[i]
    var now = new Date;
    var target = new Date(value);
	cdate = target.getFullYear()+"/"+Number(target.getMonth()+1)+"/"+target.getDate();
	dates[i]=cdate;
 
    if (value.match(/^\d{4,4}[\/-]\d{1,2}[\/-]\d{1,2}$/)) 
    {
		if(i== count ){
			
        resolve({message:"true"})
		}
    }
    else    {
		reject({message: value+" has wrong date format, use yyyy/mm/dd"});
	} 
	
		
		
		
		
	};
	
	
	});
		
		
		
	}
	
	
      isfutureOrPresentDate(dates) 
    {    
	
	return new Promise((resolve,reject)=>{
		 
		
	var cdate = "";
	var count = dates.length;
	count = count-1;
	for(var i=0;i<dates.length;i++){
		
		var value = dates[i]
    var now = new Date;
    var target = new Date(value);
	cdate = target.getFullYear()+"/"+Number(target.getMonth()+1)+"/"+target.getDate();
var fyear = target.getFullYear() >= now.getFullYear();
var fmonth = target.getMonth() >= now.getMonth() ;
var fdate = target.getDate() >= now.getDate();
 


    if (fyear && fmonth && fdate) 
    {
		if(i== count ){
			
        resolve({message:"true"})
		}
    }
    else    {
		reject({message:cdate+" is in the past"});
	} 
	
		
		
		
		
	};
	
	
	});
	
	
}
   
  
	
	
	
	
	  getUnavailableDates(propid,dates){
		// get the dates that it has been booked.
		return new Promise((resolve,reject)=>{
			
			try{
				
				dates.length==0?resolve( {message: " property is available. ",data:[{available:true}],statusCode:"SHORT_LET_AVAILABILTY",status:200}):true;
				
			var allDates = dates;
			dateFormat(allDates)
			.then(goodformat=>{
				
				isfutureOrPresentDate(allDates)
				.then(validDates=>{
					
					var graceTime = process.env.SHORT_LET_GRACE_TIME_IN_MIN;
					graceTime = graceTime*60000;
					graceTime = Number(graceTime+Date.now())			
/* CheckInModel.find({proprtyId:propid,checkoutDateEpoch:{$gt:Date.now()}},(err,res)=>{ */
CheckInModel.findOne({proprtyId:propid,cartDateEpoch:{$lt:graceTime},dates:{$in:allDates}},(err,res)=>{
	
	if(err){
			 
LogError("Error found while fetching property availability for short lets: \n "+err);
reject( {message: "Error found, property availablility not fetched. Please try again. ",data:[],statusCode:"SHORT_LET_AVAILABILTY_FAILED",status:400}); 

 	
	
			}
			else if (res==null){
 resolve( {message: " property is available. ",data:[{available:true}],statusCode:"SHORT_LET_AVAILABILTY",status:200}); 

 	
	
			}
			
			else{
				//console.log(res[0]._id);
				
				var allBookedDates =  res.dates;
				var lastCount = allBookedDates.length;
				lastCount = lastCount-1;
				
				for(var booked=0;booked<allBookedDates.length;booked++){
				
				if(allDates.indexOf(allBookedDates[booked])<0 ){
				delete allBookedDates[booked];	
				}

if(lastCount==booked){
	reject({message:" property is not available. ",data:[{available:false},bookedDates:allBookedDates],statusCode:"SHORT_LET_AVAILABILTY",status:405});  
	
}				
				}
				
				
				
			}
	
	
	
})


					
					
					
				})
				.catch(err=>{
					reject({message:err.message,data:[],statusCode:"NOT_FUTURE_DATE",status:400});
		
				})
				
			})
			.catch(err=>{
				 reject({message:err.message,data:[],statusCode:"INVALID_DATE_FORMAT",status:400});
			})
			

			
			}
			catch(err=>{
				
				LogError("Error occured during chechIn get UnAvailability ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
			
			
			
		})
		
	}
	
	
	
	  getTotalPrice(propid,params){
		
		
		return new Promise((resolve,reject)=>{
			
			try{
				
				PropertyModel.findOne({_id:propid},(err,res)=>{
					
	 
	if(err || res==null){
			 
LogError("Error found while fetching property availability for short lets: \n "+err);
reject( {message: "Error found, property availablility not fetched. Please try again. ",data:[],statusCode:"PROPERTY_GET_FAILED",status:400}); 

 	
	
			}
			else{
				//console.log(res[0]._id);
				params.currency == "undefined"?reject({message: "currency is required",data:[],statusCode:"CURRENCY_REQUIRED",status:400}):true;
				
				params.currency = params.currency.toUpperCase();
				
				 var cost = res.data["cost_"+params.currency]? res.data["cost_"+params.currency] :0;
				 var adultPrice = res.data["price_per_adult_"+params.currency]? res.data["price_per_adult_"+params.currency] :0;
				 var kidsPrice = res.data["price_per_kids_"+params.currency]? res.data["price_per_kids_"+params.currency] :0;
				 var maxAdult = res.data["max_adult"]?res.data["max_adult"]:4;
				 var maxKids = res.data["max_kids"]?res.data["max_kids"]:6;
				 params.kids = Number(params.kids)
				 params.adults = Number(params.adults);
				 
				 Number(params.kids)>maxKids?reject({message:maxKids+" is maximum number of kids",data:[],statusCode:"MAX_KIDS_REACHED",status:400}):true;
				  Number(params.adults)>maxAdult?reject({message:maxAdult+" is maximum number of adults",data:[],statusCode:"MAX_ADULTS_REACHED",status:400}):true;
				 
				 adultPrice = adultPrice*params.adults;
				 kidsPrice = adultPrice*params.kids;
				
				cost = params.dates.length*cost
				var totalPrice = Number(adultPrice)+Number(kidsPrice)+Number(cost);
				 resolve({message:" total cost fetched successfully. ",data:[{cost:totalPrice}],statusCode:"COST_GET_SUCCESS",status:200});  
	
				
			}
					
					
				 
				
				
			})
			
			}
			catch(err=>{
				
				LogError("Error occured during chechIn get total price ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}


	  CreateCheckIn(dataObj){
		
		dataObj = (   ( {propertyId,name,email,occupation,dob,kids,adults,dates,checkOutDateEpoch} )=>( {propertyId,name,email,occupation,dob,kids,adults,dates,checkOutDateEpoch})    )(dataObj);
	
		return new Promise((resolve,reject)=>{
			
			try{
				
				
				
				for(var data in dataObj){
					if(dataObj[data]==undefined){
					reject( {message: data+" is required. ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	                 return;
					}
				}
				
				if(dataObj.hasOwnProperty(checkOutDateEpoch)){
					dataObj.checkOutDateEpoch<Date.now()?reject( {message:  "checkOutDateEpoch is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}):true;
				
				}
				if(!Array.isArray(dates)){
					reject( {message:  "dates are required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				
			getUnavailableDates(dataObj.propertyId,dataObj.dates)
			.then(available=>{
				getTotalPrice(dataObj.propertyId,dataObj)
				.then(price=>{
					dataObj.cost = price.data[0].cost;
						new CheckInModel({...dataObj},function(err,data){
					 if(err){
								 
LogError("Error found while saving checkin for shortlets short lets: \n "+err);
reject( {message: "Error found, save checkin failed. Please try again. ",data:[],statusCode:"SHORT_LET_SAVE_CHECKIN_FAILED",status:400}); 
	 
					 }
					 else{
						resolve( {message: "checkin saved, please proceed to payment",data:[],statusCode:"SHORT_LET_SAVE_CHECKIN_SUCCESS",status:200}); 
 
						 
					 }
					
				})
			
				})
				.catch(err=>{
					
				})
				
				
			})
			.catch(err=>{
				reject(err);
			})
				 

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn create ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}



	  UpdateCheckIn(dataObj){
		
		dataObj = (   ( {name,email,occupation,dob,kids,adults,dates,checkOutDateEpoch} )=>( {name,email,occupation,dob,kids,adults,dates,checkOutDateEpoch})    )(dataObj);
	
		return new Promise((resolve,reject)=>{
			
			try{
				
				if(dataObj.hasOwnProperty(checkOutDateEpoch)){
					dataObj.checkOutDateEpoch<Date.now()?reject( {message:  "checkOutDateEpoch is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}):true;
				
				}
				/* for(var data in dataObj){
					if(dataObj[data]==undefined){
					reject( {message: data+" is required. ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	                 return;
					}
				}
				 */
				 
				 
				 
				 dataObj.dates = dataObj.dates!=undefined?dataObj.dates:[];
				 
				 
				
				if(dataObj.id==undefined){
					reject( {message:  "id is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				
				CheckInModel.findOne({_id:dataObj.id},function(err,checkin){
					
					if(err){
						LogError("Error occured during update chechIn ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					else if(checkin==null){
					reject({message:"short let checkin request not found",data:[],statusCode:"SHORT_LET_DATA_NOT_FOUND",status:404}); 
	
					}
					
				else{
						
			checkin.paid=="true"?reject({message:"you cannot update short let after payment",data:[],statusCode:"SHORT_LET_PAID",status:401}):true;
			
						
			getUnavailableDates(checkin.propertyId,dataObj.dates)
			.then(available=>{
				
				dataObj.kids =  dataObj.kids==undefined?checkin.kids:dataObj.kids; 
				dataObj.adults =  dataObj.adults==undefined?checkin.adults:dataObj.adults; 
				data.dates = data.dates.length==0?checkin.dates:data.dates;
				
				getTotalPrice(checkin.propertyId,dataObj)
				.then(price=>{
					dataObj.cost = price.data[0].cost;
						 CheckInModel.updateOne({propertyId:checkin.propertyId,paid:"false"},{...dataObj},function(err,data){
					 if(err){
								 
LogError("Error found while updating checkin for shortlets short lets: \n "+err);
reject( {message: "Error found, update checkin failed. Please try again. ",data:[],statusCode:"SHORT_LET_UPDATE_CHECKIN_FAILED",status:400}); 
	 
					 }
					 else{
						resolve( {message: "checkin updated, please proceed to payment",data:[],statusCode:"SHORT_LET_UPDATE_CHECKIN_SUCCESS",status:200}); 
 
						 
					 }
					
				})
			
				})
				.catch(err=>{
					
				})
				
				
			})
			.catch(err=>{
				reject(err);
			})
				
				}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn update ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}


	  getAllCheckIn(start){
		
		 
		return new Promise((resolve,reject)=>{
			
			try{
				  
				
				CheckInModel.find({},null, { skip: start,limit:20 }, function(err,checkin){
					
					if(err){
						LogError("Error occured during get chechIn ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					else if(checkin==null){
					reject({message:"request not found",data:[],statusCode:"SHORT_LET_DATA_NOT_FOUND",status:404}); 
	
					}
					
				else{
						
			 resolve({message:"request found",data:checkin,statusCode:"SHORT_LET_DATA_FOUND",status:200}); 
	
				
				}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn get ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}

   getCheckInById(id,admin=false){
		
		 
		return new Promise((resolve,reject)=>{
			
			try{
				
				if(id==undefined){
					reject( {message:  "id is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				
				  if(admin){
					var filter = null;  
				  }else{
					var filter = "name email occupation dob kids adults dates checkOutDateEpoch";  
				  }
				
				CheckInModel.find({_id:id},filter, function(err,checkin){
					
					if(err){
						LogError("Error occured during get chechIn by id", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					else if(checkin==null){
					reject({message:"request not found",data:[],statusCode:"SHORT_LET_DATA_NOT_FOUND",status:404}); 
	
					}
					
				else{
						
			 resolve({message:"request found",data:checkin,statusCode:"SHORT_LET_DATA_FOUND",status:200}); 
	
				
				}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn get ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}

  getCheckInByUser(email,start,admin=false){
		
		 
		return new Promise((resolve,reject)=>{
			
			try{
				
				if(email==undefined){
					reject( {message:  "email is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				
				  if(admin){
					var filter = null;  
				  }else{
					var filter = "name email occupation dob kids adults dates checkOutDateEpoch";  
				  }
				
				CheckInModel.find({email},filter, { skip: start,limit:20 }, function(err,checkin){
					
					if(err){
						LogError("Error occured during get chechIn by user", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					else if(checkin==null){
					reject({message:"request not found",data:[],statusCode:"SHORT_LET_DATA_NOT_FOUND",status:404}); 
	
					}
					
				else{
						
			 resolve({message:"request found",data:checkin,statusCode:"SHORT_LET_DATA_FOUND",status:200}); 
	
				
				}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn get ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}

  getActiveBookedDates(){
		
		 
		return new Promise((resolve,reject)=>{
			
			try{
				  
				
				CheckInModel.find({checkOutDateEpoch:{$gte:Date.now()}},"dates", function(err,checkin){
					
					if(err){
						LogError("Error occured during get active booked chechIn dates", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					else if(checkin==null){
					reject({message:"request not found",data:[],statusCode:"SHORT_LET_DATA_NOT_FOUND",status:404}); 
	
					}
					
				else{
						
			 resolve({message:"request found",data:checkin,statusCode:"SHORT_LET_DATA_FOUND",status:200}); 
	
				
				}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn get ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}




	 ActivateCheckIn(dataObj){
		
		//dataObj = (   ( {name,email,occupation,dob,kids,adults,dates} )=>( {name,email,occupation,dob,kids,adults,dates})    )(dataObj);
	
		return new Promise((resolve,reject)=>{
			
			try{
				
				 //id and amount is required
				 
				if(dataObj.id==indefined){
					reject( {message:  "id is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				 
				if(dataObj.amount==indefined){
					reject( {message:  "amount is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				
				CheckInModel.findOne({_id:dataObj.id},function(err,checkin){
					
					if(err){
						LogError("Error occured during activate chechIn ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					else if(checkin==null){
					reject({message:"short let checkin request not found",data:[],statusCode:"SHORT_LET_DATA_NOT_FOUND",status:404}); 
	
					}
					
				else{
						
			checkin.paid=="true"?reject({message:"payment made and activated already",data:[],statusCode:"SHORT_LET_PAID",status:401}):true;
			
						
			getUnavailableDates(checkin.propertyId,checkin.dates)
			.then(available=>{
				
				dataObj.kids =  dataObj.kids==undefined?checkin.kids:dataObj.kids; 
				dataObj.adults =  dataObj.adults==undefined?checkin.adults:dataObj.adults; 
				data.dates = data.dates.length==0?checkin.dates:data.dates;
				
				getTotalPrice(checkin.propertyId,dataObj)
				.then(price=>{
					dataObj.cost = price.data[0].cost;
					
						 if ( Number(price.data[0].cost) <=Number(dataObj.amount) ){
							

CheckInModel.updateOne({propertyId:checkin.propertyId,paid:"false"},{paid:"true",paidDate:new Date(),paidDateEpoch:Date.now()},function(err,data){
					 if(err){
								 
LogError("Error found while updating checkin for shortlets short lets: \n "+err);
reject( {message: "Error found, save checkin failed. Please try again. ",data:[],statusCode:"SHORT_LET_ACTIVATE_CHECKIN_FAILED",status:400}); 
	 
					 }
					 else{
						resolve( {message: "checkin updates, please proceed to payment",data:[],statusCode:"SHORT_LET_ACTIVATE_CHECKIN_SUCCESS",status:200}); 
 
						 
					 }
					
				})
			
				

							
						 }
						 else{
							 
							 reject({message:"incomplete or no payment made",data:[{requiredAmount:price.data[0].cost, amountPaid:dataObj.amount}],statusCode:"SHORT_LET_INCOMPLETE_PAYMENT",status:401}):true;
			
							 
							 
						 }
				
				
				})
				.catch(err=>{
					
				})
				
				
			})
			.catch(err=>{
				reject(err);
			})
				
				}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn update ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}






	 DeleteCheckIn(dataObj){
		
		//dataObj = (   ( {name,email,occupation,dob,kids,adults,dates} )=>( {name,email,occupation,dob,kids,adults,dates})    )(dataObj);
	
		return new Promise((resolve,reject)=>{
			
			try{
				
				 //id and amount is required
				 
				if(dataObj.id==indefined){
					reject( {message:  "id is required ",data:[],statusCode:"SHORT_LET_FIELD_REQUIRED",status:400}); 
	               
				}
				 
				 
				
				CheckInModel.findOne({_id:dataObj.id},function(err,checkin){
					
					if(err){
						LogError("Error occured during save chechIn ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

					}
					 
					
				else{
						
			 
CheckInModel.deleteOne({propertyId:checkin.propertyId,paid:"false"}, function(err,data){
					 if(err){
								 
LogError("Error found while deleting checkin for shortlets short lets: \n "+err);
reject( {message: "Error found, delete checkin failed. Please try again. ",data:[],statusCode:"SHORT_LET_DELETE_CHECKIN_FAILED",status:400}); 
	 
					 }
					 else{
						resolve( {message: "checkin deleted",data:[],statusCode:"SHORT_LET_DELETE_CHECKIN_SUCCESS",status:200}); 
 
						 
					 }
					
				})


			}


				
				})
				

				 }
			catch(err=>{
				
				LogError("Error occured during chechIn update ", " Error message: ",err)
	reject({message:"error found, try again",data:[],statusCode:"UNKNOWN_ERROR",status:500}); 

				
			})
			
			
		})
		
	}














	
}

 
 
 
 
 
 
 
module.exports = new ShortLets();