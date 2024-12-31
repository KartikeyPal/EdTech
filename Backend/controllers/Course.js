const Course = require('../models/Course');
const Tag = require('../models/Tags');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

exports.createCourse = async(req,res)=>{
    try {
        //fetching data
        const {courseName,courseDescription,whatYouWillLearn,price,tag} = req.body;
        
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription||!whatYouWillLearn||!price||!tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message: "all fields are required",
            })
        }

        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message: "User is not instructor",
            })
        } 
        //checking for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message: "Instructor Details now found",
            })
        }

        //tags validation
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success: false,
                message: "Tag Details not found",
            })
        }

        //uploading image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME); 

        const coursePayload = {
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        }

        const newCourse = await Course.create(coursePayload);

        //adding the new course to userSchema of instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},{
            $push:{
                courses:newCourse._id,
            }
        },{new:true});

        //updating tagSchema
        await Tag.findByIdAndUpdate({_id:tagDetails._id},{
            $push:{
                course:newCourse._id,
            }
        },{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message: "course created successfully",
            data: newCourse,
        });
  
    } catch (error) {
        console.error(error);
        return res.staus(500).json({
            success:false,
            message:"course creation failed",
            error: error.message,
        })
    }
}


//getall Courses handler function
exports.showAllCourses = async(req,res) =>{
    try {
        const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,ratingAndReview:true,studentEnrolled:true}).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"data for all fetched successfully",
            data: allCourses,
        })
    } catch (error) {
        console.error(error);
        return res.staus(500).json({
            success:false,
            message:"cannot fetch course data",
            error: error.message,
        })
    }
}