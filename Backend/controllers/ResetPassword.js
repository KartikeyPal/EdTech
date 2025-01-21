const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
require('dotenv').config();
const crypto = require('crypto');

//resetPasswordToken
exports.resetPasswordToken = async(req,res) =>{
    try {
        const {email} = req.body;
        if(!email){
            return res.status(403).json({
                success:false,
                message: "Email is required",
            })
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist, Please signUp"
            })
        }
        //generating token 
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate({email:email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },{new:true}
        );
        const url = `http://localhost:3000/update-password/${token}`;
        //sending mail
        await mailSender(email,"Password Reset Link",`Password Reset Link: ${url}`);
        
        return res.json({
            success: true,
            message: "please check your mail and reset your password",
            updateDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Something went wrong while reseting password",
        })
    }
} 
//resetPassword
exports.resetPassword = async(req,res) =>{
    try {
        const {newPassword,confirmPassword,token} = req.body;
        if(!newPassword || !confirmPassword){
            return res.status(403).json({
                success:false,
                message: "All fiels are required",
            })
        }
        if(newPassword !== newPassword){
            return res.status(401).json({
                success:false,
                message: "Password is not matching",
            })
        }
        const user = await User.findOne({token: token});
        if(!user){
            return res.status(401).json({
                success:false,
                message: "Token is invalid",
            })
        }
        //token time check
        if(user.resetPasswordExpires<Date.now()){
            return res.json({
                success:false,
                message: "token is expired",
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
    
        await User.findOneAndUpdate({token:token},
            {password: hashedPassword},{new:true});
    
        return res.status(200).json({
            success:true,
            message: "password reset successfull"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "something went wrong while reseting password",
        });
    }
}