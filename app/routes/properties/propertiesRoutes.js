 var PropertiesMiddleWaresClass = require("../../middlewares/properties/propertiesMiddleware");
var AdminAuthHelper = require("../../helpers/adminAuth");

var Router =  require('express'); 
 

const baseRoute = Router()

const PropertiesRoute = Router()
  //admin
PropertiesRoute.post('/admin/create',AdminAuthHelper.Login, PropertiesMiddleWaresClass.create);
PropertiesRoute.get('/admin/get/all',AdminAuthHelper.Login, PropertiesMiddleWaresClass.get_all_admin); 
PropertiesRoute.get('/admin/get/name',AdminAuthHelper.Login, PropertiesMiddleWaresClass.get_by_name_admin);
PropertiesRoute.get('/admin/get/id',AdminAuthHelper.Login, PropertiesMiddleWaresClass.get_by_id_admin);
PropertiesRoute.get('/admin/get/category',AdminAuthHelper.Login, PropertiesMiddleWaresClass.get_by_cat_admin);
PropertiesRoute.get('/admin/get/types',AdminAuthHelper.Login, PropertiesMiddleWaresClass.get_by_types_admin);
PropertiesRoute.patch('/admin/update',AdminAuthHelper.Login, PropertiesMiddleWaresClass.updateProperty);
PropertiesRoute.delete('/admin/delete',AdminAuthHelper.Login, PropertiesMiddleWaresClass.deleteProperty);
PropertiesRoute.delete('/admin/delete/category',AdminAuthHelper.Login, PropertiesMiddleWaresClass.deletePropertyByCategory);



//users
PropertiesRoute.get('/users/get/all', PropertiesMiddleWaresClass.get_all_users);
 
PropertiesRoute.get('/users/get/category',PropertiesMiddleWaresClass.get_by_cat_users);
PropertiesRoute.get('/users/get/types',PropertiesMiddleWaresClass.get_by_types_users);
PropertiesRoute.get('/users/get/name',PropertiesMiddleWaresClass.get_by_name_users);
PropertiesRoute.get('/users/get/id',PropertiesMiddleWaresClass.get_by_id_users);
 
baseRoute.use('/properties',PropertiesRoute);


module.exports = baseRoute