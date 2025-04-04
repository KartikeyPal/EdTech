const SubSection = require('../models/SubSection')
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async(req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;


    try {
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "subsection not found"
            });
        }

        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "course progress not found",
            });
        } else {
            if (courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error: "subsection already completed",
                });
            }

            courseProgress.completedVideos.push(subSectionId);
            await courseProgress.save();
        }
        return res.status(200).json({
            success:true,
            message: "course progress updated",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while updating courseProgress",
            error: error.message,
        });
    }
}