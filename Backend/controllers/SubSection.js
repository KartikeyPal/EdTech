const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary}= require('../utils/imageUploader');
exports.createSubSection = async(req,res)=>{
    try {
        const {title,description,sectionId} = req.body;
        const video = req.files.video;
        if(!title || !description ||!sectionId ||!video) {
            return res.status(400).json({
                success: false,
                message:`all fields are required ${title? '\n title is required' : description? '\n description is required ' : sectionId ? '\n Section Id is required ': "video is required"}`,
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        const SubSectionDetails =await  SubSection.create({
            title:title,
            description:description,
            videoUrl:uploadDetails.secure_url,
            timeDuration:`${uploadDetails.duration}`,
        })
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},{
            $push:{
                subSection:SubSectionDetails._id,
            }
        },{new:true}).populate("subSection").exec();
        
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
        const {title,description,subSectionId} =req.body;
        const video = req.files?.videoUrl;
        console.log(req.files);
        if(!subSectionId){
            return res.status(401).json({
                success:false,
                message: "subSection Id is required",
            })
        }
        if(!title && !description  && !video){
            return res.status(401).json({
                success:false,
                message: "No changes were made in subSection",
            })
        }

        const updateSubsectionData = {};
        if(video){
            console.log("This is running");
            const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            updateSubsectionData.video = uploadDetails.secure_url; 
            updateSubsectionData.timeDuration = `${uploadDetails.duration}`;
        }
        if(title) updateSubsectionData.title = title;
        if(description) updateSubsectionData.description = description;
        const updatedSubsection = await SubSection.findByIdAndUpdate(subSectionId,updateSubsectionData,{new:true});
        return res.status(201).json({
            success:true,
            message: "subSection updated Successfully",
            updatedSubsection,
        })
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

