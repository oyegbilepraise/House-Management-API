const Property = require('../../models/analytics/property')
const priceAnalyticsModels = require('../../models/analytics/price_search');
const PropertySearch = require('../../models/analytics/property_search');
const PropertyView = require('../../models/analytics/property_view');
const UnavailableSearch = require('../../models/analytics/unvailable_search')
const Locations = require('../../models/analytics/location')
const PropertyTypeSearch = require('../../models/analytics/property_type');
const Validator = require('validatorjs');





class Analytics{

    static async Save_price_Search(info){
        
        return new Promise((resolve, reject) => {
            try {
                    let {_id,data} = info
                    if (data.hasOwnProperty("min_price") || data.hasOwnProperty("max_price")) {

                        priceAnalyticsModels.findOne({min_price:data.min_price,max_price:data.max_price,currency:data.currency},(err,result)=>{
                            if(result){
                               let update = { $set: {count:parseInt(result.count)+parseInt(1)}};
                               priceAnalyticsModels.updateOne({min_price:data.min_price,max_price:data.max_price,currency:data.currency},update,(err,response)=>{
                                if(!err){
                                    resolve(response);
                                } 
                                else{
                                    reject(err)
                                }
                
                            })
                            }
                            else{
                                let create = new priceAnalyticsModels({min_price:data.min_price,max_price:data.max_price,currency:data.currency,count:1})  
                                create.save((err,answer)=>{
                                if(!err){
                                    //    next()
                                    resolve(answer)
                                } 
                                else{
                                    reject(err)
                                }
                            })
                            }
                
                        })
                        
                    }
              
                  
              } catch (error) {
                  
              }
        })
          
          
    }
    static async Save_Type_Search(info){
        
        return new Promise((resolve, reject) => {
            try {
                Analytics.Save_price_Search(info)
                if (info.hasOwnProperty('tid')) {

                    let {tid} = info
                    PropertyTypeSearch.findOne({property_type_id:tid},(err,result)=>{
                        if(result){
                           let update = { $set: {count:parseInt(result.count)+parseInt(1)}};
                           PropertyTypeSearch.updateOne({property_type_id:tid},update,(err,response)=>{
                            if(!err){
                                resolve(response);
                            } 
                            else{
                                reject(err)
                            }
            
                        })
                        }
                        else{
                            let create = new PropertyTypeSearch({property_type_id:tid,count:1})  
                            create.save((err,answer)=>{
                            if(!err){
                                //    next()
                                resolve(answer)
                            } 
                            else{
                                reject(err)
                            }
                        })
                        }
            
                    })
                    
                }
            }
            catch (error) {
                  
            }
           })
    }



    static async saveLocation(data){
              
        return new Promise((resolve, reject) =>{
            try {
                var locationCredentials = {
                    "state": "required",
                    "city": "required",
                    
                }
                var validator = new Validator(data, locationCredentials);



                validator.passes(() => {
            
                    Locations.findOne({state:data.state, city:data.city},(err,result)=>{
                        if(result){
                           let update = { $set: {count:parseInt(result.count)+parseInt(1)}};
                           Locations.updateOne({country:data.country},update,(err,response)=>{
                            if(!err){

                                resolve({message:"LOCATION_SAVED",response:"Location saved",data:null})

                            } 
                            else{
                                reject(err)
                            }
            
                        })
                        }
                        else{
                            let create = new Locations({state:data.state,city:data.city,count:1})  
                            create.save((err,answer)=>{
                            if(!err){
                                resolve({message:"LOCATION_SAVED",response:"Location saved",data:null})

            
                            } 
                            else{
                                reject(err)
                            }
                        })
                        }
            
                    })
                
            
            
            })
            
            
            validator.fails(() => {
                var errors = validator.errors.all();
                resolve({message:"INVALID_DATA",response:errors,data:null})
                
              });

                
            } catch (error) {
                
            }
        })

    }



    static async saveView(_id){
              
        return new Promise((resolve, reject) =>{
            try {
                PropertyView.findOne({property_id:_id},(err,result)=>{

                    if(result){
                       let update = { $set: {count:parseInt(result.count)+parseInt(1)}};
                        PropertyView.updateOne({property_id:_id},update,(err,response)=>{
                        if(!err){
                            resolve(response)
                        } 
                        else{
                            reject(err)
                        }
        
                    })
                    }
                    else{
                        let create = new PropertyView({property_id:_id,count:1})  
                        create.save((err,answer)=>{
                        if(!err){
                            resolve(answer)
        
                        } 
                        else{
                            reject(err)
                        }
                    })
                    }
        
                })
            } catch (error) {
                
            }
        })

    }

    static async Save_Search(info,status){
        
        return new Promise((resolve, reject) => {
            try {
                Analytics.Save_Type_Search(info)
                if(!status){
                    let {name,description,min_price,max_price,location,currency} = info
                    UnavailableSearch.findOne({name,description,min_price,max_price,location,currency},(err,result)=>{
                        if(result){
                           let update = { $set: {count:parseInt(result.count)+parseInt(1)}};
                           UnavailableSearch.updateOne({name,description,min_price,max_price,location,currency},update,(err,response)=>{
                            if(!err){
                                resolve(response);
                            } 
                            else{
                                reject(err)
                            }
            
                        })
                        }
                        else{
                            let create = new  UnavailableSearch({name,description,min_price,max_price,location,currency,count:1})  
                            create.save((err,answer)=>{
                            if(!err){
                                //    next()
                                resolve(answer)
                            } 
                            else{
                                reject(err)
                            }
                        })
                        }
            
                    })
                }
                  
              } catch (error) {
                  
              }
        })
          
          
    }

}

module.exports = Analytics