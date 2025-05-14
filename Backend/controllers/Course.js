const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');
const CourseProgress = require('../models/CourseProgress')
const {uploadImageToCloudinary} = require('../utils/imageUploader');

exports.createCourse = async(req,res)=>{
    try {
        const {courseName,courseDescription,whatYouWillLearn,price,tag,categoryId,instruction} = req.body;
        const {thumbnail} = req.files;

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

//GET FULL DETAILS
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
        // .populate({
        //     path: "instructor",
        //     populate:{
        //         path:"additionalDetails"
        //     },
        //     populate:{
        //         path: "courseContent"
        //     }
        // })
        .populate("studentEnrolled")
        .populate("category")
        // .populate("ratingAndReview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
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
            courseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message, 
        })
    }
}

exports.editCourse = async(req,res) =>{
    try {
        const {courseName,courseDescription,whatYouWillLearn,price,tag,categoryId,instruction,courseId,status} = req.body;
        const updatedCourseData = {};
        if(req.files?.thumbnail){
            const {thumbnail} = req.files;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME); 
            updatedCourseData.thumbnail = thumbnailImage.secure_url;
        }
        if(courseName) updatedCourseData.courseName= courseName;
        if(courseDescription) updatedCourseData.courseDescription  = courseDescription;
        if(whatYouWillLearn) updatedCourseData.whatYouWillLearn = whatYouWillLearn;
        if(price) updatedCourseData.price = price;
        if(tag) updatedCourseData.tag = tag;
        if(instruction) updatedCourseData.instructions=instruction;
        if(status) updatedCourseData.status = status;
        //if categoryId is precent
    
        const updatedCourse = await Course.findByIdAndUpdate(courseId,updatedCourseData).populate({
            path: "courseContent",
            populate:{
                path: "subSection"
            }
        });
        if(!updatedCourse){
            return res.status(401).json({
                success:false,
                message: "unable to update the course",
            })
        }
        return res.status(200).json({
            success:true,
            message: "successfully updated the course",
            updatedCourse,
        })

    } catch (error) {
            return res.status(500).json({
                success:false,
                message: "edit course error",
                error,
            })
    }


}
exports.getFullCourseDetails= async(req,res)=>{
    try {
        const {courseId} = req.body;
        const userId = req.user.id;
        if(!courseId){
            return res.status(401).json({
                success:false,
                message: "course Id is needed"
            })
        }
        const course = await Course.findOne({_id:courseId})
            .populate("instructor")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .populate("ratingAndReview")
            .populate("category")
            .exec();
        
        course.instructor.password= undefined;
        if(!course){
            return res.status(404).json({
                success:false,
                message: "Course with given id is not found",
            })
        }
        const courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });
        return res.status(200).json({
            success:true,
            message:"course fetched successfully",
            course,
            courseProgress
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "error while fetching full course details",
            error: error.message,
        })
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }