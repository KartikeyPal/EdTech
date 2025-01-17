const RatingAndReview = require('../models/RatingAndReview'); 
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

//createRating
exports.createRating = async(req,res) =>{
    try {
        const {userId} = req.user.id;
        const {rating,review,courseId} = req.body;
        
    
        const courseDetails = await Course.findOne({_id:courseId,
            studentEnrolled:{$elemMatch: {$eq:userId}},
        });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message: "Student is not enrolled in this course",
            })
        };
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"user already reviewed this course"
            })
        }
    
        const ratingReview = await RatingAndReview.create({
            rating,review,course:courseId,user:userId,
        });
    
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId},{
            $push:{
                    ratingAndReview: ratingReview._id,
            }
        },{new:true})
    
        return res.status(200).json({
            success:true,
            message: "Rating and Review successfully ",
            ratingReview,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAverageRating
exports.getAverageRating = async(req,res) =>{
    try {
        const {courseId} = req.body;
        //calculating average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        //return Rating 
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message: "average rating 0, no rating given till now ",
            averageRating: 0,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllrating
exports.getAllRatingAndReview = async(req,res) =>{
    try {
        const allReview = await RatingAndReview.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName email image"
        }).populate({
            path:"course",
            select:"courseName"
        }).exec();

        return res.status(200).json({
            success:true,
            message:"all data fetched successfully",
            data: allReview,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//find course specific rating and review