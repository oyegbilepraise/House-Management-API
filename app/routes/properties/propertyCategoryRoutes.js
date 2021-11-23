 var PropertyCategoriesMiddleWaresClass = require("../../middlewares/properties/propertyCategoryMiddleware");
var AdminAuthHelper = require("../../helpers/adminAuth");

var Router =  require('express'); 
 

const baseRoute = Router()

const CategoryRoute = Router()
  //admin
CategoryRoute.post('/admin/create',AdminAuthHelper.Login, PropertyCategoriesMiddleWaresClass.create);
CategoryRoute.get('/admin/get/all',AdminAuthHelper.Login, PropertyCategoriesMiddleWaresClass.get_all_admin); 
CategoryRoute.get('/admin/get/name',AdminAuthHelper.Login, PropertyCategoriesMiddleWaresClass.get_by_name_admin);
CategoryRoute.get('/admin/get/id',AdminAuthHelper.Login, PropertyCategoriesMiddleWaresClass.get_by_id_admin);
CategoryRoute.patch('/admin/update',AdminAuthHelper.Login, PropertyCategoriesMiddleWaresClass.updateCategory);
//CategoryRoute.delete('/admin/delete',AdminAuthHelper.Login, PropertyCategoriesMiddleWaresClass.deleteCategory);



//users
CategoryRoute.get('/users/get/all', PropertyCategoriesMiddleWaresClass.get_all_users);
 
CategoryRoute.get('/users/get/id',PropertyCategoriesMiddleWaresClass.get_by_id_users);
CategoryRoute.get('/users/get/name',PropertyCategoriesMiddleWaresClass.get_by_name_users);
 
baseRoute.use('/properties/category',CategoryRoute);


module.exports = baseRoute