 var PropertyCategoriesMiddleWaresClass = require("../../middlewares/properties/propertyCategoryMiddleware");
var AdminAuthHelper = require("../../helpers/adminAuth");

var Router =  require('express'); 
 

const baseRoute = Router()

const adminRoute = Router()
  
adminRoute.post('/login',AdminAuthHelper.SignIn, PropertyCategoriesMiddleWaresClass.create);
 
 
baseRoute.use('/admin',adminRoute);


module.exports = baseRoute