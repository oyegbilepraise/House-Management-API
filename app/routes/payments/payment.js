
 const Payment_middle = require('../../middlewares/payments/payment')
 const Vat_middle = require('../../middlewares/payments/vat')
 const Invoice_middle = require('../../middlewares/payments/invoicing')



 const charge = require('../../middlewares/payments/flutterwave')

var Router =  require('express'); 
 

const payment = Router()

const PA = Router()

PA.post('/initiate_payment',charge.initiatepay);
PA.post('/charge',charge.chargeCard);
PA.post('/verify',charge.confirmOtp);
PA.post('/verify_transaction',charge.verifyTrans);
PA.get('/transactions',charge.getTransaction);


PA.post('/add_to_cart',Payment_middle.addToCart);
PA.post('/delete_from_cart',Payment_middle.deleteFromCart);
PA.get('/delete_all_from_cart',Payment_middle.deleteAllFromCart);
PA.get('/retur_property',Payment_middle.returProperty);


PA.get('/get_cart',Payment_middle.getCart);
PA.post('/increase_unit',Payment_middle.increaseCartUnit);
PA.post('/decrease_unit',Payment_middle.decreaseCartUnit);





PA.post('/create_vat',Vat_middle.create_vat);
PA.get('/get_vat',Vat_middle.get_vat);
PA.post('/update_vat',Vat_middle.update_vat);


PA.get('/get_identity',Invoice_middle.get_id);
PA.post('/save_pfd',Invoice_middle.save_pdf);
PA.get('/get_invoices',Invoice_middle.get_all_invoice);
PA.get('/get_invoice',Invoice_middle.update_single_invoice);
PA.post('/send_invoice',Invoice_middle.send_invoice);





 
payment.use('/payment',PA)


module.exports = payment