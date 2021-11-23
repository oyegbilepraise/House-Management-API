 var PropertiesSearchMiddleWaresClass = require("../../middlewares/properties/search");
 var AdminAuthHelper = require("../../helpers/adminAuth");


var Router =  require('express'); 
 

const baseRoute = Router()

const PropertiesSearchRoute = Router()
  //admin
PropertiesSearchRoute.post('/search', PropertiesSearchMiddleWaresClass); 
PropertiesSearchRoute.post('/admin/search',AdminAuthHelper.Login, PropertiesSearchMiddleWaresClass); 
 
baseRoute.use('/properties',PropertiesSearchRoute);


module.exports = baseRoute