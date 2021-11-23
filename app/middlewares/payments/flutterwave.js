
const Validator = require("validatorjs");
const flutterwave = require("../../helpers/FlutterWave")
const ApiKey = require("../../helpers/keys")
const PaymentSet = require("../../controllers/Payments/paymentSetController")


const Misc =  require('../../helpers/misc');
let statusCode;
let data;



class FlutterWaveMiddleWare {

    static async initiatepay(req, res, next){
        
    try {
    
         var userCredentials = {
            "card_number": "required|numeric",
            "cvv": "required",
            "expiry_month": "required",
            "expiry_year": "required",
           
            "amount": "required",
            "redirect_url": "required",
            "fullname": "required",
            "cardemail": "required",
            "phone_number": "required"
             
        }
    req.body["enckey"]= process.env.FLUTTER_SALT
    req.body["email"] = req.body["cardemail"]
    req.body["currency"] = "NGN"
    req.body["tx_ref"] = ApiKey.encrypt(ApiKey.generate(req.body.email+ Date.now()))

     
        var validator = new Validator(req.body, userCredentials);
        
        
        validator.passes(() => {
            
            // console.log(req.body);
            
        flutterwave.intiatePayment(req.body)
        .then(initiated=>{
            // res.status(200).json({message:initiated})
            Misc.appResponse(res,"200",statusCode="success",initiated.message,data= initiated.authorization);

        })
        
        .catch(err=>{
            console.log(err);
            Misc.appResponse(res,"400",statusCode="faild","failed",data= err);
        
        
        })
        
    
    
    })
    
    
    validator.fails(() => {
        var errors = validator.errors.all();
        Misc.appResponse(res,"400",statusCode="INVALID DATA","error",data= errors);
        
      });
    
    
    
    
    } catch (error) {
        Misc.appResponse(res,"404",statusCode="ERROR","Not Found",data= error);

        // Misc.appError(error,next)
    }
    
    
    }
    
    
    
    static async chargeCard(req, res, next){
        try {
            
             var userCredentials = {
                "card_number": "required|numeric",
                "cvv": "required",
                "expiry_month": "required",
                "expiry_year": "required",
               
                "amount": "required",
                "redirect_url": "required",
                "fullname": "required",
                "cardemail": "required",
                "phone_number": "required"
                 
            }
        req.body["enckey"]= process.env.FLUTTER_SALT
        req.body["email"] = req.body["cardemail"]
        req.body["currency"] = "NGN" 
        req.body["tx_ref"] = ApiKey.encrypt(ApiKey.generate(req.body.email+ Date.now()))

         
            var validator = new Validator(req.body, userCredentials);
            

            validator.passes(() => {
        
        
                flutterwave.chargeCard(req.body)
                
                // console.log(initiated)
                .then(initiated=>{
                   // MyWallet.creditWallet(amount,user_id,creditObject)
                    // res.status(200).json({message:initiated})
                    let initateData ={flw_ref:initiated.flw_ref,amount:req.body.amount,currency:req.body.currency}
                    PaymentSet.InitatePaymenent(req.cookies,initateData)
                Misc.appResponse(res,"200",statusCode="PAYMENT_INITIATE_SUCCESSFUL","sucess",data= initiated);

    
                })
                
                .catch(err=>{
                // Misc.appError(err,next)
                Misc.appResponse(res,"400",statusCode="PAYMENT_INITIATE_FAILED","failed",data= err);
    
                
                })
                
            })
            
        
        validator.fails(() => {
            var errors = validator.errors.all();
            Misc.appResponse(res,"400",statusCode="INVALID_DATA","error",data= errors);
 
          });
        
        
        
        
        } catch (error) {
            // Misc.appError(error,next)
        Misc.appResponse(res,"404",statusCode="PAYMENT_INITIATE_FAILED","Not Found",data= error);


        }
    }
        

        

        
        
    
    static async confirmOtp(req, res, next){
        try {
            
             var userCredentials = {
                "flw_ref": "required",
                "otp": "required"
                 
            }
         
         
            var validator = new Validator(req.body, userCredentials);
            
        validator.passes(() => {     

            flutterwave.validate(req.body)
            .then(initiated=>{
                if (initiated.message.status != "error") {
                    let initateData ={flw_ref:initiated.message.data.flw_ref,  id:initiated.message.data.id,  status:initiated.message.data.status}
                     PaymentSet.paymentCharged(req.cookies,initiated)

                }
               
            Misc.appResponse(res,"200",statusCode= initiated.message.status =="error" ?"PAYMENT_FAILED" :"PAYMENT_SUCCESSFUL",initiated.message.message,data= initiated.message.data);
            })
            
            .catch(err=>{
                Misc.appResponse(res,"400",statusCode="PAYMENT_FAILED","error",data= err);            

            
            })
            
    })
        
        
        
        validator.fails(() => {
            var errors = validator.errors.all();

            Misc.appResponse(res,"400",statusCode="INVALID_DATA","error",data= errors);

          });
        
        
        }
         catch (error) {
            
            Misc.appResponse(res,"500",statusCode="PAYMENT_FAILED","error",data= error);            


        }
        }



        static async verifyTrans(req, res, next){
            try {
                
            
                flutterwave.verifyTransaction(req.body)
                .then(initiated=>{

   
                Misc.appResponse(res,"200",statusCode = initiated.status=="error" ?"TRANSACTION_VERIFY_FAILED" :"TRANSACTION_VERIFY_FETCHED",initiated.message,data= initiated.data);
                })
                
                .catch(err=>{
                    Misc.appResponse(res,"400",statusCode="TRANSACTION_VERIFY_FAILED","error",data= err);  
 
                })
            
            } catch (error) {

                Misc.appResponse(res,"500",statusCode="TRANSACTION_VERIFY_FAILED","error",data= error);            

    
            }
            
            
            }


            static async getTransaction(req, res, next){
                try {
                    
                
                    flutterwave.gettransaction(req.body)
                    .then(initiated=>{
                    Misc.appResponse(res,"200",statusCode="TRANSACTIONS_FETCHED","sucess",data= initiated.data);
                    })
                    
                    .catch(err=>{
                        Misc.appResponse(res,"400",statusCode="TRANSACTION_FETCH_FAILED","error",data= err);            
                    
                    })
                
                } catch (error) {
                    
                    Misc.appResponse(res,"500",statusCode="TRANSACTION_FETCH_FAILED","error",data= error);            
        
                }
                
                
                }
        
        
    
    }
    module.exports = FlutterWaveMiddleWare