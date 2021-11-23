 
const  mongoose = require('mongoose');
const  ActivityLog = require('../models/log/activitylogs');
 
class Connection {
    static connect(connection_config, app=null){
        return mongoose.connect( connection_config.database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        }).then( connection => {
            //console.log(connection)
            if(app){
				
                app.listen(connection_config.port, () => {
                    console.log('<<<<<=======Server running at ' + connection_config.port+'======>>>>>>');
					console.log('<<<<<<<<<=======Database Connection Initiated =======================>>>>>>>>>>>>>>>>');
          
		  new ActivityLog({message:" Server started "})
		   .save(
		   
		   function (err) {
  if (err) {
	  
   throw new Error("connection failed, please try again");
  console.log('<<<<<<<<<=======Database Connection failed - '+err+'=======================>>>>>>>>>>>>>>>>');
  return false;
  }
  else{
	  console.log('<<<<<<<<<=======Database Connected Successfully=======================>>>>>>>>>>>>>>>>');
	  return true;
  }
  
		   }
		   
		   )
		    
		   
                });
            }
			else{
                console.log('<<<<<<<<<======= Server start failed=======================>>>>>>>>>>>>>>>>')
            }
        }).catch( err => {
          console.log(err); 
		  throw new Error("connection failed");
        })
    }

    static disconnect(){
        return mongoose.disconnect()
    }

}


module.exports = Connection