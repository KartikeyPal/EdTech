import { apiConnector } from "../apiconnector";
import toast from 'react-hot-toast'
import { settingsEndpoints } from "../apis";
const {DELETE_PROFILE_API,UPDATE_PASSWORD_API, UPDATE_PROFILE_API, UPDATE_DISPLAY_PICTURE_API} = settingsEndpoints;

export const updateProfilePicture = async()=>{
    console.log("working");
}

export const updateProfile = async(data,token)=>{
    const toastId = toast.loading("updating profile");
    console.log("data is ", data)
    console.log("Token is : ", token);  
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