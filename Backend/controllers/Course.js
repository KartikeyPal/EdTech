const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

exports.createCourse = async(req,res)=>{
    try {
        //fetching data
        const {courseName,courseDescription,whatYouWillLearn,price,tag,categoryId,instruction} = req.body;
        
        const {thumbnail} = req.files;
        console.log("text data = ", req.body);
        console.log("image data = ",req.files);

        //validation
        if(!courseName || !courseDescription||!whatYouWillLearn||!price||!tag || !thumbnail || !categoryId){
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
        const categoryDetails = await Category.findById(categoryId);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "category Details not found",
            })
        }
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME); 
        const coursePayload = {
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            tag,
            instructions:instruction,
        }
        const newCourse = await Course.create(coursePayload);

        //adding the new course to userSchema of instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},{
            $push:{
                courses:newCourse._id,
            }
        },{new:true});

        //updating tagSchema
        await Category.findByIdAndUpdate({_id:categoryDetails._id},{
            $push:{
                courses:newCourse._id,
            }
        },{new:true});

        //return response
        return res.status(200).json({
            success:true,
            message: "course created successfully",
            data: newCourse,
        });
  
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
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

//get coursse details
exports.getCourseDetails = async(req,res)=>{
    try {
        const {courseId} = req.body;
        const courseDetails =  await Course.findById({_id:courseId}).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }
            }
        )
        .populate("category")
        // .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subsection",
            }, 
        }).exec();

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find the course",
            });
        };
        return res.status(200).json({
            success:true,
            message:"course fetched successfully",
            data: courseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message, 
        })
    }
}