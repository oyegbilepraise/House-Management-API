

const Invoice = require('../../models/payments/invoice')
const PaymentSet = require("../../controllers/Payments/paymentSetController")
const PaymentGet = require("../../controllers/Payments/paymentGetController")
const Email = require("../../helpers/sendMail")

const Misc =  require('../../helpers/misc');
let statusCode;
let data;


class Analytics_middle {


    // GET IDENTITY
    static async get_id(req,res,next){
        let search_res = await PaymentSet.getInvoiceID()
        Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data = search_res.data);

 }
 // SAVE PDF
 static async save_pdf(req,res,next){
    let search_res = await PaymentSet.saveInvoiceLink(req.body)
    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data = search_res.data);

}

   // GET ALL INVOICE
   static async get_all_invoice(req,res,next){
    let search_res = await PaymentGet.getInvoice()
    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
}

  //GET SINGLE INVOICE
  static async update_single_invoice(req,res,next){
    let search_res = await PaymentGet.getInvoiceByID(req.body)
    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
}

 //SENDING INVOICE OUT
 static async send_invoice(req,res,next){

    let invoice = await PaymentGet.getInvoiceByID(req.body)

          let emailObject ={
                to:req.body.customer_email,
                subject:"Pament invoice",
                body:invoice.invoice_link
          }

          Email.Send(emailObject)

    let search_res = await PaymentSet.updateSentOut(req.body)

    Misc.appResponse(res,"200",statusCode=search_res.message,search_res.response,data= search_res.data);
}

   


    
}

module.exports = Analytics_middle

