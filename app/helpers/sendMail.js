const Nodemailer =  require("nodemailer");
var nodemailer = Nodemailer
const ejs = require("ejs")


/*  
var nodemailerTransport = nodemailer.createTransport({
  "host":"premium30.web-hosting.com",
"port":"465",
"secure": "true", 
  "auth":{
    "user":process.env.MAIL_USER_NAME,
    "pass":process.env.MAIL_USER_PASSWORD,
  }
  
})

  */
 
  var nodemailerTransport = nodemailer.createTransport({
    "service":"gmail",
    "auth":{
      "user":process.env.GMAIL_USER_NAME,
      "pass":process.env.GMAIL_USER_PASSWORD,
    }
  })



class Mail{
  
Send(mailObject,callback){
var mailcontent ={
from:process.env.MAIL_USER_NAME.toLowerCase(),
to:mailObject.to.toLowerCase(),
subject:mailObject.subject,
text:mailObject.body

} 
// console.log(mailcontent)
nodemailerTransport.sendMail(mailcontent,callback)


}

 async  buildHTML(path,data ={}){

  return new Promise((resolve,reject)=>{
    ejs.renderFile(`views/ ${path}.ejs`, data, async (err,html)=>{
      if (err) {
         console.log(err);
         reject(err);
        
      } else {
        resolve(html);
      }
    })

  })
}

}


module.exports = new Mail(); 