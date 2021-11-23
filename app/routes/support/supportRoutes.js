 var PropertiesSupportMiddleWaresClass = require("../../middlewares/support/supportMiddleware");
var AdminAuthHelper = require("../../helpers/adminAuth");

var Router =  require('express'); 
 

const baseRoute = Router()

const SupporttRoute = Router()
  //admin
SupporttRoute.post('/create', PropertiesSupportMiddleWaresClass.create);
SupporttRoute.get('/get',AdminAuthHelper.Login, PropertiesSupportMiddleWaresClass.get_all_admin); 

SupporttRoute.get('/read',AdminAuthHelper.Login, PropertiesSupportMiddleWaresClass.markRead); 
 
baseRoute.use('/support',SupporttRoute);


module.exports = baseRoute