const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary}= require('../utils/imageUploader');
exports.createSubSection = async(req,res)=>{
    try {
        const {title,description,duration,sectionId} = req.body;
        const video = req.files.videoFile;
        if(!title || !description ||!duration ||!sectionId ||!video) {
            return res.status(400).json({
                success: false,
                message:"all fields are required",
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const SubSectionDetails =await  SubSection.create({
            title:title,
            timeDuration:duration,
            description:description,
            videoUrl:uploadDetails.secure_url
        })
        const updatedSection = await Section.findByIdAndUpdate({sectionId},{
            $push:{
                subSection:SubSectionDetails._id,
            }
        },{new:true});
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
//pending delete subsection 

