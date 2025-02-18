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
        
        const {sectionId} = req.params;
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"unable to delete section",
            })
        }
        await Section.findByIdAndDelete(sectionId);
        //do we need to delete the entry from course schema??
        return res.status(200).json({
            success:true,
            message:"Section deleted SuccessFully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to delete Section, Please try again later",
        })
    }
}