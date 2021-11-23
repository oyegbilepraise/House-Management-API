const Flutter = require('flutterwave-node-v3');
const open = require('open');
const Validator = require('validatorjs');
const Misc =  require('../helpers/misc')


const flw = new Flutter(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

class Flutterwave {
    
    static async intiatePayment(payload){

        return new Promise( async (resolve, reject)=>
        {
            
            try{
                
                const response =  await flw.Charge.card(payload)
                // var response = await flw.Charge.card(payload)
              console.log(response);
            if (response.meta.authorization.mode === 'pin') {

             resolve({authorization:response.meta.authorization,message:response.message})
         
            }
            else if (response.meta.authorization.mode === 'avs_noauth') {

                resolve({authorization:response.meta.authorization,message:response.message})
            
               }
            else if (response.meta.authorization.mode === 'redirect') {
    
                var url = response.meta.authorization.redirect
                resolve({authorization:"redirect",url:url,message:response.message} )
    
            }else{
                reject(new Error("card not accepted, unknown mode of authorization"))
            }
        
        
        
        }catch(err){

           console.log(err);
           
        }
        
    
    })
    
    
    }
    
     
    static async chargeCard(payload){
        
        return new Promise(async (resolve, reject)=>
        {
            
            
            try{
                const response =  await flw.Charge.card(payload)

                if(response.status == 'success'){
                      
                    var payload2  = payload
                    if ((response.meta.authorization.mode === 'pin')) {
                        payload2.authorization = {
                            "mode": "pin",
                            "fields": [
                                "pin"
                            ],
                            "pin": payload.pin
                        }
                        
                    }
                    else if(response.meta.authorization.mode === "avs_noauth"){

                        payload2.authorization = {
                            "mode": "avs_noauth",
                            "fields": [
                                "city",
                                "address",
                                "state",
                                "country",
                                "zipcode"
                            ],
                            "city": payload.city,
                            "address": payload.address,
                            "state": payload.state,
                            "country": payload.country,
                            "zipcode": payload.zip
                        }
                        
                    }
                    
                    const reCallCharge = await flw.Charge.card(payload2)

                    resolve({flw_ref:reCallCharge.data.flw_ref, message:reCallCharge.data.processor_response})

            
            // resolve({response:response,reCallCharge:reCallCharge})
            return;
            
            
        }else{
            reject({flw_ref:null, message:response.message})
        }
       
    }catch(err){
    console.log(err);
    }
            
        
        })
        
        
        }
        
    


    
        static async validate(transaction){
            return new Promise( async (resolve, reject)=>{
               try {
                const callValidate = await flw.Charge.validate({
                    "otp": transaction.otp,
                    "flw_ref": transaction.flw_ref
                })
        
                resolve({message:callValidate})

                        } catch (error) {
                            reject(error)  
                        }
                
                        })
                        
        }



    
        static async verifyTransaction(transaction_id, next){
           
            return new Promise( async(resolve, reject)=>{
            
                try {
                    const payload = transaction_id
                    const response = await flw.Transaction.verify(payload)
                    resolve(response) 
            
                } catch (error) {
                    reject(error)
            
            }
            
            })
    
        }
    


        static async getBanks(country, next){
                
            return new Promise( async (resolve, reject)=>{
            
                try {
                    const payload = {
                        
                        "country":country //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
                    }
                    const response = await flw.Bank.country(payload)
                    resolve(response)
                } catch (error) {
                    reject(error)
                }
            
            
            
            })
    
        }

        static async gettransaction(payload){
                
            return new Promise( async (resolve, reject)=>{
            
                try {
                    // const payload = {
                    //     from: "2020-01-01",
                    //      to: "2020-05-05"
                    //   }
                    // console.log(payload);
                    const response = await flw.Transaction.fetch()

                    resolve(response)
                } catch (error) {
                    reject(error)
                }
            
            })
    
        }
    
    
    
    
    
    
    }
    
     module.exports = Flutterwave
