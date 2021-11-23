 var PropertiesRequestMiddleWaresClass = require("../../middlewares/properties/request");
var AdminAuthHelper = require("../../helpers/adminAuth");

var Router =  require('express'); 
 

const baseRoute = Router()

const PropertiesRequestRoute = Router()
  //admin
PropertiesRequestRoute.post('/create', PropertiesRequestMiddleWaresClass.create);
PropertiesRequestRoute.get('/get',AdminAuthHelper.Login, PropertiesRequestMiddleWaresClass.get_all_admin); 

PropertiesRequestRoute.get('/available',AdminAuthHelper.Login, PropertiesRequestMiddleWaresClass.makeAvailable); 
 
baseRoute.use('/properties/request',PropertiesRequestRoute);


module.exports = baseRoute