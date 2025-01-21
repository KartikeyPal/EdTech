const express  = require('express');
const router = express.Router();
const {auth,isStudent,isInstructor,isAdmin} = require('../middlewares/auth');
const {capturePayments,verifySignature} = require('../controllers/Payment');

router.post('/capturePayment',auth,isStudent,capturePayments);
router.post('./verifySignature',verifySignature);

module.exports = router;
