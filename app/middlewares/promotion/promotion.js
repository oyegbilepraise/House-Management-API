

const Promotion = require('../../models/promotions/promotion')
const PromotionSet = require("../../controllers/Promotion/promotionSetController")
const PromotionGet = require("../../controllers/Promotion/promotionGetController")

const Misc =  require('../../helpers/misc');
let statusCode;
let data;


class Analytics_middle {

    // GET PROPERTY VIEWS
    static async create_promotion(req,res,next){
        let search_res = await PromotionSet.createPromotion(req.body)
        Misc.appResponse(res,"200",statusCode=search_res.message,data = search_res.data);

 }

   //CURRENT PROMOTION
   static async get_promotion(req,res,next){
    let search_res = await PromotionGet.GetPromotions()

    Misc.appResponse(res,"200",statusCode=search_res.message,data= search_res.data);
}

    //TOGGLE PROMOTION STATUS
    static async toggle_promotion(req,res,next){
        let search_res = await PromotionSet.togglePromotion(req.body)

        Misc.appResponse(res,"200",statusCode=search_res.message,data= search_res.data);

    }
       
     //PAUSED PROMOTION
    static async paused_promotion(req,res,next){
        let search_res = await PromotionGet.pausedPromotion()

        Misc.appResponse(res,"200",statusCode=search_res.message,data= search_res.data);
    }

     //EXPIRED PROMOTION
     static async expired_promotion(req,res,next){
        let search_res = await PromotionGet.expiredPromotion()
        Misc.appResponse(res,"200",statusCode=search_res,data= search_res.data);
    }


    
}

module.exports = Analytics_middle