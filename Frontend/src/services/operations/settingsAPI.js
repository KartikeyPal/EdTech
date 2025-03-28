import { apiConnector } from "../apiconnector";
import toast from 'react-hot-toast'
import { settingsEndpoints } from "../apis";
const {DELETE_PROFILE_API,UPDATE_PASSWORD_API, UPDATE_PROFILE_API, UPDATE_DISPLAY_PICTURE_API} = settingsEndpoints;

export const updateProfilePicture = async(data,token)=>{
    const toastId = toast.loading("Updating profile picture");
    let result = [];
    try {
        const res = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,data,{Authorization:`Bearer ${token}`})
        if(!res.data.success){
            throw new Error("unable to update the profile pictrue")
        }
        toast.success("Profile updated successfully");
        result = res?.data?.updatedUser;

    } catch (error) {
        toast.error(error);
        console.log(error);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateProfile = async(data,token)=>{
    const toastId = toast.loading("updating profile");
    let result = []
    try {
        const res = await apiConnector("PUT",UPDATE_PROFILE_API,data,{Authorization:`Bearer ${token}`});
        console.log(res);
        toast.success("updated successfully ")
        result = res;
    } catch (error) {
        console.log("someThign went wrong", error)
        console.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updatePassword = async(currentPassword,newPassword,token) =>{
    const toastId = toast.loading("Updating Password")
    try {
        const res = await apiConnector("PUT",UPDATE_PASSWORD_API,{currentPassword,newPassword},{Authorization:`Bearer ${token}`});
        console.log(res);
        if(!res?.data?.success){
            if(!res?.data?.message === "incorrect currentPassword"){
                toast.error("Incorrect current Password");
            }
            else{
                throw new Error("cannot change password right now")
            }
        }
        toast.success("Password updated");
    } catch (error) {
        console.log(error);
    }
    toast.dismiss(toastId);
    return;
}