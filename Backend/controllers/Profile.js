const Profile = require('../models/Profile');
const User = require('../models/User');
exports.updateProfile = async (req,res)=>{
    try {
        const {dateOfBirth="",about="",contactNumber,gender} =req.body;
        const id = req.user.id;
        if(!contactNumber ||!gender || !id){
            return res.status(400).json({
                success:false,
                message: "minimum fields are required",
            })
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message: "Profile details updated successfully",
            profileDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "unable to update profile details, please try again later",
            error: error.message,
        })
    }
}

//deleteAccount

exports.deleteAccount = async(req,res)=>{
    try {
        const userId = req.user.id;
    
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message: "user not found",
            })
        }
        await Profile.findByIdAndUpdate({_id: userDetails.additionalDetails});
        await User.findOneAndDelete({_id:id});
    
        //find a way to sedule this deletion operation
    
        return res.status(200).json({
            success:true,
            message: "account deletion successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "User cannot be deleted successfully, please try again later",
            error: error.message,
        })
    }
}