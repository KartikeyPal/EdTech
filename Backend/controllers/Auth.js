const User = require('../models/User.js');
const OTP = require('../models/OTP.js');
const Profile = require('../models/Profile.js');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// send otp
exports.sendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(401).json({
                status: false,
                message: "user already registered",
            })
        }
        
        //generateotp
        var otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false,specialChars: false });
        
        const result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false,specialChars: false });
            result = await OTP.findOne({otp:otp});
        }
        
        const otpPayload = {email,otp};

        //creating opt entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: "otp generated successfully",
            otp,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
    
}//send otp is working properly
//signup
exports.signUp = async(req,res)=>{
    try {
        const {
            firstName,lastName,email,password,confirmPassword,accountType,otp
        } = req.body;
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        console.log("req.body :", req.body);
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "password and confirmPassword does not match",
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'user is already registered'
            })
        }

        const recentOtp =await OTP.find({email}).sort({createdAt:-1}).limit(1); 
        if(recentOtp.length ==0){
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            })
        }
        
        else if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success: false,
                message: "wrong otp"
            })
        }


        const hashedPassword = await bcrypt.hash(password,10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        })

    }  catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "User cannot be registered, please try again"
        })
    }
}//signup is working

//login
exports.login =async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "all fields are required",
            })
        }
        const existingUser = await User.findOne({email}).populate('additionalDetails');
        if(!existingUser){
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            })
        }
        console.log("working");
        if(!(await bcrypt.compare(password, existingUser.password))){
            return res.status(403).json({
                success: false,
                message: "Incorrect Password",
            })
        }

        //generating token
        const payload={
            email: existingUser.email,
            id: existingUser._id,
            accountType: existingUser.accountType,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'2h'
        });
        existingUser.token = token;
        existingUser.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly: true,
        }
    
        return res.cookie('token',token,options).json({
            success: true,
            message: "User login successfully",
            existingUser,
            token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message: "User cannot be logedin, please try again",
        })
    }
}

//changepassword
exports.changePassword = async (req,res) =>{
    try {
        const {currentPassword, newPassword, confirmNewPassword} = req.body;
        if(!(await bcrypt.compare(currentPassword, req.user.password))){
            return res.status(400).json({
                success: false,
                message: "incorrect currentPassword",
            })
        }
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "new Password and Confirm Password",
            })
        }
        const hashedPassword = bcrypt.hash(newPassword,10);
        const currentUser = req.user;
        currentUser.password = hashedPassword,
        currentUser.save();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "cannot change password right now"
        })
    }
}