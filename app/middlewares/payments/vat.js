

const Vat = require('../../models/payments/vat')
const PaymentSet = require("../../controllers/Payments/paymentSetController")
const PaymentGet = require("../../controllers/Payments/paymentGetController")

const Misc =  require('../../helpers/misc');
let statusCode;
let data;


class Analytics_middle {


    // CREATE VAT
    static async create_vat(req,res,next){
        let search_res = await PaymentSet.createVat(req.body)
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data = search_res.data);

 }

   // GET VAT
   static async get_vat(req,res,next){
    let search_res = await PaymentGet.getVat()
    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
}

  //UPDATE VAT
  static async update_vat(req,res,next){
    let search_res = await PaymentSet.updateVat(req.body)
    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
}

   


    
}

module.exports = Analytics_middle

