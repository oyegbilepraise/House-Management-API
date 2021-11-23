const   bcrypt =  require('bcryptjs');
const hashSync  = bcrypt.hashSync;
const compareSync  = bcrypt.compareSync;

 const jwt = require ('jsonwebtoken')
 const sign = jwt.sign;
 
const Randomatic =  require('randomatic');


const crypt = require('crypto');

const randomBytes = crypt.randomBytes;

const LogError  =  require('./logError');

const path = require("path");
const resolve = path.resolve;

/* 
*/ 

class Misc {
    static  hashPassword(password){
        const hashedPwd =  hashSync(password, 10);
        return hashedPwd; 
    }

static roundNumber(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

    static decodePwd(reqPassword, dbPassword){
        
        const compare = compareSync(reqPassword, dbPassword);
        return compare;
    }

    static appResponse (res,res_status="200",statusCode="success",message="",data=[]){
		
		if(res.hasOwnProperty("resObj")){
			 
			 
res.status(res.resObj.status).json(res.resObj);
			 
			 
		}
else{
	
res.status(res_status).json({
	statusCode,data,message
	
});
}		
		
		
	}
	
	
	
    static appError (err, next){
       // console.log("error name: ",err.name)

        if(err.name==" MongooseServerSelectionError"){
            LogError(err.message);
            err.message = "Db Connection Failed. "
        } 



        if(err.name && err.name == "MongoError"){
            //duplicate errors
            if(err.code && err.code == 11000){
                err.message = `${Object.keys(err.keyPattern)[0]} already exists`
            }
        }
    
        if(err.response && err.response.data.code == 'BX0003'){
            err.message = err.response.data.errors
        }

        if (!err.statusCode) {
            err.statusCode = 400;
        }
        next(err);
    }

    static generateToken(user_token_data, expiry){
        return sign({
            email:user_token_data.email,
            userId: user_token_data.id
        }, process.env.SECRET_JWT,  { expiresIn: expiry })
    }

    static async generateOtp(){
        return Randomatic('A0',6)
     }

    static async unique_str(type, length){
        return await   (type, length)
    }

    static randomStr(){
        return randomBytes(5).toString('hex');
    }

 
static reverseString(str) {
    str = str.toString();
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}
 
static isUrl(t){
    var expression = /^(http:|https:)\/\/[\w\W]+\.\w+$/;
    var regex = new RegExp(expression);
     
    
    if (t.match(regex)) {
      return true;
    } else {
      return false;
    }
    

}

static cleanContacts(str){
    return new Promise((resolve, reject)=>{

try{

    str = str.replace(/,(\s+)?$/, '');
    str = str.split(",");
    str = [...new Set(str)];
    delete str[indexOf("")] 
    delete str[indexOf(" ")] 
    resolve(str.toString());


}catch(err){

reject(new Error("Error found, please try again"));

}


    })




}



}


module.exports =  Misc;
