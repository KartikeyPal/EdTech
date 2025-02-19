const Section = require('../models/Section');
const Course = require('../models/Course');
 
exports.createSection = async(req,res)=>{
    try {
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })
        }
        const newSection = await Section.create({sectionName});
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:newSection._id,
            }
        },{new:true}).populate({
            path: "courseContent",
            populate: {
                path:"subSection",
            },
        });
        //populate section and subsection

        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"section creation failed, please try again later",
            error: error.message,
        })
    }
}

exports.updateSection = async(req,res)=>{
    try {
        const {sectionName,sectionId,courseId}=req.body;
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message: "All fields are required",
            })
        }

        
        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId,
            {sectionName},{new:true}
        );
        const courseDetails = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path:"subSection"
            },
        });
        return res.status(200).json({
            success:true,
            message: "Section updated Successfully",
            updatedSectionDetails,
            courseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"section creation failed, please try again later",
            error: error.message,
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try {
        const {sectionId,courseId} = req.body;
        console.log(req.body)
        if(!sectionId || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required for deleting section",
            })
        }
        const updatedCourseDetails =await Course.findByIdAndUpdate(courseId,{
            $pull: {courseContent: sectionId}
        },{new:true}).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();
        const updatedSection = await Section.findByIdAndDelete(sectionId);
        console.log("updated section : ",updatedSection)
        return res.status(200).json({
            success:true,
            message:"Section deleted SuccessFully",
            courseUpdate: updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to delete Section, Please try again later",
        })
    }
}