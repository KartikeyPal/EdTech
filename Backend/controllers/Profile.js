const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
exports.updateProfile = async (req,res)=>{
    try {
        const {dateOfBirth="",about="",contactNumber,gender} =req.body;
        const id = req.user.id;
        if(!contactNumber ||!gender || !id){
            return res.status(400).json({
                success:false,
                message: "minimum fields are required",
            })
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message: "Profile details updated successfully",
            profileDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "unable to update profile details, please try again later",
            error: error.message,
        })
    }
}

//deleteAccount

exports.deleteAccount = async(req,res)=>{
    try {
        const userId = req.user.id;
        console.log(userId);
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message: "user not found",
            })
        }
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});
        //deleting user
        await User.findByIdAndDelete({_id:userId});
    
        //find a way to sedule this deletion operation
    
        return res.status(200).json({
            success:true,
            message: "account deletion successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "User cannot be deleted successfully, please try again later",
            error: error.message,
        })
    }
}

exports.getUserDetails = async(req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(400).json({
                success:false,
                message: "failed to retrieve user data",
            })
        }
        const userDetails = await User.findById(userId).populate('additionalDetails');
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message: "userDetails not found",
            })
        }
        userDetails.password = undefined;
        return res.status(200).json({
            success:true,
            message: "successfully retrieved user details",
            userDetails,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve enrolled courses",
            error: error.message,
        });
    }
}

exports.updateDisplayPicture = async(req,res) =>{
    try {
        const userId = req.user.id;
        const {displayPicture} = req.files;
        if(!userId){
            return res.status(400).json({
                success:false,
                message: "Please login first",
            })
        }
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"user is not registered",
            })
        }
        const uploadDetails = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME);
        console.log(uploadDetails.secure_url);
        userDetails.image=uploadDetails.secure_url;
        userDetails.save();
        return res.status(200).json({
            success:true,
            message: "Display picture updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
} //working

exports.getEnrolledCourses = async(req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId not found",
            });
        }

        const userData = await User.findById(userId).populate({
            path:'courses',
            populate:{
                path: 'courseContent',
                populate:{
                    path:'subSection'
                }
            }
        }).exec();
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Enrolled courses retrieved successfully",
            courses: userData.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve enrolled courses",
            error: error.message,
        });
    }
}