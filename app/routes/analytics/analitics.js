
 const Analytics_middle = require('../../middlewares/analytics/price_analytics')
 const Property = require('../../controllers/Analytics/analyticsSetController')




var Router =  require('express'); 
 

const baseRoute = Router()

const PA = Router()
 
//PROPERTY
// PA.post('/price_anal', Analytics_middle.price_analytics);
// PA.post('/crete_property', Property.create_ptoperty);
PA.post('/search',Analytics_middle.property_search);
PA.get('/property_views',Analytics_middle.get_property_views);
PA.get('/search_property',Analytics_middle.propertySearch);
PA.get('/search_property_type',Analytics_middle.get_property_type_search);
PA.get('/search_price',Analytics_middle.priceSearch);
PA.get('/unavailable_search',Analytics_middle.unavailable_search);
PA.post('/create_location',Analytics_middle.create_location);
PA.get('/get_location',Analytics_middle.get_location);






 
baseRoute.use('/price',PA)


module.exports = baseRoute