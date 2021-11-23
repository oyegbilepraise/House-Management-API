
const Payment = require('../../models/payments/payment');
const Property = require('../../models/properties/property');
const PropertyCategory = require('../../models/properties/PropertiesCategories');

const Vat = require('../../models/payments/vat');
const Invoice = require('../../models/payments/invoice');
const Email = require('../../helpers/sendMail');
const Validator = require('validatorjs');





class Analytics{

    static async InitatePaymenent(cookies_data,info){

        const propertyNames = Object.values(cookies_data);

           let {flw_ref,amount,currency}= info

        return new Promise((resolve, reject)=>{
            try {
                if (flw_ref) {

                    for (let index = 0; index < propertyNames.length; index++) {

                        Property.findOne({_id:propertyNames[index].id},(err,response)=>{

                            let unit_remain = response.unit - propertyNames[index].unit
                              
                            PropertyCategory.findOne({_id:response.categoryId},(err,result)=>{
                                
                              if (result.name == "rent") {

                                let update

                                if (unit_remain <=0) {

                                  update = { $set: {status:"rent"}};
                                }
                                else{

                                  update = { $set: {unit:unit_remain}};

                                }
                              
                              Property.updateOne({_id:response._id},update,(err,response)=>{
                                if(!err){
                                    resolve(response)
                                } 
                                else{
                                    resolve(err)
                    
                                }
                    
                            })
                              }



                              else if (result.name == "lease") {
                                let update

                                if (unit_remain <=0) {

                                  update = { $set: {status:"lease"}};
                                }
                                else{

                                  update = { $set: {unit:unit_remain}};

                                }
                              
                              Property.updateOne({_id:response._id},update,(err,response)=>{
                                if(!err){
                                    resolve(response)
                                } 
                                else{
                                    resolve(err)
                    
                                }
                    
                            })
                            }



                            else if (result.name == "buy") {
                                let update

                                if (unit_remain <=0) {

                                  update = { $set: {status:"buy"}};
                                }
                                else{

                                  update = { $set: {unit:unit_remain}};

                                }
                              
                              Property.updateOne({_id:response._id},update,(err,response)=>{
                                if(!err){
                                    resolve(response)
                                } 
                                else{
                                    resolve(err)
                    
                                }
                    
                            })
                            }

                            })
                            

                        })
    
    
                    }
                    
                }
               } catch (error) {
                   reject(error)           
               }

        })
    }









    static async ReturnProperty(info,cookies_data){

        const propertyNames = Object.values(cookies_data);

        return new Promise( async(resolve, reject)=>{
            try {
                if (info.status != 'success') {

                    for (let index = 0; index < propertyNames.length; index++) {

                        Property.findOne({_id:propertyNames[index].id}, async(err,response)=>{

                            let unit_remain = response.unit + propertyNames[index].unit

                          await  PropertyCategory.findOne({_id:response.categoryId},(err,result)=>{
                                
                              if (result.name == "rent") {

                                let update

                                if (unit_remain <=0) {

                                  update = { $set: {status:"active",}};
                                }
                                else{

                                  update = { $set: {unit:unit_remain}};

                                }
                              
                              Property.updateOne({_id:response._id},update,(err,response)=>{
                                if(!err){

                                 resolve({message:"PROPERTIES_ACTIVATED",response:"properties activated successfully",cookie:property,data:null})
 
                                } 
                                else{
                                    resolve(err)
                    
                                }
                    
                            })
                              }



                              else if (result.name == "lease") {
                                let update

                                if (unit_remain <=0) {

                                  update = { $set: {status:"active"}};
                                }
                                else{

                                  update = { $set: {unit:unit_remain}};

                                }
                              
                              Property.updateOne({_id:response._id},update,(err,response)=>{
                                if(!err){

                                    resolve({message:"PROPERTIES_ACTIVATED",response:"properties activated successfully",cookie:property,data:null})

                                } 
                                else{
                                    resolve(err)
                    
                                }
                    
                            })
                            }



                            else if (result.name == "buy") {
                                let update

                                if (unit_remain <=0) {

                                  update = { $set: {status:"active"}};
                                }
                                else{

                                  update = { $set: {unit:unit_remain}};

                                }
                              
                              Property.updateOne({_id:response._id},update,(err,response)=>{
                                if(!err){

                                    resolve({message:"PROPERTIES_ACTIVATED",response:"properties activated successfully",cookie:property,data:null})

                                } 
                                else{
                                    resolve(err)
                    
                                }
                    
                            })
                            }

                            })
                            

                        })
    
    
                    }
                    
                }
                else{
                   
                   let data = []
                   let total = 0
                   let vat = 0
                    for (let index = 0; index < propertyNames.length; index++) {

                      await  Property.findOne({_id: propertyNames[index].id},async (err,response)=>{
                          data.push({
                               name: response.name,
                               unit: propertyNames[index].unit,
                               price: info.currency == "USD" ?"$" :"₦" + response.data["cost_"+info.currency],
                               amount: info.currency == "USD" ?"$" :"₦" + response.data["cost_"+info.currency] * propertyNames[index].unit
                           })
                           total =  parseInt(total) + parseInt(response.data["cost_"+info.currency])*propertyNames[index].unit
                        })
                    }

                     await Vat.find({}, async (err,responses)=>{

                      vat = responses[0].amount + "%"
                      total = info.currency == "USD" ?"$" :"₦" + Math.ceil( parseInt(total) + parseInt( responses[0].amount)/ 100) * 100 
                    })

                  let html = await Email.buildHTML("invoice",{data:data,total:total})

                  Email.Send({to:info.email,subjesct:"Invoice",body:"Payment invoice",html:html},(err,sent)=>{
                   if (err) {
                    resolve({message:"FAILED_TO_SEND_INVOICE",response:"failed to send invoice",data:null})
                       
                   } else {
                    resolve({message:"INVOICE_SENT_SUCCESSFULLY",response:"invoice sent successfully",data:null})
                       
                   }
                   })
                }

               } catch (error) {
                   console.log(error)
                   reject(error) 
                          
               }

        })
    }




    static async paymentCharged(info){

        let {id,flw_ref,status}= info

     return new Promise((resolve, reject)=>{

        try {

            let update = { $set: {transaction_id:id,status:status}};
            Payment.updateOne({flw_ref},update,(err,response)=>{
            if(!err){
                resolve(response)
            } 
            else{
                resolve(err)

            }

        })

        } catch (error) {
            reject(error)           
        }

     })

 }

    static async addToCart(info,cookies_data){

        let {_id} = info;
        const propertyNames = Object.values(cookies_data);

        return new Promise((resolve, reject)=>{
            try {

                var cartCredentials = {
                    "_id": "required",
                }
                
                var validator = new Validator(info, cartCredentials);



                validator.passes(() => {
                    let property = {id : _id,unit:1}

                    resolve({message:"ADD_TO_CART_SUCCESSFUL",response:"Property added successfully",cookie:property,data:null})
    
            })
            
            
            validator.fails(() => {
                var errors = validator.errors.all();
                resolve({message:"INVALID_DATA",response:errors,data:null})
                
              });

         

            } catch (error) {

                reject({message:"ADD_TO_CART_FAILED",response:"failed to add property",data:null})           
                         
            }

        })
    }



    static async deleteFromCart(info,cookies_data){

        let {_id} = info;

        return new Promise((resolve, reject)=>{
            try {

                resolve({message:"REMOVED_FROM_CART_SUCCESSFUL",response:"Property added successfully",cookie:_id,data:null})


            } catch (error) {

                reject({message:"REMOVED_FROM_CART_FAILD",response:"failed to add property",data:null})           
                         
            }

        })
    }



    static async increaseCartUnit(info,cookies_data){

        let {_id} = info;
        const propertyNames = Object.values(cookies_data);
        
        return new Promise((resolve, reject)=>{
            try {
                
                let property
                
                let update_id = propertyNames.find(element=>{
                    return element.id == _id
                })
                
                if (update_id) {
                    
                    property = {id : _id,unit:parseInt(update_id.unit) + parseInt(1)}
                    
                    
                    resolve({message:"CART_UNIT_ADDED_SUCCESSFUL",response:"unit added successfully",cookie:property,data:null})
                    
                } else {

                    resolve({message:"INVALID_PROPERTY_ID",response:"Invalid property ID",cookie:property,data:null})
                    
                }

            } catch (error) {

                reject({message:"CART_UNIT_ADDED_FAILED",response:"failed to add to cart unit",data:null})           
                         
            }

        })
    }


    static async decreaseCartUnit(info,cookies_data){

        let {_id} = info;
        const propertyNames = Object.values(cookies_data);

        return new Promise((resolve, reject)=>{
            try {

                let property

               let update_id = propertyNames.find(element=>{
                    return element.id == _id
                })

                if (update_id) {

                    property = {id : _id,unit:update_id.unit - 1}
                    
                    resolve({message:"CART_UNIT_REDUSED_SUCCESSFUL",response:"unit added successfully",cookie:property,data:null})
                    
                } else {

                    resolve({message:"INVALID_PROPERTY_ID",response:"Invalid property ID",cookie:property,data:null})
                    
                }

            } catch (error) {

                reject({message:"CART_UNIT_REDUCE_FAILED",response:"failed to add to cart unit",data:null})           
                         
            }

        })
    }



    
    static async createVat(info){

        let {amount,description} = info;

        return new Promise((resolve, reject)=>{
            try {

                  
                var vatCredentials = {
                    "amount": "required",
                    "description": "required",

                }
                
                var validator = new Validator(info, vatCredentials);



                validator.passes(() => {
                    let result = new  Vat({created_by:process.env.ADMIN_EMAIL,amount,description})
    
                    result.save((err,response)=>{
                        if(!err){
                            resolve({message:"CREATE_VAT_SUCCESSFUL",response:"Vat created successfully",data:null})             
                
                        }
                    });
            })
            
            
            validator.fails(() => {
                var errors = validator.errors.all();
                resolve({message:"INVALID_DATA",response:errors,data:null})
                
              });
                
             
            } catch (error) {
                reject({message:"CREATE_VAT_FAILED",response:"Vat creation failed",data:null})           
            }

        })
    }


    static async updateVat(info){

        let {amount,description,status,_id} = info;

        return new Promise((resolve, reject)=>{
            try {
                let update = { $set: {amount:amount,description:description,status:status,updated_by:process.env.ADMIN_EMAIL}};
                Vat.updateOne({_id:_id},update,(err,response)=>{
                    if(!err){
                    console.log(update);
                    resolve({message:"VAT_UPDATED_SUCCESSFUL",response:"Vat update successfully",data:null})
                } else{
                    resolve({message:"VAT_UPDATED_FAILED",response:"Vat update failed",data:null})
                }

            })

            } catch (error) {
                reject({message:"VAT_UPDATED_FAILED",response:"Vat update failed",data:null})           
            }

        })
    }




    static async getInvoiceID(){


        return new Promise((resolve, reject)=>{
            try {

              Invoice.find().sort({identity:-1}).limit(1)
                .then(response=>{
                            let identity

                            if(response.length<=0) {
                                identity = "001"
                            }
                            else{
                               let info= parseInt(response[0].identity) + parseInt(1)
                               if (info < 10) {
                                    identity = "00"+info
                               }
                              else if (info < 100 && info >=10) {
                                identity = "0"+info
                           }
                           else{
                               identity = info
                           }
                            }
                             let result = new  Invoice({identity: identity,created_by:process.env.ADMIN_EMAIL})
                            result.save((err,responses)=>{
                                if(!err){
                                    resolve({message:"GENERATE_INVOICE_ID_SUCCESSFUL",response:"Invoice ID generted",data:identity})             
                        
                                }
                            });

                }) 
                .catch(err =>{
                    reject({message:"GET_IDENTITY_FAILED",response:"Error occure while geting the invoice ID please try again",data:null}) 

                });

            
            } catch (error) {
                reject({message:"GENERATE_INVOICE_ID_FAILED",response:"generation invoice ID failed",data:null})           
            }

        })
    }


    

    static async saveInvoiceLink(info){

        let {identity,invoice_link,} = info;
        console.log(info);

        return new Promise((resolve, reject)=>{
            try {
                let update = { $set: {invoice_link:invoice_link,updated_by:process.env.ADMIN_EMAIL,updatedAt:Date.now()}};
                Invoice.updateOne({identity:identity},update,(err,response)=>{
                    if(!err){
                    resolve({message:"PDF_SAVED_SUCCESSFUL",response:"Pdf saved successfully",data:null})
                } else{
                    resolve({message:"PDF_SAVE_FAILED",response:"Pdf save failed",data:null})
                }

            })

            } catch (error) {
                reject({message:"PDF_SAVE_FAILED",response:"Pdf save failed",data:null})           
            }

        })
    }


    static async updateSentOut(info){

        let {id,customer_email,} = info;

        return new Promise((resolve, reject)=>{
            try {
                let update = { $set: {status:"sent out",send_by:process.env.ADMIN_EMAIL,sendAt:Date.now()}};
                Invoice.updateOne({identity:id},update,(err,response)=>{
                    if(!err){
                    resolve({message:"INVOICE_SEND_SUCCESSFUL",response:"invoice send  successfully",data:null})
                } else{
                    resolve({message:"INVOICE_SENDING_FAILED",response:"sending invoice failed",data:null})
                }

            })

            } catch (error) {
                reject({message:"INVOICE_SENDING_FAILED",response:"sending invoice failed",data:null})           
            }

        })
    }

}

module.exports = Analytics