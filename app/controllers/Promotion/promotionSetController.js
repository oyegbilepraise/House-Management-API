
const Promotion = require('../../models/promotions/promotion');
const Validator = require('validatorjs');



class Analytics{


    static async createPromotion(info){

        let {_id,type,duration} = info;
        return new Promise((resolve, reject)=>{
            try {
                var promotionCredentials = {
                    "_id": "required",
                    "type": "required",
                    "duration": "required",
                }
                
                var validator = new Validator(info, promotionCredentials);



                validator.passes(() => {
                    let result =  Promotion({property_id:_id,type,duration})
    
                    result.save((err,response)=>{
                        if(!err){
                           resolve({message:"CREATE_PROMOTION_SUCCESSFUL",data:null})             
                  
                        }
                    });
            })
            
            
            validator.fails(() => {
                var errors = validator.errors.all();
                resolve({message:"INVALID_DATA",response:errors,data:null})
                
              });

            
            } catch (error) {
                reject({message:"CREATE_PROMOTION_FAILED",data:null})           
            }

        })
    }

    static async togglePromotion(info){

        let {_id,status} = info;
        return new Promise((resolve, reject)=>{
            try {

                let update = { $set: {status:status}};
                Promotion.updateOne({_id},update,(err,response)=>{
                if(!err){
                    resolve({message:"PROMOTION_UPDATED_SUCCESSFUL",data:null})
                } else{
                    resolve({message:"PROMOTION_UPDATED_FAILED",data:null})
                }

            })

            } catch (error) {
                reject({message:"PROMOTION_UPDATED_FAILED",data:null})           
            }

        })
    }


}

module.exports = Analytics