const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');

// send otp

exports.sendOTP = async (req,res)=>{
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
        console.log("otp generated: ",otp);
        
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
    
}




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

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "password and confirmPassword does not match",
            })
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
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
        else if(opt!==recentOtp){
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
}

//login

//changepassword