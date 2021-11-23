const generalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.status = err.status ? err.status :  'error';
    
    if(err.name && err.name == "MongoError"){
        //duplicate errors
        if(err.code && err.code == 11000){
            err.message = `${Object.keys(err.keyPattern)[0]} already exists`
        }else{
            
            err.message =" Error Found."

        }
    }

    
console.log(err.stack)
/* next(err.message); */
next("Error found, try again");
    //return res.status(err.statusCode).json({status: err.status, message: err.message})
}  

 module.exports = generalErrorHandler;