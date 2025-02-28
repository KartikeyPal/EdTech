const express  = require('express');
const router = express.Router();
const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');
const {capturePayments,verifyPayment, sendPaymentSuccessMail} = require('../controllers/Payment');

router.post('/capturePayment',auth,isStudent,capturePayments);
router.post('/verifyPayment',auth,verifyPayment);
router.post('/sendPaymentSuccessMail',auth,sendPaymentSuccessMail);

module.exports = router;
