const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary}= require('../utils/imageUploader');
exports.createSubSection = async(req,res)=>{
    try {
        const {title,description,timeDuration,sectionId} = req.body;
        const video = req.files.videoFile;
        if(!title || !description ||!timeDuration ||!sectionId ||!video) {
            return res.status(400).json({
                success: false,
                message:"all fields are required",
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const SubSectionDetails =await  SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        })
        console.log("updating section")
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},{
            $push:{
                subSection:SubSectionDetails._id,
            }
        },{new:true});
        console.log("update completed");
        //log updated section here after adding populate quiery
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedSection,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "unable to create subSection, please try again later",
            error: error.message,
        })
    }
}
//pending updateSubsection
exports.updateSubSection = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "unable to update SubSection, please try again later",
            error: error.message,
        })
    }
}
//pending delete subsection 
exports.deleteSubSection = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "unable to delete SubSection, please try again later",
            error: error.message,
        })
    }
}

