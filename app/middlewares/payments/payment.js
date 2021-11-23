

const Promotion = require('../../models/payments/payment')
const PaymentSet = require("../../controllers/Payments/paymentSetController")
const PaymentGet = require("../../controllers/Payments/paymentGetController")

const Misc =  require('../../helpers/misc');
let statusCode;
let data;


class Analytics_middle {
       
     //GET CART
    static async getCart(req,res,next){
        console.log(req.headers);
        let search_res = await PaymentGet.getCart(req.cookies)
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
    }


    //TOGGLE PROMOTION STATUS
    static async toggle_promotion(req,res,next){
        let search_res = await PaymentSet.togglePromotion(req.body)
        Misc.appResponse(res,"200",statusCode="success","data fetched",data= search_res);
    }

     //ADD TO CART
     static async addToCart(req,res,next){

        let search_res = await PaymentSet.addToCart(req.body,req.cookies)

            res.cookie(search_res.cookie.id, search_res.cookie,
                {
                    expire: 43200000 + Date.now(),
                    path:"/",
                    sameSite:"None",
                });
        //     res.cookie(search_res.cookie.id, search_res.cookie,{expire: 60 + Date.now()});
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

    }

    // DELETE FROM CART
    static async deleteFromCart(req,res,next){

        let search_res = await PaymentSet.deleteFromCart(req.body,req.cookies)
        res.clearCookie(search_res.cookie);

        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

    }

     // DELETE  ALL FROM CART
     static async deleteAllFromCart(req,res,next){

        const propertyNames = Object.values(req.cookies);

        for (let index = 0; index < propertyNames.length; index++) {
          await  res.clearCookie(propertyNames[index].id);
        }

        Misc.appResponse(res,"200",statusCode="CART_CLEAR","Clear cart successfully",data=null);

    }

    // RETURN THE PROPERTIES
    static async returProperty(req,res,next){

        let search_res = await PaymentSet.ReturnProperty(req.body,req.cookies)

        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);


    }

    // INCREASE CART UNIT
    static async increaseCartUnit(req,res,next){

        let search_res = await PaymentSet.increaseCartUnit(req.body,req.cookies)
        res.cookie(search_res.cookie.id, search_res.cookie,{expire: 43200000 + Date.now()});

        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);


    }

    // DECREASE CART UNIT
    static async decreaseCartUnit(req,res,next){

        let search_res = await PaymentSet.decreaseCartUnit(req.body,req.cookies)

        res.cookie(search_res.cookie.id, search_res.cookie,{expire: 43200000 + Date.now()});

        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);

    }


    
}

module.exports = Analytics_middle
