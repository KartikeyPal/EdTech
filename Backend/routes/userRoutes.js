const express  = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth');
const {
    sendOTP,
    signUp,
    login,
    changePassword,
} = require('../controllers/Auth');

const {
    resetPasswordToken,
    resetPassword,
} = require('../controllers/ResetPassword');

router.post('/sendotp',sendOTP);
router.post('/signup',signUp);
router.post('/login',login);
router.put('/changepassword',auth,changePassword);
// reset Password

router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword); 
module.exports = router;