const Promotion = require('../../models/promotions/promotion');

class Analytics{


    static async GetPromotions(){
              
        return new Promise((resolve, reject) =>{

            try {

                Promotion.aggregate([{

                    $lookup: {
                        from: "properties",
                        localField: "property_id",
                        foreignField: "_id",
                        as: "property"
                    },
                },
                { $match: { status:"active" } },
            ])
            .exec(function(err, result) {
                         if(err){

                            resolve({message:"GET_PROMOTIONS_FAILED",data:null})
                    }else{

                        resolve({message:"GET_PROMOTION_SUCCESSFUL",data:result})
                    }
                });

            } catch (error) {
                console.log(error);
                
            }
        })

    }




    static async pausedPromotion(){
              
        return new Promise((resolve, reject) =>{

            try {

                Promotion.aggregate([{

                    $lookup: {
                        from: "properties",
                        localField: "property_id",
                        foreignField: "_id",
                        as: "property"
                    },
                },
                { $match: { status:"pause" } },
            ])
            .exec(function(err, result) {
                         if(err){

                            resolve({data:null,message:"PROMOTION_UPDATED_FAILED"})

                    }

                    else{
                        resolve({data:null,message:"PROMOTION_UPDATED_SUCCESSFUL"})
                    }
                });

            } catch (error) {
                resolve({data:null,message:"PROMOTION_UPDATED_FAILED"})
                
            }
        })

    }




    static async expiredPromotion(){
              
        return new Promise((resolve, reject) =>{

            try {

                Promotion.aggregate([{

                    $lookup: {
                        from: "properties",
                        localField: "property_id",
                        foreignField: "_id",
                        as: "property"
                    },
                },
                { $match: { status:"expired"} },
            ])
            .exec(function(err, result) {
                         if(err){
                             resolve({data:result,message:"GET_EXPIRED_PROMOTION_FAILED"})
                    }else{
                        resolve({data:result,message:"GET_EXPIRED_PROMOTION_SUCCESSFUL"})

                    }
                });

            } catch (error) {
                resolve({data:result,message:"GET_EXPIRED_PROMOTION_FAILED"})
                
            }
        })

    }


}

module.exports = Analytics