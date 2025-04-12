import { profileEndpoints,settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setLoading,setUser } from "../../slices/profileSlice";
import toast from 'react-hot-toast'; 
export const getUserDetails = (userId)=>{
    return async(dispatch) =>{
        try {
            const res =await apiConnector("GET",profileEndpoints.GET_USER_DETAILS_API,{userId});
            if(!res.data.success){
                toast.error("not able to fetch data");
                throw new Error(res.data.message)
            }
            console.log(res);
        } catch (error) {
            console.error(error.message);
            console.log(error);
        }
    }
}

export const getUserEnrolledCourses = async(token)=>{
        try {
            const res = await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null,{Authorization:`Bearer ${token}`});
          
            if(!res.data.success){
                toast.error("not able to fetch data");
                throw new Error(res.data.message)
            }
            return  res?.data?.courses
        } catch (error) {
            console.error("error is " ,error.message);
            console.log(error);
            toast.error("could not fetch user Enrolled courses")
        }
}


export async function getInstructorData(token){
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const res= await apiConnector("GET",profileEndpoints.GET_INSTRUCTOR_DATA_API,null,{Authorization:`Bearer ${token}`})
        console.log("get Instructor data : ",res?.data?.courses)
        result = res?.data?.courses;
    } catch (error) {
        console.log("get Instructor api error",error)
        toast.error("courld not get instructor data")
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteAccount(token){
    const toastId = toast.loading("Loading...");
    let result;
    try {
        const res = await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,null,{Authorization:`Bearer ${token}`});
        if(!res.data.success){
            throw new Error("Unable to delete the account")
        }
        result = res.data.success;
    } catch (error) {
        console.log(error.message);
        toast.error("Unable to delete the account");
    }
    toast.dismiss(toastId);
    return result;

}