const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Course = require("../models/Course");
exports.updateProfile = async (req,res)=>{
    try {
        const {dateOfBirth="",about="",contactNumber,gender,firstName, lastName} =req.body;
        const userId = req.user.id;
        if(!contactNumber ||!gender){
            return res.status(400).json({
                success:false,
                message: "minimum fields are required",
            })
        }
        if(!userId) {
            return res.status(404).json({
                success:false,
                message: "user is not found",
            })
        }

        const userDetails = await User.findById(userId);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message: "User not found",
            });
        }

        const [updatedProfile,updatedUser] = await Promise.all([
            Profile.findByIdAndUpdate(
                userDetails.additionalDetails,
                {
                    dateOfBirth,
                    gender,
                    about,
                    contactNumber
                },
                { new: true }
            ),
            User.findByIdAndUpdate(
                userId,
                {
                    firstName,
                    lastName
                },
                { new: true }
            ).populate("additionalDetails")
        ]);

        if(!updatedUser || !updatedProfile) {
            return res.status(404).json({
                success:false,
                message: "Failed to update profile",
            });
        }

        return res.status(200).json({
            success:true,
            message: "Profile details updated successfully",
            updatedUser,
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
        const uploadDetails = await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME);
        const updatedUser = await User.findByIdAndUpdate(userId,{
            image: uploadDetails.secure_url,
        },{new:true});
        return res.status(200).json({
            success:true,
            message: "Display picture updated successfully",
            updatedUser,
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
        }).populate({
            path:'courseProgress',
            populate:{
                path:'completedVideos',
            }
        })

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        const courses = userData.courses.map((course, index) => {
            const plainCourse = course.toObject();
            let courseCompletedPercentage = 0;
            let totalSubSection = 0;
            let completedSubSection = 0;
            
            for(let j = 0; j < course.courseContent.length; j++) {
                totalSubSection += course.courseContent[j].subSection.length;
            }
            for(let j = 0; j < userData.courseProgress.length; j++) {
                if(course._id.toString() === userData.courseProgress[j].courseID.toString()) {
                    completedSubSection += userData.courseProgress[j].completedVideos.length;
                    break;
                }
            }
            
            courseCompletedPercentage = (completedSubSection / totalSubSection) * 100;
            courseCompletedPercentage = Math.round(courseCompletedPercentage);
            
            plainCourse.courseCompletedPercentage = courseCompletedPercentage;
            return plainCourse;
        });
        return res.status(200).json({
            success: true,
            message: "Enrolled courses retrieved successfully",
            courses: courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve enrolled courses",
            error: error.message,
        });
    }
}

exports.instructorDashboard = async (req,res)=>{
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status.json({
                success:false,
                message: 'invalid user'
            })
        }
        console.log(userId)
        const courseDetails = await Course.find({instructor:userId});
        const courseData = courseDetails.map((course)=>{
            const totalStudentEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentEnrolled * course.price;

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats;
        })
        return res.status(200).json({
            success:true,
            courses: courseData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"SomeThing went wrong while retriving instructor dashboard details"
        })
    }
}
