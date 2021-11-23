"use strict"

const Express= require('express');

const bodyParser =  require('body-parser');
const  Cors =  require('cors');
 
const GlobalErrorHandler =  require('./helpers/globalErrorHandler');
const Misc =  require('./helpers/misc');
var cookieParser = require('cookie-parser');

 
const app = Express()
let statusCode;
let data

const RequestIp = require('@supercharge/request-ip')
// this is used to retrieve the req ip address
 
 
//middlewares
const propertyCategory = require("./routes/properties/propertyCategoryRoutes");
const propertyTypes = require("./routes/properties/propertyTypesRoutes");
const properties = require("./routes/properties/propertiesRoutes");
const AdminAuthRoute = require("./routes/admin/adminAuth");
const analytics = require('./routes/analytics/analitics')
const payment = require('./routes/payments/payment')
const promotion = require('./routes/promotion/promotion')

 const propertyRequest = require("./routes/properties/request");
 const propertySearch = require("./routes/properties/search");
 const Support = require("./routes/support/supportRoutes");

app.use(bodyParser.json())   
app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: false}))

//allowing CORS
// app.use(Cors());

//COOKIES
app.use(cookieParser());
 
app.set('view engine', 'ejs');
 
//allowing CORS 

app.use(Cors({
  origin:["http://localhost:3000", "http://localhost:4200","localhost:3000"],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
  "maxAge":1000,
  "credentials":true,
  "allowedHeaders":"Access-Control-Allow-Headers, Content-Type,Authorization,content-type, X-Requested-With,token,Set-Cookie"
}));
// app.use((req, res, next) => {credentials
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//     res.setHeader('Access-Control-Allow-Credentials', true)
  
//     next()
//   })

//COOKIES
app.use(cookieParser());
 
 var baseMiddleWare =  function(req, res, next){
	// extract ip from req 
    var ip = RequestIp.getClientIp(req)
      // console.log(req.body); 
if(req.method.toLowerCase()!="post"){
req.body ={...req.body,...req.query}

}
 
if(req.hasOwnProperty("body")){ 

//  save ip in req.body if not set in req
    if(ip && !req.body.ip_address){
		
		
        req.body.ip_address = ip;
    }
	
   
            if(req.body.hasOwnProperty("email")){
                
                req.body.email = req.body.email.toString().toLowerCase()
               
            }
    
        }
        else{
   // console.log("no req.body")
    
            req.body = {}
        }
        // console.log("12345")
         next()


 
}
  
 app.use( baseMiddleWare);
	 
	 
	 
 app.use(function(req,res,next){
	 
	 
	 console.log("Request sent from: ",req.body.ip_address)
	 next();
	 
 })
  
 

app.use("/api",Support);
app.use("/api",propertySearch);
 
app.use("/api",payment)

app.use("/api",propertyCategory);
app.use("/api",propertyRequest);
app.use("/api",propertyTypes);
app.use("/api",properties);
app.use("/api",AdminAuthRoute);
app.use("/api",analytics);
app.use("/api",promotion);


  
/* 
app.use("/",(req,res,next)=>{

var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
var data = {requestedurl:fullURL};

Misc.appResponse(res,"200",statusCode="success","Welcome",data= data);
Misc.appResponse(res,"200","success","Welcome",data);

})

 */
app.use("*",(req,res,next)=>{

var fullURL = req.protocol+"://"+req.get("host")+req.originalUrl;
var message =  {requestedurl:fullURL};

Misc.appResponse(res,"404",statusCode="PAGE_NOT_FOUND","The page you were looking for does not exist. ",data= [message]);
})


//Handling errors 
app.use(GlobalErrorHandler)


app.use((error, req, res, next) => {
    //console.log(error);
    var mystatus = error.statusCode || 500;
    var message = error.message;



Misc.appResponse(res,mystatus,statusCode="error",message,data=[]);

    /* 
	res.status(mystatus).json({
        message: message,
        status: mystatus,
		statusCode:"error",
		
		data:[]
    }); */
	
	
	
});




// process.on('uncaughtException', function (err) {
//     console.log('**************************');
//     console.log('* [process.on(uncaughtException)]: err:', err);
//     console.log('**************************');
//   });

 /*  app.use("*",(req,res,next)=>{
    res.status(200).json({message:"welcome"})
    
    }) */
    
module.exports =  app;
