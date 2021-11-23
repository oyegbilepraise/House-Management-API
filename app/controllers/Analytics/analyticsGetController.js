const Property = require('../../models/analytics/property')
const priceAnalyticsModels = require('../../models/analytics/price_search');
const PropertySearch = require('../../models/analytics/property_search');
const PropertyTypeSearch = require('../../models/analytics/property_type');
const PropertyView = require('../../models/analytics/property_view');
const UnavailableSearch = require('../../models/analytics/unvailable_search')
const Locations = require('../../models/analytics/location')



class Analytics{


    static async propertyTypeSearches(){
              
        return new Promise((resolve, reject) =>{
            try {

                PropertyTypeSearch.aggregate([{
                    
                    $lookup: {
                        from: "PropertiesType",
                        localField: "property_type_id",
                        foreignField: "_id",
                        as: "property"
                    },
                },
            ])
                .exec(function(err, result) {
                         if(err){
                        resolve(err)
                       
                    }
                    else{
                        if (result.length>0) {
                            let sort_result = result.sort((a,b)=>{return b.count - a.count })
                            resolve({data:sort_result.splice(0,2), message:"PROPERTY_SEARCHED_ANALYTICS_FETCHED",response:"properties searchs fetched successfully"})
                        } else {
                            resolve({data:result, message:"NO_PROPERTY_SEARCHED_ANALYTICS_FOUND",response:"Properties search not found"})

                            
                        }
                        // let sort_result = result.sort((a,b)=>{return b.count - a.count })
                        // resolve(sort_result.splice(0,2))
                    }
                });
            } catch (error) {
                resolve({data:result, message:"PROPERTY_SEARCHED_ANALYTICS_FAILED",response:"Properties searches analytics failed"})

                
            }
        })

    }


    
    static async geLocation(){

        return new Promise((resolve, reject) =>{
            try {
                Locations.find({},(err,result)=>{

                    if (result.length>0) {
                        let sort_result = result.sort((a,b)=>{return b.count - a.count })
                        resolve({data:sort_result.splice(0,2), message:"LOCATION_ANALYTICS_FETCHED",response:"Location analytics fetched successfully"})
                    } else {
                        resolve({data:result, message:"NO_LOCATION_ANALYTICS_FOUND",response:"Location analytics not found"})
                        
                    }
             })

            } catch (error) {
               reject({data:result, message:"LOCATION_ANALYTICS_FETCH_FAILED",response:"Locations analytics fetched failed"})          
            }

        })
    }



    // static async propertySearch(){
              
    //     return new Promise((resolve, reject) =>{
    //         try {

    //             PropertySearch.aggregate([{
 
    //                 $lookup: {
    //                     from: "properties",
    //                     localField: "property_id",
    //                     foreignField: "_id",
    //                     as: "property"

    //                 },
    //             },
    //         ])
    //             .exec(function(err, result) {
    //                      if(err){
    //                     resolve(err)
                       
    //                 }
    //                 else{
    //                     if (result.length>0) {
                            
    //                         let sort_result = result.sort((a,b)=>{return b.count - a.count })
    //                         resolve({data:sort_result.splice(0,2), message:"PROPERTY_VIEWED_ANALYTICS_FETCHED",response:"Properties view analytics fetched successful"})
    //                     } else {
    //                         resolve({data:result, message:"NO_PROPERTY_VIEWED_SEARCHED_ANALYTICS_FOUND",response:"Properties view analytics not found"})

                            
    //                     }
    //                 }
    //             });
    //         } catch (error) {

    //             resolve({data:sort_result.splice(0,2), message:"PROPERTY_VIEWED_ANALYTICS_FAILED",response:"Properties view analytics failed"})

                
    //         }
    //     })

    // }


    static async priceSearch(){
              
        return new Promise((resolve, reject) =>{
            try {

                priceAnalyticsModels.find({}, (err, result)=> {
                        if(err){

                     resolve(err)
                            
                }
                else{

                    if (result.length>0) {

                        let sort_result = result.sort((a,b)=>{return b.count - a.count })
                        resolve({data:sort_result.splice(0,10), message:"PRICE_SEARCHED_ANALYTICS_FETCHED",response:"Price searches analytics fetched successful"})
                    } else {
                        resolve({data:result, message:"NO_PRICE_SEARCHED_ANALYTICS_FOUND",response:"Price searches analytics not found"})

                        
                    }
                    
                    // let sort_result = result.sort((a,b)=>{return b.count - a.count })
                    // resolve(sort_result.splice(0,2))
                }
            });
            } catch (error) {
               reject({data:result, message:"LOCATION_ANALYTICS_FETCH_FAILED",response:"Locations analytics fetched failed"})          
            }
        })

    }



    static async getView(){
              
        return new Promise((resolve, reject) =>{
            try {

                PropertyView.aggregate([{
                    $lookup: {
                        from: "properties",
                        localField: "property_id",
                        foreignField: "_id",
                        as: "property"
                    }
                }]).exec(function(err, result) {
                         if(err){
                        resolve(err)
                       
                    }
                    else{
                        if (result.length>0) {
                            
                            let sort_result = result.sort((a,b)=>{return b.count - a.count })
                            resolve({data:sort_result.splice(0,2), message:"PROPERTY_VIEWED_ANALYTICS_FETCHED",response:"Properties view analytics fetched successful"})
                        } else {
                            resolve({data:result, message:"NO_PROPERTY_VIEWED_SEARCHED_ANALYTICS_FOUND",response:"Properties view analytics not found"})

                            
                        }
                        // let sort_result = result.sort((a,b)=>{return b.count - a.count })
                        // resolve(sort_result.splice(0,2))
                    }
                });
            } catch (error) {

                resolve({data:sort_result.splice(0,2), message:"PROPERTY_VIEWED_ANALYTICS_FAILED",response:"Properties view analytics failed"})

                
            }
        })

    }


    static async getUnavailable(){

        return new Promise((resolve, reject) =>{
            try {
             UnavailableSearch.find({},(err,result)=>{

                if (result.length>0) {
                    let sort_result = result.sort((a,b)=>{return b.count - a.count })
                    resolve({data:sort_result.splice(0,2), message:"UNAVAILABLE_SEARCHED_ANALYTICS_FETCHED",response:"Unavailable searches fetched successful"})
                } else {
                    resolve({data:result, message:"NO_UNAVAILABLE_SEARCHED_ANALYTICS_FOUND",response:"Unavailable searches not found"})

                    
                }

                //  let sort_result = result.sort((a,b)=>{return b.count - a.count })
                //     resolve(sort_result.splice(0,2))
             })

            } catch (error) {
               reject({data:null, message:"UNAVAILABLE_SEARCHED_ANALYTICS_FAILED",response:"Unavailable searches failed"})          

            }

        })
    }


    static async propertySearch(){

        return new Promise(async(resolve, reject) =>{
            try {

          let response = await  PropertySearch.find({}).sort({ count: 1}).limit(10)
          
          resolve({data:response, message:"FETCHED",response:"fetched"})          

            } catch (error) {
               reject({data:null, message:"UNAVAILABLE_SEARCHED_ANALYTICS_FAILED",response:"Unavailable searches failed"})          

            }

        })
    }

}

module.exports = Analytics