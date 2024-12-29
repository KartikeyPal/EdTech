const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

//auth(check authentication)
exports.auth=async(req,res,next)=>{
    try {
        const token = req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer ","");
        
        if(!token){
            return res.status(401).json({
                success:false,
                message: "token is missing", 
            })
        }

        try {
            const decode =jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        } catch (err) {
            return res.status(401).json({
                success:false,
                message: "token is invalid",
            });
        }
    } catch (error) {
        return res.status(401).json({
                success:false,
                message: "something went wrong while validating the token",
        })
    }
}

//isStudent
exports.isStudent = async(req,res,next) =>{
    try {
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for student",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "something went wrong while validating the userRole, please try again later",
    })
    }
}

//isInstructor
exports.isInstructor = async(req,res,next) =>{
    try {
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "something went wrong while validating the userRole, please try again later",
    })
    }
}

//isAdmin
exports.isAdmin = async(req,res,next) =>{
    try {
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "something went wrong while validating the userRole, please try again later",
    })
    }
}
