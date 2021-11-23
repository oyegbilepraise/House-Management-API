const Promotion = require('../../models/payments/payment');
const Property = require('../../models/properties/property')
const PropertyType = require('../../models/properties/PropertiesTypes')
const Payment = require('../../models/payments/payment');
const Vat = require('../../models/payments/vat')
const Invoice = require('../../models/payments/invoice')



class Analytics{

    static async getCart(cookies_data){

        const propertyNames = Object.values(cookies_data);

                    let Total_cost_NGN = 0;
                    let Total_cost_USD =  0;

        return new Promise( async(resolve, reject)=>{
            try {
                
                if (propertyNames.length>0) {

                for (let index = 0; index < propertyNames.length; index++) {

                var filter = "name _id createdAt categoryId typeId  suspended data";

                var query ={_id:propertyNames[index].id}

                await Property.findOne( query, filter, {populate:"typeId categoryId"},(err,res)=>{
                   

                     propertyNames[index]["property"] =  {
                        name:res.name,
                        suspended:res.suspended,
                        createdAt:res.createdAt,
                        data:res.data,
                        typeName:res.typeId[0].name,
                        categoryName:res.categoryId[0].name
                   }
                    Total_cost_NGN = parseInt(Total_cost_NGN) + parseInt(res.data.cost_NGN) * propertyNames[index].unit;
                    Total_cost_USD = parseInt(Total_cost_USD) + parseInt(res.data.cost_USD) * propertyNames[index].unit;
                 
                })
                    
                    }

                    let answer = {
                         data:propertyNames,
                         Total_cost_NGN:Total_cost_NGN,
                         Total_cost_USD:Total_cost_USD
                    }

                    console.log(answer);

                    
                 resolve({message:"CART_GET_SUCCESSFUL",response:"cart property(s) fetched",data:answer})

          } else {
            resolve({message:"NO_CART_FOUND",response:"No property available in your cart",data:null})
              
          }
    } catch (error) {
        reject({message:"CART_GET_FAILED",response:"error occured please try again",data:null})           
    }

        })
    }



    static async getVat(){

        return new Promise( async(resolve, reject)=>{
            try {
                var filter = {created_by:0,updated_by:0}
                
                await Vat.find({},filter,(err,response)=>{

                        if (!err && response.length>0) {
                            
                       resolve({message:"VAT_GET_SUCCESSFUL",response:"Vat fetched",data:response})
                        } else {

                      resolve({message:"NO_VAT_FOUND",response:"No vat available",data:response})

                            
                        }
                     })
                } catch (error) {
                    reject({message:"CART_VAT_FAILED",response:"error occured please try again",data:null})           
                }

                    })
                }



                static async getInvoice(){

                    return new Promise( async(resolve, reject)=>{
                        try {

                            await Invoice.find({},(err,response)=>{
            
                                    if (!err && response.length>0) {
                                        
                                   resolve({message:"INVOICES_GET_SUCCESSFUL",response:"Invoices fetched",data:response})
                                    } else {
            
                                  resolve({message:"NO_INVOICES_FOUND",response:"No invoices available",data:response})
            
                                        
                                    }
                                 })
                            } catch (error) {
                                reject({message:"GET_INVOICES_FAILED",response:"error occured please try again",data:null})           
                            }
            
                                })
                            }


                            static async getInvoiceByID(info){

                                return new Promise( async(resolve, reject)=>{
                                    try {
                                        let {id} = info
                                        
                                        await Invoice.findOne({identity:id},(err,response)=>{

                                                if (response) {
                                                    
                                               resolve({message:"INVOICE_GET_SUCCESSFUL",response:"Invoice fetched",data:response})
                                                } else {
                        
                                              resolve({message:"NO_INVOICE_FOUND",response:"No invoice available",data:response})
                        
                                                    
                                                }
                                             })
                                        } catch (error) {
                                            reject({message:"GET_INVOICE_FAILED",response:"error occured please try again",data:null})           
                                        }
                        
                                            })
                                        }




}

module.exports = Analytics