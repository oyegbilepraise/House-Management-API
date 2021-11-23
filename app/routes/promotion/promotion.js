
 const Promotion_middle = require('../../middlewares/promotion/promotion')

var Router =  require('express'); 
 

const baseRoute = Router()

const PA = Router()
 
//PROPERTY
PA.post('/create',Promotion_middle.create_promotion);
PA.post('/toggle',Promotion_middle.toggle_promotion);
PA.get('/current',Promotion_middle.get_promotion);
PA.get('/paused',Promotion_middle.paused_promotion);
PA.get('/expired',Promotion_middle.expired_promotion);






 
baseRoute.use('/promotion',PA)


module.exports = baseRoute