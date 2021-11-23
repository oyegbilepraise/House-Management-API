 var PropertyTypesMiddleWaresClass = require("../../middlewares/properties/propertyTypesMiddleware");
var AdminAuthHelper = require("../../helpers/adminAuth");

var Router =  require('express'); 
 

const baseRoute = Router()

const TypesRoute = Router()
  //admin
TypesRoute.post('/admin/create',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.create);
TypesRoute.get('/admin/get/all',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.get_all_admin); 
TypesRoute.get('/admin/get/id',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.get_by_id_admin);
TypesRoute.get('/admin/get/name',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.get_by_name_admin);
TypesRoute.get('/admin/get/category',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.get_by_cat_admin);
TypesRoute.patch('/admin/update',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.updateType);
//TypesRoute.delete('/admin/delete',AdminAuthHelper.Login, PropertyTypesMiddleWaresClass.deleteType);


//users
TypesRoute.get('/users/get/id', PropertyTypesMiddleWaresClass.get_by_id);


TypesRoute.get('/users/get/all', PropertyTypesMiddleWaresClass.get_all_users);
 
TypesRoute.get('/users/get/category',PropertyTypesMiddleWaresClass.get_by_cat_users);
TypesRoute.get('/users/get/name',PropertyTypesMiddleWaresClass.get_by_name_users);
 
baseRoute.use('/properties/types',TypesRoute);


module.exports = baseRoute